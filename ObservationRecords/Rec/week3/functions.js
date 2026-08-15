//functions
function greet(name) {
    console.log("Hello " + name);
}
greet('sravan')

function showCars(cars) {
    console.log(cars);
}


function loop(cars){
    len = cars.length
    for (let i = 0; i<len; i++){
        console.log(cars[i])
    }
}
const teams = ["Ferrari", "McLaren", "Mercedes"];
showCars(teams);
loop(teams);

function enginepower(){
    let i = 0;
    while(i == 0){
        if (team == 'redbull' || team == 'racingbulls'){
            console.log("you have the benchmark engine(redbull ford powertrain)")
            break
        }
        if (team == 'mercedes' || team == 'mclaren' || team == 'williams' || team == 'alpine'){
            console.log("your engine is 2% down the benchmark engine your are applicable to audos and you get 1 engine upgrade(mercedes powertrain)")
            break
        }
        if (team == 'ferrari' || team == 'hass' || team == 'cadillac'){
            console.log("your engine is 4% down the benchmark engine your are applicable to audos and you get 2 engine upgrade(ferrari powertrain)")
            break
        }
        if (team == 'audi'){
            console.log("your engine is 4% down the benchmark engine your are applicable to audos and you get 2 engine upgrade(audi powertrain)")
            break
        }
        if (team == 'astonmartin'){
            console.log("you are pretty dead, take how many upgrades you want")
            break
        }
    }
}
let team = prompt("enter your team name: ")
enginepower()