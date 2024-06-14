import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CardActions from '@mui/material/CardActions';
import { Paper } from '@mui/material';
import {  changeProductQuantity, removeProduct } from '../../slices/saleSlice';



const card = {
    image:"/storage/img/live-from-space.jpg",
    name: "Nature Around Us",
    description:
      "We are going to learn different kinds of species in nature that live together to form amazing environment."
};

function createData(image,name, description) {
    return {
      image,
      description,
      name,
    };
}

const cards = [
    createData("/storage/img/live-from-space.jpg","Nature Around Us", 'Cupcake'),
    createData("/storage/img/live-from-space.jpg", "Nature Around Us", 'Donut'),
    createData("/storage/img/live-from-space.jpg", "Nature Around Us",'Eclair'),
    createData("/storage/img/live-from-space.jpg", "Nature Around Us",'Frozen yoghurt'),
    createData("/storage/img/live-from-space.jpg","Nature Around Us", 'Gingerbread'),
    createData("/storage/img/live-from-space.jpg","Nature Around Us", 'Gingerbread'),
    createData("/storage/img/live-from-space.jpg","Nature Around Us", 'Gingerbread'),
];

const buttons = [
    
    <Button key="three"><RemoveIcon color="error"/></Button>,
    <Button key="two">10</Button>,
    <Button key="one"><AddIcon color="success"/></Button>
    
];

export default function MediaControlCard() {
  //const theme = useTheme();
  //const [cards, setCards] = React.useState([card]);
  const { loading, salelines, total_amount, remaining_amount, amount_collected, payments, error } = useSelector((state) => state.sale);
  const dispatch = useDispatch();
  const onClose = (event, reference) =>{
    
    dispatch(removeProduct({reference:reference}))
  }

  const changeQuantity = (event, reference, signe) =>{
    dispatch(changeProductQuantity({reference:reference, signe:signe}))
  }

  return (
    <Box component={Paper} sx={{p:1,height:400, overflow: "auto",backgroundColor:"#fbfbfb", 
    '&::-webkit-scrollbar': {
        width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
        background: "#f1f1f1",
        },
        '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#50c1e9', borderRadius:'1em'
        },
        '&::-webkit-scrollbar-thumb:hover': {
        background: '#555'
        }
        }}>
        <Grid container spacing={1}>
            {salelines.map((prod, index) => {
            const { image, name, reference, amount, quantite } = prod;
            return (
                <Grid item key={index} sx={{width:"33.3%"}} >
                    <Card sx={{ display: 'flex',height:100 }}>
                        <Box sx={{
                            backgroundImage: `url("`+image+`")`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `cover`,
                            height: "100%",
                            width: "100%",
                        }}>

                        </Box>
                    <Box>
                        <CardContent sx={{ flex: '1 0 auto', pt:0,pb:0.1,pr:0 ,textOverflow:"ellipsis"}}>
                            <Box display="flex" alignItems="center">
                                <Box flexGrow={1} sx={{fontSize:12}} >{ reference }</Box>
                                <Box>
                                    <IconButton onClick={() => onClose(event, reference)} color="error" sx={{width:30, height:30}}>
                                        <ClearIcon sx={{width:20}}/>
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{fontSize:12, width:120, textOverflow:'ellipsis', overflow:'hidden',whiteSpace:'nowrap'}}>
                                { name }
                            </Box>
                            <Typography variant="subtitle1" color="text.secondary" sx={{fontWeight:'bold'}}>
                                { amount.toLocaleString() } XAF
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ButtonGroup sx={{width:20,height:20, pb:1}} variant="text" aria-label="Small button group">
                                <Button key="three" onClick={(event) => changeQuantity(event, reference, 0)} disabled={ quantite ==1 ? true:false} ><RemoveIcon color="error"/></Button>,
                                <Button key="two" disabled>{ quantite }</Button>,
                                <Button key="one" onClick={(event) => changeQuantity(event, reference, 1)}><AddIcon color="success"/></Button>
                            </ButtonGroup>
                        </CardActions>
                        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                        </Box> */}
                    </Box>
                    
                    </Card>
                </Grid>
            );
            })}
            
        </Grid>
    </Box>
  );
}