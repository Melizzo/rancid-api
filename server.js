const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3002)
app.locals.title='Rancid API';

app.get('/', (request, response) => {
  response.send('Hello there')
})

app.listen(app.get('port'), () => {
  console.log(`app is running port ${app.get("port")}`);
})



app.locals.favorites = []

app.get('/api/v1/favorites', (request, response) => {
  const favorites = app.locals.favorites
  response.json( {favorites })
})
