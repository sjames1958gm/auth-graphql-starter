import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import {Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

const networkInterface  = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  networkInterface
});

const Root = () => {
  return (
    <ApolloProvider  client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="signin" component={SignInForm}/>
          <Route path="signup" component={SignUpForm}/>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
