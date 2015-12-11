import { MasterTheme } from 'styles/MasterTheme';

const { muli,
        merriweather,
        times,
        bangers,
        light,
        normal,
        bold,
        orange,
        lightGray,
        midGray,
        darkGray,
        white } = MasterTheme;
// please use our white and orange to allow for easy future tweaking

const themeGlobals = {
  Default: {
    fontFamily: muli
  },
  Corporate: {
    fontFamily: times
  },
  Party: {
    fontFamily: bangers
  }
}

export const resumeThemes = {

  'Default': {
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
      marginLeft: '4%'
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
      position: 'absolute',
      fontFamily: themeGlobals.Default.fontFamily
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
      textAlign: 'left',
      fontFamily: themeGlobals.Default.fontFamily
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Default.fontFamily
    },
    email: {
      color: 'blue',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '2%',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Default.fontFamily
    },
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right',
      fontFamily: themeGlobals.Default.fontFamily
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right',
      fontFamily: themeGlobals.Default.fontFamily
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
      fontSize: '16px',
      fontFamily: themeGlobals.Default.fontFamily
    },
    companyName: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: '16px',
      fontFamily: themeGlobals.Default.fontFamily
    },
    jobLocation: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontFamily: themeGlobals.Default.fontFamily
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: '3%',
      marginTop: '12px',
      fontFamily: themeGlobals.Default.fontFamily
    },
    schoolName: {
      display: 'inline-block',
      fontWeight: 'bold',
      fontFamily: themeGlobals.Default.fontFamily
    },
    schoolDegree: {
      display: 'inline-block',
      fontFamily: themeGlobals.Default.fontFamily
    },
    schoolYear: {
      display: 'inline-block',
      fontFamily: themeGlobals.Default.fontFamily
    },
    schoolLocation: {
      display: 'inline-block',
      fontFamily: themeGlobals.Default.fontFamily
    },
    personalStatement: {
      fontFamily: themeGlobals.Default.fontFamily
    },
    headingTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      marginLeft: '3%',
      paddingTop: '20px',
      fontFamily: themeGlobals.Default.fontFamily
    }
  },

  'Corporate': {
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
      marginLeft: '4%'
    },
    plain: {
      marginLeft: '10px'
    },
    location: {
      fontSize: '16px',
      display: 'block',
      float: 'left',
      marginLeft: '35px',
      position: 'absolute',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    name: {
      display: 'inline-block',
      fontWeight: '700',
      fontSize: '32px',
      marginLeft: '40%',
      marginBottom: '1%',
      marginTop: '3%',
      textAlign: 'center',
      position: 'relative',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    email: {
      color: 'blue',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '2%',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right',
      fontFamily: themeGlobals.Corporate.fontFamily
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
      fontSize: '16px',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    companyName: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: '16px',
      color: 'red',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    jobLocation: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: '3%',
      marginTop: '12px',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    schoolName: {
      display: 'inline-block',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    schoolDegree: {
      display: 'inline-block',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    schoolYear: {
      display: 'inline-block',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    schoolLocation: {
      display: 'inline-block',
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    personalStatement: {
      fontFamily: themeGlobals.Corporate.fontFamily
    },
    headingTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      fontFamily: themeGlobals.Corporate.fontFamily,
      marginLeft: '3%',
      paddingTop: '20px'
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
    blockDiv: {
      marginLeft: '4%'
    },
    plain: {
      marginLeft: '10px'
    },
    location: {
      fontSize: '16px',
      display: 'block',
      float: 'left',
      marginLeft: '35px',
      position: 'absolute',
      fontFamily: themeGlobals.Party.fontFamily
    },
    name: {
      display: 'inline-block',
      fontWeight: '700',
      fontSize: '32px',
      marginLeft: '40%',
      marginBottom: '1%',
      marginTop: '3%',
      textAlign: 'center',
      position: 'relative',
      fontFamily: themeGlobals.Party.fontFamily
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Party.fontFamily
    },
    email: {
      color: 'blue',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '2%',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Party.fontFamily
    },
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right',
      fontFamily: themeGlobals.Party.fontFamily
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right',
      fontFamily: themeGlobals.Party.fontFamily
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
      fontSize: '16px',
      fontFamily: themeGlobals.Party.fontFamily
    },
    companyName: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: '16px',
      color: 'red',
      fontFamily: themeGlobals.Party.fontFamily
    },
    jobLocation: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontFamily: themeGlobals.Party.fontFamily
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: '3%',
      marginTop: '12px',
      fontFamily: themeGlobals.Party.fontFamily
    },
    schoolName: {
      display: 'inline-block',
      fontFamily: themeGlobals.Party.fontFamily
    },
    schoolDegree: {
      display: 'inline-block',
      fontFamily: themeGlobals.Party.fontFamily
    },
    schoolYear: {
      display: 'inline-block',
      fontFamily: themeGlobals.Party.fontFamily
    },
    schoolLocation: {
      display: 'inline-block',
      fontFamily: themeGlobals.Party.fontFamily
    },
    personalStatement: {
      fontFamily: themeGlobals.Party.fontFamily
    },
    headingTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      fontFamily: themeGlobals.Party.fontFamily,
      marginLeft: '3%',
      paddingTop: '20px'
    }
  }

};
