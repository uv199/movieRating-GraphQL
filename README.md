# movieRating
movie rating system 

### **MODULES**

* User
* Movie
* Rating
* Category

####  1. User
```JSON
    {
        firstName: "suraj",
        lastName: "abc",
        photo: "abc",
        Address: "abc",
        Email: "abc@gmail.com",
        Password: "abc",
        Gender: "male",
        isVerified: false,
        userType: "admin",
        createdAt: "22-02-2000"
    }
```
####  2. Movie
  ```JSON
    {  
        movieName: "abc",
        description: "abc",
        poster:"abc/photo.png",
        category: [ "drama",  "thriller"],
        totalRating: 100,
        totalUser: 20,
        avgRating: 5,
        productionHouse: "abc/id",
        OTTPlatForm: ["abc/id"],
        releaseDate: "22-02-2000",
        createdAt: "abc"
    }
```
#### 4. Rating
   ```JSON
    {
      movieId: "1234",
      UserId: "1234" ,
      ageGroup: "18-20",
      userType: "critic",
      rate: "4.5",
      createdAt: "12/12/2022",
      gender: "male",

    }
```

#### 6. Category
  ```JSON
    {
        Type : "drama/user-type"
    }
```
### **API Needed**
  
* Auth module
  * Sign-up
  * Sign-In
  
* Movie module
  * CRUD 
  * get movie with filter like
    * top-10/worst-10 (min 1000 review needed)
    * year
    * category
    * cast/producer/director
    
  
* User module 
  * CRUD 
  * Get All User by User-Type

* Rating module
  * create/update/delete by user
  * other filtered query
  
-----
### **Technologies**

   * Node.js + Apollo - Express + Graph-QL
----
### **Data Base**

   * Mongo-DB
---
### **Packages** 

*  Mongoose
*  http
*  Express
*  @apollo/server
*  graphQL
*  body-parser
*  ASYNC
*  JSONwebtoken
*  bcryptjs
*  mongoose-paginate-v2
---
### **Functional details** 

 * only admin create movie/cast/director/producer
 * user can sign-up by it self
 * give/ update rating by logged-in user
 * get top 10 movies / it is must have at least 1000 rating 
 * get top 10 popular movie who have most rating same as 10 worst
 * get 10 worst movies/ it is must have at least 1000 rating
 * need to apply year filter on all API
 * also add category filter
 * search movie
 * also have to apply filter of production house and OTT platform
 * also show age wise popular movie
 * also have ratings by user type like normal audience and * critics and have to apply a user filter on all get queries like top 10 and worst 10 etc..
 * critic can give rating after he is verified by admin 
 * gender wise good and worst movie also gender + age group wise
 * Rating distrubution


---

### **Task wise timing**

*  Setup and crud of user and other module - 1 day
*  Query for get different type of data - 2 day
*  And for testing - 1 day
*  Approx we need 4 day to complete all task*

---

### **1000 dollar project** 

* only audience and admin login
* give only rating
* get different type of information 
    * normal information like top 10 worst 10 movies.
    * get some filters like director, cast, producer, year category. 
    * can read movie rating which given by experts (which add admin)

		
### **2500 dollar project**

* audience, critic and admin login
* give only rating + write description and also upload video of review 
* get different type of information 
    * normal information like top 10 worst 10 movies.
    * get some filters like director, cast, producer, year, category + user wise rating audience and critic .
    * Users give over all reviews and critics can give category wise reviews like character, story lineup , etc. and critics also upload video of movie reviews. 
    * gender and age wise popular movies.
    * get overall rating across multiple platform 
    * can read and watch movie reviews given by critics.
    * which category type is most liked by the viewer nowadays. 
    * category wise movie rating given by critics.(for director/producer)

