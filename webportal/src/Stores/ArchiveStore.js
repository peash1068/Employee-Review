import {EventEmitter} from 'events';
import dispatcher from '../dispathcher';

class ArchiveStore extends EventEmitter{
    constructor(){
        super();

        this.Archives=[
            "Ghost Archive",
            "Alien Archives",
            "Technology Archives",
            "Mothman",
        ];

    }

    getArchives(){
        return this.Archives;
    }
    updateArchive(text){
        this.Archives.push(text);
        this.emit("change");
    };
    handleAction(action){
        console.log("Action Type :",action.type);
    }

}

const archiveStore =new ArchiveStore();
//window.archiveStore=archiveStore;
dispatcher.register(archiveStore.handleAction.bind(archiveStore.handleAction));
window.dispatcher= dispatcher;
export default archiveStore;