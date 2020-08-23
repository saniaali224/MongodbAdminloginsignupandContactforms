'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subscribeSchema = new Schema({
        
    email: {
        type: String,
        
    }
},
    {
        timestamps: true
    }
);


let  subscribe = mongoose.model('subscribeSchema', subscribeSchema);

module.exports =  subscribe;