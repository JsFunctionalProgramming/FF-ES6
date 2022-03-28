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
   const _find = (f, iter) => go(
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