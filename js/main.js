// =====================
// Viewport Height Fix for Mobile Browsers
// =====================
function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setViewportHeight);
setViewportHeight();

// =====================
// Simulate Code Snippet Horizontal Scrolling on Touch
// =====================
document.querySelectorAll('.code-snippet').forEach(snippet => {
  snippet.addEventListener('touchstart', function(e) {
    this.classList.add('scrolling');
  });
  snippet.addEventListener('touchend', function(e) {
    this.classList.remove('scrolling');
  });
});

// =====================
// 3D Mathematical Visualization (Three.js)
// =====================
const mathScene = new THREE.Scene();
const mathCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const mathRenderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#math-canvas'),
  alpha: true,
  antialias: true
});
mathRenderer.setPixelRatio(window.devicePixelRatio);
mathRenderer.setSize(window.innerWidth, window.innerHeight);
mathRenderer.setClearColor(0x000000, 0);

// Larger resolution for geometry
const geometry = new THREE.ParametricGeometry((u, v, target) => {
  u = u * 4 * Math.PI;
  v = v * 2 * Math.PI;
  const x = 2 * (1 - Math.sin(u)) * Math.cos(u) * (1 + Math.cos(v)) + Math.cos(u);
  const y = 2 * Math.sin(u) * (1 + Math.cos(v)) + Math.sin(u);
  const z = 4 * Math.sin(v);
  target.set(x, y, z);
}, 200, 200);

const material = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: true,
  emissive: 0x0000ff,
  emissiveIntensity: 0.3,
  metalness: 0.95,
  roughness: 0.1
});
const surface = new THREE.Mesh(geometry, material);
surface.scale.set(1.4, 1.4, 1.4);
mathScene.add(surface);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
mathScene.add(ambientLight);
mathCamera.position.z = 10;

const colors = [
  new THREE.Color(0x1e90ff), // Blue
  new THREE.Color(0x00ff00), // Green
  new THREE.Color(0xff69b4), // Pink
  new THREE.Color(0xff0000)  // Red
];
const transitionDuration = 5000;
const clock = new THREE.Clock();

function animateMath() {
  requestAnimationFrame(animateMath);
  const elapsed = clock.getElapsedTime() * 1000;
  const cycleDuration = colors.length * transitionDuration;
  const cycleTime = elapsed % cycleDuration;
  const currentIndex = Math.floor(cycleTime / transitionDuration);
  const nextIndex = (currentIndex + 1) % colors.length;
  const t = (cycleTime % transitionDuration) / transitionDuration;
  const currentColor = colors[currentIndex].clone().lerp(colors[nextIndex], t);
  surface.material.color.copy(currentColor);
  surface.material.emissive.copy(currentColor);
  // Slight rotation
  surface.rotation.x += 0.0015;
  surface.rotation.y += 0.003;
  mathRenderer.render(mathScene, mathCamera);
}
animateMath();

window.addEventListener('resize', () => {
  mathCamera.aspect = window.innerWidth / window.innerHeight;
  mathCamera.updateProjectionMatrix();
  mathRenderer.setSize(window.innerWidth, window.innerHeight);
});

// =====================
// Modals
// =====================
const learnModal = document.getElementById('learnModal');
const projectsModal = document.getElementById('projectsModal');

function showLearnModal() {
  learnModal.classList.add('modal-active');
}

function hideLearnModal() {
  learnModal.classList.remove('modal-active');
}

function showProjectsModal() {
  projectsModal.classList.add('modal-active');
}

function hideProjectsModal() {
  projectsModal.classList.remove('modal-active');
}

// Close modals when clicking on the backdrop (outside the modal content)
learnModal.addEventListener('click', (event) => {
  if (event.target === learnModal) {
    hideLearnModal();
  }
});
projectsModal.addEventListener('click', (event) => {
  if (event.target === projectsModal) {
    hideProjectsModal();
  }
});

// Add event listeners for the X (close) buttons – these will trigger the smooth closing transition
document.querySelectorAll('.close-modal').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from bubbling to the backdrop
    const parentModal = event.target.closest('.learn-modal, .projects-modal');
    if (parentModal) {
      parentModal.classList.remove('modal-active');
    }
  });
});

// Optionally, close modals on scroll (if desired)
window.addEventListener('scroll', () => {
  if (learnModal.classList.contains('modal-active')) {
    hideLearnModal();
  }
  if (projectsModal.classList.contains('modal-active')) {
    hideProjectsModal();
  }
});


// =====================
// Navigation + Smooth Scroll
// =====================
function navigateTo(topic) {
  window.location.href = `${topic}.html`;
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// =====================
// Resume Download
// =====================
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'https://drive.google.com/uc?export=download&id=1tTiMYpOAbj-tCFoEy0xPPVryD2s8hw8l';
  link.download = 'Hirdesh_Viikram_Resume.pdf';
  link.click();
}

// =====================
// Mobile Nav Toggle
// =====================
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('show');
}
window.addEventListener('resize', () => {
  const mobileNav = document.getElementById('mobileNav');
  if (window.innerWidth > 768) {
    mobileNav.classList.remove('show');
  }
});

// Close mobile nav when you scroll
window.addEventListener('scroll', () => {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav.classList.contains('show')) {
    mobileNav.classList.remove('show');
  }
});

// Close mobile nav when a link is clicked
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.remove("show");
  });
});


// =====================
// Dark/Light Mode Toggle with Theme Persistence
// =====================
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const toggleBtn = document.querySelector('.theme-toggle');
  if(document.body.classList.contains('light-mode')){
    toggleBtn.textContent = "☀";
    localStorage.setItem('theme', 'light');
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem('theme', 'dark');
  }
}

// On page load, check for saved theme preference and apply it
document.addEventListener("DOMContentLoaded", function() {
  const storedTheme = localStorage.getItem('theme');
  const toggleBtn = document.querySelector('.theme-toggle');
  if (storedTheme === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.textContent = "☀";
  } else {
    document.body.classList.remove('light-mode');
    toggleBtn.textContent = "🌙";
  }
  
  // =====================
  // Form Safety (Email Validation)
  // =====================
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const emailInput = form.querySelector('input[name="email"]');
      const email = emailInput.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        e.preventDefault();
      }
    });
  }
});

// =====================
// Duck Button Toggle (Optional)
// =====================
const duckAudio = document.getElementById('duckAudio'); // Reference to duckmusic.mp3
let isPlaying = false;
function toggleDuckMusic() {
  if (!isPlaying) {
    duckAudio.currentTime = 0;
    duckAudio.play();
    isPlaying = true;
  } else {
    duckAudio.pause();
    duckAudio.currentTime = 0;
    isPlaying = false;
  }
}

// =====================
// Chart.js Integration for Vitals Chart
// =====================
const ctx = document.getElementById('vitalsChart')?.getContext('2d');
if (ctx) {
  const timestamps = ["2025-02-01 09:00", "2025-02-01 09:15", "2025-02-01 09:30"];
  const heartRates = [80, 82, 79];
  const bpSystolic = [120, 124, 118];
  const bpDiastolic = [80, 79, 82];
  
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timestamps,
      datasets: [
        {
          label: 'Heart Rate',
          data: heartRates,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'BP Systolic',
          data: bpSystolic,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'BP Diastolic',
          data: bpDiastolic,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Allows chart to fill the container's dimensions
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: { title: { display: true, text: 'Timestamp' } },
        y: { title: { display: true, text: 'Measurement' } }
      }
    }
  });
  
  function updateChart(newTime, newHR, newSys, newDia) {
    chart.data.labels.push(newTime);
    chart.data.datasets[0].data.push(newHR);
    chart.data.datasets[1].data.push(newSys);
    chart.data.datasets[2].data.push(newDia);
    chart.update();
  }
  
  // Example update after 5 seconds
  setTimeout(() => {
    updateChart("2025-02-01 09:45", 85, 130, 84);
  }, 5000);
}
