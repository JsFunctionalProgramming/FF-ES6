# 코드를 값으로 다루어 표현력 노피이기
                  
## go 
 - 함수형 프로그래밍은 함수를 값으로 다룬다고함
 - go 함수를 이용해 함수를 평가하는 시점을 제어 할수있음

 ~~~typescript
 reduce(
  sum,
  0,
  map<Product>(p => p.price,
    filter(p => p.price < 20000, products))
)

~~~

 - 함수 중첩으로 위와같은 코드는 별로 좋아 보이지 않는다.

~~~typescript

const go = (...args) => reduce((a, f) => f(a), 0, args)

go([
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log
])

~~~
 - reduce() 함수로 전체 실행시킨다.

## pipe
 - go 함수는 실행시 즉시 판단하는 함수
 - pipe 함수는 합성된 함수를 만드는 함수
 - 내부적으로 go 를 사용

~~~typescript
  const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs); 
 
  // 기존 go 함수는 
  go(
    add(0,1),
    a => a + 10,
    a => a+ 100,
    log
  )
  
  const f = pipe(
    (a, b) => a + b, // 첫번쟤 함수를 실행시킬때 인자를 두개 받는게 잇으면 좋겟다
    a => a + 1,
    a => a+ 10,
    a => a + 100
  )
  log(f(add(0,1)));
  log(f(add(0,1)));
~~~
    
## go 를 활용하여 읽기 좋은 코드로 만들기
~~~typescript

reduce(
  sum,
  0,
  map<Product>(p => p.price,
    filter(p => p.price < 20000, products))
)
go(
  products,
  products => filter(p => p.price , 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
)

~~~

## go+curry 를 사용하여 더 일기 좋은 코드로 만들기
         
### curry
~~~typescript
 const curry = f => (a, ...rest) => rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest)

 const mult =  curry((a, b) => a * b);
~~~