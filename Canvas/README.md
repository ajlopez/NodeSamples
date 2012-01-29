# Canvas

A simple distributed canvas.

## Run Server

The server side needs Socket.io. Install it using:

    cd Server
    npm install socket.io
    
Then, launch the server with the command:

    node server.js
    
## Run Client

Open the Client/canvas.html file in two or more browsers. I tested it with Firefox. Note that some browser and their
security settings don't support the use of socket.io from a local HTML.

Drag de mouse over the canvas, and the drawing will appear at the other browsers.



