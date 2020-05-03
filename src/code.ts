import { Observable } from 'rxjs';

// creating observable takes 1 argument - subscriber function (here written as lambda function)
var observable = Observable.create((observer: any) => {
    try{
        observer.next('Hey guys');
        observer.next('How are you');
        setInterval(()=>{
            
            observer.next('I am running in an interval')
        }, 2000)
        // observer.complete();
        // observer.next('This will not send');
    } catch(err) {
        observer.err(err);
    }
});

var observer = observable.subscribe(
    (emittedFromNext: any) => {addItem(emittedFromNext);},
    (error: any) => {addItem(error);},
    () => {addItem('Completed!');}
)

var secondObserver = observable.subscribe(
    (emittedFromNext: any) => {addItem(emittedFromNext + " - second");},
    (error: any) => {addItem(error);},
    () => {addItem('Completed!');}
)

var thirdObserver = observable.subscribe(
    (emittedFromNext: any) => {addItem(emittedFromNext + " - third");},
    (error: any) => {addItem(error);},
    () => {addItem('Completed!');}
)

//if second observer unsubscribes, third will also get unsubbed
secondObserver.add(thirdObserver);

setTimeout(()=>{
    secondObserver.unsubscribe();
}, 6001)

function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}