# Bando Server

An E-Commerce platform with multi vendor support with latest technology

## Bando Overview

`Bando server provides REST API for Bando Client. This is not an open source project. Only Bando authorized would be able to send request and response to Bando server. some api is able to request directly and most of them are secured and restricted by api key `

### Our Technology

` Bando server is built with latest Express Js framework in association with popular js library such as mongoose, joi etc and Mongo DB`

### Deployed link:

[Bando server](https://pacific-waters-78461.herokuapp.com/)

Task:

- [x] create initial project setup
- [x] install dependencies
- [x] setup mongoose with mongodb
- [x] create /category api
- [x] refactor code
- [x] User Authentication
- [ ] Order API

Done:

- [x] create initial project setup
- [x] install dependencies
- [x] setup mongoose with mongodb
- [x] create /category api
- [x] refactor code
- [x] User Authentication

## API ENDPOINTS

1. login api `https://pacific-waters-78461.herokuapp.com//auth/login`
2. register `https://pacific-waters-78461.herokuapp.com/auth/signup`
3. add product: `https://pacific-waters-78461.herokuapp.com/product`
4. get all users: `https://pacific-waters-78461.herokuapp.com/auth/users`
5. get all user role: https://pacific-waters-78461.herokuapp.com/auth/users/:role
6. get user by id: https://pacific-waters-78461.herokuapp.com/auth/user/:id

### User and Seller Login

`https://pacific-waters-78461.herokuapp.com/auth/login `

```json
{
  "message": "login success",
  "name": "OK",
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFhZDY5MzFlNzE5MDRlZmJkYTRmYjQiLCJyb2xlIjoic2VsbGVyIiwic3RhdHVzIjpudWxsLCJpYXQiOjE2MjkxNjAwMzh9.poPZmsd3SI7WTNoSHX26LVw3Wwgelb5NUmor8OV98Zc",
  "user": {
    "name": "hrdelwar",
    "photoUrl": "http://exemple.com/image.png",
    "role": "seller",
    "phone": "+8801234567892",
    "email": "hrdelwar@gmail.com",
    "_id": "611ad6931e71904efbda4fb4",
    "createdAt": "2021-08-16T21:18:19.010Z",
    "status": null
  }
}
```

##### Notes

If the user's login is successful, a JWT-token response called "token" is sent to the response body. If some APIs need user access, then you will send the JWT-token to the API headers property name "token"
