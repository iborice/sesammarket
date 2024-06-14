import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchInput from './SearchInput';
import ProductCard from './ProductCard';

function createData(id, reference, name, quantity, pu, tva, total) {
  return {
    id,
    reference,
    name,
    quantity,
    pu,
    tva,
    total,
  };
}

const rows = [
  createData(1,'1', 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, '2', 'Donut', 452, 25.0, 51, 4.9),
  createData(3, '3','Eclair', 262, 16.0, 24, 6.0),
  createData(4, '4','Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5,'5', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6,'6', 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7,'7', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8,'8', 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9,'9', 'KitKat', 518, 26.0, 65, 7.0),
  createData(10,'10', 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11,'11', 'Marshmallow', 318, 0, 81, 2.0),
  createData(12,'12', 'Nougat', 360, 19.0, 9, 37.0),
  createData(13,'13', 'Oreo', 437, 18.0, 63, 4.0),
];

// t('Welcome.logout')

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
    id: 'PU',
    numeric: true,
    disablePadding: false,
    label: 'PU HT',
  },
  {
    id: 'TVA',
    numeric: true,
    disablePadding: false,
    label: 'TVA',
  },
  {
    id: 'TOTAL',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
   backgroundColor: "#50c1e9",
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

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, onRequestSort } =
    props;

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        bgcolor: "#fbfbfb"
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
        <SearchInput/>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



export default function EnhancedTable() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); 

  const { t } = useTranslation();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  return (
    <Box sx={{ width: '100%', height:"100%"}}>
      <Paper sx={{ width: '100%', overflow: 'hidden', height:"100%", position:"relative" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ height: "50vh" , 
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
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
            stickyHeader aria-label="sticky table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.reference}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.pu}</TableCell>
                    <TableCell align="right">{row.tva}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{width:"100%", p:1, bottom:0, position:'absolute', textAlign:'right'}}>
              total: 2000
        </Box>
        {/* <ProductCard/> */}
      </Paper>
    </Box>
  );
}