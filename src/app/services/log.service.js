import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";



function init() {
    Sentry.init({
        dsn: "https://4c598c141ae3453b86912169743b6d4e@o1061604.ingest.sentry.io/6052000",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error)
}

const logger = {
    init,
    log
}

export default logger;