const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '5d96e775787ce63ed4739d72',
  };

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
