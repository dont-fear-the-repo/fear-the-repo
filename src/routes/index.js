import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import ResumeView from 'views/ResumeView';
import AboutView from 'views/AboutView';
import LinkedinLoginView from 'views/LinkedInLoginView';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/resume' component={ResumeView} />
    <Route path='/about' component={AboutView} />
    <Route path = '/returnpage' component={LinkedinLoginView} />
  </Route>
);
