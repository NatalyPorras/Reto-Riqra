import React, { Component } from 'react';
import { graphql, compose} from 'react-apollo';
import { getComentariosQuery , removeComentariosMutation } from '../Queries/queries';
class CommentList extends Component {

    constructor(props) {
        super(props)
        this.state ={
            id: ""
        }
    }

    handleButtonDeleteComment = (e) =>{
        e.preventDefault();
        this.setState({id:e.target.name})
        console.log(this.state.id);

        this.props.removeComentariosMutation({
            variables: {
                id: this.state.id
            },
            refetchQueries: [{ query:getComentariosQuery }]
        });
    }
    
    displayComments = () =>{
        const data=this.props.getComentariosQuery;
        
        if(data.loading){
            return (<div>Loading Comentarios</div>)
        }else {
            return data.comentario.map((comentario,id) =>{
                return (
                    <div key={id}>
                        <p>{comentario.texto}</p>
                        <button name={id} onClick={this.handleButtonDeleteComment}> Delete </button>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <div id='Comment-List'>
                    {this.displayComments()}
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(getComentariosQuery , {name: "getComentariosQuery"}),
    graphql(removeComentariosMutation,{name: "removeComentariosMutation"})
)(CommentList);