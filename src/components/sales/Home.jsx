import * as React from 'react';

import Details from './Details';
import Grid from '@mui/material/Grid';
import Orders from './Orders';



export default function  Sales(){


return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={9} lg={8}>
                
                <Orders />
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
                <Details/>
                {/* <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 360,
                }}
                >
                </Paper> */}
            </Grid>
        </Grid>
    );
}