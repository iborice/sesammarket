import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { userLogin } from '../../slices/authActions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const { loading, userInfo, error } = useSelector((state) => state.auth);
    const [passwordError, setPasswordError] = React.useState("");
    const [usernameError,setUsernameError] = React.useState("");
    const [error1,setError1] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // redirect authenticated user to profile screen
    React.useEffect(() => {
        if (userInfo) {
        navigate('/')
        }
    }, [navigate, userInfo])

    const checkData = (username,password) =>{
        let isCorrect = true;
        if(password.length<=0){
            setPasswordError("Ce champ ne peut etre vide");
            isCorrect =  false;
        }else{
            setPasswordError("");
        }
        if(username.length<=0){
            setUsernameError("Ce champ ne peut etre vide");
            isCorrect =  false;
        }else{
            setUsernameError("");
        }
        return isCorrect;
    }

    const usernameOnChange = (event) =>{
        if(event.target.value.length>0){
            setUsernameError("");
        }else{
            setUsernameError("Ce champ ne peut etre vide");
        }
    }

    const passwordOnChange = (event) =>{
        if(event.target.value.length>0){
            setPasswordError("");
        }else{
            setPasswordError("Ce champ ne peut etre vide");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(!checkData(data.get('username'),data.get('password'))){
            return;
        }
        
        dispatch(userLogin({
            username: data.get('username'),
            password: data.get('password'),
        }));

        // console.log({
        // email: data.get('username'),
        // password: data.get('password'),
        // });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                {t('auth.title')}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {
                        error ? 
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">{error}</Alert>
                        </Stack> 
                        : null
                    }
                    <TextField
                    margin="normal"
                    error={usernameError.length>0 ? true : false}
                    required
                    fullWidth
                    id="username"
                    label={t('auth.username')}
                    name="username"
                    autoComplete="username"
                    helperText={usernameError}
                    onChange={usernameOnChange}
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    error={passwordError.length>0 ? true : false}
                    required
                    fullWidth
                    name="password"
                    label={t('auth.password')}
                    type="password"
                    id="password"
                    helperText={passwordError}
                    onChange={passwordOnChange}
                    autoComplete="current-password"
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    {t('auth.title')}
                    </Button>
                    {/* <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid> */}
                </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </ThemeProvider>
    );
}