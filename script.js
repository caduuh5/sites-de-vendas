let cart = [];

// Função para adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const product = {
            id: event.target.getAttribute('data-id'),
            name: event.target.getAttribute('data-name'),
            price: parseFloat(event.target.getAttribute('data-price'))
        };
        
        // Adiciona o produto ao carrinho
        cart.push(product);
        
        // Atualiza o contador do carrinho
        document.getElementById('cart-count').textContent = cart.length;
        
        // Atualiza o carrinho
        updateCart();
    });
});

// Função para atualizar o carrinho
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual
    
    let total = 0;
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price;
    });
    
    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Evento de checkout
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Compra finalizada com sucesso!');
        cart = []; // Limpa o carrinho após a compra
        document.getElementById('cart-count').textContent = 0;
        updateCart();
    } else {
        alert('Seu carrinho está vazio!');
    }
});
// Catálogo de produtos (Simulação de um banco de dados)
const products = [
    { id: 1, name: "Tênis Runner Pro", price: 299.90, image: "images/runner.jpg" },
    { id: 2, name: "Sneaker Casual X", price: 189.50, image: "images/casual.jpg" },
    { id: 3, name: "Bota Trail Max", price: 349.00, image: "images/trail.jpg" }
    // Adicione mais produtos aqui
];

let cart = []; // Array para armazenar os itens no carrinho

// --- Funções de Inicialização ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Carregar carrinho do localStorage ao iniciar
    loadCartFromLocalStorage();
    
    // 2. Renderizar os produtos na página
    renderProducts();

    // 3. Configurar eventos do modal
    setupModalEvents();
});

// --- Funções do LocalStorage ---

function saveCartToLocalStorage() {
    localStorage.setItem('tenisCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('tenisCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartDisplay();
    }
}

// --- Funções de Renderização e Interação ---

function renderProducts() {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = ''; // Limpa a lista antes de renderizar

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="https://via.placeholder.com/200x150?text=${product.name.replace(/\s/g, '+')}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
        `;
        productsList.appendChild(productCard);
    });

    // Adiciona evento de clique a TODOS os botões "Adicionar"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (product) {
        if (cartItem) {
            cartItem.quantity += 1; // Aumenta a quantidade se já existir
        } else {
            cart.push({ ...product, quantity: 1 }); // Adiciona novo item
        }
        
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    saveCartToLocalStorage();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    let total = 0;

    cartItemsList.innerHTML = ''; // Limpa a lista

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} (x${item.quantity}) - R$ ${itemTotal.toFixed(2)}
            <button class="remove-item-btn" data-id="${item.id}">Remover</button>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Atualiza o total e a contagem na interface
    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Adiciona eventos aos novos botões "Remover"
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

function setupModalEvents() {
    const modal = document.getElementById('cart-modal');
    const openBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.querySelector('.close-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    openBtn.onclick = () => {
        modal.style.display = 'block';
    };

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    checkoutBtn.onclick = () => {
        if (cart.length > 0) {
            alert("Compra finalizada! Total: R$ " + document.getElementById('cart-total').textContent);
            cart = []; // Esvazia o carrinho
            saveCartToLocalStorage();
            updateCartDisplay();
            modal.style.display = 'none';
        } else {
            alert("Seu carrinho está vazio!");
        }
    };
}