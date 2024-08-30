import { UserModel } from "../models/user.db.js"
import { User } from "../models/user.entity.js";

export const UserService = {
    getAll: async ()=>{
        return await UserModel.find()},

    getById: async (id: any)=> {
        return await UserModel.findById(id)},

    addUser: async (input: any) => {
        return await UserModel.insertMany(new User(
            input.id,
            input.name,
            input.email,
            input.gender,
            input.city,
            input.password,
            input.typeUser
            ));},

    findId: async (id: any)=> {
        return await UserModel.findById(id)},

    updateUser: async(input: any, callback: Function) => {
            const data = UserModel.replaceOne(input.params.id as String, input.body.sanitizedInput)
            if (!data){callback();
            }else {return data }},

    updUser: async(input: any ) => {
        const data = UserModel.replaceOne( {id: input.params.id}, input.params.body as String, { upsert: true });
    },

    deleteUser: async(input: any) => {
        const data = UserModel.deleteOne(input);
    }}
