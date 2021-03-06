﻿MyApp['product-details'] = function (params) {
    var viewModel = {
        id: params.id,
        name: ko.observable(''),
		navItemClicked : function (e) {
			if(e.itemData.options.text=="Back")
			{
			   MyApp.app.navigate({view: "home", id: undefined});
			}
		},
		toolbarItems : [
		  { location: 'left', widget: 'button', options: { type: 'back', text: 'Back',clickAction: '#_back', }},
		  { location: 'center', text: 'View Car' },
		  { location: 'left', template: 'nav-button' }
		]
    };
    
    $.getJSON("data/cars.txt").done(function(data) {
        viewModel.name(data[viewModel.id].make);
    });     
    
    return viewModel;
};