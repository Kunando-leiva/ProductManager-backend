import { Command } from "commander";

const program = new Command();

program.option("-d, --debug", "output extra debugging", false);
program.option("-p <port>", "port number", "8080");
program.option("--mode <mode>", "specify mode", "development");
program.requiredOption("-u, --username <username>", "specify username", "admin");

program.parse();

console.log("Options: ", program.opts());
console.log("Remaining arguments: ", program.args);

//ejemplo de entrada:
// $ node commander.js -d -p 9000 --mode production -u admin
//ejemplo de salida:
// Options:  { debug: true, port: '9000', mode: 'production', username: 'admin' }
