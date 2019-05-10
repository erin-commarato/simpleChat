This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**NOTE: This demo only works with the following users: example@example.com and email@email.com**

- Type in the name of an existing user such as 'example@example.com'
- Select the email of a user you wish to chat with
- Start chatting
- In another tab, "log in" with a different user
- You can continue the chat from this user as well

## Architecture

This simple chat app frontend was built using React. The backend consists of AWS services including API Gateway, Lambda and RDS (mySQL). Additional improvements that can be made include adding a long-polling web worker that listens for a SNS topic for the chat messages.

## TODOS

- Include password in login
- Styles
- Make chats dynamic. They are currently hard-coded to the two users mentioned above
- XSS protection
- Unit tests
- Long-polling web worker to listen for chats using SNS
