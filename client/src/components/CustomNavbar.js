import React from 'react';
import { Navbar, NavDropdown, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class CustomNavbar extends React.Component {
    state = {
        loggedIn: false
    }

    componentDidMount() {
        // check if logged in 
        this.setState({loggedIn: (sessionStorage.getItem('loggedIn') === 'true')});
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand style={{color: 'salmon'}}href="#home">Movie Of The Week</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link style={{color: 'white'}} href="#home">Leaderboard</Nav.Link>
                    <Nav.Link style={{color: 'white'}} href="#home">Suggestions</Nav.Link>

                    </Nav>
                    <Form inline>
                    
                    {this.state.loggedIn ? 
                        <>
                        <LinkContainer to="/profile">
                            <Button color="blue" variant="secondary">
                              Profile 
                            </Button>
                        </LinkContainer>
                        <LinkContainer to="/profile">
                            <Button color="blue" variant="secondary">
                              Logout    
                            </Button>
                        </LinkContainer>
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

export default CustomNavbar;