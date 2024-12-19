import { EventModel } from "../models/event.db.js"
import { Event } from "../models/event.entity.js";

export const EventService = {
    //03
    getAll: async ()=>{
        return await EventModel.find()},
    //04
    getById: async (id: any)=> {
        return await EventModel.findOne({id})},

    /*
        add: async (input: any) => {
        return await EventModel.insertMany(new Event(
            input.id,
            input.name,
            input.date,
            input.owner,
            input.city,
            input.adress,
            input.size
            ));},

    findId: async (id: any)=> {
        return await EventModel.findById(id)},

    update: async(input: any, callback: Function) => {
            const data = EventModel.replaceOne(input.params.id as String, input.body.sanitizedInput)
            if (!data){callback();
            }else {return data }},

    upd: async(input: any ) => {
        const data = EventModel.replaceOne( {id: input.params.id}, input.params.body as String, { upsert: true });
    },

    delete: async(input: any) => {
        const data = EventModel.deleteOne(input);
    }
        */
    }
