import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';

class AuthorizedRoute extends React.Component {
  render() {
    const {
      Component, render, authority, redirectPath, path, ...rest
    } = this.props;
    return (
      <Authorized
        authority={authority}
        noMatch={<Route {...rest} exact render={() => <Redirect to={{ pathname: redirectPath }} />} />}
      >
        <Route {...rest} path={path} component={Component} />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
