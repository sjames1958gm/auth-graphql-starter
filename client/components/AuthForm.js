import React from 'react';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: ""};
  }
  
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }
  
  alerts() {
    return (
      <div className="errors">
         {this.props.errors.map((e, i) => { return <div key={i}>{e}</div> })}
      </div>
      );
  }
    
  render() {
    return (
      <div className="row">
        <form className="col s4" onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input id="email" type="text" placeholder="email"
              onChange={ (event) => this.setState({ email: event.target.value }) }
              value={ this.state.email } />
          </div>
          
          <div className="input-field">
          <input id="password" type="password" placeholder="password"
            onChange={ (event) => this.setState({ password: event.target.value }) }
            value={ this.state.password } />
          </div>
          {this.alerts()}
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;