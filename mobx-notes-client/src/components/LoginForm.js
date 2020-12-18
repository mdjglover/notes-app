import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export class LoginForm extends Component {
    render() {
        return (
            <Form>
                <h3>Login</h3>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary">Login</Button>
            </Form>
        );
    }
}
