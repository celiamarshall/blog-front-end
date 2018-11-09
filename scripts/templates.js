function optionsTemplate({ id, title }) {
  return `<option value="${id}" class="post-option" data-id="${id}">${title}</option>`
}

function blogPostTemplate({ date, title, content }) {
  return `<h2 class="post-title">${title}</h2>
  <p class="post-date">${date}</p>
  <hr>
  <article>
    <p class="blog-post-content">${content}</p>
  </article>
  <div class="post-buttons">
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a class="nav-link edit-post" href="#">Edit</a>
      </li>
      <li class="nav-item">
       <a class="nav-link text-danger delete-post" href="#">Delete</a>
      </li>
    </ul>
  </div>`
}

module.exports = { optionsTemplate, blogPostTemplate }