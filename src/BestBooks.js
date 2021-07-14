import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Button } from 'react-bootstrap';
import './BestBooks.css';
import MyBooks from './components/MyBooks';
import BookFormModal from './components/BookFormModal';
import UpdateFormModal from './components/UpdateFormModal'

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showCards: false,
      showModal: false,
      showUpdateModal: false,
      id: "",
      book: {},
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
    this.setState({
      showModal: false,
      showUpdateModal: false,
    })
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

  updateModel = async (id) => {
    await this.setState({
      showUpdateModal: true,
      id: id,
      book: this.state.books.find(element => element._id === id),
    })
  }

  updateBook = async (event) => {
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

      const booksData = await axios.put(`${SERVER}/books/${this.state.id}`, bookFormData)

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
          deleteBook={this.deleteBook}
          updateModel={this.updateModel} />

        <>
          <BookFormModal addBook={this.addBook} showModal={this.state.showModal} closing={this.handleModalClosing} />
        </>

        <>
          <UpdateFormModal updateBook={this.updateBook} showModal={this.state.showUpdateModal} closing={this.handleModalClosing} book={this.state.book} />
        </>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
