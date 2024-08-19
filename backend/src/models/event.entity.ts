export class Event{
    constructor(  
        public id: Number,
        public name: String,
        public date: Date,
        public owner: Number, //ID DEL USUARIO
        public city: String,
        public adress: String,
        public size: Number,
      
    ) {}
  }
  