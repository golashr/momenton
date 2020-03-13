import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../homePage';


export default function AppShell() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}