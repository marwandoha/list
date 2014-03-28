window.MyApp = {};

$(function() {
    MyApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MyApp,
        
        navigationType: "navbar",
        navigation: [
          {
            title: "Categories",
            action: "#home",
            icon: "home"
          },
          {
              title: "About",
              action: "#about",
              icon: "info"
          },
		  {
			  title: "Camera",
              action: "#about",
              icon: "info"
		  }
        ],
        commandMapping: {
            "ios-header-toolbar": {

                commands: [
                    { id: "search", location: 'right', showText: false }
                ]
            },
            "android-simple-toolbar": {
                commands: [
                    { id: "search", location: 'right', showText: false }
                ]
            },
            "tizen-footer-toolbar": {
                commands: [
                     { id: "search", location: 'center', showText: false }
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