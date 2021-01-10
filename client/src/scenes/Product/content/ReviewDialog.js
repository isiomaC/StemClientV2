import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';


import { setAlert } from '../../../redux/actions/alert'

import PropTypes from 'prop-types'
import axios from 'axios'

//import Rating from '../../Home/content/cRating'


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };


const useStyles = makeStyles(theme => ({
    stars: {
        display: 'flex',
        alignitems: 'flex-start',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    }
}))

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ReviewDialog({ open, handleClose, product_id, setAlert, user}) {

    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const [review, setReview] = React.useState({
      comment: null,
    })

    const apiUrl = process.env.REACT_APP_API_URL

    const classes = useStyles();

    const handleCommentText = (event) => {
      setReview({...review, 
          [event.target.name]: event.target.value 
      })
    }

    const handleSave = async () => {

      const { comment } = review
      let form = {}

      if(user && user.email){
        form = {
          user: user._id,
          comment: comment ? comment : '',
          rating: value,
          id: product_id
        }
      }else{
        form = {
          comment: comment ? comment : '',
          rating: value,
          id: product_id
        }
      }

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      try{
        const res = await axios.post(`${apiUrl}/reviews`, form, config)
        if (res.data.success){
          setAlert(res.data, 'info') //get custom message from AYY
        }

        handleClose()
      }catch(e){
        setAlert({ success: false, message: 'Ooops!! Something went wrong, please try again'}, 'error')
        handleClose()
      }
  };


  return (
      <Dialog
        open={open}
        maxWidth='md'
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Leave a review
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                Your feedback will help other shoppers make good choices, and we'll use it to improve our products.
          </DialogContentText>
          <div style={{display:'block'}}>
              <Typography>Overall rating</Typography>
              <div className={classes.stars}>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>
          </div>
          <TextField
            autoFocus
            margin="normal"
            id="comment"
            label="Comment"
            multiline
            placeholder="Leave a Review(optional)"
            onChange={handleCommentText}
            // rows={6}
            type="text"
            name="comment"
            // variant='filled'
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} style={{color:"black"}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  );
}

ReviewDialog.propTypes = {
  open: PropTypes.bool,
  handleClose : PropTypes.func,
  product_id: PropTypes.number,
  user: PropTypes.object
}


export default connect(null, { setAlert })(ReviewDialog)