import React from "react"
import {
  Grid,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  FormControl,
  Button,
  Box,
  Paper
} from "@mui/material";


//Data
const initialValues = {
  firstName: "",
  lastName: "",
  occupation: "",
  city: "",
  country: "",
  email: "",
  password: "",
}

const options = [
  { label: "Sesame finance", value: "SESAME" },
  { label: "Employe", value: "EMPLOYE" },
  { label: "Coupons de reduction", value: "ECOUPONS" },
  { label: "Points de fidelite", value: "FIDELITY" }
]


const UserForm = () => {

  const onSubmit = (values) => {
    console.log(values)
  }

  const handleChange = (values) => {
    console.log(values)
  }

  return (
    <Box sx={{ p:1}}>
      <Box sx={{mb:1.9}}>
        <Grid item container spacing={0} justify="center">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box component="section" sx={{pl: 1,mr:0.5, backgroundColor: "#50c1e9", color:'white' }}>
              Comptes de privilèges
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box component="section" sx={{ pl: 2,pr:2, backgroundColor: "white", color:"#50c1e9"}}>
              15% de reduction
            </Box>
          </Grid>
        </Grid>
      </Box>

        <Box component="form" onSubmit={onSubmit} noValidate sx={{mb:1}}>
          <Grid item container spacing={1} justify="center">
              <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormControl fullWidth variant="outlined" size='small'>
                      <InputLabel id="demo-simple-select-outlined-label">Reduction
                      </InputLabel>
                      <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Reduction"
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
              <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                      label="Numero"
                      variant="outlined"
                      fullWidth
                      name="number"
                      size='small'
                  />
              </Grid>
              <Grid item xs={12} sm={6} md={12} lg={12}>
                  <Button fullWidth variant="contained" sx={{bgcolor:"#50c1e9"}}>Appliquer</Button>
              </Grid>
          </Grid>       
        </Box>
    </Box>
  )
}

export default UserForm