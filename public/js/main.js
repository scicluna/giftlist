async function logIn(e){
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()

    if (!username || !password) return

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'content-type': 'application/json'}
    })
    if (response.ok) window.location.replace('/')
    else alert("Did not login")
}
if (document.getElementById('inputlogin')) document.getElementById('inputlogin').addEventListener("click", logIn)

