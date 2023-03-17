import { _decorator, Component, Node, tween, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
    public static Instance: ScoreManager = null;

    private _score: number = 0;
    private _highscore: number = 0;

    get score(): number {
        return this._score;
    }
    set score(value: number) {
        this._score = value;
    }
    onLoad() {
        ScoreManager.Instance = this;
        this._score = 0;
    }
    public AddScore(value: number) {
        this._score += value;
    }
    public ResetScore() {
        this._score = 0;
    }
    public SetHighScore() {
        if (this._score > parseInt(sys.localStorage.getItem("highscore"))) {
            sys.localStorage.setItem("highscore", this._score.toString());
        }
    }
    public GetHighScore() {
        if (sys.localStorage.getItem("highscore") != undefined) {
            return parseInt(sys.localStorage.getItem("highscore"));
        }
        else {
            sys.localStorage.setItem("highscore", "0");
            return 0;
        }
    }
}


