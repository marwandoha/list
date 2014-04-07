MyApp['searchdealers'] = function (params) {
    var viewModel = {
		toolbarItems : [
		  { location: 'left', widget: 'button', options: { type: 'back', text: 'Back' ,clickAction: '#_back'}},
		  { location: 'center', text: 'Search Dealers' }
		]
	};
	return viewModel;};