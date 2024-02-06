import * as Yup from 'yup'
export const formValues = {
    model:'',
    brand:'',
    frets:'',
    woodtype:'',
    description:'',
    price:'',
    available:'',
    shipping:false,
    images: []
}

export const getValuesToEdit = (product) =>{
    return {
        model:product.model,
    brand:product.brand._id,
    frets:product.frets,
    woodtype:product.woodtype,
    description:product.description,
    price:product.price,
    available:product.available,
    shipping:product.shipping,
    images: product.images
    }
}

export const validation = () =>{
    return Yup.object({
        
            model:Yup.string().required('This is required'),
            brand:Yup.string().required('This is required'),
            frets:Yup.number().required('This is required').oneOf([20,21,22,24],"Only 20,21,22 or 24"),
            woodtype:Yup.string().required('This is required'),
            description:Yup.string().required('This is required'),
            price:Yup.number().required('This is required').min(1,'Sorry minimum value is 1').max(5000,'Maximum price is 5000'),
            available:Yup.number().required('This is required'),
            shipping:Yup.boolean().required('Do we offer shipping'),
    })
}