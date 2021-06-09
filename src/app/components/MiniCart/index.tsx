import React from 'react';
import { ClickAwayListener, IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

export function MiniCart() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton aria-label="cart" onClick={handleClick}>
        <StyledBadge
          badgeContent={5}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <StyledMiniCart fontSize="large" />
        </StyledBadge>
      </IconButton>

      <StyledPopper open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>The content of the Popper.</div>
            </ClickAwayListener>
          </Fade>
        )}
      </StyledPopper>
    </>
  );
}

const StyledMiniCart = styled(ShoppingCartIcon)`
  color: #ffffff;
`;

const StyledBadge = styled(Badge)`
  color: #ffffff;
`;

const StyledPopper = styled(Popper)`
  z-index: 3;
  padding: 1em;
  background: white;
  border: 1px solid grey;
`;
