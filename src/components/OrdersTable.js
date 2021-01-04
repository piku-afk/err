import { Box, Collapse, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const blank = '---';

export default function OrdersTable({rows}) {

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

  return ( 
    <>
      <TableContainer className='table' component={Paper}>
        {ForOrders(rows, page, rowsPerPage)}
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

function ForOrders(rows, page, rowsPerPage) {
  return (
    <Table>
      <TableHead>
          <TableRow selected >
            <TableCell />
            <TableCell color='secondary' align='center'><strong> Order Id</strong></TableCell>
            <TableCell><strong>Order Date / Time</strong></TableCell>
            <TableCell><strong>Customer Name</strong></TableCell>
            <TableCell><strong>Doctor Name</strong></TableCell>
            <TableCell align="right"><strong>Payment Method</strong></TableCell>
            <TableCell align="right"><strong>Total Amount (₹)</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <Row key={row.order_id} row={row} />
          ))}
        </TableBody>
    </Table>
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

const pinkColor = {
  color: '#f50057'
}

function Row({row}) {
  const [open, setOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const classes = useRowStyles();

  useEffect(() => {
    if(open) {
      fetch(`http://localhost:3001/drugs/orders/${row.order_id}`)
      .then(res => res.json())
      .then(data => {
        data.pop();
        setOrderDetail(data[0]);
      });
    }
  }, [open, row]);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton disableRipple size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.order_id}</TableCell>
        <TableCell component="th" scope="row">{getDate(row.date)} / {row.time} </TableCell>
        <TableCell style={pinkColor}>{row.customer_name}</TableCell>
        <TableCell>{row.doctor_name || blank}</TableCell>
        <TableCell align="right">{row.payment_method}</TableCell>
        <TableCell align="right">{row.total_price.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
      {OrderDetails(row, open, orderDetail)}
      </TableRow>
    </>
  );
}

function OrderDetails(row, open, orderDetail) {
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={7}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box margin={1}>
          <Typography variant="h6" gutterBottom component="div">
              Order Details
          </Typography>
          <Box marginTop={3} marginBottom={3}> 
            <Typography paragraph variant='body2'>
              <strong>Customer Name</strong>: {row.customer_name}
              &emsp;            
            <strong>Phone</strong>: {row.customer_phone}
            </Typography>
            <Typography paragraph variant='body2'>
              <strong>Doctor Name</strong>: {row.doctor_name || blank}
              &emsp;          
            <strong>Phone</strong>: {row.doctor_phone || blank}
            </Typography>
          </Box>
          <TableContainer component={Paper} className='innerTable' >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={pinkColor} align='center' >Drug Id</TableCell>
                <TableCell style={pinkColor} >Name</TableCell>
                <TableCell style={pinkColor} align='right' >Type</TableCell>
                <TableCell style={pinkColor} align="right">Quantity</TableCell>
                <TableCell style={pinkColor} align="right">Unit price (₹)</TableCell>
                <TableCell style={pinkColor} align="right">Total price (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetail.map((order) => (
                <TableRow selected key={order.drug_id}>
                  <TableCell align='center' scope="row">
                    {order.drug_id}
                  </TableCell>
                  <TableCell>{order.drug_name}</TableCell>
                  <TableCell align='right'>{order.type}</TableCell>
                  <TableCell align="right">{order.quantity}</TableCell>
                  <TableCell align="right">
                    {order.unit_price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {order.total_price.toFixed(2)}
                  </TableCell>
                </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell align='right'>Total Amount (₹)</TableCell>
                <TableCell align="right">{row.total_price.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Collapse>
    </TableCell>
  );
}

function getDate(newDate) {
  const d = new Date(newDate); 
  const year = d.getFullYear();
  const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  return `${year}-${month}-${date}`
}