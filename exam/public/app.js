const { axios } = window

document.getElementById('addItem').addEventListener('click', event => {
  event.preventDefault()

  const item = {
    text: document.getElementById('text').value,
    isDone: false
  }

  axios.post('/api/items', item)
    .then(() => {
      const itemElem = document.createElement('div')
      itemElem.innerHTML = `
        <p>${item.text}</p>
        <button class="isDone" data-text="${item.text}">${item.isDone ? 'Done' : 'Not Done'}</button>
        <button class="delete" data-text="${item.text}">x</button>
        <hr>
      `
      document.getElementById('items').append(itemElem)

      document.getElementById('text').value = ''
    })
    .catch(err => console.error(err))
})

document.addEventListener('click', event => {
  if (event.target.className === 'delete') {
    const text = event.target.dataset.text
    axios.delete(`/api/items/${text}`)
      .then(() => event.target.parentNode.remove())
      .catch(err => console.error(err))
  }
})

document.addEventListener('click', event => {
  if (event.target.className === 'isDone') {
    const text = event.target.dataset.text

    axios.put(`/api/items/${text}`)
      .then(() => {
        if (event.target.textContent === 'Done') {
          event.target.textContent = 'Not Done'
        } else {
          event.target.textContent = 'Done'
        }
      })
      .catch(err => console.error(err))
  }
})

axios.get('/api/items')
  .then(({ data: items }) => {
    items.forEach(item => {
      const itemElem = document.createElement('div')
      itemElem.innerHTML = `
        <p>${item.text}</p>
        <button class="isDone" data-text="${item.text}">${item.isDone ? 'Done' : 'Not Done'}</button>
        <button class="delete" data-text="${item.text}">x</button>
        <hr>
      `
      document.getElementById('items').append(itemElem)
    })
  })
  .catch(err => console.error(err))
