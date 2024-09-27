## Is node js single or multi threaded?
Yes, nodejs is a single threaded.

## How node js exactly handles async tasks?
as we know node js is single threaded and it has a main thread which is also called callstack. this is where js codes are executed. node js passes all its async tasks to a web api or node api to handle them and return the result. when the result of async task returned, they go to the task queue which is a queue of tasks that are waiting to go to the main thread to get executed when the main thread has free space. event loop checks the call stack and task queue to push tasks from task queue to call stack whenever call stack is free.

## Event Driven Architecture:
An event-driven architecture uses events to trigger and communicate between decoupled services and is common in modern applications built with microservices. An event is a change in state.<br>
Event-driven architectures have three key components: event producers, event routers(event broker), and event consumers. A producer publishes an event to the router, which filters and pushes the events to consumers. Producer services and consumer services are decoupled, which allows them to be scaled, updated, and deployed independently.
event-driven architecture can be used where a process can be run separatedly and doesn't have a direct sequence in the application.

