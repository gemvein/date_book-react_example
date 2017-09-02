/*******************************
 Set-up
 *******************************/

var
    gulp         = require('gulp-help')(require('gulp')),

    // read user config to know what task to load
    config       = require('./src/semantic/tasks/config/user'),

    // watch changes
    watch        = require('./src/semantic/tasks/watch'),

    // build all files
    build        = require('./src/semantic/tasks/build'),
    buildJS      = require('./src/semantic/tasks/build/javascript'),
    buildCSS     = require('./src/semantic/tasks/build/css'),
    buildAssets  = require('./src/semantic/tasks/build/assets'),

    // utility
    clean        = require('./src/semantic/tasks/clean'),
    version      = require('./src/semantic/tasks/version'),

    // docs tasks
    serveDocs    = require('./src/semantic/tasks/docs/serve'),
    buildDocs    = require('./src/semantic/tasks/docs/build'),

    // rtl
    buildRTL     = require('./src/semantic/tasks/rtl/build'),
    watchRTL     = require('./src/semantic/tasks/rtl/watch')
;


/*******************************
 Tasks
 *******************************/

gulp.task('default', false, [
  'watch'
]);

gulp.task('watch', 'Watch for site/theme changes', watch);

gulp.task('build', 'Builds all files from source', build);
gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
gulp.task('build-css', 'Builds all css from source', buildCSS);
gulp.task('build-assets', 'Copies all assets from source', buildAssets);

gulp.task('clean', 'Clean dist folder', clean);
gulp.task('version', 'Displays current version of Semantic', version);

/*--------------
 Docs
 ---------------*/

/*
 Lets you serve files to a local documentation instance
 https://github.com/Semantic-Org/Semantic-UI-Docs/
 */

gulp.task('serve-docs', 'Serve file changes to SUI Docs', serveDocs);
gulp.task('build-docs', 'Build all files and add to SUI Docs', buildDocs);


/*--------------
 RTL
 ---------------*/

if(config.rtl) {
  gulp.task('watch-rtl', 'Watch files as RTL', watchRTL);
  gulp.task('build-rtl', 'Build all files as RTL', buildRTL);
}