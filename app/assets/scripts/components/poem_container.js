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
        if (!this.props.data) {
            return this.renderLoadingDiv()
        } else {
            console.log("props", this.props)
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
        console.log("rendered")
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
                            {" "}{this.props.title}
                        </h1>
                        <span
                            className="poem-header__icon"
                            id="poemEdit"
                            onClick={this.poemEdit.bind(this)}
                        >
                            <i className="material-icons md-48">mode_edit</i>
                        </span>
                    </div>
                    <ul className="poem-body">
                        {this.renderPoem()}
                    </ul>
                </div>
            )
        } else {
            return <div />
        }
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        appState: state.poem.appState,
        title: state.poem.title,
        data: state.poem.data
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

    createPoem(poemData) {
        this.poemBody.empty()

        const poemArray = this.poemMethods.newPoem(poemData)

        poemArray.forEach(
            (line, index) =>
                new PoemLine(this.poemBody, line.content, line.index, poemData)
        )

        this.poemControls.newPoem(poemData)
        this.shareLinks.newPoem()
    }

    shuffle(array) {
        var length = array.length,
            lastElement,
            i

        while (length) {
            i = Math.floor(Math.random() * length--)

            lastElement = array[length]
            array[length] = array[i]
            array[i] = lastElement
        }

        return array
    }

    parseData(guardianData, title) {
        const results = guardianData.response.results

        const articles = results
            .map(article => {
                return article.fields.body
            })
            .join(" ")

        const textContent = articles
            .replace(/<br>/g, ".")
            .replace(/<(?:.|\n)*?>/gm, "")
            .replace(/\&apos|’/g, "'")
            .replace(/\&amp/g, " and ")
            .replace(
                /\u201C|\u201D|!|\(|\)|\[|\]|;|:|\"|\/|,|\.com|\&quot|\.|\?|–|\u2013 |\&|\u2022|\||@|\d{3,}/g,
                "."
            )
            .split(".")

        let tidyContent = []

        textContent.forEach(str => {
            str = str.trim()
            if (str.length > 2 && str != "Photograph" && str != "'*") {
                if (str.length > 70) {
                    str = str.replace(/.{50}\S*\s+/g, "$&@").split(/\s+@/)
                    tidyContent.push(...str)
                } else {
                    tidyContent.push(str)
                }
            }
        })

        const capitalisedContent = tidyContent.map(
            str => str.charAt(0).toUpperCase() + str.slice(1)
        )

        const shuffledContent = this.shuffle(capitalisedContent)

        this.currentPoemData = {
            title: title,
            content: shuffledContent
        }

        this.createPoem(this.currentPoemData)
    }

    newPoem(wordSearch) {
        const that = this
        $("h1").text(wordSearch) // Add poem title

        $("ul").html(
            "<div class='loading-div'>Loading<span>.</span><span>.</span><span>.</span></div>"
        ) // Add loading animation

        wordSearch = wordSearch.replace(/\?/g, "")

        let APIWordSearch = wordSearch.replace(/ /g, " AND ")

        $.getJSON(that.gUrl + APIWordSearch + that.gKey, function(
            guardianData
        ) {
            if (Number(guardianData.response.total) > 0) {
                that.parseData(guardianData, wordSearch)
            } else {
                APIWordSearch = APIWordSearch.replace(/ AND /g, " OR ")
                $.getJSON(that.gUrl + APIWordSearch + that.gKey, function(
                    guardianData
                ) {
                    if (Number(guardianData.response.total) > 0) {
                        that.parseData(guardianData, wordSearch)
                    } else {
                        $(".loading-div").html("No results, try again x")
                    }
                })
            }
        })
    }
}
