import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:focus':{
      outline: 'none'
    },
    boxShadow: 'none'
  },
}));

export default function TransitionsModal({ open, handleClose, body}) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {body}
        </Fade>
      </Modal>
    </div>
  );
}

TransitionsModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    body: PropTypes.element
}