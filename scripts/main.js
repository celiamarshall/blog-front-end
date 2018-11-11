const { getPosts, deletePost, addPost, editPost, getPost } = require('./posts')
const { optionsTemplate, blogPostTemplate } = require('./templates')

const dropdown = document.querySelector('.custom-select')
const blogPost = document.querySelector('.post')
const form = document.querySelector('.form-new')
const editForm = document.querySelector('.form-edit')
const postButton = document.querySelector('.new-post')

//initial render of data
getPosts()
  .then((response) => {
    renderOptions(response.data)
    addButtonEvents()
  })

//show form
postButton.addEventListener('click', (event) => {
  editForm.classList.add('hidden')
  blogPost.classList.add('hidden')
  form.classList.remove('hidden')
})

//add
form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!event.target.title.value || !event.target.date.value || !event.target.content.value) {
    document.querySelector('.alert').classList.remove('hidden')
    return
  }

  let errorMessage = null

  const newPost = {
    title: event.target.title.value,
    date: event.target.date.value,
    content: event.target.content.value
  }

  addPost(newPost)
    .then((response) => {
      return getPosts()
    })
    .then((response) => {
      renderOptions(response.data)
    })
    .catch((error) => {
      form.classList.add('hidden')
      blogPost.classList.remove('hidden')
      errorMessage = error.response.data.error.message[0]
      blogPost.innerHTML = errorMessage
    })

  if (!errorMessage) {
    event.target.title.value = ''
    event.target.date.value = ''
    event.target.content.value = ''

    form.classList.add('hidden')
    blogPost.classList.remove('hidden')
    blogPost.innerHTML = '<p>Post added!</p>'
    document.querySelector('.alert').classList.add('hidden')
  }
})




//edit and delete button events
function addButtonEvents() {
  const editPostButton = document.querySelector('.edit-post')
  
  editPostButton.addEventListener('click', (event) => {
    form.classList.add('hidden')
    blogPost.classList.add('hidden')
    editForm.classList.remove('hidden')
    
    getPost(dropdown.value)
    .then((response) => {
      editFormTitle.value = response.data.data.title
      editFormDate.value = response.data.data.date
      editFormContent.value = response.data.data.content
    })
  })
  
  //delete
  const remove = document.querySelector('.delete-post')
  
  remove.addEventListener('click', (event) => {
    let errorMessage = null
    deletePost(dropdown.value)
    .then((response) => {
      return getPosts()
    })
    .then((response) => {
      renderOptions(response.data)
    })
    .catch((error) => {
      errorMessage = error.response.data.error.message[0]
      blogPost.innerHTML = errorMessage
    })
    if (!errorMessage) {
      blogPost.innerHTML = '<p>Post deleted!</p>'
    }
  })
}


//edit
const editFormTitle = document.querySelector('#titleEdit')
const editFormDate = document.querySelector('#dateEdit')
const editFormContent = document.querySelector('#contentEdit')

editForm.addEventListener('submit', (event) => {
  let errorMessage = null
  event.preventDefault()
  const updatedPost = {
    title: event.target.titleEdit.value,
    date: event.target.dateEdit.value,
    content: event.target.contentEdit.value
  }

  editPost(dropdown.value, updatedPost)
    .then((response) => {
      return getPosts()
    })
    .then((response) => {
      renderOptions(response.data)
    })
    .catch((error) => {
      editForm.classList.add('hidden')
      blogPost.classList.remove('hidden')
      errorMessage = error.response.data.error.message[0]
      blogPost.innerHTML = errorMessage
    })

  if (!errorMessage) {
    blogPost.classList.remove('hidden')
    editForm.classList.add('hidden')
    blogPost.innerHTML = '<p>Post updated!</p>'
  }
})


function renderOptions(posts) {
  const optionsHTMLArray = posts.map(post => optionsTemplate(post))

  dropdown.innerHTML = optionsHTMLArray.join('')

  dropdown.addEventListener('change', (event) => {
    form.classList.add('hidden')
    editForm.classList.add('hidden')
    blogPost.classList.remove('hidden')

    getPost(dropdown.value)
      .then((response) => {
        blogPost.innerHTML = blogPostTemplate(response.data.data)
        addButtonEvents()
      })
  })
}





