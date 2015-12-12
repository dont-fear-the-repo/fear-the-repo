import {
  MasterTheme
}
from 'styles/MasterTheme';

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
    width: '90%',
    marginBottom: '10px',
    fontFamily: font
  },
  themeSelectDropdown: {
    width: '130px',
    // marginTop: '30px'
  },
  menuItemStyle: {
    color: MasterTheme.orange,
    fontWeight: MasterTheme.light
  },
  resumeTitle: {
    display: 'block',
    backgroundColor: MasterTheme.white
  },
  buttonLabelStyle: {
    textTransform: 'none'
  },
  leftNav: {
    width:'150px',
    backgroundColor: 'white',
    position: 'absolute',
    left: '0px',
    top: '75px',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
  },
  paperLeftNavButton: {
    marginTop: '15px',
    fontWeight: MasterTheme.bold
  },
  paperLeftNavThemeButton: {
    margin: '3px'
  },
  paperLeftDiv: {
    // marginTop: '5px',
    // marginBottom: '5px'
  },
  paperLeftNavLabel: {
    color: MasterTheme.orange,
    font: font,
    fontWeight: MasterTheme.light,
    marginBottom: '3px',
    marginTop: '25px'
  },
  exportButton: {
    margin: '5px',
    float: 'right',
    marginTop: '40px',
    marginBottom: '0',
    marginRight: '17px',
    padding: '0 0px'
  },
  textCenter: {
    margin: '20px',
    backgroundColor: MasterTheme.lightGray
  },
  marginTop: {
    height: '20px',
    textAlign: 'center'
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
    marginTop: '45px',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative'
  },
  underlineStyle: {
    borderColor: MasterTheme.orange,
    borderWidth: '1px',
    color: MasterTheme.orange
  },
  underlineFocusStyle: {
    borderColor: MasterTheme.orange,
    borderWidth: '1px',
    color: MasterTheme.orange
  },
  hintStyle: {
    color: MasterTheme.lightGray,
    // border: 'solid',
    // borderColor: MasterTheme.orange,
    // borderRadius: '6px',
    padding: '10px',
    paddingLeft: '20px',
    paddingBottom: '2px',
    fontSize: '14px'
  },
  floatingLabelStyle: {
    color: MasterTheme.orange,
    fontFamily: font,
    fontWeight: MasterTheme.light
  },
  errorMessageStyle: {
    color: MasterTheme.orange,
    fontFamily: font,
    fontWeight: MasterTheme.bold,
    textAlign: 'center',
    paddingTop: '40px'
  },
  bulletContainer: {      // This controls the visual paper effect of DnD bullets.
    position: 'relative'  // Leave this here; it's controls behavior, not visible print style.
  },
  editorField: {
    cursor: 'text',
    display: 'inline-block'
  },
  handle: {
    cursor: 'move',
    position: 'absolute',
    right: '10px',
    height: '20px',
    top: '-2px',
    opacity: 0.4
  },
  bulletMinusIconImage: {
    opacity: 0.4,
    width: '18px',
    position: 'absolute',
    right: '30px',
    display: 'inline-block'
  },
  bulletPlusIconImage: {
    opacity: 0.4,
    width: '18px',
    position: 'absolute',
    right: '50px',
    top: '20px',
    display: 'inline-block'
  },
  AddNewBlockIconImage: {
    opacity: 0.2,
    width: '30px',
    position: 'relative',
    left: '45px',
    top: '10px',
    display: 'inline-block'
  },
  blockMinusIconImage: {
    opacity: 0.2,
    width: '30px',
    position: 'absolute',
    left: '-30px',
    top: '10px',
    display: 'inline-block'
  },
  thesaurus: {
    textAlign: 'center'
  },
  suggestions: {
    paddingBottom: '3px',
    color: MasterTheme.darkGray,
    fontWeight: MasterTheme.bold
  },
  thesaurusSearchBox: {
    width: '130px',
    marginTop: '3px',
    marginLeft: '2px'
  },
  thesaurusResults: {
    color: MasterTheme.black,
    padding: '5px'
  },
  thesaurusSearchButton: {
    margin: '5px',
    fontWeight: MasterTheme.bold
  },
  wordCount: {
    color: MasterTheme.lightGray,
    paddingBottom: '6px'
  },
  wordList: {
    color: MasterTheme.darkGray,
    textAlign: 'left',
    padding: '4px'
  },
  wordType: {
    color: MasterTheme.orange,
    fontStyle: 'italic'
  }
};
