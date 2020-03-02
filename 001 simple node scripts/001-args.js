// node 001-args.js
// node 001-args.js arg2
// node 001-args.js arg2 arg3


// node 001-args.js a
// node 001-args.js b
// node 001-args.js c
// node 001-args.js d 500


// arg1==="a" - ничего не делать
// arg1==="b" - сразу выход
// arg1==="d" - запустить таймер на arg2 миллисекунд

console.log("argv[0]: ",process.argv[0]);
console.log("argv[1]: ",process.argv[1]);
console.log("argv[2]: ",process.argv[2]);
console.log("argv[3]: ",process.argv[3]);

let arg1=process.argv[2];
let arg2=parseInt(process.argv[3]);

switch ( arg1 ) {
    case "a":
        console.log("arg1=a - nothing to do");
        break;
    case "b":
        console.log("arg1=b - terminating immediately");
        process.exit(); // немедленно остановить выполнение программы
        // break; - можно не писать - выполнение сюда не дойдёт
        // так лучше не заканчивать!
    case "c":
        console.log("arg1=c - terminating carefully");
        console.log("process.pid",process.pid);
        process.kill(process.pid, 'SIGTERM'); // корректно остановить программу
        break; // надо писать - выполнение сюда МОЖЕТ дойти
    case "d":
        console.log("arg1=d - waiting "+arg2+" milliseconds");
        setTimeout(()=>{
            console.log("waiting finished.");
        },arg2);
        break;
}

console.log("finish.");