const express = require("express");
const router = express.Router();
const note = require("../models/Note");
const listItem = require("../models/ListItem");
const passport = require("passport");

//@route POST listitem/
//@desc create and add a list item to a note' list field
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ listItemCreateError: "Note ID is needed" });
    if (!req.body.listItemName || req.body.listItemName.trim().length == 0)
      return res
        .status(400)
        .json({ listItemCreateError: "List Item Name is needed" });
    note
      .findById(req.body.noteID)
      .then((foundNote) => {
        const newListItem = new ListItem({
          itemName: req.body.listItemName,
        });
        foundNote.list.push(newListItem);
        Promise.all([newListItem.save(), foundNote.save()])
          .then(() => res.json({ success: true }))
          .catch(() =>
            res
              .status(500)
              .json({ listItemCreateError: "Something went wrong" })
          );
      })
      .catch(() =>
        res.status(404).json({ listItemCreateError: "Note not found" })
      );
  }
);

//@route PUT listitem/
//@desc change list item' checked value
//@access Private
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.listItemID)
      return res
        .status(400)
        .json({ listItemUpdateError: "List Item ID is needed" });
    listItem
      .findById(req.body.listItemID)
      .then((foundListItem) => {
        foundListItem.checked = !foundListItem.checked;
        foundListItem
          .save()
          .then(() => res.json({ success: true }))
          .catch(() =>
            res
              .status(500)
              .json({ listItemUpdateError: "Something went wrong" })
          );
      })
      .catch(() =>
        res.status(404).json({ listItemUpdateError: "List Item not found" })
      );
  }
);

//@route DELETE listitem/
//@desc remove list item from note' list field and delete it
//@access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.noteID)
      return res.status(400).json({ listItemCreateError: "Note ID is needed" });
    if (!req.body.listItemID)
      return res
        .status(400)
        .json({ listItemUpdateError: "List Item ID is needed" });
    note
      .findById(req.body.noteID)
      .then((foundNote) => {
        let i = foundNote.list.indexOf(req.body.listItemID);
        if (i == -1)
          return res
            .status(404)
            .json({ listItemDeleteError: "List Item not found" });
        foundNote.list.splice(i, 1);
        Promise.all([
          listItem.findByIdAndRemove(req.body.listItemID),
          foundNote.save(),
        ])
          .then(() => {
            res.json({ success: true });
          })
          .catch(() =>
            res
              .status(500)
              .json({ listItemUpdateError: "Something went wrong" })
          );
      })
      .catch(() =>
        res.status(404).json({ listItemUpdateError: "Note not found" })
      );
  }
);

module.exports = router;
