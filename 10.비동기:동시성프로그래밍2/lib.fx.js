const curry = (f) => (a, ...rest) => rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest)
const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduce = curry((f, acc, iter) => {
	if (!iter) { // 초기 값이 없을경우
		iter = acc[Symbol.iterator]();
		acc = iter.next().value
	} else {
		iter = acc[Symbol.iterator]();
	}
	return go1(acc,function recur(acc) {
		let cur;
		while (!(cur = iter.next()).done) {
			const a = cur.value;
			// console.log(a)
			acc = f(acc, a);
			if (acc instanceof Promise) return acc.then(recur)
		}
		return acc
	});
});

const map = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		res.push(f(a));
	}
	
	return res; // 결과만 반환한다 log(res) 를 하지 안흔다.
})

const filter = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur
	while (!(cur = iter.next()).done) {
		const a = cur.value;
		if (f(a)) res.push(a);
	}
	
	return res
})


let L = {}
L.range = function* (l) {
	let i = -1;
	while (++i < l) {
		yield i;
	}
};
L.map = curry(function* (f, iter) {
	for (const a of iter) {
		yield go1(a, f);
	}
})

const nop = Symbol('nop')

L.filter = curry(function* (f, iter) {
	
	for (const a of iter) {
		const b = go1(a, f); // 홀수만 남아야되는데
		// 비동기일때와 동기적인걸 고려해서 reject nop 을 준다. nop 일때는 사용자가 인지하고 계속잔행할것이다
		if (b instanceof  Promise) yield b.then(b => b ? a : Promise.reject(nop));
		else if(b) yield a
	}
	
})

L.entries = function* (obj) {
	for (const objKey in obj) yield [objKey, obj[objKey]]
}
const go = (...args) => reduce((a, f) => f(a), args)
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const take = curry((l, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	return function recur(){
		
		while (!(cur = iter.next()).done) {
			const a = cur.value;
			// log(a) // TODO:: Promise 인 상태일 것이다.
			if(a instanceof Promise) {
				return  a
				.then(a => (res.push(a), res).length == l ? res : recur())
				.catch(e => e == nop ? recur() : Promise.reject(e)) // 중간에 에러 리젝할 경우 그 이후는 무시하게 된다.
			}
			res.push(a)
		}
		return res
		
	}()
	
})

const log = console.log;

const range = (l) => {
	let res = [];
	let i = -1;
	
	while (++i < l) {
		res.push(i);
	}
	return res;
}

const takeAll = take(Infinity)

const isIterable = a => a && a[Symbol.iterator];
L.flatten = function* (iter) {
	for (const a of iter) {
		// log(a)
		if (isIterable(a)) for (const b of a) yield b
		else yield a
	}
}

const flatten = pipe(L.flatten, takeAll)
const find = curry(
	(f, iter) => go(
		iter,
		L.filter(f),
		take(1),
		([a]) => a
	)
)