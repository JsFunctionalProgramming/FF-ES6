type Product = {
  name: string,
  price: number
}

export const products: Product[] = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000},
]

// @ts-ignore
export const curry = (f: (arg0: any, arg1: any) => any) => (a: any, ...rest: any[]) => rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest)

// @ts-ignore
export const reduce = curry((f: (acc: any, a: any) => any, acc: any, iter: any) => {
  if (!iter) { // 초기 값이 없을경우
    iter = acc[Symbol.iterator]();
    acc = iter.next().value
  }
  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc
});

export const map = curry(<T>(f: (a: T) => {}, iter: Generator<number, void, unknown> | any[] | Map<any, any>) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a)) // 함수를 실행시켜준다
  }
  return res; // 결과만 반환한다 log(res) 를 하지 안흔다.
})

export const filter = curry((f: (a: any) => boolean, iter: Generator<any, void, unknown> | any[] | Map<any, any>) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res
})

