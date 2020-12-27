import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Draw from './components/draw/draw';
import Authentication from './components/authentication/authentication';

const App = () => {
  return (

    <div className="App">
      <BrowserRouter>
        <Switch>

          {/** Landing page */}
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

        </Switch>
      </BrowserRouter>

    </div>
  )
};

export default App;
