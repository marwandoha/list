MyApp.products = function (params) {
    var viewModel = {
        searchString: ko.observable(''),
        find: function () {
            viewModel.showSearch(!viewModel.showSearch());
            viewModel.searchString('');
        },
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