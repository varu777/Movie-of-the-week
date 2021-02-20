import React from 'react';
import { Navbar, NavDropdown, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class CustomNavbar extends React.Component {
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
                    <LinkContainer to="/login">
                        <Button color="blue" variant="secondary">
                            Login
                        </Button>
                    </LinkContainer>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default CustomNavbar;