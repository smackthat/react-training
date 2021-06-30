import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@material-ui/icons/Person';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { translations } from 'locales/translations';

export function ProfileButton() {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <StyledIcon fontSize="large" />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        keepMounted
      >
        <StyledLink to="/">
          <MenuItem onClick={handleClose}>
            {t(translations.header.actions.orderHistory)}
          </MenuItem>
        </StyledLink>
        <StyledLink to="/logout">
          <MenuItem onClick={handleClose}>
            {t(translations.header.actions.logout)}
          </MenuItem>
        </StyledLink>
      </Menu>
    </>
  );
}

const StyledIcon = styled(PersonIcon)`
  color: #ffffff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  color: inherit;
`;
