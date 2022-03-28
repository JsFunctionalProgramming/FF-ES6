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

