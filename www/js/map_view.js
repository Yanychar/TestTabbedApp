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

/*                mapManipulator.drawMarker( 
                                mapManipulator.myMap,
                                mapManipulator.getMarker( "#a82bdd", "5", "Тест тоолтип" ), 
                                mapManipulator.currLoc );
                                
                                
*/
                getSpots( 
                    pos.coords.latitude, 
                    pos.coords.longitude,
                    mapManipulator.getSpotsSuccess,
                    mapManipulator.getSpotsFailed
                );
                          
                
            };
            function fail( error ) {
                console.log( "Failed to read location. Default will be used" );
                // For testing purposes set location and call success()!
                var pos = { coords : {
                            latitude:   testLoc.lat, 
                            longitude:  testLoc.lng,
                          }};
                success( pos );              
                
                
//                mapManipulator.drawMap( mapManipulator.myMap );
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
    

    createMarker:  function( spotDescr ) {

        var gMarker = new google.maps.Marker(
            {
                icon:   {
                    path: "M24 0c-8.284 0-15 6.716-15 15 0 15 15 33 15 33s15-18 15-33c0-8.284-6.716-15-15-15zM24 24c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9-4.029 9-9 9z",
                    anchor: {x: 24, y: 48},
                    fillColor: defaultIfBlank( spotDescr.getSpotColor(), "#a82bdd" ),
                    fillOpacity: 1,
                    //    scale: 1,
                    strokeColor: "black",
                    strokeWeight: 2,
                    labelOrigin: {x: 24, y: 15}
                },
                shape:  {
                    coords: [1, 1, 1, 48, 48, 48, 48, 1],
                    type: 'poly'
                },
                title:  defaultIfBlank( spotDescr.name, "" ),
                label:  {
                    text: defaultIfBlank( String( spotDescr.rating ), "" ),
                    color: defaultIfBlank( spotDescr.getSpotColor(), "#a82bdd" ),
                    fontWeight: "bold"
                },
            }
        );
        
        gMarker.customData = spotDescr;
        
    
        return gMarker;
    },
    
    drawMarker: function ( map, gMarker, latlng ) {
        gMarker.setPosition( latlng );
        gMarker.setMap( map );
        
        console.log( "DRAW MARKER: " + gMarker.customData.name + ", " + gMarker.customData.owner.getFullFNfirst() ); 
    
    },

    createAndDrawMarker: function ( map, spotDescr ) {
        var gMarker = mapManipulator.createMarker( spotDescr );
        mapManipulator.drawMarker(  map, 
                                    gMarker,
                                    spotDescr.getLatLng()
        );
        
        return gMarker;
    },

    getSpotsSuccess: function( spList ) {
        console.log( "Spots were read: " );
        var loc;
        var gm;
        for ( var i = 0; i < spList.length; i++ ) {
            console.log( "  " + spList[i].name + ": (" + spList[i].rating + ")"
                        +"  " + "Pos( " + spList[i].pos.lat + ", " + spList[i].pos.lng + " )"           
            ); 

            gm = mapManipulator.createAndDrawMarker( mapManipulator.myMap, 
                    spList[ i ]
            );

            google.maps.event.addListener( gm, 'mouseover', function( event ){
                
                console.log( "WILL BE SHOWN: " + this.title + ", " + this.customData.owner.getFullFNfirst()); 

                spotWindow.show( this );
                

            });            
/*            
            google.maps.event.addListener( gm, 'click', function( event ){

                if ( event.Ba.isTrusted ){
                    console.log( "Marker clicked: " + this.title );
                }

            });            
*/            
        }
    },

    getSpotsFailed: function() {
        console.log( "Failed to read Spots list" );
    }

    
}