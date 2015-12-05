import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const fontsize = '14pt';
const buttonTopMargin = '8px';
const errorTextMargin = '20px 0 0 30px';

export const styles = {
  mainContainer: {
    backgroundColor: MasterTheme.darkGray
  },
  buttonColor: MasterTheme.white,
  buttonHoverColor: MasterTheme.orange,
  name: {
    fontFamily: font,
    fontSize: '20pt',
    color: MasterTheme.orange,
    marginLeft: '30px',
    marginRight: '20px',
    marginTop: '12px'
  },
  buttonLabelStyle: {
    textTransform: 'none'
  },
  resumeButton: {
    fontFamily: font,
    fontSize: fontsize,
    marginTop: buttonTopMargin,
    marginBottom: buttonTopMargin
  },
  loginButton: {
    float: 'right',
    marginRight: '30px',
    marginTop: buttonTopMargin,
    marginBottom: buttonTopMargin,
    fontSize: fontsize,
    fontFamily: font
  },
  signupButton: {
    float: 'right',
    marginRight: '10px',
    marginTop: buttonTopMargin,
    marginBottom: buttonTopMargin,
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
  }
};
