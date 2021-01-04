import { useState } from "react";

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import AddIcon from '@material-ui/icons/Add';

export default function DrugsTable({rows, selectedItems, setSelectedItems}) {

  //for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClick(row) {
    const temp = selectedItems.some(item => item.drug_id ===row.drug_id);
    if(!temp) {
      setSelectedItems([...selectedItems, row]);
    }
  }

  return ( 
    <>
      <TableContainer className='table' component={Paper}>
        {ForDrugs(rows, page, rowsPerPage, handleClick)}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

function ForDrugs(rows, page, rowsPerPage, handleClick) {

  return (
    <Table>
      <TableHead>
          <TableRow selected >
            <TableCell color='secondary' align='center'><strong>Drug Id</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>Manufacturer Name</strong></TableCell>
            <TableCell align="right"><strong>Type</strong></TableCell>
            <TableCell align="right"><strong>Quantity In Stock</strong></TableCell>
            <TableCell align="right"><strong>Unit Price (₹)</strong></TableCell>
            <TableCell align="center"><strong>Select</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.drug_id}>
              <TableCell align="center">{row.drug_id}</TableCell>
              <TableCell style={{color: '#f50057'}} component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.manufacturer}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.quantity_in_stock}</TableCell>
              <TableCell align="right">{row.unit_price}</TableCell>
              <TableCell align="center">
                <IconButton size='small' disableRipple onClick={() => handleClick(row)} >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  );
}