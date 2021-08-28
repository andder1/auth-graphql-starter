import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/getCurrentUser';

class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = { errors: [] };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data.user && this.props.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSignupSubmit({ email, password }){
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    })
  }

  render () {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm onSubmit={this.onSignupSubmit.bind(this)} errors={this.state.errors} />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);
