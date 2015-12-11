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
    width: '90%',
    marginBottom: '10px',
    fontFamily: font
  },
  themeSelectDropdown: {
    backgroundColor: MasterTheme.white,
    fontFamily: font,
    paddingTop: '0',
    display: 'block'
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
    paddingTop: '58px',
    width: '150px'
  },
  paperLeftNavButton: {
    marginTop: '30px'
  },
  paperLeftNavThemeButton: {

  },
  paperLeftNavLabel: {
    color: MasterTheme.orange,
    font: font,
    marginBottom: '10px'
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
    paddingLeft: '20px',
    border: 'solid',
    borderColor: MasterTheme.orange,
    borderRadius: '6px',
    padding: '10px'
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
    marginTop: '10px'
  },
  bulletContainer: {
    width: '95%'
  },
  bullet: {
    fontSize: '16px',
    marginTop: '10px'
  },
  editorField: {
    cursor: 'text',
    // maxWidth: '90%',
    // minWidth: '80%',
    display: 'inline-block'
  },
  handle: {
    cursor: 'move',
    float: 'right',
  },
  thesaurusResults: {
    color: MasterTheme.black,
    paddingTop: '5px'
  },
  wordCount: {
    color: MasterTheme.lightGray
  },
  wordList: {
    color: MasterTheme.darkGray,
    textAlign: 'left'
  },
  wordType: {
    color: MasterTheme.orange,
    fontStyle: 'italic'
  }
  // ,
  // leftNav: {
  //   marginTop: '65px',
  //   paddingTop: '200px'
    // position: 'fixed',
    // zIndex: 10,
    // top: 0,
    // transform: 'translate3d(' + x + 'px, 0, 0)',
    // transition: !this.state.swiping && _stylesTransitions2['default'].easeOut(),
    // backgroundColor: this.getTheme().color,
    // overflow: 'hidden'
  // }
};
