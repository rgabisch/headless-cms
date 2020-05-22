import {WriteContentCommand} from "../commands/WriteContentUseCaseTest";
import {WrittenContentEvent} from "../events/WriteContentUseCaseTest";

class WriteContentUseCase {
    async execute(command: WriteContentCommand): Promise<WrittenContentEvent> {
        return {};
    }
}

export default WriteContentUseCase;