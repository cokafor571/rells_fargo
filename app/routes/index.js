var express = require('express' );
var router = express.Router(); 

var path = require( 'path' ); 

router.get( '/', function( req, res ) {
    res.render( 'index' ); 
});

router.get( '/video', function( req, res ) {
    res.render( 'video' ); 
});

module.exports = router; 