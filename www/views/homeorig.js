MyApp.home = function (params) {
var deleteTypes = ["toggle", "slideButton", "slideItem", "swipe", "hold"];
itemsto = new DevExpress.data.CustomStore({
    load: function(loadOptions) {
        var deferred = $.Deferred();
        // load data from the remote service
        $.getJSON("http://sampleservices.devexpress.com/api/Categories").done(function(data) {
 
            // perform filtering on the client side
            var query = DevExpress.data.query(data).filter([ [ "CategoryID", ">=", 1 ], "and", [ "CategoryID", "<=", 7 ]])
    .sortBy("CategoryID")
    .thenBy("CategoryID")
    .select("CategoryName","CategoryID","Description");                
            if(loadOptions.filter)
                query = query.filter(loadOptions.filter);
            deferred.resolve(query.toArray());
        });
        return deferred.promise();
    }}); 
    var viewModel = {
autocomplete: {
            text: ko.observable(""),
            makes : [ 
  { make: "BMW"},
  { make: "Audi"}]

        },
		store : new DevExpress.data.CustomStore({
    load: function(loadOptions) {
        var deferred = $.Deferred();
        // load data from the remote service
        $.getJSON("http://sampleservices.devexpress.com/api/Categories").done(function(data) {
 
            // perform filtering on the client side
            var query = DevExpress.data.query(data).filter([ [ "CategoryID", ">=", 1 ], "and", [ "CategoryID", "<=", 7 ]])
    .sortBy("CategoryID")
    .thenBy("CategoryID")
    .select("CategoryName","CategoryID","Description");                
            if(loadOptions.filter)
                query = query.filter(loadOptions.filter);
            deferred.resolve(query.toArray());
        });
        return deferred.promise();
    }})  ,
		tabs: [
           { text: "All Cars" },
           { text: "Company" },
        ],
		selectedTab: ko.observable(),
		 allList: {
            dataSource: new DevExpress.data.CustomStore({ store: MyApp.db.items }),
            rendered: ko.observable(false)
        },
		companyList: {
            dataSource: new DevExpress.data.CustomStore({ store: this.store }),
            rendered: ko.observable(false)
        },
		editEnabled: ko.observable(false),

        editList: function() {
            viewModel.editEnabled(!viewModel.editEnabled());
        },
		deleteTypes: deleteTypes,

        deleteType: ko.observable(deleteTypes[0]),
		processClick : function () {
  DevExpress.ui.notify("The widget has been clicked", "info", 1000);
},
toolbarItems : [
  //{ location: 'left', widget: 'button', options: { type: 'back', text: 'Back' }},
  { location: 'right', widget: 'button', options: { icon: 'plus' } },
  { location: 'right', widget: 'button', options: { icon: 'find' } },
  { location: 'center', text: 'Home' }
]
       /* dataSource: new DevExpress.data.DataSource({
            load: function(loadOptions) {
                return $.getJSON('http://sampleservices.devexpress.com/api/Categories');
            },
            map: function(item) {
                return {
                    id: item.CategoryID,
                    name: item.CategoryName,
					desc: item.Description
                };
            }                
        })*/
		
		//utility.executePost(url, {}, function(jsonObj){
			//jsonObject.users = []
		//});
		//dataSource : new DevExpress.data.DataSource("http://sampleservices.devexpress.com/api/Categories"),
	  

    };
	 $.each(["allList", "companyList"], function(i, list) {
        viewModel[list].listVisible = ko.computed(function() {
            return viewModel.selectedTab() === i;
        });

        viewModel.selectedTab.subscribe(function(value) {
            if(viewModel[list].rendered())
                return;
            if(value === i)
                viewModel[list].rendered(true);
        });

        if(i < 2) {
            viewModel[list].editEnabled = viewModel.editEnabled;

            viewModel[list].editConfig = ko.computed(function() {
                return {
                    deleteMode: viewModel.deleteType(),
                    deleteEnabled: true
                }
            });
        }
    });
	popupTitle = "Find";
buttonVisible = ko.observable(true);
popupVisible = ko.observable(false);
showPopup = function () {
  popupVisible(true);
};
hidePopup = function () {
  popupVisible(false);
};
overlayVisible = ko.observable(false);
showOverlay = function () {
    overlayVisible(true);
};
hideOverlay = function () {
    overlayVisible(false);
};
viewModel.selectedTab(0);
    return viewModel;
};