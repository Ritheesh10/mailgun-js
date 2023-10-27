const Router = require('router')
const router = Router();
const {
    fetchdata,
    insertdata,
    updatedata,
    sendEmail
} = require('../controllers/controller')

const { generatetoken, validatetoken } =require('../middleware/auth')

// router.get('/get-template/:id?',validatetoken,fetchdata)

// router.post('/create-template',validatetoken,insertdata)

// router.patch('/update-template/:id',validatetoken, updatedata)

// router.post('/generateToken', generatetoken)

router.post('/send-email-template',sendEmail)


module.exports = router;