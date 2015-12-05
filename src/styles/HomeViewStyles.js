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
    height: '200px',
    width: '100%',
    backgroundColor: MasterTheme.midGray,
    color: MasterTheme.white
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
  }
};
