import {Product, products} from "./map";

const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums) {
  total = total + n
}

console.log(total);

const reduce = (f: (acc: any, a: any) => any, acc: any, iter: any) => {
  if (!iter) { // 초기 값이 없을경우
    iter = acc[Symbol.iterator]();
    acc = iter.next().values
  }

  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc
};

const add = (a: number, b: number) => a + b;
console.log(reduce(add, 5, [1, 2, 3, 4, 5]))
console.log(reduce(add, 0, [1, 2, 3, 4, 5]))
console.log(add(add(add(0, 1), 2), 3))  // 재귀적으로 실행하는거
console.log(
  'totalPrice',
  reduce(
    (totalPrice: number, product: Product) => totalPrice + product.price,
    0,
    products
  )
)

