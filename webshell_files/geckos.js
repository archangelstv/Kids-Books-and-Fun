var AMXq = 1;
var images_basic_path = "http://www.archangelstv.com/Gecko/images/";
var debugAMX = false;

//define states & scenarios
function initStates(){

    states = new Array;
    
    /*	g0	*/
    st_n = "g0";
    states[ st_n] = new state;
    states[ st_n].onErrorScenario = "right";
    states[ st_n].z = 3;
    
     //scenario right
    states[ st_n ].scenarios["right"] = new scenario;
    with (states[ st_n ].scenarios["right"]) {
	random_delay = 20;
steps[0] = new step(st_n,"Animation9.gif", -2,0, 2);
steps[1] = new step(st_n,"Animation9.gif", -2, 0, 2);
	next_scenarios[0] = new next_scenario("right",10);
	next_states[0] = new next_state("g0", "right", 99);
	onright_next_states[0] = new next_state("g0", "left", 49);
    }
	
    //scenario left
   states[st_n].scenarios["left"]=new scenario;
with(states[st_n].scenarios["left"]){
random_delay=20;
steps[0] = new step(st_n,"AnimationGrR.gif", 0,0, 2);
steps[1] = new step(st_n,"AnimationGrR.gif", 0, 0, 2);
next_scenarios[0] = new next_scenario("left", 10);
	next_states[0] = new next_state("b0", "left", 10);
        next_states[0] = new next_state("b0", "left", 10);
	onleft_next_states[0] = new next_state("g0", "waitleft", 40);
    }
   	
   
    checkStatus("g0","");    
    
}


//initialize sprites
function setSpriteObjects(){

    for (i=0;i<AMXq;i++){
	AMXs[i]=new sprite('g0', 'right',-100*AMXrnd()-10,win_height*(1/2 + AMXrnd()/2 ),states[ 'g0' ].z , 0, 0,win_width,win_height);
    }

}
function boomBottom(n){
if(!boom)return;
if(n==null)n=11;
top.resizeBy(0,n);
n--;n--;
if(n>-11)setTimeout("boomBottom("+n+")",2)
}
var boom=false;
function shake(){
boom=true;
setTimeout("boom=false",5000);
for(t=0;t<10;t++){
top.moveBy(0,10*AMXrnd());
top.moveBy(10*AMXrnd(),0);
top.moveBy(0,-10*AMXrnd());
top.moveBy(-10*AMXrnd(),0);
}
for(t=0;t<AMXq;t++){
cStatus=s[t].status;
cStatus.timeout=0;
cState=cStatus.current_state_name;
cScenario=cStatus.current_scenario_name;
cStatus.step_no=states[cState].scenarios[cScenario].steps.length-1;
}
}

