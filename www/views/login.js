MyApp['login'] = function (params) {
var 	loadPanelMessage = ko.observable(""),
        loadPanelVisible = ko.observable(false);
		function loadData() {
        loadPanelVisible(true);
		loadPanelMessage("Please wait... Loading data");
		setTimeout(function() {
							loadPanelVisible(false);
			}, 5000);		
	}
    var viewModel = {
		loadPanelVisible: loadPanelVisible,
        loadPanelMessage: loadPanelMessage,
		toolbarItems : [
		  { location: 'left', widget: 'button', options: { type: 'back', text: 'Back' ,clickAction: '#_back'}},
		  { location: 'center', text: 'Login Page' },
		  { location: 'left', template: 'nav-button' }
		],
		viewShowing: function (args) {
                loadData();
        }
	};
	return viewModel;};