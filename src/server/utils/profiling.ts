import { Session } from 'node:inspector/promises';
import { Readable } from 'stream';
import { formatISO } from 'date-fns';
import { logError, logInfo } from './logging';
import { streamToS3 } from './S3';
import { getSsmValue } from './ssm';

const bucket = 'gu-reader-revenue-private';
const stage = process.env.stage ?? 'CODE';
const intervalInMilliseconds = 60 * 5 * 1000; // 5 mins

interface ProfilerConfig {
    enableHeapProfiling: boolean;
}

// Periodically checks config in Parameter Store to see if profiling is enabled, and if so takes a heap snapshot and writes it to S3
export class Profiler {
    constructor() {
        this.run();
    }

    run() {
        // first check if profiling is enabled
        void getSsmValue(stage, 'profiling')
            .then((ssmValue) => {
                if (ssmValue) {
                    const config = JSON.parse(ssmValue) as ProfilerConfig;
                    if (config.enableHeapProfiling) {
                        return this.takeHeapProfile();
                    }
                }
            })
            .catch((error) => {
                logError(`Error profiling: ${error}`);
            })
            .finally(() => {
                setTimeout(() => {
                    void this.run();
                }, intervalInMilliseconds);
            });
    }

    // Takes a heap snapshot and streams the result to S3
    async takeHeapProfile() {
        const session = new Session();
        const stream = new Readable();
        const key = `support-dotcom-components/heapSnapshots/${stage}/${formatISO(new Date())}.heapsnapshot`;

        const upload = streamToS3(bucket, key, stream);

        session.connect();
        session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
            stream.push(m.params.chunk);
        });

        logInfo('Taking heap snapshot');
        await session.post('HeapProfiler.takeHeapSnapshot');

        stream.push(null); // end the stream
        session.disconnect(); // end the profiling session

        await upload.promise();
        logInfo(`Finished uploading heap snapshot to S3 with key: ${key}`);
    }
}
