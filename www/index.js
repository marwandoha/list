window.MyApp = {};

$(function() {
    MyApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MyApp,
        
        navigationType: "slideout",
		 "navigation": [
            {
                "id": "Home",
                "title": "Home",
                "icon": "home",
                "location": "navigation"
            }],
        commandMapping: {
            "ios-header-toolbar": {

                commands: [
                    { id: "search", location: 'right', showText: false },
					 { id: "back", location: "left" }
                ]
            },
            "android-simple-toolbar": {
                commands: [
                    { id: "search", location: 'right', showText: false },
					{ id: "back", location: "left" }
        ]
            },
            "tizen-footer-toolbar": {
                commands: [
                     { id: "search", location: 'center', showText: false },
					 { id: "back", location: "left" }
                ]
            },
            "generic-header-toolbar": {
                commands: [
                    { id: "search", location: 'right', showText: false }
                ]
            },
            "win8-phone-appbar": {
                commands: [
                    { id: "search", location: 'center', showText: true }
                ]
            },
        }
    });
    MyApp.app.router.register(":view/:id", { view: "home", id: undefined });
    MyApp.app.navigate();   
});