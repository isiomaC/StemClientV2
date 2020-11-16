import React from 'react'

import PropTypes from 'prop-types';
//rating
import Rating from '@material-ui/lab/Rating';

//ratingIcons
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

//Icons for Rating
const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };

//For Rating Feature
function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}
IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

const cRating = ({ rating}) => {
    return (
        <Rating disabled
            name="customized-icons"
            value={rating}
            getLabelText={value => customIcons[value].label}
            IconContainerComponent={IconContainer}
        />
    )
}

cRating.propTypes = {
  rating: PropTypes.number
}

export default cRating;