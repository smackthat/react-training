import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import styled from 'styled-components';
import { selectProducts } from 'app/pages/HomePage/slice/selectors';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Product } from 'types/Product';
import { useHistory } from 'react-router-dom';

export function Searchbar() {
  const history = useHistory();
  const products = useSelector(selectProducts);

  const [searchTerm, setSearchTerm] = React.useState<string>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleSearch = () => {
    if (searchTerm && searchTerm.length > 0) {
      const term = searchTerm;
      history.push(`/products/search/${term}`);
    }
  };

  const handleInputChange = (event, value) => {
    if (value && value.length > 0) {
      setOpen(true);
      setSearchTerm(value);
    } else {
      setOpen(false);
      setSearchTerm(null);
    }
  };

  const onAutoCompleteChange = (e, value: Product | string) => {
    if (typeof value === 'string') {
      setSearchTerm(value);
    } else {
      if (value) {
        setSearchTerm(value.title);
        history.push(`/product/${value.id}`);
      }
    }
  };

  return (
    <StyledPaper>
      <Autocomplete
        freeSolo
        fullWidth
        open={open}
        options={products}
        onInputChange={handleInputChange}
        onClose={() => setOpen(false)}
        onChange={(e, value) => onAutoCompleteChange(e, value)}
        groupBy={option => option.category.valueOf().toUpperCase()}
        getOptionLabel={option => option.title}
        renderInput={params => <TextField {...params} label="Search..." />}
      ></Autocomplete>
      <StyledIconButton
        type="submit"
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </StyledIconButton>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)`
  padding-left: 1em;
  display: flex;
  margin-right: 1em;
  width: 25vw;
  align-items: center;

  @media (max-width: 1100px) {
    width: 40vw;
  }
`;

const StyledIconButton = styled(IconButton)`
  color: inherit;
`;
