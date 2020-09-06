async function verifyCodeFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#inputVerifyEmail').value.trim();
    const password = document.querySelector('#inputVerifyPassword').value.trim();
    const verificationCode = document.querySelector('#inputCode').value.trim();
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            verificationCode
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(response)
    if (response.ok) {
        window.location.href = '/';
    } else {
        alert(response.statusText)
    }
};

$(".form-verify").on('submit', verifyCodeFormHandler)