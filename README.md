
  

# Implementation and Deployment

  

*  [Alarming-Butler](https://alarming-butler-front.herokuapp.com/)

  

The basic structure of this project consist of Frontend and Backend implemented on * [MEAN](https://en.wikipedia.org/wiki/MEAN_(solution_stack)) stack technology.

  

The Backend part has Mongo Database for storing user signup data and tasks details created by individual users as well (locally on port 3000).

The Frontend is developed on Angular (locally on port 4200)

  
  

## To run this project locally:

  

### make sure in src -> environments -> environment.ts

> apiUrl: 'http://localhost:3000/api'

  

### command to start on local

`command$: ng serve`

  

Now open browser and go to * [http://localhost:4200](http://localhost:4200)

  
  

## To deploy this project:

  

### make sure in src -> environments -> environment.ts

> apiUrl: '< link  to  the  platform  on  which  backend  is  deployed>/api'

  

### add following in package.json -> scripts

` "postinstall": "ng build --aot --prod" `

  

### command to start on deploy:

` command$: npm start `

 
Now open browser and go to the link to the platform on which backfrontend is deployed.

  
  
  
  
  
  
# OBJECTIVE 

*  [StackHack 1.0](https://www.hackerearth.com/challenges/hackathon/stackhack-v1/) - Hackathon

  

*  [Heroku Deploy Instructions](https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147) - Medium

  

# On Front End:

  
  

- [ ] Implement a feature to add Tasks.

- [ ] Implement a feature to set the due date for these tasks.

  
  

# On Back end:

  

- [ ] Implement the backend in one of the desired Tech-Stacks provided below.

- [ ] Your backend is supposed to store all the tasks data received from the Frontend and store it in the Database.

- [ ] You are also supposed to implement a Database in the Backend which should store all this structured data.

- [ ] The data sharing between Frontend and Backend should be in JSON format rendered over REST APIs.

- [ ] Zip all your Source Code, Screenshots, Deployment Instructions and Upload.

  

# Plus Point (intermediate)

  

Along with everything asked in Minimum Requirement :

  

- [ ] Implement a feature to set Labels to Tasks like ‘Personal’, ‘Work’, ‘Shopping’ and ‘Others’.

- [ ] Implement a feature to set the Status of the Tasks like ‘New’, ‘In progress’ and ‘Completed’.

- [ ] You are supposed to implement these features for an End-to-End stack, implementation will go on the Frontend as well as Backend.

- [ ] Store the relevant flags in the database.

  

# Extra Work (experienced / wizard)

  

Along with everything from the above two levels :

  

- [ ] Implement the Signup and Login/Logout functionality. You have to create user-auth schema in the database.

- [ ] Implement a feature to Search and Filter Tasks based on Date-time, Priority and Labels, and a combination of at least two or more.

  

Note : If you complete any or all of the above mentioned levels please do submit.
