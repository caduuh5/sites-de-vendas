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
