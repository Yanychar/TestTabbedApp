var tabsList = [
        "Map",
        "Spots",
        "Chats",
        "Messages",
        "Profile"
];
var activeTab = "Map";
var mapWasRead = false;

function initApplication() {
    console.log( "Init starts ... " );

    // PhoneGap specific. When device is ready!!!
    // TBD !!!
    document.addEventListener( "deviceready", this.onDeviceReady, false );
    
    $(document).on("pagecreate", "#ViewPage", function() {
        console.log("**** Page Create ***");

        setupNavbar();
        
        // Listen for tabs tapping
        $("#tab_bar a").on("tap", function() {

            console.log( "Tap tab: " + $(this).text());

            activatePage( $(this) );

        });

    });

}

    

function setupNavbar( activateTab ) {
  
    var aEl = $("[data-role=navbar] ul").children().first();
    
    for ( i = 0; i < tabsList.length;i++ ) {
//        aEl.text( tabsList[ i ] );
        aEl = aEl.next();
    }
    
    
    
    
}

function activatePage( clickedTab ) {
	console.log( "Activated tab No.: " + clickedTab.attr( "href" ));

	$("[data-role=main]").children().each( function() {
        $( this ).hide();
    });

    switch ( clickedTab.attr( "href" )) {
        case "#mapview":
            if ( mapWasRead ) {
                $( "#mapview" ).show();
            } else {
                $( "#mapview" ).show( mapManipulator.showMap());
                mapWasRead = true;
            }
            break;
        case "#spotsview":
            $( "#spotsview" ).show();
            break;
        case "#commentsview":
            $( "#commentsview" ).show();
            break;
        case "#messagesview":
            $( "#messagesview" ).show();
            break;
        case "#profileview":
            $( "#profileview" ).show();
            break;
        default:
            console.log( "Wrong tab name specified!" );
          break;
	}
	
}


function onDeviceReady() {
	console.log( "onDeviceReady ... " );
    
    updateNavbar();    
    
//    activatePage( $("[data-role=navbar] ul").children().first());
//    activatePage( $( "#maptab" ));
    
    
    activatePage( $("[href=#mapview]"));

    
}

function updateNavbar() {
    
    // Ask data from server

//    var status = testComm.testGetStatus( 1, success, fail );
    
    function success( result ) {
        console.log( "Status was read successfully. Status: " + JSON.stringify( result ));
        
        // Set values in NavBar icons
//        setValueInTab( $( "[href=#spotsview]" ), result.spotNum );
//        setValueInTab( $( "[href=#commentsview]" ), result.comtNum );
//        setValueInTab( $( "[href=#messagesview]" ), result.msgNum );
        
        
    };
    
    function fail( error ) {
        console.log( "Failed to read App status from server" );
    };

    
}

function setValueInTab( tab, value ) {
    
    if ( tab != undefined && tab != null ) {
        
        if ( tab != undefined && tab != null ) {
            // Value != null. Shall be shown
            tab.text( value );
        
        } else {
            // Value is not defined. Shall be cleared
            tab.text( "" );
        }
    }
}
