const tokenModel = require('../models/tokenModel')
const jwt = require('jsonwebtoken')


class tokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30s'})
        const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET, {expiresIn:'50s'})
        return {accessToken, refreshToken}
    }

    validRefreshToken(token) {
        try {
                const tokenData = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
                return tokenData
        } catch (error) {
            return null
        }
    }
    validAccessToken(token) {
        try {
                const userData = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
                return userData
        } catch (error) {
            return null
        }
    }


    async saveToken(userId,refreshToken) {
        const tokenData = await tokenModel.findOne({user:userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user:userId,refreshToken})
        return token
    }
    async getTokenFromDb(refreshToken) {

        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData


    }
    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne(refreshToken)
        return tokenData 
    }
}
module.exports = new tokenService()