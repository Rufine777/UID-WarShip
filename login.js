// ─── PAGE NAVIGATION LOGIC ───
function switchPage(pageId) {
  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => page.classList.remove('active-page'));

  const navButtons = document.querySelectorAll('.nav-links button');
  navButtons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(pageId).classList.add('active-page');

  const navId = 'nav-' + pageId.split('-')[0];
  const targetNav = document.getElementById(navId);
  if(targetNav) {
      targetNav.classList.add('active');
  }
}

//  LOGIN 
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');


document.addEventListener('keydown', e => { 
    if (e.key === 'Enter' && document.getElementById('login-page').classList.contains('active-page')) {
        handleLogin(); 
    }
});
loginBtn.addEventListener('click', handleLogin);

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  
  if(isError) {
      toast.style.borderColor = 'var(--red)';
      toast.style.color = 'var(--red)';
      toast.style.background = 'rgba(255,59,59,0.12)';
  } else {
      toast.style.borderColor = 'var(--cyan)';
      toast.style.color = 'var(--cyan)';
      toast.style.background = 'rgba(0,229,255,0.12)';
  }

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function handleLogin() {
  const u = usernameInput.value.trim();
  const p = passwordInput.value.trim();

  if (!u || !p) {
    showToast('⚠ ALL FIELDS REQUIRED', true);
    return;
  }

  // Simulate authentication loading state
  const btnSpan = loginBtn.querySelector('span');
  btnSpan.textContent = '◈ AUTHENTICATING...';
  loginBtn.style.pointerEvents = 'none';

  setTimeout(() => {
    btnSpan.textContent = '⚡ LOGIN';
    loginBtn.style.pointerEvents = 'auto';
    
    showToast('✓ ACCESS GRANTED - REDIRECTING...', false);
    
    // Automatically switch to the Game page after successful login
    setTimeout(() => {
        window.location.href='spaceshooter.html';
    });

  }, 1200);
}