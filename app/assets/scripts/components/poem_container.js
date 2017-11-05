import React, { Component } from "react"
import { connect } from "react-redux"
import { editPoem, poemSearch, refreshLine, refreshPoem, editHistory } from "../actions"
import PoemLine from "./poem_line"

class PoemContainer extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        this.setState({
            editModeIcon: "mode_edit",
            undoVis: false,
            redoVis: false
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
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

    renderPoem() {
        if (this.props.appState === "loading") {
            // this won't show as action is dispatched after ajax call is resolved
            // need to trigger immediately after search submit
            return this.renderLoadingDiv()
        } else {
            return this.renderPoemLines()
        }
    }

    renderPoemLines() {
        return this.props.chosenLines.map((chosenLine, index) => (
            <PoemLine
                key={index}
                index={chosenLine}
                content={this.props.lines[chosenLine]}
                onClick={() => this.props.refreshLine(index)}
            />
        ))
    }

    renderLoadingDiv() {
        return (
            <div className="loading-div">
                <span>Loading</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        )
    }

    render() {
        if (this.props.appState !== "search") {
            return (
                <div
                    className={
                        "poem-container" +
                        (this.props.editMode ? " edit-mode" : "")
                    }
                >
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
                        <h1 className="poem-header__title">
                            {" "}
                            {this.props.title}
                        </h1>
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
                    <ul className="poem-body">{this.renderPoem()}</ul>
                </div>
            )
        } else {
            return <div />
        }
    }
}

function mapStateToProps(state) {
    return {
        appState: state.poem.appState,
        title: state.poem.title,
        lines: state.poem.lines,
        chosenLines: state.poem.chosenLines,
        history: state.poem.history,
        editMode: state.poem.editMode
    }
}

export default connect(mapStateToProps, {
    editPoem,
    poemSearch,
    refreshLine,
    refreshPoem,
    editHistory
})(PoemContainer)
