# Typescript, promises, testing with mocha


 1. make it compile (to ES5)
 2. write an wrapper witch promises
 3. write a test to prove your code


To get started, run `npm install` to install the necessary packages. 
Run grunt to run the default grunt task with jshint, typscript compiling and mocha test.

You can run the mocha test suite directly by grunt 'mochaTest'.
You can also run the test suite / testrunner.html in a browser.


## Files in project

- `ts/scratch_57.ts`: resourceLoader written in typescript
- `test/mocha.opts`: this file is automatically loaded by Mocha. Is used to automatically load the test initialization module
- `test/test-init.js`: this loads both chai-as-promised and sinon-as-promised, so we don't need to do it manually in our test files
- `test/resourceLoaderTest.js`: the test file for browser tests / testrunner.html
- `test/resourceLoaderTestNode.js`: the test file for node test
