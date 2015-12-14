import { MasterTheme } from 'styles/MasterTheme';

const muli = MasterTheme.muli;
const merriweather = MasterTheme.merriweather;

export const styles = {
  mainBody: {
    textAlign: 'center',
    backgroundColor: MasterTheme.white,
    fontFamily: muli
  },
  heroImg: {
    width: '100%',
    position: 'relative',
    zIndex: '10'
  },
  heroDiv: {
    width: '100%',
    position: 'relative'
  },
  heroText: {
    color: 'white',
    cursor: 'default',
    fontFamily: muli,
    fontSize: '36px',
    fontWeight: '200',
    textAlign: 'center',
    width: '800px',
    height: '150px',
    letterSpacing: '5px',
    position: 'absolute',
    marginLeft: 'calc(50% - 400px)',
    marginTop: '-90%',
    zIndex: '11'
  },
  callToAction: {
    width: '260px',
    height: '60px',
    cursor: 'pointer',
    borderRadius: '5px',
    position: 'absolute',
    marginLeft: 'calc(50% - 130px)',
    marginTop: '-77%',
    borderColor: MasterTheme.orange,
    borderStyle: 'solid',
    borderWidth: '2px',
    color: MasterTheme.orange,
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: '400',
    fontFamily: muli,
    letterSpacing: '3px',
    padding: '10px',
    zIndex: '11',
    transition: '0.3s ease-out',
    ':hover': {
      backgroundColor: MasterTheme.orange,
      color: MasterTheme.white,
      transition: '0.3s ease-out'
    }
  },
  getStartedButton: {
    width: '260px',
    height: '60px',
    cursor: 'pointer',
    borderRadius: '5px',
    position: 'absolute',
    marginLeft: 'calc(50% - 130px)',
    marginTop: '30px',
    borderColor: MasterTheme.orange,
    borderStyle: 'solid',
    borderWidth: '2px',
    color: MasterTheme.orange,
    textAlign: 'center',
    fontSize: '22px',
    fontWeight: '400',
    fontFamily: muli,
    letterSpacing: '3px',
    padding: '10px',
    zIndex: '11',
    transition: '0.3s ease-out',
    ':hover': {
      backgroundColor: MasterTheme.orange,
      color: MasterTheme.white,
      transition: '0.3s ease-out'
    }
  },
  circle: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    position: 'absolute',
    marginLeft: 'calc(50% - 35px)',
    marginTop: '-70%',
    zIndex: '11',
    transition: '0.3s',
    ':hover': {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.36), 0 1px 4px rgba(0, 0, 0, 0.48)',
      transition: '0.3s'
    }
  },
  downArrow: {
    marginTop: '25%',
    zIndex: '11'
  },
  grayDivMiddle: {
    width: '100%',
    paddingBottom: '80px',
    fontSize: '14pt',
    textAlign: 'center',
    color: MasterTheme.white,
    position: 'relative',
    marginTop: '-50%',
    zIndex: '11'
  },
  grayDivBottom: {
    backgroundColor: MasterTheme.midGray,
    width: '100%',
    paddingTop: '30px',
    paddingBottom: '10px',
    position: 'relative'
  },
  wysiwyg: {
    fontSize: '44px',
    letterSpacing: '3px',
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: '40px'
  },
  copy: {
    width: '65%',
    marginLeft: 'auto',
    position: 'relative',
    marginRight: 'auto',
    paddingTop: '60px',
    paddingBottom: '30px'
  },
  middleCopy: {
    width: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '60px',
    paddingBottom: '30px',
    fontWeight: MasterTheme.light,
    lineHeight: '30px'
  },
  video: {
    borderRadius: '5px',
    borderColor: 'white',
    borderStyle: 'dashed',
    borderWidth: '2px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '500px', // vimeo default embed dimensions
    height: '281px',
    fontWeight: MasterTheme.light
  },
  bottomCopy: {
    marginBottom: '30px',
    color: MasterTheme.white,
    fontFamily: muli
  },
  buttonPaper: {
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '5px'
  },
  buttonColor: MasterTheme.orange,
  buttonHoverColor: MasterTheme.white,
  buttonLabelStyle: {
    textTransform: 'none'
  },
  button: {
    width: '100%',
    padding: '8px',
    font: muli,
    fontSize: '24pt',
    borderRadius: '5px'
  }
};
