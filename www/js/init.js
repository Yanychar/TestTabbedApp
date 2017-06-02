var tabsList = [
        "Map",
        "Spots",
        "Chats",
        "Messages",
        "Profile"
];
var activeTab = "Map";

function initApplication() {
    console.log( "Init starts ... " );

    document.addEventListener( "deviceready", this.onDeviceReady, false);
    
    $(document).on("pagecreate", "#ViewPage", function() {

        console.log("**** Page Create ***");

        setupNavbar();
        
        $("#tab_bar a").on("tap", function() {
                console.log( "Tap tab: " + $(this).text());

                        activatePage( $(this) );

        });

        activatePage( $("[data-role=navbar] ul").children().first());
        

        $("#tab_bar a").on("tap", function() {
            console.log( "Tap tab: " + $(this).text());
          activeTab = $(this).text();

          if ( activeTab == "Map" ) {
              $( "#map_panel" ).show();
              $( "#addon_panel" ).hide();
          } else if ( activeTab == "Spots" ) {
              $( "#map_panel" ).hide();
              $( "#addon_panel" ).show();
          } else {
              $( "#map_panel" ).hide();
              $( "#addon_panel" ).show();
          }
        });

        var ft = $("[data-role=navbar] ul").children().first();
        if ( ft != null ) {
            ft.tap();
        } else {
            console.error( "First tab was not found!" );
        }


    });
    
    
}

function onDeviceReady() {
	console.log( "onDeviceReady ... " );
}
    

function setupNavbar( activateTab ) {
  
    var aEl = $("[data-role=navbar] ul").children().first();
//    aEl.text( "bbb" );
    console.log( "length:" + tabsList.length );
    
    for ( i = 0; i < tabsList.length;i++ ) {
        aEl.text( tabsList[ i ] );
        aEl = aEl.next();
    }
    
    
    
    
}

function activatePage( clickedTab ) {
	console.log( "Activated tab No.: " + clickedTab.attr( "href" ));
//	console.log( "Firsttab : " + $("[data-role=navbar] ul").children().first().text());

	$("[data-role=main]").children().each( function() {
        $( this ).hide();
    });

    switch ( clickedTab.attr( "href" )) {
        case "#mapview":
            $( "#mapview" ).show();
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

