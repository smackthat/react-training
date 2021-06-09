import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function HomeButton() {
  return (
    <Link to="/">
      <IconButton>
        <StyledHomeIcon fontSize="large" />
      </IconButton>
    </Link>
  );
}

const StyledHomeIcon = styled(HomeIcon)`
  color: #ffffff;
`;
