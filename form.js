
let obj = {};
obj.firstname = "hoi"
obj.lastname = "doei"

console.log(obj);

let objJSON = JSON.stringify(obj);

console.log(objJSON);

localStorage.setItem("obj", obj);

