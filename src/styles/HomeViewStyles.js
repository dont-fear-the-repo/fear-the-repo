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
    // height: '796px',
    // position: 'relative'
  },
  circle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: '0 auto 0 auto',
    position: 'relative',
    transform: 'translateY(-120px)',
    ':hover': {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.36), 0 1px 4px rgba(0, 0, 0, 0.48)'
    }
  },
  downArrow: {
    transform: 'translateY(35px)'
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
