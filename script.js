let data = null;

document.addEventListener('DOMContentLoaded', function() {
  fetch('data.json')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response not okay');
      } 
      return res.json();
    })
    .then(fetchedData => {
      data = fetchedData;
      const container = document.getElementById('container');
      const currentUser = data.currentUser;
      // COMMENTS FUNCTION
      data.comments.map(item => {
        renderComment(item, container, currentUser);
        if (item.replies.length > 0) {
          const repliesContainer = document.createElement('div');
          repliesContainer.className = 'replies-container';

          item.replies.map(reply => {
            renderComment(reply, repliesContainer, currentUser, true);
          });

          container.appendChild(repliesContainer);
        }
      });

      // USER FUNCTION
      const currentUserContainer = document.createElement('section');
      currentUserContainer.className = 'current-user-section';

      const currentUserImg = document.createElement('img');
      currentUserImg.id = 'current-user-img';
      currentUserImg.src = currentUser.image.png;
      currentUserImg.alt = currentUser.username;

      const textarea = document.createElement('textarea');
      textarea.id = 'new-comment';
      textarea.placeholder = 'Add a comment...';

      const sendBtn = document.createElement('button');
      sendBtn.id = 'send-btn';
      sendBtn.innerText = 'Send';
      
      const userBtmDiv = document.createElement('div');
      userBtmDiv.className = 'user-btm-div';
      userBtmDiv.appendChild(currentUserImg.cloneNode(true));
      userBtmDiv.appendChild(sendBtn.cloneNode(true));
      
      currentUserContainer.appendChild(currentUserImg);
      currentUserContainer.appendChild(textarea);
      currentUserContainer.appendChild(sendBtn);
      
      function handleScreenChange(e) {
        if(e.matches) {
          if (!currentUserContainer.contains(userBtmDiv)) {
            currentUserContainer.removeChild(currentUserImg);
            currentUserContainer.removeChild(sendBtn);
            currentUserContainer.appendChild(userBtmDiv);
          }
        } else {
          if (currentUserContainer.contains(userBtmDiv)) {
            currentUserContainer.removeChild(userBtmDiv);
            currentUserContainer.appendChild(currentUserImg);
            currentUserContainer.appendChild(textarea);
            currentUserContainer.appendChild(sendBtn);
          }
        }
      }

      const mediaQuery = window.matchMedia('(max-width: 759px)');
      mediaQuery.addEventListener('change', handleScreenChange);
      handleScreenChange(mediaQuery);
      
      container.appendChild(currentUserContainer);

      // Comment Button
      sendBtn.addEventListener('click', () => {
        // console.log('click');
        const newComment = textarea.value;
        if (newComment.trim() !== '') {
          console.log(textarea.value);
          addComment(newComment, currentUser);
        }
      });
    })
    .catch(error => {
      console.error('There was a probelm with the fecth,', error);
    })
});

function renderComment(item, container, currentUser, isReply = false) {
  // Constant Declarations
  const section = document.createElement('section');
  const headerDiv = document.createElement('div');
  const img = document.createElement('img');
  const username = document.createElement('p');
  const created = document.createElement('p'); 
  const content = document.createElement('p'); 
  const footerDiv = document.createElement('div');
  const plusIcon = document.createElement('img');
  const minusIcon = document.createElement('img');
  const replyIcon = document.createElement('img');
  const deleteIcon = document.createElement('img');
  const editIcon = document.createElement('img');
  const score = document.createElement('p'); 
  const button = document.createElement('button'); 
  const replyDiv = document.createElement('div');
  const reply = document.createElement('p'); 
  const formatToolsDiv = document.createElement('div');
  const editDiv = document.createElement('div');
  const editTxt = document.createElement('p'); 
  const deleteDiv = document.createElement('div');
  const deleteTxt = document.createElement('p'); 

  // Class name declaration
  section.className = isReply ? 'reply-section' : 'section-container';
  headerDiv.className = 'top-div';
  img.className = 'avatar';
  username.className = 'username';
  created.className = 'duration';
  content.className = 'comment-text';
  footerDiv.className = 'bottom-div';
  button.className = 'score-selector'
  replyDiv.className = 'reply-btn';
  formatToolsDiv.className = 'format-tools-container';
  editDiv.className = 'edit-btn';
  deleteDiv.className = 'delete-btn';

  // Image
  img.src = item.user.image.png;
  img.alt = item.user.username;

  // SVG
  plusIcon.src = 'images/icon-plus.svg';
  minusIcon.src = 'images/icon-minus.svg';
  replyIcon.src = 'images/icon-reply.svg';
  deleteIcon.src = 'images/icon-delete.svg';
  editIcon.src = 'images/icon-edit.svg';
  // Username
  username.innerHTML = item.user.username;
  // Created
  created.innerHTML = item.createdAt;
  // Content of comment
  content.innerHTML = item.content;
  // Score
  score.innerHTML = item.score
  reply.innerHTML = 'Reply';
  editTxt.innerHTML = 'Edit';
  deleteTxt.innerHTML = 'Delete';

  // Rendering container
  // Top div
  headerDiv.appendChild(img);
  headerDiv.appendChild(username);
  headerDiv.appendChild(created);

  // Bottom div
  button.appendChild(plusIcon);
  button.appendChild(score);
  button.appendChild(minusIcon);
  replyDiv.appendChild(replyIcon);
  replyDiv.appendChild(reply);
  deleteDiv.appendChild(deleteIcon);
  deleteDiv.appendChild(deleteTxt);
  editDiv.appendChild(editIcon);
  editDiv.appendChild(editTxt);
  formatToolsDiv.appendChild(deleteDiv);
  formatToolsDiv.appendChild(editDiv);
  footerDiv.appendChild(button);
  footerDiv.appendChild(replyDiv);

  if (currentUser.username === item.user.username) {
    footerDiv.removeChild(replyDiv);
    footerDiv.appendChild(formatToolsDiv);
  }

  section.appendChild(headerDiv);
  section.appendChild(content);
  section.appendChild(footerDiv);

  container.appendChild(section);
}

function addComment(content, currentUser) {
  const newComment = {
    id: Date.now(),
    content,
    createdAt: Date.now(),
    score: 0,
    user: {
      image: currentUser.image,
      username: currentUser.username
    },
    replies: []
  };

  data.comments.push(newComment);
  renderComment(newComment, document.getElementById('container'), currentUser);
}