import { Button, Container, FormControl, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

function updateDatabase(data) {
  fetch('http://localhost:3001/drugs/bill', {
    method: 'POST',
    body: JSON.stringify(data), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data[0][0]);
      const temp  = data[0][0];
      if(temp.ord_id){
        window.location = '/success';
      }
    })
}

export default function BillPage({selectedItems}) {

  //for form data
  const cFirstRef = useRef(null);
  const cLastRef = useRef(null);
  const cPhoneRef = useRef(null);
  const dNameRef = useRef(null);
  const dPhoneRef = useRef(null);

  const [selectValue, setSelectValue] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const cFirst = cFirstRef.current.value;
    const cLast = cLastRef.current.value || null ;
    const cPhone =  cPhoneRef.current.value;
    const dName = dNameRef.current.value || null;
    const dPhone = dPhoneRef.current.value || null;
    const oPayMethod = selectValue === 0 ? 2 : selectValue ; 

    const oi = orderItems.filter(item => item.quantity !== 0);
    if(oi.length === 0) {
      return;
    }
    
    const newBill = {
      cFirst,
      cLast,
      cPhone,
      dName, 
      dPhone, 
      oPayMethod,
      orderItems: oi
    };
    console.log(newBill);
    updateDatabase(newBill);
  }

  function handleIncrement(id) {
    const temp = orderItems.filter(item => item.id === id)[0];
    temp.quantity++;
    const tempArray = [...orderItems.filter(item => item.id !== id), temp];
    setOrderItems(tempArray);
  }
  function handleDecrement(id) {
    const temp = orderItems.filter(item => item.id === id)[0];
    temp.quantity = temp.quantity <= 0 ? 0 : temp.quantity - 1;
    let tempArray = [...orderItems.filter(item => item.id !== id), temp];
    setOrderItems(tempArray);
  }
  function getTotalAmount() {
    const temp = [];
    selectedItems.forEach(si => {
      orderItems.forEach(oi => {
        if(si.drug_id === oi.id) {
          const price = si.unit_price * oi.quantity;
          temp.push(price);
        }
      })
    })
    return temp.reduce((a, b) => a+b, 0).toFixed(2);
  }

  useEffect(() => {
    const temp = selectedItems.map(item => {
      return {
        id: item.drug_id,
        quantity: 1
      }
    })
    setOrderItems(temp);
  }, [selectedItems]);

  // console.log(orderItems);

  return (
    <Paper style={{padding: '10px 0'}} >
      <Container>
        <Typography style={{fontWeight: 'bolder', marginBottom: '20px'}} color='secondary' component='h1' variant='h5'>Bill Details:</Typography>
        <form onSubmit={handleSubmit} >
          <Typography style={{margin: '5px 0'}} variant='subtitle1'><strong>Customer Details:</strong> </Typography>
          <div style={{display: 'flex', marginBottom: '10px'}}>
            <TextField 
              inputRef={cFirstRef}
              size='small'
              autoFocus
              required
              style={{marginRight: '20px'}}
              label="First Name "
              color='secondary'
              placeholder='John'
              helperText='Required' />
            <TextField 
              inputRef={cLastRef}
              size='small'
              style={{marginRight: '20px'}}
              label="Last Name"
              color='secondary'
              placeholder='Doe' />
            <TextField 
              inputRef={cPhoneRef}
              size='small'
              required
              style={{marginRight: '20px'}}
              label="Phone"
              color='secondary'
              placeholder='10-digits'
              helperText='Required' />
          </div>
          <Typography style={{margin: '5px 0'}} variant='subtitle1'><strong>Doctor Details:</strong> </Typography>
          <div style={{display: 'flex', marginBottom: '10px'}}>
            <TextField 
              inputRef={dNameRef}
              size='small'
              style={{marginRight: '20px'}}
              label="Full Name "
              color='secondary'
              placeholder='John Doe' />
            <TextField
              inputRef={dPhoneRef}
              size='small'
              style={{marginRight: '20px'}}
              label="Phone"
              color='secondary'
              placeholder='10-digits' />
          </div>
          <Typography style={{margin: '5px 0'}} variant='subtitle1'><strong>Order Items:</strong> </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={pinkColor} align="center">Drug Id</TableCell>
                  <TableCell style={pinkColor}>Drug Name</TableCell>
                  <TableCell style={pinkColor} align="right">Quantity</TableCell>
                  <TableCell style={pinkColor} align="right">Unit Price (₹)</TableCell>
                  <TableCell style={pinkColor} align="right">Total Price (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedItems.map((item) => (
                  <TableRow selected key={item.drug_id}>
                    <TableCell align="center">{item.drug_id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{GetQuantity(orderItems, item.drug_id, handleIncrement, handleDecrement)}</TableCell>
                    <TableCell align="right">{item.unit_price.toFixed(2)}</TableCell>
                    <TableCell align="right">{parseFloat(getTotalPrice(orderItems, item.drug_id, item.unit_price)).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell align='right'><strong>Total Amount (₹)</strong></TableCell>
                  <TableCell align='right'>{getTotalAmount()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{margin: '10px 0', display: 'flex', justifyContent: 'flex-end'}} >
              <div style={{display: 'inline-block'}} >
                  <FormControl size='small'>
                    <Select
                      fullWidth
                      required
                      color='secondary' variant='outlined'
                      value={selectValue}
                      onChange={e => setSelectValue(e.target.value)}
                    >
                      <MenuItem disabled value={0}><em>Select Payment Method</em></MenuItem>
                      <MenuItem value={2}>Cash</MenuItem>
                      <MenuItem value={1}>Debit Card</MenuItem>
                    </Select>
                  </FormControl>
              </div>
          </div>
          <div style={{marginTop: '5px', display: 'flex', justifyContent: 'flex-end'}} >
            <Button 
              type='submit' 
              disableRipple 
              style={{marginRight: '5px'}} 
              size='small' color='secondary' variant='outlined'>Confirm</Button>
            <Button component={Link} to='/' disableRipple size='small' color='secondary' variant='outlined'>Cancel</Button>
          </div>
        </form>
      </Container>
    </Paper>
  );
}

function GetQuantity(orderItems, id, handleIncrement, handleDecrement) {
  const currentItem = orderItems.filter(item => item.id === id)[0];
  return (
    <span style={{display: 'flex', alignItems:'center', justifyContent: 'flex-end'}}>
      {currentItem?.quantity}
      <div>
        <IconButton size='small' disableRipple onClick={() => handleIncrement(id)}>
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton size='small' disableRipple onClick={() => handleDecrement(id)}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    </span>
  );
}

function getTotalPrice(orderItems, id, unit) {
  const quantity = orderItems.filter(item => item.id === id)[0];
  return (parseInt(quantity?.quantity) * parseFloat(unit)).toFixed(2);
}


const pinkColor = {
  color: '#f50057'
}