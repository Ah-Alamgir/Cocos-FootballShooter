import { _decorator, Animation, Button, CircleCollider2D, Collider, Collider2D, Component,  Contact2DType,  EventMouse,  EventTouch,  Input, input, IPhysics2DContact, Label, Node,  Quat, RigidBody2D, UITransform, v2, v3,  Vec3, view, View } from 'cc';
const { ccclass, property } = _decorator;



let totalGoals = 0;
@ccclass('trying')
export class trying extends Component {

    // attach this script to Canvas node which you want to shoot
    
    @property(Node)
    // add a ball sprite as a node in your scene
    public ball: Node = null;
    
    @property(Node)
    //add a goal kepper sprite in your scene
    public player:Node = null;


    public speed = 30; // the speed of the ball
    //also add boundary to your game so that the ball don't fly away outside the scene
    
    @property(Node)
    public score:Node = null;

    
    @property(Node)
    public PopBg:Node = null;

    @property(Node)
    public PopScore:Node = null;

    @property(Node)
    public playBtn:Node = null;





    start() {
        input.on(Input.EventType.MOUSE_DOWN,this.getangle, this );
        input.on(Input.EventType.TOUCH_END , this.getTouchAngle, this)
        
        this.ball.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.onColide, this )
        
        this.playBtn.on(Button.EventType.CLICK, this.restart, this)
    }



//set logic for goal and not goal
    onColide(selfColider: Collider2D, otherColider: Collider2D, contant: IPhysics2DContact | null){
       if(otherColider.node.name == 'top'){
            this.ball.getComponent(RigidBody2D).enabledContactListener = false;
            this.updateScore()
       }else if(otherColider.node.name == 'player'){
        this.ball.getComponent(RigidBody2D).sleep()
        this.PopBg.active = true;
        this.PopScore.getComponent(Label).string = totalGoals.toString()
        this.PopBg.getComponent(Animation).play()
       }
    }



    
    
    updateScore(){
        totalGoals = totalGoals + 1;
        this.score.getComponent(Label).string = totalGoals.toString();
        this.score.getComponent(Animation).play()
        setTimeout(this.resetBall, 500)
        
    }






    public angle;
    public mousePos: Vec3=  null;
    public angleToradian;
    public canReset: boolean = false;

    
//get the angle of mouse click position
    getangle(event: EventMouse){
        
        this.mousePos = this.ball.getComponent(UITransform).convertToNodeSpaceAR(v3(event.getUILocationX(), event.getUILocationY(),0))
        this.angle = (360+Math.round(180*Math.atan2(this.mousePos.y, this.mousePos.x)/Math.PI))%360;
        this.shoot()
    }



//get the angle of touch position
    getTouchAngle(event: EventTouch){
        this.mousePos = this.ball.getComponent(UITransform).convertToNodeSpaceAR(v3(event.getUILocation().x, event.getUILocation().y,0))
        this.angle = (360+Math.round(180*Math.atan2(this.mousePos.y, this.mousePos.x)/Math.PI))%360;
        this.shoot()
    }


// shoot the ball according to click
    shoot(){
        let radian = this.angle * Math.PI / 180;
        // Calculate the horizontal and vertical components of the velocity
        let vx = this.speed * Math.cos(radian);
        let vy = this.speed * Math.sin(radian);
        // Apply an impulse force to the rigidbody of the ball
        this.ball.getComponent(RigidBody2D).linearVelocity = v2(vx,vy);
        this.canReset = true;

        setTimeout(() => {
            this.resetBall();
        },3000);
    }




// Reset the ball to its position and set rotation to 0
resetBall(){
    if( this.canReset){
        this.ball.getComponent(RigidBody2D).enabledContactListener = true;
        this.ball.setRotation(new Quat(0,0,0,0))
        this.ball.setPosition(0,-250)
        this.ball.getComponent(RigidBody2D).sleep(); 
        this.canReset = false;
    }
      
}

restart(){
    this.ball.setRotation(new Quat(0,0,0,0))
    this.ball.setPosition(0,-250)
    this.ball.getComponent(RigidBody2D).sleep(); 
    this.canReset = false;
    this.score.getComponent(Label).string = '00';
    totalGoals = 0;
    this.PopBg.active = false;
}


}

