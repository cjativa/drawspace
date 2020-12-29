import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Draw from './components/draw/draw';
import Authentication from './components/authentication/authentication';

const App = () => {
  return (

    <div className="App">
      <BrowserRouter>
        <Switch>

          {/** Draw page */}
          <Route path="/draw">
            <Draw />
          </Route>

          {/** Sign up page */}
          <Route path="/sign-up">
            <Authentication />
          </Route>

          {/** Login page */}
          <Route path="/login">
            <Authentication />
          </Route>

          {/** Main page - you should always be at the draw screen or sign-up/login screen */}
          <Route exact path="/">
            <Authentication />
          </Route>

        </Switch>
      </BrowserRouter>

    </div>
  )
};

export default App;
