import React from 'react';
import api from './api';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      chattingWith: props.chattingWith,
      message: '',
      fetchComplete: false
    };
  }

  componentDidMount() {
    this.fetchMessages();

    // TODO change to long-polling web worker
    setInterval(this.fetchMessages, 1000);
  }

  fetchMessages = () => {
    // TODO lambda uses hard-coded users, convert to dynamic users
    fetch(api.getMessages)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        this.setState({ messages: response, fetchComplete: true });
      });
  };

  handleNewMessage = e => {
    this.setState({ message: e.target.value });
  };

  handleNewMessageSubmit = e => {
    const { user, chattingWith, message } = this.state;

    fetch(api.postMessage, {
      method: 'POST',
      body: JSON.stringify({ email: user, chattingWith, message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        this.setState({ message: '' });
        this.fetchMessages();
      });
  };

  showNewMessageForm = () => {
    return (
      <div>
        <input
          type="text"
          name="newMessage"
          value={this.state.message}
          onChange={this.handleNewMessage}
        />
        <button onClick={this.handleNewMessageSubmit}>Submit</button>
      </div>
    );
  };

  showPreviousMessage = () => {
    const { messages } = this.state;
    const messageList = messages.map(message => {
      return <div key={message.id}>{message.message}</div>;
    });
    return messageList;
  };

  render() {
    const { fetchComplete } = this.state;
    return (
      <div>
        <h1>Chat with {this.props.chattingWith}!</h1>
        {fetchComplete && this.showPreviousMessage()}
        {this.showNewMessageForm()}
      </div>
    );
  }
}

export default Chat;
