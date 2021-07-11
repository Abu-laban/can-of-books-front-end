
import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Container, Card } from 'react-bootstrap';

class Profile extends Component {
    render() {
        const { user } = this.props.auth0;
        return (
            <>
                <Container className="mt-5 mb-5">
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={user.picture} />
                        <Card.Body>
                            <Card.Title>{user.name}'s Profile</Card.Title>
                            <Card.Text>
                                <p>{user.email}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }
}

export default withAuth0(Profile);