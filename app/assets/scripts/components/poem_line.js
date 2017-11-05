import React, { Component } from "react"
import {} from "../actions"

const PoemLine = ({content, index, onClick}) => (
    <li tabIndex="0" className="poem-line">
        <span className="poem-line--text">{content}</span>
        <div className="poem-line__refresh">
            <i className="material-icons md-18" onClick={onClick}>cached</i>
        </div>
    </li>
)

export default PoemLine
