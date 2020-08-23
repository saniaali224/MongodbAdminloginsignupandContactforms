const cors = require('cors');
const bodyParser = require('body-parser');


// Import Route Controllers
const Contactform = require('./Controllers/form');
const admin = require('./Controllers/admin');




// Setup Route Bindings
exports = module.exports = function (app) {

    // middlewares
    // Configure app for bodyParser()
    // lets us grab data from the body of POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.get("/", (req, res) => {
        res.end("ok")
    });

    app.get('/api/getallcontactform', Contactform.getforms);
    app.post('/api/contactform', Contactform.create);
    app.delete('/api/deleteform/:id', Contactform.deleteform);
    app.put('/api/updateform/:id', Contactform.update);
    app.get('/api/getoneform/:id', Contactform.single);
    app.post('/api/subscribe', Contactform.Subscribe);
    app.post('/api/adminsignup', admin.Signup);
    app.post('/api/adminslogin', admin.login);
};