MyApp['product-details'] = function (params) {
    var viewModel = {
        id: params.id,
        name: ko.observable('')
    };
    
    $.getJSON('http://sampleservices.devexpress.com/api/Products/' + viewModel.id).done(function(data) {
        viewModel.name(data.ProductName);
    });     
    
    return viewModel;
};