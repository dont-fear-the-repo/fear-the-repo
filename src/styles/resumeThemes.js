import { MasterTheme } from 'styles/MasterTheme';

const { muli,
        merriweather,
        light,
        normal,
        bold,
        orange,
        lightGray,
        midGray,
        darkGray,
        white } = MasterTheme;
// please use our white and orange to allow for easy future tweaking

export const resumeThemes = {

  'Default': {
    plain: {
      marginLeft: '10px'
    },
    location: {
      marginLeft: '10px',
      display: 'inline-block'
    },
    city: {
      width: '200px'
    },
    state: {
      width: '50px'
    },
    name: {
      fontWeight: '700',
      fontSize: '32px',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'inline-block'
    },
    profession: {
      textAlign: 'center'
    },
    phone: {
      fontSize: '16px',
      marginLeft: '10px'
    },
    email: {
      color: 'blue',
      fontSize: '16px',
      marginLeft: '10px'
    },
    url: {
      color: 'blue',
      textAlign: 'left',
      marginLeft: '10px'
    },
    pipe: {
      display: 'inline',
      margin: '5px'
    },
    jobTitle: {
      display: 'inline',
      margin: '10px',
      fontWeight: '700',
      fontSize: '18px'
    },
    companyName: {
      display: 'inline',
      margin: '10px',
      fontWeight: '500',
      fontSize: '16px'
    },
    jobLocation: {
      display: 'inline',
      margin: '10px'
    },
    jobYear: {
      display: 'inline',
      float: 'right',
      marginRight: '10px'
    },
    schoolName: {

    },
    schoolDegree: {

    },
    schoolYear: {

    },
    schoolLocation: {

    },
    personalStatement: {

    }
  },

  'Corporate': {
    // copy/paste above properties and update accordingly
  },

  'Party': {
    // copy/paste above properties and update accordingly
  }

};
