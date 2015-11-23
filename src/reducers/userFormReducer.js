import { createReducer } from '../utils';
import { SAVE_FORM } from 'constants/userFormConstants';

const initialState = {
};

export default createReducer(initialState, {

  [SAVE_FORM]: (state, payload) => {
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
      otherUrls: payload.otherUrls,
      // temp links below
      project1Name: payload.project1Name,
      project1Url: payload.project1Url,
      project1Role: payload.project1Role,
      project1Description: payload.project1Description,
      project2Name: payload.project2Name,
      project2Url: payload.project2Url,
      project2Role: payload.project2Role,
      project2Description: payload.project2Description,
      job1Name: payload.job1Name,
      job1Location: payload.job1Location,
      job1Years: payload.job1Years,
      job1Title: payload.job1Title,
      job1Description: payload.job1Description,
      job2Name: payload.job2Name,
      job2Location: payload.job2Location,
      job2Years: payload.job2Years,
      job2Title: payload.job2Title,
      job2Description: payload.job2Description
    });
  }

});
