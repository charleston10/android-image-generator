var gulp = require('gulp');
const flatMap = require('flat-map').default
const scaleImages = require('gulp-scale-images')

const path = require('path')

const pngWidth = 284
const pngHeight = 160

const twoVariantsPerFile = (file, cb) => {
    const pngFile = file.clone()
    pngFile.scale = { maxWidth: pngWidth, maxHeight: pngHeight, format: 'png' }
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
        .pipe(flatMap(twoVariantsPerFile))
        .pipe(scaleImages(computeFileName))
        .pipe(gulp.dest('drawable-hdpi/'));
});

/*---size img atual----1280 x 720

1.5*1280/240 width
1.5*720/240 heigth


hdpi                240dpi 
scaling factor      1.5px/dp
convert to pixels   1dp * 1.5px/dp = 1.5px
physical size       1.5px/240dpi = 1/160in
*/