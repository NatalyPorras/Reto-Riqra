import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import CommentList from './Componentes/CommentsList';
import AddComments from './Componentes/AddComments';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header>
            <h1>Lista de comentarios</h1>
          </header>
          <section>
            <AddComments />
            <CommentList />
          </section>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
