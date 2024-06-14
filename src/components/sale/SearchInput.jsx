import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { getProduct } from '../../slices/saleActions';
import { useDispatch } from 'react-redux';

export default function CustomizedInputBase() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(1)

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if(data.get('reference').length > 0 && !isNaN(data.get('quantity'))){
        dispatch(getProduct({
            reference: data.get('reference'),
            quantity: data.get('quantity')
        }));
      }else{
        alert("veuillez entrer une reference et une quantite valide")
        return ;
      }
      
    };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
      sx={{ width: '10ch', pl:1 }}
        placeholder="Lecteur"
        name="lecteur"
        inputProps={{ 'aria-label': 'enter reference' }}
      />
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Reference"
        name="reference"
        inputProps={{ 'aria-label': 'enter reference' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
      sx={{ width: '3ch', pl:1 }}
        placeholder="1"
        name="quantity"
        defaultValue={1}
        inputProps={{ 'aria-label': 'enter reference' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}