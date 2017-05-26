function defaultIfBlank( param, defValue ) {
//    console.log( "defaultIfBlank(): "
//                + "param=" + param + " "
//                + "defValue=" + defValue  );
    if ( param === undefined ) {
        if ( defValue === undefined ) {
            defValue = 0;
        }
        
        param = defValue;
        
    }
    return param;
}
