const express = require("express");
const router = express.Router();
const note = require("../models/Note");
const image = require("../models/Image");
const passport = require("passport");

//@route POST image/
//@desc create and add an image to a note' images field
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.imageData)
      return res.status(400).json({ imageUploadError: "Image data is needed" });
    if (!req.body.noteID)
      return res.status(400).json({ imageUploadError: "Note ID is needed" });
    const imageObject = new Image({ data: req.body.imageData });
    note
      .findById(req.body.noteID)
      .then((foundNote) => {
        foundNote.images.push(imageObject);
        Promise.all([foundNote.save(), imageObject.save()])
          .then(() => res.json({ success: true }))
          .catch(() =>
            res.status(500).json({ imageUploadError: "Something went wrong" })
          );
      })
      .catch(() =>
        res.status(404).json({ imageUploadError: "Note not found" })
      );
  }
);

//@route PUT image/
//@desc updates an image data
//@access Private
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.imageData)
      return res.status(400).json({ imageUpdateError: "Image data is needed" });
    if (!req.body.imageID)
      return res.status(400).json({ imageUpdateError: "Image ID is needed" });
    image
      .findById(req.body.imageID)
      .then((foundImage) => {
        foundImage.data = req.body.imageData;
        foundImage
          .save()
          .then(() => res.json({ success: true }))
          .catch(() =>
            res.status(500).json({ imageUpdateError: "Something went wrong" })
          );
      })
      .catch(() =>
        res.status(404).json({ imageUpdateError: "Image not found" })
      );
  }
);

//@route DELETE image/
//@desc remove image from note' images field and delete it
//@access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ imageDeleteError: "Note ID is needed" });
    if (!req.body.imageID)
      return res.status(400).json({ imageDeleteError: "Image ID is needed" });
    note
      .findById(req.body.noteID)
      .then((foundNote) => {
        let i = foundNote.images.indexOf(req.body.imageID);
        if (i == -1)
          return res.status(404).json({ imageDeleteError: "Image not found" });
        foundNote.images.splice(i, 1);
        Promise.all([
          image.findByIdAndRemove(req.body.imageID),
          foundNote.save(),
        ])
          .then(() => res.json({ success: true }))
          .catch(() =>
            res.status(500).json({ imageDeleteError: "Something went wrong" })
          );
      })
      .catch(() =>
        res.status(404).json({ imageDeleteError: "Note not found" })
      );
  }
);

module.exports = router;
