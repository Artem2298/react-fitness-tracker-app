const express = require('express');
const cors = require('cors');
const userRout = require('./routes/userRoutes');
const trainingRout = require('./routes/trainingRoutes');
const commentRoutes = require('./routes/commentRoutes');
const followRoutes = require('./routes/followRoutes');


const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/users', userRout)
app.use('/training', trainingRout)
app.use('/comments', commentRoutes);
app.use('/follows', followRoutes);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
