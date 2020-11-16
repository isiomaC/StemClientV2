import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'

import FeatureProducts from './sections/FeaturedProducts'
import FeaturedReviews from './sections/FeaturedReviews'
import Landing from './sections/Landing'
import Test from './sections/Test'

import { getFeaturedProducts, getReviews, getExtras } from '../../redux/actions/homeActions'
import Spinner from '../../Components/layout/Spinner';


const Home = ({ getFeaturedProducts,products, getReviews,reviews, getExtras, extras, loading, error }) => {

    React.useEffect(() => {

        const fetchData = async () => {
            try {
                await getReviews();
    
                await getFeaturedProducts();
    
                await getExtras()

                //history.push('/dashboard')
                console.log(reviews)
                console.log(extras)
          
              }catch(e){
                console.log(e.message)
              }
        }
        fetchData()
       
        window.scrollTo(0,0)
    }, [ 0 ]);


    //stemclient (pid 12787) 
    return loading === true ? (
        <Box style={{margin: '50px' }}>
            <Spinner/>
        </Box>
        ):(
            <div style={{display: "block"}}>
                {/* <NavBar/> */}
                {/* <Test extras={extras}/>  */}

                <Landing extras={extras} loading={loading} />  
                <FeatureProducts products={products} variant='rounded'/>
                <FeaturedReviews reviews={reviews} loading={loading}/>
            </div>
        )
}

Home.propTypes = {
    getFeaturedProducts: PropTypes.func,
    products: PropTypes.arrayOf(PropTypes.object),
    getReviews: PropTypes.func,
    reviews: PropTypes.arrayOf(PropTypes.object),
    getExtras: PropTypes.func,
    extras: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.any
}

const mapStateToProps = state => ({
    products: state.homeActions.featured_products,
    reviews: state.homeActions.reviews,
    loading: state.homeActions.loading,
    extras: state.homeActions.extras,
    error: state.homeActions.error
})

export default connect(mapStateToProps, { getFeaturedProducts, getReviews, getExtras })(Home);
