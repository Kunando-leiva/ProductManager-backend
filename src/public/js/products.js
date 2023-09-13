import logger from "../../utils/logger.util.js";

const productsForm = document.querySelectorAll('.product-form');

productsForm.forEach((productForm) => {
	productForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const cart = productForm.getAttribute('cart');
		const product = productForm.getAttribute('product');
		fetch(`/cart/${cart}/producto/${product}`, {
			method: 'POST',
		})
			.then(res => {
				if (res.status !== 200) return;
				alert('Added');
			})
			.catch(err => logger.error(`Catch error: ${err}`))
	});
});