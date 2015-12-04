import { MasterTheme } from 'styles/MasterTheme';

const font = MasterTheme.muli;

export const styles = {
  wholeView: {
    backgroundColor: MasterTheme.lightGray,
    paddingBottom: '10px',
    color: MasterTheme.darkGray,
    fontFamily: font
  },
  team: {
    textAlign: 'center'
  },
  leadText: {
    marginTop: '10px',
    marginLeft: '20px',
    marginBottom: '20px',
    paddingTop: '30px',
    fontSize: '14pt'
  },
  teamCard: {
    width: '208px',
    textAlign: 'center',
    margin: '15px',
    display: 'inline-block',
    fontSize: '12pt',
  },
  teamCardDepth: 1,
  teamMemberName: {
    color: MasterTheme.darkGray
  },
  teamImg: {
    height: '200px',
    width: '200px',
    margin: '4px'  // adjust teamCard width accordingly
  },
  starterKit: {
    margin: '20px',
    fontSize: '12pt',
    textAlign: 'center'
  },
  secretText: {
    fontSize: '8pt',
    marginTop: '20px',
    textAlign: 'center'
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
