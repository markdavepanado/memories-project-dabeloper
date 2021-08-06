import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar user={user} setUser={setUser} />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' component={PostDetails} />
          <Route
            path='/auth'
            exact
            component={() => (!user ? <Auth /> : <Redirect to='/posts' />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
