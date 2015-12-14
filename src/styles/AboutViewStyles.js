import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;

export const styles = {
  wholeView: {
    backgroundColor: MasterTheme.midGray,
    // paddingBottom: '10px',
    color: MasterTheme.white,
    fontFamily: font,
    height: '100%',
    position: 'relative'
  },
  team: {
    textAlign: 'center'
  },
  leadText: {
    marginLeft: 'auto',
    marginBottom: '40px',
    paddingTop: '190px',
    fontSize: '14pt'
  },
  teamCard: {
    width: '208px',
    textAlign: 'center',
    margin: '15px',
    display: 'inline-block',
    fontSize: '12pt'
  },
  teamCardDepth: 2,
  teamMemberName: {
    color: MasterTheme.darkGray
  },
  teamImg: {
    height: '200px',
    width: '200px',
    margin: '4px'  // adjust teamCard width accordingly
  },
  starterKit: {
    margin: '25px',
    fontSize: '12pt',
    textAlign: 'center',
    fontWeight: MasterTheme.light,
    paddingTop: '120px'
  },
  link: {
    color: MasterTheme.orange
  },
  secretText: {
    fontSize: '8pt',
    backgroundColor: MasterTheme.midGray,
    marginTop: '201px',
    marginBottom: '-200px',
    position: 'relative',
    textAlign: 'center',
    height: '200px'
  },
  button: {
    margin: '20px',
    width: '40px',
    color: MasterTheme.white
  },
  kittenButton: MasterTheme.midGray,
  monsterButton: MasterTheme.orange,
  kittenCard: {
    width: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '50px'
  },
  kitten: {
  }
};
