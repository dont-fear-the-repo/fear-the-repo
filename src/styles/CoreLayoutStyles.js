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
    // marginRight: '-10px',
    marginTop: '4px',
    padding: '6px 17px 7px 17px',
    fontSize: '16px',
    height: '35px',
    width: '140px',
    textAlign: 'center',
    fontFamily: font,
    borderColor: MasterTheme.darkGray,  // Drawing a new border on hover introduces a bug where the entire div shifts down slightly, which is why we draw it here first
    borderStyle: 'solid',
    borderWidth: '1px',
    ':hover': {
      borderColor: MasterTheme.orange,
      borderStyle: 'solid',
      borderWidth: '1px'
    }
  },
  loginButton: {
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    // marginRight: '-10px',
    marginTop: '4px',
    padding: '8px 17px 7px 17px',
    fontSize: '14px',
    height: '35px',
    width: '80px',
    textAlign: 'center',
    fontFamily: font,
    borderColor: MasterTheme.darkGray,
    borderStyle: 'solid',
    borderWidth: '1px',
    ':hover': {
      borderColor: MasterTheme.white,
      borderStyle: 'solid',
      borderWidth: '1px'
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
    borderColor: MasterTheme.darkGray,
    borderStyle: 'solid',
    borderWidth: '1px',
    ':hover': {
      borderColor: MasterTheme.white,
      borderStyle: 'solid',
      borderWidth: '1px'
    }
  },
  mainContainer: {
    backgroundColor: MasterTheme.darkGray,
    zIndex: 100
  },
  buttonColor: MasterTheme.white,
  buttonHoverColor: MasterTheme.orange,
  name: {
    fontFamily: font,
    color: MasterTheme.orange,
    fontStyle: 'none',
    fontSize: '32px',
    fontWeight: 500,
    marginTop: '30px',
    letterSpacing: '3px',
    marginLeft: '20px',
    textDecoration: 'none'
  },
  buttonLabelStyle: {
    textTransform: 'none'
  },
  button: {
    float: 'left',
    marginRight: '30px',
    marginTop: buttonTopMargin,
    // marginBottom: buttonTopMargin,
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
    fill: MasterTheme.orange,  // this not working. I wish it did.
    width: '45px',
    marginRight: '-10px'
  },
  spinnerColor: MasterTheme.orange
};
