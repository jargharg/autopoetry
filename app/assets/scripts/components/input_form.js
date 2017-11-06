import React, { Component } from "react"
import { connect } from "react-redux"
import { poemSearch } from "../actions"

class InputForm extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.setState({ input: "" })
    }

    submitPoem() {
        if (this.state.input) {
            this.props.poemSearch(this.state.input)
            this.setState({ input: "" })
        }
    }

    inputChange(e) {
        this.setState({ input: e.target.value })
    }

    render() {
        if (this.props.appState === "search") {
            return (
                <div className="poem-form poem-form__init">
                    <img
                        className="app-name"
                        src="assets/images/autopoetry-title-slate.png"
                        alt="AUTOPOETRY"
                    />
                    <input
                        id="inputText"
                        type="text"
                        placeholder="Enter a phrase"
                        autoComplete="off"
                        name="wordSearch"
                        onChange={this.inputChange.bind(this)}
                        onKeyPress={e =>
                            e.which == 13 ? this.submitPoem.call(this) : null}
                    />
                    <input
                        id="inputSubmit"
                        type="submit"
                        value="Make a new poem"
                        onClick={this.submitPoem.bind(this)}
                    />
                </div>
            )
        } else {
            return <div className="hidden" />
        }
    }
}

function mapStateToProps(state) {
    return { appState: state.poem.appState }
}

export default connect(mapStateToProps, { poemSearch })(InputForm)