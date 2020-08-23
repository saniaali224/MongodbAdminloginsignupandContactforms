const ContactForm = require("../../models/ContactForm");

const subscribe = require("../../models/subscribe");
let mongoose = require('mongoose');
const formController = {

    create: async (req, res) => {
        const response = {};
        try {
            let payload = {
                Firstname: req.body.Firstname,
                Lastname: req.body.Lastname,
                subject: req.body.subject,
                email: req.body.email,
                query: req.body.query
            };
            console.log(payload)
            ContactForm.create(payload, async (err, data) => {
                if (data) {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'Ok',
                        data: data
                    });
                    await res.status(response.statusCode).send(response.body);
                } else {
                    response.statusCode = 500;
                    console.log(err)
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                }

            })
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({ err });
            console.log(err)
            res.status(response.statusCode).send(response.body);
        }
    },
    Subscribe:async (req, res) => {
        const response = {};
        try {
            let payload = {
                email: req.body.email,
                
            };
            console.log(payload)
            subscribe.create(payload, async (err, data) => {
                if (data) {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'Ok',
                        data: data
                    });
                    await res.status(response.statusCode).send(response.body);
                } else {
                    response.statusCode = 500;
                    console.log(err)
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                }

            })
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({ err });
            console.log(err)
            res.status(response.statusCode).send(response.body);
        }
    },
    getforms:async (req, res) => {
        const response = {};
        try {
            ContactForm.find(async (err, data) => {
                if (err) {
                    response.statusCode = 500;
                    response.body = JSON.stringify({err});
                    res.status(response.statusCode).send(response.body);
                } else {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'Ok',
                        data: data
                    });
                }
                await res.status(response.statusCode).send(response.body);
            })
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    },
    single: async (req, res)=>{
        const response = {};
        try {
            let {id} = req.params;
            ContactForm.findById({_id:id},async (err, data) => {
                if (err) {
                    response.statusCode = 500;
                    response.body = JSON.stringify({err});
                    res.status(response.statusCode).send(response.body);
                } else {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'Ok',
                        data: data
                    });
                }
                await res.status(response.statusCode).send(response.body);
            })
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    },
    deleteform: async (req, res)=>{
        const response = {};
        try {
            let id = req.params.id;
            ContactForm.findOneAndDelete({_id:id},async (err) => {
                if (err) {
                    response.statusCode = 500;
                    response.body = JSON.stringify({err:"Id is invalid"});
                    res.status(response.statusCode).send(response.body);
                } else {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'given userId deleted',

                    });
                }
                await res.status(response.statusCode).send(response.body);
            })
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    },
    update: async (req, res)=>{
        const response = {};
        try {
            let {Firstname,Lastname,email } = req.body;
            let payload = {
                Firstname: Firstname,
                Lastname:Lastname,
                email: email,
                
            };
            let {id} = req.params;
            ContactForm.findByIdAndUpdate({_id:id}, payload,async (err) => {
                if (err) {
                    response.statusCode = 500;
                    response.body = JSON.stringify({"err":err});
                    res.status(response.statusCode).send(response.body);
                } else {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'Ok',
                    });
                }
                await res.status(response.statusCode).send(response.body);
            })
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            console.log(err)
            res.status(response.statusCode).send(response.body);
        }
    },
};
module.exports = formController;