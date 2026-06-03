const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const errorMiddleware = require('./middleware/error.middleware');
const notFoundMiddleware = require('./middleware/notFound.middleware');

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
const onboardingRoutes = require('./modules/onboarding/onboarding.routes');
const roadmapRoutes = require('./modules/roadmap/roadmap.routes');
const journeyRoutes = require('./modules/journey/journey.routes');
const journalRoutes = require('./modules/journal/journal.routes');
const cardsRoutes = require('./modules/cards/cards.routes');
const aiRoutes = require('./modules/ai/ai.routes');
const notificationsRoutes = require('./modules/notifications/notifications.routes');

const app = express();
const apiV1 = express.Router();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

apiV1.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'YOU API',
    version: 'v1',
  });
});

apiV1.use('/auth', authRoutes);
apiV1.use('/users', userRoutes);
apiV1.use('/onboarding', onboardingRoutes);
apiV1.use('/roadmaps', roadmapRoutes);
apiV1.use('/journey', journeyRoutes);
apiV1.use('/journals', journalRoutes);
apiV1.use('/cards', cardsRoutes);
apiV1.use('/ai', aiRoutes);
apiV1.use('/notifications', notificationsRoutes);

app.use('/api/v1', apiV1);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

