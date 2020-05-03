import { BehaviorSubject } from 'rxjs';

// subject is an observer which is also able to emit values..so it's basically observable and observer at the same time
var subject = new BehaviorSubject("First");

subject.subscribe(
    data => addItem("Observer 1: " + data ),
    err => addItem("Observer 1: " + err ),
    () => addItem("Observer 1 completed!" ),
)
subject.next("1st thing has been sent")

//this one is received by observer 2 cuz we're using BehaviorSubject...if we used Subject class, 2nd observer wouldn't get this one
subject.next("...Observer 2 is about to subscribe...")      

var observer2 = subject.subscribe(
    data => addItem("Observer 2: " + data ),
    err => addItem("Observer 2: " + err ),
    () => addItem("Observer 2 completed!" )
);


subject.next("2nd thing has been sent")
subject.next("3rd thing has been sent")

observer2.unsubscribe();

subject.next("4th thing has been sent")

function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}