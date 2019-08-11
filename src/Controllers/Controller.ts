import {ControllerInterface} from './ControllerInterface';
import {Router} from 'express';

export class Controller implements ControllerInterface {
    public path: string;
    public router: Router | null;

    constructor(path: string, router: Router | null) {
        this.path = path;
        this.router = router;
    }
}
