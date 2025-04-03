import express from 'express';
import connection from './db.js';
import categorieRoute from './routes/CategorieRoute.js';

connection.sync()
.then(() => {
  console.log('Database connected successfully');
}
).catch((err) => {
  console.error('Unable to connect to the database:', err);
}
);

const app = express();
app.use(express.json());

app.use(categorieRoute);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
}
);