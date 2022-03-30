# 지연성2

## 결과를 만드는 함수 reduce, take

- take
    - 몇개의 배열에서 특정 갯수로 떨어트린다.

## queryStr 함수 만들기

- Object.entries 를 활용한 queryString 결과값을 스트링으로 정리할수잇다
- 위에 값이 없으면 이터러블을 못만든다
-

~~~javascript
   const queryStr = pipe(
	Object.entries,
	map(([k, v]) => `${k}=${v}`),
	reduce((a, b) => `${a}&${b}`)
)

log(queryStr({limit: 10, offset: 10, type: 'notice'}))

~~~

## Array.prototype.join 뽀다 다형성이 높은 join 함수

- 기존 조인함수보다 다형성 측면에서 앞서게 할수있다(이터러블, array 필요 x)
- iterable 함수를 추가로 entries 함수로 만들수있다

~~~javascript

const join = curry((sep = ',', iter) => reduce((a, b) => `${a}${sep}${b}`, iter))

L.entries = function* (obj) {
	for (const objKey in obj) yield [objKey, obj[objKey]]
}

const queryStr2 = pipe(
	L.entries,
	L.map(([k, v]) => `${k}=${v}`),
	join(',')
)
~~~

## take, find

- 함수형 프로그래밍은 계열로 만들수잇다
- find 는 테이크로 만들수잇다

~~~javascript
 const find = (f, iter) => go(
	iter,
	filter(a => (log(a), f(a))), // 다 실행되버리는게 아쉽다
	a => (log(a), a),
	take(1),
	([a]) => a
)

const lFind = (f, iter) => go(
	iter,
	L.filter(a => (log(a), f(a))),
	take(1),
	([a]) => a
)

// curry 를 줘서 좀 더 유연하게 만든다
const find = curry(
	(f, iter) => go(
		iter,
		L.filter(f),
		take(1),
		([a]) => a
	)
)

log('result', find(a => a.age < 37)(users))
~~~

## map, filter 만들기(l.map, l.filter)

~~~javascript

// 1.go 함수를 이용해서 만들고 iter 를 집적넣어준다
const map1 = curry((f, iter) => go(
	iter,
	L.map(f),
	take(Infinity)
))

// 2. curry 가 해결(iter)
const map2 = curry((f, iter) => go(
	L.map(f),
	take(Infinity)
))

// 3.go => pipe 로 대체시 f 및 iter를 호출시 넣으면 알아서 낭낭하게 해준다
const map3 = curry(pipe(
	L.map,
	take(Infinity)
))


// 4.takeAll 함수를 만들어서 대체해준다
const takeAll = take(Infinity)

const map = curry(pipe(L.map, takeAll))
const filter = curry(pipe(L.filter, takeAll))

~~~

## L.flatten 함수 구현

- 평평하게 배열을 이터러블을 반환해주는거

~~~javascript
    // 이터러블 케이스를 찾아서 반환
const isIterable = a => a && a[Symbol.iterator];

L.flatten = function* (iter) {
	for (const a of iter) {
		// 순환후 아직 이터러블일 경우 다시한번 a 를 순환해서 b yield를 반환하다, 이중배열이 여러개여도 천천히 나오게된다. 하나씩
		if (isIterable(a)) for (const b of a) yield b
		else yield a
	}
}

let it = L.flatten(arr1); // 이터러블 상태를 만든다

log(it.next()) // 필요할때 호출할수 잇다.
log(it.next())


log(take(3, L.flatten(arr1)))  // 적당히 가져올수잇다 take활용 

const flatten = pipe(L.flatten, takeAll) // 전체를 가져올수잇다


log(flatten(arr1))

~~~

- Advance flatten, deepFlat

~~~javascript

L.flatten2 = function* (iter) {
	for (const a of iter) {
		if (isIterable(a)) yield* a;  // for of 를 대체한다 * a 제너레이터로 반환 대체한다
		else yield a;
	}

}
L.deepFlat = function* f(iter) {
	for (const a of iter) {
		if (isIterable(a)) yield* f(a); // 부모의 f를 호출 재귀함수
		else yield a;
	}

}
~~~

## 이터러블 중심 프로그래밍 실무적인 코드

~~~javascript
   const users = [
	{
		name: 'a', age: 21, family: [
			{name: 'a1', age: 53}, {name: 'a2', age: 47},
			{name: 'a3', age: 16}, {name: 'a4', age: 15},
		]
	},
	{
		name: 'b', age: 24, family: [
			{name: 'b1', age: 58}, {name: 'b2', age: 51},
			{name: 'b3', age: 19}, {name: 'b4', age: 22},
		]
	},
	{
		name: 'c', age: 31, family: [
			{name: 'c1', age: 53}, {name: 'c2', age: 62}
		]
	},
	{
		name: 'd', age: 21, family: [
			{name: 'd1', age: 42}, {name: 'd2', age: 42},
			{name: 'd3', age: 11}, {name: 'd4', age: 7},
		]
	},
]

const sumMinUser = go(
	users,
	L.map(u => u.family),
	L.flatten,     // 합치고
	L.filter(a => a.age < 20), // 안에서 성인이하를 뽑는다
	L.map(a => a.age), // 원하는 데이터 출력
	take(4), // 이제 원하는 숫자값만 뽑음
	// takeAll,	      
	reduce((a, b) => a + b)
	// log
)

console.log(sumMinUser)
~~~