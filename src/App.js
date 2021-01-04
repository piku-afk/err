import { Container } from '@material-ui/core';
import Nav from './components/Nav';
import Homepage from './pages/Homepage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import BillPage from './pages/BillPage'
import { useState } from 'react';
import NewDrugPage from './pages/NewDrugPage';
import SuccessfulPage from './pages/SuccessfulPage';


function App() {
  
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Router>
      <Nav />
      <Container>
        <Switch>
          <Route path='/' exact>
            <Homepage selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
          </Route>
          <Route path='/orders' exact>
            <OrdersPage />
          </Route>
          <Route path='/new_bill' exact>
            <BillPage selectedItems={selectedItems} />
          </Route>
          <Route path='/add_new' exact>
            <NewDrugPage />
          </Route>
          <Route path='/success' exact>
            <SuccessfulPage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
