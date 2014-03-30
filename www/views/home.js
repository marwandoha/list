MyApp.home = function (params) {
    var viewModel = {
autocomplete: {
            text: ko.observable(""),
            makes : [ 
  { make: "BMW"},
  { make: "Audi"}]

        },
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
	popupTitle = "Find";
buttonVisible = ko.observable(true);
popupVisible = ko.observable(false);
showPopup = function () {
  popupVisible(true);
};
hidePopup = function () {
  popupVisible(false);
};
/*overlayVisible = ko.observable(false);
showOverlay = function () {
    overlayVisible(true);
};
hideOverlay = function () {
    overlayVisible(false);
};*/
    return viewModel;
};