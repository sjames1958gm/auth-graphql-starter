import React from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import currentUser from '../queries/CurrentUser';
import logout from '../mutations/Logout';

class Header extends React.Component {
  
  onLogoutClick() {
    this.props.mutate({ 
      refetchQueries: [{ query: currentUser }]
    })
    .catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }
  
  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    } else if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)} href="#">Sign Out</a>
        </li>
      );
    } else {
      return (
        <div>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        </div>
      );
    }
  }
  
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
          Home
          </Link>
          <ul className="right">
          {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(currentUser)(
                        graphql(logout)(Header)
                      );