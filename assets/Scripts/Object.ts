import { _decorator, Component, Node, Sprite, Color, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Object')
export class Object extends Component {
    private _catchedSprite: Sprite | null = null;
    private _initPos: Vec3 = new Vec3();

    public get color(): Color {
        return this._catchedSprite.color;
    }
    public set color(color: Color) {
        this._catchedSprite.color = color;
    }
    public get position(): Vec3 {
        return this.node.position;
    }
    public set position(position: Vec3) {
        this._initPos = position;
        this.node.setPosition(position);
    }
    onLoad() {
        this._catchedSprite = this.getComponent(Sprite);
    }
}


