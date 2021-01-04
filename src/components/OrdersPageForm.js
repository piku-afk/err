import { IconButton, InputBase, Paper, TextField, Tooltip } from "@material-ui/core";
import { useRef } from "react";
import SearchIcon from '@material-ui/icons/Search';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

export default function OrdersPageForm({setSearch, date, setDate, handleClearFilter}) {
  const searchRef = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    searchRef.current.value = '';
  }

  return (
    <Paper className='orderspageForm' style={{
      marginBottom: '3vh'
    }} >
      <form onSubmit={handleSubmit} >
        <div className="search">
          <IconButton disabled type="submit">
            <SearchIcon />
          </IconButton>
          <InputBase
            inputRef={searchRef}
            fullWidth
            autoFocus
            placeholder="Search by customer name or doctor name"
            onChange={() => setSearch(searchRef.current.value)}
          />
        </div>
        <Tooltip title='Filter results by date'>
          <TextField
            variant='filled'
            color='secondary'
            label="Filter by Order Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Tooltip>
        <Tooltip title='Clear all filters'>
          <IconButton type='submit' disableRipple onClick={handleClearFilter}>
            <CancelOutlinedIcon />
          </IconButton>
        </Tooltip>
      </form>
    </Paper>
  );
}