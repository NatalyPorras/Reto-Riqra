import { 
    GraphQLObjectType, 
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull } from 'graphql';

import DB from './db';

// const Person = new GraphQLObjectType({
//     name: 'Person',
//     description: 'this represents a Person',
//     fields:() =>{
//         return {
//             id: {
//                 type: GraphQLInt,
//                 resolve(person){
//                     return person.id;
//                 }
//             },
//             firstName: {
//                 type:GraphQLString,
//                 resolve(person) {
//                     return person.firstName;
//                 }
//             },
//             lastName: {
//                 type:GraphQLString,
//                 resolve(person) {
//                     return person.lastName;
//                 }
//             },
//             comentario: {
//                 type: new GraphQLList(Comentario),
//                 resolve(person) {
//                     return person.getComentarios();
//                 }
//             }
//         }
//     }
// });

const Comentario= new GraphQLObjectType({
    name: 'Comentario',
    description: 'this is a Comentario',
    fields: () =>{
        return {
            id: {
                type: GraphQLInt,
                resolve(comentario) { 
                    return comentario.id;
                }
            },
            texto: {
                type: GraphQLString,
                resolve(comentario) {
                    return comentario.texto;
                }
            }
            // person: {
            //     type: Person,
            //     resolve(comentario) {
            //         return comentario.getPerson();
            //     }
            // }
        }
    }
})

const Query = new GraphQLObjectType({
    name:'Query',
    description: 'this is a root query',
    fields: () =>{
        return {
            // people: {
            //     type: new GraphQLList(Person),
            //     args:{
            //         id:{
            //             type: GraphQLInt
            //         }
            //     },
            //     resolve(root, args) {
            //         return DB.models.person.findAll({where: args});
            //     }
            // },
            comentario: {
                type: new GraphQLList(Comentario),
                resolve(root, args) {
                    return DB.models.comentario.findAll({ where:args })
                }
            }

        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Function to create stuff',
    fields() {
        return {
   /*          addPerson: {
                type: Person,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return DB.models.person.create({
                        firstName: args.firstName,
                        lastName: args.lastName
                    })
                }
            }, */
            addComentario: {
                type: Comentario,
                args: {
                    texto: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return DB.models.comentario.create({
                        texto: args.texto
                    })
                }
            },
            deleteComentario: {
                type: Comentario,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, {id}) {
                    return DB.models.comentario.removeAttribute(id)

                
                }
            }
        }
    }
})
const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

export default Schema;