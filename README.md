# express-template

## Description
This is a NodeJS / Express application. It is written in TypeScript, and uses Swagger for REST API routing.

## Getting Started

### Prerequisites

#### NodeJS with NPM
Download Node from [nodejs.org](https://nodejs.org). Minimum required version is 6.9.1. Node distributions include NPM, the Node Package Manager.

#### [Optional] Using Yarn
If using Yarn, install it globally. If installed locally, the package installation may try to remove it, as it is not declared as a project dependency, and run into a problem.
```
npm install -g yarn
```

#### Project dependencies
The project dependencies are declared in **package.json**. They can be installed by NPM or Yarn. Either should work, however, Yarn is more performant and resilient.
```
npm install

-- OR --

yarn
```
**NOTE:** On Windows, it is possible for the Node modules installation by either NPM or Yarn to fail with a message stating a staging directory could not be renamed. Try disabling the Antivirus (both Real-time and Cloud-based protection). Another thing to try is to change the maximum path lenght, kept in the MAX_PATH environment variable, originally set to 260 characters, to a larger value:
```
SET MAX_PATH=10000
```

### Configuration
Configuration is handled by [Node Config](https://www.npmjs.com/package/config), which supports multi-level overrides. Default configuration is stored in **./config/default.json** file. For non-dev environments, overriding configuration is stored in **./config/{$NODE\_ENV}.json** file, where **$NODE\_ENV** is the name of the environment variable determining the deployment environment (e.g. ci, staging, production).

### Running the code
In the root directory of the project, run
```
npm start
```
Then, open a browser and point it to
```
http://localhost:8000
```
The actual port number is set in the project configuration (see **Configuration** above)

### Running the tests
In the project root directory, run
```
npm test
```

### In Visual Studio Code
The TypeScript options specify that the transpiler should create source code maps, which make it possible to debug the original *.ts* files while their counterpart *.js* files are being executed.

The project includes Visual Studio Code tasks configuration as well as a launch configuration.

#### Tasks Configuration
Visual Studio Code can run *tasks*. To run a task, open the Command Palette (View->Command Palette or *Ctrl-Shift-P*), then select "Run Task" command, and select the task to run.

- The **build** task invokes the TypeScript transpiler and converts the TypeScript code to JavaScript, ready for execution. The **build** task is also set as a default build task so it can be invoked with "Tasks: Run Build Task" command (*Ctrl-Shift-B*).

- The **test** task runs all unit and integration tests. The task is configured as a designated test task in Visual Studio Code, and can be executed directly with "Tasks: Run Test Task".
