import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const fontsize = '14pt';
const buttonTopMargin = '4px';
const errorTextMargin = '20px 0 0 30px';

export const styles = {
  mainContainer: {
    backgroundColor: MasterTheme.darkGray
  },
  buttonColor: MasterTheme.white,
  buttonHoverColor: MasterTheme.orange,
  name: {
    fontFamily: font,
    color: MasterTheme.orange
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
    width: '40px',
    height: '40px'
  }
};
