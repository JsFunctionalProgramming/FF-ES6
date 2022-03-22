// @ts-ignore
export const curry = (f: (arg0: any, arg1: any) => any) => (a: any, ...rest: any[]) => rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest)

// @ts-ignore
export const reduce = curry((f: (acc: any, a: any) => any, acc: any, iter: any) => {
  if (!iter) { // 초기 값이 없을경우
    iter = acc[Symbol.iterator]();
    // console.log(iter)
    acc = iter.next().value
  }
  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc
});


export const map = curry(<T>(f: (a: T) => {}, iter: Generator<number, void, unknown>) => {
  let res = [];
  for (const a of iter) {
    // @ts-ignore
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


export const L = {
  range: function* (l: any) {
    // log('hi~')
    let i = -1;
    while (++i < l) {
      // log(i, 'L.range')
      yield i;
    }
  },
  map: curry(function* <T>(f: (a: any) => {}, iter: Array<T>) {
    for (const a of iter) yield f(a)
  }),
  filter: curry(function *<T>(f: ((a: any) => boolean), iter: Array<T> | Generator ){
    for (const a of iter) if (f(a)) yield a
  })
}

export const go = (...args: any) => {
  return reduce((a: any, f: (arg0: any) => any) => f(a), args, undefined)
}

export const take = curry((l: number, iter: Generator<number, void, undefined> | number[]) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res
})

export const log = (...data: any[]) => console.log(...data);
