import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;
const fontsize = '12pt';
const margins = '8px';

export const styles = {
  wholeComponent: {
    textAlign: 'center',
    backgroundColor: MasterTheme.darkGray,
    position: 'relative',
    zIndex: '11',
    marginTop: '110px',
    height: '120px'
  },
  githubButton: {
    margin: margins,
    marginTop: '40px',
    fontSize: fontsize,
    fontFamily: font,
    fontWeight: MasterTheme.light,
    color: MasterTheme.white,
    display: 'inline-block',
    position: 'relative',
    padding: '5px 20px 10px 20px',
    textAlign: 'center',
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '1px',
    transition: '0.3s ease-out',
    ':hover': {
      borderColor: MasterTheme.white,
      borderRadius: '5px',
      borderStyle: 'solid',
      borderWidth: '1px',
      transition: '0.3s ease-out'
    }
  },
  githubIcon: {
    height: '38px',
    width: '38px',
    marginLeft: '10px'
  }
};
