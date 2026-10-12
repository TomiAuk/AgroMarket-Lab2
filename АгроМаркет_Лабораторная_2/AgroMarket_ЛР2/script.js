const catalog = document.querySelector('#product-list');
const message = document.querySelector('#catalog-message');
const cartCount = document.querySelector('#cart-count');
let count = 0;

async function loadProducts() {
  message.textContent = 'Загружаем товары...';
  try {
    const response = await fetch('http://localhost:3001/products');
    if (!response.ok) throw new Error('Сервер вернул ошибку');
    const products = await response.json();
    renderProducts(products);
    message.textContent = products.length ? '' : 'Товары пока отсутствуют.';
  } catch (error) {
    message.textContent = 'Не удалось загрузить товары. Проверьте, запущен ли json-server.';
    console.error(error);
  }
}

function renderProducts(products) {
  catalog.replaceChildren();
  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;
    const title = document.createElement('h3');
    title.textContent = product.name;
    const price = document.createElement('p');
    price.textContent = `${product.price} тг`;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'В корзину';
    button.addEventListener('click', () => {
      count += 1;
      cartCount.textContent = count;
    });
    card.append(image, title, price, button);
    catalog.appendChild(card);
  });
}

loadProducts();
