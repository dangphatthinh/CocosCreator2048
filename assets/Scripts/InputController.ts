import { _decorator, Component, Node, systemEvent, System, SystemEventType, EventKeyboard, KeyCode } from 'cc';
import { BoardState } from './BoardState';
import { InputState } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('InputManager')
export class InputController extends Component {
    public board: BoardState;
    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        this.board = this.getComponent(BoardState);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                this.board.UpdateBoard(InputState.UP);
                break;
            case KeyCode.ARROW_DOWN:
                this.board.UpdateBoard(InputState.DOWN);
                break;
            case KeyCode.ARROW_LEFT:
                this.board.UpdateBoard(InputState.LEFT);
                break;
            case KeyCode.ARROW_RIGHT:
                this.board.UpdateBoard(InputState.RIGHT);
                break;
            default:
                break;
        }
    }
}


