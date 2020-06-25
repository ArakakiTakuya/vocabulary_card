import React from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";

import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import "./VocabularyList.css";

const VocabularyList = () => {
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words);
  const targetWordId = useSelector((state) => state.targetWordId);
  const openStatus = useSelector((state) => state.openStatus);
  const btnType = useSelector((state) => state.btnType);
  const inputWord = useSelector((state) => state.inputWord);
  const inputMeaning = useSelector((state) => state.inputMeaning);

  const handleClickOpen = (btnType, targetWordId) => {
    dispatch({ type: "SET_OPEN_STATUS", openStatus: true, btnType: btnType });
    dispatch({ type: "SET_TARGET_WORD_ID", targetWordId: targetWordId });
  };

  const handleClose = () => {
    dispatch({ type: "SET_OPEN_STATUS", openStatus: false, btnType: "" });
  };

  return (
    <>
      <h2>収録単語一覧({words.length})</h2>
      <div className="vocabulary_list">
        {words.map((word, i) => (
          <Paper variant="outlined" square className="paper" key={word.Id}>
            <h4>{word.En_meaning}</h4>
            <h5> {word.Ja_meaning}</h5>
            <div class="delete_btn" idx={i} id={word.Id}>
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  const targetWordId = e.currentTarget.parentNode.getAttribute(
                    "id"
                  );
                  handleClickOpen("delete", targetWordId);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Paper>
        ))}
      </div>
      <div className="btn">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen("add")}
        >
          Add new word
        </Button>
      </div>
      <>
        <Dialog open={btnType === "delete" && openStatus} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>この単語を消去しますか？</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => {
                fetch(`/api/words/${targetWordId}`, {
                  method: "DELETE",
                });
                dispatch({
                  type: "DELETE_TARGET_WORD",
                  targetWordId: targetWordId,
                });
                handleClose();
              }}
              color="primary"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={btnType === "add" && openStatus}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Let's add new word !</DialogTitle>
          <DialogContent>
            <DialogContentText>
              追加したい単語とその日本語訳を記入してください。
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="単語"
              fullWidth
              onChange={(e) => {
                dispatch({ type: "SET_INPUT_WORD", inputWord: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              id="name"
              label="日本語訳"
              fullWidth
              onChange={(e) => {
                dispatch({
                  type: "SET_INPUT_MEANING",
                  inputMeaning: e.target.value,
                });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                const data = {
                  Id: uuid(),
                  En_meaning: inputWord,
                  Ja_meaning: inputMeaning,
                  Level: "basic",
                };
                fetch("/api/words", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });
                dispatch({
                  type: "ADD_NEW_WORD",
                  newWord: data,
                });
                handleClose();
              }}
              color="primary"
            >
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};

export default VocabularyList;
