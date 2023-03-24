const Car = require('../dataBase/Car')

module.exports={
    findByParams: async (filter = {})=>{
        return Car.find(filter)
    },
    findOne:  async (filter = {})=>{
        return Car.findOne(filter)
    },
    create:  async (data)=>{
        return Car.create(data)
    },
    findByIdAndUpdate:  async (id,data)=>{
        return Car.findByIdAndUpdate(id,data,{new:true})
    },
    findByIdAndDelete: async (id)=>{
        return Car.findByIdAndDelete(id)
    },
}