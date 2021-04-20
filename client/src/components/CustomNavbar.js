import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, NavDropdown, Nav, Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { LoginContext } from '../components/Auth';

class CustomNavbar extends React.Component {
    state = {
        loggedIn: this.context
    }

    logout = () => {
        axios({
            method: 'get',
            url: 'https://movieotw.herokuapp.com/logout',
            withCredentials: true,
            loggedIn: this.context 
        }).then((response) => {
            if (!response.data.success) {
                window.alert("Unable to logout, please try again.");
                return;
            }

            this.setState({loggedIn: false});
            localStorage.setItem('loggedIn', false);
            window.location.reload();
        }).catch((error) => {
            window.alert("Unable to logout: " + error);
        });
    }

    componentDidMount() {
        this.setState({loggedIn: this.context})
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand style={{color: 'salmon'}}href="/">Movie Of The Week</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link style={{color: 'white'}} href="#home">Leaderboard</Nav.Link>
                    <Nav.Link style={{color: 'white'}} href="#suggestions">Suggestions</Nav.Link>

                    </Nav>
                    <Form inline>
                    
                    {this.props.loading == null && !this.state.loggedIn ? 
                        <LinkContainer to="/login">
                            <Button color="green" variant="secondary">
                               Login 
                            </Button>
                        </LinkContainer>
                        :
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
                    }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
CustomNavbar.contextType = LoginContext

export default withRouter(CustomNavbar);