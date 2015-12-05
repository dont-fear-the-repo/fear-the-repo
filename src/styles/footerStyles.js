import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const fontsize = '12pt';
const margins = '8px';

export const styles = {
  wholeComponent: {
    textAlign: 'center',
    backgroundColor: MasterTheme.darkGray
  },
  buttonLabelStyle: {
    textTransform: 'none'
  },
  buttonColor: MasterTheme.white,
  buttonHoverColor: MasterTheme.orange,
  aboutButton: {
    margin: margins,
    fontSize: fontsize,
    fontFamily: font,
    fontStyle: 'italic',
    fontWeight: MasterTheme.light
  },
  githubButton: {
    margin: margins,
    fontSize: fontsize,
    fontFamily: font,
    fontStyle: 'italic'
  },
  githubIcon: {
    height: '40px',
    width: '40px',
    margin: margins,
    marginLeft: '2px',
    marginBottom: '10px'
  }
};
