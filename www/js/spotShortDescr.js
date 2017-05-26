var spotShortDescr = {
    
    initialized:    false,
    infoWindow:     null,
    clickListener:  null,
    
    show:   function( marker ) {
        
        if ( !this.initialized ) {
            
            this.init();
            this.initialized = true;
        }

        this.close();
        
        this.fillContent( marker );
        this.infoWindow.open( marker.getMap(), marker );  
        
        // Add click listener to close infoWindow
        if ( this.clickListener == null ) {
            this.clickListener = marker.getMap().addListener( 'click', function() {
                console.log( 'Map clicked' ); 

                spotShortDescr.close( marker );
            });
        }

    
    },
    
    close:  function() {
        if ( this.infoWindow != null ) {
            this.infoWindow.close();
        }
        
        if ( this.clickListener != null ) {

            this.clickListener.remove();
            this.clickListener = null;
        }
        
    },
    
    init:   function() {
        
        this.infoWindow = new google.maps.InfoWindow();    
        
        google.maps.event.addListener( this.infoWindow, 'domready', function() {

            // Reference to the DIV which receives the contents of the infowindow using jQuery
            var iwOuter = $('.gm-style-iw');

            /* The DIV we want to change is above the .gm-style-iw DIV.
            * So, we use jQuery and create a iwBackground variable,
            * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
            */
            var iwBackground = iwOuter.prev();            

            // Remove the background shadow DIV
            iwBackground.children(':nth-child(2)').css({'display' : 'none'});

            // Remove the white background DIV
            iwBackground.children(':nth-child(4)').css({'display' : 'none'});            

            // Remote Close button
            iwOuter.next().hide();
            
            iwOuter.find( "a").click( function() {
                console.log( "Clicked Spot Descr link" );

                spotShortDescr.close();
                
                var el = $("#spotViewPopup");
                console.log( "El: " + el );
                el.popup( "open" );
            });
            
            
        });
    },
    
    fillContent: function( marker ) {

        if ( marker == undefined || marker == null ) { return;}
        
        var content = 
                  '<div id="iw-container">' 
                +   '<div class="iw-content">'
                +       '<table style="width:100%">'
                +           '<tr>'
                +               '<td rowspan="2" >'
                +                   '<img src="'
                +                       'img/' + marker.customData.owner.photo + '">'
                +               '</td>'
                +               '<td>'  /* class="iw-subTitle">' */
                +                   '<a href="#" >'
                +                       marker.customData.name 
                +                   '</a>'
                +               '</td>'
                +           '</tr>'
                +           '<tr>'
                +               '<td>' 
                +                   by + marker.customData.owner.getFullFNfirst() 
                +               '</td>'
                +           '</tr>'
                +       '</table>'
                +   '</div>'
                + '</div>';
        
        this.infoWindow.setContent( content );
        
    },
    
}
