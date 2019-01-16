import React, { Component } from 'react';
import { graphql,compose } from 'react-apollo';
import { getComentariosQuery , addComentariosMutation } from '../Queries/queries';

class AddComments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'Escribe un comentario .... '
        }
    }

    handleInputComment = (e) =>{
        this.setState({ text: e.target.value});
    }
    handleButtonComment = (e) =>{
        e.preventDefault();
        this.props.addComentariosMutation({
            variables: {
                texto: this.state.text
            },
            refetchQueries: [{ query:getComentariosQuery }]
        });
    }
    render() {
        return (
          <div id="add-book">
            <textarea type="text" value={this.state.text} onChange={this.handleInputComment} />
            <button onClick={this.handleButtonComment}>Comentar</button>
          </div>
        )
    }
}

export default compose(
    graphql(addComentariosMutation,{name: "addComentariosMutation"})
)(AddComments);