import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import login from './components/login';
import dashboard from './components/dashboard';
import register from './components/register';
import welcome from './components/welcome';
import checkout from './components/checkout';
import listing from './components/listing';
import userpage from './components/userpage';
 
class App extends Component {
  
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
              <Route path="/" component={login} exact/>
              <Route path="/register" component={register} exact/>
              <Route path="/welcome" component={welcome} exact/>    
              <Route path="/dashboard" component={dashboard} exact/>
              <Route path="/checkout" component={checkout} exact/>
              <Route path="/listing" component={listing} exact/>
              <Route path="/userpage" component={userpage} exact/>
            </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;