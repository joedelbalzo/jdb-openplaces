// react imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// mui imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

//store imports
import { logout } from '../store';


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
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  

  let pages = []

  auth.id ? pages = ['Home', 'Settings', 'Favorites', 'About', 'Logout'] : pages = ['Login', 'Home', 'About']

  auth.isAdmin === true ? pages.unshift('Admin') : ''
  

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const navigateTo = (page) => {
    if(!page){navigate(`/`)}
    navigate(`/${page.toLowerCase()}`)
  }

  const _logout = () =>{
    dispatch(logout())
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center"}}>
      <AppBar position="static" sx={{height: isMobile ? "15%" : "10%", justifyContent: "center", backgroundColor: "#003b21" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ flexGrow: 0, fontSize: isMobile ? "1rem" : "1.5rem"}}>
            <Tooltip title="Open Pages">
              <IconButton 
                onClick={handleOpenUserMenu} 
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, fontSize: isMobile ? "1.5rem" : "2rem" }}
              >  
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: isMobile ? '10%' : '7%'}}
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
              onClick={handleCloseUserMenu}
            >
              {pages.map((page) => (
                page !== 'Logout' ? 
                  (<MenuItem key={page} onClick={() => navigateTo(page)}>
                    <Typography textAlign="center" fontSize={isMobile ? "1.5rem" : "2rem"}>
                    {page}
                    </Typography>
                  </MenuItem> )
                :  
                  (<MenuItem key={page} onClick={() => _logout()}>
                    <Typography textAlign="center" fontSize={isMobile ? "1.5rem" : "2rem"}>
                    {page}
                    </Typography>
                 </MenuItem>)
              ))}
            </Menu>
          </Box>
  
          <Typography 
            variant="h4" 
            component="div" 
            onClick={()=>navigateTo('/')} 
            sx={{ 
              margin: "auto",
              // flexGrow: 1, 
              fontSize: '3rem', 
              ":hover": {cursor:"pointer"},
              maxWidth: 'calc(100% - 300px)',
              textAlign: 'center'
            }}
          >
           Open Places 
          </Typography>    
  
          {auth.id ? <Button color="inherit" sx={{fontSize: "1.5rem"}} onClick={()=> _logout()}>Logout</Button> : 
          <Button color="inherit" sx={{fontSize: "1.5rem"}} onClick={()=>navigateTo()}>Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
  }
