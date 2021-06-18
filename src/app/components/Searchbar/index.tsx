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

  const handleSearch = () => {
    if (searchTerm && searchTerm.length > 0) {
      history.push(`/products/search/${searchTerm}`);
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onAutoCompleteChange = (e, value: Product | string) => {
    if (typeof value === 'string') {
      setSearchTerm(value);
    } else {
      if (value) {
        history.push(`/product/${value.id}`);
      }
    }
  };

  return (
    <StyledPaper>
      <Autocomplete
        freeSolo
        fullWidth
        options={products}
        onChange={(e, value) => onAutoCompleteChange(e, value)}
        groupBy={option => option.category.valueOf().toUpperCase()}
        getOptionLabel={option => option.title}
        renderInput={params => (
          <TextField onChange={onTextChange} {...params} label="Search..." />
        )}
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
  margin-right: 2em;
  width: 20vw;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  color: inherit;
`;
