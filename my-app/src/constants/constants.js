module.exports = {
    websiteName : 'E-commerce Platform',
    websiteProductImages : '/images/product_images/',
    websiteImages : '/images',
    websiteBrandLogo : '/images/brand-logo.jpeg',
    backendApiUrl : 'http://localhost:5000/',
    imagesHelper : 'uploads',
    productCategory : [
        {'typeName' : 'Electronics','typeValue' : 1}, 
        {'typeName' : 'Clothing','typeValue' : 2}
    ],
    
    productSubCategory : {
        1 : [
            {'subTypeName' : 'Television','subTypeValue' : 1},
            {'subTypeName' : 'Mobile Phone','subTypeValue' : 2},
            {'subTypeName' : 'Earphones','subTypeValue' : 3}
        ],
        2 : [
            {'subTypeName' : 'Shirt','subTypeValue' : 4},
            {'subTypeName' : 'Jeans','subTypeValue' : 5}
        ]
    },

    productSubCategories: {
        'tv' : 1,
        'mobilePhone' : 2,
        1 : 'Televisions',
        2 : 'Mobile Phones'
    }
}