var fs = require('fs')
var redis = require('redis')
var redisRStream = require('redis-rstream')
var domain = require('domain')
var B64 = require('b64')

// var Readable = require('stream').Readable

var client = redis.createClient()

// var d = domain.create()

// d.on('error', err => {
//     console.error(err)
// }).run(() => {
//     redisRStream(client, '102938')
//         .pipe(writeStream)
// })

// var files = ['android-studio.dmg.sf-part1', 'android-studio.dmg.sf-part2', 'android-studio.dmg.sf-part3']
// for(i = 1; i <= 3; i++) {
//     var writeStream = fs.createWriteStream('./received_part' + i)
//     redisRStream(client, '102938_part' + i)
//     .pipe(writeStream)
// }

// var convertToBinary = fs.readFile('./received_part1', (err, data) => {
//     var decodedFile = new Buffer(data, 'base64').toString()
//     fs.writeFile('./received_part_decoded1', decodedFile, err => {
//         console.log('done')
//     })
// })

const stream = fs.createReadStream('./received_part1')
const decoder = new B64.Decoder()

stream.pipe(decoder).pipe(fs.createWriteStream('./received_part_decoded1'))