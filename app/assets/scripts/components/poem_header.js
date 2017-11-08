import React, { Component } from "react"
import { connect } from "react-redux"
import { editPoem, editHistory } from "../actions"

class PoemHeader extends Component {
    componentWillMount() {
        this.setState({
            editModeIcon: "mode_edit",
            undoVis: false,
            redoVis: false
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editMode) {
            this.setState({ editModeIcon: "done" })
            if (nextProps.history.prev.length > 0) {
                this.setState({ undoVis: true })
            } else {
                this.setState({ undoVis: false })
            }
            if (nextProps.history.next.length > 0) {
                this.setState({ redoVis: true })
            } else {
                this.setState({ redoVis: false })
            }
        } else {
            this.setState({
                editModeIcon: "mode_edit",
                undoVis: false,
                redoVis: false
            })
        }
    }

    render() {
        return (
            <div className="poem-header">
                <h1 className="poem-header__title"> {this.props.title}</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        title: state.poem.title,
        history: state.poem.history,
        editMode: state.poem.editMode
    }
}

export default connect(mapStateToProps, {
    editPoem,
    editHistory
})(PoemHeader)
