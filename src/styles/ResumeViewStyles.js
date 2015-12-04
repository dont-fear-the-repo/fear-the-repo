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
  menuItemStyle: {
    color: MasterTheme.orange,
    fontWeight: MasterTheme.light
  },
  resumeTitle: {
    textAlign: 'center',
    marginLeft: '50px',
    backgroundColor: MasterTheme.lightGray
  },
  buttonLabelStyle: {
    textTransform: 'none'
  },
  saveButton: {
    margin: '5px',
    float: 'right',
    marginRight: '15px',
    marginTop: '30px',
    marginBottom: '0'
  },
  printButton: {
    margin: '5px',
    float: 'right',
    marginTop: '30px',
    marginBottom: '0',
    marginRight: '20px'
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
    textAlign: 'center'
  },
  email: {
    color: 'blue',
    fontSize: '16px',
    marginLeft: '10px'
  },
  phone: {
    fontSize: '16px',
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
  url: {
    textAlign: 'left',
    marginLeft: '10px'
  },
  blockDrag: {
    cursor: 'move',
    margin: '0px'
  },
  jobTitle: {
    display: 'inline',
    margin: '10px',
    fontWeight: '700',
    fontSize: '18px'
  },
  pipe: {
    display: 'inline',
    margin: '5px'
  },
  companyName: {
    display: 'inline',
    margin: '10px',
    fontWeight: '500',
    fontSize: '16px'
  },
  location: {
    display: 'inline',
    margin: '10px'
  },
  year: {
    display: 'inline',
    float: 'right',
    marginRight: '10px'
  },
  bullet: {
    fontSize: '14px'
  }
};
