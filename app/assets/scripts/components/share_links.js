import React, { Component } from "react"

class ShareLinks extends Component {
    render() {
        return (
            <div className="poem-links">
                <a
                    className="poem-links--share"
                    href={shareLink(this.props.title, this.props.lines, this.props.chosenLines)}
                >
                    <i className="material-icons md-48">share</i>
                </a>
            </div>
        )
    }
}
export default ShareLinks

function shareLink(title, lines, chosenLines) {
    const whatsAppPre = "whatsapp://send?text="
    const whatsAppPost =
        "\nMake your own autopoem at jarodhargreav.es/autopoetry"
    let poemText = `${title}\n\n`

    chosenLines.forEach(line => {
        poemText += `${lines[line]}\n`
    })

    const whatsAppLink = whatsAppPre + encodeURI(poemText + whatsAppPost)

    return whatsAppLink
}

// class ShareLinks {
//     constructor() {}
//     newPoem() {
//         this.poemContents = $(".poem-line--text")
//         this.poemTitle = $(".poem-title h1")
//             .text()
//             .toUpperCase()
//     }

//     whatsAppPoemLink() {
//         const whatsAppPre = "whatsapp://send?text="
//         const whatsAppPost =
//             "\nMake your own autopoem at jarodhargreav.es/autopoetry"
//         let whatsAppText = `${this.poemTitle}\n\n`

//         this.poemContents.each(function() {
//             whatsAppText += `${this.textContent}\n`
//         })

//         const whatsAppLink =
//             whatsAppPre + encodeURI(whatsAppText + whatsAppPost)

//         return whatsAppLink
//     }

//     sendWhatsAppPoem() {
//         const that = this
//         this.shareLink.parent().attr("href", that.whatsAppPoemLink())
//     }
// }
