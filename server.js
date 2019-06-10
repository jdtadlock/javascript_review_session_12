const express = require('express');
const exphbs = require('express-handlebars');
const models = require('./models');

const app = express();
// console.log(models.sequelize);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  models.group.findAll({
    include: models.user
  })
    .then(groups => {
      res.render('index', { group_data: groups });
    });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/groups', (req, res) => {
  const data = req.body;

  models.group.create(data)
    .then(() => {
      res.redirect('/')
    });
});

app.post('/users/:id', (req, res) => {
  const data = req.body;
  const group_id = req.params.id; // 2

  models.group.findByPk(group_id)
    .then(group => {
      group.createUser(data)
        .then(() => res.redirect('/'));
    });

});



app.listen(5000, () => console.log('Listening...'));








// models.sequelize.sync({ force: true })
//   .then(() => {



//     models.group.findByPk(1, {
//       include: models.user
//     })
//       .then(group => {
//         // console.log(group.users);

//         // group.createUser({
//         //   email: 'bob@test.com',
//         //   password: 'pass'
//         // }).then(user => {
//         //   console.log(user.email);
//         // })
//       })


//     // models.group.create({
//     //   name: 'Team Awesome'
//     // }).then(team => {
//     //   team.createUser({
//     //     email: 'jd@test.com',
//     //     password: 'pass'
//     //   }).then(user => {
//     //     console.log(user.email);
//     //   })
//     // });
//     // models.user.create({
//     //   email: 'jd@test.com',
//     //   password: 'password'
//     // }).then(user => {
//     //   console.log(user);
//     // });
//   })











































// const Sequelize = require('sequelize');
// const faker = require('faker');

// const sequelize = new Sequelize(
//   'review_12',
//   'root',
//   '', {
//     // host: 'localhost', // default
//     dialect: 'mysql'
//   });

// const User = sequelize.define('User', {
//   username: {
//     type: Sequelize.STRING
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING
//     // allowNull defaults to true
//   }
// }, {});

// User.sync({ force: false })
//   .then(() => {
//     let data = [];
//     let count = 100;
//     while (count--) {
//       data.push({
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: 'password'
//       });
//     }

//     User.bulkCreate(data).then(new_user => {
//       // console.log(new_user);
//     })
//   });








// db
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });