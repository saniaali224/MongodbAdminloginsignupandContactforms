'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ContactFormSchema = new Schema({
   Firstname: {
        type: String,
        required:true
        
    },
    Lastname: {
        type: String,
        required:true
        
    },
    subject: {
        type: String,
        required:true
    },
    email: {
        type: String,
        
    },
    query: {
        type: String,
        required:true
    }},
    {
        timestamps: true
    }
);


let  ContactForm = mongoose.model('ContactForm', ContactFormSchema);

module.exports =  ContactForm;