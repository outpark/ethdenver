import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Dashboard from '../routes/dashboard';
import Market from '../routes/market';
import Artists from '../routes/artists';
import Upload from '../routes/upload';
import Collections from '../routes/collections';

// render={(props) => 
//   <Market {...this.props}/>
// }

export default () => (
  <Router basename="/">
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/market" component={Market} />
      <Route path="/artists" component={Artists} />
      <Route path="/upload" component={Upload} />
      <Route path="/collections" component={Collections}/>
    </Switch>
  </Router>
);
