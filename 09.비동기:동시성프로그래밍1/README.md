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

## Composition

- Promise 비동기의 함수들의 값을 안전성있게 하는 모나드
- f . g
- f(g(x)); 연속적으로 함수 합성
- 상황에 따라서 안전하게 합성: Monad
- 자바스크립트 동적 타이밍 언어.
- 박스: [1]
~~~javascript
const g = a => a + 1;
const f = a => a * a;
log(f(g(1))) // 정상 동작
log(f(g())) // Nan 오류 생김

// 박스 연산에 필요한 재료들을 보관한다
log([1].map(g).map(f))

var b  = [1].map(g).map(f).forEach(v => log(v))
var c  = [].map(g).map(f).forEach(v => log(v)) // 부수효과가 존재하지 않음
var v = [1,2,3].map(g).filter(f => f % 2).forEach(r => log(r))
// 박스의 값이 항상 빈값이기에 따라서 안전하게 된다.

Array.of(1).map(g).map(f).forEach(r => log(r))
// 비동기에서 일어나는 상황을 안전하게 하는 상황임
Promise.resolve(1).then(g).then(f).then(r => log(r))
// 대기가 일어나는 상황도 안전하게 만들수 있다
new Promise(resolve => setTimeout(() => resolve(2), 1100)).then(g).then(f).then(r => log(r))
~~~

## Kleisli Composition
- f . g
- f(g(x)) = f(g(x)) // 양 함수순서에 상관없이 같을때다.
- f(g(x)) = g(x) f가 안되도 g(x) 가 되는걸 원한다!
    
~~~javascript

    const users = [
	    { id: 1, name: 'aa' },
	    { id: 2, name: 'bb' },
	    { id: 3, name: 'cc' }
    ]
    const getUserById = id => find((u) => u.id === id, users) || Promise.reject('없어요 !');
    const f = ({name}) => name;

	const g = getUserById;
	const fg = id => f(g(id));

	const r = fg(2);
	users.pop(); // 상황에따라 에러가 나는 상황 연출
	users.pop();
    // const r2 = fg(2)  // 에러 유저갸 존재하지 않다, f {} 네임이라는 객체를 꺼내야한다. 무조건,!

    // 해결 방법  // f 의 관계를 피할수 있다                           
    const fg2 = id => Promise.resolve(id).then(g).then(f).catch(a => a); // 더이상 안되는 상황을 피할수 있따
	fg2(2).then(log)
~~~