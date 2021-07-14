import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'


export class MyBooks extends Component {



    render() {
        return (
            <>
                {this.props.showCards &&
                    this.props.books.map((book, idx) => {
                        return (
                            <Card bg='dark' text='white' key={idx} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={book.img} />
                                <Card.Body>
                                    <Card.Title>{book.name}</Card.Title>
                                    <Card.Text>
                                        {book.description}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem variant="dark">{book.status}</ListGroupItem>
                                </ListGroup>
                                <Button variant="outline-danger" onClick={() => this.props.deleteBook(book._id)}>Delete Book</Button>
                                <Button variant="outline-warning" onClick={() => this.props.updateModel(book._id)}>Update Book</Button>
                            </Card>


                        )
                    })

                }



            </>
        )
    }
}

export default MyBooks;
