const products = [
    { id: 1, name: 'Producto 1', price: 10.99 },
    { id: 2, name: 'Producto 2', price: 15.99 },
    { id: 3, name: 'Producto 3', price: 20.99 },
    { id: 4, name: 'Producto 4', price: 25.99 },
    { id: 5, name: 'Producto 5', price: 30.99 },
    { id: 6, name: 'Producto 6', price: 35.99 },
];

let cart = [];

// Elementos DOM
const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const searchInput = document.getElementById('searchProducts');

// Cargar productos
function loadProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
        `;
        productElement.onclick = () => addToCart(product);
        productGrid.appendChild(productElement);
    });
}

// Agregar al carrito
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Actualizar carrito
function updateCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <span>${item.name}</span>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        cartItems.appendChild(cartItem);
    });
    updateTotal();
}

// Actualizar cantidad
function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== id);
    } else {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCart();
}

// Actualizar total
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Procesar venta
async function processCheckout() {
    // Aquí iría la lógica para conectar con MongoDB
    const sale = {
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date(),
    };

    try {
        // Simulación de guardado en MongoDB
        console.log('Venta procesada:', sale);
        alert('Venta procesada con éxito');
        cart = [];
        updateCart();
    } catch (error) {
        console.error('Error al procesar la venta:', error);
        alert('Error al procesar la venta');
    }
}

// Buscar productos
function searchProducts(query) {
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    loadProducts(filtered);
}

// Event listeners
checkoutBtn.onclick = processCheckout;
clearCartBtn.onclick = () => {
    cart = [];
    updateCart();
};
searchInput.oninput = (e) => searchProducts(e.target.value);

// Inicializar
loadProducts(products);

