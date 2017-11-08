// import React from "react"

// const PoemControls = ({ title, lines, chosenLines }) => (
//     <div className="poem-links">
//         <a
//             className="poem-links--share"
//             href={shareLink(title, lines, chosenLines)}
//         >
//             <i className="material-icons md-48">share</i>
//         </a>
//     </div>
// )

// export default PoemControls

/////////

import React, { Component } from "react"
import { connect } from "react-redux"
import { editPoem, editHistory } from "../actions"

class PoemControls extends Component {
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
                        className={
                            "poem-controls__icon" +
                            (this.state.undoVis ? "" : " hidden")
                        }
                        onClick={() => this.props.editHistory("undo")}
                    >
                        <i className="material-icons md-48">undo</i>
                    </span>
                    <span
                        className={
                            "poem-controls__icon" +
                            (this.state.redoVis ? "" : " hidden")
                        }
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
    editHistory
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
