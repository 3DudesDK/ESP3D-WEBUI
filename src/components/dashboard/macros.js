/*
 macros.js - ESP3D WebUI macro file

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

import { h, Fragment } from "preact"
import { T } from "../translations"
import { useState, useEffect } from "preact/hooks"
import { SendCommand } from "../http"
import { useStoreon } from "storeon/preact"
import { showDialog } from "../dialog"
import { preferences } from "../app"
import { Grid, Minimize2, Maximize2 } from "preact-feather"

/*
 * Local variables
 *
 */
let expandmacrosbuttons

/*
 * Local constants
 *
 */

/*
 * Macros Controls
 *
 */
const MacrosControls = () => {
    let ribon = []
    if (!preferences.settings.showmacros) return null
    if (typeof expandmacrosbuttons == "undefined")
        expandmacrosbuttons = preferences.settings.expandmacrosbuttonsonstart
    const toogleMacros = e => {
        expandmacrosbuttons = !expandmacrosbuttons
        showDialog({ displayDialog: false, refreshPage: true })
    }
    if (expandmacrosbuttons) {
        //ribon.push(
        //     )
    }
    return (
        <Fragment>
            <div class="p-1">
                <button
                    class="btn btn-primary"
                    title={T("S121")}
                    onclick={toogleMacros}
                >
                    <Grid />
                    <span class="hide-low text-button">{T("S121")}</span>
                    {expandmacrosbuttons ? <Minimize2 /> : <Maximize2 />}
                </button>
            </div>
            {ribon}
        </Fragment>
    )
}

/*
 *Send command query error
 */
function sendCommandError(errorCode, responseText) {
    showDialog({
        type: "error",
        numError: errorCode,
        message: errorCode == 0 ? T("S5") : T("S109"),
    })
    let tresponse = responseText.split("\n")
    for (let n = 0; n < tresponse.length; n++) {
        updateTerminal(T(tresponse[n]))
    }
}

export { MacrosControls }
