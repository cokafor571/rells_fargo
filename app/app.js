var express = require( 'express' ),
    app = express(), 
    compression = require( 'compression' ), 
    helmet = require('helmet'), 
    nodemailer = require( 'nodemailer' ),
    bodyParser = require( 'body-parser' ),
    expressValidator = require( 'express-validator' ); 


app.set( 'view engine', 'ejs' );
app.set( 'views', 'app/views' ); 

app.use(compression() );
app.use(helmet() );
app.use(express.static(__dirname + '/public' ) ); 
app.use(require( './routes/index' ) ); 
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }) );
app.use(expressValidator() );

//Form email 
app.post( '/', function( req, res ) {

    //validation logic
    req.checkBody('name', 'Invalid name').isAlpha();
    req.checkBody('name', 'Name required').notEmpty();
    req.checkBody('email', 'Email required').notEmpty();

    req.sanitizeBody('name').escape();
    req.sanitize('name').trim();
    req.sanitizeBody('email').escape();
    req.sanitize('email').trim();

    // run validation logic
    var errors = req.validationErrors();

    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render( 'index', { title: 'Please enter valid data', errors: errors} );
    return;
    } 

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        port: 587,
        secure: true,
        service: 'gmail',
        auth: {
            user: 'kelcherpromotions@gmail.com',
            pass: 'kelCHer2016'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: 'kelcherpromotions@gmail.com',
        subject: 'Website MCA form',
        text: 'This email is from ' +   req.body.name + ' <' + req.body.email + '>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            return console.log(error);
        }
        res.redirect('/mca');
    });
});

module.exports = app;