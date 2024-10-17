var swiper = new Swiper(".mySwiper", {
	loop: true,
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
	loop: true,
	spaceBetween: 10,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	thumbs: {
		swiper: swiper,
	},
});

const cart = localStorage.getItem('cart');
if (!cart) {
	localStorage.setItem('cart', JSON.stringify([]))
}
// Cart
const count_quantity_cart = () => {

	const iconCart = document.querySelector('[icon-cart]');
	if (cart) {
		if (iconCart) {
			iconCart.innerHTML = `Giỏ hàng (${JSON.parse(localStorage.getItem('cart')).length})`
		}
	} else {
		iconCart.innerHTML = `Giỏ hàng (0)`
	}
}
count_quantity_cart();

// form-tour-detail
const formTourDetail = document.querySelector('form[form-tour-detail]');
if (formTourDetail) {
	formTourDetail.addEventListener('submit', (event) => {
		event.preventDefault();
		const quantity = parseInt(event.target.elements[0].value);
		const tourId = formTourDetail.getAttribute('tour-id');
		if (tourId && quantity > 0) {
			const data = {
				tourId: parseInt(tourId),
				quantity: quantity
			}
			let cart = localStorage.getItem('cart');
			cart = JSON.parse(cart)
			const check = cart.find(it => it.tourId == data.tourId)
			if (check) {
				check.quantity += data.quantity
			} else {
				cart.push(data)

			}
			cart = JSON.stringify(cart)
			localStorage.setItem('cart', cart)
			count_quantity_cart()
		}
	});
}
const tableCart = document.querySelector('[table-cart]');
if (tableCart) {
	fetch('/cart', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: localStorage.getItem('cart')
		})
		.then(res => res.json())
		.then(data => {
			const tbody = tableCart.querySelector('tbody');
			if (tbody) {
				const html = data.listTour.map((tour, i) => `
					<tr>
						<td class="text-center"><div>${i + 1}</div></td>
						<td>
						<div>
							<img src=${tour.image} alt="" class='rounded-[10px] aspect-square h-[80px] object-cover'>
						</div>
						</td>
						<td><div>${tour.title}</div></td>
						<td class="text-center"><div>${tour.priceNew.toLocaleString()}đ</div></td>
						<td class="text-center"><div>${tour.quantity}</div></td>
						<td class="text-center"><div>${tour.totalPrice.toLocaleString()}đ</div></td>
						<td class="text-center">
								<div deleted-item = ${tour.tourId}>Xóa</div>
						</td>
					</tr>
					

				`)
				tbody.innerHTML = html.join("")
				const sumPrice = document.querySelector('[sum-price]')
				if (sumPrice) {
					sumPrice.innerHTML = data.sumPrice.toLocaleString() + 'đ'
				}
				detetedItem()
			}
		})

}

const detetedItem = () => {
	if (tableCart) {
		const deletedItem = tableCart.querySelectorAll('[deleted-item]');
	
		if (deletedItem.length > 0) {
			deletedItem.forEach(it => {
				it.addEventListener('click', () => {
					const id = it.getAttribute('deleted-item');
					if (id) {
						console.log(id)
						const cart = JSON.parse(localStorage.getItem('cart'));
						const newCart = cart.filter(it => it.tourId != id)
						localStorage.setItem('cart', JSON.stringify(newCart))
						window.location.reload()
					}
				})
			})
		}
	}
}


const formOrder = document.querySelector('[form-order]');
if(formOrder){
	formOrder.addEventListener('submit', (event) => {
		event.preventDefault();
		const data = {
			info: {
				fullName: formOrder.fullName.value,
				phone: formOrder.phone.value,
				address: formOrder.address.value,
				note: formOrder.note.value
			},
			cart: JSON.parse(localStorage.getItem('cart'))
		}
		fetch('/order', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(data => {
				if(data.code == 200){

				}
			})
	})
}