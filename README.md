Vilnius University project about web services. Hotel room manager.

## Hotel Manager
### How to use API?

To start application:

Required applications:
```
Docker
```

Instructions:
1. Clone Github repository to your [directory];
2. cd [directory];
3. docker-compose up [-d];

## API

Service works on port 80.

### Users

#### GET request

Returns a list of all users in database.

```
URI: /users
```

Returns user by their ID.

```
URI: /users/64197f89c47f17d076421261
```

#### PUT request

Updates user's information.

```
URI: /users/64197f89c47f17d076421261

Body:
    {
        "Name": "Peter", 
        "Surname": "Smith" 
    }
```

#### POST request

Adds user to a database.

```
URI: /users

Body:
    {
        "Name": "Peter", 
        "Surname": "Smith" 
    }
```

#### DELETE request

Deletes user from database.

```
URI: /users/64197f89c47f17d076421261
```

### Hotel Rooms

#### GET request

Returns a list of all rooms in database.

```
URI: /rooms
```

Returns all available rooms in database.

```
URI: /rooms/available
```

Returns an available room by its ID.

```
URI: /rooms/available/64197f89c47f17d076421261
```

#### PUT request

Makes room available for booking.

```
URI: /rooms/64197f89c47f17d076421261
```

Books an available room for a user.

```
URI: /rooms/available/64197f89c47f17d076421261

Body:
    {
        "userID": "64197f89c47f17d076421261"
    }
```

#### POST request

Adds new room to a database.

```
URI: /rooms

Body:
    {
        "roomName: "VIP", 
        "roomPrice": "1000.00 EUR" 
    }
```

#### DELETE request

Deletes room from database.

```
URI: /rooms/64197f89c47f17d076421261
```
