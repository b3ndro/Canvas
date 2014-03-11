

module.exports = function(grunt) {
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
                tasks: ['nodemon','watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    env: {
                        PORT: '3030'
                    },
                    cwd: __dirname,
                    watch: ['server','public'],
                    delay: 1
                },
                callback: function (nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.colour);
                    });

                nodemon.on('config:update', function () {
                    // Delay before server listens on port
                    setTimeout(function() {
                        require('open')('http://localhost:3030');
                    }, 1000);
                });
                // refreshes browser when server reboots
                nodemon.on('restart', function () {
                        // Delay before server listens on port
                        setTimeout(function() {
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                        }, 1000);
                    });
                }
            }
        },
        watch: {
            source: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-open');
    grunt.registerTask('default', ['concurrent']);
};