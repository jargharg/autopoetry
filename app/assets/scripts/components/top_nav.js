import React, { Component } from "react"

class TopNav extends Component {
    constructor() {
        super()
        this.events()
        this.state = { expanded: false }
    }

    events() {
        document.addEventListener("click", e => {
            e.stopPropagation()
            this.state.expanded === true
                ? this.setState({ expanded: false })
                : null
        })
    }

    infoToggle() {
        this.state.expanded === true
            ? this.setState({ expanded: false })
            : this.setState({ expanded: true })
    }

    render() {
        return (
            <header className="top-nav" onClick={this.infoToggle.bind(this)}>
                <div
                    className={`top-nav__details ${this.state.expanded
                        ? "top-nav__details--expanded"
                        : null}`}
                >
                    Inspired by the cut-up technique of William S Burroughs,
                    this app searches for your phrase in the{" "}
                    <a
                        href="http://open-platform.theguardian.com/"
                        target="_blank"
                    >
                        Guardian API
                    </a>{" "}
                    and slices up an article to make a poem with random
                    snippets. Made by{" "}
                    <a href="https://jarodhargreav.es" target="_blank">
                        Jarod Hargreaves
                    </a>.{" "}
                    <a
                        href="https://github.com/jargharg/autopoetry/"
                        target="_blank"
                    >
                        See it on Github
                    </a>
                </div>
                <div className="top-nav__name">AUTOPOETRY</div>
                <div className="top-nav__info-icon">
                    <i className="material-icons">info_outline</i>
                </div>
            </header>
        )
    }
}

export default TopNav
