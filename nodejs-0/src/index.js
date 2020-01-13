'use strict'

const fiboSequence = [];
const fibonacci = () => {
    let i = 0;
    for(i; i <= 15; i++) {
      if(i === 0) {
        fiboSequence.push(i);
      } else if (i === 1) {
        fiboSequence.push(i);
      } else {
        let j = 0;
        for(j; j < fiboSequence.length; j++) {
          if(fiboSequence[j] >= 350) {
            return fiboSequence;
          }
        }
        fiboSequence.push((fiboSequence[i - 1]) + (fiboSequence[i - 2]));
      }
    }
    return fiboSequence;
}

const isFibonnaci = (num) => {
    let i = 0;
    for(i; i < fiboSequence.length; i++) {
        if(fiboSequence[i] === num) {
        return true;
        }
    }
  return false;
}

module.exports = {
    fibonacci,
    isFibonnaci
}
