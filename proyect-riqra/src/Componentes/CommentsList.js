import React, { Component } from 'react';
import { graphql, compose} from 'react-apollo';
import { getComentariosQuery , removeComentariosMutation } from '../Queries/queries';
import './CommentList.css';

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
                    <div key={id} className="list">
                        <p>{comentario.texto}</p>
                        {/* <button name={id} onClick={this.handleButtonDeleteComment}> Delete </button> */}
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div id='Comment-List' className="list-comment">
                <h3>Comentarios</h3>
                {this.displayComments()}
            </div>
        )
    }
}

export default compose(
    graphql(getComentariosQuery , {name: "getComentariosQuery"}),
    graphql(removeComentariosMutation,{name: "removeComentariosMutation"})
)(CommentList);