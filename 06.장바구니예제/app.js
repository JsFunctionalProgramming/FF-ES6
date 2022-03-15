const products = [
	{name: '반팔티', price: 15000, quantity: 1},
	{name: '긴팔티', price: 20000, quantity: 2},
	{name: '핸드폰케이스', price: 15000, quantity: 3},
	{name: '후드티', price: 30000, quantity: 4},
	{name: '바지', price: 25000, quantity: 5},
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
		<tr>
			<td>반팔티</td>
			<td>10000</td>
			<td><input type="number" value="3" name="" id=""></td>
			<td>30000</td>
		</tr>
		<tr>
			<td>반팔티</td>
			<td>10000</td>
			<td>3</td>
			<td>30000</td>
		</tr>
		<tr>
			<td colspan="2">합계</td>
			<td>6 </td>
			<td>60000</td>
		</tr>
	</table>
	
`