# Running Shoe demo
------------------------
login page
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/login.jpg)

### admin side

homepage
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/homepage.jpg)

users list
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/users.jpg)

add users
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/adduser.jpg)

edit user info
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/edituser.jpg)

add shoes
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/addshoe.jpg)

shoe info page
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/shoe.jpg)


### user side

homepage
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/homepagev2.jpg)

users list
![image](https://github.com/jabhuiyan/running-shoe/blob/main/demo/usersv2.jpg)

edit user info and shoe page stays the same.


# Features Description

Server-side features

1. Authentication
   - Description: Will implement user registration and login.
   - Implementation: This will be done using passport plugin. Registration and login will each have different rest api urls. Authentication will be maintained using jwt tokens.
   - State: Working fine. Refrained from using authorization on all other urls to reduce complexity in unit testing.
2. Admin Authorization
   - Description: Will implement permissions for admins show they can create and modify shoes.
   - Implementation: Will use "is_admin" column in the users table to identify if a user is admin. Will implement conditions that will give permission to create shoe and modify only if the authenticated user is admin.
   - State: Implemented. A lot of it will depend on UI to allow certain buttons only for admins.
3. Create Shoe
   - Descriptions: Admins will be able to create shoes 
   - Implementation: Need to use POST request in /shoes. This will create a new entry in the shoes table.
   - State: Fully working.
4. List Shoes
   - Description: All users will be able to retrieve list of shoes.
   - Implementation: Need to use a GET request to "/shoes". This will return JSON of all the entries in the shoes table.
   - State: Fully working.
5. Modify Shoe
   - Description: Admins will be able to modify existing shoes.
   - Implementation: Need to do a PUT request to /shoes/{id}. This will update the specific entry in the shoes table.
   - State: Fully working
6. Search Shoes
   - Description: Users will be able to search through a large collection of shoes
   - Implementation: Need to do a GET request with a query which will match the shoe names and return a list.
   - State: Fully working.

Client-side features:

1. Shoe list search
   - Description: Will implement client side of shoe list.
   - Implementation: Will send a GET request to /api/shoes and layout the data.
   - State: Fully Working.
2. Shoe list add form
   - Description: Will implement add form for shoes for admins only.
   - Implementation: Will send a POST request to /api/shoes and show a success message.
   - State: Fully Working.
3. Main Shoe page
   - Description: Will implement main view page for shoe
   - Implementation: Will send a GET request to /api/shoes/:id and show the data on the page
   - State: Mostly working - need more data to fill up the page
4. Navbar
   - Description: Will implement a navbar for all pages
   - Implementation: Will contain links to shoes and users page, and also buttons for authentication.
   - State: Fully working
5. Login form
   - Description: Will implement a login page 
   - Implementation: Will send a POST request to /api/users/login
   - State: Fully working
6. User edit form
   - Description: Users can edit their own profile. Admin can edit everyone.
   - Implementation: Will send a PUT request to /api/users/:id and show the success message
   - State: Fully working
7. User lists
   - Description: Will implement a users list
   - Implementation: Will send a GET request to /api/users and show the data on the page
   - State: Fully working

# Instructions

## Import dataset

```
mongoimport --db=runningshoerepo --type=csv --headerline --collection=shoes dataset/shoes.csv
```

## Run app

```
cd src

npm install

npm start
```

## To run tests

```
npm test
```
-----------------------------------

_to test client side, login using the following credentials:_

email address: admin@test.com
password: admin

