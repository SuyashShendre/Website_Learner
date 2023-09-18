# Website Learner Assignment

Blogging App API Documentation
Introduction
Welcome to the API documentation for the Blogging App. This API allows you to create, read, update, and delete blog posts. It allows to ccomment on post and can also update and delete by owner. It also provides user authentication and registration.

Base URL
The base URL for all API endpoints is: https://example.com/api

Authentication
Most of the endpoints require authentication using JSON Web Tokens (JWT). To authenticate, include the JWT token in the Authorization header of your requests.

Example:

makefile
Copy code
Authorization: Bearer YOUR_JWT_TOKEN
Endpoints
1. Authentication
1.1 Register
Endpoint: /api/auth/signup
Method: POST
Description: Register a new user.

Request:

json
Copy code
{
  "firstname": "your_firstname",
  "lastname": "your_lastname",
  "email": "your_email",
  "password": "password123"
}
Response:

201 Created: User successfully registered.
400 Bad Request: Invalid input data.
401 Conflict: Username already exists.

1.2 Login
Endpoint: /api/auth/login
Method: GET
Description: Log in an existing user and get a JWT token.

Request:

json
Copy code
{
  "email": "existing_user",
  "password": "password123"
}

Response:
200 OK: Login successful. Returns JWT token.
401 Unauthorized: Invalid credentials.

2. Blog Posts
2.1 Create a Blog Post
Endpoint: /api/posts
Method: POST
Description: Create a new blog post.

Request:

json
Copy code
{
  "title": "New Blog Post",
  "description": "This is the content of the blog post."
}

Response:
201 Created: Blog post successfully created.
401 Unauthorized: Authentication required.

2.2 Get All Blog Posts
Endpoint: /api/posts
Method: GET
Description: Get a list of all blog posts.

Response:
200 OK: Returns a list of blog posts.

2.3 Get Blog Post by ID
Endpoint: /api/posts/:id
Method: GET
Description: Get a specific blog post by ID.

Response:
200 OK: Returns the blog post.
404 Not Found: Blog post not found.

2.4 Update Blog Post by ID
Endpoint: /api/posts/:id
Method: PUT
Description: Update a specific blog post by ID.

Request:

json
Copy code
{
  "title": "Updated Blog Post",
  "description": "This is the updated content of the blog post."
}

Response:
200 OK: Blog post successfully updated.
401 Unauthorized: Authentication required.
404 Not Found: Blog post not found.

2.5 Delete Blog Post by ID

Endpoint: /api/posts/:id
Method: DELETE
Description: Delete a specific blog post by ID.

Response:

204 No Content: Blog post successfully deleted.
401 Unauthorized: Authentication required.
404 Not Found: Blog post not found.

3. User Profile
3.1 Get User Profile
Endpoint: /api/users/:id
Method: GET
Description: Get the profile information of the authenticated user.

Response:
200 OK: Returns user profile data.
401 Unauthorized: Authentication required.

4. Post Comments
4.1 Create a Post Comment
Endpoint: /api/comments
Method: POST
Description: Create a new comment for post.

Request:

json
Copy code
{
  "description": "New Comment",
  "post": "post id"
}

Response:
201 Created: Comment successfully created.
401 Unauthorized: Authentication required.

4.2 Get All Blog Posts
Endpoint: /api/comments
Method: GET
Description: Get a list of all comments.

Response:
200 OK: Returns a list of blog posts.

4.3 Get Comment by ID
Endpoint: /api/comments/:id
Method: GET
Description: Get a specific comment by ID.

Response:
200 OK: Returns the comment.
404 Not Found: comment not found.

4.4 Update Comment by ID
Endpoint: /api/comments/:id
Method: PUT
Description: Update a specific comment by ID.

Request:

json
Copy code
{
  "description": "Updated Comment",
  "post": "post id"
}

Response:
200 OK: comment successfully updated.
401 Unauthorized: Authentication required.
404 Not Found: Comment not found.

2.5 Delete Comment by ID

Endpoint: /api/comments/:id
Method: DELETE
Description: Delete a specific comment by ID.

Response:

401 Unauthorized: Authentication required.
404 Not Found: Comment not found.
