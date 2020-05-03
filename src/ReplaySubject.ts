import { ReplaySubject } from 'rxjs';

// subject is an observer which is also able to emit values..so it's basically observable and observer at the same time

//replay subject takes argument of how many last messages should he send to new observers
var subject = new ReplaySubject(30, 500);

subject.subscribe(
    data => addItem("Observer 1: " + data ),
    err => addItem("Observer 1: " + err ),
    () => addItem("Observer 1 completed!" ),
)

var i = 1;
var int = setInterval(()=>{
    subject.next(i++)
},100)

setTimeout(()=>{
    var observer2 = subject.subscribe(
        data => addItem("Observer 2: " + data)
    )
},500)

function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}