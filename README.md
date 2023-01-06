# WorkFlo
![alt text](https://imgur.com/1WVwdEF?raw=true)

## About

WorkFlo is a project management web application that allows the user to collaborate with others during the project development phase. The web app offers a drag and drop feature which improves the users experience through its effortless organization performance and functionality. WorkFlo offers a set of tools that optimizes coordination including real-time chat and leveraging the Excalidraw website.

We built this web app to help organize the initial phase of project production by keeping all of the architectural references in one single place. We wanted to make the development process easier to navigate by avoiding flipping through multiple websites for different pieces of information.

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json`
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
* These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

* By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

