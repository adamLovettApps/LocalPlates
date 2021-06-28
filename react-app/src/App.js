import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index.js";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";

import Home from "./components/Home"
import SearchResults from "./components/SearchResults"
import Footer from "./components/Footer"

import Restaurant from "./components/Restaurant";
import RestaurantManagement from "./components/RestaurantManagement";
import { authenticate } from "./store/session";

function App() {

  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }




  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/search/:searchString">
          <SearchResults />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/restaurantmanagement/:id" exact={true} >
          <RestaurantManagement />
        </ProtectedRoute>
        <Route path="/" exact={true} >
          <Home />
        </Route>
        <Route path="/restaurants/:id" exact={true}>
          <Restaurant />
        </Route>
      </Switch>

        <Footer />
    </BrowserRouter>
  );
}

export default App;
