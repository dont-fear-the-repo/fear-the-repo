import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import LoginView from 'views/LoginView';
import ResumeView from 'views/ResumeView';
import UserFormView from 'views/UserFormView';
import AboutView from 'views/AboutView';
import SecretView from 'views/SecretView';

import $ from 'jQuery';

function requireAuth(nextState, replaceState) {
  // NOTE: will change url address when deployed
  $.ajax({
    url: 'http://localhost:3000/authentication',
    async: false,
    type: 'POST',
    contentType: 'application/json',
    success: function (data) {
      if (data.Auth === false) {
        replaceState({
          nextPathname: nextState.location.pathname
        }, '/login');
      }
    },
    error: function (xhr, status, err) {
      console.error(err);
    }
  });
}

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={ResumeView} />
    <Route path='/userform' component={UserFormView} />
    <Route path='/resume' component={ResumeView} />
    <Route path='/about' component={AboutView} />
    <Route path='/login' component={LoginView}/>
    <Route path='/secretpage' component={SecretView} onEnter={requireAuth} />
  </Route>
);

