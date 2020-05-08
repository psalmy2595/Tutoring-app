const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const subjectRoutes = require("./routes/subject");


const PORT = process.env.PORT || 3000;
mongoose
  .connect(
    "mongodb+srv://psalmy2595:linuxinside@cluster0-6k5rx.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(result => {
    console.log("Database connected");
    app.listen(PORT);
  })
  .catch(err => console.log(err));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/v1/',authRoutes);
  app.use('/api/v1/', subjectRoutes);

app.use((req, res) => {
    res.send("<h1>Welcome to my app</h1>");
  });
