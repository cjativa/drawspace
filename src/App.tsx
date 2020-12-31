import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DrawContainer from './components/draw/drawContainer';
import DrawingList from './components/drawingList/drawingList';
import Authentication from './components/authentication/authentication';
import ProtectedRoute from './components/protectedRoute';

const App = () => {
  return (

    <div className="App">
      <BrowserRouter>
        <Switch>

          {/** Drawing list page */}
          <Route path="/drawings">
            <ProtectedRoute>
              <DrawingList />
            </ProtectedRoute>
          </Route>

          {/** Draw page */}
          <Route path="/draw/:id?">
            <ProtectedRoute>
              <DrawContainer />
            </ProtectedRoute >
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
