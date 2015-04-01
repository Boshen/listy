'use strict'
module.exports = (grunt) ->

  require('jit-grunt')(grunt)

  grunt.initConfig

    watch:
      compass:
        files: [
          'app/styles/**/*.scss'
        ]
        tasks: ['compass:server', 'autoprefixer:server']

    browserSync:
      dev:
        bsFiles:
          src: [
            '.tmp/styles/main.css'
            'app/**/*.js'
            'app/**/*.html'
            'app/**/*.png'
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
        cssDir: '.tmp/styles'
      dist: {}
      server:
        options:
          debugInfo: true
          relativeAssets: false

    autoprefixer:
      options:
        browsers: ['last 5 versions', 'ie >= 10', 'Firefox >= 31', 'Firefox ESR', 'Safari >= 7']
      dist:
        files: [{
          expand: true
          cwd: '.tmp/styles/'
          src: 'main.css'
          dest: 'dist/styles/'
        }]
      server:
        files: [{
          expand: true
          cwd: '.tmp/styles/'
          src: 'main.css'
          dest: '.tmp/styles/'
        }]

    copy:
      all:
        files: [{
            expand: true
            cwd: 'app'
            dest: 'dist'
            src: [
              'app.js'
              'images/*.png'
              'favicon.ico'
              'index.html'
              "components/angular/angular.min.js"
              "components/angular/angular.min.js.map"
              "components/angular-elastic/elastic.js"
              "components/firebase/firebase.js"
              "components/angularfire/dist/angularfire.min.js"
            ]
        }]

  grunt.registerTask 'server', [
    'compass:server'
    'autoprefixer:server'
    'browserSync'
    'watch'
  ]

  grunt.registerTask 'build', [
    'compass:dist'
    'autoprefixer:dist'
    'copy'
  ]

  grunt.registerTask 'default', ['server']
