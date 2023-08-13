const userModel = require('../models/userModel')
const userService = require('../Service/userServise')


class userController {

    async registration(req,res,next) {
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
            
        }
    }
        async login(req,res,next) {
            try {
                const {email, password} = req.body
                const userData = await userService.login(email, password)
                res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
                return res.json(userData)
            } catch (error) {
                next(error)
                
            }
        }
            async logout(req,res,next) {
                try {
                    const {refreshToken} = req.body
                    const userData = await userService.logout(refreshToken)
                    res.clearCookie('refreshToken',)
                    return res.json(userData)
                } catch (error) {
                    next(error)
                    
                }
            }
                async refresh(req,res,next) {
                    try {
                        const {refreshToken} = req.cookies
                        const userData = await userService.refresh(refreshToken)
                        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
                        return res.json(userData)
                    } catch (error) {
                        next(error)
                        
                    }
                        
                    }
                    async users(req,res,next) {
                            try {
                                    const users = await userService.getUsers()
                                    return res.json(users)
                            } catch (error) {
                                next(error)
                            }
                    }
        



    }



module.exports = new userController();