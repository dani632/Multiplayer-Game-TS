import GameObject from "./gameobject";
export default class Game
{
   Canvas: HTMLCanvasElement
   Ctx: CanvasRenderingContext2D
   Objects: GameObject[] = new Array()
   NetworkObjects: GameObject[] = new Array();
   constructor(height: number, width: number)
   {
       this.Canvas = document.createElement('canvas');
       this.Canvas.style.border = '1px solid black';
       this.Canvas.height = height;
       this.Canvas.width = width;
       this.Ctx = this.Canvas.getContext('2d');
       document.body.appendChild(this.Canvas);
   }
   Add(object: GameObject)
   {
       this.Objects.push(object);
   }
   AddNetwork(object: GameObject)
   {
        this.NetworkObjects.push(object);
   }
   Render()
   {

       for(var i = 0; i < this.Objects.length; i++)
       {
            if(!this.Objects[i].Hidden)
            {
                this.Ctx.fillStyle = this.Objects[i].Color;
                this.Ctx.fillRect(this.Objects[i].PosX, this.Objects[i].PosY, this.Objects[i].Width, this.Objects[i].Height);
            }
            
       }
       for(var i = 0; i < this.NetworkObjects.length; i++)
       {
            if(!this.NetworkObjects[i].Hidden)
            {
                this.Ctx.fillStyle = this.NetworkObjects[i].Color;
                this.Ctx.fillRect(this.NetworkObjects[i].PosX, this.NetworkObjects[i].PosY, this.NetworkObjects[i].Width, this.NetworkObjects[i].Height);
            }
            
       }
        
   }
   Update()
   {
       this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height)
       for(var i = 0; i < this.Objects.length; i++)
       {
            if(!this.Objects[i].Hidden)
            {
                this.Ctx.fillStyle = this.Objects[i].Color;
                this.Ctx.fillRect(this.Objects[i].PosX, this.Objects[i].PosY, this.Objects[i].Width, this.Objects[i].Height);
            }
       }
       for(var i = 0; i < this.NetworkObjects.length; i++)
       {
            if(!this.NetworkObjects[i].Hidden)
            {
                this.Ctx.fillStyle = this.NetworkObjects[i].Color;
                this.Ctx.fillRect(this.NetworkObjects[i].PosX, this.NetworkObjects[i].PosY, this.NetworkObjects[i].Width, this.NetworkObjects[i].Height);
            }
            
       }

   }
   CheckCollisions(object1: GameObject, object2: GameObject)
   {
        if(object1.PosX == object2.PosX && object1.PosY == object2.PosY)
        {
            return true;
        }
        else
        {
            return false;
        }
   }

}