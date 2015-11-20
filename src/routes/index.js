import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import ResumeView            from 'views/ResumeView';
import ResumeLayout          from 'layouts/ResumeLayout';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/resume' component={ResumeLayout}>
      <IndexRoute component={ResumeView} />
    </Route>
  </Route>
);
