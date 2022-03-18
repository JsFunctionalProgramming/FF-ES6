

  // map, 수집은 f 인자가 한다,
  import {Product, products} from "../data";

  const map = <T>(f: (a: T) => {}, iter: Generator<number, void, unknown> | any[] | Map<any, any>) => {
    let res = [];
    for (const a of iter) {
      res.push(f(a)) // 함수를 실행시켜준다
    }
    return res; // 결과만 반환한다 log(res) 를 하지 안흔다.
  }
  console.log('names', map<Product>((p) => p.name, products))
  console.log('prices', map<Product>((p) => p.price, products))


  let names = [];
  for (const product of products) {
    names.push(product.name)
  }
  let prices = []
  for (const product of products) {
    prices.push(product.price)
  }

  console.log(names, prices)

// 어터러블 프로토콜을 따른 map 의 다형성

// document.querySelectorAll('*').map() nodeList 는 map 이 되지 못한다. 프로토타입을 지원하지않는다.

// browser api => ecma script 이터레이터 프로토콜을 따른다.
// 프로토타입, 클래스 보다 < 유연성이 증가한다.
//   const it = document.querySelectorAll('*')[Symbol.iterator]();
//   it.next()
//   it.next()
//   it.next()

  function* gen() {
    yield 2;
    yield 3;
    yield 4;
  }

  console.log('pow', map<number>((a) => a * a, gen()));

  let m = new Map<string, number>();
  m.set('a', 10)
  m.set('b', 20);
  const it = m[Symbol.iterator]();   // 이터레이터가 된다 map은
  console.log(it.next())
  console.log(it.next())
  console.log(it.next())

  const ret = map<any>(([k, value]) => [k, value * 2], m) as []
  const maps = new Map(ret)

  console.log(
    maps
  )

