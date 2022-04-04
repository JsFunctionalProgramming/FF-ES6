# 09.비동기:동시성프로그래밍1

## callback

~~~javascript
function add10(a, callback) {
  setTimeout(() => callback(a + 10), 100)
}

add10(100, (res => {
  console.log(res)
}))
~~~

## Promise

~~~javascript
function add20(a) {
  return new Promise((resolve => setTimeout(() => resolve(a + 20), 100)))
}
~~~
    

   
## Promise 특징
- then().then() 으로 가독성은 좋다. But 결과가 중요한게 아니고                         
- 1동기로 비동기 상황을 다루는게 좋고, 대기 성공 실패 1급으로 나누워져있다
- 비동기로 일어나는 상황을 값으로 다룰수있다 => 1급 함수다(큰 차이를 줄수있다)

~~~javascript

 var a = add10(10, (res) => {
  add10(res, res => {
    add10(res, res => {
      console.log(res)
    })
  })
})

 var b = add20(10)
 .then(add20)
 .then(add20)
 .then(console.log)
 
 console.log(b, 'b') // 프로미스가 리턴되고, 이걸 활용해서 다룰수있다

~~~
  - a => undefined 을 반환한다
  - b => Promise{<pending>} 을 반환한다
~~~javascript
    var c = add20(5, _ => _)
    var d = c.then(a => a - 5);
	d.then((resolve) => console.log(resolve, 'd'))
    // 비동기로 일어나는 상황을 값으로 다룰수있다 => 1급 함수다(큰 차이를 줄수있다)
~~~

~~~javascript
 const delay1000 = a => new Promise(resolve => setTimeout(() => resolve(a), 1000))
 const go1 = (a, f) => f(a);
 const go2 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
  const add5 = a => a + 5;

 console.log(go1(10, add5)) // 바로 15반환
 console.log(go2(10, add5)) // 인스턴스 체크를 이용해서 Promise 객체를 반환
 console.log(go1(delay1000(10), add5)) //

  var r = go1(10, add5);
  console.log(r);// 즉시 반환

  var r2 = go2(delay1000(10), add5);
  r2.then(console.log) // then 활용

  const n1 = 10;
  const n2 = Promise.resolve(10);

  log(go1(go1(n1,add5),log))
  log(go2(go2(n2,add5),log))
~~~