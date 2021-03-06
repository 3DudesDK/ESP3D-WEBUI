/*
 app.js - ESP3D WebUI App file

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
import "../stylesheets/application.scss"
require(`../stylesheets/components/${process.env.TARGET_ENV}/_${process.env.TARGET_ENV}.scss`)
import { useState, useEffect } from "preact/hooks"
import { DialogPage } from "./dialog"
import { AboutPage } from "./about"
import { DashboardPage, updateTerminal } from "./dashboard"
import { SettingsPage, initApp, preferences, stopPolling } from "./settings"
import { Header } from "./header"
import { Notification, NotificationPage } from "./notification"
import { setLang, T } from "./translations"
import { prefs } from "./settings"
import { beep, beepError, initAudio } from "./audio"
import { useStoreon } from "storeon/preact"

/*
 * Some constants
 */
const Setting = { none: 0, esp3d: 1, ui: 2, machine: 3 }
const Page = { none: 0, about: 1, notifications: 2, dashboard: 3, settings: 4 }

/*
 * Local variables
 *
 */
let esp3dSettings = [] //light esp3d settings (ESP800)
let customdata = [] //custom data

/*
 * Set custom data
 */
function setCustomdata(data) {
    customdata = data
}

/*
 * Main page
 */
const Container = () => {
    const { notifificationBottom } = useStoreon("notifificationBottom")
    let style = "top:" + notifificationBottom + "px"
    return (
        <div
            class="espcontainer container-fluid row-fluid"
            id="mainpage"
            style={style}
        >
            <AboutPage />
            <NotificationPage />
            <DashboardPage />
            <SettingsPage />
        </div>
    )
}

/*
 * Main page
 */
const MainPage = () => {
    const { showPage } = useStoreon("showPage")
    if (showPage) {
        return (
            <div id="mainwindow">
                <Header />
                <Notification />
                <Container />
            </div>
        )
    }
}

/*
 * Apply necessary settings
 */
function applyConfig(data) {
    //console.log("Apply settings")
    esp3dSettings = data
    document.title = esp3dSettings.Hostname
    if (esp3dSettings.FWTarget == "unknown") {
        const { dispatch } = useStoreon()
        dispatch("setPage", Page.settings)
    }
}

/*
 * App entry
 */
function App() {
    useEffect(() => {
        setLang("en")
        initApp()
        initAudio()
    }, [])
    return (
        <div class="full-height bg-white">
            <DialogPage />
            <MainPage />
        </div>
    )
}

/*
 * Reload web browser Page
 *
 */
function reloadPage() {
    window.location.reload(true)
}

/*
 * Dashboard panel index
 *
 */
function getPanelIndex(orderlist, item) {
    let index = 0
    for (let element of orderlist) {
        if (element == item) {
            return index
        }
        index++
    }
    return -1
}

export {
    Setting,
    App,
    applyConfig,
    Page,
    esp3dSettings,
    prefs,
    updateTerminal,
    preferences,
    reloadPage,
    customdata,
    setCustomdata,
    getPanelIndex,
    beepError,
    beep,
    stopPolling,
}
