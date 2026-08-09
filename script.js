const cart = [];

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const addButtons = document.querySelectorAll(".add-cart");


// ABRIR CARRITO
cartButton.addEventListener("click", () => {
  cartPanel.classList.add("active");
});


// CERRAR CARRITO
closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("active");
});


// AGREGAR PRODUCTOS
addButtons.forEach(button => {

  button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existingProduct = cart.find(
      product => product.name === name
    );

    if (existingProduct) {

      existingProduct.quantity++;

    } else {

      cart.push({
        name: name,
        price: price,
        quantity: 1
      });

    }

    updateCart();

    cartPanel.classList.add("active");

  });

});


// ACTUALIZAR CARRITO
function updateCart() {

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Tu carrito está vacío.
      </p>
    `;

  } else {

    cart.forEach((product, index) => {

      const item = document.createElement("div");

      item.classList.add("cart-product");

      item.innerHTML = `

        <div class="cart-product-info">

          <h3>${product.name}</h3>

          <p>
            $${product.price.toFixed(2)}
          </p>

        </div>

        <div class="quantity-controls">

          <button
            onclick="changeQuantity(${index}, -1)">
            −
          </button>

          <span>
            ${product.quantity}
          </span>

          <button
            onclick="changeQuantity(${index}, 1)">
            +
          </button>

        </div>

        <button
          class="remove-product"
          onclick="removeProduct(${index})">
          Eliminar
        </button>

      `;

      cartItems.appendChild(item);

    });

  }

  updateCartTotal();

}


// CAMBIAR CANTIDAD
function changeQuantity(index, change) {

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }

  updateCart();

}


// ELIMINAR PRODUCTO
function removeProduct(index) {

  cart.splice(index, 1);

  updateCart();

}


// CALCULAR TOTAL
function updateCartTotal() {

  const total = cart.reduce(
    (sum, product) =>
      sum + product.price * product.quantity,
    0
  );

  const totalProducts = cart.reduce(
    (sum, product) =>
      sum + product.quantity,
    0
  );

  cartTotal.textContent =
    `$${total.toFixed(2)}`;

  cartCount.textContent =
    totalProducts;

}


// BOTÓN FINALIZAR COMPRA
document
  .querySelector(".checkout-button")
  .addEventListener("click", () => {

    if (cart.length === 0) {

      alert("Tu carrito está vacío.");

      return;

    }

    alert(
      "¡Gracias por tu compra en Anthony Boutique! " +
      "Pronto conectaremos este botón con el sistema de pago."
    );

  });


// INICIAR
updateCart();
