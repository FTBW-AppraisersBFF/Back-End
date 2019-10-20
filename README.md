#  ![Logo](https://i.imgur.com/JDulAno.png) Appraiser's BFF Backend 


- [Note on Price Calculations](#note-on-price-calculations)
- [Sanity Check](#sanity-check)
- [Register & Login Endpoints](#register-and-login-endpoints)
  - [Register](#registering-a-user)
  - [Login](#logging-in-a-user)
- [About Endpoint](#about-endpoint)
- [Houses Endpoint](#houses-endpoint)
  - [GET All Houses](#get-all-houses)
  - [GET Specific House](#get-specific-house)
  - [POST New House](#post-new-house)
  - [PUT Existing House](#put-existing-house)
  - [DELETE Existing House](#delete-existing-house)
- [Fav Endpoint](#fav-endpoint)
  - [GET User Favorites](#get-user-favorites)
  - [POST New Listing into Favorites](#post-new-listing-into-favorites)
  - [PUT Listing from Favorites](#put-listing-from-favorites)
  - [DELETE Listing from Favorites](#delete-listing-from-favorites)
- [Contributions](#contributions)

# NOTE ON PRICE CALCULATIONS

We calculate the price of an appraisal via a Flask API on Heroku that our Data Scientists have deployed. If price calulations seems to be slow, or even errors out, please wait a couple of minutes before trying again. The site may be in a hibernated state and will need time to awake before calculating the appraisal. Thank you.

# SANITY CHECK

method url: **/**

http method: **[GET]**

**Example Response:** status 200 (OK)
```
{
  "test": "it's up"
}
```

# REGISTER AND LOGIN ENDPOINTS

### NO AUTHENTICATION REQUIRED

### Registering a user
method url: **api/auth/register**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| username | String | Yes      | Must be unique                    |
| password | String | Yes      |                                   |

**Example Body:**
```
{
  username: 'lambda',
  password: 'school!'
}
```

**Example Response:** status 201 (Created)

--------------------

### Logging in a user
method url: **/api/auth/login**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| username | String | Yes      | Must be unique                    |
| password | String | Yes      |                                   |

**Example Body:**
```
{
  username: 'lambda',
  password: 'school!'
}
```

**Example Response:** status 200 (OK)
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhbWJkYSIsImlhdCI6MTU2OTM3Mzg5OSwiZXhwIjoxNTY5NDYwMjk5fQ.QWqe4i1fZJmHikIP07avAjTzRc3QhefnFkbcFp6ZM90" 
}
```
**Example Response:** status 401 (Unauthorized)
```
{
  "message": "Invalid credentials"
}
```

# ABOUT ENDPOINT

method url: */about*

http method: **[GET]**

**Example Response:** status 200 (OK)
```
{
  "test": ["the", "app", "works" ]
}
```

# HOUSES ENDPOINT

### AUTHENTICATION REQUIRED

#### GET All Houses

method url: **/houses**

http method: **[GET]**

**Example Response:** status 200 (OK)
```
[
  {
    "id": 1,
    "zipCode": 90210,
    "yearBuilt": 1960,
    "squareFootage": 1000,
    "bedrooms": 8,
    "bathrooms": 5.5,
    "price": 690000
  },
  {
    "id": 2,
    "zipCode": 10024,
    "yearBuilt": 1975,
    "squareFootage": 2500,
    "bedrooms": 1,
    "bathrooms": 0.5,
    "price": 480500
  },
  {
    etc..
  },
]
```
--------------------

#### GET Specific House

method url: **/houses/:id**

*id references the house id entry*

http method: **[GET]**

**Example Response from `/houses/4`:** status 200 (OK)
```
{
  "id": 4,
  "zipCode": 29083,
  "yearBuilt": 1987,
  "squareFootage": 2800,
  "bedrooms": 2,
  "bathrooms": 2,
  "price": 345678
}
```
--------------------

#### POST New House

method url: **/houses**

http method: **[POST]**

**Body**

| name          | type    | required | description                                | 
| ------------- | ------- | -------- | ------------------------------------------ |
| zipCode       | Integer | Yes      | Must be 5 digits                           |
| yearBuilt     | Integer | Yes      | Must be 4 digits, 1900 onwards             |
| squareFootage | Integer | Yes      | Must be between 400 and 10000              |
| bedrooms      | Integer | Yes      | Must be between 1 and 8                    |
| bathrooms     | Float   | Yes      | Must be between 0.5 and 6, with half steps |

**Example Body:**
```
{
  "zipCode": 99999,
  "yearBuilt": 1946,
  "squareFootage": 1000,
  "bedrooms": 1,
  "bathrooms": 3
}
```

**Example Response:** status 201 (Created)
```
{
  "id": 7,
  "zipCode": 99999,
  "yearBuilt": 1946,
  "squareFootage": 1000,
  "bedrooms": 1,
  "bathrooms": 3,
  "price": 101984
}
```
--------------------

#### PUT Existing House

method url: **/houses/:id**

*where `:id` is the house id*

http method: **[PUT]**

**Body**

| name          | type    | required | description                                | 
| ------------- | ------- | -------- | ------------------------------------------ |
| zipCode       | Integer | Yes      | Must be 5 digits                           |
| yearBuilt     | Integer | Yes      | Must be 4 digits, 1900 onwards             |
| squareFootage | Integer | Yes      | Must be between 400 and 10000              |
| bedrooms      | Integer | Yes      | Must be between 1 and 8                    |
| bathrooms     | Float   | Yes      | Must be between 0.5 and 6, with half steps |

**Example Body:**
```
{
  "zipCode": 10000,
  "yearBuilt": 1953,
  "squareFootage": 9000,
  "bedrooms": 2,
  "bathrooms": 1
}
```

**Example Response from `/houses/4`:** status 200 (OK)
```
{
  "id": 4,
  "zipCode": 10000,
  "yearBuilt": 1953,
  "squareFootage": 9000,
  "bedrooms": 2,
  "bathrooms": 1,
  "price": 345678
}
```
--------------------

#### DELETE Existing House

method url: **/houses/:id**

*where `:id` is the house id*

http method: **[DELETE]**

**Example Response from `/houses/1`:** status 200 (OK)
```
{
  "id": 1,
  "zipCode": 90210,
  "yearBuilt": 1960,
  "squareFootage": 1000,
  "bedrooms": 10,
  "bathrooms": 5.5
}
```

# FAV ENDPOINT

### AUTHENTICATION REQUIRED

#### GET User Favorites

method url: **/fav/user**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| username | String | Yes      | Must be unique                    |

**Example Body:**
```
{
  username: 'lambda'
}
```

**Example Response:** status 200 (OK)
```
[
  {
    "id": 2,
    "name": "Nice view from patio",
    "interestLevel": 80,
    "houseID: 7,
    "zipCode": 10024,
    "yearBuilt": 1975,
    "squareFootage": 2500,
    "bedrooms": 1,
    "bathrooms": 0.5,
    "price": 480500
  }
]
```
--------------------

#### POST New Listing into Favorites

method url: **/fav**

http method: **[POST]**

**Body**

| name          | type    | required | description                       | 
| ------------- | ------- | -------- | --------------------------------- |
| userID        | Integer | Yes      | Id creation number of user        |
| houseID       | Integer | Yes      | Id creation number of house       |
| name          | String  | Yes      |                                   |
| interestLevel | Integer | Yes      | From 0 to 100                     |

**Example Body:**
```
{
  "userID": 2,
  "houseID": 7,
  "name": "by the beach",
  "interestLevel": 97
}
```

**Example Response:** status 200 (OK)
```
{
  "id": 7,
  "userID": 2,
  "houseID": 7,
  "name": "by the beach",
  "interestLevel": 97
}
```
--------------------

#### PUT Listing from Favorites

method url: **/fav/:id**

*where `:id` is the fav id*

http method: **[PUT]**

**Body**

| name          | type    | required | description                       | 
| ------------- | ------- | -------- | --------------------------------- |
| userID        | Integer | Yes      | Id creation number of user        |
| houseID       | Integer | Yes      | Id creation number of house       |
| name          | String  | Yes      |                                   |
| interestLevel | Integer | Yes      | Out of 100                        |

**Example Body:**
```
{
  "userID": 2,
  "houseID": 7,
  "name": "by the pier",
  "interestLevel": 100
}
```

**Example Response from `/fav/7`:** status 200 (OK)
```
{
  "id": 7,
  "userID": 2,
  "houseID": 7,
  "name": "by the pier",
  "interestLevel": 100
}
```
--------------------

#### DELETE Listing from Favorites

method url: **/fav/:id**

*where `:id` is the fav id*

http method: **[DELETE]**

**Example Response from `/fav/7`:** status 200 (OK)
```
{
  "id": 7,
  "userID": 2,
  "houseID": 7,
  "name": "by the pier",
  "interestLevel": 100
}
```

# CONTRIBUTIONS
Pull requests are welcome. For major changes, please open an issue first to discuss the change being implemented.
