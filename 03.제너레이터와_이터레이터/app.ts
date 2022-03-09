function* gen() {
  yield 1;
  yield 2;
  if (false) yield 3; // gen 통해서 다양한 이터러블을 만들수 있다.
  yield 4;
  return 100;
}

let iter = gen();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

for (const x of gen()) console.log(x);

/** odds */

function *odds(len: number) {
  for (let i = 0; i < len; i++){
    if (i % 2) yield i;
  }
}
function *odds2(len: number) {
  for (let i of infinity(len)){
    if (i % 2) yield i;
  }
}

function *odds3(len: number) {
  for (let i of limit(len,infinity(len))){
    if (i % 2) yield i;
  }
}

function *infinity(i = 0) {
  while (true) yield i++;
}

function * limit(l: number, iter: Generator<number, void, unknown> | number[]) {
  for (const a of iter) {
     yield a;
     if (a == l) return
  }
}

let iter2 = odds(10);
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())

let odd2 = odds2(2);
console.log('odd2 1', odd2.next() )
console.log('odd2 2', odd2.next() )
console.log('odd2 3', odd2.next() )
console.log('odd2 4', odd2.next() )
console.log('odd2 5', odd2.next() )

let iter3 = infinity();
console.log('infinity1',iter3.next())
console.log('infinity2',iter3.next())
console.log('infinity3',iter3.next())
console.log('infinity4',iter3.next())
console.log('infinity5',iter3.next())

const limited = limit(4, [1, 2, 3, 4, 5])  // 원하는 숫자에서 멈추게된다.
console.log('limited 1',limited.next())
console.log('limited 2',limited.next())
console.log('limited 3',limited.next())
console.log('limited 4',limited.next())
console.log('limited 5',limited.next())
console.log('limited 6',limited.next())


// for of, 전개 연산자, 구조 분해, 나머지 연산자
console.log(...odds3(10))
console.log([...odds3(10)], ...odds3(20))
const [head, ...tail] = odds(5);
{
  const [a,b, ...rest] = odds(12);
  console.log({a, b})
  console.log('rest',rest)

}
console.log({head})
console.log({tail})
