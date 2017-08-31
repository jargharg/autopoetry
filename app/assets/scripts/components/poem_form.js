import React, { Component } from "react"
import { connect } from "react-redux"
import { poemSearch } from "../actions"

class PoemForm extends Component {
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

export default connect(mapStateToProps, { poemSearch })(PoemForm)

// class PoemInput {
//     constructor(poem) {
//         this.poem = poem
//         this.inputButton = $("#inputSubmit")
//         this.inputText = $("#inputText")
//         this.events(this.firstWordSearch)
//         this.inputText.focus()
//     }

//     newWordSearch() {
//         if (this.inputText.val() != "") {
//             this.poem.newPoem(this.inputText.val())
//             this.inputText
//                 .val("")
//                 .removeClass("input-mobile")
//                 .parent()
//                 .removeClass("poem-form__expanded")
//             this.inputButton.blur()
//             $(".edit-mode").removeClass("edit-mode")
//             $("#poemEdit .material-icons").text("mode_edit")
//         } else {
//             this.inputText
//                 .addClass("input-mobile")
//                 .focus()
//                 .parent()
//                 .addClass("poem-form__expanded")
//         }
//     }

//     firstWordSearch() {
//         if (this.inputText.val() != "") {
//             $(".container").removeClass("hidden")
//             $(".app-name").addClass("hidden")
//             $(".poem-form")
//                 .removeClass("poem-form__init")
//                 .addClass("poem-form__bottom")
//             $(".top-nav__name").removeClass("hidden")
//             this.events(this.newWordSearch)
//             this.newWordSearch()
//         } else {
//             this.inputText.focus()
//         }
//     }
// }
