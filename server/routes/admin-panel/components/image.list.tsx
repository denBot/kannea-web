import React from 'react'
import { Box, BasePropertyProps } from 'admin-bro'

const Edit: React.FC<BasePropertyProps> = (props) => {
    const { record } = props

    const srcImg = record.params['avatarLocation']
    return (
        <Box>
            {srcImg ? (
                <img src={`/${srcImg}`} width="70px" />
            ) : ''}
        </Box>
    )
}

export default Edit