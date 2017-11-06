import React from "react"

const ShareLinks = ({ title, lines, chosenLines }) => (
    <div className="poem-links">
        <a
            className="poem-links--share"
            href={shareLink(title, lines, chosenLines)}
        >
            <i className="material-icons md-48">share</i>
        </a>
    </div>
)

export default ShareLinks

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