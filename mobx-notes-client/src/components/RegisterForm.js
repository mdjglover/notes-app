import React from "react";
import { Form, Button } from "react-bootstrap";

export class RegisterForm extends React.Component {
    render() {
        return (
            <Form>
                <h3>Register</h3>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password (repeat)</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Button variant="primary">Register</Button>
            </Form>
        );
    }
}