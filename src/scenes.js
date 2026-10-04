/* PDI CarVision 3D scenes (three.js r128). Each scene function takes a <canvas>
   and returns a cleanup function, so React components can call it from useEffect. */
import * as THREE from 'three';
import bmwUrl from './assets/bmw-m3.png';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
/* The Services section writes the target rotation here; the services scene eases towards it. */
export const svcTarget = { angle: 0.55 };

var BODY=new THREE.MeshStandardMaterial({color:0x1d5fe0,metalness:.3,roughness:.32});
var GLASS=new THREE.MeshStandardMaterial({color:0x0a1626,metalness:.2,roughness:.1,transparent:true,opacity:.85});
function prep(m){
  m.traverse(function(o){if(o.isMesh&&o.material){var n=o.material.name;if(n==='Body_Color')o.material=BODY;else if(n==='Glass_Gray'||n==='Projector_Glass')o.material=GLASS;else if(o.material.metalness>.5)o.material.metalness=.5}});
  m.updateMatrixWorld(true);
  var b=new THREE.Box3().setFromObject(m),c=b.getCenter(new THREE.Vector3()),z=b.getSize(new THREE.Vector3()),lp=c.clone();
  m.traverse(function(o){if(o.name==='lights')o.getWorldPosition(lp)});
  m.position.set(-c.x,-b.min.y,-c.z);
  var P=new THREE.Group();P.add(m);P.rotation.y=-Math.atan2(lp.x-c.x,lp.z-c.z);P.scale.setScalar(4.9/Math.max(z.x,z.z));return P}
function shTex(){var c=document.createElement('canvas');c.width=c.height=128;var g=c.getContext('2d'),r=g.createRadialGradient(64,64,4,64,64,64);r.addColorStop(0,'rgba(10,25,60,.55)');r.addColorStop(1,'rgba(10,25,60,0)');g.fillStyle=r;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)}

var carP;
function loadCar(){
  if(!carP)carP=fetch(import.meta.env.BASE_URL+'car.glb').then(function(r){return r.arrayBuffer()}).then(function(ab){
    return new Promise(function(ok,no){new GLTFLoader().parse(ab,'',function(g){ok(prep(g.scene))},no)})}).catch(function(e){carP=null;throw e});
  return carP}
function mk(cv,o){var stops=[],dead=false;try{
  var R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=THREE.sRGBEncoding;
  var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(o.fov,1,.1,80),W=new THREE.Group();S.add(W);
  S.add(new THREE.HemisphereLight(0xffffff,0x59626f,.85));[[0xffffff,1.1,3,6,4],[0xb9d3ff,.55,-5,3,-2],[0xffffff,.5,0,4,-6]].forEach(function(l){var d=new THREE.DirectionalLight(l[0],l[1]);d.position.set(l[2],l[3],l[4]);S.add(d)});
  var sh=new THREE.Mesh(new THREE.PlaneGeometry(7.5,4.2),new THREE.MeshBasicMaterial({map:shTex(),transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.y=.02;S.add(sh);
  if(o.setup)o.setup(S);
  var plane;
  if(o.photo){   /* flat BMW photo instead of the 3D Ferrari */
    var tex=new THREE.TextureLoader().load(bmwUrl);tex.encoding=THREE.sRGBEncoding;tex.anisotropy=R.capabilities.getMaxAnisotropy();
    var ph=3.8*1024/1536;
    plane=new THREE.Mesh(new THREE.PlaneGeometry(3.8,ph),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthWrite:false}));
    plane.position.y=ph/2-.05;S.add(plane);
  }else loadCar().then(function(P){if(!dead)W.add(P.clone(true))}).catch(function(){});
  function size(){var w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();o.cam(C,w/h)}
  addEventListener('resize',size);size();
  var vis=true,io=new IntersectionObserver(function(e){vis=e[0].isIntersecting});io.observe(cv);
  var raf;(function loop(now){raf=requestAnimationFrame(loop);if(!vis)return;o.tick(now/1000,W,now);if(plane)plane.rotation.y=Math.sin(W.rotation.y)*.45;R.render(S,C)})(0);
  stops.push(function(){cancelAnimationFrame(raf);removeEventListener('resize',size);io.disconnect();R.dispose()});
}catch(e){}
return function(){dead=true;stops.forEach(function(f){f()})}}

/* Hero: car turns slowly and follows the pointer */
export function heroScene(cv){
  var mx=0;function mv(e){mx=e.clientX/innerWidth-.5}addEventListener('pointermove',mv);
  var stop=mk(cv,{fov:34,cam:function(C,a){var D=Math.max(9,9.6/a);C.position.set(.75*D*.72,.3*D*.72,D*.72);C.lookAt(0,.6,0)},
    tick:function(t,W){W.rotation.y=reduce?.6:t*.35+mx*.5}});
  return function(){removeEventListener('pointermove',mv);stop()}}

/* Services: car turns to face the highlighted service */
export function serviceScene(cv){
  var ry=0;
  return mk(cv,{fov:30,photo:true,cam:function(C,a){var D=Math.max(8.5,9.6/a);C.position.set(0,D*.2,D);C.lookAt(0,.7,0)},
    tick:function(t,W){ry+=(svcTarget.angle-ry)*.05;W.rotation.y=ry+Math.sin(t*.6)*.05}})}

/* OBD scanner beside a car turning 360 degrees */
export function scanScene(cv){
  var tick_ld=0;
var OB,led,sc,pl=[],cur,draw;
function rr(w,h,r){var s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s}
return mk(cv,{fov:40,photo:true,cam:function(C,a){C.position.set(0,3,Math.max(10.5,11.5/a));C.lookAt(0,1,0)},
  setup:function(S){
    var tt=new THREE.Mesh(new THREE.CylinderGeometry(3.4,3.4,.1,64),new THREE.MeshStandardMaterial({color:0xdfe8f5,roughness:.4,metalness:.2}));tt.position.y=-.05;S.add(tt);
    var rg=new THREE.Mesh(new THREE.TorusGeometry(3.4,.035,8,90),new THREE.MeshBasicMaterial({color:0x7cc8ff}));rg.rotation.x=Math.PI/2;S.add(rg);
    sc=new THREE.Mesh(new THREE.TorusGeometry(2.9,.025,8,90),new THREE.MeshBasicMaterial({color:0x0a9fd0,transparent:true,opacity:.9}));sc.rotation.x=Math.PI/2;S.add(sc);
    OB=new THREE.Group();var bd=new THREE.ExtrudeGeometry(rr(1.1,1.8,.16),{depth:.22,bevelEnabled:true,bevelSize:.03,bevelThickness:.03,bevelSegments:2});bd.translate(0,0,-.11);
    OB.add(new THREE.Mesh(bd,new THREE.MeshStandardMaterial({color:0x1b2434,metalness:.6,roughness:.35})));
    var bz=new THREE.Mesh(new THREE.PlaneGeometry(.9,1.16),new THREE.MeshBasicMaterial({color:0}));bz.position.z=.146;OB.add(bz);
    var cn=document.createElement('canvas');cn.width=256;cn.height=333;var sx=cn.getContext('2d'),tex=new THREE.CanvasTexture(cn);
    var scr=new THREE.Mesh(new THREE.PlaneGeometry(.82,1.066),new THREE.MeshBasicMaterial({map:tex}));scr.position.z=.15;OB.add(scr);
    [[-.3,0x7cc8ff],[0,0x33d6ff],[.3,0x7cc8ff]].forEach(function(b){var m=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.05,16),new THREE.MeshBasicMaterial({color:b[1]}));m.rotation.x=Math.PI/2;m.position.set(b[0],-.72,.14);OB.add(m)});
    led=new THREE.Mesh(new THREE.SphereGeometry(.04,10,10),new THREE.MeshBasicMaterial({color:0x4fe0a6}));led.position.set(0,.83,.14);OB.add(led);
    OB.position.set(-3.4,1.5,1.7);OB.rotation.y=.45;OB.scale.setScalar(1.25);S.add(OB);
    cur=new THREE.CatmullRomCurve3([new THREE.Vector3(-2.6,1.5,1.9),new THREE.Vector3(-1.7,2.8,1.3),new THREE.Vector3(-.7,2,.5),new THREE.Vector3(0,1,0)]);
    S.add(new THREE.Mesh(new THREE.TubeGeometry(cur,60,.014,6),new THREE.MeshBasicMaterial({color:0x0a9fd0,transparent:true,opacity:.6})));
    for(var i=0;i<5;i++){var m=new THREE.Mesh(new THREE.SphereGeometry(.08,10,10),new THREE.MeshBasicMaterial({color:0x2fc4f0}));S.add(m);pl.push(m)}
    draw=function(p,t){var g=sx;g.fillStyle='#04121f';g.fillRect(0,0,256,333);g.fillStyle='#0b3a5c';g.fillRect(0,0,256,34);
      g.fillStyle='#33d6ff';g.font='bold 17px monospace';g.fillText('CARVISION OBD-II',12,23);
      var rows=['ENGINE ECU','TRANSMISSION','ABS / ESP','AIRBAGS','BATTERY','EMISSIONS'];
      rows.forEach(function(r,i){var y=66+i*36,n=rows.length+1,dn=p>(i+1)/n;g.fillStyle='#9fb4d0';g.font='15px monospace';g.fillText(r,12,y);
        g.fillStyle=dn?'#4fe0a6':'#7cc8ff';g.fillText(dn?'OK':(p>i/n?['.','..','...'][Math.floor(t*4)%3]:'--'),206,y);g.fillStyle='#12304a';g.fillRect(12,y+8,232,1)});
      g.fillStyle='#12304a';g.fillRect(12,290,232,10);g.fillStyle='#33d6ff';g.fillRect(12,290,232*p,10);
      g.fillStyle=p>.95?'#4fe0a6':'#9fb4d0';g.font='bold 15px monospace';g.fillText(p>.95?'0 FAULT CODES':'SCANNING '+Math.floor(p*100)+'%',12,324);tex.needsUpdate=true}},
  tick:function(t,W,now){W.rotation.y=reduce?.7:t*.5;sc.position.y=reduce?.9:1+Math.sin(t*1.3)*.85;
    OB.position.y=1.5+(reduce?0:Math.sin(t*1.6)*.1);led.visible=Math.floor(t*3)%2===0;
    pl.forEach(function(m,i){m.position.copy(cur.getPoint((t*.35+i/5)%1))});
    if(now-(tick_ld||0)>90){tick_ld=now;draw(reduce?1:Math.min(1,(t%10)/8),t)}}});
}
