const express = require('express');
const cors = require('cors');
const config = require('./config');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// ─── Middleware ──────────────────────────────────────────────
app.use(cors({
    origin: config.frontendUrl,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '1mb' }));

// ─── Request Logger ─────────────────────────────────────────
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ─── Routes ─────────────────────────────────────────────────
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        model: config.hfModel,
        spaceUrl: config.hfSpaceUrl || 'not configured',
    });
});

// ─── 404 Handler ────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// ─── Error Handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('[Server Error]', err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ───────────────────────────────────────────
if (require.main === module) {
    app.listen(config.port, () => {
        console.log('');
        console.log('╔══════════════════════════════════════════════╗');
        console.log('║       AI Assistant Backend — Running         ║');
        console.log('╠══════════════════════════════════════════════╣');
        console.log(`║  Port:     ${String(config.port).padEnd(33)}║`);
        console.log(`║  Model:    ${config.hfModel.substring(0, 33).padEnd(33)}║`);
        console.log(`║  Space:    ${(config.hfSpaceUrl || 'not configured').substring(0, 33).padEnd(33)}║`);
        console.log('╚══════════════════════════════════════════════╝');
        console.log('');
    });
}

module.exports = app;
