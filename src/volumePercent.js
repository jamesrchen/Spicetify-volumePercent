// @ts-check

// NAME: Volume Percent V2
// AUTHOR: unknownguy2002 -- Improved by p0rtL (https://github.com/p0rtL6)
// DESCRIPTION: Gives you a volume percentage on the left of your search bar

/// <reference path="../globals.d.ts" />

(function VolumePercent(){
    // Check if Spicetify has loaded
    if (!Spicetify.LocalStorage) {
        setTimeout(VolumePercent, 1000);
        return;
    }
    let beed = 0
    let oldVol = prettyVolume()
    const targetNode = document.getElementById('player-volumebar');
    const config = { attributes: true, childList: true, subtree: true };
    const button_vol = document.createElement("button")
    button_vol.textContent = prettyVolume()
    button_vol.classList.add("button")
    button_vol.setAttribute("data-tooltip", "Volume")
    button_vol.setAttribute("id", "Volbutton")
    button_vol.setAttribute("contentEditable", "true")

    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                button_vol.textContent = prettyVolume()
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    document.querySelector("#view-browser-navigation-top-bar").append(button_vol)

    // Events //
    button_vol.onclick = (ev) => {
        // let volStr = prompt("Input Volume Percentage:")
        console.log(Spicetify.Player.getVolume())
        let volStr = document.getElementById('Volbutton');
        volStr.addEventListener('input', function() {
            console.log('An edit input has been detected');
            console.log(volStr.textContent);
        });

        let vol = parseFloat(volStr.textContent) / 100

        if(isNaN(vol)){
            Spicetify.showNotification("Invalid input, only integers or floats accepted")
            return
        }

        Spicetify.Player.setVolume(vol)
        Spicetify.showNotification("Volume set to: "+prettyVolume(vol))
    }

    // Updates //

    function prettyVolume(arg = undefined) {
        return ((arg || Spicetify.Player.getVolume()) * 100).toPrecision(3).toString() + "%"
    }

})()
