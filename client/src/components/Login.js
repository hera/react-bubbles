import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    UncontrolledAlert
} from 'reactstrap';
import authAxios from '../utils/authAxios';

export default function Login (props) {

    const initialLoginData = {
        username: '',
        password: ''
    };

    const initialError = '';

    const [loginData, setLoginData] = useState(initialLoginData);
    const [loginError, setLoginError] = useState(initialError);

    const { push } = useHistory();

    function handleSubmit (event) {
        event.preventDefault();

        authAxios().post('/api/login', loginData)
            .then(response => {
                const loginToken = response.data.payload;
                localStorage.setItem('loginToken', loginToken);
                setLoginData(initialLoginData);
                props.setLoggedIn(true);
                push('/bubbles');
            })
            .catch(error => {
                setLoginError('Please enter correct username and password');
            })
    }

    function handleInput (event) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Row>
            <Col lg="6">
                <h2>Log In</h2>
                { loginError &&
                    <UncontrolledAlert color="danger">{loginError}</UncontrolledAlert>
                }
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <Input type="text" name="username" id="username" value={loginData.username} onChange={handleInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input type="password" name="password" id="password" value={loginData.password} onChange={handleInput} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary">Log In</Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );
}