/// <reference path="../ts.d/es6-promise.d.ts" />
'use strict';

// 1. make it compile (to ES5)
// 2. write an wrapper witch promises
// 3. write a test to prove your code



module Utils {

	interface Resource {
		url: string;
	}

	export class ResourceLoader {

		constructor(public resource: Resource) {
		 }

		public init() {
			// calls the promise
			this.loadPromise()
				.then(function (param) {
					console.log("Callback RESOLVED: " + param);
				})
				.catch(function (err) {
					console.log("ERROR! Callback REJECTED: " + err);
				});
		}
		// method to return a promise
		public loadPromise(): Promise<string> {
			// create new promise with resolved and reject callback
			// use arrow function to maintain this
			return new Promise<string>((resolve, reject) => {
				// trigger load/loadWithResource method with promise
				if(typeof(this.resource) !== 'undefined') {
					this.loadWithResource(function (url) {
						 if (!url.url) return reject("REJECTED: invalid resource!");
						 resolve(url.url);
				 },this.resource);
				 } else {
					this.load(function (url) {
						 resolve("RESOLVED: using hard coded resource!");
					});
				 }
			 });
		}
		public load( success: (resource: Resource) => void): void {
			setTimeout(function (): void {
				success({ url: "welt.de" });
			}, 1000);
		}
		//TODO: how to overload?
		public loadWithResource(success: (resource: Resource) => void, resource: Resource): void {
			 setTimeout(function(): void {
				success(resource);
			}, 1000);
		}
	}
}
