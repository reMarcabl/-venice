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

    if (currentPage === flippingOrder.length) {
      document.getElementById('book').classList.add('final-center');
    }
  }
}

function goBack() {
  if (currentPage > 0) {
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

function revealPage() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 800);
    
    audio.play().catch(() => {
        console.log("Autoplay blocked - waiting for first interaction.");
    });
}

if (audio.readyState >= 3) {
    revealPage();
} else {
    audio.addEventListener('canplaythrough', revealPage, { once: true });
}

document.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    }
}, { once: true });