import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Shopmon API version 1',
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route unavailable on this server',
  });
});

app.use((err, req, res) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.statusMessage || 'Request unprocessable',
  });
});

app.listen(PORT);

export default app;
