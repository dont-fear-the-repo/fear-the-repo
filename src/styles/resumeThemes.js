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
    themeGlobals: {
    },
    headerDiv: {
      paddingBottom: '7%'
    },
    headerLeft: {
      position: 'relative',
      left: 0
    },
    headerRight: {
      position: 'relative',
      right: 0
    },
    blockDiv: {
      marginLeft: '3%'
    },
    plain: {
    },
    footerText: {
      marginLeft: '2%',
      fontSize: '16px',
      padding: '20px'
    },
    location: {
      fontSize: '16px',
      display: 'block',
      float: 'left',
      marginLeft: '35px',
      position: 'absolute'
    },
    state: {
      marginLeft: '80px'
    },
    name: {
      display: 'inline-block',
      fontWeight: '700',
      fontSize: '32px',
      marginLeft: '3%',
      marginBottom: '1%',
      marginTop: '3%',
      textAlign: 'left'
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
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
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right'
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right'
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
      fontSize: '16px'
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
      marginRight: '3%',
      marginTop: '12px'
    },
    schoolName: {
      display: 'inline-block',
      fontWeight: 'bold'
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

    },
    headingTitle: {
      fontWeight: 'bold',
      fontSize: '18px'
    }
  },

  'Corporate': {
    themeGlobals: {
      globalFontFamily: muli
    },
    headerDiv: {
      paddingBottom: '7%'
    },
    headerLeft: {
      position: 'relative',
      left: 0
    },
    headerRight: {
      position: 'relative',
      right: 0
    },
    blockDiv: {
      color: 'green',
      marginLeft: '3%'
    },
    plain: {
      marginLeft: '10px'
    },
    location: {
      fontSize: '16px',
      display: 'block',
      float: 'left',
      marginLeft: '35px',
      position: 'absolute'
    },
    name: {
      display: 'inline-block',
      fontWeight: '700',
      fontSize: '32px',
      marginLeft: '3%',
      marginBottom: '1%',
      marginTop: '3%',
      textAlign: 'center',
      position: 'relative'
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
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
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right'
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right'
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
      marginRight: '3%',
      marginTop: '12px'
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

    },
    headingTitle: {
      fontWeight: 'bold',
      fontSize: '20px'
    }
  },

  'Party': {
    headerDiv: {
      paddingBottom: '7%'
    },
    headerLeft: {
      position: 'relative',
      left: 0
    },
    headerRight: {
      position: 'relative',
      right: 0
    },
    plain: {
      marginLeft: '10px'
    },
    location: {
      fontSize: '16px',
      display: 'block',
      float: 'left',
      marginLeft: '35px',
      position: 'absolute'
    },
    name: {
      display: 'inline-block',
      fontWeight: '700',
      fontSize: '32px',
      marginLeft: '3%',
      marginBottom: '1%',
      marginTop: '3%',
      textAlign: 'left'
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
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
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right'
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right'
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
      marginRight: '3%',
      marginTop: '12px'
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

    },
    headingTitle: {
      fontWeight: 'bold'
    }
  }

};
