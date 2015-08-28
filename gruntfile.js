'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less: {
            task: {
                options: {
                    paths: ["styles/"],
                    // cssmin remove soucemap in "prod" version
                    // sourceMap: true,
                    // sourceMapFileInline: true,
                },
                src: 'styles/style.less',
                dest: 'styles/style.css'
            },
        },
        watch: {
            less: {
                files: ['styles/*.less'],
                tasks: ['less']
            },
        },
        browserSync: {
            bsFiles: {
                src: [
                    '**/*.*'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./",
                },
            }
        },
    });

    grunt.registerTask('server', [
        'less',
        'browserSync',
        'watch',
    ]);
};

