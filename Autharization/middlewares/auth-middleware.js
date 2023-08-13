const tokenService = require("../Service/tokenService")
const ApiError = require('../exceptions/api-error')


module.exports = function(req,res,next){

    try {
        const autharizationHeader = req.headers.autharization
        if(!autharizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = autharizationHeader.split(' ')[1]
if(!accessToken) {
    return next(ApiError.UnauthorizedError());
}

    const userData = tokenService.validAccessToken(accessToken)
    if(!userData) {
        return next(ApiError.UnauthorizedError());
    }
    req.user = userData
    next()


    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }


}