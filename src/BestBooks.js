import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import MyBooks from './components/MyBooks';
import BookFormModal from './components/BookFormModal';
import Button from 'react-bootstrap/Button'

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showCards: false,
      showModal: false,
    }
  }

  async componentDidMount() {

    try {
      const SERVER = process.env.REACT_APP_SERVER_URL;

      const bookReader = await axios.get(`${SERVER}/books?email=${this.props.auth0.user.email}`);

      this.setState({
        books: bookReader.data,
        showCards: true
      });

    } catch (error) {
      console.error(error);
    }
  }

  handleModalShowing = () => {
    this.setState({ showModal: true })

  }

  handleModalClosing = () => {
    this.setState({ showModal: false })
  }

  addBook = async (event) => {
    event.preventDefault();

    const bookFormData = {
      email: this.props.auth0.user.email,
      bookName: event.target.bName.value,
      bookDescription: event.target.bDescription.value,
      bookStatus: event.target.bStatus.value,
      bookImg: event.target.bImg.value,
    }
    try {
      const SERVER = process.env.REACT_APP_SERVER_URL;

      const booksData = await axios.post(`${SERVER}/books`, bookFormData)

      this.setState({
        books: booksData.data
      })
    } catch (error) {
      console.error(error);
    }

  }

  deleteBook = async (id) => {



    try {
      const SERVER = process.env.REACT_APP_SERVER_URL;

      const booksData = await axios.delete(`${SERVER}/books/${id}?email=${this.props.auth0.user.email}`)

      this.setState({
        books: booksData.data
      })
    } catch (error) {
      console.error(error);
    }

  }


  render() {
    return (
      <Jumbotron>

        <h1>My Favorite Books</h1>

        <p>
          This is a collection of my favorite books
        </p>

        <Button variant="outline-dark" onClick={this.handleModalShowing}>Add Book</Button>

        <MyBooks
          books={this.state.books}
          showCards={this.state.showCards}
          deleteBook={this.deleteBook} />

        <>
          <BookFormModal addBook={this.addBook} showModal={this.state.showModal} closing={this.handleModalClosing} />
        </>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
