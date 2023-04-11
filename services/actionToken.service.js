const ActionToken = require('../dataBase/ActionToken');

module.exports = {
    create: async (_user_id, actionToken, tokenType) => {
        return ActionToken.create({_user_id, actionToken, tokenType})
    },
    findOneAndPopulate: async (actionToken) => {
        return ActionToken.findOne({actionToken}).populate('_user_id')
    },
    deleteActionToken: async (actionToken)=>{
        return ActionToken.deleteOne({actionToken})
    },
}