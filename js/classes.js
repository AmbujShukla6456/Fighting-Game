
class sprite{
    constructor({ position , imageSrc,scale=1,frames=1, offset={x:0,y:0}}){
        this.position=position;
        this.height=150;
        this.width=55
        this.image=new Image,
        this.image.src=imageSrc
        this.scale=scale
        this.frames=frames
        this.currentFrame=0
        this.framesElapsed=0
        this.framesHold=7
        this.offset=offset

    }
    draw(){
        ctx.drawImage(
            this.image,
            this.currentFrame*(this.image.width/this.frames),
            0,
            this.image.width/this.frames,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width/this.frames)*this.scale,
            this.image.height*this.scale)
    }

    frameAnimate(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0)    {
            if(this.currentFrame < this.frames -1)
            this.currentFrame++
            else
            this.currentFrame=0
        }
    }

    update(){
        this.draw()
        this.frameAnimate();
    }
}

class character extends sprite{
        constructor({ position, velocity, imageSrc, scale=1, frames=1,offset={x:0,y:0},sprites, attackbox={offset:{},width:undefined,height:undefined}}){
            super({position , imageSrc , scale , frames , offset})
            this.velocity=velocity
            this.height=150
            this.width=55
            this.lastkey
            this.attackbox={
                position:{
                   x: this.position.x,
                   y: this.position.y
                },
                offset: attackbox.offset,
                width: attackbox.width,
                height: attackbox.height,
            }
            this.isAttacking=false;
            this.health=100;
            this.currentFrame=0
            this.framesElapsed=0
            this.framesHold=7
            this.sprites=sprites
            this.dead=false

            for(const Sprite in this.sprites){
                sprites[Sprite].image=new Image,
                sprites[Sprite].image.src=sprites[Sprite].imageSrc
            }
        }

        update(){
            this.draw()
            this.position.y += this.velocity.y;
            
            if(!this.dead) this.frameAnimate();

            // ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)

            this.attackbox.position.x=this.position.x + this.attackbox.offset.x
            this.attackbox.position.y=this.position.y + this.attackbox.offset.y
    
            if(this.position.x + this.velocity.x >=0 && (this.position.x + 50) + this.velocity.x < canvas.width)
                        this.position.x+=this.velocity.x;
                    else this.velocity.x=0;
            
                    if(this.position.y + this.height + this.velocity.y >=canvas.height - 95){
                        this.velocity.y=0
                        this.position.y=330
                    }
                    else this.velocity.y +=gravity;
            
        }
                
        attack(){
            this.switchsprite('attack1')
            this.isAttacking=true;
        }

        takehit(damage){
            this.health -= damage;

            if(this.health <= 0){
                this.switchsprite('death')
            }
            else this.switchsprite('takehit')
        }

        switchsprite(sp)
        {
            if(this.image === this.sprites.death.image){        
                if(this.currentFrame === this.sprites.death.frames -1) this.dead=true;
                return
            } 

            if( (this.image === this.sprites.attack1.image && this.currentFrame < this.sprites.attack1.frames -1) ||
            (this.image === this.sprites.takehit.image && this.currentFrame < this.sprites.takehit.frames -1)) return
            
            switch(sp){
                case 'idle':
                    if(this.image !== this.sprites.idle.image){
                        this.image=this.sprites.idle.image
                        this.frames=this.sprites.idle.frames
                        this.currentFrame=0
                    }
                    break;
                case 'run':
                    if(this.image !== this.sprites.run.image){
                        this.image=this.sprites.run.image
                        this.frames=this.sprites.run.frames
                        this.currentFrame=0
                    }
                    break;
                case 'jump':
                    if(this.image !== this.sprites.jump.image){
                        this.image=this.sprites.jump.image
                        this.frames=this.sprites.jump.frames
                        this.currentFrame=0
                    }
                    break;
                case 'fall':
                    if(this.image !== this.sprites.fall.image){
                        this.image=this.sprites.fall.image
                        this.frames=this.sprites.fall.frames
                        this.currentFrame=0
                    }
                    break;
                case 'attack1':
                    if(this.image !== this.sprites.attack1.image){
                        this.image=this.sprites.attack1.image
                        this.frames=this.sprites.attack1.frames
                        this.currentFrame=0
                    }
                    break;
                case 'takehit':
                    if(this.image !== this.sprites.takehit.image){
                        this.image=this.sprites.takehit.image
                        this.frames=this.sprites.takehit.frames
                        this.currentFrame=0
                    }
                    break;
                case 'death':
                    if(this.image !== this.sprites.death.image){
                        this.image=this.sprites.death.image
                        this.frames=this.sprites.death.frames
                        this.currentFrame=0
                    }
                    break;
            }
        };
    }      