# 제너레이터 / 이터레이터

~~~typescript
  function* gen() {
    yield 1;
    yield 2;
    if (false) yield 4; // gen 통해서 다양한 이터러블을 만들수 있다.
    yield 4;
    return 100;
  }
  
  let iter = gen();
  console.log(iter.next())
  console.log(iter.next())
  console.log(iter.next())
  console.log(iter.next());

  for (const x of gen()) log(a);

~~~

### Odds (홀수 예제)

1) 단순 홀수를 for 문을 활용한 iterator 로 출력
~~~typescript
  function *odds(len: number) {
    for (let i = 0; i < len; i++){
      if (i % 2) yield i;
    }
  }
~~~
2) 인피니트 함수를 이용해서 iterator 를 반환후 홀수를 출력(증가값으로 홀수가 출력됨)
~~~typescript
 function *infinity(i = 0) {
  while (true) yield i++;
}

 function *odds2(len: number) {
  for (let i of infinity(len)){
    if (i % 2) yield i;
  }
}
~~~

4) 인피니트 함수와 제한 함수를 활용해서 홀수를 출력
~~~typescript
  function * limit(l: number, iter: Generator<number, void, unknown> | number[]) {
    for (const a of iter) {
      yield a;
      if (a == l) return
    }
  }

  function *odds3(len: number) {
  for (let i of limit(len, infinity(len))){
    if (i % 2) yield i;
  }
}

~~~

### for of, 전개 연산자, 구조 분해, 나머지 연산자
~~~typescript

  console.log(...odds3(10))
  console.log([...odds3(10)], ...odds3(20))
  const [head, ...tail] = odds(5);

  const [a,b, ...rest] = odds(12);
  console.log({a, b})
  console.log('rest',rest)

  console.log({head})
  console.log({tail})
~~~