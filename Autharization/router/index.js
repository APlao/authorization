const Router = require('express').Router
const router = new Router()
const {body} = require('express-validator')
const userController = require('../controllers/userControllers')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration',
body('email').isEmail(),
body('password').isLength({min:1, max:32}),
userController.registration)

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.users)




module.exports = router