/** GSAP Plugins */

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin);

/** POP-UP BIO */

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

/** CARROUSEL */

/** Variables de base du Carrousel ------------ */

var albums = document.getElementById("albums");
var boutonSuivant = document.getElementById("suivant");
var boutonPrecedent = document.getElementById("prev");

var position = 0;

// Duplication du contenu pour l'effet de continuité
albums.innerHTML += albums.innerHTML;

// Variables
var album = document.querySelector(".album") // Le queryselector lui va permettre de selectionner un élément HTML dans ma page (https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector)
var style = window.getComputedStyle(document.querySelector(".albums")) // le getComputedStyle va me permettre de récuperer tout les styles donné a mon conteneur (https://developer.mozilla.org/fr/docs/Web/API/Window/getComputedStyle)
var gap = parseInt(style.gap) || 0; // pour renvoyer a la valeur 0
var decalage = album.offsetWidth + gap;
var totalAlbums = albums.children.length;

// Fonction du carrousel

function allerDroite() {
    position -= decalage;

    // si je dépasse la moitié vu qu'on a dupliquer 
    if (Math.abs(position) >= (totalAlbums / 2) * decalage) {
        position = 0;
        gsap.set(albums, {x: position});
        position -= decalage
    }

    gsap.to(albums, { x:position, duration: 0.6, ease: "power2.out" }); // le power2 va me créer une animation qui va démarrer vite et finir lentement (https://gsap.com/docs/v3/Eases/)
}

function allerGauche() {
    position += decalage;

    if (position > 0){
        position = -((totalAlbums / 2) * decalage);
        gsap.set(albums, {x: position});
        position += decalage
    }

    gsap.to(albums, { x:position, duration: 0.6, ease: "power2.out" }); // le power2 va me créer une animation qui va démarrer vite et finir lentement (https://gsap.com/docs/v3/Eases/)
}

boutonSuivant.onclick = allerDroite;
boutonPrecedent.onclick = allerGauche;

/** CLIPS & VIDÉOS */

// Animation d'apparition du Titre

gsap.from(".clips .titreSection", {
    scrollTrigger: {
        trigger: ".clips .titreSection",
        start: "top 90%",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out"
})

// Animation d'apparition des clips

gsap.utils.toArray('.clip').forEach((clip, i) => {
    gsap.from(clip, { // chaque clip va s'animer lorsqu'elle apparait dans l'ecran
        scrollTrigger: {
            trigger: clip, start: "top 85%", // l'animation débutera donc a 85% de la hauteur
            toggleActions: "play none none reverse" //pour jouer l'animation quand elle entre et rejoue quand elle sort
        },
        opacity: 0, // commencera invisible
        y: 80,
        duration: 1,
        delay: i * 0.15, // effet de cascade progressif
        ease: "power3.out"
    })
})