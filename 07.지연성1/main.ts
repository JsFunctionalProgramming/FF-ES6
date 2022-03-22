import {filter, go, L, log, map, take} from "../fx";

const range = (l: any) => {
  let res = [];
  let i = -1;

  while (++i < l) {
    // log(i, "range")
    res.push(i);
  }
  return res;
}
//
// go(
//   range(10),
//   map((n: number) => n +10),
//   filter((n: number) => n % 2 === 1),
//   take(4),
//   log
// )

go(
  L.range(10),
  L.map((n: number) => n +10),
  L.filter((n: number) => n % 2 === 1),
  take(2),
  log
)