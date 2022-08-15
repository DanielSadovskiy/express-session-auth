const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { signinHandler, welcomeHandler, refreshHandler, logoutHandler } = require('./handlers')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Swagger Documentation',
            version: '1.0.0'
        }
    },
    apis: ['index.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

/**
     * @swagger
     * /signin:
     *   post: 
     *      descriptions: Sign In API   
     *      responses: 
     *          200:
     *              description: Success
     */
app.post('/signin', signinHandler)
app.get('/welcome', welcomeHandler)
app.post('/refresh', refreshHandler)
app.get('/logout', logoutHandler)

app.listen(8080, () => {console.log("listening on port 8080")})