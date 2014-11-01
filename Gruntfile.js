module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build : {
                src : 'dist/<%= pkg.name %>.js',
                dest : 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint : {
            all : ['Gruntfile.js', 'src/*.js']
        },
        requirejs : {
            compile : {
                options : {
                    almond : true,
                    wrap : {
                        startFile : 'build/start.frag',
                        endFile : 'build/end.frag'
                    },
                    "baseUrl" : "src",
                    "name" : "quagga",
                    "out" : "dist/quagga.js",
                    "include" : ['quagga'],
                    "optimize" : "none",
                    "findNestedDependencies" : true,
                    "skipSemiColonInsertion" : true,

                    "shim" : {
                        "typedefs" : {
                            "deps" : [],
                            "exports" : "typedefs"
                        },
                        "glMatrix" : {
                            "deps" : ["typedefs"],
                            "exports" : "glMatrix"
                        },
                        "glMatrixAddon" : {
                            "deps" : ["glMatrix"],
                            "exports" : "glMatrixAddon"
                        }
                    },

                    "paths" : {
                        "typedefs" : "typedefs",
                        "glMatrix" : "vendor/glMatrix",
                        "glMatrixAddon" : "glMatrixAddon"
                    }
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-requirejs');
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'requirejs', 'uglify']);

}; 