import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const merriweather = MasterTheme.merriweather;
const resumePaperWidth = 612; // 8.5" @ 72dpi
const viewMultiplier = 1.5; // this adjusts resumePaper dimensions and container height

export const styles = {
  container: {
    backgroundColor: MasterTheme.lightGray,
    height: (resumePaperWidth * viewMultiplier * 1.45).toString() + 'px',
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
    height: (resumePaperWidth * (11 / 8.5) * viewMultiplier).toString() + 'px',
    width: (resumePaperWidth * viewMultiplier).toString() + 'px',
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
    color: MasterTheme.lightGray,
    paddingLeft: '8px'
  },
  floatingLabelStyle: {
    color: MasterTheme.orange,
    fontFamily: font,
    fontWeight: MasterTheme.light
  },
  blockDrag: {
    cursor: 'move',
    margin: '0px'
  },
  bullet: {
    fontSize: '14px'
  }
};
