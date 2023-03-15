async function logIn(e){
  e.preventDefault()

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

async function logOut(e){
  e.preventDefault()

  const response = await fetch('/api/user/logout', {
    method: 'POST'
  })

    if(response.ok) document.location.replace('/')
    else alert('Logout failed somehow.')
}
if (document.getElementById('logout')) document.getElementById('logout').addEventListener("click", logOut)

async function signUp(e) {
  e.preventDefault()

  const name = document.getElementById('name').value.trim();
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
if (document.getElementById('signupButton')) document.getElementById('signupButton').addEventListener('click', signUp)

async function newOccasion(e){
  e.preventDefault()

  const name = document.getElementById('occasion').value.trim()
  const date = document.getElementById('date').value.trim()
  const location = document.getElementById('location').value.trim()

  if (!name || !date || !location) return

  const response = await fetch('/api/occasion', {
    method: 'POST',
    body: JSON.stringify({name, date, location}),
    headers: { 'content-type': 'application/json' }
  })
  if (response.ok) window.location.replace('/')
  else alert("Occasion failed to post")
  }
if (document.getElementById('occasionbutton')) document.getElementById('occasionbutton').addEventListener("click", newOccasion)

async function newRecipient(e){
  e.preventDefault()

  const name = document.getElementById('recipient').value.trim()
  const id = e.currentTarget.dataset.occasion_id

  const response = await fetch(`/api/recipient/${id}`, {
    method: 'POST',
    body: JSON.stringify({name}),
    headers: { 'content-type': 'application/json' }
  })
  if (response.ok) window.location.replace('/')
  else alert("Recipient not added")
}
if (document.getElementById('recipientButton')) document.getElementById('recipientButton').addEventListener("click", newRecipient)

async function newGift(e){
  e.preventDefault()

  const name = document.getElementById('gift').value.trim()
  const id = e.currentTarget.dataset.recipient_id

  document.querySelector('.load-wrapp').classList.remove("hide")
  const apiurl = `https://api.rainforestapi.com/request?api_key=6F59069603B045B486F480A80D5C27AA&type=search&amazon_domain=amazon.com&search_term=${name}&sort_by=price_low_to_high`;
  const rainforestResponse = await fetch(apiurl)
  const rainForestData = await rainforestResponse.json()
  const price = rainForestData.search_results[0].price.value;
  const img1 = rainForestData.search_results[0].image;
  const img2 = rainForestData.search_results[1].image;
  const img3 = rainForestData.search_results[2].image;
  const link1 = rainForestData.search_results[0].link;
  const link2 = rainForestData.search_results[1].link;
  const link3 = rainForestData.search_results[2].link;
  
  const response = await fetch(`/api/gift/${id}`, {
    method: 'POST',
    body: JSON.stringify({name, price, img1, img2, img3, link1, link2, link3}),
    headers: { 'content-type': 'application/json' }
  })
    if (response.ok) window.location.replace('/')
    else alert("Gift not added")
}
if (document.getElementById('giftButton')) document.getElementById('giftButton').addEventListener("click", newGift)

////////////////////////OCCASION LOGIC

const deleteOccasion = async(e) => {
  e.stopPropagation()

  const id = e.currentTarget.dataset.delete //uses a dataset tag from our delete button to target the proper post id
 
  const response = await fetch(`/api/occasion/${id}`, {
      method: 'DELETE',
  })
  if (response.ok) document.location.replace(`/`)
  else alert('Failed to delete.')
}
document.querySelectorAll(".deleteoccasion").forEach(occasion => {
  occasion.addEventListener("click", deleteOccasion)
})

const editOccasion = (e) => {
  e.stopPropagation()

  const id = e.currentTarget.dataset.edit //targetting the post id
  const targetElement = document.querySelector(`[data-occasiontitle="${id}"]`) //targetting the body element
  targetElement.contentEditable = true //making the field editable
  targetElement.classList.add("editing")
  targetElement.focus() //changing our focus to that element

  targetElement.addEventListener("blur", saveOccasion) //adding an event listener for when we stop focusing on the editted element
}
document.querySelectorAll(".editoccasion").forEach(edit => {
  edit.addEventListener("click", editOccasion)
})

const saveOccasion = async(e) => {
  const targetElement = e.target
  targetElement.removeEventListener("blur", saveOccasion) //remove event listener so it wont fire again
  targetElement.classList.remove("editing") 

  const id = e.currentTarget.dataset.occasiontitle
  const name = targetElement.innerText

  const response = await fetch(`/api/occasion/${id}`, {
      method: "PUT",
      body: JSON.stringify({name, id}),
      headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) document.location.replace(`/`)
  else alert('Failed to edit.')
}

////////////////////////////RECIPIENT LOGIC

const editRecipient = (e) => {
  e.stopPropagation()

  const id = e.currentTarget.dataset.editrecipient //targetting the post id
  const targetElement = document.querySelector(`[data-recipienttext="${id}"]`) //targetting the body element
  targetElement.contentEditable = true //making the field editable
  targetElement.classList.add("editing")
  targetElement.focus() //changing our focus to that element

  targetElement.addEventListener("blur", saveRecipient) //adding an event listener for when we stop focusing on the editted element
}
document.querySelectorAll(".editrecipient").forEach(edit => {
  edit.addEventListener("click", editRecipient)
})

const saveRecipient = async(e) => {
  const targetElement = e.target
  targetElement.removeEventListener("blur", saveRecipient) //remove event listener so it wont fire again
  targetElement.classList.remove("editing") 

  const id = e.currentTarget.dataset.recipienttext
  const name = targetElement.innerText

  const response = await fetch(`/api/recipient/${id}`, {
      method: "PUT",
      body: JSON.stringify({name}),
      headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) document.location.replace(`/`)
  else alert('Failed to edit.')
}

const deleteRecipient = async(e) => {
  e.stopPropagation()

  const id = e.currentTarget.dataset.deleterecipient //uses a dataset tag from our delete button to target the proper post id
 
  const response = await fetch(`/api/recipient/${id}`, {
      method: 'DELETE',
  })
  if (response.ok) document.location.replace(`/`)
  else alert('Failed to delete.')
}
document.querySelectorAll(".deleterecipient").forEach(recipient => {
  recipient.addEventListener("click", deleteRecipient)
})

/////////////////GIFT LOGIC

const editGift = (e) => {
  e.stopPropagation()

  const id = e.currentTarget.dataset.giftedit //targetting the post id

  const targetElement = document.querySelector(`[data-gifttext="${id}"]`) //targetting the body element
  targetElement.contentEditable = true //making the field editable
  targetElement.classList.add("editing")
  targetElement.focus() //changing our focus to that element

  targetElement.addEventListener("blur", saveGift) //adding an event listener for when we stop focusing on the editted element
}
document.querySelectorAll(".editgift").forEach(edit => {
  edit.addEventListener("click", editGift)
})

const saveGift = async(e) => {
  const targetElement = e.target
  targetElement.removeEventListener("blur", saveGift) //remove event listener so it wont fire again
  targetElement.classList.remove("editing") 

  const id = e.currentTarget.dataset.gifttext
  const name = targetElement.innerText

  const response = await fetch(`/api/gift/${id}`, {
      method: "PUT",
      body: JSON.stringify({name}),
      headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) document.location.replace(`/`)
  else alert('Failed to edit.')
}

const deleteGift = async(e) => {
  e.stopPropagation()

  const id = e.currentTarget.dataset.giftdelete //uses a dataset tag from our delete button to target the proper post id
 
  const response = await fetch(`/api/gift/${id}`, {
      method: 'DELETE',
  })
  if (response.ok) document.location.replace(`/`)
  else alert('Failed to delete.')
}
document.querySelectorAll(".deletegift").forEach(gift => {
  gift.addEventListener("click", deleteGift)
})