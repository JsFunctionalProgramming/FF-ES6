import {log, reduce} from "../fx";

const add = (a: number, b: number) => a + b;

const range = (l: any) => {
  let res = [];
  let i = -1;

  while (++i < l) {
    // log(i, "range")
    res.push(i);
  }
  return res;
}

log(range(5))
log(range(2))

const list1 = range(4); // 필요없지만 즉시 실행 바로 평가했음

log(reduce(add, list1))

// 느그한 L.range
const L: { range: (l: any) => Generator<number, void, undefined> } = {
  range: function* (l: any) {
    log('hi~')

    let i = -1;

    while (++i < l) {
      // log(i, 'L.range')
      yield i;
    }
  }
}

const list = L.range(4);      // 평가시점을 제어한다, 평가가 되지않고 기다린다. reduce 가 평가시점을 실행시킨다.
log(list.next())
log(list.next())
log(list.next())
// log(reduce(add, list, undefined))  // reducer 함수가 이터러블을 받아서 괜춘


// var a = [0, 1, 2]; 평가시점을 나중에 
// log(a)
// log(a[0] + a[1]);

function test(name: string, time: number, f: () => {}) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name)
}

test('range', 10, () => reduce(add, range(10)))
test('L.range', 10, () => reduce(add, L.range(12)))