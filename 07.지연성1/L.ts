import {log, map} from "../fx";

const L = {
  map: function* <T>(f: (a: any) => {}, iter: Array<T>) { // yield 를 통해 뽑고싶을때만 뽑을수있음
    for (const a of iter) yield f(a)
  },
  filter: function *<T>(f: ((a: any) => boolean), iter: Array<T> | Generator ){
    for (const a of iter) if (f(a)) yield a
  }

}

let that = map((a: number) => a + 1, [1, 2, 3]) // 바로 실행된다, 하지만 모든 iterable 일 경우 문제없이 배열함수를 쓸수잇다.
log(that)
let it = L.map<number>(a => a + 1, [1, 2, 3])
// log(it.next())
log(...it)

let lF = L.filter( (a) => a % 2 === 1, [1,2,3,4])


log(lF.next())
log(lF.next())
log(lF.next())
log(lF.return())