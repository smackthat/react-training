import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import styled from 'styled-components';
import { selectProducts } from 'app/pages/HomePage/slice/selectors';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Product, ProductCategoryToString } from 'types/Product';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

export function Searchbar() {
  const history = useHistory();
  const products = useSelector(selectProducts);

  const { t } = useTranslation();

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
      handleSearch();
    } else {
      if (value) {
        setSearchTerm(value.title);
        history.push(`/product/${value.id}`);
      }
    }
  };

  const getOpt = (opt: Product | string) => {
    if (typeof opt === 'string') {
      return opt;
    }
    return opt.title;
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
        groupBy={option =>
          ProductCategoryToString(option.category, t).toUpperCase()
        }
        getOptionLabel={option => getOpt(option)}
        renderInput={params => (
          <TextField
            {...params}
            label={t(translations.header.actions.search)}
          />
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
  min-height: 59px;
  margin-right: 1em;
  width: 22vw;
  align-items: center;

  @media (max-width: 1100px) {
    width: 40vw;
  }
`;

const StyledIconButton = styled(IconButton)`
  color: inherit;
`;
