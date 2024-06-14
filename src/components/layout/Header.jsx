import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import i18n from  'i18next';

const pages = [
    { code: 'HOME', label: 'Home' },
    { code: 'SALES', label: 'Sales' },
    { code: 'PRODUCTS', label: 'PRODUCTS' }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const lngs = [
    { code: 'en', nativeName: 'English', flag:"../../../storage/img/england.png" },
    { code: 'fr', nativeName: 'Francais', flag:"../../../storage/img/france.png" },
];

function Header1(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [lanEl, setLanEl] = React.useState(null);
  const [state, setState] = React.useState("HOME");
  const [lan,setLan] = React.useState("../../../storage/img/france.png");
   
  const open = Boolean(anchorEl);
  const openL = Boolean(lanEl);
  const openUser = Boolean(anchorElUser)

  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenLanguage = (event) =>{
    setLanEl(event.currentTarget);
  }

  const handleCloseLanguageMenu = () => {
    setLanEl(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleNavMenu = (page) => {
    setState(page);
    props.getMenu(page);
  }

  const handleSelectLan = (code) => {
    i18n.changeLanguage(code)
    const found = lngs.find((item) => item.code === code);
    setLan(found.flag);
  }

    const StyledButton = styled(Button)(({theme, color='primary'}) => ({
        backgroundColor: "#97c668",
        ':hover':{
            color: 'white',
            backgroundColor: '#ed5564'
        },
    }) )

    const theme = createTheme({
        components: {
            MuiToolbar: {
                styleOverrides: {
                    dense: {
                        height: 45,
                        minHeight: 45
                    }
                }
            }
        },
        palette: {
            primary: {
                main: '#50c1e9'
            },
            succes:{
                main:'#97c668'
            }
        }
    })

  return (
    <ThemeProvider theme={theme} >
        <Box>
            {/* <Toolbar disableGutters sx={{  pr: { xs: 0, lg:1.5,md:1.5}}} > */}
            <Toolbar disableGutters variant="dense" >
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page.code} onClick={()=>handleNavMenu(page.code)}>
                    <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    size="small"
                    key={page.code}
                    onClick={()=>handleNavMenu(page.code)}
                    sx={{ color: state===page.code ?'#50c1e9' : 'white', backgroundColor:state===page.code ? 'white': '#50c1e9' , display: 'block',border:1}}
                >
                    {page.label}
                </Button>
                ))}
            </Box>
            <StyledButton variant="contained" size="small" color="success" endIcon={<SettingsPowerIcon />} sx={{mr:2, backgroundColor:'#97c668'}}>
            {t('header.close')}
            </StyledButton>
            <Box sx={{ flexGrow: 0}}>
                    
                <Tooltip title="Open settings" >
                    
                    <IconButton onClick={handleOpenLanguage} size="small">
                        <Avatar alt="Remy Sharp" src={lan} sx={{ width:33,height:33}} />
                    </IconButton>
                </Tooltip>
                
                <Menu
                    anchorEl={lanEl}
                    id="account-menu"
                    open={openL}
                    onClose={handleCloseLanguageMenu}
                    onClick={handleCloseLanguageMenu}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {lngs.map((lng) => {
                        return (
                            <MenuItem onClick={() =>handleSelectLan(lng.code)} key={lng.code}>
                                <Avatar alt="Remy Sharp" src={lng.flag} />{lng.nativeName}
                            </MenuItem>
                        );
                    })}
                </Menu>
                
            </Box> 
            <Box sx={{ flexGrow: 0 }}>
                    
                <Tooltip title="Open settings">
                    
                    <IconButton onClick={handleOpenUserMenu}>
                        
                            <Avatar alt="Remy Sharp" src="../../../storage/img/avatar.png" sx={{ width:33,height:33}} />
                        
                    </IconButton>
                </Tooltip>
                
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleCloseUserMenu}
                    onClick={handleCloseUserMenu}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                    <Avatar /> My account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <NotificationsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Notifications </ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            (4)
                        </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => dispatch(logout())}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                    </MenuItem>
                </Menu>
                
            </Box>
            </Toolbar>
        </Box>
    </ThemeProvider>
  );
}
export default Header1;