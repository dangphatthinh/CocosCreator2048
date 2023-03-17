import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Vecto2Int')
export class Vecto2Int {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set(xPos: number, yPos: number) {
        this._x = xPos;
        this._y = yPos;
    }

    public ToString(): string {
        return "[" + this._x + "," + this._y + "]";
    }
}


