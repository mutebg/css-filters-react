module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify')
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            development: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'res/css/app.css': 'build/sass/app.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 5 versions']
            },
            main: {
                expand: true,
                flatten: true,
                src: 'res/css/*.css',
                dest: 'res/css/'
            }
        },

        react: {
            combined: {
                files: {
                    'res/js/app.js': [
                        'build/js/app.js'
                    ]
                }
            },
        },

        watch: {
            styles: {
                files: ['build/sass/*', 'build/sass/_parts/*'],
                tasks: ['sass', 'autoprefixer']
            },
            scripts: {
                files: 'build/js/*',
                tasks: ['react']
            }
        }
    });

    grunt.registerTask('auto', ['watch']);
    grunt.registerTask('build', ['sass', 'autoprefixer']);
    grunt.registerTask('default', ['watch']);

};