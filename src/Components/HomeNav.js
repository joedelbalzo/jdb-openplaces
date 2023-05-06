import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function HomeNav() {
  const { auth } = useSelector(state => state);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  let pages = []

  auth.id ? pages = ['Home', 'Settings', 'About', 'Logout'] : pages = ['Login', 'Home', 'Settings', 'About']

  auth.isAdmin === true ? pages.unshift('Admin') : ''
  
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const navigateTo = (page) => {
    navigate(`/${page.toLowerCase()}`)
  }
  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center"}}>
      <AppBar position="static" sx={{height: "10%", justifyContent: "center", backgroundColor: "#003b21" }}>
        <Toolbar>

            
            <Box sx={{ flexGrow: 0, fontSize: "2rem"}}>
            <Tooltip title="Open Pages">
              <IconButton 
                onClick={handleOpenUserMenu} 
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >   
              <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '7%'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateTo(page)}>
                  <Typography textAlign="center" fontSize="2rem">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Open Places
          </Typography>    
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {auth.id ? <Button color="inherit" sx={{fontSize: "1.5rem"}} onClick={()=> dispatch(logout())}>Logout</Button> : <Button color="inherit" sx={{fontSize: "1.5rem"}}>Login</Button>}
          


        </Toolbar>
      </AppBar>
    </Box>
  );
}
