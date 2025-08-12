
   const products = [
            { id: 1, name: 'Smartphone Pro', price: 999.99, description: 'Latest flagship smartphone with cutting-edge features', category: 'Electronics', image: '📱' },
            { id: 2, name: 'Laptop Ultra', price: 1299.99, description: 'High-performance laptop for work and gaming', category: 'Electronics', image: '💻' },
            { id: 3, name: 'Wireless Headphones', price: 299.99, description: 'Premium noise-cancelling headphones', category: 'Audio', image: '🎧' },
            { id: 4, name: 'Smart Watch', price: 399.99, description: 'Advanced fitness tracking and notifications', category: 'Wearables', image: '⌚' },
            { id: 5, name: 'Tablet Pro', price: 799.99, description: 'Professional tablet for creativity and productivity', category: 'Electronics', image: '📱' },
            { id: 6, name: 'Gaming Console', price: 499.99, description: 'Next-generation gaming console', category: 'Gaming', image: '🎮' }
        ];

        let users = [];
        let currentUser = null;
        let cart = [];
        let orders = [];

        // Initialize the application
        function init() {
            loadProducts();
            updateCartUI();
            checkAuthStatus();
        }

        // Page Navigation
        function showPage(pageId) {
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');

            if (pageId === 'products') {
                loadProducts();
            } else if (pageId === 'cart') {
                loadCart();
            } else if (pageId === 'checkout') {
                loadCheckout();
            }
        }

        // Product Functions
        function loadProducts() {
            const productGrid = document.getElementById('productGrid');
            productGrid.innerHTML = '';

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">${product.image}</div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <p class="product-description">${product.description}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="btn btn-secondary" onclick="showProductDetails(${product.id})" style="margin-left: 0.5rem;">View Details</button>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
        }

        function showProductDetails(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const detailsContent = document.getElementById('productDetailsContent');
            detailsContent.innerHTML = `
                <div style="background: rgba(255, 255, 255, 0.95); padding: 2rem; border-radius: 20px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); max-width: 800px; margin: 0 auto;">
                    <div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem;">
                        <div style="font-size: 8rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); width: 200px; height: 200px; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: white;">
                            ${product.image}
                        </div>
                        <div style="flex: 1;">
                            <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #333;">${product.name}</h2>
                            <p style="font-size: 1.5rem; color: #667eea; font-weight: bold; margin-bottom: 1rem;">$${product.price.toFixed(2)}</p>
                            <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">${product.description}</p>
                            <div style="display: flex; gap: 1rem;">
                                <button class="btn btn-primary" onclick="addToCart(${product.id})" style="font-size: 1.1rem; padding: 1rem 2rem;">Add to Cart</button>
                                <button class="btn btn-secondary" onclick="showPage('products')">Back to Products</button>
                            </div>
                        </div>
                    </div>
                    <div style="border-top: 2px solid #e0e0e0; padding-top: 2rem;">
                        <h3 style="margin-bottom: 1rem; color: #333;">Product Details</h3>
                        <p style="color: #666; line-height: 1.6;">Category: ${product.category}</p>
                        <p style="color: #666; line-height: 1.6;">Product ID: ${product.id}</p>
                        <p style="color: #666; line-height: 1.6;">Availability: In Stock</p>
                    </div>
                </div>
            `;
            showPage('productDetails');
        }

        // Cart Functions
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartUI();
            showNotification(`${product.name} added to cart!`);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
            loadCart();
        }

        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartUI();
                    loadCart();
                }
            }
        }

        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        function loadCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: white; font-size: 1.2rem;">Your cart is empty</p>';
                cartTotal.innerHTML = 'Total: $0.00';
                return;
            }

            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span style="margin: 0 1rem; font-weight: bold;">Qty: ${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <div style="font-weight: bold; color: #667eea;">Subtotal: $${itemTotal.toFixed(2)}</div>
                    </div>
                    <button class="btn btn-secondary" onclick="removeFromCart(${item.id})" style="margin-left: 1rem;">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });

            cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
        }

        // Authentication Functions
        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                currentUser = user;
                updateAuthUI();
                showNotification('Login successful!');
                showPage('home');
            } else {
                showNotification('Invalid email or password!', 'error');
            }
        }

        function handleRegister(event) {
            event.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;

            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }

            if (users.find(u => u.email === email)) {
                showNotification('Email already exists!', 'error');
                return;
            }

            const newUser = {
                id: users.length + 1,
                name,
                email,
                password
            };

            users.push(newUser);
            currentUser = newUser;
            updateAuthUI();
            showNotification('Registration successful!');
            showPage('home');
        }

        function logout() {
            currentUser = null;
            updateAuthUI();
            showNotification('Logged out successfully!');
            showPage('home');
        }

        function updateAuthUI() {
            const authButtons = document.getElementById('authButtons');
            const userMenu = document.getElementById('userMenu');
            const welcomeUser = document.getElementById('welcomeUser');

            if (currentUser) {
                authButtons.style.display = 'none';
                userMenu.style.display = 'flex';
                userMenu.style.alignItems = 'center';
                userMenu.style.gap = '1rem';
                welcomeUser.textContent = `Welcome, ${currentUser.name}!`;
                welcomeUser.style.color = '#667eea';
                welcomeUser.style.fontWeight = 'bold';
            } else {
                authButtons.style.display = 'flex';
                userMenu.style.display = 'none';
            }
        }

        function checkAuthStatus() {
            // In a real app, this would check for stored auth tokens
            updateAuthUI();
        }

        // Order Functions
        function loadCheckout() {
            if (!currentUser) {
                showNotification('Please login to proceed with checkout!', 'error');
                showPage('login');
                return;
            }

            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                showPage('cart');
                return;
            }
        }

            const orderSummary = document.getElementById('orderSummary');
            let total = 0;
            let summaryHTML = '<h3 style="margin-bottom: 1rem; color: #333;">Order Summary</h3>';

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                summaryHTML += `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${itemTotal.toFixed(2)}</span>
                    </div>
                `;
            });
             