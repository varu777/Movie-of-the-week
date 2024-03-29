import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';

class CustomNavbar extends React.Component {
    state = {
        loggedIn: this.props.user.loggedIn,
        currentUser: this.props.user.currentUser === null ? "" : this.props.user.currentUser.username
    }

    // executes only when logout button clicked on navbar
    logout = () => {
        axios({
            method: 'get',
            url: process.env.REACT_APP_LOGOUT_URL,
            withCredentials: true,
            loggedIn: this.context.loggedIn
        }).then((response) => {
            if (!response.data.success) {
                window.alert("Unable to logout, please try again.");
                return;
            }

            this.setState({ loggedIn: false });
            window.location.reload();
        }).catch((error) => {
            window.alert("Unable to logout: " + error);
        });
    }

    componentDidMount() {
        // determine login status so that navbar renders accordingly
        this.setState({ loggedIn: this.props.user.loggedIn });
        this.setState({ currentUser: this.props.user.currentUser.username })
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand style={{color: 'salmon'}} href="/">
                    Movie Of The Week
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link style={{ color: 'white', textDecoration: 'underline' }} href="#home">
                            Leaderboard
                        </Nav.Link>
                        <Nav.Link style={{ color: 'white', textDecoration: 'underline' }} href="/suggestions">
                            Suggestions
                        </Nav.Link>
                        <Nav.Link style={{ color: 'white', textDecoration: 'underline' }} href="/watchedMovie">
                            Add to Watched List
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        { !this.state.loggedIn ?
                            <LinkContainer to="/login">
                                <Button color="green" variant="secondary">
                                   Login
                                </Button>
                            </LinkContainer>
                            :
                            <>
                            { this.state.currentUser !== "" &&
                                <p style={{ marginRight: '10px', marginTop: '12px' }}>
                                    Welcome back, { this.state.currentUser }!
                                </p>}
                                <LinkContainer style={{ marginRight: '5px' }} to="/profile">
                                    <Button color="blue" variant="secondary">
                                      Profile
                                    </Button>
                                </LinkContainer>
                                <Button onClick={ this.logout } color="blue" variant="secondary">
                                    Logout
                                </Button>
                            </>
                        }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(CustomNavbar);