MyApp.home = function (params) {
    var viewModel = {
        dataSource: new DevExpress.data.DataSource({
            load: function(loadOptions) {
                return $.getJSON('http://sampleservices.devexpress.com/api/Categories');
            },
            map: function(item) {
                return {
                    id: item.CategoryID,
                    name: item.CategoryName
                };
            }                
        })
    };
    return viewModel;
};