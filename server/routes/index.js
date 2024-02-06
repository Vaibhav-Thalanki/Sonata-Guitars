const express = require('express')
const router = express.Router()
const authRoute = require("./auth.route")
const usersRoute = require("./user.route")
const brandsRoute = require('./brand.route')
const productRoute = require('./product.route')
const siteRoute = require('./site.route')
const transactionRoute = require('./transaction.route')

const routesIndex =[
    {
        path: '/auth',
        route: authRoute
    }
    ,
    {
        path: '/users',
        route: usersRoute
    },
    {
        path: '/brands',
        route: brandsRoute
    },
    {
        path: '/products',
        route: productRoute
    }
    ,
    {
        path: '/site',
        route: siteRoute
    },
    {
        path: '/transaction',
        route: transactionRoute
    }
]

routesIndex.forEach((route)=>{
    router.use(route.path, route.route)
})









module.exports = router;