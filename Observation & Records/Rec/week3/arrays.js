const cars = ["saab", "ferrari", "detomaso"];
let a = cars.toString();
let length = cars.length
console.log(length)
console.log(cars[length-1])
for(let i=0;i<length;i++){
    b = cars[i]
    console.log(b)
}
cars.push("maserati")
cars[6] = "ford"
console.log(cars[0])
console.log(cars)
console.log(length)
console.log(a)//to string
