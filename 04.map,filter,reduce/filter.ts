{
  type Product = {
    name: string,
    price: number
  }

  const products: Product[] = [
    {name: '반팔티', price: 15000},
    {name: '긴팔티', price: 20000},
    {name: '핸드폰케이스', price: 15000},
    {name: '후드티', price: 30000},
    {name: '바지', price: 25000},
  ]

  // filter
  let under20000 = [];
  for (const p of products) {
    if (p.price < 20000) under20000.push(p);
  }

  let over20000 = [];
  for (const p of products) {
    if (p.price >= 20000) over20000.push(p);
  }

  const filter = (f: (a: any) => boolean, iter: Generator<any, void, unknown> | any[] | Map<any, any>) => {
    let res = [];
    for (const a of iter) {
      if (f(a)) res.push(a);
    }
    return res
  }

  console.log(
    'under20000', filter((p => p.price < 20000), products)
  )
  console.log(
    'over20000', filter((p => p.price >= 20000), products)
  )
  console.log(
    'odd', filter(n => n % 2 === 1, [1, 2, 3, 4])
  )
  console.log(
    'gen', filter((n) => (n % 2 === 1), function *gen() {
      yield 1;
      yield 2;
      yield 3;
    }())
  )

}