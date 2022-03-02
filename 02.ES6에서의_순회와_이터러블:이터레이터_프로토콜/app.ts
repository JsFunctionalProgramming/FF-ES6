log('Arr --------')
const arr = [1, 2, 3];
const iter1 = arr[Symbol.iterator]();
iter1.next()
iter1.next();
for (const number of arr) { // 통과됨
  console.log(number)
}
for (const number of iter1) { // 통과됨
  log(number)
}


/** Set */
log('Set -------')
const set = new Set<number>([1, 2, 3]);
for (const number of set) {
  log(number)
}

/**
 *  Map
 * */
log('Map --------')
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map.keys()) console.log('keys:', a)
for (const a of map.values()) console.log('value:', a)
for (const a of map.entries()) log('entries',a)
let it = map.values();
let it2 = it[Symbol.iterator]();
console.log(
  it2.next()
)
console.log(
  it2.next()
)
console.log(
  it2.next()
)



/**
 *  Array 순회할수 잇다.
 * */
log(arr[0])
log(arr[1])
log(arr[2])
// set 은 순회해서 접근할수 없다
// log(set[0])
// arr[Symbol.iterator]
console.log(
  'Symbol.iterator',
  ...arr[Symbol.iterator](),
  set[Symbol.iterator]()
)

const iterator = arr[Symbol.iterator]();
const setIterator = set[Symbol.iterator]();
console.log(
  'iterator.next()',iterator.next()
)


console.log('setIterator',
  setIterator.next())
/**
 *  - 이터러블 / 이터레이터 프로토콜
 *  - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator] () 를 가진 값
 *  - 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진값
 *  - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 규기
 * */

// 사용자 정의 이터러블을 통해 알아보기

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next(): {value: number, done: boolean} {
        return i === 0 ? { value: 0, done: true }: { value: i--, done: false }
      },
      [Symbol.iterator]() { return this; }    // 자기 자신을 가르치게해야된다
    }
  }
}

let customIterator = iterable[Symbol.iterator]();
console.log(
  'customer iterator1', customIterator.next()
)
console.log(
  'customer iterator2', customIterator.next()
)
console.log(
  'customer iterator3', customIterator.next()
)
console.log(
  'customer iterator4', customIterator.next()
)

for (const a of iterable) console.log(a);
for (const a of customIterator) log(a)


/** 전개 연산자 */
const a = [1,2];
// a[Symbol.iterator] = null
log(...a, ...[3,4], ...arr, ...set, ...map.values());