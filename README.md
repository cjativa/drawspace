# DrawSpace

Hi - this is the repository for the DrawSpace application. It exposes these routes for the UI
- `/login` - Where you can login to your account
- `/sign-up` - Where you can register for an account
- `/draw` - Where you can create a new drawing (protected route)
- `/drawings` - List of drawings that a user has created (protected route)
- `/draw/:id` - View an existing drawing (protected route)

The app is written with React TypeScript and NodeJS (TypeScript) using Express. PostgreSQL is the persistence layer. There is a debugging script for the Node server in the `.vscode` directory.

# Authentication

The authentication method is simple - when you login/sign-up for an account, a JWT token is provided in the response. This is then stored in local storage and provided with any API request that requires authentication. There is middleware that validates that a JWT token has been provided for protected routes, and that it has not yet expired (1-hour TTL).

Once the JWT is successfully parsed, the `userId` is extracted from the payload and attached to the Express request for subsequent user-related actions.

I typically opt for authentication via HTTP-Only cookies set by the server, and therein storing a JWT containing payload information, such as roles and security permissions. For sake of time and simplicity, I did use local storage persisting of the JWT, which is not as secure.

The login and sign-up pages display a small error if your credentials were not located in the database, or if you try to sign up with an already-existing username. No validation on the provided input as of yet, so there's no minimum-password requirements.

# Drawing page

You can see the main drawing page is made up of several sub-components; 
- The DrawCanvas component, solely responsible for rendering and modifying the canvas
- The DrawGeneralActions component, displaying the controls for resetting a drawing, saving it, and setting the privacy level of the drawing
- The DrawStrokeActions component, displaying the different colors for the brush, the different sizes of the brush, toggling the eraser

Most of the application renders nicely and fits on mobile, but the canvas does not resize on mobile so this page is completely broken on mobile. Additionally, you can not draw on mobile due to using the mouse event handlers for determining when the canvas draws. If I had more time available, I'd have dynamically resized the canvas according to the viewport with JavaScript as this is not possible with CSS from what I researched.

Also, if you create a drawing, save it, and edit that same drawing and save again, rather than modifying the existing drawing record in the database, this creates a new drawing.
If I had more time, I would add this functionality, it would not be too many lines of code -- mainly just having to check if we're on the `/draw` or `/draw/:id` page, and determining from there if we need to send a POST request (to create the new drawing) or PUT request to modify the existing one. This would be very easy to add in the backend.

I would have also liked to make the "Eraser" button a toggle switch, but did not have enough time to spare. Additionally, would have preferred to make the brush size selections more UX-friendly, as currently it is difficult to click the smallest brush size.

# Drawings List page

I misread the requirements for the main page; I hadn't realized it was to be a gallery of public drawings from all users. Currently, it displays all drawings for the signed in user, along with the creation date and time, the time-to-draw, a thumbnail, and allows a user to delete the drawings.

It would be very simple to repurpose this list to be able to show all public drawings of all users, and still serve its function to show all drawings of the signed in user. I simply had misread the spec so my apologies. 

For public images on this page, there is a generated link for future sharing. The link works, but only when the user is authenticated. It doesn't work if a user isn't signed in, but this would be easy to change in the future. It is a trade-off from having made the Draw page a protected route, as well as the API only being able to serve requests for an authenticated user. 

In the future, I would have made better decisions early on about which API endpoints are public, and which are private, as most of the app functions right now using private API's.

# Running the App

1. Start your local PostgreSQL server and make note of the hostname, database name, username, and password
2. Modify the existing `.env` with your database information (normally, the `.env` file would not be committed to source control, but for the sake of quickly cloning and running the server, it is)
3. Run `npm install`
4. Compile the TypeScript to the `dist` folder using `npm run build`
5. Start the server with `npm run server`

Sign up for an account and begin drawing.

