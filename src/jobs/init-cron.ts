import cron from 'node-cron';
import { tripAnalyticsUsecase } from '../usecase/trip-analytics-usecase';
import { env } from '../environment/environment';

export const initCronJobs = () => {
    if (env.CRON_ENABLED === true) {
        cron.schedule('0 */3 * * *', async () => { // every hour
            console.log('[CRON] Running job every 3 hours...');
            try {
                await tripAnalyticsUsecase.UpdateTripAnalytics();
            } catch (err) {
                console.error('[CRON] Error executing trip analytics update:', err);
            }
        });

        console.log('[CRON] Job scheduled.');
    } else {
        console.log('[CRON] Disabled via .env');
    }
};
