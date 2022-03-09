# 04. map,filter,reduce
          
## map
~~~typescript

type Product = {
  name: string,
  price: number
}

const products: Product[] = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000},
]
~~~

- 명령형 프로그래밍(기존)
~~~typescript
  let names = []; 
for (const product of products) { 
    names.push(product.name)
  }
  
  let prices = []
  for (const product of products) { prices.push(product.price)
  }

  console.log(names, prices)
~~~
             
- 새로운 map 함수 작성
~~~typescript
  const map = <T>(f: (a: T) => {}, iter: Generator<number, void, unknown> | any[] | Map<any, any>) => {
    let res = [];
    for (const a of iter) {
      res.push(f(a)) // 함수를 실행시켜준다
    }
    return res; // 결과만 반환한다 log(res) 를 하지 안한다.
  }
  console.log('names', map<Product>((p) => p.name, products))
  console.log('prices', map<Product>((p) => p.price, products))
~~~

## 어터러블 프로토콜을 따른 map 의 다형성

### NodeList
 - document.querySelectorAll('*').map() nodeList 는 map 이 되지 못한다.(프로토타입을 지원하지 않음)
 - browser api => ecma script 이터레이터 프로토콜을 따른다. 
 - 프로토타입, 클래스 보다 < 유연성이 증가한다. //
         
~~~typescript
  const it = document.querySelectorAll('*')[Symbol.iterator](); // it.next()
 it.next()
 it.next()
~~~
          
### Generator
~~~typescript
  function* gen() { yield 2; yield 3; yield 4; }
  console.log('pow', map<number>((a) => a * a, gen()));
~~~
    
### Map
~~~typescript
  let m = new Map<string, number>(); 
  m.set('a', 10)
  m.set('b', 20); 
  
  const it = m[Symbol.iterator](); // 이터레이터가 된다 map은 console.log(it.next())
  console.log(it.next())
  console.log(it.next())

  // map 이중 배열로 반환
  const ret = map<any>(([k, value]) => [k, value * 2], m) as []
  const maps = new Map(ret)

  console.log(maps)
~~~

## Filter

~~~typescript
// filter
  let under20000 = [];
  for (const p of products) {
    if (p.price < 20000) under20000.push(p);
  }

  let over20000 = [];
  for (const p of products) {
    if (p.price >= 20000) over20000.push(p);
  }

  const filter = (f: (a: any) => boolean, iter: Generator<any, void, unknown> | any[] | Map<any, any>) => {
    let res = [];
    for (const a of iter) {
      if (f(a)) res.push(a);
    }
    return res
  }

  console.log(
    'under20000', filter((p => p.price < 20000), products)
  )
  console.log(
    'over20000', filter((p => p.price >= 20000), products)
  )
  console.log(
    'odd', filter(n => n % 2 === 1, [1, 2, 3, 4])
  )
  console.log(
    'gen', filter(n => n % 2 === 1, function *gen() {
      yield 1;
      yield 2;
      yield 3;
    }())
  )
~~~
   
## reduce
~~~typescript
const nums = [1,2,3,4,5];
  let total = 0;
  for (const n of nums){
    total = total + n
  }

  console.log(total);

  const reduce = (f: (acc: any , a: any) => any, acc: any, iter: any) => {
    if (!iter){ // 초기 값이 없을경우
      iter = acc[Symbol.iterator]();
      acc = iter.next().values
    }

    for (const a of iter) {
      acc = f(acc, a)
    }
    return acc
  };

  const add = (a: number,b: number) => a+ b;
  console.log(reduce(add, 5, [1,2,3,4,5]))
  console.log(reduce(add, 0, [1,2,3,4,5]))
  console.log(add(add(add(0,1), 2),3))  // 재귀적으로 실행하는거
  console.log(
    'totalPrice',
    reduce(
      (totalPrice: number, product: Product) => totalPrice + product.price,
        0,
        products
    )
  )
~~~

## map+filter,reducer 중첩 사용과 함수형 사고
~~~typescript
console.log(
  reduce(
    sum,
    0,
    map<Product>(p => p.price,
      filter(p => p.price < 20000, products))   // 내가 어떤 초기값을 넣어줘야할지고민한다
  )
)
console.log(
  reduce(
    sum,
    0,
    [10, 20, 30, 40] // 숫자들이 들어갈 걸 평가한다
  )
)
~~~