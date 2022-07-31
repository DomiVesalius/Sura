# Frontend

## Pages
### Register
* **RegisterForm**: A simple form for logging in

### Register Page Structure
```
Register
|-- RegisterForm
```

### Login
* **LoginForm**: A simple form for logging in

#### Login Page Structure
```
Login
|-- LoginForm
```

### App
* **Image**: The area which will display the current image
* **Gallery**: Each user has their own gallery of photos that only they can upload images to
* **AddImageForm**: A form that allows users to upload an image
* **Comment**: A users comment on an image in a certain gallery
* **CommentSection**: A section containing a paginated list of comments for a specific image
* **AddCommentForm**: A form that allows users to add comments to a specific image
* **Logout**: A simple button that allows users to log out of their account

#### App Page Structure
```
App
|-- Logout
|-- Gallery
    |-- Image
        |-- AddCommentForm
        |-- CommentSection
            |-- Comment
            |-- Comment
            [...]
            |-- Comment
    |-- AddImageForm
```