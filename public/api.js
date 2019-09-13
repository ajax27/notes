var getButton = document.getElementById('user_form');
getButton.addEventListener('submit', getRequest);

function getRequest(event) {
  event.preventDefault();
  var noteId = event.target.noteId.value;
  fetch(`/notes/${noteId}`)
    .then((response) => response.json())
    .then(function (data) {
      if (!noteId) {
        document.getElementById("results").innerHTML = '';
        for (var i in data) {
          document.getElementById("results").innerHTML += data[i].title + '<br /> ' + data[i]._id + '<br /> ' + data[i].content + '<br />';
        }
      } else {
        document.getElementById("results").innerHTML = '';
        document.getElementById("results").innerHTML += data.title + '<br /> ' + data._id + '<br /> ' + data.content + '<br />';
      }
      console.log(data);
    });
};

var postButton = document.getElementById('user_form_post');
postButton.addEventListener('submit', newPost);

function newPost(event, post) {
  event.preventDefault();
  var title = event.target.title.value;
  var content = event.target.content.value;
  post = {
    title,
    content
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  return fetch('/notes', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .then(error => console.error('error: ', error))
}

var deleteButton = document.getElementById('user_form_delete');
deleteButton.addEventListener('submit', deletePost);

function deletePost(event) {
  event.preventDefault();
  var noteId = event.target.noteId.value;
  console.log(noteId);
  const options = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      noteId
    })
  }
  const URL = `/notes/${noteId}`;
  fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('Post to Delete: ', data))
}

var putButton = document.getElementById('user_form_put');
putButton.addEventListener('submit', putPost);

function putPost(event) {
  event.preventDefault();
  var noteId = event.target.noteId.value;
  var title = event.target.title.value;
  var content = event.target.content.value;
  post = {
    title,
    content
  }
  const options = {
    method: 'PATCH',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  const URL = `/notes/${noteId}`;
  return fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('Post to Update', data))
}

