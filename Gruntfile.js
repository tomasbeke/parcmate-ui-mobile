module.exports = function(grunt) {

  'use strict';

  var fs = require('fs');

  grunt.initConfig({
    clean: ['tmp', 'dist'],
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'main.css': 'main.scss', 
          'widgets.css': 'widgets.scss'
        }
      }
    },
    slim: {
      dist: {
        options: {
          pretty: true
        },
        files: [{
            'dist/index.html': 'index.slim'
          }, {
            expand: true,
            cwd: 'src',
            src: ['app/**/*.slim'],
            dest: 'tmp',
            ext: '.html'
          }
        ]
      }
    },
    copy: {
      assets: {
        files: [{
            expand: true,
            cwd: 'src/assets/',
            src: ['fonts/**/*', 'images/**/*', 'js/**/*'],
            dest: 'dist/assets'
        }]
      },
      slim: {
        files: [{
            expand: true,
            flatten: true,
            src: ['tmp/**/*.html'],
            dest: 'dist/partials'
        }]
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-slim');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['clean', 'slim', 'copy']);

};