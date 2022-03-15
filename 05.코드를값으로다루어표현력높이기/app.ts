import {curry, filter, map, products, reduce} from "../fx";
import {Product} from "../04.map,filter,reduce/map";

const go = (...args: any) => {
  return reduce((a: any, f: (arg0: any) => any) => f(a), args, undefined)
}

go(
  2,
  (a: number) => a + 1,

  (a: number) => a + 10,
  (a: number) => a + 100,
  console.log
)


// @ts-ignore
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const f = pipe(
  (a: number, b: number) => a + b, // 첫번쟤 함수를 실행시킬때 인자를 두개 받는게 잇으면 좋겟다
  (a: number) => a + 1,
  (a: number) => a+ 10,
  (a: number) => a + 100
)
//
console.log(
  f(0, 1)
)


const mult2 = curry((a,b) => a * b)
console.log(
  mult2(21)(1)
)
console.log(
  mult2(4, 2)
)
const add = (a: number,b: number) => a+b

go(
  products,
  (products: Product[]) => filter((p: Product) => p.price  < 20000)(products),
  (products: Product[]) => map((p: Product) => p.price)(products),
  (prices: number[]) => reduce(add)(prices),
  console.log
)

const total_price = pipe(
  map((p: Product) => p.price),
  reduce(add)
)

const base_total_price = (predi: (p: Product) => boolean) => pipe(
  filter(predi),
  total_price
)

go(
  products,
  base_total_price((p: Product) => p.price < 20000),
  console.log
)

go(
  products,
  base_total_price((p: Product) => p.price >= 20000),
  console.log
)