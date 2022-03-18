const curry = (f) => (a, ...rest) => rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest)

const reduce = curry((f, acc, iter) => {
  if (!iter) { // 초기 값이 없을경우
    iter = acc[Symbol.iterator]();
    acc = iter.next().value
  }
  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc
});

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a)) // 함수를 실행시켜준다
  }
  return res; // 결과만 반환한다 log(res) 를 하지 안흔다.
})

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res
})

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
