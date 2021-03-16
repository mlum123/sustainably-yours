// Set up backend server conected to MongoDB Atlas database (with items and users)
// and Twilio SMS API (to send texts to sellers)

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

// use Twilio SMS API to send texts to specified phone nums from my Twilio phone number thru web app
const cors = require("cors");
const twilio = require("twilio");

// to use Twilio environment variables in .env
const dotenv = require("dotenv");
dotenv.config();

// Twilio requirements
// get Twilio account info from environment variables in .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const app = express();

// Twilio text
app.get("/send-text", (req, res) => {
  // _GET variables, passed via query string
  const { recipient, textmessage } = req.query;

  // send text
  client.messages
    .create({
      body: textmessage,
      to: "+1" + recipient,
      from: "+17089984991", // from my Twilio phone num
    })
    .then((message) => console.log(message.body));
});

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
