import { _decorator, Component, Node, Vec2, randomRangeInt, random } from 'cc';
import { MyArray } from './MyArray';
import { Vecto2Int } from './Vecto2Int';
const { ccclass, property } = _decorator;

@ccclass('Matrix')
export class Matrix {
    private _matrix: MyArray<MyArray<number>>;
    private _nRow: number = 4;
    private _nCol: number = 4;

    get nRow() {
        return this._nRow;
    }
    get nCol() {
        return this._nCol;
    }

    public InitEmptyBoard() {
        this._matrix = new MyArray();
        for (let i = 0; i < this.nRow; i++) {
            this._matrix[i] = new MyArray();
            for (let j = 0; j < this.nCol; j++) {
                this._matrix[i][j] = 0;
            }
        }
    }

    public InitRandomObject() {
        let value = this.GetRandomValue();
        while (true) {
            let pos = this.GetRandomPosition();
            if (this.IsEmptyPosition(pos)) {
                this.SetValue(pos, value);
                return
            }
        }
    }

    public GetRandomValue(): number {
        let percent = 0.9;
        if (Math.random() > percent) {
            return 2;
        }
        else return 1;
    }

    public GetRandomPosition(): Vecto2Int {
        let xPos = randomRangeInt(0, 4);
        let yPos = randomRangeInt(0, 4);
        return new Vecto2Int(xPos, yPos);
    }

    public SetValue(xyPos: Vecto2Int, value: number) {
        this._matrix[xyPos.x][xyPos.y] = value;
    }

    public SetValueByPos(xPos: number, yPos: number, value: number) {
        this._matrix[xPos][yPos] = value;
    }

    public IsEmptyPosition(xyPos: Vecto2Int): boolean {
        return this._matrix[xyPos.x][xyPos.y] == 0;
    }

    public GetValueAt(xPos: number, yPos: number): number {
        return this._matrix[xPos][yPos];
    }

    public CopyMatrix(matrix: Matrix) {
        for (let i = 0; i < this.nRow; i++) {
            for (let j = 0; j < this.nCol; j++) {
                this._matrix[i][j] = matrix.GetValueAt(i, j);
            }
        }
    }
    public IsTheSameMatrix(matrix: Matrix): boolean {
        for (let i = 0; i < this.nRow; i++) {
            for (let j = 0; j < this.nCol; j++) {
                if (this._matrix[i][j] != matrix.GetValueAt(i, j)) {
                    return false;
                }
            }
        }
        return true;
    }

    public PrintBoard() {
        console.log(this._matrix[3][0] + " " + this._matrix[3][1] + " " + this._matrix[3][2] + " " + this._matrix[3][3]);
        console.log(this._matrix[2][0] + " " + this._matrix[2][1] + " " + this._matrix[2][2] + " " + this._matrix[2][3]);
        console.log(this._matrix[1][0] + " " + this._matrix[1][1] + " " + this._matrix[1][2] + " " + this._matrix[1][3]);
        console.log(this._matrix[0][0] + " " + this._matrix[0][1] + " " + this._matrix[0][2] + " " + this._matrix[0][3]);
    }
}


