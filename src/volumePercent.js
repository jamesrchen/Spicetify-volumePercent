// @ts-check

// NAME: Volume Percent
// AUTHOR: unknownguy2002
// DESCRIPTION: Gives you a volume percentage on the left of your search bar

/// <reference path="../globals.d.ts" />

(function VolumePercent(){
    // Check if Spicetify has loaded
    if (!Spicetify.LocalStorage) {
        setTimeout(VolumePercent, 1000);
        return;
    }

    const button_vol = document.createElement("button")
    button_vol.textContent = prettyVolume()
    button_vol.classList.add("button")
    button_vol.setAttribute("data-tooltip", "Volume")

    document.querySelector("#view-browser-navigation-top-bar").append(button_vol)

    // Events //
    button_vol.onclick = (ev) => {
        let volStr = prompt("Input Volume Percentage:")
        let vol = parseFloat(volStr) / 100
        if(isNaN(vol)){
            Spicetify.showNotification("Invalid input, only integers or floats accepted")
            return
        }
        Spicetify.Player.setVolume(vol)
        Spicetify.showNotification("Volume set to: "+prettyVolume(vol))
    }

    // Updates //

    // I'm honestly not sure of the optimisation implication... uh YOLO?
    setInterval(() => {
        button_vol.textContent = prettyVolume()
    }, 100)

    function prettyVolume(arg = undefined) {
        return ((arg || Spicetify.Player.getVolume()) * 100).toPrecision(3).toString() + "%"
    }

})()