import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import history from "./history";

import { NotesNavbar } from "./components/NotesNavbar";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { NotesCollection } from "./components/NotesCollection";

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Container>
                    <NotesNavbar />
                    <Container>
                        <Switch>
                            <Route exact path="/"></Route>
                            <Route path="/login">
                                <LoginForm />
                            </Route>
                            <Route path="/register">
                                <RegisterForm />
                            </Route>
                            <Route exact path="/notes">
                                <NotesCollection />
                            </Route>
                        </Switch>
                    </Container>
                </Container>
            </Router>
        );
    }
}

export default App;
