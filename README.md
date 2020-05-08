[![N|Solid](https://start.ng/img/logo.jpg)](https://nodesource.com/products/nsolid)
# Online Tutoring App

Online tutoring app that has three categories of users: Admin, tutors and students

## About the project

Server for online Tutoring App



## Getting started

####Admin Login 

Email = startng@admin.com
Password = startng




## REST API

### Sign up

- ##### URL

  `https://johnson-tutor-app.herokuapp.com/api/v1/signup`

- ##### Method:

  `POST`

- ##### Data Params
  ```
  {
      email,
      password,
      name,
      role
  }
  ```
 ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ``` 

- ##### Error Response
  - Status: `400`
  - error: `"All fields are required"`
  - error: `"You can only sign up as a student or tutor"`
  - error: `"Sorry the user already exist"`

### Sign In

- ##### URL

  `https://johnson-tutor-app.herokuapp.com/api/v1/signin`

- ##### Method:

  `POST`

- ##### Data Params
  ```
  {
      email: string
      password: string
      authorization: token

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```

- ##### Error Response
  - Status: `400`
  - error: `"Incorrect password"`


### Get Subjects in a category

- ##### URL

  `/api/v1/:category/subjects`

- ##### Method:

  `GET`

- ##### Data Params
  ```
  {
      category: string - required

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```

   ## Create Subject

- ##### URL

  `/api/v1/:category/subject`

- ##### Method:

  `POST`

- ##### Data Params
  ```
  {
      name: string
      authorization: token

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```

## Update Subject

- ##### URL

  `/api/v1/subject/:subjectid`

- ##### Method:

  `PUT`

- ##### Data Params
  ```
  {
      name: string
      authorization: token

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```

## Delete Subject

- ##### URL

  `/api/v1/subject/:subjectid`

- ##### Method:

  `DELETE`

- ##### Data Params
  ```
  {
      name: string
      authorization: token

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```

 ## Get Subject By id

- ##### URL

  `/api/v1/:category/subject/:id`

- ##### Method:

  `GET`

  - ##### Data Params
  ```
  {
      name: string
      authorization: token

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```

  ## Serach Subject

- ##### URL

  `/api/v1/subject`

- ##### Method:

  `GET`

  - ##### Data Params
  ```
  {
      name: string
      

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```
  
  ## Get All Category

- ##### URL

  `/api/v1/category`

- ##### Method:

  `GET`

  - ##### Data Params
  ```
  {
      name: string
       authorization: token
      

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```
    ## Update Category

- ##### URL

  `/api/v1/:category`

- ##### Method:

  `PUT`

  - ##### Data Params
  ```
  {
      name: string
       authorization: token
      

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:

  ```
  {
      token: " "
  }
  ```

      ## Delete Category

- ##### URL

  `/api/v1/:category`

- ##### Method:

  `PUT`

  - ##### Data Params
  ```
  {
      name: string
       authorization: token
      

  }
  ```
- ##### Success Response

  - Status: `200`
  - data:
  ```

## Get Tutors

- ##### URL

  `/api/v1/tutors`

- ##### Method:

  `GET`

  - ##### Data Params
  ```
  {
      
       authorization: token
      

  }
  ```

  ## Get Tutors By id

- ##### URL

  `/api/v1/tutor/:id`

- ##### Method:

  `GET`

  - ##### Data Params
  ```
  {
      
       authorization: token
      

  }
  ```

  