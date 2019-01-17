import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

const Conn = new Sequelize('comentario', 'root', '', {
        host:'127.0.0.1',
        dialect: 'mysql',
        port: '3306',
        operatorsAliases: false,

        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
    });

// Conn
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// const Person = Conn.define('person',{
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })
const Comentario = Conn.define('comentario',{
     texto: {
         type: Sequelize.STRING,
         allowNull: false
     }
});

// //RelationShi`p
// Person.hasMany(Comentario);
// Comentario.belongsTo(Person);

Conn.sync({ force: true }).then(()=> {
    return Comentario.create({
        texto: 'Primer comentario desde la base de datos',
    })
        // .then(person =>{
        //     return person.createComentario({
        //         texto:'This is a sample article'
        //     });
        // });
});

export default Conn;