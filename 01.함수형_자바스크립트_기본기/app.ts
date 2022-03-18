import {log} from "../fx";


const add5 = (a: number) => a + 5;
log(add5); // [Function: add5]
log(add5(5)) // 10

const f1 = () => () => 1;
log(f1()); // [Function (anonymous)]

const f2 = f1()
log(f2)
log(f2())  // 1


/** 고차함수 예시 */
const apply1 = (f: (any: any) => {}) => f(1); // 콜백 함수를 받아서 받은 함수를 실행시킨다
const add2 = (a: number) => a + 2; // (a => a + 2 )(1);

log('add2', apply1(add2))
log('min1', apply1((a: number) => a - 1))

const times = (f: (data: number) => void, n: number) => {
  let i = -1;
  while (++i < n){ f(i) }
}

times(log, 3);
times(a => log(a + 10), 3);

// - 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하나는 함수)
const addMaker = (a: number) => (b: number) => a +b;
const add10 = addMaker(10)
log('add5:',add10(5))
log('add10:',add10(10))
