// set up button-click handler with the follwoing code:
async function deleteFormHandler(event) {
  event.preventDefault();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(respones.statusText);
  }
}

document
  .querySelector('.delete-post-btn')
  .addEventListener('click', deleteFormHandler);

// When the button is clicked, need to capture the id of the post and use fetch() to make
// a DELETE request to /api/posts/:id. If the request is successful, redirect the user using
// document.location.replace('/dashboard/')
