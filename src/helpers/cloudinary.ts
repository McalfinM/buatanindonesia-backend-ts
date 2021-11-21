import cloudinary from 'cloudinary'

export const cloudSellerRequest = async (data: any): Promise<{ secure_url: string, cloudinary_id: string }> => {
    cloudinary.v2.config({
        cloud_name: 'dti2eqvdi',
        api_key: '933977989797497',
        api_secret: '5snrdrJd9Fd3A4HuH9IKQfF9FlM'
    })
    let payload = {
        secure_url: "",
        cloudinary_id: ""
    }
    const upload = await cloudinary.v2.uploader.upload(data, { folder: 'seller_request' })
        .then(result => {
            console.log('success upload seller request')
            payload.secure_url = result.secure_url
            payload.cloudinary_id = result.public_id.replace('seller_request/', "")
        }).catch(err => {
            console.log(err)
        })

    return payload
}