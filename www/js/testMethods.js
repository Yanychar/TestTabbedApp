var testComm = {
    testInitialized:   false,
    testIdCounter:  1,
    user1:  null,
    user2:  null,

    sp1:  null,
    sp2:  null,
    
    idGen: function() {
        return this.testIdCounter++;
    },

    testInit:   function() {
    
            console.log( "testInit: " + this.testInitialized );
        if ( !this.testInitialized ) {
            console.log( "Test initialized!" );

            this.user1 = new User();
            this.user1.id = this.idGen();
            this.user1.fName = "Ivan";
            this.user1.lName = "Ivanov";
            this.user1.photo = "user1.jpg";

            this.user2 = new User();
            this.user2.id = this.idGen();
            this.user2.fName = "Petr";
            this.user2.lName = "Petrov";
            this.user2.photo = "user2.jpg";

            this.sp1 = new Spot();
            this.sp1.id = this.idGen();
            this.sp1.setName( "Grillipaikka 1" );
            this.sp1.description = "This is Grillipaikka place in the cost of the lake. Beautiful, isn't it?";
            this.sp1.rating = 5;
            this.sp1.pos = { lat: 60.22115239251403, lng: 24.905189998366833 };
            this.sp1.owner = this.user1;
            this.sp1.photo = "spot1.jpg";
            this.sp1.counters = { likes: 176, messgs: 287, viewers: 1192 };

            this.sp2 = new Spot();
            this.sp2.id = this.idGen();
            this.sp2.name = "Dog Place 2";
            this.sp2.description = "Dog playground near my place. Do you like it? Join me there!";
            this.sp2.rating = 2;
            this.sp2.pos = { lat: 60.22253777706261, lng: 24.907464511611828 };
            this.sp2.owner = this.user2;
            this.sp2.photo = "spot2.jpg";
            this.sp2.counters = { likes: 276, messgs: 387, viewers: 4192 };


            this.testInitialized = true;
        }
    },

    testGetSpots: function( lat, lng, successFunc, failedFunc ) {
    
        this.testInit();

        var spotArray = [
            this.sp1,
            this.sp2
        ];

        console.log( "TestGetSpots: callback will be called with array of spots as param" );
        
        for ( var i = 0; i < spotArray.length; i++ ) {
            console.log( "  " + spotArray[i].name + ": (" + spotArray[i].rating + ")"
                        +"  " + "Pos( " + spotArray[i].pos.lat + ", " + spotArray[i].pos.lng + " )"           
            ); 

        }
        
        if ( successFunc != undefined && successFunc != null ) {
            
            successFunc( spotArray );  
            
        } 
        
        return spotArray;
    },

    testGetSpot:    function( id, successFunc, failedFunc ) {
    
        testInit();

        var spList = testGetSpots( 0, 0, null, null );
        var i = 0;
        for ( ; i < spList.length; i++ ) {

                if ( spList[ i ].id == id )  {

                    if ( successFunc != undefined && successFunc != null ) {

                        successFunc( spList[ i ] );

                    } 

                    break;
                }
        }
        
        if ( i < spList.length ) {
            
            return spList[ i ];
        }
        
    },
    
}