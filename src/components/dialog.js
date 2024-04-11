import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogComponent = ({
  open,
  content,
  title,
  footer,
  handleLeftButton,
  maxWidth = "sm",
}) => (
  <Dialog
    open={open}
    onClose={handleLeftButton}
    maxWidth={maxWidth}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>{content()}</DialogContent>
    {footer()}
  </Dialog>
);

export default DialogComponent;
