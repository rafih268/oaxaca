# Group 21 Team Project

> Team 21's Restaurant Management System Project.

## Technology

- The code is based on javascript, both in the frontend and the backend.

- This project is using React as its frontend framework, therefore allowing us to organize this project into separate react components and using them in various pages of the web application.

- For the database we are using Prisma library as our ORM to to create our schema and connecting it to the MySQL database.

- For our RESTful API, we are using ExpressJS as our backend web application framework, along with NodeJS, which allows us to manage our packages and dependencies through the npm cli.

- We are using CSS to style the different components that we have in our react application.

## Installation

- Firstly, you must have [MySQL](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html) workbench installed in your system. The installation guide will be shown through the link provided.
- NodeJS is required to run this project. The version should be 16 or above. You can run `node --version` to check if it has been installed and if you have the correct version.
- To install packages and dependencies you would also need npm, which should be available to use on the terminal after installing NodeJS. You can check by running `npm --version` on the terminal.

## Project Set up

You would have to set up your environment variables by creating a .env file in the root directory.

The contents of that file should look like this:
```yaml
PORT = 5000
JWT_SECRET = abc123
DATABASE_URL= "mysql://USER:PASSWORD@localhost:3306/DATABASE"
```

- USER: The name of your database user. (Default should be 'root')
- PASSWORD: The password you have set for your MySQL database
- DATABASE: The name of the database. (You can set this to any name you desire)

This is an example of what the URL should look like:
```yaml
DATABASE_URL= "mysql://root:password@localhost:3306/oaxacadb"
```

## Run the project

- To run the project you must install all the packages and dependencies by running the following command in the root directory of the project:
  ```bash
  npm install
  ```

- To map the data models in the schema.prisma to the MySQL database schema, you need to run the prisma migrate CLI command:
  ```bash
  npx prisma migrate dev --name init
  ```

As mentioned in the prisma documentation, the command above will create a new SQL migration file, and run the SQL migration file against the database.

Note that the migrate command will also run the seed command, which populates the database with pre-defined data sets. In our case we added some menu items, user login details, credit card details and a default order.

- If the seeding has not worked and there is no data in the database, please run the following command:
  ```bash
  npx prisma db seed
  ```

### Running the server and the frontend
We advise you to have about 3 terminals open since the server and the frontend need to be running concurrently.

- On one terminal, run the following command to initiate the server:
  ```bash
  npm run server
  ```

- On another terminal, navigate to the frontend folder and run the following commands to initiate the frontend application:
  ```bash
  npm install
  npm start
  ```

This installs all dependencies required in the frontend and starts the frontend application.

## Support
If any assistance is required to set up and run the project, please feel free to contact Imtiaj <rafi.h2682002@gmail.com> or Caitlin <caitlinloh888@gmail.com>