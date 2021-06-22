import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export function LanguageButton() {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageClick = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <StyledIcon />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={() => handleLanguageClick('en')}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageClick('fi')}>Finnish</MenuItem>
      </Menu>
    </>
  );
}

const StyledIcon = styled(LanguageIcon)`
  color: #ffffff;
`;
