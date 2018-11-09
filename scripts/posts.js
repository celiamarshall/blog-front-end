const axios = require('axios')
const BASE_URL = 'https://celia-marshall-blog-api.herokuapp.com/posts'
//const BASE_URL = 'http://localhost:3000/posts'

function getPosts() {
  return axios.get(BASE_URL)
}

function getPost(id) {
  return axios.get(BASE_URL + '/' + id)
}

function addPost(newPost) {
  return axios.post(BASE_URL, newPost)
}

function editPost(id, newPost) {
  return axios.put(BASE_URL + '/' + id, newPost)
}

function deletePost(id) {
  return axios.delete(BASE_URL + '/' + id)
}

module.exports = { getPosts, getPost, addPost, editPost, deletePost }