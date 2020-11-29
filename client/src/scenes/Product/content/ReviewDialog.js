import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

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

import PropTypes from 'prop-types'
import axios from 'axios'

//import Rating from '../../Home/content/cRating'

const apiUrl = 'http://localhost:5000/api'

// const apiUrl = 'https://shrouded-hollows-95980.herokuapp.com/api'

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

function DraggableDialog({ open, handleClose, product_id}) {

    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const [review, setReview] = React.useState({
      comment: '',
    })

    const classes = useStyles();

    const handleCommentText = (event) => {
      setReview({...review, 
          [event.target.name]: event.target.value 
      })
    }

    const handleSave = async () => {

      const { comment } = review
      const form = {
          comment: comment ? comment : '',
          rating: value,
          id: product_id
      }

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      try{
        const res = await axios.post(`${apiUrl}/reviews`, form, config)
        console.log(res.data)

        handleClose()
      }catch(e){
        console.log(e)
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
            // variant='filled'
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="black">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  );
}

DraggableDialog.propTypes = {
  open: PropTypes.bool,
  handleClose : PropTypes.func,
  product_id: PropTypes.number

}

export default DraggableDialog