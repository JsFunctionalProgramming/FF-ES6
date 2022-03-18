# 지연성1

## range
   
### range
- 간단한 버전, 숫자를 받고 배열을 리턴하는 함수
- 필요없지만 즉시 실행 바로 평가했음
- reduce 함수에 갈때 iter 레이터를 한번 실행시킴

~~~typescript
const range = (l: any) => {
  let res = [];
  let i = -1;

  while (++i < l) {
    res.push(i);
  }
  return res;
}

log(range(5)) // 0,1,2,3,4
log(range(2)) // 0,1

log(reduce(add, range(4))) //6

~~~

### L.range
 - 평가시점을 제어한다, 
 - 평가가 되지않고 기다린다. 
 - reduce 가 평가시점을 실행시킨다.
 - 리듀스 를 가도 이터레이터반환시 자기자신을 반환시킨다.
~~~typescript

const L: { range: (l: any) => Generator<number, void, undefined> } = {
  range: function* (l: any) {
    log('hi~')

    let i = -1;

    while (++i < l) {
      log(i, 'L.range')
      yield i;
    }
  }
}
const list = L.range(4);     
log(list.next())
log(list.next())
log(list.next())
// log(reduce(add, list, undefined))  // reducer 함수가 이터러블을 받아서 괜춘
~~~

### 성능 비교
 - 많으면 많을수록 시점이 빠르다. 
 - 속도보다, 늦은 평가에 초점을 맞추자
 - 브라우저마다 조금 스펙이, 다르고, 환경에따라 다르니 결과값에 유념하지 말기를
~~~
() => reduce(add, range(1000000))
(색인):35 range: 179.862060546875 ms

(색인):32 () => reduce(add, L.range(1000000))
(색인):35 L.range: 232.736328125 ms
~~~

## take
 - iterable 함수를 따르고있다.

~~~javascript
  const take = curry((l, iter) => {
	let  res = [];
	for (const a of iter){
		res.push(a);
		if(res.length === l) return res;
    }
	return  res
  })

  console.time()
  go(
	take(5),
    range(10000),
    reduce(add),
    log
  )  
  console.timeEnd()
                                        
~~~

## 이터러블 중심 프로그래밍에서의 지연 평가 (Lazy Evaluation)

- 제때 계산법
- 느긋한 계산법
- 제너레이터/이터레이터 프로토콜을 기반으로 구현
- collection, list, iterable
- 최적화 방법이라생각됨

## L.map, L.filter
~~~typescript
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

 L.filter( (a) => a % 2 === 1, [1,2,3,4])



~~~