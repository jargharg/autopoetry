export function parseData(data) {
    const results = data.response.results

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
        if (tidyLine(str)) {
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

    return capitalisedContent
}

export function createPoem(poemLines) {
    const poemArray = poemMethods.newPoem(poemLines)
}

export function shuffle(array) {
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

export function chooseLines(lines) {
    const poemLength = 3 + Math.floor(Math.random() * 10)

    let randomArray = []

    for (let i = 0; i < poemLength; i++) {
        randomArray.push(randomLineIndex(lines))
    }

    const poemArray = randomArray // this can have more exciting methods in the future

    return poemArray
}

export function randomLineIndex(array) {
    return Math.floor(Math.random() * array.length)
}

//////////////////////////////////
//      PRIVATE FUNCTIONS       //
//////////////////////////////////

function tidyLine(line) {
    if (
        line.length > 2 &&
        line != "Photograph" &&
        line != "Related" &&
        line != "'*"
    ) {
        return line
    } else {
        return false
    }
}
