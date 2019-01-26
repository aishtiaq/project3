# Task Master
A MERN full stack Agile Project Management web app.

[![N|Solid](https://cloudinary-res.cloudinary.com/image/upload/c_limit,h_540,w_770/f_auto,fl_lossy,q_auto/roajtdilgzhoasmx6yaag.png)](https://gwtaskmaster.herokuapp.com/)

Our app that allows users to create individual tasks, and team tasks that they can share with their team members.
### Features
  - Users sign up using their personal information and create a username and password (use Heroku link for team tasks)
  - Sign into the app
  - Edit User Profile
  - Add & Edit an individual task or a team task
  - Assign a user to a team task
  - Assign Due Dates to tasks
  - Designate due dates that change state (color) when approaching or due
  - Drag and drop tasks between ‘New’, ‘In Progress’ and ‘Done’ columns
  - Receive emails
    - Upon new user creation
    - At overdue tasks and tasks about to be overdue (nightly)
    - When a task is assigned to a user

### Technologies
  - MERN Stack (MongoDB, Express.js, React.js, Node.js)
  - Styling (styled-components for react, css grid, svg)
  - Forms (Twitter Bootstrap)
  - Drag & Drop tasks (React-beautiful-dnd, react-tabs)
  - Email Notifications (nodemailer, moment, react-cron)
  - Database (Mongoose)
  - User Session Handling & Authentication (passport, passport-jwt)
  - Encrypting Passwords (bcrypt package)
  - State Management (React-redux, react-thunk)

### Installation
Fork code onto local repository. Make sure you are running Mongo. Open your favorite Terminal and run these commands.

```sh
Navigate to local repo
$ yarn install
$ yarn start
```