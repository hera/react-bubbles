import React, { useState } from "react";
import { Route } from "react-router-dom";

import "./styles.scss";

import Login from './components/Login';
import Header from  './components/Header';
import BubblePage from './components/BubblePage';
import PrivateRoute from './utils/privateRoute';

import { Container } from 'reactstrap';

function App() {
    const token = localStorage.getItem('loginToken');
    const [loggedIn, setLoggedIn] = useState(Boolean(token));

    return (
        <Container>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <PrivateRoute exact path="/" component={BubblePage} />

            <Route path="/login">
                <Login setLoggedIn={setLoggedIn} />
            </Route>
            
            <PrivateRoute path="/bubbles" component={BubblePage} />
        </Container>
    );
}

export default App;
