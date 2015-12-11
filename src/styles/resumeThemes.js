import {
  MasterTheme
}
from 'styles/MasterTheme';

const {
  muli,
  merriweather,
  times,
  bangers,
  questrial,
  droidserif,
  light,
  normal,
  bold,
  orange,
  lightGray,
  midGray,
  darkGray,
  white
} = MasterTheme;
// please use our white and orange to allow for easy future tweaking

const themeGlobals = {
  Default: {
    name: questrial,
    headers: questrial,
    body: muli,
    bullets: muli,
    accentColor: darkGray,
    accentColorBG: lightGray,
    linkColor: darkGray
  },
  Corporate: {
    name: droidserif,
    headers: questrial,
    body: droidserif,
    bullets: times,
    accentColor: orange,
    accentColorBG: lightGray,
    linkColor: 'rgb(128, 169, 135)'
  },
  Party: {
    name: bangers,
    headers: questrial,
    body: droidserif,
    bullets: times,
    accentColor: orange,
    accentColorBG: lightGray,
    linkColor: 'rgb(128, 169, 135)'
  }
}

export const resumeThemes = {

  'Modern': {
    headerDiv: {
      paddingBottom: '7%',
      position: 'relative', //keep this so child el go where they should
      height: '50px'
    },
    headerLeft: {
      position: 'absolute',
      left: 0,
      backgroundColor: 'rgb(255,200,200)'
    },
    headerRight: {
      position: 'absolute',
      right: 0,
      backgroundColor: 'rgb(200,255,200)'
    },
    blockDiv: {
      marginLeft: '4%'
    },
    plain: {},
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
      fontFamily: themeGlobals.Default.body
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
      fontFamily: themeGlobals.Default.body,
      color: themeGlobals.Default.accentColor
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Default.body
    },
    email: {
      color: themeGlobals.Default.linkColor,
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '2%',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Default.body
    },
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right',
      fontFamily: themeGlobals.Default.body
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right',
      fontFamily: themeGlobals.Default.body
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
      fontFamily: themeGlobals.Default.body
    },
    companyName: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: '16px',
      fontFamily: themeGlobals.Default.body
    },
    jobLocation: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontFamily: themeGlobals.Default.body
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: '3%',
      marginTop: '12px',
      fontFamily: themeGlobals.Default.body
    },
    schoolName: {
      display: 'inline-block',
      fontWeight: 'bold',
      fontFamily: themeGlobals.Default.body
    },
    schoolDegree: {
      display: 'inline-block',
      fontFamily: themeGlobals.Default.body
    },
    schoolYear: {
      display: 'inline-block',
      fontFamily: themeGlobals.Default.body
    },
    schoolLocation: {
      display: 'inline-block',
      fontFamily: themeGlobals.Default.body
    },
    personalStatement: {
      fontFamily: themeGlobals.Default.body
    },
    headingTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      marginLeft: '3%',
      paddingTop: '20px',
      fontFamily: themeGlobals.Default.body
    },
    bulletText: {
      fontFamily: themeGlobals.Default.body,
      fontSize: '16px',
      marginTop: '10px'
    }
  },

  'Business': {
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
      fontFamily: themeGlobals.Corporate.body
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
      fontFamily: themeGlobals.Corporate.name
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Corporate.body
    },
    email: {
      color: 'blue',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '2%',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Corporate.body
    },
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right',
      fontFamily: themeGlobals.Corporate.body
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right',
      fontFamily: themeGlobals.Corporate.body
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
      fontFamily: themeGlobals.Corporate.body
    },
    companyName: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: '16px',
      color: themeGlobals.Corporate.accentColor,
      fontFamily: themeGlobals.Corporate.headers
    },
    jobLocation: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontFamily: themeGlobals.Corporate.body
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: '3%',
      marginTop: '12px',
      fontFamily: themeGlobals.Corporate.body
    },
    schoolName: {
      display: 'inline-block',
      fontFamily: themeGlobals.Corporate.headers
    },
    schoolDegree: {
      display: 'inline-block',
      fontFamily: themeGlobals.Corporate.body
    },
    schoolYear: {
      display: 'inline-block',
      fontFamily: themeGlobals.Corporate.body
    },
    schoolLocation: {
      display: 'inline-block',
      fontFamily: themeGlobals.Corporate.body
    },
    personalStatement: {
      fontFamily: themeGlobals.Corporate.body
    },
    headingTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      fontFamily: themeGlobals.Corporate.body,
      marginLeft: '3%',
      paddingTop: '20px'
    },
    bulletText: {
      fontFamily: themeGlobals.Corporate.body,
      fontSize: '16px',
      marginTop: '10px'
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
      fontFamily: themeGlobals.Party.body
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
      fontFamily: themeGlobals.Party.name
    },
    phone: {
      cursor: 'text',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '35px',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Party.body
    },
    email: {
      color: 'blue',
      display: 'block',
      float: 'left',
      fontSize: '16px',
      marginLeft: '2%',
      marginTop: '22px',
      position: 'relative',
      fontFamily: themeGlobals.Party.body
    },
    webLinkedin: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginRight: '3%',
      float: 'right',
      fontFamily: themeGlobals.Party.body
    },
    webOther: {
      color: 'blue',
      display: 'inline-block',
      fontSize: '14px',
      marginTop: '22px',
      marginRight: '-180px',
      position: 'static',
      float: 'right',
      fontFamily: themeGlobals.Party.body
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
      fontFamily: themeGlobals.Party.name
    },
    companyName: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: '16px',
      color: themeGlobals.Party.accentColor,
      fontFamily: themeGlobals.Party.name
    },
    jobLocation: {
      display: 'inline-block',
      margin: '10px',
      cursor: 'text',
      fontFamily: themeGlobals.Party.body
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: '3%',
      marginTop: '12px',
      fontFamily: themeGlobals.Party.body
    },
    schoolName: {
      display: 'inline-block',
      fontFamily: themeGlobals.Party.name
    },
    schoolDegree: {
      display: 'inline-block',
      fontFamily: themeGlobals.Party.body
    },
    schoolYear: {
      display: 'inline-block',
      fontFamily: themeGlobals.Party.body
    },
    schoolLocation: {
      display: 'inline-block',
      fontFamily: themeGlobals.Party.body
    },
    personalStatement: {
      fontFamily: themeGlobals.Party.body
    },
    headingTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      fontFamily: themeGlobals.Party.name,
      marginLeft: '3%',
      paddingTop: '20px'
    },
    bulletText: {
      fontFamily: themeGlobals.Party.body,
      fontSize: '16px',
      marginTop: '10px'
    }
  }

};
