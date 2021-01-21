import React from 'react'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import approximatePrice from '../../../utils/approximatePrice'


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';

import { searchProducts,
        getProductByPrice,
        getHighestPrice, 
        getProducts, 
        getByCategory,
        getNewProducts } from '../../../redux/actions/homeActions'


const RedCheckbox = withStyles({
    root: {
      color: red[400],
    //   '&$checked': {
    //     color: red[300],
    //   },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        margin :'20px',
        width: '100%',
        display: 'flex',
        aligntContent : 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordionStyle: {
        background: 'inherit',
        // marginLeft: '20px',
        // width: '90%'
    },
    button:{
        width: '20%'
    }
}));


const valueLabelFormat = (value) => {
  const newValue = approximatePrice(value)
  return `€${newValue}`;
}

const Filters = (props) => {

    const classes = useStyles();

    const [searchTerm, setSearchTerm] = React.useState("")
    const [price, setPrice] = React.useState(1)

    const { max, searchProducts, getProductByPrice, getHighestPrice, getProducts, getByCategory, getNewProducts } = props

    const handleTextChange = async (e) => {
        setSearchTerm( e.target.value )
        await searchProducts(searchTerm)
    }

    const handlePriceChange = async (e) => {
        setPrice(e.target.ariaValueNow)


        // console.log(e.target.ariaValueNow)
        await getProductByPrice(price)
    }

    const handleChange = async (event) => {
        let checked = event.target.checked
        let name = event.target.name

        switch(name){
            case "checkedAll": 
                if (checked === true){
                    await getProducts()
                }
                break
            case "checkedNew": 
                if (checked=== true){
                    await getNewProducts()
                }else{
                    await getProducts()
                }
                break
            case "checkedHair": 
                if (checked === true){
                    await getByCategory("Hair")
                }else{
                    await getProducts()
                }
                break
            case "checkedAcc": 
                if (checked === true){
                    await getByCategory("Accessories")
                }else{
                    await getProducts()
                }
                break
            case "checkedBody":
                if (checked === true){
                    await getByCategory("Body")
                }else{
                    await getProducts()
                }
                break
            default: 
                await getProducts()
                break 
        }
    }

    React.useEffect(()=>{

        const fetchHighest = async () => {
            await getHighestPrice()
        }

        fetchHighest()
    }, [getHighestPrice])
    
    return (
        <Box component='div' className={classes.root}>
            <Box>
            <Accordion  elevation={0} className={classes.accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography className={classes.heading}>All Products</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ width: 'inherit'}}>
                    <FormGroup style={{width: '100%'}}>
                        <FormControlLabel 
                            control={<RedCheckbox  onChange={e => handleChange(e)} name="checkedAll" />}
                            label="Shop All"
                        />
                        <FormControlLabel
                            control={<RedCheckbox  onChange={e => handleChange(e)} name="checkedNew" />}
                            label="New"
                        />
                        <FormControlLabel
                            control={<RedCheckbox  onChange={e => handleChange(e)} name="checkedHair" />}
                            label="Hair"
                        />
                        <FormControlLabel
                            control={<RedCheckbox  onChange={e => handleChange(e)} name="checkedBody" />}
                            label="Body"
                        />
                        <FormControlLabel
                            control={<RedCheckbox  onChange={e => handleChange(e)} name="checkedAcc" />}
                            label="Accessories"
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={0} className={classes.accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header">
                        <Typography className={classes.heading}>Price</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ textAlign: 'left', display: 'block'}}>
                    {/* <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                    </Typography> */}
                    
                    <Slider 
                         defaultValue={parseInt(price, 10)}
                         getAriaValueText={valueLabelFormat}
                         aria-labelledby="non-linear-slider"
                         aria-label="custom thumb label"
                         valueLabelDisplay="auto"
                         valueLabelFormat={valueLabelFormat}
                         step={500}
                         min={100}
                         onChange={handlePriceChange }
                         style={{ color: 'rgba(190,0,0,0.7)'}}
                         max={parseInt(max, 10) + 2000}/>

                </AccordionDetails>
            </Accordion>
            <Accordion elevation={0} className={classes.accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header">
                    <Typography className={classes.heading}>Search</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form style={{display: 'flex', width: '100%'}}>
                        <TextField id="outlined-basic" 
                                label="Enter Search Text" 
                                variant="standard" 
                                onChange={(e) => handleTextChange(e)}
                                value={searchTerm}
                                />
                        {/* <IconButton size='medium' style={{marginLeft: 20, background: red[100]}} aria-label="search products" component="span">
                            {/* <SearchIcon /> */}
                            {/* {SEARCH ICON WAS HERE} */}
                        {/* </IconButton> */} 
                    </form>
                </AccordionDetails>
            </Accordion>
            </Box>
        </Box>
    )
}

Filters.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    searchProducts: PropTypes.func,
    getProductByPrice: PropTypes.func,
    getHighestPrice: PropTypes.func,
    getproducts: PropTypes.func,
    getByCategory: PropTypes.func,
    getNewProducts: PropTypes.func,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    products: state.homeActions.products,
    loading: state.homeActions.loading,
    max: state.homeActions.max
})

export default connect(mapStateToProps, { searchProducts, getProductByPrice, getHighestPrice, getProducts, getByCategory, getNewProducts })(Filters);