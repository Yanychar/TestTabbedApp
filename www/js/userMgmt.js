function User() {
	this.id = -1;
    this.fName = "";
    this.lName = "";

    this.getFullFNfirst = function() {
        
        return this.fName + " " + this.lName;
    };
}
