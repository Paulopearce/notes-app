//load example data
axios.get('api/notes')
  .then((res) => {
    let notes = res.data
    notes.forEach(note => {
      const noteElem = document.createElement('li')
      noteElem.className = "list-group-item"
      noteElem.innerHTML = `
        <p>${note.title}</p>
        <hr>
        <p>${note.text}</p>
        <button class="delete" data-id="${note.text}">X</button>
      `
      document.getElementById('notes').append(noteElem)
    })
  })
  .catch(err => console.error(err))

//Add note when clicking the save
document.getElementById('saveNote').addEventListener('click', event => {
  event.preventDefault()

  if (document.getElementById('noteText').value.replace(/\s+/g, '').length !== 0) {

    const note = {
      title: document.getElementById('noteTitle').value,
      text: document.getElementById('noteText').value
    }
    
    axios.post('/api/notes', note)
      .then(() => {
        const noteElem = document.createElement('li')
        noteElem.className = "list-group-item"
        noteElem.innerHTML = `
          <p>${note.title}</p>
          <hr>
          <p>${note.text}</p>
          <button class="delete" data-id="${note.text}">X</button>
        `
        document.getElementById('notes').append(noteElem)

        document.getElementById('noteTitle').value = ''
        document.getElementById('noteText').value = ''
        
      })
      .catch(err => console.error(err))
    }
  })

  document.getElementById('newNote').addEventListener('click', event => {
    event.preventDefault()
    document.getElementById('noteTitle').value = ''
    document.getElementById('noteText').value = ''
  })

  //Delete
  document.addEventListener('click', event => {
    if (event.target.className === 'delete') {
      let id = event.target.dataset.id
      axios.delete(`/api/notes/${id}`)
        .then(() => event.target.parentNode.remove())
        .catch(err => console.error(err))
  }
})
