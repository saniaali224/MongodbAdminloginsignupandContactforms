const Admins = require("../../models/admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../../config/config.json')

let mongoose = require('mongoose');
const AdminController = {

    Signup: async (req, res) => {
        const response = {};
        try {

            Admins.find({ email: req.body.email }).exec()
                .then(async admin => {
                    if (admin.length >= 1) {
                        response.statusCode = 409;
                        response.body = JSON.stringify({
                            message: 'Already exists',

                        });
                        await res.status(response.statusCode).send(response.body);
                    } else {
                        let payload = {
                            Firstname: req.body.Firstname,
                            Lastname: req.body.Lastname,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10)
                        };
                        console.log(payload)
                        Admins.create(payload, async (err, data) => {
                            if (data) {
                                const token = jwt.sign({
                                    email: data.email,
                                    id: data._id
                                }, config.passphrase.Key, { expiresIn: '1y' });
                                response.statusCode = 200;
                                response.body = JSON.stringify({
                                    message: 'Auth successful',
                                    data: data,
                                    token: token
                                });
                                await res.status(response.statusCode).send(response.body);
                            } else {
                                response.statusCode = 500;
                                console.log(err)
                                response.body = JSON.stringify({ err });
                                res.status(response.statusCode).send(response.body);
                            }

                        })
                    }
                }).catch(err => {
                    response.statusCode = 500;
                    console.log(err)
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                })

        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({ err });
            console.log(err)
            res.status(response.statusCode).send(response.body);
        }
    },
    login: async (req, res) => {
        const response = {};
        try {

            Admins.find({ email: req.body.email }).exec()
                .then(async admin => {
                    if (admin.length < 1) {
                        response.statusCode = 400;
                        response.body = JSON.stringify({
                            message: 'Admin doesnot exists',

                        });
                        await res.status(response.statusCode).send(response.body);
                    } else {
                        let payload = {
                            email: req.body.email,
                            password: req.body.password
                        };
                        console.log(payload)
                        bcrypt.compare(payload.password, admin[0].password, function async(err, result) {
                            if (err) {
                                response.statusCode = 500;
                                console.log(err)
                                response.body = JSON.stringify({ err });
                               res.status(response.statusCode).send(response.body);
                            } 
                            if(result) {
                                
                                const token = jwt.sign({
                                    email: admin[0].email,
                                    id: admin[0]._id
                                }, config.passphrase.Key, { expiresIn: '1y' });
                                response.statusCode = 200;
                                response.body = JSON.stringify({
                                    message: 'Admin logged in',
                                    token: token,
                                    data:result
                                });
                                res.status(response.statusCode).send(response.body);
                            }
                        })

                    }
                }).catch(err => {
                    response.statusCode = 500;
                    console.log(err)
                    response.body = JSON.stringify({ err });
                    res.status(response.statusCode).send(response.body);
                })

        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({ err });
            console.log(err)
            res.status(response.statusCode).send(response.body);
        }
    },
};
module.exports = AdminController;