import { serve } from 'inngest/next';
import { reactivationCron } from '@/lib/inngest/reactivation-cron';
import { inngest } from '@/lib/inngest/client';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [reactivationCron],
});
