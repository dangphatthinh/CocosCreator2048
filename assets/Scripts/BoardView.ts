import { _decorator, Component, Node, Label, Color, Sprite } from 'cc';
import { BoardState } from './BoardState';
import { ObjectColor } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('BoardView')
export class BoardView extends Component {
    public static Instance: BoardView = null;
    @property({ group: { name: 'Objects' }, type: Label })
    private object: Label[] | null = [];

    @property({ group: { name: 'Color' }, type: Sprite })
    private spritecolor: Sprite[] | null = [];

    private objectColor: string[] = ["ffffffc4", "eee4da", "ece0ca", "f4b17a", "f59575", "f57c5f", "f65d3b",
        "edce71", "edcc63", "edc651", "eec744", "ecc230", "fe3d3d", "ff2020"];

    onLoad() {
        BoardView.Instance = this;
    }

    public UpdateBoardView() {
        let arr = new Array();
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (BoardState.Instance.board.GetValueAt(r, c) == 0) {
                    arr.push("");
                }
                else {
                    arr.push(BoardState.Instance.board.GetValueAt(r, c));
                }
            }
        }
        for (let i = 0; i < 16; i++) {
            if (typeof arr[i] == 'number') {
                this.object[i].string = Math.pow(2, arr[i]).toString();
                this.spritecolor[i].color = Color.fromHEX(new Color(), this.objectColor[arr[i]]);
            }
            else {
                this.object[i].string = arr[i].toString();
                this.spritecolor[i].color = Color.fromHEX(new Color(), this.objectColor[0]);
            }
        }
    }
}


