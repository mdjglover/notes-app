import React, { Component } from "react";

import { Container, Row, Col, Form, Card, Button, Alert } from "react-bootstrap";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginRemember: false
        };

        console.log(this.props.errors)

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRememberLoginChange = this.handleRememberLoginChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({"username": e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({"password": e.target.value});
    }

    handleRememberLoginChange(e) {
        this.setState({"loginRemember": e.target.checked});
        console.log(this.state.loginRemember);
    }

    handleLoginClick() {
        if (!this.state.username || !this.state.password) {
            alert("Username and password required");
            return;
        }
        this.props.attemptLogin(this.state.username, this.state.password, this.state.loginRemember);
    }

    render() {
        let errorMessage;
        if (this.props.errors) {
            errorMessage = <Alert variant="warning">
                    {this.props.errors}
                </Alert>;
        }
        return (
            <Form>
                {errorMessage}
                <h3>
                    Login
                </h3>
                <Form.Group controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Please enter your username" onChange={this.handleUsernameChange} />
                </Form.Group>
                <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Please enter your password" onChange={this.handlePasswordChange} />
                </Form.Group>
                <Form.Group controlId="loginRemember">
                    <Form.Check type="checkbox" checked={this.state.loginRemember} label="Remember me" onChange={this.handleRememberLoginChange} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.handleLoginClick}>
                    Login
                </Button>
            </Form>
        );
    }
}
