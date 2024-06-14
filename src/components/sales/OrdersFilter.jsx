import { Box,Paper,Grid, FormControl,MenuItem,InputLabel,Select, Button, TextField } from "@mui/material";
import * as React from 'react';

const options = [
    { label: "Sesame finance", value: "SESAME" },
    { label: "Employe", value: "EMPLOYE" },
    { label: "Coupons de reduction", value: "ECOUPONS" },
    { label: "Points de fidelite", value: "FIDELITY" }
  ]

export default function OrdersFilter(){

    const onSubmit = (values) => {
        console.log(values)
    }
    
    const handleChange = (values) => {
        console.log(values)
    }

    return (
        <Box sx={{p:1, border:'1px solid'}}>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{mb:1}}>
                <Grid item container spacing={1} justify="center">
                    <Grid item xs={12} sm={4} md={4} lg={3.5}>
                        <TextField
                            label="Date"
                            variant="outlined"
                            fullWidth
                            name="number"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={3}>
                        <TextField
                            label="Vente N°"
                            variant="outlined"
                            fullWidth
                            name="number"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={3}>
                        <FormControl fullWidth variant="outlined" size='small'>
                            <InputLabel id="demo-simple-select-outlined-label">Statut
                            </InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Statut"
                            onChange={handleChange}
                            value={""}
                            name="reduction">
                            <MenuItem>None</MenuItem>
                            {options.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                {item.label}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>                    
                    <Grid item xs={12} sm={12} md={12} lg={2.5}>
                        <Button fullWidth variant="contained" sx={{bgcolor:"#50c1e9"}}>Appliquer</Button>
                    </Grid>
                </Grid>       
            </Box>
        </Box>
        
    )
}