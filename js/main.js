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


/** QUIZ */

// Séléction 

const intro = document.querySelector(".introQuizActive");
const startBtn = document.getElementById("startQuiz");
const questions = Array.from(document.querySelectorAll(".quiz .question"));
const resultatBloc = document.querySelector(".quizResultat");
const resultatText = document.getElementById("resultat");
const retryBtn = document.getElementById("retryQuiz");

let current = 0;
let score = 0;
let locked = false;

// Apparition de la section 

gsap.from(".quiz .titreSection", {
    scrollTrigger: { trigger: ".quiz", start: "top 85%"},
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power2.out",
});

// Masquer tout

function toutCacher(){
    intro.classList.remove("active");
    resultatBloc.classList.remove("active");
    questions.forEach((q) => q.classList.remove("active"))
}

// Afficher intro

function showIntro() {
    toutCacher();
    intro.classList.add("active");
    gsap.fromTo(intro, {opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
}

// Afficher question

function showQuestion(i) {
    toutCacher();
    const q = questions[i]; // le i va gerer l'affichage de la question dans le quiz puis la const va me permettre de recuperer la question 
    if (!q) return showResultat();

    q.classList.add("active");
    locked = false;

    gsap.fromTo(q, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

    q.querySelectorAll(".option img").forEach((img) => {
        img.onclick = () => {
            if (locked) return;
            locked = true;

        const isCorrect = img.getAttribute("data-correct") === "vrai";

            if (isCorrect) {
                score++; // si c'est correct cela ajoutera donc 1 point et mettras une petite animation verte ou rouge si bon ou non 
                gsap.to(img, { borderColor: "#22c55e", boxShadow: "0 0 20px rgba(34,197,94,0.3)", duration: 0.3 });
            } else {
                gsap.to(img, { borderColor: "#ef4444", boxShadow: "0 0 20px rgba(239,68,68,0.3)", duration: 0.3 });
                const good = q.querySelector('.option img[data-correct="vrai"]');
            if (good) gsap.to(good, { borderColor: "#22c55e", duration: 0.25, delay: 0.1 });
            }

            setTimeout(() => { // c'est avec ce document que j'ai reussi a mettre en place le timeout (https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
                gsap.to(q, {
                opacity: 0,
                y: -20,
                duration: 0.35,
                ease: "power1.out",
                onComplete: () => { // cela va permettre d'incrémenter le compteur (current), et donc affichera une nouvelle question 
                    current++;
                    showQuestion(current);
                },
            });
        }, 700); // cela est donc le nombre qui signifie que la transition ne se declenchera qu'apres 0.7s
    };
  });
}

// Afficher le résultat final
function showResultat() {
    toutCacher();
    resultatBloc.classList.add("active");

    let message = "";
    if (score === 5) {
        message = " Parfait ! Tu es un vrai fan de Future ! ⭐";
    } else if (score >= 3) {
        message = " Bien joué ! Tu connais assez bien. 🔥";
    } else {
        message = "Tu as encore beaucoup a découvrir...😅";
    }
    resultatText.textContent = message + " (" + score + "/5)";

    gsap.fromTo(resultatBloc, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" });
}

// Rejouer

retryBtn.addEventListener("click", () => {
    current = 0;
    score = 0;
    showIntro();
    document.querySelectorAll(".option img").forEach((img) => {
        img.style.borderColor = "transparent";
        img.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.1)";
  });
});

// Lancer le quiz

startBtn.addEventListener("click", () => {
    current = 0;
    score = 0;
    showQuestion(current);
});

// Démarrage initial

showIntro();
