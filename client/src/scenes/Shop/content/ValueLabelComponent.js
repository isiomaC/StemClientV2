import Tooltip from '@material-ui/core/Tooltip'
import React from 'react'

import approximatePrice from '../../../utils/approximatePrice'
import PropTypes from 'prop-types'

const ValueLabelComponent = (props) => {
    const { children, open, value } = props;
  
    React.useState(() => {

        // console.log(children.props)
        // console.log(approximatePrice(parseInt(children.props.ariaValueNow)))
    }, [])

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  export default ValueLabelComponent