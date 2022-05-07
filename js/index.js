const con=document.getElementById("con")
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext('2d'); //ctx->context

canvas.width=1024
canvas.height=574

ctx.fillRect(0,0, canvas.width,canvas.height);

con.style= "position: relative;display:inline-block; top: 85px; left: 235px;"

const gravity=0.7;

const background=new sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc:'./IMG/background.png'
})

const shop=new sprite({
    position: {
        x:620,
        y:130
    },
    imageSrc:'./IMG/shop.png',
    scale:2.75,
    frames:6
})

const player=new character({
    position: {
    x:0,
    y:0
    },
    velocity: {
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc:'./IMG/samuraiMack/Idle.png',
    frames:8,
    scale:2.5,
    offset:{
        x:215,
        y:157
    },
    sprites:{
        idle:{
            imageSrc:'./IMG/samuraiMack/Idle.png',
            frames:8,
        },
        run:{
            imageSrc:'./IMG/samuraiMack/Run.png',
            frames:8
        },
        jump:{
            imageSrc:'./IMG/samuraiMack/Jump.png',
            frames:2
        },
        fall:{
            imageSrc:'./IMG/samuraiMack/Fall.png',
            frames:2
        },
        attack1:{
            imageSrc:'./IMG/samuraiMack/Attack1.png',
            frames:6
        },
        takehit:{
            imageSrc:'./IMG/samuraiMack/Take hit.png',
            frames:4
        },
        death:{
            imageSrc:'./IMG/samuraiMack/Death.png',
            frames:6
        }
    },
    attackbox:{
        offset:{
            x:75,
            y:50
        },
        width: 150,
        height: 50,
    }
})

const enemy=new character({
    position: {
    x:500,
    y:0
    },
    velocity: {
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc:'./IMG/kenji/Idle.png',
    frames:4,
    scale:2.5,
    offset:{
        x:215,
        y:170
    },
    sprites:{
        idle:{
            imageSrc:'./IMG/kenji/Idle.png',
            frames:4,
        },
        run:{
            imageSrc:'./IMG/kenji/Run.png',
            frames:8
        },
        jump:{
            imageSrc:'./IMG/kenji/Jump.png',
            frames:2
        },
        fall:{
            imageSrc:'./IMG/kenji/Fall.png',
            frames:2
        },
        attack1:{
            imageSrc:'./IMG/kenji/Attack1.png',
            frames:4
        },
        takehit:{
            imageSrc:'./IMG/kenji/Take hit.png',
            frames:3
        },
        death:{
            imageSrc:'./IMG/kenji/Death.png',
            frames:7
        }
    },
    attackbox:{
        offset:{
            x:-150,
            y:50
        },
        width:150,
        height: 50,
    }
})

const key={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    },
}

decreasetimer();

function move(){
    window.requestAnimationFrame(move)
    ctx.fillStyle="black"
    ctx.fillRect(0,0, canvas.width,canvas.height)

    background.update();
    shop.update();

    ctx.fillStyle='rgb(255,255,255,0.15)'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    player.update();
    enemy.update();

    player.velocity.x=0;
    enemy.velocity.x=0;

    if(key.a.pressed && player.lastkey==='a'){
        player.velocity.x=-5
        player.switchsprite('run')
    }
    else if(key.d.pressed && player.lastkey==='d'){
        player.velocity.x=5
        player.switchsprite('run')
    }
    else{
        player.switchsprite('idle')
    }

    if(player.velocity.y < 0){
        player.switchsprite('jump')
    }
    else if(player.velocity.y > 0){
        player.switchsprite('fall')
    }

    if(key.ArrowLeft.pressed && enemy.lastkey==='ArrowLeft'){
        enemy.velocity.x=-5
        enemy.switchsprite('run')
    } 
    else if(key.ArrowRight.pressed && enemy.lastkey==='ArrowRight'){
        enemy.velocity.x=5
        enemy.switchsprite('run')
    }
    else{
        enemy.switchsprite('idle')
    }

    if(enemy.velocity.y < 0){
        enemy.switchsprite('jump')
    }
    else if(enemy.velocity.y > 0){
        enemy.switchsprite('fall')
    }

    if(player.velocity.y == 0 ) key.w.pressed=false;
    if(enemy.velocity.y == 0 ) key.ArrowUp.pressed=false;

    if(collision({
        rect1:player,
        rect2:enemy
    })
         &&
        player.isAttacking && player.currentFrame === 4
    ){  
        player.isAttacking=false;
        let dam=20
        enemy.takehit(dam)
        gsap.to('#enemyhealth',{
            width: enemy.health + "%"
        })
    }

    if(player.isAttacking && player.currentFrame === 4){
        player.isAttacking=false
    }

    if(collision({
        rect1:enemy,
        rect2:player
    })
         &&
        enemy.isAttacking && enemy.currentFrame === 2
    ){  
        enemy.isAttacking=false;
        let dam=10
        player.takehit(dam)
        gsap.to('#playerhealth',{
            width: player.health + "%"
        })
    }

    if(enemy.isAttacking && enemy.currentFrame === 2){
        enemy.isAttacking=false
    }

    if(player.health <= 0 || enemy.health <= 0){
        winner({player,enemy, timerID})
    }
}

move()

window.addEventListener('keydown',(event)=>{
   if(!player.dead)
   { switch(event.key){
        case 'd':
            key.d.pressed=true;
            player.lastkey='d'
            break;
        case 'a':
            key.a.pressed=true;
            player.lastkey='a'
            break;
        case 'w':
            if(key.w.pressed==false){
            player.velocity.y=-20
            key.w.pressed=true
            }
            break;
        case ' ':
            player.attack();
            break;

        }}

        if(!enemy.dead){
        switch(event.key){
        case 'ArrowRight':
            key.ArrowRight.pressed=true;
            enemy.lastkey='ArrowRight'
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed=true;
            enemy.lastkey='ArrowLeft'
            break;
        case 'ArrowUp':
            if(key.ArrowUp.pressed==false){
                enemy.velocity.y=-20
                key.ArrowUp.pressed=true
            }
            break;
        case 'ArrowDown':
                enemy.attack();
                break;
        }
    }
    }
)
window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            key.d.pressed=false;
            break;
        case 'a':
            key.a.pressed=false;
            break;

        case 'ArrowLeft':
            key.ArrowLeft.pressed=false;
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed=false;
            break;
    }
})