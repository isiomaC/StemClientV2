import React from 'react'
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
        width: 151,
    }

}))


const SimilarProduct = ({name, description, size, price, image }) => {

    const classes = useStyles()

    React.useEffect(() => {

    }, [])

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="Body1" variant="Body1">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {description}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {size}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        €{approximatePrice(price)} 
                    </Typography>
                </CardContent>
            </div>
            <CardMedia
                className={classes.cover}
                image={image ? image : "https://i.imgur.com/EHyR2nP.png"}
                title="Live from space album cover"/>
        </Card>
    )
}


SimilarProduct.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.any
}

export default SimilarProduct;
