import { Request, Response } from 'express';
import promClient from 'prom-client';


const collectDefaultMetrics = promClient.collectDefaultMetrics


let reqTimer: promClient.Histogram;

let reqCounter: promClient.Counter;

let lokiReqCounter: promClient.Counter;

const metricesCounter = () => {
    reqTimer = new promClient.Histogram({
        name: 'request_duration_seconds',
        help: 'Duration of HTTP requests in seconds',
        labelNames: ['method', 'route', 'statusCode'],
        buckets: [0.1, 0.5, 1, 2.5, 5, 10, 30, 60, 120, 300, 600, 1800, 3600]
    })
    reqCounter = new promClient.Counter({
        name: 'request_count',
        help: 'Total number of HTTP requests',
    })
    lokiReqCounter = new promClient.Counter({
        name: 'loki_request_count',
        help: 'Total number of Loki requests',
    })

    return {
        reqTimer,
        reqCounter,
        lokiReqCounter
    }
}

const metricesCounterObserver = (req: Request, res: Response, time: number) => {
    // customLogger(`req.path - in metricesCounterObserver`);
    
    if (req.path === '/metrics') {
        lokiReqCounter.inc()
    } else {
        reqCounter.inc()
    }
    reqTimer
        .labels({
            method: req.method,
            route: req.path,
            statusCode: res.statusCode
        })
        .observe(time)
}


export const GrafanaMetrics = {
    metricesCounter,
    collectDefaultMetrics,
    promClient,
    metricesCounterObserver
}