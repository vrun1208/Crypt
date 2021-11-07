import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const NavBar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return(
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="static"
      style={{backgroundColor: "#16C79A",}}>
        <Toolbar>
          <Typography textAlign="start" variant="h4" component="div"
           style={{
             flexGrow: 1,
             fontWeight:900,
             fontFamily: "Bebas Neue",
             }}>
            <Link to="/" className="heading">Crypt </Link>
          </Typography>
          <IconButton
            id="ham"
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ justifyContent: "right" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
        style={{BackgroundColor:"#16C79A"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'ham',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/" className="navlink"> Home</Link>
          </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/news" className="navlink">News </Link>
          </MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;