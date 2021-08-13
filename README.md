# Hendricks Project Manager
Hendricks Project Manager(HPM) is a project management tool that uses Trello Api to synchronise with MongoDB to manage multiple tasks. A user is able to add cards and update the card status on the HPM app while simultaneously updating mongodb and trello. Conversely, another user may be able to update the cards on the trello boards itself and pass the changes onto the HPM where it will sync the new data in MongoDB. 

## Installation 
After cloning the project, run `npm install` in the terminal to install all the required packages. Before running the application, you will need to change a few files and their configurations. 

### Prerequisites 
1. MongoDB database (mongoDb Atlas is recommended for people unfamilar with setting up of mongo instances.) 
Helper Guide: (https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/)
2. Trello Account with developer keys and tokens. 
Link for keys and tokens : (https://trello.com/app-key)
Note: you need to be logged into trello to access this page.

### Installation Steps  
1. First look for `env.local.example` file and rename it to `env.local`
2. Replace `NEXT_PUBLIC_DEV_URL` with your current local host port that you are running on. By default it should be `http://localhost:3000`
3. Replace `MONGODB_URI` with your mongoDB credentials. 
4. Replace `MONGODB_DB` with your mongoDB database name 
5. Replace `TRELLO_KEY` and `NEXT_PUBLIC_TRELLO_KEY` with your trello key.
6. Replace `NEXT_PUBLIC_TRELLO_TOKEN` and `TRELLO_TOKEN` with your trello token.

Start the project with `npm run dev`

## Technologies 
Frontend : Next.JS
Backend: Next.JS API routes 
Database: MongoDB 

Libraries 
* Material UI (for prestyled components) 
* React Bootstrap (mainly for containers and columns for responsive design) 
* CSS Modules (to selectively style certain components if required) 
* nextjs-progressbar (UI/UX feature to show loading bar at the top while page is loading and rendering data from DB) 

## Planned Features
As there is currently no user login authentication. The only layer of defence is that anyone who has access to this repo and with the developer keys and tokens would be able to make changes. A follow up feature for this project would be able to add user login credentials into mongoDB with a login page on first load and authenticated using Passport.js . Only a properly authenticated user would be able to view the project lists and individual project tasks. 



