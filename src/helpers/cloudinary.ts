import cloudinary from 'cloudinary'
const cloud = cloudinary.v2
const cloudinaryConfig = cloud.config({
    cloud_name: 'dcyohew0h',
    api_key: '161487929687464',
    api_secret: 'Qlx_eILvPrRABcC6AywbhsSuNe0'
})

export { cloudinaryConfig, cloud }

export const cloudFunc = async (data: any): Promise<{ secure_url: string, cloudinary_id: string }> => {
    cloudinary.v2.config({
        cloud_name: 'dcyohew0h',
        api_key: '161487929687464',
        api_secret: 'Qlx_eILvPrRABcC6AywbhsSuNe0'
    })
    let payload = {
        secure_url: "",
        cloudinary_id: ""
    }
    const upload = await cloudinary.v2.uploader.upload(data, { folder: 'mangomase' })
        .then(result => {
            console.log('success upload')
            payload.secure_url = result.secure_url
            payload.cloudinary_id = result.public_id.replace('mangomase/', "")
        }).catch(err => {
            console.log(err)
        })

    return payload
}