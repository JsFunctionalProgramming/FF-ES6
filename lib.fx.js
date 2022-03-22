const curry = (f) => (a, ...rest ) => rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest)

const reduce = curry((f, acc, iter) => {
	if (!iter) { // 초기 값이 없을경우
		iter = acc[Symbol.iterator]();
		// console.log(iter)
		acc = iter.next().value
	}
	for (const a of iter) {
		acc = f(acc, a)
	}
	return acc
});

const map = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur
	while (!(cur = iter.next().done)){
		res.push(cur.value);
	}
	
	return res; // 결과만 반환한다 log(res) 를 하지 안흔다.
})

const filter = curry((f, iter) => {
	let res = [];
	for (const a of iter) {
		if (f(a)) res.push(a);
	}
	return res
})


const L = {
	range: function* (l) {
		// log('hi~')
		let i = -1;
		while (++i < l) {
			// log(i, 'L.range')
			yield i;
		}
	},
	map: curry(function* (f, iter) {
		for (const a of iter) yield f(a)
	}),
	filter: curry(function *(f, iter ){
		for (const a of iter) if (f(a)) yield a
	})
}

const go = (...args) => {return reduce((a, f) => f(a), args, undefined)}

const take = curry((l, iter) => {
	let res = [];
	for (const a of iter) {
		res.push(a);
		if (res.length === l) return res;
	}
	return res
})

const log = (...data) => console.log(...data);
