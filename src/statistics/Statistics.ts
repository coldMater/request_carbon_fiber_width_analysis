export default (array: number[]) => {
    const count = array.length;
    const sum = array.reduce((prev, next) => prev + next ,0);
    const avg = sum / count;
    const sumOfDeviation = array.reduce((prev, next) => prev + Math.pow(next - avg, 2) ,0);
    const variance = sumOfDeviation / count;
    const std = Math.sqrt(variance);
    const max = array.reduce((prev, next) => prev<next?next:prev, 0)
    const min = array.reduce((prev, next) => prev>next?next:prev, 10000)
    const cv = std/avg*100;
    return {avg: round(avg), std: round(std), cv: round(cv), max: round(max), min: round(min)};
}

const round = (number: number) => {
    return Math.round(number*10)/10;
}