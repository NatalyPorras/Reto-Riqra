import { gql } from 'apollo-boost';

const getComentariosQuery = gql`
    {
        comentario{
            texto
        }
    }
`
const addComentariosMutation = gql `
    mutation($texto : String!) {
        addComentario( texto: $texto){
            texto
            id
        }
    }
`

const removeComentariosMutation = gql `
    mutation($id: String!) {
        deleteComentario(id: $id) {
            id
        }
    } 
`

export { getComentariosQuery, addComentariosMutation , removeComentariosMutation }