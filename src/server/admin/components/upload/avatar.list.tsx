import React from 'react'
import { Box, BasePropertyProps } from 'admin-bro'

const Edit: React.FC<BasePropertyProps> = (props) => {
    const avatarUrl = props.record.params['avatarUrl'];
    return (<Box>{avatarUrl ? (<img src={avatarUrl} style={{borderRadius: '100%', width: 30}} />) : ''}</Box>)
}

export default Edit