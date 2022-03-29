const curry = (f) => (a, ...rest ) => rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest)

const reduce = curry((f, acc, iter) => {
	if (!iter) { // 초기 값이 없을경우
		iter = acc[Symbol.iterator]();
		// console.log(iter)
		acc = iter.next().value
	} else{
		iter = acc[Symbol.iterator]();
	}
	let cur;
	while (!(cur = iter.next()).done){
		const a = cur.value;
		acc = f(acc, a)
	}
	return acc
});

const map = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	
	while (!(cur = iter.next()).done){
		const a = cur.value;
		res.push(f(a));
	}
	
	return res; // 결과만 반환한다 log(res) 를 하지 안흔다.
})

const filter = curry((f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur
	while (!(cur = iter.next()).done){
		const a = cur.value;
		if (f(a)) res.push(a);
	}
	
	return res
})


let L = {
}
L.range =  function* (l) {
	let i = -1;
	while (++i < l) {
		yield i;
	}
};
L.map = curry(function* (f, iter) {
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done){
		const a = cur.value;
		yield f(a);
	}
})
L.filter = curry(function *(f, iter ){
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done){
		const a = cur.value;
		if (f(a)) yield a
	}
})

L.entries = function* (obj) {
	for (const objKey in obj) yield [objKey, obj[objKey]]
}

const go = (...args) => reduce((a, f) => f(a), args, undefined)
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const take = curry((l, iter) => {
	let res = [];
	// console.log(iter)
	iter = iter[Symbol.iterator]();
	// console.log(iter)
	let cur;
	while (!(cur = iter.next()).done){
		const a = cur.value;
		res.push(a);
		if (res.length == l) return res;
	}
	return res
})

const log = (...data) => console.log(...data);

const range = (l) => {
	let res = [];
	let i = -1;
	
	while (++i < l) {
		res.push(i);
	}
	return res;
}

const takeAll = take(Infinity)

