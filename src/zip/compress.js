import {createGzip} from 'node:zlib'
import {createReadStream, createWriteStream} from 'node:fs'
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'

const FOLDER_NAME = 'files'
const FILE_NAME = 'fileToCompress.txt'
const COMPRESS_FILE = 'archive.gz'
const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename);
const input = path.join(__dirname, path.sep, FOLDER_NAME, path.sep, FILE_NAME)
const output = path.join(__dirname, path.sep, FOLDER_NAME, path.sep, COMPRESS_FILE)


const compress = async () => {
    try {
        const gzip = createGzip()
        const readStream = createReadStream(input)
        const writeStream = createWriteStream(output)

        readStream.pipe(gzip).pipe(writeStream)
    } catch (e) {
        throw e
    }
};

await compress();