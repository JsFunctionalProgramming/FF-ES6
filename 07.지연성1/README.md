# 지연성1

## range

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

## L.range
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

## 성능 비교
 - 많으면 많을수록 시점이 빠르다. 
 - 속도보다, 늦은 평가에 초점을 맞추자
 - 브라우저마다 조금 스펙이, 다르고, 환경에따라 다르니 결과값에 유념하지 말기를
~~~
() => reduce(add, range(1000000))
(색인):35 range: 179.862060546875 ms

(색인):32 () => reduce(add, L.range(1000000))
(색인):35 L.range: 232.736328125 ms
~~~