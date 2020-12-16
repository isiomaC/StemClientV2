import React from 'react'
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { Divider, useMediaQuery } from '@material-ui/core'
import Spinner from '../../Components/layout/Spinner'
import { getProducts } from '../../redux/actions/homeActions'

//content
import ShopCard from './content/ShopCard'
import Filters from './content/Filters'
import PropTypes from 'prop-types'

//img
import pro1 from '../../img/Pro1.jpg';
import twoby from '../../img/icons/squares.png'
import threeby from '../../img/icons/grid3x3.png'
import fourby from '../../img/icons/grid4x4.png'

import { makeStyles } from '@material-ui/core/styles'
import useInfiniteScroll from '../../utils/useInfiniteScroll'
import approximatePrice from '../../utils/approximatePrice'

//Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const asideWidth = 400;

const stub = [
    {
        image: pro1,
        title: 'Title',
        description: 'Hair product which is good',
        price:90
    },
    {
        image: pro1,
        title: 'Title 90',
        description: 'Short description here',
        price: 159
    },
    {
        image: pro1,
        title: 'title 4',
        description: ' description twenty 2',
        price: 20
    },
    {
        image: pro1,
        title: 'this is the title',
        description: 'this is the description',
        price: 30
    },
    {
        image: pro1,
        title: 'this is the title',
        description: 'this is the description',
        price: 30
    },
    {
        image: pro1,
        title: 'this is the title',
        description: 'this is the description',
        price: 30
    },
    {
        image: pro1,
        title: 'this is the title',
        description: 'this is the description',
        price: 30
    },
]


const useStyles = makeStyles(theme => ({

    root: {
        marginTop: 30,
        width: "100vw",
    },
    grid: {
        
    },
    topsection:{
        display: "flex",
        width: "inherit",
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: '50px'
    },
    drawer: {
        zIndex: -10,
        width: asideWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        background: "rgba(255,255,255,0)" ,
        width: asideWidth,
        elevation: 0
      },
      drawerContainer: {
        overflow: 'auto',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      scrollV: {
        display:'flex', 
        marginLeft: 0,
        // overflowY: "scroll",
        zIndex: 2,
        '&::-webkit-scrollbar': {
            height:  '6px',
        },
        '&::-webkit-scrollbar-track': {
            // boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            // webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgb(0,0,0,0.5)',
            WebkitBackgroundClip: 'content-box',
            border: '2px solid transparent',
            borderRadius: '10px',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,.8)'
            }
        }
      },
      filters: {
        //   marginLeft: 20,
        //   backgound: 'inherit'
      },
      gridButtonContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: '30px',
        marginRight: 20,
        marginTop: 30,
       
      }

}));

const Shop = ({products, getProducts, loading, shoppingcart}) => {

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const isBig = useMediaQuery(theme => theme.breakpoints.up('md'));

    const classes = useStyles();

    const [productList, setProductList] = React.useState(stub)

    const [grid, setGrid] = React.useState(4)
    const [checked, setChecked] = React.useState(null)

    const twobyRef = React.createRef(); 
    const threebyRef = React.createRef(); 
    const fourbyRef = React.createRef(); 

    const fetchMoreListItems = () => {
        setTimeout(async() => {
            try{
                 await getProducts()
            }catch(error){
                console.log(error)
            }
            //setProductList(prevState => ([...prevState, ...newData]));
          setIsFetching(false);
        }, 2000);
      }

    const changeGrid =(val) =>{
        setGrid(val);
    }

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    const handleChecked = (event) => {
        event.preventDefault();
        setChecked(event.target.checked)
    }

    React.useEffect(() => {

        const fetchData = async () => {
            try{
                await getProducts()
            }catch(error){
                console.log(error)
            }
        }

        fetchData()

    }, [])

    
    return (
        <Box  className={classes.root}>
            <Box className={classes.topsection} component="div">
                <Typography variant="h5"> All Products</Typography>
            </Box>
            <Divider/>
            <Box>
                {isSmall && (  
                    <Grid container className={classes.filters} spacing={3}>
                        <Grid item xs={12}>
                            <Box component='div' className={classes.gridButtonContainer}>
                                <IconButton onClick={(e) => {changeGrid(6)}}  size="small">
                                <img width='20px' height='20px' alt='2x2' src={twoby}/>
                                </IconButton>
                                <IconButton onClick={(e) => {changeGrid(4)}} size="small">
                                    <img width='20px' height='20px'alt='3x3' src={threeby}/>
                                </IconButton>
                            </Box>
                            <Grid container style={{ display:'flex', alignItems: 'center', marginBottom: '10px'}}  spacing={2}>
                                {products.map((stu, i) => 
                                    <Grid item key={i} xs={grid}>
                                        <ShopCard 
                                            idx={stu.idx}
                                            className={classes.paper} 
                                            variant="rounded" 
                                            title={stu.name} 
                                            description={stu.benefits.split(/\<.*?\>/g)} 
                                            price={approximatePrice(stu.price)} 
                                            image={ stu.base64 }/>         
                                    </Grid>
                                )}
                                {isFetching && 
                                    <Grid item xs={12}>
                                        <Spinner/>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                {isBig && (
                    <Grid container className={classes.filters} spacing={3}>
                        <Grid item xs={3}>
                            <Filters/>
                        </Grid>
                        <Grid item xs={9}>
                            <Box component='div' className={classes.gridButtonContainer}>
                                <IconButton onClick={(e) => {changeGrid(6)}}  size="small">
                                <img width='20px' height='20px' alt='2x2' src={twoby}/>
                                </IconButton>
                                <IconButton onClick={(e) => {changeGrid(4)}} size="small">
                                    <img width='20px' height='20px' alt='3x3' src={threeby}/>
                                </IconButton>
                                <IconButton onClick={(e) => {changeGrid(3)}} size="small">
                                    <img width='20px' height='20px' alt='4x4' src={fourby}/>
                                </IconButton>
                            </Box>
                            <Grid container style={{ display:'flex', alignItems: 'center', marginBottom: '10px'}}  spacing={2}>

                               { loading === true ? (
                                    <Spinner/>
                                ) : (
                                    products.length === 0 ? ( <div style={{ textAlign: 'center'}}> Product Not Found</div>)  :
                                    products.map((stu, i) => 
                                        (<Grid item key={i} xs={grid}>
                                            <ShopCard 
                                                idx={stu.idx}
                                                className={classes.paper} 
                                                variant="rounded" 
                                                title={stu.name} 
                                                description={stu.benefits.split(/\<.*?\>/g)} 
                                                price={approximatePrice(stu.price)} 
                                                image={ stu.base64 }/>         
                                        </Grid>)
                                ))}
                                {isFetching && 
                                    <Grid item xs={12}>
                                        <Spinner/>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    )
}

Shop.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    getProducts: PropTypes.func,
    loading: PropTypes.bool,
    shoppingcart: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
    products: state.homeActions.products,
    loading: state.homeActions.loading,
    shoppingcart: state.shoppingcart
})

export default connect(mapStateToProps, {getProducts})(Shop);