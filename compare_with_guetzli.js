const fs = require('fs')
const pad = require('pad')
const { exec } = require('child_process')

const IMAGE_DIR = './images'
const DEST_DIR = './guetzli_images'
const OUTPUT = 'public/stats/compare_guetzli.html'

const template = fs.readFileSync('template.html', 'utf8');

const values = []
let beforeSize = 0
let afterSize = 0
let html = ''
const createHtml = html => template.replace('{body}', html)
const createImg = src => `<img src="../../${src}"/>`
const createContainer = (col, col2) =>
  `<div class="container">${col}${col2}</div>`

const createDesc = (col, col2) =>
    `<div class="desc">Before: ${col}, After: ${col2}</div>`

let errorCount = 0

fs.readdir(IMAGE_DIR, (err, images) => {
  images.forEach(image => {
    const [name, ext] = image.split('.')
    const fromFile = `${IMAGE_DIR}/${image}`
    fs.stat(fromFile, (statErr, { size }) => {
      const toFile = `${DEST_DIR}/${name}.jpg`
      fs.stat(toFile, (err, stats) => {
        if (err) {
          errorCount++
          return
        }
        const percent = Math.round(stats.size * 100 / size - 100)
        console.log(pad(image, 60), size, stats.size, percent, '%')
        values.push(percent)
        beforeSize += size
        afterSize += stats.size

        html += createContainer(createImg(fromFile), createImg(toFile))
        html += createDesc(
          Math.round(size / 10) / 100 + 'KB',
          Math.round(stats.size / 10) / 100 + 'KB (' + (percent > 0 ? '+' + percent : percent) + '% )'
        )

        if (images.length <= values.length + errorCount) {
          console.log('AVG %', Math.round(values.reduce((total, value) => total + value, 0) / values.length))
          console.log('Size difference', beforeSize, afterSize, afterSize - beforeSize)

          fs.writeFile(OUTPUT, createHtml(html))
        }
      })
    })
  })
})
