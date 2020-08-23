'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AdminsSchema = new Schema({
   Firstname: {
        type: String,
        required:true
        
    },
    Lastname: {
        type: String,
        required:true
        
    },
    email: {
        type: String,
        
    },
   password: {
        type: String,
        required:true
    }},
    {
        timestamps: true
    }
);


let admins = mongoose.model('admins', AdminsSchema);

module.exports =  admins;