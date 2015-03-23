'use strict'
module.exports = (grunt) ->

  require('jit-grunt')(grunt)

  grunt.initConfig

    watch:
      compass:
        files: [
          'app/styles/**/*.scss'
        ]
        tasks: ['compass']

    browserSync:
      dev:
        bsFiles:
          src: [
            'app/styles/**/*.css'
            'app/scripts/**/*.js'
          ]
        options:
          logFileChanges: false
          notify: false
          open: false
          port: 9000
          reloadDelay: 2000
          watchOptions:
            debounceDelay: 1000
          watchTask: true
          ghostMode: false
          server:
            baseDir: ['app']

    compass:
      options:
        sassDir: 'app/styles/'
        cssDir: 'app/styles/'
      dev: {}

  grunt.registerTask 'server', [
    'compass'
    'browserSync'
    'watch'
  ]

  grunt.registerTask 'default', ['server']
