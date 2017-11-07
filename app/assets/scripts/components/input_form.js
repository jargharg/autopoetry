import React, { Component } from "react"
import { connect } from "react-redux"
import { poemSearch } from "../actions"

class InputForm extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
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
                <form
                    className="input-form"
                    onSubmit={e => {
                        e.preventDefault()
                        this.submitPoem.call(this)
                    }}
                >
                    <input
                        type="text"
                        placeholder="Enter a phrase"
                        autoComplete="off"
                        onChange={this.inputChange.bind(this)}
                    />
                    <input
                        type="submit"
                        value="Make a new poem"
                        className={
                            this.state.input ? "" : "input-form__submit-hidden"
                        }
                    />
                </form>
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
