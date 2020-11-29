import React from 'react'
import PropTypes from 'prop-types'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Popover from '@material-ui/core/Popover'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'

import ShoppingCart from '../Components/ShoppingCart'

import approximatePrice from '../utils/approximatePrice'

const useStyles = makeStyles(theme => ({
    root: {

    },
     checkOutBtn:{
        background:'rgba(255,255,255)',
        color: 'rgb(255,0,0)', 
        marginBottom: '10px'
    },
    orderTotal:{
        height: '10%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    checkOutContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-end'
    },
    cart: {
        cursor: 'pointer',
        '&:hover': {
            color : green[400]   
        }
    },
}))


const QuickShop = ({ shoppingcart, goToCheckOut, getOrderTotal }) => {

    const [anchorEl, setAnchroEl] = React.useState(null)
    const openPopper = Boolean(anchorEl)

    const classes = useStyles()

    const showCart = (event) => {
        setAnchroEl(event.currentTarget)
    }

    const handleCartClose = () => {
        setAnchroEl(null)
    }

    const navigateToCheckOut = () => {
        setAnchroEl(null)
        goToCheckOut()
    }

    return (
        <div >
            <Badge badgeContent={shoppingcart.items ? shoppingcart.items.length : 0 } color="error">
                <ShoppingCartIcon className={classes.cart} onClick={showCart} />
            </Badge>
            <Popover
                id="simple-popper"
                open={openPopper}
                anchorEl={anchorEl}
                onClose={handleCartClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <Box style={{ display: 'flex', textAlign: 'center', flexDirection: 'column'}}>
                    <Container>
                        <h4>Shopping Cart</h4>
                        <p>({shoppingcart.items ? shoppingcart.items.length : 0 } items)</p>
                    </Container>
                </Box>

                { shoppingcart.items && shoppingcart.items.map((item, index) =>(
                    <Container key={index}>
                        <Divider/>
                        <ShoppingCart cart={item} key={index} />
                    </Container>
                ))}
                <Divider/>
                <Container className={classes.orderTotal}>
                    <Typography style={{ height: '50%'}}>
                        Order Total: €{approximatePrice(getOrderTotal(shoppingcart))}
                    </Typography>
                </Container>
                <Divider style={{ marginBottom: '20px'}}/>
                <Container component='div' className={classes.checkOutContainer}>
                    <Button
                        disabled={shoppingcart.items.length === 0 ? true : false}
                        variant='contained' 
                        onClick={navigateToCheckOut} 
                        className={classes.checkOutBtn}> 
                            CheckOut
                    </Button>
                </Container>
            </Popover>
        </div>
    )
}

QuickShop.propTypes = {
    shoppingcart: PropTypes.object,
    goToCheckOut: PropTypes.func,
    approximatePrice: PropTypes.func,
}


export default QuickShop;