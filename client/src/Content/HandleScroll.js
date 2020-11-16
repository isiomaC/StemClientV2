import React from 'react'

//Modules to hide Nav Bar on Scroll
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide'

const HandleScroll = (props) => {
    const { children } = props
    const trigger = useScrollTrigger()

    return (
        <Slide direction='down' appear={true} in={!trigger} >
            {children}
        </Slide>
    )
}

export default HandleScroll