# 함수형 프로그래밍과 javascript ES6+

## 01. 함수형 자바스크립트 기본기

### 평가

- 코드가 계산(Evaluation)  되어 값을 만든그 것

~~~typescript
const number = 1 // 평가
const sum2 = 1 + 2
const sum3 = (1 + 3) + 4
~~~

### 일급

- 값으로 다를수 있다.
- 변수에 담을 수 있다.
- 함수의 인자로 사용될 수 있다.
- 함수의 결과로 사용될 수 있다.

~~~typescript
const a = 10;
const add10 = a => a + 10;
const r = add10(a); // 결과를 사용할수있
console.log(r);
~~~

### 일급 함수

- 함수를 값으로 다룰 수 있다.
- 조합성과 추상화의 도구

~~~typescript
const log = (any: any) => console.log(any);

const add5 = (a: number) => a + 5;
log(add5); // [Function: add5]
log(add5(5)) // 10

const f1 = () => () => 1;
log(f1()); // [Function (anonymous)]

const f2 = f1()
log(f2)
log(f2())  // 1

~~~

### 고차 함수
 - 함수를 값으로 다루는 함수
 - 함수를 인자로 받아서 실행하는 함수(apply, times)
 - [Applicative Programming](#https://aeunhi99.tistory.com/66)

~~~typescript
    const apply1 = f => f(1); // 함수를 받아서 받은 함수를 실행시킨다
    const add2 = a => a + 2; // (a => a + 2 )(1);
    log(apply1(add2))
    log(apply1(a => a -1))

    const times = (f: (data: number) => void, n: number) => {
      let i = -1;
      while (++i < n){ f(i) }
    }
    
    times(log, 3);
    times(a => log(a + 10), 3);
~~~
- 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하나는 함수)
    - addMaker
~~~typescript
  const addMaker = (a: number) => (b: number) => a +b;
  const add10 = addMaker(10)
  log('add5:',add10(5))
  log('add10:',add10(10))
~~~
              
## Advance
