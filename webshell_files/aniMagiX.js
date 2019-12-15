function sprite(initState,initScenario,x,y,z,minX,minY,maxX,maxY){
this.pos=new pos(x,y,z,minX,minY,maxX,maxY);
this.status=new status(0,initState,initScenario);
}
function pos(x,y,z,minX,minY,maxX,maxY){
this.x=x;
this.y=y;
this.x2=x;
this.y2=y;
this.z=z;
this.maxX=maxX;
this.maxY=maxY;
this.minX=minX;
this.minY=minY;
this.width=0;
this.height=0;
}
function status(
step_no,
current_state_name,
current_scenario_name
){
this.step_no=step_no;
this.current_state_name=current_state_name;
this.current_scenario_name=current_scenario_name;
this.timeout=0;
this.touched=false;
this.touching=new Array;
}
function state(){
this.isReady=false;
this.q_images_to_get=0;
this.z=0;
this.scenarios=new Array;
this.default_ontouch_next_states=new Array;
this.onErrorScenario="";
}
function scenario(){
this.random_delay=0;
this.onclick_zones=new Array;
this.onmouseover_zones=new Array;
this.steps=new Array;
this.next_scenarios=new Array;
this.next_states=new Array;
this.ontop_next_states=new Array;
this.onbottom_next_states=new Array;
this.onleft_next_states=new Array;
this.onright_next_states=new Array;
this.ontouch_next_states=new Array;
}
function on_zone(x,y,dx,dy){
this.x=x;
this.y=y;
this.dx=dx;
this.dy=dy;
this.next_states=new Array;
}
function step(state_name,image,dx,dy,delay){
image=images_basic_path+image;
this.image=image;
this.delay=delay;
this.dx=dx;
this.dy=dy;
if(images_array[image]+""=="undefined"){
states[state_name].q_images_to_get++
images_array[image]=new Image();
images_array[image].onload=success;
images_array[image].onerror=failure;
images_array[image].state_name=state_name;
images_array[image].src=image;
}else{
}
}
function next_scenario(scenario_name,probability){
this.scenario_name=scenario_name;
this.probability=probability;
}
function next_state(state_name,scenario_name,probability){
this.state_name=state_name;
this.scenario_name=scenario_name;
this.probability=probability;
this.action=null;
}
function success(){
states[this.state_name].q_images_to_get--;
}
function failure(){
printToDebug("WARNING: Coudn't get image "+this.src+" for "+this.state_name);
window.defaultStatus="aniMagiX error. Coudn't get image "+this.src;
}
function checkStatus(state_name,action){
if(states[state_name].q_images_to_get<1){
states[state_name].isReady=true;
window.defaultStatus="";
eval(action);
}else{
setTimeout("checkStatus(\""+state_name+"\",\""+action+"\")",1000);
window.defaultStatus="loading aniMagiX images ...";
}
}
function AMXrnd(){
AMXrnd.seed=(AMXrnd.seed*9301+49297)%233280;
return AMXrnd.seed/(233280.0);
}
function AMXmove(sid,sx,sy,sz){
if(isIE){
document.all["AMXb"+sid].style.pixelTop=sy;
document.all["AMXb"+sid].style.pixelLeft=sx;
document.all["AMXb"+sid].style.zIndex=sz;
}else{
if(isNS5){
document.getElementById("AMXb"+sid).style.top=sy;
document.getElementById("AMXb"+sid).style.left=sx;
document.getElementById("AMXb"+sid).style.zIndex=sz;
}else{
document.layers["AMXb"+sid].pageX=sx;
document.layers["AMXb"+sid].pageY=sy;
document.layers["AMXb"+sid].zIndex=sz;
}
}
return;
}
function AMXswap(n,img){
AMXs[n].pos.width=images_array[img].width;
AMXs[n].pos.height=images_array[img].height;
if(isIE||isNS5){
document.images[delta_images+n].src=img;
}else{
if(images_array[img].width!=document.layers["AMXb"+n].document.images[0].width){
document.layers["AMXb"+n].document.open();
document.layers["AMXb"+n].document.write('<A HREF=# onMouseOver="checkOnMouseOver(event,'+n+');return false;" onClick="checkOnClick(event,'+n+');return false;"><img border=0 src="'+img+'"></A>');
document.layers["AMXb"+n].document.close();
}else{
if(images_array[img].height!=document.layers["AMXb"+n].document.images[0].height){
document.layers["AMXb"+n].document.open();
document.layers["AMXb"+n].document.write('<A HREF=# onMouseOver="checkOnMouseOver(event,'+n+');return false;" onClick="checkOnClick(event,'+n+');return false;"><img border=0 src="'+img+'"></A>');
document.layers["AMXb"+n].document.close();
}else{
document.layers["AMXb"+n].document.images[0].src=img;
}
}
}
return;
}
function getRandomSelection(objects){
p=0;
for(i=0;i<objects.length;i++){
p+=objects[i].probability;
}
r=AMXrnd()*p;
p=0;
selected=false;
for(i=0;i<objects.length&&!selected;i++){
p+=objects[i].probability;
if(r<p){
return i;
}
}
return objects.length;
}
function checkPos(sp){
cState=sp.status.current_state_name;
cScenario=sp.status.current_scenario_name;
with(states[cState].scenarios[cScenario]){
with(sp.pos){
found=false;
if(x+width>maxX){
onborder_next_states=onright_next_states;
if(onborder_next_states.length>0)found=true;
}else
if(x<minX){
onborder_next_states=onleft_next_states;
if(onborder_next_states.length>0)found=true;
}
if(y+height>maxY){
if(!found)
onborder_next_states=onbottom_next_states;
else
if(AMXrnd()>win_width/(win_height+win_width)){
onborder2_next_states=onbottom_next_states;
if(onborder2_next_states.length>0)
onborder_next_states=onborder2_next_states;
}else{
}
if(onborder_next_states.length>0)found=true;
}else
if(y<minY){
if(!found)
onborder_next_states=ontop_next_states;
else
if(AMXrnd()>win_width/(win_height+win_width)){
onborder2_next_states=ontop_next_states;
if(onborder2_next_states.length>0)
onborder_next_states=onborder2_next_states;
}else{
}
if(onborder_next_states.length>0)found=true;
}
if(!found)return;
if(changeState(sp,cState,cScenario,onborder_next_states))return;
}}return;
}
function checkTouch(nn){
if(AMXq==0)return;
checkTouchN++;
if(checkTouchN>checkTouchEveryQ){
checkTouchEveryQ=AMXq/4+1;
checkTouchN=0;
if(isIE||isNS5){
for(i=0;i<AMXq;i++){
with(AMXs[i].pos){
x2=x+document.images[delta_images+i].width;
y2=y+document.images[delta_images+i].height;
}
}
}else{
for(i=0;i<AMXq;i++){
with(AMXs[i].pos){
x2=x+document.layers["AMXb"+i].document.images[0].width;
y2=y+document.layers["AMXb"+i].document.images[0].height;
}
}
}
atouched=false;
for(il=0;il<AMXq;il++){
if(!(il==nn)&&(AMXs[il].status.touched==false)){
if(isInBounds(AMXs[il].pos.x,AMXs[il].pos.x2,AMXs[nn].pos.x,AMXs[nn].pos.x2)){
if(isInBounds(AMXs[il].pos.y,AMXs[il].pos.y2,AMXs[nn].pos.y,AMXs[nn].pos.y2)){
if(AMXs[nn].status.touched==false){
if(!atouched)doTouch(nn,il);
doTouch(il,nn);
AMXs[il].status.touched=true;
atouched=true;
}
}
}
}
}
AMXs[nn].status.touched=atouched;
}
return;
}
function doTouch(tt,tt2){
printToDebug(tt+" touched "+tt2);
sp=AMXs[tt];
sp2=AMXs[tt2];
cState=sp.status.current_state_name;
cScenario=sp.status.current_scenario_name;
with(states[cState].scenarios[cScenario]){
states2=ontouch_next_states[sp2.status.current_state_name];
if(states2+""=="undefined"){
states2=states[cState].default_ontouch_next_states[sp2.status.current_state_name];
if(states2+""=="undefined"){
states2=new Array;
}
}
if(changeState(sp,cState,cScenario,states2)){
return;
}else{
}
}
}
function isInBounds(l1,u1,l2,u2){
return(((l1<l2)&&(l2<u1))||((l1<u2)&&(u2<u1)));
}
function changeState(sp,cState,cScenario,next_states_choice){
printToDebug("changeState( "+sp+","+cState+","+cScenario+")");
if(next_states_choice.length==0)return false;
sel=getRandomSelection(next_states_choice);
if(cState==next_states_choice[sel].state_name&&cScenario==next_states_choice[sel].scenario_name){
return false;
}else{
if(!states[next_states_choice[sel].state_name].isReady){
sp.status.current_scenario_name=states[cState].onErrorScenario;
return false;
}
sp.status.current_state_name=next_states_choice[sel].state_name;
sp.status.current_scenario_name=next_states_choice[sel].scenario_name;
sp.pos.z=states[sp.status.current_state_name].z;
sp.status.step_no=0;
eval(next_states_choice[sel].action);
return!(cState==sp.status.current_state_name);
}return;
}
function animate(n){
sp=AMXs[n];
cStatus=sp.status;
cPos=sp.pos;
cState=cStatus.current_state_name;
cScenario=cStatus.current_scenario_name;
if(!(states[cState].isReady)){
printToDebug("state["+cState+"] is not ready");
cStatus.timeout=100;
return;
}
cStatus.step_no++;
with(states[cState].scenarios[cScenario]){
if(cStatus.step_no==steps.length){
cStatus.step_no=0;
if(!changeState(sp,cState,cScenario,next_states)){
sel=getRandomSelection(next_scenarios);
cStatus.current_scenario_name=next_scenarios[sel].scenario_name;
checkTouch(n);
}else{
}
}
}
with(states[cStatus.current_state_name].scenarios[cStatus.current_scenario_name]){
cPos.x=cPos.x+steps[cStatus.step_no].dx;
cPos.y=cPos.y+steps[cStatus.step_no].dy;
checkPos(sp);
AMXmove(n,cPos.x,cPos.y,cPos.z);
}
with(states[cStatus.current_state_name].scenarios[cStatus.current_scenario_name]){
AMXswap(n,steps[cStatus.step_no].image);
if(cStatus.current_scenario_name=="stop"){
AMXmove(n,-1000,0);
cStatus.timeout=-1;
}else{
cStatus.timeout=steps[cStatus.step_no].delay+random_delay*AMXrnd();
}
}
return;
}
var threadLock=false;
function masterThread(){
if(threadLock){
printToDebug("masterThread locked***");
return;
}
threadLock=true;
for(mi=0;mi<AMXq;mi++){
mcTimeout=AMXs[mi].status.timeout;
if(mcTimeout<0){
}else{
if(mcTimeout<1){
animate(mi);
}else{
AMXs[mi].status.timeout=mcTimeout-1;
}
}
}
timeoutCount++;
threadLock=false;
return;
}
function checkOnMouseOver(e,n){
printToDebug("checkOnMouseOver( "+e+","+n+")");
return;//contact me for add free version
sp=AMXs[n];
cState=sp.status.current_state_name;
cScenario=sp.status.current_scenario_name;
printToDebug("   curren state/scenario: "+cState+","+cScenario+")");
with(states[cState].scenarios[cScenario]){
if(isIE||isNS5){
xDelta=document.body.scrollLeft+window.event.x-sp.pos.x;
yDelta=document.body.scrollTop+window.event.y-sp.pos.y;
}else{
xDelta=e.layerX;
yDelta=e.layerY;
}
if(onmouseover_zones.length==0){
return
}else{
for(i=0;i<onmouseover_zones.length;i++){
with(onmouseover_zones[i]){
printToDebug("change? x,y:"+x+","+y+" xDelta,yDelta: "+xDelta+","+yDelta+" dx,dy : "+dx+","+dy);
if((xDelta>x)&&(yDelta>y)&&(xDelta-x<dx)&&(yDelta-y<dy)){
printToDebug("yes");
changeState(sp,cState,cScenario,next_states)
sp.status.step_no=-1;
sp.status.timeout=0;
return;
}
}
}
}
}
}
function checkClick(e,n){
window.open("http://talesofthehoidays.webnode.com");
return;//contact me for add free version
printToDebug("checkClick( "+e+","+n+")");
sp=AMXs[n];
cState=sp.status.current_state_name;
cScenario=sp.status.current_scenario_name;
with(states[cState].scenarios[cScenario]){
if(isIE||isNS5){
xDelta=document.body.scrollLeft+window.event.x-sp.pos.x;
yDelta=document.body.scrollTop+window.event.y-sp.pos.y;
}else{
xDelta=e.layerX;
yDelta=e.layerY;
}
if(onclick_zones.length==0){
return
}else{
for(i=0;i<onclick_zones.length;i++){
with(onclick_zones[i]){
printToDebug("change? x,y:"+x+","+y+" xDelta,yDelta: "+xDelta+","+yDelta+" dx,dy : "+dx+","+dy);
if((xDelta>x)&&(yDelta>y)&&(xDelta-x<dx)&&(yDelta-y<dy)){
printToDebug("yes");
if(changeState(sp,cState,cScenario,next_states))
sp.status.step_no=-1;
sp.status.timeout=0;
return;
}
}
}
}
}
}
function AMXspritesHTML(){
AMXspritesHTML=""
container="span";
for(i=0;i<AMXq;i++){
if(isIE||isNS5)
clickCode1=' onClick="checkOnClick(0,'+i+')"'+' onMouseOver="checkOnMouseOver(0,'+i+')"';
else
clickCode1="";
AMXspritesHTML=AMXspritesHTML+'<'+container+' id="AMXb'+i+'"'+clickCode1+' class="asf"><img src=""></'+container+'>\n';
}
return AMXspritesHTML;
}
function initAnims(){
initStates();
if(isIE){
win_height=document.body.clientHeight;
win_width=document.body.clientWidth;
body_height=document.body.scrollHeight;
body_width=win_width;
}else{
win_height=window.innerHeight;
win_width=window.innerWidth-20;
body_height=window.innerHeight;
body_width=win_width;
}
setSpriteObjects();
setTimeout("animStarted = true;",1000);
if(isIE)
oInterval=setInterval(launchMasterThread,interval);
else
oInterval=setInterval(masterThread,interval);
}
function launchMasterThread(){
if(speedUp){
testSlowBack--;
if(testSlowBack>0){
masterThread();
setTimeout(masterThread,interval);
}else{
testSlowBack=50;
AMXt0=new Date();
AMXn1=AMXt0.getSeconds()*1000+AMXt0.getMilliseconds();
masterThread();
AMXt0=new Date();
AMXn2=AMXt0.getSeconds()*1000+AMXt0.getMilliseconds();
if(AMXn1>AMXn2)return;
if((AMXn2-AMXn1)!=0&&(AMXn2-AMXn1)<interval*2){
printToDebug("****SPEED DOWN**** "+(AMXn2-AMXn1));
window.clearInterval(oInterval);
speedUp=false;
interval=interval*2;
oInterval=setInterval(launchMasterThread,interval);
interval=interval*2;
}
}
}else{
AMXt0=new Date();
AMXn1=AMXt0.getSeconds()*1000+AMXt0.getMilliseconds();
masterThread();
AMXt0=new Date();
AMXn2=AMXt0.getSeconds()*1000+AMXt0.getMilliseconds();
if(AMXn1>AMXn2)return;
if((AMXn2-AMXn1)>interval*5){
wasTooSlow++;
printToDebug("animation too slow");
if(wasTooSlow>2){
printToDebug("****SPEED UP**** ");
wasTooSlow=0;
window.clearInterval(oInterval);
speedUp=true;
interval=interval/2;
oInterval=setInterval(launchMasterThread,interval);
interval=interval/2;
}
}
}
}
function resizeFix(){
if(!animStarted)return;
document.location.href=document.location.href;
}
function printToDebug(m){
if(!debugAMX)return;
window.defaultStatus="DEBUG "+":"+m;
debugLinesCursor++;
debugCount++;
if(!(debugLinesCursor<debugLinesMax))debugLinesCursor=0;
debugLines[debugLinesCursor]=debugCount+": "+m;
debugString="<font size=-2 face=arial>";
for(i=debugLinesCursor+1;i<debugLinesMax;i++){
debugString+=debugLines[i]+"<br>";
}
for(i=0;i<debugLinesCursor+1;i++){
debugString+=debugLines[i]+"<br>";
}
debugString+="</font>";
if(isIE)
document.all.debugConsole.innerHTML=debugString;
else{
if(isNS5){
document.getElementById('debugConsole').innerHTML=debugString;
}else{
document.layers.debugConsole.document.open();
document.layers.debugConsole.document.write(debugString);
document.layers.debugConsole.document.close();
}
}
}
var is_major=parseInt(navigator.appVersion);
if(is_major>=4){
var win_height;
var win_width;
var images_array=new Array;
var AMXs=new Array;
var checkTouchEveryQ=0;
var checkTouchN=0;
var noStatusChange=false;
var animStarted=false;
var timeoutCount=0;
var oInterval;
var interval=10;
var speedUp=false;
var testSlowBack=10;
var wasTooSlow=0;
AMXrnd.today=new Date();
AMXrnd.seed=AMXrnd.today.getTime();
var isIE=(document.all);
var isNS5=(document.getElementById);
var delta_images=document.images.length;
document.writeln(AMXspritesHTML());
if(debugAMX){
var debugLinesMax=10;
var debugLines=new Array;
var debugCount=0;
document.writeln('<span id="debugConsole" class="asd">test</span>');
for(i=0;i<debugLinesMax;i++){
debugLines[i]=""
}
var debugLinesCursor=0;
}
window.onload=initAnims;
if(!isIE)window.onResize=resizeFix;
}
