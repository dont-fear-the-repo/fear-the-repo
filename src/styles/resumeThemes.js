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
    nameFont: questrial,
    nameFontSize: '30px',

    resumeHeaderFont: muli,
    resumeHeaderFontSize: '12px',

    headingsFont: questrial,
    headingsFontSize: '14px',

    jobTitleFont: muli,
    jobTitleFontSize: '12px',

    bulletFont: muli,
    bulletFontSize: '10px',

    accentColor: darkGray,
    accentColorBG: lightGray,
    linkColor: darkGray,
    sideMargin: '60px',
    topMargin: '40px'
  },
  Experienced: {
    nameFont: droidserif,
    nameFontSize: '35px',

    resumeHeaderFont: droidserif,
    resumeHeaderFontSize: '10px',

    headingsFont: droidserif,
    headingsFontSize: '14px',

    jobTitleFont: times,
    jobTitleFontSize: '12px',

    bulletFont: times,
    bulletFontSize: '10px',

    accentColor: darkGray,
    accentColorBG: lightGray,
    linkColor: darkGray,
    sideMargin: '40px',
    topMargin: '30px'
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
      // backgroundColor: 'rgba(255,100,100, .1)',
      paddingTop: themeGlobals.Default.topMargin,
      paddingLeft: themeGlobals.Default.sideMargin,
      paddingRight: themeGlobals.Default.sideMargin,
      position: 'relative' //keep this so child el go where they should
    },
    headerNameDiv: {
      // backgroundColor: 'rgba(255,100,100, .1)'
      display: 'inline',
      position: 'relative',
    },
    headerContactDiv: {
      // backgroundColor: 'rgba(100,100,255,.1)'
      position: 'relative',
    },
    headerLinksDiv: {
      // backgroundColor: 'rgba(100,255,100, .1)',
      position: 'absolute',
      right: themeGlobals.Default.sideMargin,
      // top: themeGlobals.Default.topMargin,
      bottom: '10px',
      textAlign: 'right'
    },



    name: {
      display: 'inline-block',
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: themeGlobals.Default.nameFontSize,
      fontFamily: themeGlobals.Default.nameFont,
      color: themeGlobals.Default.accentColor
    },



    location: {
      display: 'block',
      fontSize: themeGlobals.Default.resumeHeaderFontSize,
      fontFamily: themeGlobals.Default.resumeHeaderFont
    },
    state: {
    },

    phone: {
      cursor: 'text',
      display: 'inline-block',
      position: 'relative',
      fontSize: themeGlobals.Default.resumeHeaderFontSize,
      fontFamily: themeGlobals.Default.resumeHeaderFont
    },

    headerPipe: {
      display: 'inline-block',
      marginLeft: '6px',
      marginRight: '6px',
      color: themeGlobals.Default.accentColor,
      fontSize: themeGlobals.Default.resumeHeaderFontSize,
      fontFamily: themeGlobals.Default.resumeHeaderFont
    },

    email: {
      color: themeGlobals.Default.linkColor,
      display: 'inline-block',
      position: 'relative',
      fontSize: themeGlobals.Default.resumeHeaderFontSize,
      fontFamily: themeGlobals.Default.resumeHeaderFont
    },



    webLinkedin: {
      color: themeGlobals.Default.linkColor,
      display: 'block',
      fontSize: themeGlobals.Default.resumeHeaderFontSize,
      fontFamily: themeGlobals.Default.resumeHeaderFont
    },
    webOther: {
      color: themeGlobals.Default.linkColor,
      display: 'inline-block',
      fontSize: themeGlobals.Default.resumeHeaderFontSize,
      fontFamily: themeGlobals.Default.resumeHeaderFont
    },


    headerDividerLine: {
      backgroundColor: 'white',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '1px',
      width: '90%',
      marginTop: '10px'
    },


    pipe: {
      display: 'inline',
      margin: '0px 5px',
      color: themeGlobals.Default.accentColor
    },
    jobTitle: {
      display: 'inline-block',
      cursor: 'text',
      margin: '0px 5px',
      fontWeight: '700',
      fontSize: themeGlobals.Default.jobTitleFontSize,
      fontFamily: themeGlobals.Default.jobTitleFont
    },
    companyName: {
      display: 'inline-block',
      margin: '0px 5px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: themeGlobals.Default.jobTitleFontSize,
      fontFamily: themeGlobals.Default.jobTitleFont,
    },
    jobLocation: {
      display: 'inline-block',
      margin: '0px 5px',
      cursor: 'text',
      fontSize: themeGlobals.Default.jobTitleFontSize,
      fontFamily: themeGlobals.Default.jobTitleFont,
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: themeGlobals.Default.sideMargin,
      marginTop: '0px',
      fontSize: themeGlobals.Default.jobTitleFontSize,
      fontFamily: themeGlobals.Default.jobTitleFont,
    },


    headingTitle: {
      fontWeight: 'bold',
      fontSize: '14px',
      marginLeft: themeGlobals.Default.sideMargin,
      paddingTop: '10px',
      fontSize: themeGlobals.Default.headingsFontSize,
      fontFamily: themeGlobals.Default.headingsFont
    },
    headingText: {
      fontFamily: themeGlobals.Default.bulletFont,
      fontSize: themeGlobals.Default.bulletFontSize,
      marginTop: '5px',
      marginLeft: '8%'
    },


    bulletText: {
      fontFamily: themeGlobals.Default.bulletFont,
      fontSize: themeGlobals.Default.bulletFontSize,
      marginTop: '6px'
    },


    blockDiv: {
      marginLeft: themeGlobals.Default.sideMargin,
      position: 'relative'
    }
  },



































  'Experienced': {
    headerDiv: {
      // backgroundColor: 'rgba(255,100,100, .1)',
      paddingTop: themeGlobals.Experienced.topMargin,
      paddingLeft: themeGlobals.Experienced.sideMargin,
      paddingRight: themeGlobals.Experienced.sideMargin,
      position: 'relative', //keep this so child el go where they should
      height: '100px'
    },
    headerNameDiv: {
      // backgroundColor: 'rgba(255,100,100, .1)',
      display: 'inline',
      position: 'absolute',
      left: 'calc(50% - 120px)',
      textAlign: 'center',
      bottom: 0
    },
    headerContactDiv: {
      // backgroundColor: 'rgba(100,100,255,.1)',
      position: 'absolute',
      left: themeGlobals.Experienced.sideMargin,
      bottom: 0,
      textAlign: 'left'
    },
    headerLinksDiv: {
      // backgroundColor: 'rgba(100,255,100, .1)',
      position: 'absolute',
      right: themeGlobals.Experienced.sideMargin,
      bottom: 0,
      textAlign: 'right'
    },



    name: {
      display: 'inline-block',
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: themeGlobals.Experienced.nameFontSize,
      fontFamily: themeGlobals.Experienced.nameFont,
      color: themeGlobals.Experienced.accentColor
    },



    location: {
      display: 'block',
      fontSize: themeGlobals.Experienced.resumeHeaderFontSize,
      fontFamily: themeGlobals.Experienced.resumeHeaderFont
    },
    state: {
    },

    phone: {
      cursor: 'text',
      display: 'inline-block',
      position: 'relative',
      fontSize: themeGlobals.Experienced.resumeHeaderFontSize,
      fontFamily: themeGlobals.Experienced.resumeHeaderFont
    },

    headerPipe: {
      display: 'inline-block',
      marginLeft: '6px',
      marginRight: '6px',
      color: themeGlobals.Experienced.accentColor,
      fontSize: themeGlobals.Experienced.resumeHeaderFontSize,
      fontFamily: themeGlobals.Experienced.resumeHeaderFont
    },

    email: {
      color: themeGlobals.Experienced.linkColor,
      display: 'inline-block',
      position: 'relative',
      fontSize: themeGlobals.Experienced.resumeHeaderFontSize,
      fontFamily: themeGlobals.Experienced.resumeHeaderFont
    },



    webLinkedin: {
      color: themeGlobals.Experienced.linkColor,
      display: 'block',
      fontSize: themeGlobals.Experienced.resumeHeaderFontSize,
      fontFamily: themeGlobals.Experienced.resumeHeaderFont
    },
    webOther: {
      color: themeGlobals.Experienced.linkColor,
      display: 'inline-block',
      fontSize: themeGlobals.Experienced.resumeHeaderFontSize,
      fontFamily: themeGlobals.Experienced.resumeHeaderFont
    },



    headerDividerLine: {
      backgroundColor: themeGlobals.Experienced.accentColor,
      position: 'absolute',
      bottom: '0px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '1px',
      width: 930 - themeGlobals.Experienced.sideMargin*2 +'px',
      // this is fragile, based on ResumeViewStyles final paperwidth
      marginTop: '5px'
    },


    pipe: {
      display: 'inline',
      margin: '0px 5px',
      color: themeGlobals.Experienced.accentColor
    },
    jobTitle: {
      display: 'inline-block',
      cursor: 'text',
      margin: '0px 5px',
      fontWeight: '700',
      fontSize: themeGlobals.Experienced.jobTitleFontSize,
      fontFamily: themeGlobals.Experienced.jobTitleFont
    },
    companyName: {
      display: 'inline-block',
      margin: '0px 5px',
      cursor: 'text',
      fontWeight: '500',
      fontSize: themeGlobals.Experienced.jobTitleFontSize,
      fontFamily: themeGlobals.Experienced.jobTitleFont,
    },
    jobLocation: {
      display: 'inline-block',
      margin: '0px 5px',
      cursor: 'text',
      fontSize: themeGlobals.Experienced.jobTitleFontSize,
      fontFamily: themeGlobals.Experienced.jobTitleFont,
    },
    jobYear: {
      display: 'inline-block',
      cursor: 'text',
      float: 'right',
      marginRight: themeGlobals.Experienced.sideMargin,
      marginTop: '0px',
      fontSize: themeGlobals.Experienced.jobTitleFontSize,
      fontFamily: themeGlobals.Experienced.jobTitleFont,
    },


    headingTitle: {
      fontWeight: 'bold',
      fontSize: '14px',
      marginLeft: themeGlobals.Experienced.sideMargin,
      paddingTop: '5px',
      fontSize: themeGlobals.Experienced.headingsFontSize,
      fontFamily: themeGlobals.Experienced.headingsFont
    },
    headingText: {
      fontFamily: themeGlobals.Experienced.bulletFont,
      fontSize: themeGlobals.Experienced.bulletFontSize,
      marginTop: '5px',
      marginLeft: '8%'
    },


    bulletText: {
      fontFamily: themeGlobals.Experienced.bulletFont,
      fontSize: themeGlobals.Experienced.bulletFontSize,
      marginTop: '6px'
    },


    blockDiv: {
      marginLeft: themeGlobals.Experienced.sideMargin,
      position: 'relative'
    }
  },



























  'Old Business': {
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

  'Meh Party': {
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
