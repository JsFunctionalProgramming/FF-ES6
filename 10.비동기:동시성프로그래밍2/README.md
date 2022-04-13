## 지연 평가 + Promise - L.map, map, take
~~~javascript
const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a); 

L.map = curry(function *(f, iter){
  for (const a of iter){
     yield go1(a, f); // 감싸서 Promise 평가를 변경해준다.
  }
})


~~~                    
- 다음과 같음 값을 어느상황이여도 반환할수 있다
~~~javascript
// number[]
  go(
    [1,2,3],
    L.map(a => Promise.resolve(a + 10)),
    take(2),
    log
   )
  
  // Promise<number>[]
  go(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)] ,
    L.map(a => a + 10),
    take(2),
    log
  )

  go(
   [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)] ,
    map(a => Promise.resolve(a + 10)),
    log
  )
~~~


## Kleisli(클레슬리) Composition - L.filter, filter, nop, take
- filter 에서 Promise 를 지원하기 위해 만들어야한다.

~~~javascript
    go([1,2,3,4,5,6]
      L.map(a => Promise.resolve(a * a)),
      L.filter(a => a % 2 === 1),
      take(2),
      log  
    ),
~~~

## 병렬적 평가하기
- 싱글 스레드 기반 제어: 비동기 기반으로 돌아가고 있다.(CPU 효율화)
- 동시에 출발(동시성) => 하나로 귀결: 자바스크립트도 병렬처리가 필요한다
- EX) nodejs -> db query 병렬 후 한번에 얻어오기, redis nosql key를 통해동시, image 처리.., nodejs 직접 하지 않고 받는 시점만 다룰때