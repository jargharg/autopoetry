import React, { Component } from "react"
import { connect } from "react-redux"
import { editPoem, refreshPoem, editHistory } from "../actions"

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
                <span className="poem-header__controls poem-header__controls--left">
                    <span
                        className="poem-header__icon"
                        id="wholePoemRefresh"
                        onClick={() => this.props.refreshPoem()}
                    >
                        <i className="material-icons md-48">cached</i>
                    </span>
                </span>
                <h1 className="poem-header__title"> {this.props.title}</h1>
                <span className="poem-header__controls poem-header__controls--right">
                    <span
                        className={
                            "poem-header__icon" +
                            (this.state.undoVis ? "" : " hidden")
                        }
                        onClick={() => this.props.editHistory("undo")}
                    >
                        <i className="material-icons md-48">undo</i>
                    </span>
                    <span
                        className={
                            "poem-header__icon" +
                            (this.state.redoVis ? "" : " hidden")
                        }
                        onClick={() => this.props.editHistory("redo")}
                    >
                        <i className="material-icons md-48">redo</i>
                    </span>&nbsp;
                    <span
                        className="poem-header__icon"
                        id="poemEdit"
                        onClick={() => this.props.editPoem()}
                    >
                        <i className="material-icons md-48">
                            {this.state.editModeIcon}
                        </i>
                    </span>
                </span>
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
    refreshPoem,
    editHistory
})(PoemHeader)
