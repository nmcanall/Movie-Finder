async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    console.log(email,password)
    if (email && password) {
        console.log(             JSON.stringify({
            email,
            password
        }))
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText)
        }
    }
};

$(".form-signin").on('submit', loginFormHandler)