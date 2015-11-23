import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import ResumeView from 'views/ResumeView';
import UserFormView from 'views/UserFormView';
import LoginView  from 'views/LoginView';
import AboutView from 'views/AboutView';
import SecretView from 'views/SecretView';
import $		 from  'jQuery'; 

function requireAuth(){
	console.log("I'm hit");
	$.ajax({
      url: '/authentication',
      type: 'POST',
      contentType: 'application/json',
      success: function(data){
      	console.log("this is the data")
      	console.log("I'm a success")
      },
      error: function(xhr,status,err){
        console.log("I'm a failure")
      }.bind(this)
    });
}


export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/userform' component={UserFormView} />
    <Route path='/resume' component={ResumeView} />
    <Route path='/login' component={LoginView} />
    <Route path='/about' component={AboutView} />
    <Route path = '/secretpage' component={SecretView} onEnter={requireAuth} />
  </Route>
);

