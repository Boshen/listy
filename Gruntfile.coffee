'use strict'
module.exports = (grunt) ->

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  })

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
        cssDir: '.tmp/styles'
        imagesDir: 'images'
      dist:
        options:
          relativeAssets: true
          debugInfo: false
          environment: 'production'
      server:
        options:
          debugInfo: true
          relativeAssets: false
          environment: 'development'

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

    concat:
      options:
        process: (src, filepath) ->
          src.replace /\/\/(.*)sourceMappingURL(.*)/g, '' # remove all source maps
    copy:
      all:
        files: [{
            expand: true
            cwd: 'app'
            dest: 'dist'
            src: [
              'images/*.png'
              'favicon.ico'
              'index.html'
            ]
        }]

    useminPrepare:
      html: 'app/index.html'
      options:
        dest: 'dist'
        flow:
          html:
            steps:
              js: ['concat']
            post: {}

    usemin:
      html: ['dist/index.html']

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
    'useminPrepare'
    'concat:generated'
    'usemin'
  ]

  grunt.registerTask 'default', ['server']
