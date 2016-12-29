(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

      granted: function() {
        if (!this.checkSimulator()) {
          cordova.plugins.notification.badge.hasPermission(this.callback);
        }
      },
      
      register: function() {
        if (!this.checkSimulator()) {
          cordova.plugins.notification.badge.registerPermission(this.callback);
        }
      },
      
      set10: function() {
        if (!this.checkSimulator()) {
          cordova.plugins.notification.badge.set(10, this.callback);
        }
      },
      
      setRandom: function() {
        if (!this.checkSimulator()) {
          cordova.plugins.notification.badge.set(Math.round(Math.random()*100), this.callback);
        }
      },
      
      getBadge: function() {
        if (!this.checkSimulator()) {
          cordova.plugins.notification.badge.get(this.callback);
        }
      },
      
      clearBadge: function() {
        if (!this.checkSimulator()) {
          cordova.plugins.notification.badge.clear(this.callback);
        }
      },
      
      autoClearOn: function() {
        if (!this.checkSimulator()) {
          cordova.plugins.notification.badge.configure({
            autoClear: true
          });
          this.callback('Automatically clearing the badge from now on.');
        }
      },
      
      autoClearOff: function() {
        if (!this.checkSimulator()) {
          cordova.plugins.notification.badge.configure({
            autoClear: false
          });
          this.callback('No longer automatically clearing the badge.');
        }
      },
      
      changeTitle: function() {
        if (!this.checkSimulator()) {
          var title = cordova.plugins.notification.badge._config.title + '_new';
          cordova.plugins.notification.badge.configure({
            title: title
          });
          this.callback('Set title to \n"' + title + '"');
        }
      },
      
      callback: function(message) {
        setTimeout(function() {
	        alert(message);          
        });
      },

      checkSimulator: function() {
        if (window.navigator.simulator === true) {
          alert('This plugin is not available in the simulator.');
          return true;
        } else if (window.cordova === undefined) {
          alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
          return true;
        } else {
          return false;
        }
      }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);