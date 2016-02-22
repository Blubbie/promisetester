'use strict';
var Utils;
(function (Utils) {
    var ResourceLoader = (function () {
        function ResourceLoader(resource) {
            this.resource = resource;
        }
        ResourceLoader.prototype.init = function () {
            this.loadPromise()
                .then(function (param) {
                console.log("Callback RESOLVED: " + param);
            })
                .catch(function (err) {
                console.log("ERROR! Callback REJECTED: " + err);
            });
        };
        ResourceLoader.prototype.loadPromise = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (typeof (_this.resource) !== 'undefined') {
                    _this.loadWithResource(function (url) {
                        if (!url.url)
                            return reject("REJECTED: invalid resource!");
                        resolve(url.url);
                    }, _this.resource);
                }
                else {
                    _this.load(function (url) {
                        resolve("RESOLVED: using hard coded resource!");
                    });
                }
            });
        };
        ResourceLoader.prototype.load = function (success) {
            setTimeout(function () {
                success({ url: "welt.de" });
            }, 1000);
        };
        ResourceLoader.prototype.loadWithResource = function (success, resource) {
            setTimeout(function () {
                success(resource);
            }, 1000);
        };
        return ResourceLoader;
    })();
    Utils.ResourceLoader = ResourceLoader;
})(Utils || (Utils = {}));
//# sourceMappingURL=scratch_57.js.map