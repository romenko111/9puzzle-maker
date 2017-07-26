const program = require('commander')
const Jimp = require('jimp')
const path = require('path')

program.parse(process.argv)
const filePath = program.args[0]
const split = program.args[1] ? Number(program.args[1]) : 9

if (!isSquare(split)) {
    throw new Error('平方数を指定してください')
}

Jimp.read(filePath).then((image)=> {
    const row = Math.sqrt(split)
    const column = row
    const width = image.bitmap.width / column
    const height = image.bitmap.height / row

    for(let i = 0; i < row; i++) {
        for(let j = 0; j < column; j++) {
            const writeFile = path.join(path.dirname(filePath), `${i * row + j + 1}.png`)
            image.clone().crop(
                j * width,
                i * height,
                width,
                height
            ).write(writeFile)
            console.log(writeFile)
        }
    }
})

function isSquare(n) {
    const sqrt = Number(Math.sqrt(n))
    return sqrt * sqrt === n
}
