const dataUsers = require("../dataBase/data");
const ApiError = require("../errors/ApiError");

module.exports = {
    checkIsUserExist: (req, res, next)=>{
        try {
            const {userId} = req.params;
            const user = dataUsers[userId];
            if (!user){
                throw new ApiError('User not found', 404);
            }

            req.user = user;
            next()

        }catch (e) {
            next(e)
        }
    }
}