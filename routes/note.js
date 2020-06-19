const express = require("express");
const note = require("../models/Note");
const user = require("../models/User");
const router = express.Router();
const passport = require("passport");

//@route POST note/
//@desc create a note
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findById(req.user.id)
      .then((foundUser) => {
        const newNote = new Note();
        foundUser.notes.push(newNote);
        Promise.all([newNote.save(), foundUser.save()])
          .then(() => {
            res.json({ success: true });
          })
          .catch(() =>
            res.status(500).json({ noteCreateError: "Something went wrong" })
          );
      })
      .catch(() => res.status(404).json({ noteCreateError: "User not found" }));
  }
);

//@route PUT note/
//@desc update note' title or content
//@access Private
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ noteUpdateError: "Note ID is needed" });
    note
      .findById(req.body.noteID)
      .then((foundNote) => {
        if (req.body.title && req.body.title.trim().length > 0) {
          foundNote.title = req.body.title;
        }
        if (req.body.content && req.body.content.trim().length > 0) {
          foundNote.content = req.body.content;
        }
        foundNote
          .save()
          .then(() => res.json({ suceess: true }))
          .catch(() =>
            res.status(500).json({ noteUpdateError: "Something went wrong" })
          );
      })
      .catch(() => res.status(404).json({ noteUpdateError: "Note not found" }));
  }
);

//@route POST note/trash/remove
//@desc remove note from trash and add it to user' notes array
//set that note' willBeDeleted to false/null whichever is allowed
//@access Private
router.post(
  "/trash/remove",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ noteRemoveError: "Note ID is needed" });
    user
      .findById(req.user.id)
      .then((foundUser) => {
        let i = foundUser.trash.indexOf(req.body.noteID);
        if (i == -1)
          return res.status(404).json({ noteRemoveError: "Note not found" });
        foundUser.trash.splice(i, 1);
        foundUser.notes.push(req.body.noteID);
        note
          .findById(req.body.noteID)
          .then((foundNote) => {
            foundNote.willBeDeleted = null;
            Promise.all([foundNote.save(), foundUser.save()])
              .then(() => {
                res.json({ suceess: true });
              })
              .catch(() =>
                res
                  .status(500)
                  .json({ noteRemoveError: "Something went wrong" })
              );
          })
          .catch(() =>
            res.status(404).json({ noteRemoveError: "Note not found" })
          );
      })
      .catch(() => res.status(404).json({ noteRemoveError: "User not found" }));
  }
);

//@route GET note/
//@desc get all notes of user, with pagination
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findById(req.user.id)
      .populate({
        path: "notes",
        populate: "list images",
      })
      .then((foundUser) => {
        res.json({ notes: foundUser.notes });
      })
      .catch(() => res.status(404).json({ noteGetError: "User not found" }));
  }
);

//@route GET note/archive
//@desc get all archived notes of user, with pagination
//@access Private
router.get(
  "/archive",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findById(req.user.id)
      .populate({
        path: "archives",
        populate: "list",
      })
      .then((foundUser) => {
        res.json({ archiveNotes: foundUser.archives });
      })
      .catch(() => res.status(404).json({ archiveGetError: "User not found" }));
  }
);

//@route GET note/trash
//@desc get all trash notes of user, with pagination
//@access Private
router.get(
  "/trash",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findById(req.user.id)
      .populate({
        path: "trash",
        populate: "list",
      })
      .then((foundUser) => {
        res.json({ trashNotes: foundUser.trash });
      })
      .catch(() => res.status(404).json({ trashGetError: "User not found" }));
  }
);

//@route POST note/archive
//@desc remove note' ref from user' notes array and add that ref to user' archive array
//@access Private
router.post(
  "/archive",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ noteRemoveError: "Note ID is needed" });
    user
      .findById(req.user.id)
      .then((foundUser) => {
        let i = foundUser.notes.indexOf(req.body.noteID);
        if (i == -1)
          return res.status(404).json({ noteRemoveError: "Note not found" });
        foundUser.notes.splice(i, 1);
        foundUser.archives.push(req.body.noteID);
        foundUser
          .save()
          .then(() => res.json({ suceess: true }))
          .catch(() =>
            res.status(500).json({ noteRemoveError: "Something went wrong" })
          );
      })
      .catch(() => res.status(404).json({ noteRemoveError: "User not found" }));
  }
);

//@route POST note/archive/remove
//@desc remove note from archive and add it user' notes array
//@access Private
router.post(
  "/archive/remove",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ noteRemoveError: "Note ID is needed" });
    user
      .findById(req.user.id)
      .then((foundUser) => {
        let i = foundUser.archives.indexOf(req.body.noteID);
        if (i == -1)
          return res.status(404).json({ noteRemoveError: "Note not found" });
        foundUser.archives.splice(i, 1);
        foundUser.notes.push(req.body.noteID);
        foundUser
          .save()
          .then(() => res.json({ suceess: true }))
          .catch(() =>
            res.status(500).json({ noteRemoveError: "Something went wrong" })
          );
      })
      .catch(() => res.status(404).json({ noteRemoveError: "User not found" }));
  }
);

//@route POST note/trash
//@desc remove note' ref from user' notes array and add that ref to user'
//trash array, update note' willBeDeleted to 7 days from now
//@access Private
router.post(
  "/trash",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ noteRemoveError: "Note ID is needed" });
    user
      .findById(req.user.id)
      .then((foundUser) => {
        let i = foundUser.notes.indexOf(req.body.noteID);
        if (i == -1)
          return res.status(404).json({ noteRemoveError: "Note not found" });
        foundUser.notes.splice(i, 1);
        foundUser.trash.push(req.body.noteID);
        note
          .findById(req.body.noteID)
          .then((foundNote) => {
            foundNote.willBeDeleted = Date.now() + 604800000;
            Promise.all([foundNote.save(), foundUser.save()])
              .then(() => {
                res.json({ success: true });
              })
              .catch(() =>
                res
                  .status(500)
                  .json({ noteRemoveError: "Something went wrong" })
              );
          })
          .catch(() =>
            res.status(404).json({ noteRemoveError: "Note not found" })
          );
      })
      .catch(() => res.status(404).json({ noteRemoveError: "User not found" }));
  }
);

//@route DELETE note/trash
//@desc Permanently delete note from trash before expiration
//@access Private
router.delete(
  "/trash",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ noteDeleteError: "Note ID is needed" });
    user
      .findById(req.user.id)
      .then((foundUser) => {
        let i = foundUser.trash.indexOf(req.body.noteID);
        if (i == -1)
          return res.status(404).json({ noteDeleteError: "Note not found" });
        foundUser.trash.splice(i, 1);
        Promise.all([foundUser.save(), note.findByIdAndRemove(req.body.noteID)])
          .then(() => {
            res.json({ suceess: true });
          })
          .catch(() =>
            res.status(500).json({ noteDeleteError: "Something went wrong" })
          );
      })
      .catch(() => res.status(404).json({ noteDeleteError: "User not found" }));
  }
);

//@route PUT note/reminder
//@desc add/remove reminder to/from note
//@access Private
router.put(
  "/reminder",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ noteUpdateError: "Note ID is needed" });
    note
      .findById(req.body.noteID)
      .then((foundNote) => {
        if (!req.body.date) {
          foundNote.reminder = null;
        } else {
          foundNote.reminder = Date.parse(req.body.date);
        }
        foundNote
          .save()
          .then(() => res.json({ suceess: true }))
          .catch(() =>
            res.status(500).json({ noteUpdateError: "Something went wrong" })
          );
      })
      .catch(() => res.status(404).json({ noteUpdateError: "Note not found" }));
  }
);

//@route PUT note/background
//@desc change note' backgroundColor
//@access Private
router.put(
  "/background",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ noteUpdateError: "Note ID is needed" });
    if (!req.body.background)
      return res.status(400).json({ noteUpdateError: "Background is needed" });
    note
      .findById(req.body.noteID)
      .then((foundNote) => {
        foundNote.backgroundColor = req.body.background;
        foundNote
          .save()
          .then(() => res.json({ suceess: true }))
          .catch(() =>
            res.status(500).json({ noteUpdateError: "Something went wrong" })
          );
      })
      .catch(() => res.status(404).json({ noteUpdateError: "Note not found" }));
  }
);

module.exports = router;
