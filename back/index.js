const express = require('express');
const port = 8000;

const app = express();
app.get( "/" , (req, res) => res.send( " Can you see me?" ) );
app.listen( port , () => console.log("App is running on port http://localhost:" + port));

