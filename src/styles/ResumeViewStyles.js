import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const merriweather = MasterTheme.merriweather;

export const styles = {
  container: {
    backgroundColor: MasterTheme.lightGray,
    height: '1000px',
    width: '100%',
    fontFamily: font
  },
  headerContainer: {
    textAlign: 'center',
    width: '98%',
    marginBottom: '10px',
    fontFamily: font
  },
  themeSelectDropdown: {
    backgroundColor: MasterTheme.lightGray,
    fontFamily: font,
    marginLeft: '40px',
    float: 'left',
    paddingTop: '0'
  },
  resumeTitle: {
    textAlign: 'center',
    marginLeft: '50px',
    backgroundColor: MasterTheme.lightGray
  },
  saveButton: {
    margin: '5px',
    float: 'right',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '0'
  },
  printButton: {
    margin: '5px',
    float: 'right',
    marginTop: '20px',
    marginBottom: '0'
  },
  textCenter: {
    margin: '20px',
    backgroundColor: MasterTheme.lightGray
  },
  hintStyle: {
    paddingLeft: '8px'
  },
  marginTop: {
    height: '20px'
  },
  resumeContainer: {
    marginLeft: '20px',
    marginRight: '20px',
    fontFamily: merriweather
  },
  marginBottom: {
    height: '20px'
  },
  resumePaper: {
    height: '800px',
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  plain: {
    marginLeft: '10px'
  },
  underlineStyle: {
    borderColor: MasterTheme.white,
    borderWidth: '0px'
  },
  underlineFocusStyle: {
    borderColor: MasterTheme.orange,
    borderWidth: '1px'
  },
  hintStyle: {
    color: MasterTheme.lightGray
  },
  floatingLabelStyle: {
    color: MasterTheme.orange,
    fontFamily: font,
    fontWeight: MasterTheme.light
  },
  firstLine: {

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
    textAlign: 'center',
    display: 'inline-block'
  },
  email: {
    color: 'blue',
    fontSize: '16px',
    marginLeft: '10px',
    display: 'inline-block'
  },
  phone: {
    fontSize: '16px',
    marginLeft: '10px',
    display: 'inline-block'
  },
  location: {
    marginLeft: '10px',
    display: 'inline-block'
  },
  city: {
    width: '200px',
    display: 'inline-block'
  },
  state: {
    width: '50px',
    display: 'inline-block'
  },
  url: {
    textAlign: 'left',
    marginLeft: '10px',
    display: 'inline-block'
  },
  blockDrag: {
    cursor: 'move',
    margin: '0px'
  },
  jobTitle: {
    display: 'inline-block',
    margin: '10px',
    fontWeight: '700',
    fontSize: '18px'
  },
  pipe: {
    display: 'inline',
    margin: '5px'
  },
  companyName: {
    display: 'inline-block',
    margin: '10px',
    fontWeight: '500',
    fontSize: '16px'
  },
  location: {
    display: 'inline-block',
    margin: '10px'
  },
  year: {
    display: 'inline-block',
    float: 'right',
    marginRight: '10px'
  },
  bullet: {
    fontSize: '14px'
  },
  school1Name: {
    display: 'inline-block'
  },
  school2Name: {
    display: 'inline-block'
  },
  school1Degree: {
    display: 'inline-block'
  },
  school2Degree: {
    display: 'inline-block'
  },
  school1Location: {
    display: 'inline-block'
  },
  school2Location: {
    display: 'inline-block'
  },
  school1SchoolEndYear: {
    display: 'inline-block'
  },
  school2SchoolEndYear: {
    display: 'inline-block'
  }

};
