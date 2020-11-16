export default class GameObject
{
    Height: number;
    Width: number
    PosX: number
    PosY: number
    Color: string
    Hidden: boolean
    constructor(height: number, width: number, posX: number, posY: number, color: string, hidden: boolean)
    {
        this.Height = height;
        this.Width = width;
        this.PosX = posX;
        this.PosY = posY;
        this.Color = color;
        this.Hidden = hidden;
    }
    Move(x: number, y: number)
    {
        this.PosX += x;
        this.PosY += y;
    }
}