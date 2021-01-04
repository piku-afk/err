import { Button, Container, FormControl, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";
import { useRef, useState } from "react";

function updateDatabase(data) {
  fetch('http://localhost:3001/drugs/new', {
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
      if(temp.drug_id){
        window.location = '/success';
      }
    })
}

export default function NewDrugPage() {
  //for form data
  const mNameRef = useRef(null);
  const mAddressRef = useRef(null);
  const dNameRef = useRef(null);
  const dQuantityRef = useRef(null);
  const dPriceRef = useRef(null);

  const [selectValue, setSelectValue] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const mName = mNameRef.current.value;
    const mAddress =  mAddressRef.current.value;
    const dName = dNameRef.current.value;
    const dQuantity = dQuantityRef.current.value;
    const dPrice = Math.abs(Number(parseFloat(dPriceRef.current.value).toFixed(2)));
    const dType = selectValue;

    const newDrug = {
      mName,
      mAddress,
      dName,
      dType,
      dQuantity,
      dPrice
    }
    console.log(newDrug);
    updateDatabase(newDrug);
  }


  return (
    <Paper style={{padding: '10px 0'}} >
      <Container>
        <Typography style={{fontWeight: 'bolder', marginBottom: '20px'}} color='secondary' component='h1' variant='h5'>New Drug Details:</Typography>
        <form onSubmit={handleSubmit} >
        <Typography style={{margin: '5px 0'}} variant='subtitle1'><strong>Manufacturer Details:</strong> </Typography>
          <div style={{display: 'flex', marginBottom: '10px'}}>
            <TextField 
              inputRef={mNameRef}
              size='small'
              autoFocus
              required
              style={{marginRight: '20px'}}
              label="Name"
              color='secondary'
              placeholder='Abc Ltd.' />
            <TextField 
              inputRef={mAddressRef}
              required
              size='small'
              style={{marginRight: '20px'}}
              label="Address"
              color='secondary'
              placeholder='Kolkata' />
          </div>
        <Typography style={{margin: '5px 0'}} variant='subtitle1'><strong>Drug Details:</strong> </Typography>
          <div style={{display: 'flex', marginBottom: '10px'}}>
            <TextField 
              inputRef={dNameRef}
              size='small'
              required
              style={{marginRight: '20px'}}
              label="Name"
              color='secondary'
              placeholder='Paracetamol' />
            <div style={{marginRight: '20px', marginTop: '6px'}} >
              <FormControl size='small'>
                <Select
                  fullWidth
                  required
                  color='secondary' variant='outlined'
                  value={selectValue}
                  onChange={e => setSelectValue(e.target.value)}
                >
                  <MenuItem disabled value={0}><em>Select Type</em></MenuItem>
                  <MenuItem value={1}>Liquid</MenuItem>
                  <MenuItem value={2}>Capsule</MenuItem>
                  <MenuItem value={2}>Tablet</MenuItem>
                  <MenuItem value={2}>Ointment</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              inputProps={{
                pattern: '^[1-9]\\d*$',
                title: 'Enter whole number greater than 0'
              }} 
              inputRef={dQuantityRef}
              required
              size='small'
              style={{marginRight: '20px'}}
              label="Quantity in stock"
              color='secondary'
              placeholder='0' />
            <TextField 
              inputProps={{
                pattern: '^[+]?([0-9]+(?:[\.][0-9]*)?|\\.[0-9]+)$',
                title: 'Enter number greater than 0'
              }}
              inputRef={dPriceRef}
              required
              size='small'
              style={{marginRight: '20px'}}
              label="Unit Price (₹)"
              color='secondary'
              placeholder='0.00' />
          </div>
          <div style={{marginTop: '5px', display: 'flex', justifyContent: 'flex-end'}} >
            <Button type='submit' disableRipple style={{marginRight: '5px'}} size='small' color='secondary' variant='outlined'>Add Drug</Button>
          </div>
        </form>
      </Container>
    </Paper>
  );
}