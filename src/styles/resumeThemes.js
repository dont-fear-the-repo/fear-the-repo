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
    headerDiv: {
      paddingBottom: '3%'
    },
    plain: {
      marginLeft: '10px'
    },
    location: {
      fontSize: '16px',
      display: 'block',
      float: 'left',
      marginLeft: '29px',
      marginTop: '20px',
      position: 'absolute'
    },
    city: {
      // width: '200px'
    },
    state: {
      width: '50px'
    },
    name: {
      display: 'inline-block',
      fontWeight: '700',
      fontSize: '32px',
      marginLeft: '3%',
      paddingRight: '3%',
      paddingTop: '3%',
      textAlign: 'left'
    },
    profession: {
      textAlign: 'center'
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '3%',
      marginTop: '22px',
      position: 'relative'
    },
    email: {
      color: 'blue',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '2%',
      marginTop: '22px',
      position: 'relative'
    },
    url: {
      color: 'blue',
      fontSize: '14px',
      marginRight: '3%',
      textAlign: 'right'
    },
    pipe: {
      display: 'inline',
      margin: '5px'
    },
    headerPipe: {
      display: 'inline',
      float: 'left',
      fontSize: '16px',
      marginLeft: '7px',
      marginTop: '22px',
      position: 'absolute'
    },
    jobTitle: {
      display: 'inline-block',
      cursor: 'text',
      margin: '10px',
      fontWeight: '700',
      fontSize: '18px'
    },
    companyName: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: '16px'
    },
    jobLocation: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text'
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: '3%'
    },
    schoolName: {
      display: 'inline-block',
    },
    schoolDegree: {
      display: 'inline-block',
    },
    schoolYear: {
      display: 'inline-block',
    },
    schoolLocation: {
      display: 'inline-block'
    },
    personalStatement: {

    }
  },

  'Corporate': {
    plain: {
      marginLeft: '10px'
    },
    location: {
      marginTop: '2%',
      float: 'left',
      marginRight: '2%',
      display: 'block',
      cursor: 'text',
      position: 'relative',
      top: '20%'
    },
    city: {
      textAlign: 'left',

    },
    state: {
      textAlign: 'right'
    },
    name: {
      fontWeight: '700',
      fontSize: '32px',
      textAlign: 'left',
      marginLeft: '2%',
      marginTop: '2%',
      display: 'inline-block',
      float: 'left'
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
    headerPipe: {
      display: 'inline',
      float: 'left',
      fontSize: '16px',
      marginLeft: '1%',
      marginTop: '2%',
      position: 'relative'
    },
    jobTitle: {
      display: 'inline-block',
      cursor: 'text',
      margin: '10px',
      fontWeight: '700',
      fontSize: '18px'
    },
    companyName: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: '16px',
      color: 'red'
    },
    jobLocation: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text'
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: '10px'
    },
    schoolName: {
      display: 'inline-block',
    },
    schoolDegree: {
      display: 'inline-block',
    },
    schoolYear: {
      display: 'inline-block',
    },
    schoolLocation: {
      display: 'inline-block'
    },
    personalStatement: {

    }
  },

  'Party': {
    // copy/paste above properties and update accordingly
  }

};
