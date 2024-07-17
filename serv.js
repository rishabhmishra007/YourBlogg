let posts = [];

function postBlog() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const username = document.getElementById('username').value;
    const image = document.getElementById('image').files[0];
    
    if (title && content && username) {
        const postId = Date.now();
        const post = {
            id: postId,
            title: title,
            content: content,
            username: username,
            image: image ? URL.createObjectURL(image) : null,
            date: new Date().toLocaleString(),
            likes: 0
        };
        
        posts.push(post);
        renderPosts();
        
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('username').value = '';
        document.getElementById('image').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.setAttribute('data-id', post.id);
        
        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;
        postElement.appendChild(postTitle);
        
        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image;
            postImage.alt = 'Post Image';
            postImage.style.maxWidth = '100%';
            postElement.appendChild(postImage);
        }
        
        const postContent = document.createElement('p');
        postContent.textContent = post.content;
        postElement.appendChild(postContent);
        
        const postAuthor = document.createElement('p');
        postAuthor.textContent = `Posted by ${post.username}`;
        postElement.appendChild(postAuthor);
        
        const postDate = document.createElement('p');
        postDate.textContent = post.date;
        postElement.appendChild(postDate);
        
        const actions = document.createElement('div');
        actions.className = 'actions';
        
        const likeButton = document.createElement('button');
        likeButton.textContent = `Like (${post.likes})`;
        likeButton.onclick = () => likePost(post.id);
        actions.appendChild(likeButton);
        
        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentButton.onclick = () => alert('Comment');
        actions.appendChild(commentButton);
        
        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share';
        shareButton.onclick = () => alert('Shared');
        actions.appendChild(shareButton);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = () => editPost(post.id);
        actions.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = () => deletePost(post.id);
        actions.appendChild(deleteButton);
        
        postElement.appendChild(actions);
        
        postsContainer.appendChild(postElement);
    });
}

function likePost(postId) {
    posts = posts.map(post => {
        if (post.id === postId) {
            return { ...post, likes: post.likes + 1 };
        }
        return post;
    });
    renderPosts();
}

function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    renderPosts();
}

function editPost(postId) {
    const post = posts.find(post => post.id === postId);
    if (post) {
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('username').value = post.username;
        document.getElementById('image').value = '';

        // Remove the old post after editing
        deletePost(postId);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
});

   
