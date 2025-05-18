const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const signupActionBtn = document.getElementById('signup-action-btn');
const errorMsg = document.getElementById('error-msg');
const signupForm = document.getElementById('signup-form');

// SHA-256 Hashleme Fonksiyonu
async function hashPasswordSHA256(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // buffer'ı byte array'e çevir
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // hex string'e çevir
    return hashHex;
}

// Kayıt işlemini gerçekleştiren fonksiyon
async function performSignup() { // Fonksiyonu async yap
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim(); // Düz metin şifre

    if (!username || !password) {
        errorMsg.textContent = 'Please enter both username and password.';
        return;
    }
    if (password.length < 8) {
        errorMsg.textContent = 'Password must be at least 8 characters long.';
        return;
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        errorMsg.textContent = 'Password must contain at least one uppercase letter and number.';
        return;
    }
    // Yukarıdaki validasyonlar zaten şifre uzunluğunu ve içeriğini kontrol ediyor.
    // Tekrarlayan ve gereksiz return'ler kaldırıldı.

    if (localStorage.getItem(username)) {
        errorMsg.textContent = 'Username already exists. Please choose another.';
        return;
    }

    const hashedPassword = await hashPasswordSHA256(password); // Şifreyi hash'le
    localStorage.setItem(username, JSON.stringify({ hashedPassword: hashedPassword })); // Hash'lenmiş şifreyi sakla
    errorMsg.textContent = 'Sign up successful! Redirecting to login...';
    usernameInput.value = '';
    passwordInput.value = '';

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000); // Redirect after 2 seconds
}

// Enter tuşuna basıldığında kayıt işlemini gerçekleştir
usernameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSignup();
    }
});

passwordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSignup();
    }
});

// Form submit işlemi için
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    performSignup();
});