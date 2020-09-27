import React from 'react'
import { Label, Box, DropZone, BasePropertyProps, DropZoneProps, DropZoneItem } from 'admin-bro'

const validationOptions = {
    mimeTypes: [
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'image/gif',
        'image/webp'
    ],
}

const Edit: React.FC<BasePropertyProps> = (props) => {
    const { property, onChange, record } = props
    const uploadedPhoto = record.params.profilePhotoLocation
    const photoToUpload = record.params[property.name]
    const handleDropZoneChange: DropZoneProps['onChange'] = (files) => { onChange(property.name, files[0]) }

    return (
        <Box marginBottom="xxl">
            <Label>Upload Avatar</Label>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '6%', minWidth: 100, maxHeight: 72, }}>
                    <img src={record.params['avatarUrl']} style={{ width: 94, borderRadius: 2 }} />
                </div>
                <div style={{ width: '94%' }}>
                    <DropZone onChange={handleDropZoneChange}
                        uploadLimitIn={'MB'}
                        multiple={false}
                        validate={validationOptions}
                    />
                    {uploadedPhoto && !photoToUpload && (
                        <DropZoneItem
                            src={uploadedPhoto}
                        />
                    )}
                </div>
            </div>
        </Box>
    )
}

export default Edit
