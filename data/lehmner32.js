export function* Lehmner32(seed) {
  let currentState = Number(seed ?? (Math.random() * 1e8).toFixed(0))
  const M = 0x7fffffff;
  const A = 48271;
  const Q = M / A;
  const R = M % A;

  while (true) {
    let div = currentState / Q
    let rem = currentState % Q

    let s = rem * A
    let t = div * R
    let result = s - t
    if (result < 0)
      result += M
    currentState = result
    yield result
  }
}
