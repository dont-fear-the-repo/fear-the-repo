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
    width: '100%'
  },
  heroDiv: {
    width: '100%',
    height: '763px',
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
    marginTop: '-460px'
  },
  callToAction: {
    width: '350px',
    height: '80px',
    cursor: 'pointer',
    borderRadius: '5px',
    position: 'absolute',
    marginLeft: 'calc(50% - 175px)',
    marginTop: '-250px',
    borderColor: MasterTheme.orange,
    borderStyle: 'solid',
    borderWidth: '2px',
    color: MasterTheme.orange,
    textAlign: 'center',
    fontSize: '22px',
    fontFamily: muli,
    letterSpacing: '3px',
    padding: '7px',
    ':hover': {
      backgroundColor: MasterTheme.orange,
      color: MasterTheme.white
    }
  },
  circle: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    position: 'absolute',
    marginLeft: 'calc(50% - 35px)',
    marginTop: '-110px',
    ':hover': {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.36), 0 1px 4px rgba(0, 0, 0, 0.48)'
    }
  },
  downArrow: {
    marginTop: '20px'
  },
  copy: {
    fontFamily: merriweather,
    textAlign: 'center',
    fontSize: '20pt'
  },
  grayDivTop: {
    backgroundColor: MasterTheme.lightGray,
    width: '100%',
    height: '120px'
  },
  whiteDiv: {
    backgroundColor: MasterTheme.white,
    width: '100%',
    padding: '20px',
    fontSize: '14pt',
    textAlign: 'center'
  },
  grayDivBottom: {
    backgroundColor: MasterTheme.lightGray,
    width: '100%',
    paddingTop: '30px',
    paddingBottom: '50px'
  },
  topCopy: {
    width: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px'
  },
  middleCopy: {
    width: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px'
  },
  video: {
    borderRadius: '5px',
    borderColor: 'black',
    borderStyle: 'dashed',
    borderWidth: '2px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px',
    width: '400px',
    height: '250px',
    marginTop: '20px'
  },
  bottomCopy: {
    marginBottom: '30px'
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
    fontStyle: 'italic',
    borderRadius: '5px'
  }
};
