const { exec } = require('child_process')

const webpack = exec('yarn webpack -w --config=webpack.config.js')
const nodemon = exec('yarn nodemon startServer.js --ignore src/front')

webpack.stdout.on('data', data => {
  console.log(data)
})

webpack.stderr.on('data', data => {
  console.log(`webpack error: ${data}`)
})

webpack.on('close', code => {
  console.log(`webpack process exited with code ${code}`)
})

nodemon.stdout.on('data', data => {
  console.log(data)
})

nodemon.stderr.on('data', data => {
  console.log(`nodemon error: ${data}`)
})

nodemon.on('close', code => {
  console.log(`nodemon process exited with code ${code}`)
})
