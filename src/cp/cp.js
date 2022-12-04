import {fork} from 'node:child_process'
import {fileURLToPath} from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename);
const filepath = path.join(__dirname,'files','script.js')

const spawnChildProcess = async (args) => {
    const childProcess = fork( filepath, [...args.split(' ')], { silent: true })

    process.stdin.on('data', (data) => {
        childProcess.stdin.write(data)
    })

    childProcess.stdout.on('data', (data) => {
        console.log(data.toString())
    });
};

spawnChildProcess('--version');