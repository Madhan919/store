import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Button } from ".";
import axios from "axios";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const Upload = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setFile] = useState(null);
  const [isExist, setImage] = useState(false);
  const [url, setUrl] = useState("");
  const [inputFields, setValue] = useState({ profileName: "", caption: "" });
  const handleChange = (event) => {
    setUrl(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    setImage(true);
  };
  const uploadImage = (event) => {
    const fd = new FormData();
    fd.append("image", selectedFile);
    axios
      .post("http://localhost:9000/post", fd, {
        headers: {
          caption: inputFields.caption,
        },
      })
      .then((response) => {
        console.log("response", response);
        window.location.reload(false);
      })
      .catch((errors) => {
        console.log(errors.error);
      });
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setUrl("");
    setOpen(false);
    setImage(false);
  };
  return (
    <div className="upload1">
      <img
        className="upload1"
        alt="upload"
        src="Image/Icons/upload.png"
        onClick={handleClickOpen}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Profile
        </DialogTitle>

        <DialogContent dividers>
          {url.length > 0 && (
            <img alt="uploaded" className="uploadImage" src={url} />
          )}
          {!isExist && (
            <div className="imageUpload">
              <label htmlFor="files" className="btn chooseImage">
                Choose File
              </label>
              <input
                id="files"
                style={{ display: "none" }}
                type="file"
                onChange={handleChange}
              />
              <br />
            </div>
          )}

          <input
            type="text"
            className="textfield"
            placeholder="Description"
            name="caption"
            onChange={(event) =>
              setValue({ ...inputFields, caption: event.target.value })
            }
          />
          <br />
          <Button
            className="upload-button"
            onClick={uploadImage}
            text="Upload"
          />
          <Button
            className="upload-button"
            onClick={handleClose}
            text="Cancel"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Upload;
