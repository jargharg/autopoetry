import React, { Component } from "react"
import { connect } from "react-redux"
import { editPoem, editHistory, newPoem } from "../actions"

class PoemControls extends Component {
    componentWillMount() {
        this.setState({
            editModeIcon: "mode_edit",
            newPoemClass: "",
            undoClass: " poem-controls__icon--hidden",
            redoClass: " poem-controls__icon--hidden"
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editMode) {
            this.setState({ editModeIcon: "done" })
            this.setState({ newPoemClass: " poem-controls__icon--hidden" })
            nextProps.history.prev.length > 0
                ? this.setState({ undoClass: "" })
                : this.setState({ undoClass: " poem-controls__icon--hidden" })
            nextProps.history.next.length > 0
                ? this.setState({ redoClass: "" })
                : this.setState({ redoClass: " poem-controls__icon--hidden" })
        } else {
            this.setState({
                editModeIcon: "mode_edit",
                newPoemClass: "",
                undoClass: " poem-controls__icon--hidden",
                redoClass: " poem-controls__icon--hidden"
            })
        }
    }

    render() {
        return (
            <div className="poem-controls">
                <a
                    className="poem-controls__icon"
                    href={shareLink(
                        this.props.title,
                        this.props.lines,
                        this.props.chosenLines
                    )}
                >
                    <i className="material-icons md-48">share</i>
                </a>
                <span>
                    <span
                        className={"poem-controls__icon" + this.state.undoClass}
                        onClick={() => this.props.editHistory("undo")}
                    >
                        <i className="material-icons md-48">undo</i>
                    </span>
                    <span
                        className={
                            "poem-controls__icon" + this.state.newPoemClass
                        }
                        onClick={() => this.props.newPoem()}
                    >
                        <i className="material-icons md-48">refresh</i>
                    </span>
                    <span
                        className={"poem-controls__icon" + this.state.redoClass}
                        onClick={() => this.props.editHistory("redo")}
                    >
                        <i className="material-icons md-48">redo</i>
                    </span>
                </span>
                <span
                    className="poem-controls__icon"
                    id="poemEdit"
                    onClick={() => this.props.editPoem()}
                >
                    <i className="material-icons md-48">
                        {this.state.editModeIcon}
                    </i>
                </span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        title: state.poem.title,
        history: state.poem.history,
        lines: state.poem.lines,
        chosenLines: state.poem.chosenLines,
        editMode: state.poem.editMode
    }
}

export default connect(mapStateToProps, {
    editPoem,
    editHistory,
    newPoem
})(PoemControls)

//////////////////////////////////
//      PRIVATE FUNCTIONS       //
//////////////////////////////////

function shareLink(title, lines, chosenLines) {
    const whatsAppPre = "whatsapp://send?text="
    const whatsAppPost =
        "\nMake your own autopoem at jarodhargreav.es/autopoetry"

    let poemText = `${title.toUpperCase()}\n\n`

    chosenLines.forEach(line => {
        poemText += `${lines[line]}\n`
    })

    const whatsAppLink = whatsAppPre + encodeURI(poemText + whatsAppPost)

    return whatsAppLink
}
