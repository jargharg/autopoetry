import React, { Component } from "react"

const ShareLinks = ({onClick}) => (
    <div className="poem-links">
        <a
            className="poem-links--share"
            href={""}
            onClick={onClick}
        >
            <i className="material-icons md-48">share</i>
        </a>
    </div>
)

export default ShareLinks
