async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#inputUsername').value.trim();
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    if (username && email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            // If signup is ok, go to verification page
            window.location.href = '/verify';
        } else {
            alert(response.statusText)
        }
    }
};

$(".form-signup").on('submit', signupFormHandler);