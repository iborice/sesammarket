import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Reduction from './Reduction';
import Box from '@mui/material/Box';
import Payments from './Payments';
import Ticket from './Ticket';
import Actions from '../sale/Actions';

import PaymentMode from './PaymentMode';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ProductTable from './ProductTable';



export default function  Home(){


return (
    <Grid container spacing={0.2} sx={{ height:"100%"}}>
        <Grid item xs={12} md={9} lg={12}>
            <Actions/>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
        
            <Grid container spacing={0.13} sx={{ height:"100%"}}>
                <Grid item xs={12} md={9} lg={12} sx={{ height:"75%"}}>
                    <ProductTable/>
                </Grid>
                
                    <Grid item xs={12} md={12} lg={6} sx={{ height:"25%"}}>
                        <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height:"100%",
                            }}
                        >
                            <Reduction/>
                        </Paper>
                    </Grid>
                <Grid item xs={12} md={12} lg={6} sx={{ height:"25%"}}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height:"100%",
                        }}
                    >
                    <PaymentMode/>
                    </Paper>
                </Grid>
            </Grid>
            
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
            
            <Paper
            sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                height:"100%",
            }}
            >
                <Ticket/>
            </Paper>
        </Grid>
    </Grid>
    );
}