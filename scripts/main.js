
const blogPost = document.querySelector('.post')
const form = document.querySelector('.form')

const postButton = document.querySelector('.new-post')

postButton.addEventListener('click', (event) =>{
  form.classList.remove('hidden')
  blogPost.classList.add('hidden')
})

const dropdown = document.querySelector('.custom-select')

dropdown.addEventListener('change', (event) => {
  form.classList.add('hidden')
  blogPost.classList.remove('hidden')
})

const editPost = document.querySelector('.edit-post')

editPost.addEventListener('click', (event) => {

})

const deletePost = document.querySelector('.delete-post')

deletePost.addEventListener('click', (event) => {
  
})



