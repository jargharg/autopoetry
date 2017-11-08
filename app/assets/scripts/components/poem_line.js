import React, { Component } from "react"

const PoemLine = ({ content, index, onClick }) => (
    <li tabIndex="0" className="poem-line">
        <div className="poem-line__refresh" onClick={onClick}>
            <i className="material-icons md-24">cached</i>
        </div>
        <span className="poem-line__text">{content}</span>
    </li>
)

export default PoemLine
