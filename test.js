let input = {
  a: 560,
  b: 125,
  c: 653,
  d: 869,
  e: 20,
};
//80 - 20 115

const fun = (obj) => {
  let exp = Object.values(obj);
  let total = exp.reduce((total, e) => total + e);
  console.log('total: ', total);
  let perHeadCost = total / exp.length;
  console.log("perHeadCost: ", perHeadCost);
  let ne = [];
  let po = [];
  for (let x in obj) {
    obj[x] -= perHeadCost;
    let b = { amount: obj[x], name: `${x}` };
    if (obj[x] <= 0) ne.push(b);
    else po.push(b);
  }
  po.sort((a, b) => {
    return b.amount - a.amount;
  });
  ne.sort((a, b) => {
    return a.amount - b.amount;
  });
  // console.log("po: ", po);
  // console.log("ne: ", ne);
  //   console.log("ne: ", ne);
  let arr = {};
  for (let i = 0; i < po.length; i++) {
    for (let j = 0; j < ne.length; j++) {
      if (ne[j].amount !== 0) {
        let p = po[i].amount;
        // console.log("p: ", p);
        let n = ne[j].amount;
        // console.log("n: ", n);
        po[i].amount = po[i].amount + ne[j].amount;
        // console.log("po[i].amount: ", po[i].amount);
        ne[j].amount = p + ne[j].amount;
        // console.log("ne[j].amount: ", ne[j].amount);

        if (ne[j].amount >= 0) {
          ne[j].amount = 0;
        } else {
          n = p;
        }
        arr[po[i].name] = [
          ...(arr[po[i].name] || []),
          `You have to take ${Math.abs(n)} from ${ne[j].name}`,
        ];
        arr[ne[j].name] = [
          ...(arr[ne[j].name] || []),
          `You have to give ${Math.abs(n)} to ${po[i].name}`,
        ];
        //   (arr[po[i].name] || "" + `  take ${Math.abs(n)} from ${ne[j].name}`;
        if (po[i].amount <= 0) {
          po[i].amount = 0;
          break;
        }
      }
    }
  }
  console.log("arr: ", arr);
};

fun(input);

// console.log("po[i].amount: ", po[i].amount);
// ne[j].amount = ne[j].amount - po[i].amount;
// console.log("ne[j].amount: ", ne[j].amount);
// if (po[i].amount === 0) break;
// if (ne[j].amount > 0) ne[j].amount = 0;
