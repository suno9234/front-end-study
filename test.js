Array.prototype.myReduce = function(callback, initialValue){
    let i = 0;
    let accumulator;
    initialValue ? (accumulator = initialValue) : ([i,accumulator] = [1,this[0]])
    for(;i<this.length;i++){
        accumulator = callback(accumulator,this[i]);
    }
    return accumulator;
}

const mya  =Array(5).fill().map((v,i)=>i+1)
console.log(mya)
console.log(mya.reduce((a,c)=>a+c))
console.log(mya.myReduce((a,c)=>a*c,2))
