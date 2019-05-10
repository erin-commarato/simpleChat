import React from 'react';
import api from './api';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      fetchComplete: false
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch(api.getUsers)
      .then(res => res.json())
      .then(response => {
        this.setState({
          users: response.filter(user => user.email !== this.state.user),
          fetchComplete: true
        });
      });
  };

  listUsers = () => {
    const userList = this.state.users.map(user => {
      return (
        <div key={user.email} onClick={this.props.setChatWith}>
          {user.email}
        </div>
      );
    });

    return userList;
  };

  render() {
    const { fetchComplete } = this.state;
    return (
      <div>
        <h1>Chat with Someone</h1>
        {fetchComplete && this.listUsers()}
      </div>
    );
  }
}

export default Chat;
