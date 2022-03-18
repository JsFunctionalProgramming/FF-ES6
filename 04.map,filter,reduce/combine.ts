import {filter, map, reduce} from "../fx";
import {Product, products} from "../data";

const sum = (a: number, b: number) => a + b;

console.log(
  reduce(
    sum,
    0,
    // @ts-ignore
    map<Product>(p => p.price,
      filter((p: { price: number; }) => p.price < 20000, products))   // 내가 어떤 초기값을 넣어줘야할지고민한다
  )
)
console.log(
  reduce(
    sum,
    0,
    [10, 20, 30, 40] // 숫자들이 들어갈 걸 평가한다
  )
)