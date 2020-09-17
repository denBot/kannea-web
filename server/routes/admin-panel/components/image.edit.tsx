import React from 'react'
import { Label, Box, DropZone, BasePropertyProps, DropZoneProps, DropZoneItem } from 'admin-bro'

const Edit: React.FC<BasePropertyProps> = (props) => {
    const { property, onChange, record } = props

    const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
        onChange(property.name, files[0])
    }

    const srcImg = record.params['avatarLocation']

    const uploadedPhoto = record.params.profilePhotoLocation
    const photoToUpload = record.params[property.name]

    return (
        <Box marginBottom="xxl">
            <div style={{ display: 'flex' }}>
                <div style={{ width: '20%' }}>
                    {srcImg ? (
                        <img src={`/${srcImg}`} width="200px" />
                    ) : ''}
                </div>

                <div style={{ width: '80%' }}>
                    <Label>{property.label}</Label>
                    <DropZone onChange={handleDropZoneChange} />
                    {uploadedPhoto && !photoToUpload && (
                        <DropZoneItem src={uploadedPhoto} />
                    )}
                </div>
            </div>
        </Box>
    )
}

export default Edit