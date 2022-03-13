import {curry, reduce} from "../fx";

const go = (...args: any) => {

  return reduce((a, f) => f(a), args, undefined)
}

go(
  2,
  (a: number) => a + 1,

  (a: number) => a + 10,
  (a: number) => a + 100,
  console.log
)


// @ts-ignore
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const f = pipe(
  (a: number, b: number) => a + b, // 첫번쟤 함수를 실행시킬때 인자를 두개 받는게 잇으면 좋겟다
  (a: number) => a + 1,
  (a: number) => a+ 10,
  (a: number) => a + 100
)
//
console.log(
  f(0, 1)
)


const mult2 = curry((a,b) => a * b)
console.log(
  mult2(21)(1)
)
console.log(
  mult2(4, 2)
)