MyApp.products = function (params) {
    var viewModel = {
        searchString: ko.observable(''),
        find: function () {
            viewModel.showSearch(!viewModel.showSearch());
            viewModel.searchString('');
        },
		navItemClicked : function (e) {
		if(e.itemData.options.text=="Back")
		{
		   MyApp.app.navigate({view: "home", id: undefined});
		}
    //DevExpress.ui.notify( e.itemData.options.text + " navigation item clicked", "success", 2000 );
},
toolbarItems : [
  { location: 'left', widget: 'button', options: { type: 'back', text: 'Back' }},
  { location: 'right', widget: 'button', options: { icon: 'plus' } },
  { location: 'right', widget: 'button', options: { icon: 'find' } },
  { location: 'center', text: 'Products' }
],
/*navItems = [
    { text: "user", icon: "user" },
    { text: "find", icon: "find" },
    { text: "favorites", icon: "favorites" },
    { text: "about", icon: "info" },
    { text: "home", icon: "home" },
    { text: "URI", icon: "tips" }
];
navItemClicked = function (e) {
    DevExpress.ui.notify( e.itemData.text + " navigation item clicked", "success", 2000 );
};*/
        showSearch: ko.observable(false),
        categoryId: params.id,
        dataSource: new DevExpress.data.DataSource({
            pageSize: 20,            
            load: function(loadOptions) {
                return $.getJSON('http://sampleservices.devexpress.com/api/Products', {
                    categoryId: viewModel.categoryId,
                    skip: loadOptions.skip,
                    take: loadOptions.take,
                    searchString: viewModel.searchString()
                });            
            },
            map: function(item) {
                return {
                    id: item.ProductID,
                    name: item.ProductName                    
                };
            }
        })
    };
    
    ko.computed(function () {
        return viewModel.searchString();
    }).extend({
        throttle: 500
    }).subscribe(function () {
        viewModel.dataSource.pageIndex(0);
        viewModel.dataSource.load();
    });    
    
    return viewModel;
};