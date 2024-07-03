let filteredProducts = [...products];

const productsContainer = document.querySelector(".products-container");

const displayProducts = () => {
	if (filteredProducts.length < 1) {
		productsContainer.innerHTML = `<h6>Sorry, no products matched your search!</h6>`;
		return;
	}
	productsContainer.innerHTML = filteredProducts
		.map(({ id, title, image, price, company }) => {
			return `
        <article class="product" data-id=${id}>
			<img src="${image}" class="product-img img" />
			<footer>
				<h5 class="product-name">${title} - from ${company} </h5>
				<span class="product-price">$${price}</span>
			</footer>
		</article>
        `;
		})
		.join("");
};

displayProducts();

// Text filter - from the Search engine (input)

const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
	const inputValue = searchInput.value;

	filteredProducts = products.filter((product) => {
		return product.title.toLowerCase().includes(inputValue);
	});
	displayProducts();
});

// Button filters

const companies = document.querySelector(".companies");

const displayButtons = () => {
	const uniqueButtons = ["all", ...new Set(products.map((item) => item.company))];
	companies.innerHTML = uniqueButtons
		.map((company) => {
			return `<button class="company-btn" data-id=${company}>${company}</button>`;
		})
		.join("");
};

displayButtons();

companies.addEventListener("click", (e) => {
	const el = e.target;
	if (el.classList.contains("company-btn")) {
		if (el.dataset.id === "all") {
			filteredProducts = [...products];
		} else {
			filteredProducts = products.filter((product) => {
				return product.company === el.dataset.id;
			});
		}
		searchInput.value = "";
		displayProducts();
	}
});
