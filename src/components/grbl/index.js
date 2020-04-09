/*
 index.js - ESP3D WebUI grbl specific code / UI

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

import { h } from "preact"
import { Setting, esp3dSettings } from "../app"

function firmwareName(shortname) {
    switch (shortname) {
        case "grbl-embedded":
            return "GRBL ESP32"
        case "grbl":
            return "Grbl"
        default:
            return "Unknow"
    }
}

const MachineSettings = ({ currentPage }) => {
    if (
        currentPage != Setting.machine ||
        !esp3dSettings ||
        !esp3dSettings.FWTarget ||
        esp3dSettings.FWTarget == "???"
    )
        return null
    return (
        <div>
            <center>
                <br />
                GRBL
                <br />
                <div class="list-left">To be implemented!</div>
            </center>
        </div>
    )
}

export { MachineSettings, firmwareName }