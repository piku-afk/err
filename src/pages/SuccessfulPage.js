import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { Typography } from '@material-ui/core';
import { useEffect } from 'react';

export default function SuccessfulPage() {
  
  useEffect(() => {
    setInterval(() => {
      window.location = '/';
    }, 2500);
  }, []);

  return (
    <div className='iconContainer'>
      <CheckCircleOutlinedIcon style={size} color ='secondary' />
      <Typography component='p' align='center' variant='h6' >Done</Typography>
    </div>
  );
}

const size = {
  fontSize: 150
}