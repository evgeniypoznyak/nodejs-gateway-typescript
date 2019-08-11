import {RepositoryInterface} from './RepositoryInterface';
import {AdapterInterface} from '../Adapter/MongoDbAdapter/AdapterInterface';

export class Repository implements RepositoryInterface {
    private adapter: AdapterInterface;

    constructor(adapter: AdapterInterface) {
        this.adapter = adapter;
    }

    connectToDatabase() {
        this.adapter.connect();
    }
}
