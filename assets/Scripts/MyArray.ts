import { _decorator, Component, Node, randomRangeInt } from 'cc';
import { Matrix } from './Matrix';
import { ScoreManager } from './ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('MyArray')
export class MyArray<T> {
    private list: Array<number>;
    constructor() {
        this.list = [];
    }
    public Size() {
        return this.list.length;
    }

    public Push(value: number): number {
        return this.Add(value);
    }
    public Add(value: number): number {
        this.list.push(value);
        return value;
    }

    public Get(index: number): number {
        return this.list[index];
    }
    public Set(index: number, value: number): MyArray<T> {
        this.list[index] = value;
        return this;
    }

    public AddListParams(..._elements: number[]): MyArray<T> {
        for (let i = 0; i < _elements.length; i++)
            this.Add(_elements[i]);
        return this;
    }
    public AddListMyList(_elements: MyArray<T>): MyArray<T> {
        for (let i = 0; i < _elements.Size(); i++)
            this.Add(_elements.Get(i));
        return this;
    }
    public Shift(): number {
        return this.list.shift();
    }
    public RemoveFirst(): number {
        return this.list.shift();
    }
    public RemoveAt(index: number): number {
        let item = this.Get(index);
        this.list.splice(index, 1);
        return item;
    }
    public Remove(element: number): boolean {
        for (let i = 0; i < this.Size(); i++) {
            if (this.Get(i) === element) {
                this.RemoveAt(i);
                return true;
            }
        }
        return false;
    }
    public First(): number {
        return this.Get(0);
    }
    public Last(): number {
        return this.Get(this.Size() - 1);
    }
    public Pop(): number {
        return this.list.pop();
    }
    public RemoveLast(): number {
        return this.Pop();
    }
    public Random(): number {
        return this.Get(randomRangeInt(0, this.Size()));
    }
    public Clear(): MyArray<T> {
        this.list = []; return this;
    }
    public ClearZeroElement() {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] > 0) {
                continue;
            }
            this.list.splice(i, 1);
            i -= 1;
        }
    }
    public GetArrayFromMatrix(matrix: Matrix, index: number) {
        let MatrixSzie = 4;
        let arr = new MyArray<T>;
        for (let i = 0; i < MatrixSzie; i++) {
            arr.Add(matrix[index][i]);
        }
        return arr;
    }
    public CountZeroElement(): number {
        let arraySize = 4;
        let count = 0;
        for (let i = 0; i < arraySize; i++) {
            if (this.list[i] > 0) {
                continue;
            }
            count += 1;
        }
        return count;
    }
    public Merge(checking: boolean) {
        let arraySize = 4;
        for (let i = 0; i < arraySize - 1; i++) {
            if (this.list[i] == this.list[i + 1] && this.list[i] > 0 && this.list[i + 1] > 0) {
                this.list[i] += 1;
                this.list[i + 1] = 0;
                if (checking) {
                    return;
                }
                ScoreManager.Instance.AddScore(Math.pow(2, this.list[i]));
            }
        }
    }
    public AddZeroElement(value: number) {
        for (let i = 0; i < value; i++) {
            this.list.push(0);
        }
    }
    public PrintArray() {
        console.log("[" + this.list[0] + ", " + this.list[1] + ", " + this.list[2] + ", " + this.list[3] + "]");
    }
}


