const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3002)
app.locals.title='Rancid API';

app.get('/', (request, response) => {
  response.send('Hello there')
})

app.listen(app.get('port'), () => {
  console.log(`app is running port ${app.get("port")}`);
})

app.locals.comments = [
  {
    id: 1,
    author: 'Donatello',
    comment: 'Radical!',
    movie_id: 501907
  },
  {
    id: 2,
    author: 'Leonardo',
    comment: `I can't believe I wasted my time on this.`,
    movie_id: 565743
  },
  {
    id: 3,
    author: 'Michelangelo',
    comment: 'Hilarious!',
    movie_id: 663459
  },
  {
    id: 4,
    author: 'Raphael',
    comment: 'It was fine, I guess.',
    movie_id: 338762
  }
]

app.locals.favorites = []

app.get('/api/v1/movies/comments', (request, response) => {
  const comments = app.locals.comments;
    for (let requiredInput of ['author', 'comment', 'movie_id']) {
      if(!comments[requiredInput]) {
        return response
          .status(422)
          .json({error: `You are missing a ${requiredInput}. Expected format: { author: <String>, comment: <String>, movie_id: <Integer> }`});
      }
  }
  response.status(200).json({ comments });
})

app.post('/api/v1/movies/comments', (request, response) => {
  const comments = request.body;
  const {author, comment, movie_id, id} = comments
  app.locals.comments.push({author, comment, movie_id, id})
  response.status(201).json({author, comment, movie_id, id});
})


// app.delete('/api/v1/comments/:id', (request, response) => {
//   const commentID = Number(request.params.id)

//   let commentToDelete = app.locals.comments.find(comment => comment.id === commentID)
  
//   const indexOfComment = app.locals.comments.indexOf(commentToDelete)

//   app.locals.comments.splice(indexOfComment, 1)

//   response.json({ message: `Comment ${commentToDelete.commentID} has been deleted.`})
// })






