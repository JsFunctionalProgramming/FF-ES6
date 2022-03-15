const products = [
	{name: '반팔티', price: 15000, quantity: 1, is_selected: false},
	{name: '긴팔티', price: 20000, quantity: 2, is_selected: false},
	{name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: false},
	{name: '후드티', price: 30000, quantity: 4, is_selected: true},
	{name: '바지', price: 25000, quantity: 5, is_selected: true},
]

const add = (a, b) => a + b

const sum = curry((f, iter) => go(
	iter,
	map(f),
	reduce(add)
))

const total_quantity = sum((p => p.quantity))

const total_quantity2 = pipe(
	map(p => p.quantity),
	console.log
)

const total_price = sum((p => p.price * p.quantity))
const total_price2 = products => sum(p => p.price * p.quantity)(products)

console.log(total_quantity(products))
console.log(total_quantity2(products))
console.log(total_price(products))
console.log(total_price2(products))

document.querySelector('#cart').innerHTML = `
	<table>
		<tr>
			<th>상품 이름</th>
			<th>가격</th>
			<th>수량</th>
			<th>총 가격</th>
		</tr>
		${
		go(products, sum(
			p => `
				<tr>
					<td>
						<label for="p">
							<input type="checkbox" name="p" ${p.is_selected ? 'checked' : ''}">
						</label>
					</td>
					
					<td>${p.name}</td>
					<td><input type="number" value="${p.quantity}" name="" id=""></td>
					<td>${p.quantity}</td>
					<td>${p.price * p.quantity}</td>
				</tr>
			`),
		) // 전체를 다 해준다
}
		<tr>
			<td colspan="2">합계</td>
			<td>${total_quantity(filter(p => p.is_selected, products))} </td>
			<td>${total_price(filter(p => p.is_selected, products))}</td>
		</tr>
	</table>
	
`