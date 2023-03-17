
//Importing neccesary dependents
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const path = require('path')
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");


//Adding JSON middleware to app
app.use(express.json());

//allows for nested objects to be encoded in URL
app.use(express.urlencoded({ extended: true }));

//Responsible for serving static HTML, CSS, and Javascript files
app.use(express.static("public"));


//Telling Express app to use the middleware defined in Routes folder
app.use(apiRoutes);

app.use(htmlRoutes);




//App listening for requests at set PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);