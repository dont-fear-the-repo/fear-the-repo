const blockId = Date.now();
const bulletId = Date.now() + 1;

export const dummyResume = {
  resumeId: 1,
  resumeTitle: 'Resume Version Name',
  resumeTheme: 'Default',
  serverIsSaving: 'no',
  clientFormIsDirty: false,
  resumeHeader: {
    name: '',
    profession: '',
    city: '',
    state: '',
    displayEmail: '',
    phone: '',
    webLinkedin: '',
    webOther: ''
  },
  blockChildren: [{
      blockId: blockId,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Technical Skills',
      location: '[Your technical skills]',
      bulletChildren: [{
        bulletId: bulletId + 1,
        archived: false,
        parentBlockId: blockId,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: bulletId + 2,
        archived: false,
        parentBlockId: blockId,
        text: 'fake bullet for UI bug'
      }]
    },

    {
      blockId: blockId + 1,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Recent Projects',
      location: '',
      bulletChildren: [{
        bulletId: bulletId + 3,
        archived: false,
        parentBlockId: blockId + 1,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: bulletId + 4,
        archived: false,
        parentBlockId: blockId + 1,
        text: 'fake bullet for UI bug'
      }]
    },

    {
      blockType: 'bullets',
      blockId: blockId + 2,
      archived: false,
      companyName: '[Project Name]',
      jobTitle: '[Role]',
      years: '2015',
      location: 'San Francisco, CA',
      bulletChildren: [{
        bulletId: bulletId + 5,
        archived: false,
        parentBlockId: blockId + 2,
        text: '[contribution to project]'
      }, {
        bulletId: bulletId + 6,
        archived: false,
        parentBlockId: blockId + 2,
        text: '[contribution to project]'
      }, {
        bulletId: bulletId + 7,
        archived: false,
        parentBlockId: blockId + 2,
        text: '[contribution to project]'
      }]
    },

    {
      blockId: blockId + 3,
      blockType: 'bullets',
      archived: false,
      companyName: '[Project Name]',
      jobTitle: '[Role]',
      years: '2014',
      location: 'Portland, OR',
      bulletChildren: [{
        bulletId: bulletId + 8,
        archived: false,
        parentBlockId: blockId + 3,
        text: '[contribution to project]'
      }, {
        bulletId: bulletId + 9,
        archived: false,
        parentBlockId: blockId + 3,
        text: '[contribution to project]'
      }]
    },

    {
      blockId: blockId + 4,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Professional Experience',
      location: '',
      bulletChildren: [{
        bulletId: bulletId + 10,
        archived: false,
        parentBlockId: blockId + 4,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: bulletId + 11,
        archived: false,
        parentBlockId: blockId + 4,
        text: 'fake bullet for UI bug'
      }]
    },

    {
      blockId: blockId + 5,
      blockType: 'bullets',
      archived: false,
      companyName: '[Company Name]',
      jobTitle: '[Job Title]',
      years: '[Years worked]',
      location: 'Austin, TX',
      bulletChildren: [{
        bulletId: bulletId + 8,
        archived: false,
        parentBlockId: blockId + 5,
        text: '[responsibility]'
      }, {
        bulletId: bulletId + 9,
        archived: false,
        parentBlockId: blockId + 5,
        text: '[accomplishment]'
      }]
    },

    {
      blockId: blockId + 6,
      blockType: 'bullets',
      archived: false,
      companyName: '[Company Name]',
      jobTitle: '[Job Title]',
      years: '[Years worked]',
      location: 'Seattle, WA',
      bulletChildren: [{
        bulletId: bulletId + 8,
        archived: false,
        parentBlockId: blockId + 6,
        text: '[responsibility]'
      }, {
        bulletId: bulletId + 9,
        archived: false,
        parentBlockId: blockId + 6,
        text: '[accomplishment]'
      }]
    },

    {
      blockId: blockId + 7,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Education',
      location: '',
      bulletChildren: [{
        bulletId: bulletId + 10,
        archived: false,
        parentBlockId: blockId + 7,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: bulletId + 11,
        archived: false,
        parentBlockId: blockId + 7,
        text: 'fake bullet for UI bug'
      }]
    },

    {
      blockId: blockId + 8,
      blockType: 'bullets',
      archived: false,
      companyName: '[School Name]',
      jobTitle: '[Degree]',
      years: '[Year graduated]',
      location: '[Location]',
      bulletChildren: []
    },

    {
      blockId: blockId + 9,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Personal Interests',
      location: '[Your personal interests]',
      bulletChildren: [{
        bulletId: bulletId + 12,
        archived: false,
        parentBlockId: blockId + 9,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: bulletId + 13,
        archived: false,
        parentBlockId: blockId + 9,
        text: 'fake bullet for UI bug'
      }]
    }
  ]
};

export const blankBulletBlock = {
  blockId: blockId,
  blockType: 'bullets',
  archived: false,
  companyName: '',
  jobTitle: '',
  years: '',
  location: '',
  bulletChildren: [{
    bulletId: bulletId + 1,
    archived: false,
    parentBlockId: blockId,
    text: ''
  }, {
    bulletId: bulletId + 2,
    archived: false,
    parentBlockId: blockId,
    text: ''
  }]
};

export const blankNoBulletBlock = {
  blockId: blockId,
  blockType: 'no bullets',
  archived: false,
  companyName: 'Heading',
  location: 'text, if applicable',
  bulletChildren: [{
    bulletId: bulletId + 1,
    archived: false,
    parentBlockId: blockId,
    text: 'fake bullet for UI bug'
  }, {
    bulletId: bulletId + 2,
    archived: false,
    parentBlockId: blockId,
    text: 'fake bullet for UI bug'
  }]
};
