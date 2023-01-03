# This repo is a test repo(it has missing security features). Only feature developments take place on this repo. Once a feature is implemented without breaking changes, the feature is then added to mundane-mern repo.  
this repo has no:-  
 - middleware
 - bcrypt to hash pw in mongo
 - logging
 - controller routes
 - .env file
 - mongoose-sequence
 - express-async-handler  
 
# rest-pos-2022

### on priority
    --till jan 15th--  
    21st dec fixes deadline 
        - Bill generation page[X]  
        - Customer page[X]  
        - Add a stats page[?]  
        - Fix: duplicate order entries in cart[?]  
        - Fix: Added item not showing up in home page[?]  
        - Fix: Unique cart for every unique member[?]  
 
```
-- till feb 15th  
    - Feature: Add Tables[]  
    - Feature: Profile Management: admin(can choose), employee(can choose), owner(all access), ;[]  
```
```
-- till march 1st --  
    - Feature: Kitchen display system[]  
```

Feature driven developement  
PLAN[]  
1. finish bare minimum POS software by jan 15.   
2. 15th jan onwards scrum type sprints to develop features one at a time.  

NOTES:-   
Issues  
1.Unique carts for unique customers  
```
Present results:- All users have a common cart  
Expected results:- All users should have individual and unique carts  
Solution:- 1) Create a cart schema in backend and dispatch payload onClick to monngo via backend.  
           2) Tokenize localstorage thus creating unique local storages for unique users. (con:- rewrite login page)

```

3rd January ChangeLog
```
1. created a intermediate page for cart and bill generation. This is the Orders page
2. Added table number attribute
```

Major TODO:- 
```
1. When clicking on Gen Bill in Modal of form in orders page(nested last nest), All the orders of that table should be cleared after bill formation.
```


### versioning 

if a feature is added then increment 1.x.y to 1.x+1.y  
if a bug is fixed then increment 1.x.y to 1.x.y+1  
if a feature is added and a bug is fixed then increment 1.x.y to 1.x+1.y+1  


