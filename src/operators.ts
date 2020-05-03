import { Observable, merge } from 'rxjs';

// subject is an observer which is also able to emit values..so it's basically observable and observer at the same time
var observable = Observable.create((observer: any) => {
    try{
        observer.next('Hey guys');
    } catch(err) {
        observer.err(err);
    }
});

var observable2 = Observable.create((observer: any) => {
    try{
        observer.next("How's it going");
    } catch(err) {
        observer.err(err);
    }
});

var mergedObservable = merge(observable, observable2)

var observer = mergedObservable.subscribe((x:any)=>{
    addItem(x)
});

function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}