# Node.js-Express-MongoDb
This project is a personal project, made with Node.js, Express.js and MongoDB. 

Data Models contains 3 Schemas: 

* User

* Track

* Storage

Each with respective routes and controllers.

* Is contemplated:

Auth Controller: 

It is responsible for registering and authenticating users in the system.

It uses the JWT schema with a standard Authorization "bearer" header.

Each user has a list of permissions associated, there are 2 generic permissions "user" and "admin". The users that register are all "user".
Many processes need an "admin" user to be able to work, therefore you have to edit the schema in MongoDB to set the admin permission to some user.

Track Controller: 

Contains the CRUD of the Tracks, where is managed the association with the Storage. 

Storage Controller:

This controller manages the uploaded files. These files are saved locally.

* API documentation is not available yet.
