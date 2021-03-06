/*
 index.js - ESP3D WebUI translations engine

 Copyright (c) 2020 Luc Lebosse. All rights reserved.

 This code is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.

 This code is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public
 License along with This code; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

"use strict"
import enLangRessourceBase from "./en.json"
const { enLangRessourceExtra } = require(`../${process.env.TARGET_ENV}`)

/*
 * Local variables
 *
 */
let currentLang = "en"
let currentLangRessource = enLangRessource
let isMachineRessourceloaded = false
let enLangRessource = []

/*
 * Set language
 */
function setLang(lang, langRessource) {
    if (enLangRessource.length == 0) {
        enLangRessource = { ...enLangRessourceBase, ...enLangRessourceExtra }
    }
    if (lang == "en") {
        currentLangRessource = enLangRessource
        currentLang = "en"
    } else if (
        typeof langRessource == "undefined" ||
        typeof langRessource.lang == "undefined"
    ) {
        console.log(currentLang + " is not available, use en instead")
        currentLangRessource = enLangRessource
        currentLang = "en"
    } else {
        currentLang = lang
        currentLangRessource = langRessource
    }
}

/*
 * Give text from id according language selection
 * give english text if no corresponding id selected language
 */
function T(id) {
    let translatedText = currentLangRessource[id]
    if (!id || typeof id == "object" || !isNaN(id) || !isNaN(id.charAt(0)))
        return id
    if (typeof translatedText === "undefined") {
        translatedText = enLangRessource[id]
        if (typeof translatedText === "undefined") {
            //console.log("[Translation]" + id + " is not defined!")
            translatedText = id
        }
    }
    return translatedText
}

/*
 * Decode special char in string
 */
function decodeEntitie(str_text) {
    var tmpelement = document.createElement("div")
    tmpelement.innerHTML = str_text
    str_text = tmpelement.textContent
    tmpelement.textContent = ""
    return str_text
}

/*
 * Translate language from english
 * give english if no text found
 * this is need when text come from outside
 */
function Translate(text) {
    let translatedText = text
    let property
    if (currentLang != "en") {
        for (property in enLangRessource) {
            if (enLangRessource[property] == text) {
                return decodeEntitie(T(String(property)))
            }
        }
    }
    return decodeEntitie(translatedText)
}

export { setLang, T, Translate }
