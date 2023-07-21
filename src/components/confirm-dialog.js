import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from 'prop-types';


export const ConfirmDialog = (props) => 
{
  const {open, title, content, agreeTitle, closeTitle, handleAgree, handleClose} = props;
  return (
    <Dialog
      open={open}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleAgree}>{agreeTitle}</Button>
        <Button onClick={handleClose}>{closeTitle}</Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  open : PropTypes.bool,
  title : PropTypes.string,
  content : PropTypes.string,
  agreeTitle : PropTypes.string,
  closeTitle : PropTypes.string,
  handleAgree : PropTypes.func,
  handleClose : PropTypes.func,
}