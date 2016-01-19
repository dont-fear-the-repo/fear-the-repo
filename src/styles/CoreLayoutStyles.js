import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const fontsize = '14pt';
const buttonTopMargin = '4px';
const errorTextMargin = '20px 0 0 30px';

export const styles = {
  editResumeButton: {
    borderRadius: '5px',
    color: MasterTheme.orange,
    display: 'inline-block',
    position: 'relative',
    marginTop: '4px',
    padding: '6px 17px 7px 17px',
    fontSize: '16px',
    fontWeight: MasterTheme.bold,
    height: '35px',
    width: '140px',
    textAlign: 'center',
    fontFamily: font,
    borderColor: 'transparent',  // Drawing a new border on hover introduces a bug where the entire div shifts down slightly, which is why we draw it here first
    borderStyle: 'solid',
    borderWidth: '1px',
    transition: '0.3s ease-out',
    ':hover': {
      borderColor: MasterTheme.orange,
      borderStyle: 'solid',
      borderWidth: '1px',
      transition: '0.3s ease-out'
    }
  },
  aboutUsButton: {
    borderRadius: '5px',
    color: MasterTheme.white,
    display: 'inline-block',
    position: 'relative',
    marginRight: '-10px',
    marginTop: '4px',
    padding: '6px 17px 7px 17px',
    fontSize: '14px',
    height: '35px',
    width: '120px',
    textAlign: 'center',
    fontFamily: font,
    transition: '0.3s ease-out',
    ':hover': {
      color: MasterTheme.orange,
      transition: '0.3s ease-out'
    }
  },
  loginButton: {
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    marginTop: '4px',
    padding: '8px 17px 7px 17px',
    fontSize: '14px',
    height: '35px',
    width: '80px',
    textAlign: 'center',
    fontFamily: font,
    transition: '0.3s ease-out',
    ':hover': {
      color: MasterTheme.orange,
      transition: '0.3s ease-out'
    }
  },
  signupButton: {
    borderRadius: '5px',
    color: MasterTheme.white,
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    marginRight: '10px',
    marginTop: '4px',
    padding: '8px 17px 7px 17px',
    fontSize: '14px',
    height: '35px',
    width: '80px',
    textAlign: 'center',
    fontFamily: font,
    transition: '0.3s ease-out',
    ':hover': {
      color: MasterTheme.orange,
      transition: '0.3s ease-out'
    }
  },
  homeViewNav: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 100,
    paddingTop: '10px'
  },
  buttonColor: MasterTheme.white,
  buttonHoverColor: MasterTheme.orange,
  rezableName: {
    fontFamily: font,
    color: MasterTheme.orange,
    fontStyle: 'none',
    fontSize: '40px',
    fontWeight: 500,
    marginTop: '20px',
    letterSpacing: '3px',
    marginLeft: '30px',
    textDecoration: 'none'
  },
  buttonLabelStyle: {
    textTransform: 'none'
  },
  button: {
    float: 'left',
    marginRight: '30px',
    marginTop: buttonTopMargin,
    fontSize: fontsize,
    fontFamily: font
  },
  errorText: {
    margin: errorTextMargin,
    color: MasterTheme.orange
  },
  disabledText: {
    margin: errorTextMargin,
    color: MasterTheme.midGray
  },
  logo: {
    fill: MasterTheme.orange,
    width: '50px',
    marginRight: '-20px',
    marginTop: '2px'
  },
  spinnerColor: MasterTheme.orange
};
