# MEAN-PROJECT
<h1>PROMOBG APP / ANGULAR 6</h1>

<h3>Description</h3>
PromoBG app is single page application made at SoftUni academy for the Angular fundamentals course.In the app, users can post ads, comment and like other users ads.They can send messages to other users and chat with them in a special chat room.In the project have been demonstrated use of programming concepts, specific to the Angular framework: components, decorators,
data binding, dependency injection, observables, handling forms (reactive),
interceptors, router, guards to block access to certain routes, custom pipes and directives.

<h3>Technologies</h3>
Angular<br>
Node.js<br>
Express<br>
MongoDB<br>

<h3>Installation</h3>
PROMOBG requires

MongoDB v3.6+
NodeJS v8+
To start the database (port: 27017): Install MongoDB, open new cmd window (in project root) and run

$ cd server
$ start-mongodb
To add initial seeding: (do this step once only the first time you start the app) After you start MondoDB open new cmd window (in project root) and run

$ cd server
$ seedBooks
To start the server (port: 3001): open new cmd window (in project root) and run

$ cd server
$ npm install (if you havent already installed the dependencies)
$ npm start
To start the client (port: 4200): open new cmd window (in project root) and run

$ cd client
$ npm install (if you havent already installed the dependencies)
$ ng serve


<strong>Features</strong>

<strong>Not authenticated users can:</strong>

Login, Register
View all promotions.
View promotion details.
View comments from users.
View the profile of the promoter who has launched the promotion.
Search for current promotion.
Sort the promotion by criteria.
Chat with other users in chat rooms


<strong>Authenticated users can:</strong>

Like current promotion.
Comment current promotion.
Send message to other users.
View ther message from other users.
View their promotion.
Edit, Delete, Create promotion.

<strong>Admin can:</strong>

Delete users.
Create new admin user.
