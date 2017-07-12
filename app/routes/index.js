var express = require('express' );
var router = express.Router(); 

var path = require( 'path' ); 

router.get( '/', function( req, res ) {
    res.render( 'index' ); 
});

router.get( '/mca', function( req, res ) {
    res.render( 'mca' ); 
});

router.get( '/learnmore', function( req, res ) {
    res.render( 'learnmore' ); 
});

module.exports = router; 