import ShowContentCommand from "../commands/ShowContentCommand";
import ShowContentEvent from "../events/ShowContentEvent";

class ShowContentUseCase {

    execute(command: ShowContentCommand): ShowContentEvent {
        return {
            id: '',
            name: '',
            schema: {
                id: '',
                name: ''
            },
            mapping: []
        }
    }

}


export default ShowContentUseCase;