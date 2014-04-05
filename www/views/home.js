MyApp.home = function (params) {
	var deleteTypes = ["toggle", "slideButton", "slideItem", "swipe", "hold"];
    var viewModel = 
	{
		autocomplete: 
		{
            text: ko.observable(""),
            makes : 
				[ 
					{ make: "BMW"},
					{ make: "Audi"}
				]
		},
		processClick : function () 
		{
			DevExpress.ui.notify("The widget has been clicked", "info", 1000);
		},
		toolbarItems : 
		[
			{ location: 'right', widget: 'button', options: { icon: 'find' } },
			{ location: 'center', text: 'Home' }
		],
		deleteTypes: deleteTypes,

        deleteType: ko.observable(deleteTypes[0]),

        tabs: [
		   { text: "All Cars" },
           { text: "Dealers" }
           
        ],

        selectedTab: ko.observable(),

        simpleList: {
            dataSource: MyApp.db.items ,
            rendered: ko.observable(false)
        },

        dealerList: {
            dataSource: MyApp.db.dealers ,
            rendered: ko.observable(false),
            searchQuery: ko.observable().extend({ throttle: 500 })
        },

        allcarsList: {
            dataSource: MyApp.db.items ,
            rendered: ko.observable(false),
            searchQuery: ko.observable().extend({ throttle: 500 })
        },

        editEnabled: ko.observable(false),

        editList: function() {
            viewModel.editEnabled(!viewModel.editEnabled());
        }
    };
	popupTitle = "Find";
	buttonVisible = ko.observable(true);
	popupVisible = ko.observable(false);
	showPopup = function () 
	{
		popupVisible(true);
	};
	hidePopup = function () 
	{
		popupVisible(false);
	};
	overlayVisible = ko.observable(false);
	showOverlay = function () 
	{
    overlayVisible(true);
	};
	hideOverlay = function ()
	{
    overlayVisible(false);
	};
	    $.each(["allcarsList", "dealerList"], function(i, list) {
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

    viewModel.editTitle = ko.computed(function() {
        return viewModel.editEnabled() ? "Done" : "Edit";
    });

    viewModel.editButtonVisible = ko.computed(function() {
        return viewModel.selectedTab() === 0;
    });



    viewModel.selectedTab(0);
    return viewModel;
};