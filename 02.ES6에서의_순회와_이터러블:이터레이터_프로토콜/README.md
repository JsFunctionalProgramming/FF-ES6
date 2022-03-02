## 02.ES6에서의 순회와이터러블:이터레이터 프로토콜

### 기존과 달라진 ES6에서의 리스트 순회
 - for i++
 - for of

~~~typescript
  const list = [1, 2, 3];
  
  for (var i = 0; i < list.length; i++){
    log(list[i])  
  }
  
  const str = 'abc';
  for (var i = 0; i < str.length; i++) {
    log(str[i])  
  }
  
  // es6
  for (const a of list) {
    log(a) // 간결해짐( 인덱스로 접근할피욦다)
  }

  for (const a of str) {
    log(a)
  }
~~~

## 이터러블 / 이터레이터 프로토콜
- 이터러블: 이터레이터를 리턴하는 [Symbol.iterator] () 를 가진 값
- 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진값
- 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 규기


###set 은 순회해서 접근할수 없다
~~~javascript
  log(set[0]) (X)  
  arr[Symbol.iterator]
~~~  
        
~~~javascript
  const arr = [1, 2, 3];
  const iter1 = arr[Symbol.iterator]();
  iter1.next()
  iter1.next();
  
  for (const number of iter1) { // 통과됨
    log(number)
  }
~~~

### map
~~~javascript

~~~javascript
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map.keys()) console.log('keys:', a)
for (const a of map.values()) console.log('value:', a)
for (const a of map.entries()) console.log('entries',a)

let it = map.values();
let it2 = it[Symbol.iterator]();
console.log(it2.next())
console.log(it2.next())
console.log(it2.next())
~~~

## 전개 연산자
~~~javascript
const a = [1,2];
// a[Symbol.iterator] = null // 애초에 넣을수없는데 무슨말인지 모르겟다
log(...a, ...[3,4], ...arr, ...set, ...map.values());
~~~

