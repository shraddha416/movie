/**
 * Created by zopper on 22/02/18.
 */
import React from 'react';
import { Router , Route , Link, Switch, withRouter  } from 'react-router';
import './index.css';
import App from './App';
import Profile from './Profile';

class Routes extends React.Component {
  constructor(props){
    super(props);
  }
  render()
  {
    return(
      <Switch>
        <Route path = "/:imdbId" component = { Profile } />
        <Route path = "/" component = { App } />
      </Switch>
    )
  }
}

export default withRouter(Routes);

