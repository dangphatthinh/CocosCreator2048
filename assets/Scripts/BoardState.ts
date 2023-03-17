import { _decorator, Component, Node, random, randomRangeInt } from 'cc';
import { BoardView } from './BoardView';
import { InputState } from './Enum';
import { Matrix } from './Matrix';
import { MyArray } from './MyArray';
import { ScoreManager } from './ScoreManager';
import { UiManager } from './UiManager';
import { Vecto2Int } from './Vecto2Int';
const { ccclass, property } = _decorator;

@ccclass('BoardState')
export class BoardState extends Component {
    public static Instance: BoardState = null;
    public board = new Matrix();
    public boardtemp = new Matrix();

    onLoad() {
        BoardState.Instance = this;
    }
    start() {
        this.InitLevel();
    }

    InitLevel() {
        this.board.InitEmptyBoard();
        this.board.InitRandomObject();
        this.board.InitRandomObject();
        this.boardtemp.InitEmptyBoard();
        this.boardtemp.CopyMatrix(this.board);
        this.board.PrintBoard();
        BoardView.Instance.UpdateBoardView();
        UiManager.Instance.UpdateScore();
    }
    public UpdateBoard(state: number) {
        if (!this.CanSlideLeft() && !this.CanSlideRight() && !this.CanSlideDown() && !this.CanSlideLeft()) {
            UiManager.Instance.GameOver();
            console.log("Game Over");
            return; // sửa lại theo kiểu flag
        }
        switch (state) {
            case InputState.LEFT:
                if (this.CanSlideLeft()) {
                    console.log("left");
                    this.SlideLeft(this.board, false);
                }
                break;
            case InputState.RIGHT:
                if (this.CanSlideRight()) {
                    console.log("right");
                    this.SlideRight(this.board, false);
                }
                break;
            case InputState.DOWN:
                if (this.CanSlideDown()) {
                    console.log("down");
                    this.SlideDown(this.board, false);
                }
                break;
            case InputState.UP:
                if (this.CanSlideUp()) {
                    console.log("up");
                    this.SlideUp(this.board, false);
                }
                break;
        }

    }

    public SlideLeft(board: Matrix, checking: boolean) {
        let matrixsize = 4;
        let row = new MyArray();
        for (let r = 0; r < matrixsize; r++) {
            for (let c = 0; c < matrixsize; c++) {
                row.Add(board.GetValueAt(r, c));
            }
            row.ClearZeroElement();
            row.Merge(checking);
            row.ClearZeroElement();
            let numberOfZero = row.CountZeroElement();
            row.AddZeroElement(numberOfZero);
            for (let c = 0; c < matrixsize; c++) {
                board.SetValueByPos(r, c, row.Get(c));
            }
            row.Clear();
        }
        if (checking) {
            return;
        }
        board.InitRandomObject();
        this.boardtemp.CopyMatrix(this.board);
        board.PrintBoard();
        BoardView.Instance.UpdateBoardView();
        UiManager.Instance.UpdateScore();
        //console.log(ScoreManager.Instance.score);
        //this.boardtemp.PrintBoard();
    }
    public SlideRight(board: Matrix, checking: boolean) {
        let matrixsize = 4;
        let row = new MyArray();
        for (let r = 0; r < matrixsize; r++) {
            for (let c = 3; c >= 0; c--) {
                row.Add(board.GetValueAt(r, c));
            }
            row.ClearZeroElement();
            row.Merge(checking);
            row.ClearZeroElement();
            let numberOfZero = row.CountZeroElement();
            row.AddZeroElement(numberOfZero);
            for (let c = 0; c < matrixsize; c++) {
                board.SetValueByPos(r, c, row.Get(3 - c));
            }
            row.Clear();
        }
        if (checking) {
            return;
        }
        board.InitRandomObject();
        this.boardtemp.CopyMatrix(this.board);
        board.PrintBoard();
        BoardView.Instance.UpdateBoardView();
        UiManager.Instance.UpdateScore();
        //console.log(ScoreManager.Instance.score);
        //this.boardtemp.PrintBoard();
    }
    public SlideDown(board: Matrix, checking: boolean) {
        let matrixsize = 4;
        let row = new MyArray();
        for (let c = 0; c < matrixsize; c++) {
            for (let r = 0; r < matrixsize; r++) {
                row.Add(board.GetValueAt(r, c));
            }
            row.ClearZeroElement();
            row.Merge(checking);
            row.ClearZeroElement();
            let numberOfZero = row.CountZeroElement();
            row.AddZeroElement(numberOfZero);
            for (let r = 0; r < matrixsize; r++) {
                board.SetValueByPos(r, c, row.Get(r));
            }
            row.Clear();
        }
        if (checking) {
            return;
        }
        board.InitRandomObject();
        this.boardtemp.CopyMatrix(this.board);
        board.PrintBoard();
        BoardView.Instance.UpdateBoardView();
        UiManager.Instance.UpdateScore();
        //console.log(ScoreManager.Instance.score);
        //this.boardtemp.PrintBoard();
    }
    public SlideUp(board: Matrix, checking: boolean) {
        let matrixsize = 4;
        let row = new MyArray();
        for (let c = 0; c < matrixsize; c++) {
            for (let r = 3; r >= 0; r--) {
                row.Add(board.GetValueAt(r, c));
            }
            row.ClearZeroElement();
            row.Merge(checking);
            row.ClearZeroElement();
            let numberOfZero = row.CountZeroElement();
            row.AddZeroElement(numberOfZero);
            for (let r = 0; r < matrixsize; r++) {
                board.SetValueByPos(r, c, row.Get(3 - r));
            }
            row.Clear();
        }
        if (checking) {
            return;
        }
        board.InitRandomObject();
        this.boardtemp.CopyMatrix(this.board);
        board.PrintBoard();
        BoardView.Instance.UpdateBoardView();
        UiManager.Instance.UpdateScore();
        //console.log(ScoreManager.Instance.score);
        //this.boardtemp.PrintBoard();
    }
    public CanSlideLeft(): boolean {
        this.SlideLeft(this.boardtemp, true);
        if (this.boardtemp.IsTheSameMatrix(this.board)) {
            return false;
        }
        this.boardtemp.CopyMatrix(this.board);
        return true;
    }
    public CanSlideRight(): boolean {
        this.SlideRight(this.boardtemp, true);
        if (this.boardtemp.IsTheSameMatrix(this.board)) {
            return false;
        }
        this.boardtemp.CopyMatrix(this.board);
        return true;
    }
    public CanSlideDown(): boolean {
        this.SlideDown(this.boardtemp, true);
        if (this.boardtemp.IsTheSameMatrix(this.board)) {
            return false;
        }
        this.boardtemp.CopyMatrix(this.board);
        return true;
    }
    public CanSlideUp(): boolean {
        this.SlideUp(this.boardtemp, true);
        if (this.boardtemp.IsTheSameMatrix(this.board)) {
            return false;
        }
        this.boardtemp.CopyMatrix(this.board);
        return true;
    }

}


