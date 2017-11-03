import React, { Component } from "react"
import { connect } from "react-redux"
import { poemEdit, poemSearch } from "../actions"

class PoemContainer extends Component {
    constructor() {
        super()
    }

    poemEdit() {
        console.log("edit mode!!!")
    }

    renderPoem() {
        if (this.props.appState === "loading") {
            // this won't show as action is dispatched after ajax call is resolved
            // need to trigger immediately after search submit
            return this.renderLoadingDiv()
        } else {
            //console.log("props", this.props)
            return (
                <div>
                    {this.props.chosenLines.map(line => (
                        <li key={line.index}>{line.content}</li>
                    ))}
                </div>
            )
        }
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
        if (this.props.appState === "poem") {
            return (
                <div className="poem-container">
                    <div className="poem-header">
                        <span
                            className="poem-header__icon"
                            id="wholePoemRefresh"
                        >
                            <i className="material-icons md-48">&#xE86A;</i>
                        </span>
                        <h1 className="poem-header__title">
                            {" "}
                            {this.props.title}
                        </h1>
                        <span
                            className="poem-header__icon"
                            id="poemEdit"
                            onClick={this.poemEdit.bind(this)}
                        >
                            <i className="material-icons md-48">mode_edit</i>
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
        chosenLines: state.poem.chosenLines
    }
}

export default connect(mapStateToProps, { poemEdit, poemSearch })(PoemContainer)

///////to be coded up top
class Poem {
    constructor() {
        this.currentPoemData = {}
        this.poemBody = $(".poem-body")
        this.poemControls = new PoemControls(this)
        this.shareLinks = new ShareLinks()
        this.poemMethods = new PoemMethods()
    }
}
