import express, {Router} from 'express';
import {RepositoryInterface} from './Repository/RepositoryInterface';
import {Repository} from './Repository/Repository';
import {MongoDbAdapter} from './Adapter/MongoDbAdapter/MongoDbAdapter';
import {ControllerInterface} from './Controllers/ControllerInterface';
import {Controller} from './Controllers/Controller';
import error from './middleware/error';

class App {
    public app: express.Application;
    public controllers: ControllerInterface[];
    public repository: RepositoryInterface;

    constructor(
        controllers: ControllerInterface[],
        repository: RepositoryInterface
    ) {
        this.repository = repository;
        this.controllers = controllers;
        this.app = express();
        this.repository.connectToDatabase();
        this.initializeMiddleware();
        this.initializeErrorHandling();
        this.initializeControllers(controllers);
    }

    private initializeMiddleware(): void {
        this.app.use(express.json());
    }

    private initializeErrorHandling(): void {
        this.app.use(error);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
}


new App(
    [
        new Controller('', null),
    ],
    new Repository(new MongoDbAdapter())
);

