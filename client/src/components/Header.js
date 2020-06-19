import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

export default function Header (props) {
    const { loggedIn, setLoggedIn } = props;

    const { push } = useHistory();

    function handleLogOut (event) {
        event.preventDefault();
        localStorage.removeItem('loginToken');
        setLoggedIn(false);
        push('/');
    }

    return (
        <Row>
            <Col>
                <h1>Bubbles</h1>
                <ul>
                    { loggedIn
                      ? (
                            <>
                                <li><Link to="/bubbles">Bubbles</Link></li>
                                <li><a href="/#" onClick={handleLogOut}>Log Out</a></li>
                            </>
                      )
                      : <li><Link to="/login">Log In</Link></li>
                    }
                </ul>
                <hr />
            </Col>
        </Row>
    );
}