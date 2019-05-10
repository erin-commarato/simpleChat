import React from 'react';
import Chat from './Chat';
import ChatWith from './ChatWith';
import api from './api';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      chattingWith: null,
      email: 'example@example.com'
    };
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleLogin = () => {
    const { email } = this.state;
    console.log('login', this.state);
    fetch(api.login, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          // TODO add error message component to handle user errors
          alert('No user found with that email');
        } else {
          this.setState({ isLoggedIn: true });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // TODO break out into its own component
  // TODO add password field
  displayLoginForm() {
    return (
      <div>
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          label="email"
          placeholder="email@example.com"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <button onClick={this.handleLogin}>Submit</button>
      </div>
    );
  }

  setChatWith = e => {
    this.setState({ chattingWith: e.target.innerText });
  };

  render() {
    const { isLoggedIn, chattingWith, email } = this.state;
    if (!isLoggedIn) return this.displayLoginForm();
    if (!chattingWith) return <ChatWith user={email} setChatWith={this.setChatWith} />;
    return <Chat user={email} chattingWith={chattingWith} />;
  }
}

export default App;
