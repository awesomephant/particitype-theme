module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      options: {
        livereload: false
      },
      css: {
        files: ["sass/*.scss"],
        tasks: ["css"]
      }
    },
    sass: {
      dist: {
        options: {},
        files: {
          "./style.css": "sass/style.scss",
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({ browsers: "last 2 versions" }),
          require("cssnano")() // minify the result
        ]
      },
      dist: {
        src: "./style.css"
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: ["**/*.{twig,php,css}"]
        },
        options: {
          proxy: "particitype.test",
          watchTask: true
        }
      }
    },

  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browser-sync");

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-postcss");

  grunt.registerTask("css", ["sass", "postcss"]);
  grunt.registerTask("up", ["browserSync", "watch"]);
};
