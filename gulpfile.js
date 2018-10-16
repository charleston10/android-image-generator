var gulp = require('gulp');
const flatMap = require('flat-map').default
const scaleImages = require('gulp-scale-images')
const path = require('path')


const pngWidth = 284
const pngHeight = 160

const mdpiScale = (file, cb) => {
    const pngFile = file.clone()
    pngFile.scale = { maxWidth: pngWidth, maxHeight: pngHeight, format: 'png' }
    cb(null, [pngFile])
}
const hdpiScale = (file, cb) => {
    const pngFile = file.clone()
    pngFile.scale = { maxWidth: Math.floor(pngWidth * 1.5), maxHeight: Math.floor(pngHeight * 1.5), format: 'png' }
    cb(null, [pngFile])
}
const xhdpiScale = (file, cb) => {
    const pngFile = file.clone()
    pngFile.scale = { maxWidth: Math.floor(pngWidth * 2), maxHeight: Math.floor(pngHeight * 2), format: 'png' }
    cb(null, [pngFile])
}
const xxhdpiScale = (file, cb) => {
    const pngFile = file.clone()
    pngFile.scale = { maxWidth: Math.floor(pngWidth * 3), maxHeight: Math.floor(pngHeight * 3), format: 'png' }
    cb(null, [pngFile])
}

const computeFileName = (output, scale, cb) => {
    const fileName = [
        path.basename(output.path, output.extname), // strip extension
    ].join('.')
    cb(null, fileName)
}

gulp.task('default', function () {
    gulp.src('foo_images/*.{jpeg,jpg,png,gif}')
        .pipe(flatMap(mdpiScale))
        .pipe(scaleImages(computeFileName))
        .pipe(gulp.dest('drawable-mdpi/'));
    gulp.src('foo_images/*.{jpeg,jpg,png,gif}')
        .pipe(flatMap(hdpiScale))
        .pipe(scaleImages(computeFileName))
        .pipe(gulp.dest('drawable-hdpi/'));
    gulp.src('foo_images/*.{jpeg,jpg,png,gif}')
        .pipe(flatMap(xhdpiScale))
        .pipe(scaleImages(computeFileName))
        .pipe(gulp.dest('drawable-xhdpi/'));
    gulp.src('foo_images/*.{jpeg,jpg,png,gif}')
        .pipe(flatMap(xxhdpiScale))
        .pipe(scaleImages(computeFileName))
        .pipe(gulp.dest('drawable-xxhdpi/'));
});

/*---size img atual----1280 x 720

1.5*1280/240 width
1.5*720/240 heigth


hdpi                240dpi 
scaling factor      1.5px/dp
convert to pixels   1dp * 1.5px/dp = 1.5px
physical size       1.5px/240dpi = 1/160in
*/