const userModel = require('../models/userModel')
const UserDto = require('../dtos/userDto')
const tokenService = require('../Service/tokenService')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

class userService {
    async registration(email, password) {
        const candidate = await userModel.findOne({email})
        if(candidate) {
            throw new Error('Registration failed')
        }
        const hashPassword = await bcrypt.hash(password,3 )
        const activationLink = uuid.v4()
        const user = await userModel.create({

            email,
            password:hashPassword,
            activationLink

        })
        const userDto = new UserDto(user)
        const tokens =  tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}




    }
    async login(email, password) {
        const user = await userModel.findOne({email})
        if(!user) {
            throw new Error('Login failed')
        }
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword) {
            throw new Error('Pass not valid')
        }
        const userDto = new UserDto(user)
        const tokens =  tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}




    }
    async logout(refreshToken) {

        const userData = await tokenService.removeToken(refreshToken)
        return userData

    }
    async refresh(refreshToken) {

        if(!refreshToken) {
    throw new Error('Refresh token not sushestvuet')
        }
            const userData =  tokenService.validRefreshToken(refreshToken)
            const tokenFromDb = await tokenService.getTokenFromDb(refreshToken) 
            if( !userData || !tokenFromDb) {
    throw new Error(2)
            }
            const user = await userModel.findById(userData.id)
            const userDto = new UserDto(user)
            const tokens =  tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
    



    }
    async getUsers() {
        const users = await userModel.find()
        return users
    }





}
module.exports = new userService();