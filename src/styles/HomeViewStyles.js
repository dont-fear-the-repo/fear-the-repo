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
    height: '796px',
    position: 'relative'
  },
  circle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: '0 auto',
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
  mainTitle: {
    fontSize: '36pt',
    margin: '25px'
  },
  tagline: {
    fontStyle: 'italic',
    fontSize: '24pt',
    fontWeight: MasterTheme.light,
    margin: '20px'
  },
  copy: {
    fontFamily: merriweather,
    margin: '50px',
    marginBottom: '300px'
  },
  buttonColor: MasterTheme.white,
  buttonHoverColor: MasterTheme.orange,
  buttonLabelStyle: {
  textTransform: 'none'
  },
  button: {
    marginRight: '30px',
    marginTop: '400px',
    fontSize: '30pt',
    font: muli
  }
}
