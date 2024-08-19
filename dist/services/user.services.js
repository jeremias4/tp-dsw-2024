import { UserModel } from "../models/user.db";
import { User } from "../models/user.entity";
export const UserService = {
    getAll: async () => {
        return await UserModel.find();
    },
    getById: async (id) => {
        return await UserModel.findById(id);
    },
    addUser: async (input) => {
        return await UserModel.insertMany(new User(input.id, input.name));
    },
    findId: async (id) => {
        return await UserModel.findById(id);
    },
    updateUser: async (input, callback) => {
        const data = UserModel.replaceOne(input.params.id, input.body.sanitizedInput);
        if (!data) {
            callback();
        }
        else {
            return data;
        }
    },
    updUser: async (input) => {
        const data = UserModel.replaceOne({ id: input.params.id }, input.params.body, { upsert: true });
    },
    deleteUser: async (input) => {
        const data = UserModel.deleteOne(input);
    }
};
//# sourceMappingURL=user.services.js.map