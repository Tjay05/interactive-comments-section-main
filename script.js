document.addEventListener('DOMContentLoaded', function() {
  fetch('data.json')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response not okay');
      } 
      return res.json();
    })
    .then(data => {
      const container = document.getElementById('container');
      data.comments.map(item => {
        renderComment(item, container);
        if (item.replies.length > 0) {
          const repliesContainer = document.createElement('div');
          repliesContainer.className = 'replies-container';

          item.replies.map(reply => {
            renderComment(reply, repliesContainer, true);
          });

          container.appendChild(repliesContainer);
        }
      });
    })
    .catch(error => {
      console.error('There was a probelm with the fecth,', error);
    })
});

function renderComment(item, container, isReply = false) {
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
  const score = document.createElement('p'); 
  const button = document.createElement('button'); 
  const replyDiv = document.createElement('div');
  const reply = document.createElement('p'); 

  // Class name declaration
  section.className = isReply ? 'reply-section' : 'section-container';
  headerDiv.className = 'top-div';
  img.className = 'avatar';
  username.className = 'username';
  created.className = 'duration';
  content.className = 'comment-text';
  footerDiv.className = 'bottom-div';
  button.className = 'score-selector'
  replyDiv.className = 'reply-btn'

  // Image
  img.src = item.user.image.png;
  img.alt = item.user.username;
  // SVG
  plusIcon.src = 'images/icon-plus.svg';
  minusIcon.src = 'images/icon-minus.svg';
  replyIcon.src = 'images/icon-reply.svg';
  // Username
  username.innerHTML = item.user.username;
  // Created
  created.innerHTML = item.createdAt;
  // Content of comment
  content.innerHTML = item.content;
  // Score
  score.innerHTML = item.score
  reply.innerHTML = 'Reply'

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
  footerDiv.appendChild(button);
  footerDiv.appendChild(replyDiv);

  section.appendChild(headerDiv);
  section.appendChild(content);
  section.appendChild(footerDiv);

  container.appendChild(section);
}