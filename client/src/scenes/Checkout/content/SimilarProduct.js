import React from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import approximatePrice from '../../../utils/approximatePrice'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent:'space-between',
        margin: '15px',
        background:'transparent',
        cursor: 'pointer'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 151,
    },
    description: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        textAlign: 'left',
        '-webkit-line-clamp': 2,
         /* number of lines to show */
        '-webkit-box-orient': 'vertical',
    }
}))


const SimilarProduct = ({id, name, description, size, price, image }) => {

    const classes = useStyles()

    const { push } = useHistory()
    
    React.useEffect(() => {

    }, [])

    return (
        <Card className={classes.root} onClick={() => push(`/product/${id}`)}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="body1">
                        {name}
                    </Typography>
                    <Typography className={classes.description} variant="subtitle1" color="textSecondary">
                        {description.split(/\<.*?\>/g)}
                    </Typography>
                    {/* <Typography variant="subtitle1" color="textSecondary">
                        {size}
                    </Typography> */}
                    <Typography variant="subtitle1" color="textSecondary">
                        €{approximatePrice(price)} 
                    </Typography>
                </CardContent>
            </div>
            <CardMedia
                className={classes.cover}
                image={image ? image : "https://i.imgur.com/EHyR2nP.png"}
                title={name}/>
        </Card>
    )
}


SimilarProduct.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.any
}

export default SimilarProduct;
