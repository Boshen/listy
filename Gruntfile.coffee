'use strict'
module.exports = (grunt) ->

  require('jit-grunt')(grunt)

  grunt.initConfig

    watch:
      compass:
        files: [
          'app/styles/**/*.scss'
        ]
        tasks: ['compass:server']

    browserSync:
      dev:
        bsFiles:
          src: [
            '.tmp/styles/main.css'
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
            baseDir: ['app', '.tmp']

    compass:
      options:
        sassDir: 'app/styles'
        relativeAssets: true
      dist:
        options:
          cssDir: 'dist/styles'
      server:
        options:
          cssDir: '.tmp/styles'
          debugInfo: true
          relativeAssets: false

    copy:
      all:
        files: [
          {
            expand: true
            cwd: 'app'
            dest: 'dist'
            src: [
              '**/*.js'
              'index.html'
            ]
          }
        ]

  grunt.registerTask 'server', [
    'compass:server'
    'browserSync'
    'watch'
  ]

  grunt.registerTask 'build', [
    'compass:dist'
    'copy'
  ]

  grunt.registerTask 'default', ['server']
