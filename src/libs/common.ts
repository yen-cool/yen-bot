export function sleep(s: number) {
  log(`wait ${formatTime(s)}`);
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export function formatTime(time: number) {
  let day = parseInt((time / 60 / 60 / 24).toString());
  let hour = parseInt(((time / 60 / 60) % 24).toString());
  let min = parseInt(((time / 60) % 60).toString());
  let sec = parseInt((time % 60).toString());
  let str = day + ' d ' + hour + ' : ' + min + ' : ' + sec;
  return str;
}

export function log(...args: any) {
  console.log(new Date().toLocaleString(), ...args);
}
