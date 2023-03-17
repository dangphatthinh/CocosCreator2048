import { _decorator, Component, Node, RichText, Sprite } from 'cc';
import { BoardState } from './BoardState';
import { ScoreManager } from './ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('UiManager')
export class UiManager extends Component {
    public static Instance: UiManager = null;
    @property({ group: { name: 'References' }, type: RichText })
    private gameOver: RichText | null = null;
    @property({ group: { name: 'References' }, type: RichText })
    public scoreText: RichText | null = null;
    @property({ group: { name: 'References' }, type: Sprite })
    public backGround: Sprite | null = null;

    public get initPosX(): number {
        return -1080 * 2;
    }
    onLoad() {
        UiManager.Instance = this;
        this.gameOver.node.setPosition(this.initPosX, this.gameOver.node.position.y);
        this.backGround.node.setPosition(this.initPosX, this.gameOver.node.position.y);
    }

    public GameOver() {
        this.gameOver.node.setPosition(0, 0);
        this.backGround.node.setPosition(0, 0);
    }
    public UpdateScore() {
        this.scoreText.string = "SCORE: " + ScoreManager.Instance.score.toString();
    }
    public NewGame() {
        ScoreManager.Instance.ResetScore();
        BoardState.Instance.InitLevel();
        this.gameOver.node.setPosition(this.initPosX, this.gameOver.node.position.y);
        this.backGround.node.setPosition(this.initPosX, this.gameOver.node.position.y);
    }
}


