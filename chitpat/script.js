class ChitPatApp {
    constructor() {
        this.posts = [];
        this.currentPost = null;
        this.isFollowing = false;
        this.followersCount = 245;
        
        this.initializePosts();
        this.bindEvents();
        this.renderPosts();
    }

    initializePosts() {
        this.posts = [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
                caption: "Beautiful mountain sunset! 🌅 #nature #photography",
                likes: 42,
                comments: [
                    { user: "john_doe", text: "Amazing shot! 📸" },
                    { user: "sarah_k", text: "Love this view!" }
                ],
                liked: false
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=400&fit=crop",
                caption: "Coffee time ☕ Perfect morning brew",
                likes: 28,
                comments: [
                    { user: "coffee_lover", text: "That looks delicious!" }
                ],
                liked: false
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=400&fit=crop",
                caption: "City lights never get old 🌃 #citylife #nightphotography",
                likes: 67,
                comments: [
                    { user: "urban_explorer", text: "Great composition!" },
                    { user: "photo_enthusiast", text: "Love the lighting" }
                ],
                liked: true
            },
            {
                id: 4,
                image: "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=400&h=400&fit=crop",
                caption: "Fresh ingredients for tonight's dinner 🥗",
                likes: 35,
                comments: [],
                liked: false
            },
            {
                id: 5,
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop",
                caption: "Home sweet home 🏠 #interior #cozy",
                likes: 89,
                comments: [
                    { user: "interior_design", text: "Love your style!" }
                ],
                liked: false
            },
            {
                id: 6,
                image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop",
                caption: "Beach vibes 🌊 Missing summer already",
                likes: 124,
                comments: [
                    { user: "beach_lover", text: "Take me there!" },
                    { user: "summer_girl", text: "Perfect beach day" }
                ],
                liked: true
            },
            {
                id: 7,
                image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop",
                caption: "Into the wild 🌲 #adventure #hiking",
                likes: 56,
                comments: [
                    { user: "hiker_joe", text: "Which trail is this?" }
                ],
                liked: false
            },
            {
                id: 8,
                image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop",
                caption: "Burger night! 🍔 Homemade and delicious",
                likes: 73,
                comments: [
                    { user: "foodie_mike", text: "Looks amazing!" },
                    { user: "chef_anna", text: "Recipe please!" }
                ],
                liked: false
            },
            {
                id: 9,
                image: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=400&h=400&fit=crop",
                caption: "Golden hour magic ✨ #goldenhour #nature",
                likes: 91,
                comments: [
                    { user: "nature_lover", text: "Breathtaking!" }
                ],
                liked: true
            },
            {
                id: 10,
                image: "https://images.unsplash.com/photo-1520637736862-4d197d17c91a?w=400&h=400&fit=crop",
                caption: "Workspace setup complete 💻 #workfromhome #productivity",
                likes: 45,
                comments: [],
                liked: false
            },
            {
                id: 11,
                image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=400&fit=crop",
                caption: "Fresh strawberries 🍓 From the local market",
                likes: 38,
                comments: [
                    { user: "healthy_eats", text: "So fresh!" }
                ],
                liked: false
            },
            {
                id: 12,
                image: "https://images.unsplash.com/photo-1497436072909-f5e4be1ce74f?w=400&h=400&fit=crop",
                caption: "Library vibes 📚 Perfect study spot",
                likes: 29,
                comments: [
                    { user: "book_worm", text: "My kind of place!" },
                    { user: "student_life", text: "So peaceful" }
                ],
                liked: false
            },
            {
                id: 13,
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
                caption: "Another beautiful day 🌞 #blessed #positivevibes",
                likes: 82,
                comments: [
                    { user: "positive_soul", text: "Love your energy!" }
                ],
                liked: false
            },
            {
                id: 14,
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
                caption: "Shopping therapy 🛍️ #retail #fashion",
                likes: 64,
                comments: [],
                liked: true
            },
            {
                id: 15,
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
                caption: "Nature's beauty 🏔️ #mountains #peace",
                likes: 97,
                comments: [
                    { user: "mountain_climber", text: "Stunning view!" },
                    { user: "nature_photographer", text: "Perfect shot!" }
                ],
                liked: false
            }
        ];
    }

    bindEvents() {
        // Follow button
        const followBtn = document.getElementById('follow-btn');
        followBtn.addEventListener('click', () => this.toggleFollow());

        // Modal events
        const modal = document.getElementById('post-modal');
        const closeModal = document.getElementById('close-modal');
        
        closeModal.addEventListener('click', () => this.closeModal());
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Comment posting
        const postCommentBtn = document.getElementById('post-comment');
        const commentInput = document.getElementById('comment-input');
        
        postCommentBtn.addEventListener('click', () => this.postComment());
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.postComment();
            }
        });
    }

    renderPosts() {
        const container = document.getElementById('posts-container');
        container.innerHTML = '';

        this.posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.style.animationDelay = `${index * 0.1}s`;
            
            postElement.innerHTML = `
                <img src="${post.image}" alt="Post ${post.id}">
                <div class="post-overlay">
                    <div class="overlay-stats">
                        <span><i class="fas fa-heart"></i> ${post.likes}</span>
                        <span><i class="fas fa-comment"></i> ${post.comments.length}</span>
                    </div>
                </div>
            `;

            postElement.addEventListener('click', () => this.openModal(post));
            container.appendChild(postElement);
        });
    }

    openModal(post) {
        this.currentPost = post;
        const modal = document.getElementById('post-modal');
        const modalImg = document.getElementById('modal-img');
        const modalCaption = document.getElementById('modal-caption');
        const modalLikes = document.getElementById('modal-likes');
        
        modalImg.src = post.image;
        modalCaption.textContent = post.caption;
        modalLikes.textContent = `${post.likes} likes`;
        
        this.renderComments();
        this.updateModalActions();
        
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('post-modal');
        modal.style.display = 'none';
        this.currentPost = null;
    }

    renderComments() {
        if (!this.currentPost) return;
        
        const commentsSection = document.getElementById('comments-section');
        commentsSection.innerHTML = '';
        
        this.currentPost.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <strong>${comment.user}</strong>
                ${comment.text}
            `;
            commentsSection.appendChild(commentElement);
        });
    }

    updateModalActions() {
        if (!this.currentPost) return;
        
        const likeBtn = document.querySelector('.like-btn');
        const heartIcon = likeBtn.querySelector('i');
        
        if (this.currentPost.liked) {
            likeBtn.classList.add('liked');
            heartIcon.className = 'fas fa-heart';
        } else {
            likeBtn.classList.remove('liked');
            heartIcon.className = 'far fa-heart';
        }
        
        // Remove existing listeners and add new ones
        const newLikeBtn = likeBtn.cloneNode(true);
        likeBtn.parentNode.replaceChild(newLikeBtn, likeBtn);
        
        newLikeBtn.addEventListener('click', () => this.toggleLike());
        
        const shareBtn = document.querySelector('.share-btn');
        const newShareBtn = shareBtn.cloneNode(true);
        shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);
        
        newShareBtn.addEventListener('click', () => this.sharePost());
    }

    toggleLike() {
        if (!this.currentPost) return;
        
        this.currentPost.liked = !this.currentPost.liked;
        this.currentPost.likes += this.currentPost.liked ? 1 : -1;
        
        const modalLikes = document.getElementById('modal-likes');
        modalLikes.textContent = `${this.currentPost.likes} likes`;
        
        this.updateModalActions();
        this.renderPosts(); // Re-render to update overlay stats
    }

    sharePost() {
        if (!this.currentPost) return;
        
        if (navigator.share) {
            navigator.share({
                title: 'ChitPat Post',
                text: this.currentPost.caption,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareText = `Check out this post on ChitPat: ${this.currentPost.caption}`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('Post link copied to clipboard!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Post link copied to clipboard!');
            }
        }
    }

    postComment() {
        if (!this.currentPost) return;
        
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            const newComment = {
                user: 'you',
                text: commentText
            };
            
            this.currentPost.comments.push(newComment);
            commentInput.value = '';
            
            this.renderComments();
            this.renderPosts(); // Re-render to update comment count in overlay
        }
    }

    toggleFollow() {
        const followBtn = document.getElementById('follow-btn');
        const followersCount = document.getElementById('followers-count');
        
        this.isFollowing = !this.isFollowing;
        
        if (this.isFollowing) {
            followBtn.textContent = 'Following';
            followBtn.classList.add('following');
            this.followersCount++;
        } else {
            followBtn.textContent = 'Follow';
            followBtn.classList.remove('following');
            this.followersCount--;
        }
        
        followersCount.textContent = this.followersCount;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChitPatApp();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // In a real app, this would filter posts or search for users
        console.log('Searching for:', searchTerm);
    });
    
    // Navigation icons
    const navIcons = document.querySelectorAll('.nav-icons i');
    navIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            // Remove active class from all icons
            navIcons.forEach(i => i.classList.remove('active'));
            // Add active class to clicked icon
            e.target.classList.add('active');
            
            // Handle navigation (in a real app, this would route to different pages)
            const iconClass = e.target.className;
            if (iconClass.includes('fa-home')) {
                console.log('Navigate to home');
            } else if (iconClass.includes('fa-plus-square')) {
                console.log('Create new post');
            } else if (iconClass.includes('fa-heart')) {
                console.log('Show notifications');
            } else if (iconClass.includes('fa-user')) {
                console.log('Go to profile');
            }
        });
    });
    
    // Add some animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe post items for scroll animations
    setTimeout(() => {
        const postItems = document.querySelectorAll('.post-item');
        postItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }, 100);
});
