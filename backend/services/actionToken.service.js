const ActionToken = require('../dataBase/ActionToken');

module.exports = {
    create: async (_user_id,actionToken,typeToken)=>{
        return ActionToken.create({_user_id,actionToken,typeToken})
    },
    findOneAndPopulate: async (find={})=>{
        return ActionToken.findOne(find).populate('_user_id')
    },

    delete: async (data={})=>{
        return ActionToken.deleteOne(data);
    }

}