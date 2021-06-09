import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';
import styled from 'styled-components';

export function Searchbar() {
  return (
    <StyledPaper>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <StyledIconButton type="submit" aria-label="search">
        <SearchIcon />
      </StyledIconButton>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)`
  padding: 2px 2px;
  display: flex;
  margin-right: 2em;
`;

const StyledInputBase = styled(InputBase)`
  margin-left: 2em;
`;

const StyledIconButton = styled(IconButton)`
  color: inherit;
`;
