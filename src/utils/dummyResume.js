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
      blockId: 1,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Technical Skills',
      location: '[Your technical skills]',
      bulletChildren: [{
        bulletId: 101,
        archived: false,
        parentBlockId: 1,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: 102,
        archived: false,
        parentBlockId: 1,
        text: 'fake bullet for UI bug'
      }]
    },

    {
      blockId: 2,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Recent Projects',
      location: '',
      bulletChildren: [{
        bulletId: 103,
        archived: false,
        parentBlockId: 2,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: 104,
        archived: false,
        parentBlockId: 2,
        text: 'fake bullet for UI bug'
      }]
    },

    {
      blockType: 'bullets',
      blockId: 3,
      archived: false,
      companyName: '[Project Name]',
      jobTitle: '[Role]',
      years: '2015',
      location: 'San Francisco, CA',
      bulletChildren: [{
        bulletId: 105,
        archived: false,
        parentBlockId: 3,
        text: '[contribution to project]'
      }, {
        bulletId: 106,
        archived: false,
        parentBlockId: 3,
        text: '[contribution to project]'
      }, {
        bulletId: 107,
        archived: false,
        parentBlockId: 3,
        text: '[contribution to project]'
      }]
    },

    {
      blockId: 4,
      blockType: 'bullets',
      archived: false,
      companyName: '[Project Name]',
      jobTitle: '[Role]',
      years: '2014',
      location: 'Portland, OR',
      bulletChildren: [{
        bulletId: 108,
        archived: false,
        parentBlockId: 4,
        text: '[contribution to project]'
      }, {
        bulletId: 109,
        archived: false,
        parentBlockId: 4,
        text: '[contribution to project]'
      }]
    },

    {
      blockId: 5,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Professional Experience',
      location: '',
      bulletChildren: [{
        bulletId: 110,
        archived: false,
        parentBlockId: 5,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: 111,
        archived: false,
        parentBlockId: 5,
        text: 'fake bullet for UI bug'
      }]
    },

    {
      blockId: 6,
      blockType: 'bullets',
      archived: false,
      companyName: '[Company Name]',
      jobTitle: '[Job Title]',
      years: '[Years worked]',
      location: 'Austin, TX',
      bulletChildren: [{
        bulletId: 112,
        archived: false,
        parentBlockId: 6,
        text: '[responsibility]'
      }, {
        bulletId: 113,
        archived: false,
        parentBlockId: 6,
        text: '[accomplishment]'
      }]
    },

    {
      blockId: 7,
      blockType: 'bullets',
      archived: false,
      companyName: '[Company Name]',
      jobTitle: '[Job Title]',
      years: '[Years worked]',
      location: 'Seattle, WA',
      bulletChildren: [{
        bulletId: 114,
        archived: false,
        parentBlockId: 7,
        text: '[responsibility]'
      }, {
        bulletId: 115,
        archived: false,
        parentBlockId: 7,
        text: '[accomplishment]'
      }]
    },

    {
      blockId: 8,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Education',
      location: '',
      bulletChildren: [{
        bulletId: 116,
        archived: false,
        parentBlockId: 8,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: 117,
        archived: false,
        parentBlockId: 8,
        text: 'fake bullet for UI bug'
      }]
    },

    {
      blockId: 9,
      blockType: 'bullets',
      archived: false,
      companyName: '[School Name]',
      jobTitle: '[Degree]',
      years: '[Year graduated]',
      location: '[Location]',
      bulletChildren: []
    },

    {
      blockId: 10,
      blockType: 'no bullets',
      archived: false,
      companyName: 'Personal Interests',
      location: '[Your personal interests]',
      bulletChildren: [{
        bulletId: 118,
        archived: false,
        parentBlockId: 10,
        text: 'fake bullet for UI bug'
      }, {
        bulletId: 119,
        archived: false,
        parentBlockId: 10,
        text: 'fake bullet for UI bug'
      }],
      resumeFooter: {
        school1: {
                  name: '',
                  degree: '',
                  schoolEndYear: '',
                  location: ''
                },
                school2: {
                  name: '',
                  degree: '',
                  schoolEndYear: '',
                  location: ''
                },
                personalStatement: ''
      }
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
