import express from 'express';
import OpenSpaceUseCase from "../../domain/usecases/OpenSpaceUseCase";
import OpenSpaceCommand from "../../domain/commands/OpenSpaceCommand";

class SpaceController {
    constructor(private openSpaceUseCase: OpenSpaceUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/', (req, res) => {
            const name = req.body.name;
            const userId = req.body.userid;

            const command = new OpenSpaceCommand(name, userId);
            const openedSpaceEvent = this.openSpaceUseCase.execute(command);

            res.send(openedSpaceEvent);
        });

        return router;
    }
}

export default SpaceController;