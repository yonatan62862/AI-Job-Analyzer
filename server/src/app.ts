import express from 'express';
import cors from 'cors';
import dashboardRoute from './routes/dashboardRoute';
import kpiRoute from './routes/kpiRoute';
import assistantRoute from './routes/assistantRoute';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/dashboard', dashboardRoute);
app.use('/api/kpi', kpiRoute);
app.use("/api/chat", assistantRoute);


export default app;
