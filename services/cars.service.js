const Cars = require('../dataBase/Cars')

module.exports = {

    findAll: async (filter = {}) => {
        return Cars.find(filter)
    },
    findById: async (id) => {
        return Cars.findById(id)
    },
    create: async (data) => {
        return Cars.create(data)
    },
    updateOne: async (id, data)=>{
        return Cars.findByIdAndUpdate(id,data, {new:true})
    },
    deleteOne: async (id)=>{
        return Cars.deleteOne({_id: id})
    }
}