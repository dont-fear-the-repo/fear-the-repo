A short recap of our ~1 month project: what we learned, what went well, what needed improvement.

# Process #
* Good:
    - We chose a flat team structure, which led to a democratic process for all decisions. There was lots of role-shifting and communication, preventing "fiefdom" behavior concerning different sections of the app.
    - Webpack is awesome...once we figured it out. Great for not just tasks and builds, but dependency management, scalable deployment, and more.
    - Having many specific channels on Slack helped communication immensely.
    - Git is wonderful.
* Bad:
    - Slow Webpack build times stole hours of potential dev time. We should have devoted time early in the project to a fast, efficient dev build process.
    - Our decentralized structure sometimes led to less efficient decision making, and occasionaly overly burdened Sujay with leadership tasks.
    - Furthermore, our democratic process led to many meetings, without a good way to excuse those who weren't part of the decision.

# Product #
* Good:
    - React and Redux are awesome. Fun to build and allows for clean, functional code.
    - UI excellence achieved. WYSIWYG achieved.
    - Form validation worked!
    - Though smaller than our initial ambitious goals, the product ended up pretty cool and useful.
* Bad:
    - Some logic on client should be on the server, i.e. resume loading auth.
    - Some data on client should be on the server, i.e. userID and resumeID.
    - Way too ambitious, though we figured out scoping pretty early on.
    - Bleeding edge technology headaches: the Sequelize-Bluebird spat, bizarre React-Router behavior, buggy Material-UI components...new tech is awesome, but can lead to issues.

# Future Thoughts/Features #
* Schedule enforced coding/quiet time, with better timeboxed meetings.
* Use Waffle/Issues even more.
* Watson integration would be great. The features related to Watson analysis of text for tone and other aspects would make for a really useful product.
* The ability to have multiple resumes and real version control would be amazing. This is do-able with our current system, but will require more views and a much more complex database.
* Debouncing user input and auto-save would make for a much better UI.
    