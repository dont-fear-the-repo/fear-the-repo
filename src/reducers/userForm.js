import { createReducer }     from '../utils';
import { SAVE_FORM } from 'constants/userForm';

const initialState = {
  name: '',
  email: '',
  phone: 0,
  streetAddress: '',
  city: '',
  state: '',
  zipCode: 0,
  homepageOrBlog: '',
  linkedinUrl: '',
  githubUrl: '',
  facebookUrl: '',
  twitterUrl: '',
  otherUrls: ''
};

export default createReducer(initialState, {

  [SAVE_FORM] : (state, payload) => {
    console.log('payload:', payload)
    return Object.assign({}, state, {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      streetAddress: payload.streetAddress,
      city: payload.city,
      state: payload.state,
      zipCode: payload.zipCode,
      homepageOrBlog: payload.homepageOrBlog,
      linkedinUrl: payload.linkedinUrl,
      githubUrl: payload.githubUrl,
      facebookUrl: payload.facebookUrl,
      twitterUrl: payload.twitterUrl,
      otherUrls: payload.otherUrls
    });
  }

});
