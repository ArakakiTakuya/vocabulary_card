import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./VocabularyList.css";

const VocabularyList = () => {
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);
  const openStatus = useSelector((state) => state.openStatus);

  const handleClickOpen = () => {
    dispatch({ type: "SET_OPEN_STATUS", openStatus: true });
  };

  const handleClose = () => {
    dispatch({ type: "SET_OPEN_STATUS", openStatus: false });
  };

  return (
    <>
      <h2>収録単語一覧({words.length})</h2>
      <div className="vocabulary_list">
        {words.map((word, i) => (
          <Paper variant="outlined" square className="paper" key={i}>
            <h4>{word.En_meaning}</h4>
            <h5> {word.Ja_meaning}</h5>
          </Paper>
        ))}
      </div>
      <div className="btn">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add new word
        </Button>
        <Dialog
          open={openStatus}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Let's add new word !</DialogTitle>
          <DialogContent>
            <DialogContentText>
              追加したい単語とその訳と日本語訳を記入してください。
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="単語"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="日本語訳"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default VocabularyList;
