import React, { Component } from "react"
import { connect } from "react-redux"
import { editPoem, refreshLine } from "../actions"
import PoemLine from "./poem_line"
import ShareLinks from "./share_links"
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
                    <ul className="poem-body">{this.renderPoem()}</ul>
                    <ShareLinks
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
    refreshLine
})(PoemContainer)
