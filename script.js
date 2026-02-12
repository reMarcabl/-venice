const music = document.getElementById('bg-music');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const leaves = Array.from(document.querySelectorAll('.leaf'));

leaves.forEach((leaf, i) => {
  leaf.style.zIndex = i;
});

const flippingOrder = [...leaves].reverse();
let currentPage = 0;

function goNext() {
  if (currentPage < flippingOrder.length) {
    if (currentPage === 0) music.play().catch(e => {});
    
    const leaf = flippingOrder[currentPage];
    leaf.classList.add('flipped');
    leaf.style.zIndex = 100 + currentPage;
    currentPage++;

    // Only trigger the shift if we just flipped the LAST leaf
    if (currentPage === flippingOrder.length) {
      document.getElementById('book').classList.add('final-center');
    }
  }
}

function goBack() {
  if (currentPage > 0) {
    // If we are currently at the end, slide back to the left before un-flipping
    if (currentPage === flippingOrder.length) {
      document.getElementById('book').classList.remove('final-center');
    }

    currentPage--;
    const leaf = flippingOrder[currentPage];
    leaf.classList.remove('flipped');
    leaf.style.zIndex = (leaves.length - 1) - currentPage;
  }
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goBack);
document.getElementById('book').addEventListener('click', (e) => {
    if(e.target.tagName !== 'BUTTON') goNext();
});

const audio = document.getElementById('bg-music');
const loadingScreen = document.getElementById('loading-screen');

// Function to handle the transition
function revealPage() {
    // Fade out
    loadingScreen.style.opacity = '0';
    // Remove after fade
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 800);
    
    // Try to autoplay (might be blocked, which is fine)
    audio.play().catch(() => {
        console.log("Autoplay blocked - waiting for first interaction.");
    });
}

// CONDITION: Only proceed if the music is ready
if (audio.readyState >= 3) {
    // Already loaded (cached)
    revealPage();
} else {
    // Wait until it's loaded enough to play through
    audio.addEventListener('canplaythrough', revealPage, { once: true });
}

// CRITICAL FIX: The "Unlocking" click
// Since mobile browsers block audio, this ensures that her 
// very first tap on the book cover "unlocks" and plays the music.
document.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    }
}, { once: true });