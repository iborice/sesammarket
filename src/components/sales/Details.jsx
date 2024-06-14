import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useTranslation } from 'react-i18next';
import i18n from  'i18next';
import { tableCellClasses } from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography  from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Grid } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      //backgroundColor: theme.palette.common.black,
      backgroundColor: '#50c1e9',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 11,
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
  
  function createData1(id, reference, name, quantity, total) {
    return {
      id,
      reference,
      name,
      quantity,
      total,
    };
  }
  
  const rows1 = [
    createData1(1,'1', 'Cupcake', 305, 4.3),
    createData1(2, '2', 'Donut', 452, 4.9),
    createData1(3, '3','Eclair', 262, 6.0),
    createData1(4, '4','Frozen yoghurt', 159, 4.0),
    createData1(5,'5', 'Gingerbread', 356, 3.9),
    createData1(6,'6', 'Honeycomb', 408, 6.5),
    createData1(7,'7', 'Ice cream sandwich', 237, 4.3),
    createData1(8,'8', 'Jelly Bean', 375, 0.0),
    createData1(9,'9', 'KitKat', 518, 7.0),
    createData1(10,'10', 'Lollipop', 392, 0.0),
    createData1(11,'11', 'Marshmallow', 318, 2.0),
    createData1(12,'12', 'Nougat', 360,37.0),
    createData1(13,'13', 'Oreo', 437,4.0),
  ];

function createData(name, calories) {
    return { name, calories};
  }
  
  const rows = [
    createData('Cash', '15 900.00 XAF'),
    createData('MOMO', '8 900.00 XAF'),
    createData('OM', '8 900.00 XAF'),
    createData('Visa', '10 900.00 XAF'),
  ];

  const headCells = [
    {
      id: 'reference',
      numeric: false,
      disablePadding: true,
      label: 'Reference',
    },
    {
      id: 'label',
      numeric: false,
      disablePadding: false,
      label: 'Libelle',
    },
    {
      id: 'quantity',
      numeric: true,
      disablePadding: false,
      label: 'Qte',
    },
    {
      id: 'TOTAL',
      numeric: true,
      disablePadding: false,
      label: 'Total',
    },
  ];

  function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount, onRequestSort } =
      props;
  
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell  padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </StyledTableCell>
          {headCells.map((headCell) => (
            <StyledTableCell 
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              {headCell.label}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function ProductsTable(props){

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); 

  const { t } = useTranslation();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows1.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
        setSelected(newSelected);
      };
    
      const isSelected = (id) => selected.indexOf(id) !== -1;
      const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows1.length) : 0;
  

    return (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', overflow: 'hidden'  }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer sx={{ maxHeight: 250 }}>
                <Table
                  // sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={'small'}
                  stickyHeader aria-label="sticky table"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={rows1.length}
                  />
                  <TableBody>
                    {rows1.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <StyledTableRow 
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer' }}
                        >
                          <StyledTableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.reference}
                          </StyledTableCell>
                          <StyledTableCell align="left">{row.name}</StyledTableCell>
                          <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                          <StyledTableCell align="right">{row.total}</StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <StyledTableRow 
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <StyledTableCell colSpan={6} />
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
        </Box>
      );
}

function ExtraDetails(props) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#97c668' }}>
      <ListItem>
        <ListItemText primary="Vente N°" secondary="5896" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Caisse" secondary="Don joe" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Date" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
}

export default function Details() {

  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
        <Grid item xs={2.2} md={3} lg={4}>
          <ExtraDetails/>
        </Grid>
        <Grid item xs={3.8} md={4} lg={8}>    
          <nav aria-label="main mailbox folders">
          <List sx={{ width: '100%', maxWidth: 360,pr:1,pl:1}} >

                <ListItem
                key={1}
                disableGutters
                secondaryAction={
                    <Typography sx={{fontSize:14,color:"red"}}>18 200 XAF</Typography>
                }
                >
                    <ListItemText  primary={t('payment.remaining_amount')} primaryTypographyProps={{fontSize: '11px'}}/>
                </ListItem>
                <ListItem
                key={2}
                disableGutters
                secondaryAction={
                    <Typography sx={{fontSize:14,color:"green"}}>18 200 XAF</Typography>
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
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize:5 }}
                        >
                        <TableCell component="th" scope="row" sx={{fontSize:10 }}>
                            {row.name}
                        </TableCell>
                        <TableCell align="right" sx={{fontSize:10 }}>{row.calories}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
        <Grid item xs={6} md={5} lg={12}>
          <Box>
              <ProductsTable/>
          </Box>
        </Grid>
    </Grid>
  );
}