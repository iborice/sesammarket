import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled} from '@mui/material/styles';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
     backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 10,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function TicketTable() {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table" size="small" border={"1px solid black"}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Desc</StyledTableCell>
            <StyledTableCell align="right">Qty.</StyledTableCell>
            <StyledTableCell align="right">Unit</StyledTableCell>
            <StyledTableCell align="right">Sum</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.desc}>
              <StyledTableCell>{row.desc}</StyledTableCell>
              <StyledTableCell align="right">{row.qty}</StyledTableCell>
              <StyledTableCell align="right">{row.unit}</StyledTableCell>
              <StyledTableCell align="right">{ccyFormat(row.price)}</StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow>
            <StyledTableCell rowSpan={3} />
            <StyledTableCell colSpan={2}>Subtotal</StyledTableCell>
            <StyledTableCell align="right">{ccyFormat(invoiceSubtotal)}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Tax</StyledTableCell>
            <StyledTableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</StyledTableCell>
            <StyledTableCell align="right">{ccyFormat(invoiceTaxes)}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell colSpan={2}>Total</StyledTableCell>
            <StyledTableCell align="right">{ccyFormat(invoiceTotal)}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}