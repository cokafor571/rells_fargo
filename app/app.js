var express = require( 'express' );
var app = express(); 
var reload = require( 'reload' ); 
var nodemailer = require( 'nodemailer' );
var bodyParser = require( 'body-parser' );
var expressValidator = require( 'express-validator' ); 


app.set( 'port', process.env.PORT || 3000 ); 
app.set( 'view engine', 'ejs' ); 
app.set( 'views', 'app/views' ); 

app.use(express.static(__dirname + '/public' ) ); 
app.use(require( './routes/index' ) ); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

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
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/video');
    });
});

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

reload( server, app );

