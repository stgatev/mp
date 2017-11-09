# Azure Deployment

## Azure-specific files

### Copy the following files to the root directory of the project:
- **.deployment**
- **deploy.cmd**
- **Web.config**

## Automated Git Deployments

### Node Modules
If using Azure's Git deployment option, with the application set to monitor the repository and automatically pull the changes and deploy, the modules under the **devDependencies** must be moved to **dependencies** to ensure proper build.

## Code Changes

### Setting the Working Directory
Azure switches the working directory to that of the entry script when invoking *iisnode*, in this case, **dist/**. In dev, the working directory is not changed, and is usually the root of the project. To match the environments, add the following line at the top of **app.ts**:
```
process.chdir(path.resolve(__dirname + './..'));
```
Like this:
```
import ...

// iisnode changes the working directory to that of the handler
process.chdir(path.resolve(__dirname + './..'));

class App {
    public express: express.Application;
    ...
```

## Good Reads
### Setting up a Project with TypeScript + Express
- [Developing a RESTful API With Node and TypeScript](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/)
- [Build a Node.js RESTful API and deploy it to an API app in Azure](https://docs.microsoft.com/en-us/azure/app-service-api/app-service-api-nodejs-api-app)
- [Deploying TypeScript Projects to Azure from GitHub Using Continuous Deployment](http://www.codefoster.com/tscazure/)
