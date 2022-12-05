import {Worker} from 'node:worker_threads'
import {cpus} from 'os'
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const worker_path = path.join(__dirname, path.sep, 'worker.js')

const performCalculations = async () => {
    let number = 10
    const currentCpus = cpus()

    const promises = currentCpus.map(() => (
        new Promise((resolve, reject) => {
            const worker = new Worker(worker_path, {
                workerData: number++
            })

            worker.on('message', message => resolve(message))
            worker.on('error', message => reject(message))
            worker.on('exit', code => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
            })
        })
    ))

    const workerResults = await Promise.allSettled(promises)

    const results = workerResults.map(({status, value}) => ({
        status: status === 'fulfilled' ? 'resolved' : 'error',
        data: status === 'fulfilled' ? value : null
    }))

    console.log(results)

    return results
};

await performCalculations()