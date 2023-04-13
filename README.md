# react-authify

### Authentication Library for MERN Stack

React-Authify is a simple library for implementing authentication in a MERN (MongoDB, Express, React, Node.js) stack. It provides an interface, `AuthContextInterface`, with properties such as `user`, `isLoggedIn`, and `token`.

Overall, this library provides a simple and easy-to-use authentication solution for MERN stack applications, allowing developers to implement login and logout functionality without writing extra code.

## Installation

To install the library, use npm or yarn:

```bash
npm install react-authify
```

```bash
yarn add react-authify
```

## Usage

Wrap your application with the `ReactAuthify` component and use the `useAuthContext` hook to access the authentication context in any component that needs it.

```javascript
import { ReactAuthify, useAuthContext } from 'react-authify';

function App() {
  return (
    <ReactAuthify>
      <MainComponent />
    </ReactAuthify>
  );
}

// MainComponent.jsx
import { useAuthContext } from 'react-authify';

function MainComponent() {
  const { user, isLoggedIn, token, loginUser, logout } = useAuthContext();

  return (
    <>
      <Route path='login' element={isLoggedIn && token <Navigate  to='/' /> : <Login/>} />
    </>
  );
}
```

The `login` function checks if a token is stored in the `localStorage` of the browser. If a token exists, it retrieves the token and parses it into a JavaScript object. If the token has not expired, the user is set as logged in and the token is stored in the component state using the `setUser`, `setIsLoggedIn`, and `setToken` functions. If the token has expired, it is removed from the `localStorage` and the user is set as logged out with an empty token and user object.

```javascript
// MainComponent.jsx
import { useAuthContext } from 'react-authify';

function MainComponent() {
  const { logout } = useAuthContext();

  useEffect(() => {
    login();
  }, []);

  return (
    <>
      <Route path='login' element={isLoggedIn && token <Navigate  to='/' /> : <Login/>} />
    </>
  );
}
```

### Login Functionality

The `loginUser` function is used for logging in the user account. It takes the login `URL` and the user's credentials `{email & password}` as arguments, and an optional `expirationTimeInHours` argument to set the token expiry time. On successful login, it stores the token in the local storage and sets the `isLoggedIn`, `token`, and `user` state variables. On error, it sets the `message` state variable with the error message.

```javascript
import { useAuthContext } from 'react-authify';

const { loginUser } = useAuthContext();

const handleLogin = async (event) => {
  event.preventDefault();

  const formData = {
    email,
    password,
  };
  // last argument is optional, you can set logout time based on this.
  // for example 10 = 10 hours, It will auto logout after 10 hours
  await loginUser('/api/login', formData, 10);
};`
```

### Logout Functionality

The `logout` function removes the token from the local storage and sets the `isLoggedIn` and `token` state variables to false and null respectively.

```javascript
import { useAuthContext } from 'react-authify';

const { logout } = useAuthContext();

<button onClick={logout}>Logout</button>`
```

## Feedback

React-Authify is actively under development to add more features, improve performance, and address any issues reported during testing. Feedback from users testing the library is appreciated.
