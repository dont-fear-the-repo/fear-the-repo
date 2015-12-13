import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const fontsize = '12pt';
const margins = '8px';

export const styles = {
  wholeComponent: {
    textAlign: 'center',
    backgroundColor: MasterTheme.darkGray,
    position: 'relative',
    zIndex: '5',
    height: '200px'
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
    // fontStyle: 'italic',
    fontWeight: MasterTheme.light,
    borderRadius: '5px',
    color: MasterTheme.white,
    display: 'inline-block',
    position: 'relative',
    padding: '8px 20px 10px 20px',
    borderColor: MasterTheme.white,
    borderStyle: 'solid',
    borderWidth: '2px',
    textAlign: 'center'
  },
  githubButton: {
    margin: margins,
    fontSize: fontsize,
    fontFamily: font,
    // fontStyle: 'italic',
    fontWeight: MasterTheme.light,
    // borderRadius: '5px',
    color: MasterTheme.white,
    display: 'inline-block',
    position: 'relative',
    // padding: '2px 20px 1px 20px',
    // borderColor: MasterTheme.white,
    // borderStyle: 'solid',
    // borderWidth: '2px',
    textAlign: 'center'
  },
  githubIcon: {
    height: '38px',
    width: '38px',
    marginLeft: '10px'
  }
};
