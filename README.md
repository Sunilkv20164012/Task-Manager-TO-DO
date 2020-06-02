
  

Table of contents

=================

  

<!--ts-->
*  [Installation and Deployment](#installation-and-Deployment)

	*  [To run the project locally](#to-run-the-project-locally)
	*  [To deploy this project](#to-deploy-this-project)
* [Project Description](#project-description)
	* [Frontend](#frontend)
	* [Backend](#backend)
* [Screenshots](#screenshots)
<!--te-->

  

  

# Installation and Deployment

  

  

  

  

[Alarming-Butler](https://alarming-butler-front.herokuapp.com/)

  

  

  

- The basic structure of this project consist of Frontend and Backend implemented on [MEAN](https://en.wikipedia.org/wiki/MEAN_(solution_stack)) stack technology.

  

  

  

  

- The Backend part has Mongo Database for storing user signup data and tasks details created by individual users as well (locally on port 3000).

  

  

  

- The Frontend is developed on Angular (locally on port 4200)

  

  

  

  

## To run the project locally:

  

  

1. Set the environment Variable from

  

### frontend -> src -> environments -> environment.ts

  

  

> apiUrl: 'http://localhost:3000/api'

  

  

2. Go to backend/ and run following command to start backend on local

  

  

`command$: npm start`

  

  

3. Go to frontend/ and run following command to start frontend on local

  

  

`command$: ng serve`

  

  

  

4. Now open browser and go to * [http://localhost:4200](http://localhost:4200)

  

  

  

  

## To deploy this project

  

  

1. Set the environment Variable from

  

### frontend -> src -> environments -> environment.ts

  

  

for e.g. in my case :-

  

> apiUrl: 'https://alarming-butler-backend.herokuapp.com/api'


2. Add following in package.json -> scripts

  for **ng build** on platform to be deployed on. 


` "postinstall": "ng build --aot --prod" `

  

  

3. Deploy the backend folder on any platform , command to start

  

`command$: npm start`

  
To check if backend server is up and running make a get request on `https://<deployed-web-app-link>.com/api/tasks` for e.g. in my case https://alarming-butler-backend.herokuapp.com/api/tasks, 
you will get message like:
> {"message":"You are not authenticated!"}
  

4. Deploy the frontend folder on any platform with the changes applied above , command to start

  

`command$: npm start`

  

  

5. Now open browser and go to the link to the platform on which backfrontend is deployed.

  

  

# Project Description

  

  

Alarming Butler is an MEAN stack based Task Manager (To Do list), which helps in easily managing tasks,

  

with different labels, task start date and ending date, with which users can filter out the prior tasks.

  

## Frontend

1. User Create & Edit To-Do list containg following details:

- Task Title

- Task start Date

- Task Deadline Date

- Task Category (e.g. Shopping, Work, Learning, Others)

2. Filter out the tasks based on followings:

- Today

- In this Week

- All Tasks

- Archived

- Pending

- Categories : Shopping, Work, Learning, Others

3. After completeing the task , user can mark it as Done, which results in transferring the task to archive section.

4. New users can signup and old users can see their tasks added at any time after logging in.

  

## Backend

  

1. User *signup details* are stored in **Mongo-DB.**

2. User created *tasks details* are added in **Mongo-DB**.

3. Request and response between Client & Server is done through ***REST API*** .

4. Data transfer is done in ***JSON*** format.

5. Project supports **authentication** as well as **authorization**.

- Passwords of users are stored with hashing ( **bcryptjs** ).

- JWT tokens are used for authorization, which is used for **Auth-Interceptor** and **Auth-Guard**.

- Tokens are stored on client-side in localstorage with expire-time, so that no need to login again after each refresh.

  
  
  

# ScreenShots

  

Login / Signup

![Signup](https://github.com/Sunilkv20164012/Task-Manager-To-Do/blob/master/images/Ssignup.png?raw=true)

![Login](https://github.com/Sunilkv20164012/Task-Manager-To-Do/blob/master/images/login.png?raw=true)

  

Task Manager Panel

![Filtered Tasks](https://github.com/Sunilkv20164012/Task-Manager-To-Do/blob/master/images/filtered-tasks.png?raw=true)

![Archived-Tasks](https://github.com/Sunilkv20164012/Task-Manager-To-Do/blob/master/images/archived-tasks.png?raw=true)

![Pending-Tasks](https://github.com/Sunilkv20164012/Task-Manager-To-Do/blob/master/images/pending-tasks.png?raw=true)

  

Task Create / Edit Panel

  

![Task Create/Edit](https://github.com/Sunilkv20164012/Task-Manager-To-Do/blob/master/images/task-create.png?raw=true)

![Task Datepicker](https://github.com/Sunilkv20164012/Task-Manager-To-Do/blob/master/images/task-create-datepicker.png?raw=true)

  
  

Task Status Update Option

  

![Task Options](https://github.com/Sunilkv20164012/Task-Manager-To-Do/blob/master/images/task-options.png?raw=true)
