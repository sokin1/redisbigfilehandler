var fs = require('fs')
var redis = require('redis')
var redisWStream = require('redis-wstream')
var domain = require('domain')

const splitFile = require('split-file')

var client = redis.createClient()

const stats = fs.statSync('./android-studio.dmg')
const fsize = stats.size

const numSplit = fsize / ( 400 * 1024 * 1024 )


splitFile.splitFile('./android-studio.dmg', numSplit+1)
    .then(files => {
        files.forEach(file => {
            var readStream = fs.createReadStream('./' + file, {encoding: 'base64'})
            readStream.pipe(redisWStream(client, '102938_part' + file.charAt(file.length-1)))
            .on('end', () => {
                console.log('done')
            })
        })
    })
// var d = domain.create()

// var readStream = fs.createReadStream('./android-studio.dmg', {encoding: 'base64'})

// d.on('error', err => {
//     console.error(err)
// }).run(() => {
//     readStream
//         .pipe(redisWStream(client, '102938'))
//         .on('end', () => {
//             console.log('done')
//         })
// })