module.exports = function(grunt) {
 'use strict';

  var resourcesPath = 'tspromises';
  var appConfig = {
    tsFiles: resourcesPath+'/ts/**/*.ts',
    tsDefinitions: resourcesPath+'/ts.d/**/*d.ts'
  };

    grunt.initConfig({

    app: appConfig,
    jshint: {
      all: ['Gruntfile.js']
    },

    // watch with checking gruntfile, compiling ts files 
    // and copy compiled js to js folder
    watch: {
      grunt: {
        files: ['Gruntfile.js','<%= jshint.all %>'] 
      },
      ts: {
        files: ['<%= app.tsFiles %>'],
        tasks: ['ts']
      },
      copy : {
        files: ['<%= app.tsFiles %>'],
        tasks: ['copy']
      }
    },

  // mocha unit testing, far more better for async/promises
   mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file 
          quiet: false, // Optionally suppress output to standard out (defaults to false) 
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
        },
        src: [
          resourcesPath+'/test/test-init.js',
          resourcesPath+'/test/resourceLoaderTestNode.js'
        ]
      }
    },

    // typescript compiling task
    ts: {
      myTsFiles: {
        src: ['<%= app.tsFiles %>'],
        references: [
                '<%= app.tsDefinitions %>'
              ]
      }
    },

    // clean up target folder
    clean: {
      build: [resourcesPath+"/js"]
    },

    // copy js and js-ts-maps to target folder
    copy: {
      main: {
        files: [{
          expand: true, //copy complete file/flolder structure
          src: ['**/*.js','**/*.ts', '**/*.map'], // all files with js, ts, map
          cwd: resourcesPath+'/ts', //src files matches are relative to this path
          dest: resourcesPath+'/js' //destination
        }],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-mocha-test');
  
  // Default task, does all tasks
  grunt.registerTask('default','Preprocessing and compiling...',
      ['jshint','clean','ts','copy', 'watch']);

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
};