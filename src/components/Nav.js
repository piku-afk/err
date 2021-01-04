import { AppBar, Button, Container, Toolbar, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <AppBar className='navbar' position="static">
    <Container>
      <Toolbar disableGutters>
        <Typography color='secondary' variant="h5" onClick={() => window.location = '/'}>
          Pharmacy Store
        </Typography>
        <Button size='small' disableRipple variant='outlined' color="secondary" component={Link} to='/add_new' >
            Add New Drug
        </Button>
        <Button size='small' disableRipple variant='outlined' color="secondary" component={Link} to='/orders' >
            All Orders
        </Button>
      </Toolbar>
    </Container>
  </AppBar>
  );
}