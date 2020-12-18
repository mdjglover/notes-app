import React from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Button, Alert } from "react-bootstrap";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
import axios from "axios";
import "./components/NotesNavbar";
import { NoteCollection } from "./components/NoteCollection";
import { NotesNavbar } from "./components/NotesNavbar";

class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            accessToken: "",
            loggedIn: false,
            loginErrors: "",
        };

        this.attemptLogin = this.attemptLogin.bind(this);
        this.attemptRegistration = this.attemptRegistration.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        // if refresh token exists in cookies, attempt to get new access token
        const { cookies } = this.props;
        let refreshToken = cookies.get("refreshToken");
        if (refreshToken) {
            const accessToken = await this.refreshAccessToken();
        }
        // if access token available load user's notes
        // else reroute to login page
        if (this.state.accessToken) {
            this.setState({ loggedIn: true });
            history.push("/notes");
        }
    }

    async attemptLogin(username, password, rememberLogin) {
        try {
            let result = await axios.post("http://localhost:4000/auth/login", {
                username: username,
                password: password,
            });

            if (result.status === 200) {
                this.setState({
                    accessToken: result.data.accessToken,
                    loggedIn: true,
                });
                const { cookies } = this.props;
                cookies.set("refreshToken", result.data.refreshToken);

                history.push("/notes");
            } else if (result.status === 403) {
                this.setState({
                    loginErrors: "Incorrect username and password",
                });
            } else {
                this.setState({
                    loginErrors: "Error logging in",
                });
            }
        } catch {
            this.setState({
                loginErrors: "Error logging in",
            });
        }
    }

    async attemptRegistration(username, password) {}

    async logout() {
        const { cookies } = this.props;
        try {
            let response = await axios.post(
                "http://localhost:4000/auth/logout",
                { refreshToken: cookies.get("refreshToken") }
            );
            console.log(`Logout status: ${response.status}`);
            if (response.status === 200) {
                cookies.remove("refreshToken");
                history.push("/login");
            } else {
                alert("Error logging out");
            }
        } catch {
            alert("Error logging out");
        }
    }

    async refreshAccessToken() {
        try {
            const { cookies } = this.props;
            const response = await axios.post(
                "http://localhost:4000/auth/refreshAccessToken",
                { refreshToken: cookies.get("refreshToken") }
            );
            if (response.status === 200) {
                this.setState({ accessToken: response.data.accessToken });
                console.log("Access token refreshed");
            }
        } catch {}
    }

    render() {
        return (
            <Router history={history}>
                <Container>
                    <NotesNavbar
                        loggedIn={this.state.loggedIn}
                        handleLogout={this.logout}
                    />
                    <Container>
                        <Switch>
                            <Route path="/" exact={true}>
                                <Redirect to="/login" />
                            </Route>
                            <Route path="/login" exact={true}>
                                <LoginForm
                                    attemptLogin={this.attemptLogin}
                                    errors={this.state.loginErrors}
                                />
                            </Route>
                            <Route path="/register" exact={true}>
                                <RegisterForm
                                    attemptRegistration={
                                        this.attemptRegistration
                                    }
                                />
                            </Route>
                            <Route path="/notes">
                                <NoteCollection
                                    loggedIn={this.state.loggedIn}
                                    accessToken={this.state.accessToken}
                                />
                            </Route>
                        </Switch>
                    </Container>
                </Container>
            </Router>
        );
    }
}

export default withCookies(App);
