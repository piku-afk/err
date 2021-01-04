import { IconButton, InputBase, Paper, Tooltip } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useRef } from "react";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';


export default function HomepageForm({setSearch}) {
  const searchRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    return;
  }

  function handleClear() {
    searchRef.current.value = '';
    setSearch('');
  }

  return (
    <Paper className='homepageform' style={{
      marginBottom: '3vh'
    }} >
      <form onSubmit={handleSubmit}>
        {/* <div className="search"> */}
          <IconButton disabled type="submit">
            <SearchIcon />
          </IconButton>
          <InputBase
            inputRef={searchRef}
            fullWidth
            autoFocus
            placeholder="Search by drug name or manufacturer name"
            onChange={() => setSearch(searchRef.current.value)}
          />
          <Tooltip title='Clear search' >
            <IconButton type='submit' disableRipple onClick={handleClear}>
              <CancelOutlinedIcon />
            </IconButton>
          </Tooltip>
        {/* </div> */}
      </form>
    </Paper>
  );
}