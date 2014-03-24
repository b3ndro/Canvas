module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'public/css/site.css': 'public/sass/site.scss'
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch', 'open' ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '3030'
                    },
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                grunt.log.writeln('Server started');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:3030'
            }
        },
        watch: {
            scss: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    reload: true,
                    livereload: true
                }
            },
            publicFiles: {
                files: ['public/**/*'],
                options: {
                    reload: true,
                    livereload: true
                }
            }
//            serverFiles: {
//                files: ['server/**/*'],
//                options: {
//                    reload: true,
//                    livereload: true
//                }
//            }
        }
    });

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.registerTask('default', ['concurrent']);
};