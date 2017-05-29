function testGetSpots( lat, lng, successFunc, failedFunc ) {
    
    var user1 = new User();
	user1.id = 1;
	user1.fName = "Ivan";
	user1.lName = "Ivanov";
    user1.photo = "user1.jpg";

    var user2 = new User();
	user2.id = 2;
	user2.fName = "Petr";
	user2.lName = "Petrov";
    user2.photo = "user2.jpg";
    
    var sp1 = new Spot();
	var sp2 = new Spot();

	sp1.id = 2;
	sp1.name = "Grillipaikka 1";
	sp1.description = "This is Grillipaikka place in the cost of the lake. Beautiful, isn't it?";
	sp1.rating = 5;
	sp1.pos = { lat: 60.22115239251403, lng: 24.905189998366833 };
	sp1.owner = user1;
    sp1.photo = "spot1.jpg";

	sp2.id = 3;
	sp2.name = "Dog Place 2";
	sp2.description = "Dog playground near my place. Do you like it? Join me there!";
	sp2.rating = 2;
	sp2.pos = { lat: 60.22253777706261, lng: 24.907464511611828 };
	sp2.owner = user2;
    sp2.photo = "spot2.jpg";
    
    var spotArray = [
        sp1,
        sp2
    ];
    
    console.log( "TestGetSpots: callback will be called with array of spots as param" );
    successFunc( spotArray );
}

function testGetSpot( spotId ) {
}
