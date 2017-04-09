import React from 'react';
import { graphql } from 'react-apollo';

import AuthForm from './AuthForm';
import currentUser from '../queries/CurrentUser';
import signUp from '../mutations/SignUp';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] }
    }
    
    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query: currentUser}]
        })
        .then((data) => {
            console.log("sign up complete");
            this.setState({errors: []});
        })
        .catch((res) => {
            this.setState({ errors: res.graphQLErrors.map((e) => e.message) });
        });
    }
    
    render() {
        return (
            <div>
            <h3>Sign Up:</h3>
            <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}

export default graphql(signUp)(SignUpForm);