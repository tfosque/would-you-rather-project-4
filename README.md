## Would You Rather (Udacity project 4 React Redux) review-3

This application is a web app that lets a user play the “Would You Rather?” game. A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is against the rules.

Users are able to answer questions, see which questions they haven’t answered, see how other people have voted, post questions, and see the ranking of users on the leaderboard.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Additional Packages

1. npm lodash
2. npm react-router-dom
3. npm react-bootstrap
4. npm node-sass
5. npm react-font-awesome
6. npm react-redux
7. npm redux-thunk
8. npm redux-logger

## Added Functionality

1. Added users score to main menu avatar
2. Animated score in polls
3. Added user notification when no data was available
4. Animated progress bar for leaderboard
5. Added loading spinner
6. Added ability to create new user

### Directory Setup

```
├── build
├── node_modules
├── public
├── src
| ├── components
| ├── Data
| ├── images
| ├── Redux
| ├── App.css
| ├── App.js
| ├── index.css
| └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

In the project directory, you can run:

## Environment Setup

To run this project locally download and install nodejs from ( https://nodejs.org/en/download/ ).
Be sure to select the installer for your operating system.
Once nodejs is installed create a project folder.
Open a command prompt and cd into your project folder.
To create a new React App type ( npm create-react-app <project_name> ).
!important cd into the newly create application folder and then run 'npm start'.

### `npm installing packages`

To install new packages you can use npm or yarn. Run npm install <package_name>.
For more details on package installation visit [Node Package Manager](https://www.tutorialsteacher.com/nodejs/what-is-node-package-manager).

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
