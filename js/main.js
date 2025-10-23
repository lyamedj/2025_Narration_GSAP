/** GSAP Plugins */

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin);

/** Variable ------------ */


// Ouvrir le pop up

function ouvrirPopup() {
    document.getElementById('popup').style.display="flex"
}

// Fermer le popup

function fermerPopup() {
    document.getElementById('popup').style.display="none"
}

// Quand on clique sur Lire bio

document.getElementById("bioLien").onclick = function(){
    ouvrirPopup()
    return false;
}


// Quand je clique sur la croix

document.getElementById("fermerPopup").onclick = function() {
    fermerPopup()
}