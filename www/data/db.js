(function() {
store = new DevExpress.data.CustomStore({
    load: function(loadOptions) {
        var deferred = $.Deferred();
        // load data from the remote service
        $.getJSON("data/cars.txt").done(function(data) {
 
            // perform filtering on the client side
            //var query = DevExpress.data.query(data).filter([ [ "id", ">=", 1 ], "and", [ "id", "<=", 7 ]])
			var query = DevExpress.data.query(data)
    .sortBy("id")
    .thenBy("id")
    .select("picture","price","make","id");                
            if(loadOptions.filter)
                query = query.filter(loadOptions.filter);
            deferred.resolve(query.toArray());
        });
        return deferred.promise();
    }}) ;
deal = new DevExpress.data.CustomStore({
    load: function(loadOptions) {
        var deferred = $.Deferred();
        // load data from the remote service
        $.getJSON("data/dealers.txt").done(function(data) {
 
            // perform filtering on the client side
            //var query = DevExpress.data.query(data).filter([ [ "id", ">=", 1 ], "and", [ "id", "<=", 7 ]])
			var query = DevExpress.data.query(data)
    .sortBy("id")
    .thenBy("id")
    .select("name","location");                
            if(loadOptions.filter)
                query = query.filter(loadOptions.filter);
            deferred.resolve(query.toArray());
        });
        return deferred.promise();
    }}) ;
	MyApp.db = {
	items: store,
	dealers: deal};

})();