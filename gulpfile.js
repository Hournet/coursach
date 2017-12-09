var gulp = require('gulp'), // Подключаем Gulp
sass = require('gulp-sass'), //Подключаем Sass пакет,
browserSync = require('browser-sync'), // Подключаем Browser Sync
plumber = require('gulp-plumber');

gulp.task('sass', function () { // Создаем таск Sass
return gulp.src('app/sass/**/*.sass') // Берем источник
    .pipe(plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({
        stream: true
    })); // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
        baseDir: 'app' // Директория для сервера - app
    },
    notify: false // Отключаем уведомления
});
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами
gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
// Наблюдение за другими типами файлов
});


gulp.task('build', ['sass', 'scripts'], function () {

var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/css/main.css',
        'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css'));

var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'));

var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'));

var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});