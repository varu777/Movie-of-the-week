import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, NavDropdown, Nav, Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';

class CustomNavbar extends React.Component {
    state = {
        loggedIn: false
    }

    logout = () => {
        axios({
            method: 'get',
            url: "http://localhost:9000/logout",
            withCredentials: true
        }).then((response) => {
            if (!response.data.success) {
                window.alert("Unable to logout, please try again.");
                return;
            }
            localStorage.setItem('loggedIn', false);
            this.setState({loggedIn: false});
            this.props.history.push('/login');
        }).catch((error) => {
            window.alert("Unable to logout: " + error);
        });
    }

    componentDidMount() {
        // check if logged in 
        this.setState({loggedIn: (localStorage.getItem('loggedIn') === 'true')});
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand style={{color: 'salmon'}}href="/">Movie Of The Week</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link style={{color: 'white'}} href="#home">Leaderboard</Nav.Link>
                    <Nav.Link style={{color: 'white'}} href="/Suggestions">Suggestions</Nav.Link>

                    </Nav>
                    <Form inline>
                    
                    {this.state.loggedIn ? 
                        <>
                        <LinkContainer style={{marginRight: '5px'}} to="/profile">
                            <Button color="blue" variant="secondary">
                              Profile 
                            </Button>
                        </LinkContainer>
                        <Button onClick={this.logout} color="blue" variant="secondary">
                            Logout    
                        </Button>
                        </>
                        :
                        <LinkContainer to="/login">
                            <Button color="green" variant="secondary">
                               Login 
                            </Button>
                        </LinkContainer>
                    }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(CustomNavbar);