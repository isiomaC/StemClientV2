import React, { createRef, useCallback } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import FeatureProducts from './sections/FeaturedProducts'
import FeaturedReviews from './sections/FeaturedReviews'
import Landing from './sections/Landing'

import { getFeaturedProducts, getReviews, getExtras, GetAll } from '../../redux/actions/homeActions'
import Spinner from '../../Components/layout/Spinner';


const Home = ({ getFeaturedProducts,products, getReviews,reviews, GetAll, getExtras, extras, loading, error }) => {

    const elem = createRef()

    const getHomeData = useCallback( async () => {
        await Promise.all([ getExtras(), getFeaturedProducts(), getReviews()])
    }, [])

    React.useEffect(() => {
        // const fetchData = async () => {
        //     // await GetAll()
        //     await Promise.all([ getExtras(), getFeaturedProducts(), getReviews()])
        // }
        // fetchData()

        getHomeData()

        window.scrollTo(0,0)
    }, [  ]);

    //stemclient (pid 12787) 
    return loading === true ? (
        <div style={{ display: 'flex', alignItem: 'center', width: '100vw', height: '80vh'}}>
            <Spinner/>
        </div>
        ):(
            <div style={{display: "block"}}>
                {/* <NavBar/> */}
                {/* <Test extras={extras}/>  */}

                { extras && <Landing extras={extras} loading={loading} />  }
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
    extras: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    GetAll: PropTypes.func,
    error: PropTypes.any
}

const mapStateToProps = state => ({
    products: state.homeActions.featured_products,
    reviews: state.homeActions.reviews,
    loading: state.homeActions.loading,
    extras: state.homeActions.extras,
    error: state.homeActions.error
})

export default connect(mapStateToProps, { getFeaturedProducts, getReviews, getExtras, GetAll })(Home);
