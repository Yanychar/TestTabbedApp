function Spot() {
	this.id = -1;

    this.setLocation = function( lat, lng ) {
        this.lat = lat;
        this.lng = lng;
    };

    this.setOwner = function( user ) {
        this.owner = user;
        
    };
    
    this.setName = function( name ) {
        this.name = name;
        
    };
    
    this.getSpotColor = function() {
        
        var spotColor = "#0000";
        
        if ( this.rating != undefined ) {
            if ( this.rating >= 3 ) {
                spotColor = "#a82bdd";
                console.log( "Rating >=3" );
            } else {
                spotColor = "#b5e61d";
                console.log( "Rating < 3" );
            }
        } else {
                console.log( "Rating  undefined" );
        }
        console.log( "   Color: " + spotColor);
        return spotColor;
    };
    
    this.getLatLng = function() {
            
        return new google.maps.LatLng( 
                this.pos.lat, 
                this.pos.lng );
    };

}

function getSpots( lat, lng, successFunc, failedFunc ) {
    
    var spLst = testGetSpots(lat, lng,
        successFunc, failedFunc
    );
    
    
    
    
}




