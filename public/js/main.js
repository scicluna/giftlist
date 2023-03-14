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

async function signUp(e) {
  
    const name = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const email = document.getElementById('email').value.trim();
  
    if (!name || !password || !email) return;
  
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ name, password, email }),
      headers: { 'content-type': 'application/json' },
    });
  
    if (response.ok) {
      window.location.replace('/');
    } else {
      alert("Failed to sign up!")
    }
  }
  
  if (document.getElementById('signupButton')) {
    document.getElementById('signupButton').addEventListener('click', signUp);
  }