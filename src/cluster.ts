const os = require('os')
const cluster = require('cluster')

const runPrimaryProcess = () => {
    const processesCount = os.cpus().length
    console.log(`Primary ${process.pid} is running`)
    console.log(`Forking Server with ${processesCount} process \n`)

    for(let index = 0; index < processesCount; index++);
}

const runWorkerProcess = async () => {
    await import('./main')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()