import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";

export default function SelectedTable({selectedItems, setSelectedItems}) {

  // const [orderItems, setOrderItems] = useState([]);

  function handleRemove(id) {
    const temp = selectedItems.filter(row => row.drug_id !== id);
    setSelectedItems(temp);
  }

  function handleClearAll() {
    setSelectedItems([]);
  }

  // function getQuantity(id) {
  //   return orderItems.filter(item => item.id === id)[0];
  // }

  // useEffect(() => {
  //   selectedItems.forEach(item => {
  //     const temp = {
  //       id: item.drug_id,
  //       quantity: 1
  //     }
  //     setOrderItems(prev => [...prev, temp]);
  //   })
  // }, [selectedItems]);

  return (
    <>
      <TableContainer className='selectedTable' component={Paper}>
        <Table size="small">
          <caption>Selected Drugs</caption>
          <TableHead>
            <TableRow selected>
              <TableCell align='center'>Drug Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Manufacturer</TableCell>
              <TableCell align="right">Type</TableCell>
              {/* <TableCell align="right">Quantity</TableCell> */}
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="center">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItems.map((row) => (
              <TableRow key={row.drug_id}>
                <TableCell align='center' >{row.drug_id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.manufacturer}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                {/* <TableCell align="right">{getQuantity(row.drug_id)?.quantity}</TableCell> */}
                <TableCell align="right">{row.unit_price}</TableCell>
                <TableCell align="center">
                <IconButton size='small' disableRipple onClick={() => handleRemove(row.drug_id)} >
                  <RemoveIcon />
                </IconButton>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button component={Link} to='/new_bill' disableRipple color='secondary' size='small' variant='outlined' style={{
        marginTop: '.5vh',
        marginBottom: '3vh',
        float: 'right'
      }} >Make Bill </Button>
      <Button disableRipple color='secondary' size='small' variant='outlined' onClick={handleClearAll} style={{
        marginTop: '.5vh',
        marginBottom: '3vh',
        marginRight: '.5vh',
        float: 'right'
      }} >Clear all </Button>
    </>
  );
}

