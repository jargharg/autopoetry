import React, { Component } from "react"
import { connect } from "react-redux"
import { editPoem, refreshLine, refreshPoem } from "../actions"
import PoemLine from "./poem_line"
import PoemControls from "./poem_controls"
import PoemHeader from "./poem_header"

class PoemContainer extends Component {
    constructor() {
        super()
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
                    <PoemHeader />
                    <ul className="poem-body">
                        <div
                            className="poem-body__refresh"
                            id="wholePoemRefresh"
                            onClick={() => this.props.refreshPoem()}
                        >
                            <i className="material-icons md-24">cached</i>
                        </div>
                        {this.renderPoem()}
                    </ul>
                    <PoemControls
                        title={this.props.title}
                        lines={this.props.lines}
                        chosenLines={this.props.chosenLines}
                    />
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
        editMode: state.poem.editMode
    }
}

export default connect(mapStateToProps, {
    editPoem,
    refreshLine,
    refreshPoem
})(PoemContainer)
