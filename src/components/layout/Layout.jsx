import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Reduction from '../sale/Reduction';
import {Box, Paper} from '@mui/material';
import Typography from '@mui/material/Typography';
import PaymentMode from '../sale/PaymentMode';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Header from './Header';
import Home from '../sale/Home';
import Sales from '../sales/Home';
import Products from '../products/Products';
import WaitingOrder from '../sale/WaitingOrder';
import Actions from '../sale/Actions';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const  [menu, setMenu] = React.useState("HOME");
  const getMenu = (value) => {
    setMenu(value);
  }

  function handlePage(value){
    switch (value) {
      case "HOME":
        //console.log(menu);
        return <Home/>;
      case "CUSTOMERS":
        console.log("clients");
        break;
      case "PRODUCTS":
        return <Products/>;
      case "SALES":
        return <Sales/>;
      default:
        break;
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.25),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: 12
  }));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        {/* <Header/> */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          {/* <Toolbar /> */}
            <Box sx={{position:"fixed", top:0, display:"flex", justifyContent:"center", width:"100%"}}>
              <Item> Vous etes actuellement hors connexion</Item>
            </Box>
            <Grid container spacing={0.2} sx={{ height:"100%"}}>

              <Grid item xs={12} md={12} lg={12} sx={{ height:"6%"}}>
                <Header getMenu={getMenu} /> 
              </Grid>

              <Grid container spacing={0.2} sx={{ height:"89%"}}>
                <Grid item xs={12} md={12} lg={10.2}>
                  <Container maxWidth={false} disableGutters sx={{ height:"100%"}}>
                    {handlePage(menu)}
                    {/* <Copyright sx={{ pt: 4 }} /> */}
                  </Container>
                </Grid>
                <Grid item xs={12} md={12} lg={1.8}>
                    <WaitingOrder/>
                </Grid>
              </Grid>
              
              <Grid item xs={12} md={12} lg={12} sx={{ height:"5%"}}>
                <Box sx={{ height:"100%"}}>
                  <Copyright  />
                </Box>
                
              </Grid>
            </Grid>
          {/* <Container maxWidth={false} disableGutters>
            
            <Header1 getMenu={getMenu} />
            {handlePage(menu)}
            <Copyright sx={{ pt: 4 }} />
          </Container> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}