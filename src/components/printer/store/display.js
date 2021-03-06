import { useStoreon } from "storeon/preact"

export default store => {
    store.on("@init", () => ({
        showTemperatures: false,
        showFlowRate: false,
        showFeedRate: false,
        showFan: false,
        showExtrusion: false,
        showSensors: false,
    }))
    store.on("panel/showtemperatures", ({ showTemperatures }, newstate) => {
        const { dispatch } = useStoreon()
        if (newstate) dispatch("panel/add", "temperatures")
        else dispatch("panel/remove", "temperatures")
        return { showTemperatures: newstate }
    })
    store.on("panel/showflowrate", ({ showFlowRate }, newstate) => {
        const { dispatch } = useStoreon()
        if (newstate) dispatch("panel/add", "flowrate")
        else dispatch("panel/remove", "flowrate")
        return { showFlowRate: newstate }
    })
    store.on("panel/showfeedrate", ({ showFeedRate }, newstate) => {
        const { dispatch } = useStoreon()
        if (newstate) dispatch("panel/add", "feedrate")
        else dispatch("panel/remove", "feedrate")
        return { showFeedRate: newstate }
    })
    store.on("panel/showfan", ({ showFan }, newstate) => {
        const { dispatch } = useStoreon()
        if (newstate) dispatch("panel/add", "fan")
        else dispatch("panel/remove", "fan")
        return { showFan: newstate }
    })
    store.on("panel/showextrusion", ({ showExtrusion }, newstate) => {
        const { dispatch } = useStoreon()
        if (newstate) dispatch("panel/add", "extrusion")
        else dispatch("panel/remove", "extrusion")
        return { showExtrusion: newstate }
    })
    store.on("panel/showsensors", ({ showSensors }, newstate) => {
        const { dispatch } = useStoreon()
        if (newstate) dispatch("panel/add", "sensors")
        else dispatch("panel/remove", "sensors")
        return { showSensors: newstate }
    })
}
