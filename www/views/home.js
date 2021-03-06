﻿MyApp.home = function (params) {
	var deleteTypes = ["toggle", "slideButton", "slideItem", "swipe", "hold"];
	menuItemClicked = function (e) {
    DevExpress.ui.notify(e.itemData + " item clicked", "success", 2000);
	};
	popup= {
            showPopup: function() {
                var popup = $("#popup").data("dxPopup");
                popup.show();
            },
            hidePopup: function(e) {
                var popup = $("#popup").data("dxPopup");
				popup.hide();
				if(this.username()=="Marwan" && this.password()=="Doha")
				{
					MyApp.app.navigate({view: "searchcars", id: undefined}); 
					DevExpress.ui.notify("You have been signed in :)" , "success", 1000);
				}
				else
				{
					DevExpress.ui.notify("Invalide username or password" , "error", 1000);
				}
                
            }
        },
	searchClicked = function (e) {
			if(viewModel.selectedTab()==0)
			{
			   //MyApp.app.navigate({view: "home", id: undefined});
			   MyApp.app.navigate({view: "searchcars", id: undefined}); 
			   //DevExpress.ui.notify("The search from All list has been clicked" , "info", 1000);
			}
			if(viewModel.selectedTab()==1)
			{
			   //MyApp.app.navigate({view: "home", id: undefined});
			   MyApp.app.navigate({view: "searchdealers", id: undefined}); 
			   //DevExpress.ui.notify("The search from All list has been clicked" , "info", 1000);
			}
		};
		selectedIndex = ko.observable(0);
		menuVisible = ko.observable(false);
    var viewModel = 
	{
		items : [
				{ text: 'item1', icon: 'plus' },
				{ text: 'item2', icon: 'plus' },
				{ text: 'item3', icon: 'plus' }				
		],
		autocomplete: 
		{
            text: ko.observable(""),
            makes : 
				[ 
					{ make: "BMW"},
					{ make: "Audi"}
				]
		},
						username: ko.observable(''),
						password: ko.observable(''),
		/*processClick : function () 
		{
			DevExpress.ui.notify("The widget has been clicked" , "info", 1000);
		},*/
		toolbarItems : 
		[
			{ location: 'right', widget: 'button', options: { icon: 'find', name: 'search',clickAction: searchClicked} },
			{ location: 'center', text: 'Home' },
			{ location: 'left', template: 'nav-button' }
			/*{
			  location: 'right', widget: 'dropDownMenu', options: {
				  items: ["Sign In"],
				  itemClickAction: popup.showPopup
				}
			}*/
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
        },
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