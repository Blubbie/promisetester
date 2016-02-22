
// uncommment for node/grunt
var expect = require('chai').expect;
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');

 var resLoader = require('../js/scratch_57');

// for browser, testrunner.html
 // var expect = chai.expect;
 //var chaiAsPromised = chaiAsPromised;
 
// chai.use(chaiAsPromised);


// this polyfills the native ES6 promise, in case node is older than 0.12
// no need for browers
var Promise = require('es6-promise').Promise;

var testResources = {
	welt: 	{ url: 'welt.de'},
	zeit: 	{ url: 'zeit.de'},
	spiegel: { url: 'spiegel.de'},
	sz: 		{ url: 'sz.de'}
}
var Resource = { url: 'welt.de'};
var resLoader = "";

describe('ResourceLoader:', function() {
	beforeEach(function() {
		resLoader = new Utils.ResourceLoader(Resource);
	});
	
	describe('First some basic promise tests:', function() {
		it('calling Promise.resolve, should pass the test', function() {
		  var p = Promise.resolve('this promise will always be resolved');
		  return p;
		});

		it('calling Promise.reject, should fail the test', function() {
		  var p = Promise.reject('this promise will always be rejected').catch(function(){});
		  return !p;
		});
	});

	describe('Now testing ResourceLoader:', function() {
		it('should successfully instantiated', function() {
		  return expect(resLoader).to.not.be.undefined;
		});
		it('should have a public function load', function() {
		  return expect(resLoader).to.respondTo('load');
		});
		it('should have a public function init', function() {
		  return expect(resLoader).to.respondTo('init');
		});
		it('should have a property resource matching given resource', function() {
		  return expect(resLoader.resource).to.equal(Resource);
		});
		it('should not have a public function foobar', function() {
		  return expect(resLoader).not.to.respondTo('foobar');
		});
	});

	describe('Test with using chai as promise assertions:', function() {
		it('TODO: loadPromise should return a promise object', function() {
			var result = new Utils.ResourceLoader(Resource).loadPromise();
			// Promises have method: then
			// TODO: any better solution to test for returning promise?
			return expect(result).to.respondTo('then');
		});

	describe('Calling ResourceLoader with:', function() {
		it('TODO: Empty resource should throw an error', function() {
			var result = new Utils.ResourceLoader();
			// TODO: does not work yet: expect(result).to.throw(Error);
			//return expect(result.loadPromise()).to.become("successfully resolved WITHOUT url");
			return expect(result.loadPromise()).to.eventually.equal("successfully resolved WITHOUT url");

		});
	});

	describe('Checking promises:', function() {
		it('loadPromise should...resolve', function() {
			return expect(resLoader.loadPromise()).to.become(Resource.url);
		});

		it('try multiple promise assertions', function() {
			//var res1 = 'welt.de';
			//var res2 = 'zeit.de';
			//var p1 = Promise.resolve(res1);
			//var p2 = Promise.resolve(res2);
			var res1 = testResources.welt;
			var res2 = testResources.zeit;
			var res3 = testResources.spiegel;
			var p1 = new Utils.ResourceLoader(res1);
			var p2 = new Utils.ResourceLoader(res2);
			var p3 = new Utils.ResourceLoader(res3);
			return Promise.all([
				expect(p1.loadPromise()).to.become(res1.url),
				expect(p2.loadPromise()).to.become(res2.url),
				expect(p3.loadPromise()).to.become(res3.url)
			]);
		});


		it('default Promise rejected', function() {
			var p = Promise.reject(new TypeError('Promise REJECTED, TypeError!'));
			return expect(p).to.be.rejectedWith(TypeError,'Promise REJECTED, TypeError!');
		});

		it('TODO: loadPromise rejected', function() {
			var p = resLoader.loadPromise();
			return expect(!false).to.be.ok;//TODO			
			//return expect(p).to.be.rejectedWith(TypeError,'Promise REJECTED, TypeError!');
		});		
	});


	});
});
