import React from "react"
import {
  Box,
  Button,
  Stack,
  Divider,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import TicketTable from "./TicketTable";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { image_path } from "../../constants";

const options = [
    { label: "Sesame finance", value: "SESAME" },
    { label: "Employe", value: "EMPLOYE" },
    { label: "Coupons de reduction", value: "ECOUPONS" },
    { label: "Points de fidelite", value: "FIDELITY" }
]

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Ticket() {

    const handleChange = (values) => {
        console.log(values)
    }

    return (
        <Box sx={{ backgroundColor:"#fff", maxHeight:"78vh", height:"78vh"}}>
            <Box sx={{display:"flex", justifyContent:"center", width:"100%"}}>
                <FormControl sx={{ m: 2, minWidth: 120 }} size="small" >
                    <InputLabel id="demo-simple-select-outlined-label">Ticket</InputLabel>
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
            </Box>
            <Item sx={{mb:2}}> Previsualisation </Item>
            <Box border={"1px solid black"}>
                <Divider variant="middle" sx={{ mt:0.7}} />
                <Box>
                    <Item>
                        <Box>SESAMMARKET</Box>
                        <Box fontSize={9}>les prix les plus bas</Box>
                        <Divider/>
                        <Box>TICKET</Box>
                        <Box fontSize={9}>N°: 1452589</Box>
                    </Item>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            pl:1,
                            pr:1
                        }}
                    >
                        <Box fontSize={10}  >Caisse: Bonnamoussadi 01</Box>
                        <Box fontSize={10}>20/04/2024 13:25</Box>
                    </Box>
                    <Divider sx={{ ml:1, mr:1, mb:0.5}}/>
                </Box>
                <TicketTable/>
                <Item>
                    <Box fontSize={10}>Merci pour votre achat</Box>
                    <Box sx={{display:"flex", justifyContent:"center", width:"100%"}} >
                        <Avatar variant="square" sx={{ width: 70, height: 50 }} alt="CASH" src={image_path+"/codebarre.png"} />
                    </Box>
                </Item>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", width:"100%"}}>
                <Stack direction="row" spacing={1} sx={{  mt:3, alignItems:"center"}} color="inherit">
                    <Button variant="outlined"  sx={{color:"#50c1e9", borderColor:"#50c1e9"}} startIcon={<PrintIcon />} size="small">
                        Facture
                    </Button>
                    <Button variant="contained" sx={{bgcolor:"#50c1e9"}}  startIcon={<PrintIcon />} size="small" >
                        TICKET
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}