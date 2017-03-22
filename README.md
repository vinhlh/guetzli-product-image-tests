# Guetzli testing with product images

## Candidates
Original product images

## Compressors
- [guetzli](https://github.com/google/guetzli)
- [mozjpeg](https://github.com/mozilla/mozjpeg)

## Results
Average:
- guetzli: reduce 19%.
- mozjpeg: reduce 41%.

Details:
- https://vinhlh.github.io/guetzli-tests/public/stats/compare_guetzli.html
- https://vinhlh.github.io/guetzli-tests/public/stats/compare_mozjpeg.html

- https://vinhlh.github.io/guetzli-tests/public/stats/compare_guetzli.txt
- https://vinhlh.github.io/guetzli-tests/public/stats/compare_mozjpeg.txt

## Butteraugli scores
- `guetzli` images: ~0.97.
- `mozjpeg` images: 0.

## Read more
- [Guetzli: Perceptually Guided JPEG Encoder](https://arxiv.org/pdf/1703.04421.pdf)
- [Users prefer Guetzli JPEG over same-sized libjpeg](https://arxiv.org/pdf/1703.04416.pdf)
