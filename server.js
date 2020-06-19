const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./config/keys").mongoURI;
const user = require("./routes/user");
const note = require("./routes/note");
const image = require("./routes/image");
const listitem = require("./routes/listitem");

mongoose.set("useFindAndModify", false);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/user", user);
app.use("/note", note);
app.use("/listitem", listitem);
app.use("/image", image);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

/*
Some things to remember: 

+ super secret backend route/function maybe? for deleting all of the user' notes after account is deleted
don't create models for reminders and labels, as it would be redundant, they are just references to notes. 
render a label if there exists any in any of the notes, or any is created.
do the same for reminders.
archives and trash however contain unique notes references in user's notes reference.

Note object => {
  does not include archived notes or trash
  label names are editable 
  notes can have single, multiple Labels or no labels at all
  includes all notes without a label, from reminders, drawn notes, and from any label 
  drawn notes are also part of images
  backgroundColor: hex string | defaults to null, if is null, set bg as dark/light mode color
}

all users will have same profilePic, its pretty much to have profilePic in this application
so i will not be saving anything in database
just use some default image

frontend: show a loading gif when a note is being saved {xhr is made} and change it to reload symbol once done

No one fields is mandatory for creating a note however, a notes must have on of the following fields: 
{title, content, list, image} 

put request to image route is only applicable for custom drawings


Don't use tweenmax for animations
Instead of proptypes let's use flow for type checking
Instead of global css let's use styled components
*/
