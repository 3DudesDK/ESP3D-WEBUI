import { createStoreon } from "storeon"

import display4printer from "./display"
import positions from "./positions"
import temperatures from "./temperatures"
import feedrate from "./feedrate"
import flowrate from "./flowrate"
import sensor from "./sensor"
import fan from "./fan"
import status from "./status"
import monitor from "../../store/monitor"
import error from "../../store/error"
import display from "../../store/display"
import notificationsbar from "../../store/notificationsbar"
import filespanel from "../../store/filespanel"
import dialogcontent from "../../store/dialogcontent"

const store = createStoreon([
    display4printer,
    positions,
    temperatures,
    feedrate,
    flowrate,
    fan,
    status,
    sensor,
    monitor,
    error,
    display,
    notificationsbar,
    filespanel,
    dialogcontent,
])

export { store }
