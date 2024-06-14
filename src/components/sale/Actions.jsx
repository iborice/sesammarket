import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {  clearSale } from '../../slices/saleSlice';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import  Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';

const StyledButton = styled(Button)(({theme, color='primary'}) => ({
    backgroundColor: "#97c668",
    ':hover':{
        color: theme.palette[color].main,
        backgroundColor: 'white'
    }
}) )

const StyledButton1 = styled(Button)(({theme, color='primary'}) => ({
    color:"#97c668",
    ':hover':{
        color: theme.palette[color].main,
        backgroundColor: 'white'
    }
}) )


export default function BasicTabs() {
    const { loading, salelines, total_amount, remaining_amount, amount_collected, payments, error } = useSelector((state) => state.sale);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newSale = () =>{
        dispatch(clearSale())
    }
    const theme = createTheme({
        components: {
            MuiToolbar: {
                styleOverrides: {
                    dense: {
                        height: 38,
                        minHeight: 33
                    }
                }
            }
        }
    })
    return (
        <ThemeProvider theme={theme} >
            <Toolbar
            sx={{
                pl: { sm: 1 },
                pr: { xs: 1, sm: 1 },
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }}
            disableGutters variant="dense" 
            >

                <Stack direction="row" spacing={1} sx={{ flex: '1 1 100%' }} color="inherit">
                    <StyledButton1 variant="outlined" color='success' onClick={newSale} sx={{height:30}}>
                        <AddShoppingCartIcon sx={{fontSize:30}}/>
                    </StyledButton1>
                    <Button variant="contained" sx={{height:30,bgcolor:"#50c1e9"}} onClick={handleClickOpen} >
                        <GroupAddIcon sx={{fontSize:30}}/>
                    </Button>
                </Stack>
                    {/* <Stack direction="row" spacing={1}>
                        <IconButton disableElevation
                disableRipple >
                            <AccountBoxIcon sx={{fontSize:45}} />
                        </IconButton>
                    </Stack> */}
                    {/* <ButtonGroup size="large" sx={{fontSize:45}} aria-label="Large button group">
                        {buttons}
                    </ButtonGroup> */}
    
                
        
                <Stack direction="row" spacing={1}>
                    <StyledButton variant="contained" size="small" color="success" endIcon={<CheckCircleOutlineIcon />} sx={{backgroundColor:'#50c1e9'}}>
                        Valider
                    </StyledButton>
                    <Button variant="outlined" size="small" color="success" endIcon={<SaveIcon />} sx={{color:"#97c668", borderColor:"#50c1e9"}}>
                        Enregistrer
                    </Button>
                </Stack>
                <React.Fragment>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                        }}
                    >
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <Grid item container spacing={1} justify="center">
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </Toolbar>
        </ThemeProvider>
    );
}