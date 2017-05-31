testLoc = { lat: 60.221971, lng: 24.906899 };

var mapManipulator = {
    myMap:      null,
    currLoc:    null,
    
    showMap:    function () {
        console.log( "getLocation starts ... " );
 
        if ( navigator.geolocation ) {
            function success(pos) {
                // Location found, show map with these coordinates
                mapManipulator.currLoc = new google.maps.LatLng( 
                                                pos.coords.latitude, 
                                                pos.coords.longitude);
                console.log( "Position read successfullty: " + mapManipulator.currLoc );

                mapManipulator.myMap = mapManipulator.drawMap( mapManipulator.currLoc );

                          
                
            };
            function fail( error ) {
                console.log( "Failed to read location. Default will be used" );
                // For testing purposes set location and call success()!
                var pos = { coords : {
                            latitude:   testLoc.lat, 
                            longitude:  testLoc.lng,
                          }};
                success( pos );              
                
            };

            // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
            navigator.geolocation.getCurrentPosition(
                success, 
                fail, 
                {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000}
            );
        } else {
            console.log( "No geolog support. Show map without location" );
            mapManipulator.drawMap( mapManipulator.myMap );
            
        }
    },
 
    drawMap:    function( latlng ) {
        console.log( "Position to pass to map: " + latlng );

        if ( latlng === undefined ) {
            // No location. Default will be used
            latlng = mapManipulator.defLoc;
        }
        // Draw Map
        var myOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };    

        var map = new google.maps.Map( 
                                    document.getElementById("map_panel"), 
                                    myOptions );
        
        return map;
    },
    
}