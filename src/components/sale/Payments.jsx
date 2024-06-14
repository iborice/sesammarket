import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useTranslation } from 'react-i18next';
import i18n from  'i18next';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography  from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';


function createData(name, calories) {
    return { name, calories};
  }
  
  const rows = [
    createData('Cash', '15 900.00 XAF'),
    createData('MOMO', '8 900.00 XAF'),
    createData('OM', '8 900.00 XAF'),
    createData('Visa', '10 900.00 XAF'),
  ];

export default function BasicList() {

  const { t } = useTranslation();
  const { loading, salelines, total_amount, remaining_amount, amount_collected, payments, error } = useSelector((state) => state.sale);
  return (
    <Box sx={{ width: '100%', maxWidth: 360 }} >
      <nav aria-label="main mailbox folders">
      <List sx={{ width: '100%', maxWidth: 360,pr:1,pl:1}} >

            <ListItem
            key={1}
            disableGutters
            secondaryAction={
                <Typography sx={{fontSize:14,color:"red"}}>{remaining_amount.toLocaleString()} XAF</Typography>
            }
            >
                <ListItemText  primary={t('payment.remaining_amount')} primaryTypographyProps={{fontSize: '11px'}}/>
            </ListItem>
            <ListItem
            key={2}
            disableGutters
            secondaryAction={
                <Typography sx={{fontSize:14,color:"green"}}>{amount_collected.toLocaleString()} XAF</Typography>
            }
            >
                <ListItemText primary={t('payment.amount_paid')} primaryTypographyProps={{fontSize: '11px'}} />
            </ListItem>
        </List>
      </nav>
      <Divider sx={{mt:1,mb:1}}><Typography sx={{fontSize:11}}>{t('payment.details')}</Typography></Divider>
        <TableContainer>
            <Table size="small" aria-label="simple table">
                <TableBody >
                {payments.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize:5 }}
                    >
                    <TableCell component="th" scope="row" sx={{fontSize:10 }}>
                        {row.name}
                    </TableCell>
                    <TableCell align="right" sx={{fontSize:10 }}>{row.amount.toLocaleString()} XAF</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
}