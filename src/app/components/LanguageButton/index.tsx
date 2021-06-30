import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { translations } from 'locales/translations';

export function LanguageButton() {
  const { i18n, t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageClick = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <StyledIcon />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={() => handleLanguageClick('en')}>
          {t(translations.languages.english)}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageClick('fi')}>
          {t(translations.languages.finnish)}
        </MenuItem>
      </Menu>
    </>
  );
}

const StyledIcon = styled(LanguageIcon)`
  color: #ffffff;
`;
