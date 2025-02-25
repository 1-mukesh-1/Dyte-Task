﻿# Welcome

# Components of the project
1. Backend
This consists of all the source code required to communicate with the microservice. This component is developed in ExpressJS. This Consists of basic CRUD routes which will trigger the microservice.
2. Microservice
This Component is the 2nd layer of this project. When ever it is triggered by the Express Code it will take action according to the type of request made by backend (Express).
3. Database
This consists of single table called as webhook_data and its stores targetUrl og webhooks.

## How to run
Three batch scripts are created which will help to automate the task. No additional modules are required except NodeJS global env. 
1. Database is attached in the git repo in ./Database/webhooks.sql. so it has to be imported into phpmyadmin. (Xampp is preferred)
2. Double click on automate.py and it will start both backend and microservice
3. backend running @ localhost:5000 and microservice running @ localhost:3000
4. Use postman api and send different types of requests to backend and it will activate microservice automatically and microservice actions will edit the database. 
	Note: Different types of requests with raw body and url are attached @test.txt and it can be used to test in postman. (Postman desktop agent is requied for testing)

## Architecture Of the project
![Screenshot](main.PNG)

## Trigger when /ip is accessed
![Screenshot](trigger.PNG)

## Requests & Routes

    /all rows
    LIST
    http://localhost:5000/api/webhooks
    
    -------------------------------------------------------------------
    
    /:id
    LIST
    http://localhost:5000/api/webhooks/1
    
    -------------------------------------------------------------------
    
    CREATE
    http://localhost:5000/api/webhooks
    request body:
    {
        "targetUrl" : "www.temp.com"
    }
    
    -------------------------------------------------------------------
    
    UPDATE
    http://localhost:5000/api/webhooks/2
    request body:
    {
        "targetUrl" : "www.temp.com"
    }
    
    -------------------------------------------------------------------
    
    DELETE
    http://localhost:5000/api/webhooks/4
    
    -------------------------------------------------------------------
    
    IP
    http://localhost:5000/ip

