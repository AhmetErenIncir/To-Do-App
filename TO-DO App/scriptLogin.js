const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const loginForm = document.getElementById('login-form');
const signupBtn = document.getElementById('signup-btn'); // may be null on login page
const errorMsg = document.getElementById('error-msg');

// SHA-256 Hashleme Fonksiyonu
async function hashPasswordSHA256(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

loginBtn.addEventListener('click', async () => { // Handler'ı async yap
    // Buton durumu (disabled/textContent) artık bu handler tarafından değiştirilmeyecek.
    
    try {
        const username = DOMPurify.sanitize(usernameInput.value.trim());
        const password = DOMPurify.sanitize(passwordInput.value.trim()); // Düz metin şifre

        if (!username || !password) {
            showError('Please enter both username and password.');
            usernameInput.value = ''; // Alanları temizle
            passwordInput.value = ''; // Alanları temizle
            return;
        }

        // Check credentials from localStorage
        const storedUser = localStorage.getItem(username);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            const hashedPasswordAttempt = await hashPasswordSHA256(password); // Girilen şifreyi hash'le

            if (user.hashedPassword === hashedPasswordAttempt) { // Hash'lenmiş şifreleri karşılaştır
                // Correct credentials
                errorMsg.textContent = ''; // Clear any previous error
                usernameInput.value = '';
                passwordInput.value = '';
                localStorage.setItem('currentUser', username); // Başarılı girişte currentUser ayarla
                window.location.href = 'index.html';
            } else {
                // Incorrect password
                showError('Invalid username or password.');
                usernameInput.value = ''; // Alanları temizle
                passwordInput.value = ''; // Alanları temizle
            }
        } else {
            // User does not exist
            showError('Invalid username or password.');
            usernameInput.value = ''; // Alanları temizle
            passwordInput.value = ''; // Alanları temizle
        }
    } catch (error) {
        // Catch any unexpected errors during the process
        console.error("Login error:", error); // Log for debugging
        showError('An unexpected error occurred. Please try again.');
        usernameInput.value = ''; // Alanları temizle
        passwordInput.value = ''; // Alanları temizle
    }
});

// The signupBtn event listener might be on a different page, so the `});` closing the DOMContentLoaded listener should not be here.
// This was a syntax error in the original provided file.
// We assume the DOMContentLoaded is not wrapping this particular script for login.html
// If it was, it should wrap the entire script content.
// For this change, I am removing the extra '});' that was likely a copy-paste error in the provided content.

signupBtn?.addEventListener('click', () => {
    const username = DOMPurify.sanitize(usernameInput.value.trim());
    const password = DOMPurify.sanitize(passwordInput.value.trim());

    if (!username || !password) {
        errorMsg.textContent = 'Please enter both username and password for sign up.';
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(username)) {
        errorMsg.textContent = 'Username already exists. Please choose another.';
        return;
    }

    // Store new user in localStorage
    localStorage.setItem(username, JSON.stringify({ password: password }));
    errorMsg.textContent = 'Sign up successful! You can now log in.';
    usernameInput.value = ''; // Clear fields after successful sign up
    passwordInput.value = '';

    setTimeout(() => {
        errorMsg.textContent = '';
    }, 3000);
});

// Global error handling
const showError = (message, duration = 5000) => {
  errorMsg.textContent = message;
  errorMsg.style.display = 'block';
  setTimeout(() => {
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
  }, duration);
};

// Submit form via Enter key
loginForm.addEventListener('submit', async (e) => { // Fonksiyonu 'async' olarak işaretle
  e.preventDefault();
  // const submitBtn = loginForm.querySelector('button'); // Bu referans artık burada kullanılmayacak.
  
  // Buton durumu artık değiştirilmeyeceği için bu kontrol kaldırıldı.
  // if (submitBtn.disabled && submitBtn.textContent === 'Signing in...') {
  //   return;
  // }
  
  // Buton durumu artık değiştirilmeyeceği için bu satırlar kaldırıldı.
  // submitBtn.disabled = true;
  // submitBtn.textContent = 'Signing in...';
  
  try {
    // loginBtn'nin click olay yöneticisini programatik olarak tetikle.
    // loginBtn.click() async olduğu için bir Promise döndürür.
    // Bu Promise'in çözülmesini bekle.
    await loginBtn.click();
  } catch (error) {
    // .click() çağrısı sırasında veya Promise reddedilirse hata yakala.
    console.error("Error during programmatic loginBtn.click() in form submit:", error);
  }
  // Buton durumu yönetimi kaldırıldığı için finally bloğuna gerek yok.
});