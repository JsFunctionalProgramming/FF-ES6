
const products = [
	{name: '반팔티', price: 15000, quantity: 1},
	{name: '긴팔티', price: 20000, quantity: 2},
	{name: '핸드폰케이스', price: 15000, quantity: 3},
	{name: '후드티', price: 30000, quantity: 4},
	{name: '바지', price: 25000, quantity: 5},
]

const add = (a, b) => a + b

const sum = (f, iter) => go(
	iter,
	map(f),
	reduce(add)
)

const total_quantity = products => sum((p => p.quantity), products)

const total_quantity2 = pipe(
	map(p => p.quantity),
	console.log
)

const total_price = products => sum((p => p.price * p.quantity), products)

console.log(total_quantity(products))
console.log(total_quantity2(products))
console.log(total_price(products))