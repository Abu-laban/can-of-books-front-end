import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import MyBooks from './components/MyBooks';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false
    }
  }

  async componentDidMount() {

    try {
      const SERVER = process.env.REACT_APP_SERVER_URL;

      const bookReader = await axios.get(`${SERVER}/books?email=${this.props.auth0.user.email}`);

      this.setState({
        books: bookReader.data,
        showModal: true
      });

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
        <MyBooks
          books={this.state.books}
          showModal={this.state.showModal} />
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
