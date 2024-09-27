# Synchronous Functions:
A synchronous function executes sequentially, meaning that each operation is completed before moving on to the next one. If a synchronous function takes a long time to complete, it will block the execution of the rest of the code, causing the application to wait until that operation finishes.

## Sync functions charactristics:
1. Operations happen one after the other.
2. They are Blocking which means the rest of the code waits until the current operation finishes.
3. Can negatively affect performance in large-scale applications, especially when performing I/O tasks.


# Asynchronous Functions:
An asynchronous function allows non-blocking operations, which means the program can initiate an operation and continue executing other tasks while waiting for the operation to complete. This is especially useful in I/O-bound operations (like file system access or making network requests) where waiting for the operation to complete could block the main thread.
Node.js is event-driven and heavily uses asynchronous functions to avoid blocking the execution thread. Instead of blocking, it uses callbacks, promises or async/await to handle the results of asynchronous operations.

## Async functions charactristics:
1. Operations are started, but the program continues execution while waiting for them to finish.
2. They are non-blocking which means other code can execute while an asynchronous operation (e.g., reading a file or making a network request) is running in the background.
3. Provides better performance and scalability for I/O-heavy applications.

## Different approaches to handle async functions results:
1. Callback:
```javascript
const fs = require('fs');

// Reading a file asynchronously
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }
  console.log(data);
});

// This line runs immediately, even before the file is read
console.log("File reading initiated!");
```
2. Promises:
```javascript
const fs = require('fs').promises;

// Reading a file asynchronously using Promises
fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error("Error reading file", err);
  });

// This line runs immediately
console.log("File reading initiated!");
```
3. Async/await:
```javaScript
const fs = require('fs').promises;

// Reading a file asynchronously using Promises
fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error("Error reading file", err);
  });

// This line runs immediately
console.log("File reading initiated!");
