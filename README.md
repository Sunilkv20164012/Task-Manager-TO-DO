
  

  

# Implementation and Deployment

  

  

*  [Alarming-Butler](https://alarming-butler-front.herokuapp.com/) <= Already deployed project link.

  
  

 - The basic structure of this project consist of Frontend and Backend implemented on * [MEAN](https://en.wikipedia.org/wiki/MEAN_(solution_stack)) stack technology.

  

  

- The Backend part has Mongo Database for storing user signup data and tasks details created by individual users as well (locally on port 3000).

  

-  The Frontend is developed on Angular (locally on port 4200)

  

  

## To run the project locally:

  
1. Set the environment Variable from  
### frontend -> src -> environments -> environment.ts

> apiUrl: 'http://localhost:3000/api'

2. Go to backend/ and run following command to start backend on local

`command$: npm start`

 3. Go to frontend/ and run following command to starrt frontend on local

`command$: ng serve`

  

4. Now open browser and go to * [http://localhost:4200](http://localhost:4200)

  

  

## To deploy this project:

1. Set the environment Variable from  
### frontend -> src -> environments -> environment.ts

  for e.g. in my case :-
> apiUrl:  'https://alarming-butler-backend.herokuapp.com/api'

  

2. Add following in package.json -> scripts

` "postinstall": "ng build --aot --prod" `


3. Deploy the backend folder on any platform , command to start  
`command$: npm start`  

4.  Deploy the frontend folder on any platform with the changes applied above , command to start  
`command$: npm start`  

5. Now open browser and go to the link to the platform on which backfrontend is deployed.

  

# Basic Objectives of Competition

  

*  [StackHack 1.0](https://www.hackerearth.com/challenges/hackathon/stackhack-v1/) - Hackathon

  

  

*  [Heroku Deploy Instructions](https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147) - Medium

  

  

# On Front End:

  

  

- [x] Implement a feature to add Tasks.

  

- [x] Implement a feature to set the due date for these tasks.

  

  

# On Back end:

  

  

- [x] Implement the backend in one of the desired Tech-Stacks provided below.

  

- [x] Your backend is supposed to store all the tasks data received from the Frontend and store it in the Database.

  

- [x] You are also supposed to implement a Database in the Backend which should store all this structured data.

  

- [x] The data sharing between Frontend and Backend should be in JSON format rendered over REST APIs.

  

- [ ] Zip all your Source Code, Screenshots, Deployment Instructions and Upload.

  

  

# Plus Point (intermediate)

  

  

Along with everything asked in Minimum Requirement :

  

  

- [x] Implement a feature to set Labels to Tasks like ‘Personal’, ‘Work’, ‘Shopping’ and ‘Others’.

  

- [x] Implement a feature to set the Status of the Tasks like ‘New’, ‘In progress’ and ‘Completed’.

  

- [x] You are supposed to implement these features for an End-to-End stack, implementation will go on the Frontend as well as Backend.

  

- [x] Store the relevant flags in the database.

  

  

# Extra Work (experienced / wizard)

  

  

Along with everything from the above two levels :

  

  

- [x] Implement the Signup and Login/Logout functionality. You have to create user-auth schema in the database.

  

- [x] Implement a feature to Search and Filter Tasks based on Date-time, Priority and Labels, and a combination of at least two or more.

  

  

Note : If you complete any or all of the above mentioned levels please do submit.
