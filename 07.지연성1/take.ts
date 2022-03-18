import {L, log} from "../fx";

const range = (l: any) => {
  let res = [];
  let i = -1;

  while (++i < l) {
    res.push(i);
  }
  return res;
}

const take = (l: number, iter: Generator<number, void, undefined> | number[]) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res
}



log(typeof L)
log(take(5, range(100)))
log(take(5, L.range(100)))