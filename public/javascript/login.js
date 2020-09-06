async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            window.location.href = '/';
        } else {
            console.log(response);
            alert(response.statusText)
        }
    }
};

$(".form-signin").on('submit', loginFormHandler)