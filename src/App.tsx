import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Draw from './components/draw/draw';


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
            {/* <SignUp /> */}
          </Route>

          {/** Login page */}
          <Route path="/login">
            {/* <Login /> */}
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  )
};

export default App;
