import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import TaskBuilder from './containers/TaskBuilder/TaskBuilder'
import Demo from './containers/Demo/Demo'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'


class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/start-build" component={TaskBuilder} />
            <Route path="/" exact component={Demo} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
