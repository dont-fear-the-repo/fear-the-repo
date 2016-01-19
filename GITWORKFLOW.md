# Git Workflow

This project follows the git merge model. Please refer to following link for more details regarding merge model (https://www.atlassian.com/git/tutorials/merging-vs-rebasing/conceptual-overview).

Below instructions outline Git Workflow for this project. Please ask questions and discussion concerns with team members if any issues arise.

### Fork the repo
1. on github.com

### Download fork
1. git clone https://github.com/<USER_NAME>/fear-the-repo.git

### Add upstream remote
1. git remote add upstream https://github.com/dont-fear-the-repo/fear-the-repo.git

### Make a new branch - your feature branch
1. git checkout dev
2. git checkout -b 'featureBranch'

### Commit Changes
1. make changes to your code base.
#####Note - changes should be in your featureBranch
2. add comments in code
3. run code through tests
4. write tests to interrogate basic functionality
5. git add -p
#####Note - if new file was created, use git add [file_name]
6. git commit -m "[feat]: Update awesome.js to include amazing feature"

### Push to Github
1. git pull upstream dev
2. fix errors and handle merge conflicts
3. run tests
4. git add -p
#####Note - if new file was created, use git add <file_name>
5. git commit -m "[feat]: Update awesome.js with merge conflicts to include amazing feature"
6. git push origin featureBranch:dev
#####Note - origin should be directed to user repo

### Initiate Pull Request
1. on github initiate pull request to dont-fear-the-repo dev branch from user's dev branch
2. ask team member to review pull request
