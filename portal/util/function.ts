export function setTimeOutData(data: any) {
  const time = Math.random() * (3000 - 1000) + 1000;
  return new Promise(resove=> {
    setTimeout(() => {
      resove(data);
    }, time);
  })
}
