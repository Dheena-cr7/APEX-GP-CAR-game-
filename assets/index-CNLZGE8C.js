(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,ee=1029,O=1030,k=1031,te=1033,A=33776,ne=33777,j=33778,re=33779,M=35840,ie=35841,N=35842,ae=35843,oe=36196,se=37492,ce=37496,le=37488,P=37489,ue=37490,de=37491,fe=37808,pe=37809,me=37810,he=37811,ge=37812,_e=37813,ve=37814,ye=37815,be=37816,xe=37817,Se=37818,Ce=37819,we=37820,Te=37821,Ee=36492,De=36494,Oe=36495,ke=36283,Ae=36284,je=36285,Me=36286,Ne=2300,F=2301,Pe=2302,Fe=2303,Ie=2400,I=2401,Le=2402,L=3200,Re=`srgb`,R=`srgb-linear`,ze=`linear`,Be=`srgb`,Ve=7680,He=35044,Ue=35048,We=2e3;function Ge(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ke(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function qe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Je(){let e=qe(`canvas`);return e.style.display=`block`,e}var Ye={};function Xe(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ze(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=Ze(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=Ze(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Qe(...e){let t=e.join(` `);t in Ye||(Ye[t]=!0,z(...e))}function $e(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var et={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},tt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},nt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),rt=Math.PI/180,it=180/Math.PI;function at(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(nt[e&255]+nt[e>>8&255]+nt[e>>16&255]+nt[e>>24&255]+`-`+nt[t&255]+nt[t>>8&255]+`-`+nt[t>>16&15|64]+nt[t>>24&255]+`-`+nt[n&63|128]+nt[n>>8&255]+`-`+nt[n>>16&255]+nt[n>>24&255]+nt[r&255]+nt[r>>8&255]+nt[r>>16&255]+nt[r>>24&255]).toLowerCase()}function ot(e,t,n){return Math.max(t,Math.min(n,e))}function st(e,t){return(e%t+t)%t}function ct(e,t,n){return(1-n)*e+n*t}function lt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function ut(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var V=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},dt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ft.copy(this).projectOnVector(e),this.sub(ft)}reflect(e){return this.sub(ft.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ft=new H,pt=new dt,U=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Qe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(mt.makeScale(e,t)),this}rotate(e){return Qe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(mt.makeRotation(-e)),this}translate(e,t){return Qe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(mt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},mt=new U,ht=new U().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gt=new U().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _t(){let e={enabled:!0,workingColorSpace:R,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=yt(e.r),e.g=yt(e.g),e.b=yt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=bt(e.r),e.g=bt(e.g),e.b=bt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ze:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Qe(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Qe(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[R]:{primaries:t,whitePoint:r,transfer:ze,toXYZ:ht,fromXYZ:gt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:r,transfer:Be,toXYZ:ht,fromXYZ:gt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),e}var vt=_t();function yt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function bt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var xt,St=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xt===void 0&&(xt=qe(`canvas`)),xt.width=e.width,xt.height=e.height;let t=xt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=xt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=qe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=yt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(yt(t[e]/255)*255):t[e]=yt(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ct=0,wt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ct++}),this.uuid=at(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Tt(r[t].image)):e.push(Tt(r[t]))}else e=Tt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Tt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?St.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var Et=0,Dt=new H,Ot=class r extends tt{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Et++}),this.uuid=at(),this.name=``,this.source=new wt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new V(0,0),this.repeat=new V(1,1),this.center=new V(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new U,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Dt).x}get height(){return this.source.getSize(Dt).y}get depth(){return this.source.getSize(Dt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ot.DEFAULT_IMAGE=null,Ot.DEFAULT_MAPPING=300,Ot.DEFAULT_ANISOTROPY=1;var kt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},At=class extends tt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new kt(0,0,e,t),this.scissorTest=!1,this.viewport=new kt(0,0,e,t),this.textures=[];let r=new Ot({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new wt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},jt=class extends At{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Mt=class extends Ot{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Nt=class extends Ot{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Pt=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ft.setFromMatrixColumn(e,0).length(),i=1/Ft.setFromMatrixColumn(e,1).length(),a=1/Ft.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lt,e,Rt)}lookAt(e,t,n){let r=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),zt.crossVectors(n,Vt),zt.lengthSq()===0&&(Math.abs(n.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),zt.crossVectors(n,Vt)),zt.normalize(),Bt.crossVectors(Vt,zt),r[0]=zt.x,r[4]=Bt.x,r[8]=Vt.x,r[1]=zt.y,r[5]=Bt.y,r[9]=Vt.y,r[2]=zt.z,r[6]=Bt.z,r[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],ee=r[13],O=r[2],k=r[6],te=r[10],A=r[14],ne=r[3],j=r[7],re=r[11],M=r[15];return i[0]=a*x+o*T+s*O+c*ne,i[4]=a*S+o*E+s*k+c*j,i[8]=a*C+o*D+s*te+c*re,i[12]=a*w+o*ee+s*A+c*M,i[1]=l*x+u*T+d*O+f*ne,i[5]=l*S+u*E+d*k+f*j,i[9]=l*C+u*D+d*te+f*re,i[13]=l*w+u*ee+d*A+f*M,i[2]=p*x+m*T+h*O+g*ne,i[6]=p*S+m*E+h*k+g*j,i[10]=p*C+m*D+h*te+g*re,i[14]=p*w+m*ee+h*A+g*M,i[3]=_*x+v*T+y*O+b*ne,i[7]=_*S+v*E+y*k+b*j,i[11]=_*C+v*D+y*te+b*re,i[15]=_*w+v*ee+y*A+b*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,ee=d*g-f*h,O=_*ee-v*D+y*E+b*T-x*w+S*C;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/O;return e[0]=(o*ee-s*D+c*E)*k,e[1]=(r*D-n*ee-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*ee-c*w)*k,e[5]=(t*ee-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Ft.set(r[0],r[1],r[2]).length(),o=Ft.set(r[4],r[5],r[6]).length(),s=Ft.set(r[8],r[9],r[10]).length();i<0&&(a=-a),It.copy(this);let c=1/a,l=1/o,u=1/s;return It.elements[0]*=c,It.elements[1]*=c,It.elements[2]*=c,It.elements[4]*=l,It.elements[5]*=l,It.elements[6]*=l,It.elements[8]*=u,It.elements[9]*=u,It.elements[10]*=u,t.setFromRotationMatrix(It),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=We,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=We,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ft=new H,It=new Pt,Lt=new H(0,0,0),Rt=new H(1,1,1),zt=new H,Bt=new H,Vt=new H,Ht=new Pt,Ut=new dt,Wt=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-ot(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(ot(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(ot(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ht.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ht,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ut.setFromEuler(this),this.setFromQuaternion(Ut,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wt.DEFAULT_ORDER=`XYZ`;var Gt=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Kt=0,qt=new H,Jt=new dt,Yt=new Pt,Xt=new H,Zt=new H,Qt=new H,$t=new dt,en=new H(1,0,0),tn=new H(0,1,0),nn=new H(0,0,1),rn={type:`added`},an={type:`removed`},on={type:`childadded`,child:null},sn={type:`childremoved`,child:null},cn=class e extends tt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kt++}),this.uuid=at(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new Wt,r=new dt,i=new H(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pt},normalMatrix:{value:new U}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gt,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Jt.setFromAxisAngle(e,t),this.quaternion.multiply(Jt),this}rotateOnWorldAxis(e,t){return Jt.setFromAxisAngle(e,t),this.quaternion.premultiply(Jt),this}rotateX(e){return this.rotateOnAxis(en,e)}rotateY(e){return this.rotateOnAxis(tn,e)}rotateZ(e){return this.rotateOnAxis(nn,e)}translateOnAxis(e,t){return qt.copy(e).applyQuaternion(this.quaternion),this.position.add(qt.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(en,e)}translateY(e){return this.translateOnAxis(tn,e)}translateZ(e){return this.translateOnAxis(nn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xt.copy(e):Xt.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Zt.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yt.lookAt(Zt,Xt,this.up):Yt.lookAt(Xt,Zt,this.up),this.quaternion.setFromRotationMatrix(Yt),r&&(Yt.extractRotation(r.matrixWorld),Jt.setFromRotationMatrix(Yt),this.quaternion.premultiply(Jt.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rn),on.child=e,this.dispatchEvent(on),on.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(an),sn.child=e,this.dispatchEvent(sn),sn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rn),on.child=e,this.dispatchEvent(on),on.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zt,e,Qt),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zt,$t,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};cn.DEFAULT_UP=new H(0,1,0),cn.DEFAULT_MATRIX_AUTO_UPDATE=!0,cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ln=class extends cn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},un={type:`move`},dn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(un)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ln;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},fn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pn={h:0,s:0,l:0},mn={h:0,s:0,l:0};function hn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var W=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Re){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,vt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=vt.workingColorSpace){if(e=st(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=hn(i,r,e+1/3),this.g=hn(i,r,e),this.b=hn(i,r,e-1/3)}return vt.colorSpaceToWorking(this,r),this}setStyle(e,t=Re){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Re){let n=fn[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yt(e.r),this.g=yt(e.g),this.b=yt(e.b),this}copyLinearToSRGB(e){return this.r=bt(e.r),this.g=bt(e.g),this.b=bt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Re){return vt.workingToColorSpace(gn.copy(this),e),Math.round(ot(gn.r*255,0,255))*65536+Math.round(ot(gn.g*255,0,255))*256+Math.round(ot(gn.b*255,0,255))}getHexString(e=Re){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.workingToColorSpace(gn.copy(this),t);let n=gn.r,r=gn.g,i=gn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=vt.workingColorSpace){return vt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=Re){vt.workingToColorSpace(gn.copy(this),e);let t=gn.r,n=gn.g,r=gn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(pn),this.setHSL(pn.h+e,pn.s+t,pn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(pn),e.getHSL(mn);let n=ct(pn.h,mn.h,t),r=ct(pn.s,mn.s,t),i=ct(pn.l,mn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},gn=new W;W.NAMES=fn;var _n=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new W(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},vn=class extends cn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wt,this.environmentIntensity=1,this.environmentRotation=new Wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},yn=new H,bn=new H,xn=new H,Sn=new H,Cn=new H,wn=new H,Tn=new H,En=new H,Dn=new H,On=new H,kn=new kt,An=new kt,jn=new kt,Mn=class e{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),yn.subVectors(e,t),r.cross(yn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){yn.subVectors(r,t),bn.subVectors(n,t),xn.subVectors(e,t);let a=yn.dot(yn),o=yn.dot(bn),s=yn.dot(xn),c=bn.dot(bn),l=bn.dot(xn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Sn)!==null&&Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Sn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Sn.x),s.addScaledVector(a,Sn.y),s.addScaledVector(o,Sn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return kn.setScalar(0),An.setScalar(0),jn.setScalar(0),kn.fromBufferAttribute(e,t),An.fromBufferAttribute(e,n),jn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(kn,i.x),a.addScaledVector(An,i.y),a.addScaledVector(jn,i.z),a}static isFrontFacing(e,t,n,r){return yn.subVectors(n,t),bn.subVectors(e,t),yn.cross(bn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yn.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),yn.cross(bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Cn.subVectors(r,n),wn.subVectors(i,n),En.subVectors(e,n);let s=Cn.dot(En),c=wn.dot(En);if(s<=0&&c<=0)return t.copy(n);Dn.subVectors(e,r);let l=Cn.dot(Dn),u=wn.dot(Dn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Cn,a);On.subVectors(e,i);let f=Cn.dot(On),p=wn.dot(On);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(wn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Tn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Tn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Cn,a).addScaledVector(wn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Nn=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Fn):Fn.fromBufferAttribute(r,t),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),In.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),In.copy(e.boundingBox)),In.applyMatrix4(e.matrixWorld),this.union(In)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Un),Wn.subVectors(this.max,Un),Ln.subVectors(e.a,Un),Rn.subVectors(e.b,Un),zn.subVectors(e.c,Un),Bn.subVectors(Rn,Ln),Vn.subVectors(zn,Rn),Hn.subVectors(Ln,zn);let t=[0,-Bn.z,Bn.y,0,-Vn.z,Vn.y,0,-Hn.z,Hn.y,Bn.z,0,-Bn.x,Vn.z,0,-Vn.x,Hn.z,0,-Hn.x,-Bn.y,Bn.x,0,-Vn.y,Vn.x,0,-Hn.y,Hn.x,0];return!qn(t,Ln,Rn,zn,Wn)||(t=[1,0,0,0,1,0,0,0,1],!qn(t,Ln,Rn,zn,Wn))?!1:(Gn.crossVectors(Bn,Vn),t=[Gn.x,Gn.y,Gn.z],qn(t,Ln,Rn,zn,Wn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Pn=[new H,new H,new H,new H,new H,new H,new H,new H],Fn=new H,In=new Nn,Ln=new H,Rn=new H,zn=new H,Bn=new H,Vn=new H,Hn=new H,Un=new H,Wn=new H,Gn=new H,Kn=new H;function qn(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Kn.fromArray(e,a);let o=i.x*Math.abs(Kn.x)+i.y*Math.abs(Kn.y)+i.z*Math.abs(Kn.z),s=t.dot(Kn),c=n.dot(Kn),l=r.dot(Kn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Jn=new H,Yn=new V,Xn=0,Zn=class extends tt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xn++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=He,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Yn.fromBufferAttribute(this,t),Yn.applyMatrix3(e),this.setXY(t,Yn.x,Yn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jn.fromBufferAttribute(this,t),Jn.applyMatrix3(e),this.setXYZ(t,Jn.x,Jn.y,Jn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jn.fromBufferAttribute(this,t),Jn.applyMatrix4(e),this.setXYZ(t,Jn.x,Jn.y,Jn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jn.fromBufferAttribute(this,t),Jn.applyNormalMatrix(e),this.setXYZ(t,Jn.x,Jn.y,Jn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jn.fromBufferAttribute(this,t),Jn.transformDirection(e),this.setXYZ(t,Jn.x,Jn.y,Jn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=lt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=lt(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=lt(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=lt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=lt(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),r=ut(r,this.array),i=ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Qn=class extends Zn{constructor(e,t,n){super(new Uint16Array(e),t,n)}},$n=class extends Zn{constructor(e,t,n){super(new Uint32Array(e),t,n)}},er=class extends Zn{constructor(e,t,n){super(new Float32Array(e),t,n)}},tr=new Nn,nr=new H,rr=new H,ir=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?tr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);let t=nr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(nr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(rr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(rr)),this.expandByPoint(nr.copy(e.center).sub(rr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ar=0,or=new Pt,sr=new cn,cr=new H,lr=new Nn,ur=new Nn,dr=new H,fr=class e extends tt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ar++}),this.uuid=at(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ge(e)?$n:Qn)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new U().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return or.makeRotationFromQuaternion(e),this.applyMatrix4(or),this}rotateX(e){return or.makeRotationX(e),this.applyMatrix4(or),this}rotateY(e){return or.makeRotationY(e),this.applyMatrix4(or),this}rotateZ(e){return or.makeRotationZ(e),this.applyMatrix4(or),this}translate(e,t,n){return or.makeTranslation(e,t,n),this.applyMatrix4(or),this}scale(e,t,n){return or.makeScale(e,t,n),this.applyMatrix4(or),this}lookAt(e){return sr.lookAt(e),sr.updateMatrix(),this.applyMatrix4(sr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cr).negate(),this.translate(cr.x,cr.y,cr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new er(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];lr.setFromBufferAttribute(n),this.morphTargetsRelative?(dr.addVectors(this.boundingBox.min,lr.min),this.boundingBox.expandByPoint(dr),dr.addVectors(this.boundingBox.max,lr.max),this.boundingBox.expandByPoint(dr)):(this.boundingBox.expandByPoint(lr.min),this.boundingBox.expandByPoint(lr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ir);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new H,1/0);else if(e){let n=this.boundingSphere.center;if(lr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ur.setFromBufferAttribute(n),this.morphTargetsRelative?(dr.addVectors(lr.min,ur.min),lr.expandByPoint(dr),dr.addVectors(lr.max,ur.max),lr.expandByPoint(dr)):(lr.expandByPoint(ur.min),lr.expandByPoint(ur.max))}lr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)dr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(dr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)dr.fromBufferAttribute(a,t),o&&(cr.fromBufferAttribute(e,t),dr.add(cr)),r=Math.max(r,n.distanceToSquared(dr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Zn(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new H,s[e]=new H;let c=new H,l=new H,u=new H,d=new V,f=new V,p=new V,m=new H,h=new H;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new H,y=new H,b=new H,x=new H;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Zn(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new H,i=new H,a=new H,o=new H,s=new H,c=new H,l=new H,u=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dr.fromBufferAttribute(e,t),dr.normalize(),e.setXYZ(t,dr.x,dr.y,dr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Zn(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},pr=new H,mr=new H,hr=new U,gr=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=pr.subVectors(n,t).cross(mr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(pr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||hr.getNormalMatrix(e),r=this.coplanarPoint(pr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},_r=0,vr=class extends tt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_r++}),this.uuid=at(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ve,this.stencilZFail=Ve,this.stencilZPass=Ve,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?z(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new W().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new gr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new V().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new V().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},yr=new H,br=new H,xr=new H,Sr=new H,Cr=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=yr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yr.copy(this.origin).addScaledVector(this.direction,t),yr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){br.copy(e).add(t).multiplyScalar(.5),xr.copy(t).sub(e).normalize(),Sr.copy(this.origin).sub(br);let i=e.distanceTo(t)*.5,a=-this.direction.dot(xr),o=Sr.dot(this.direction),s=-Sr.dot(xr),c=Sr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(br).addScaledVector(xr,d),f}intersectSphere(e,t){if(e.radius<0)return null;yr.subVectors(e.center,this.origin);let n=yr.dot(this.direction),r=yr.dot(yr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,yr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,ee,O,k,te,A,ne;if(y>=b&&y>=x?(w=s,D=u,k=p,ne=g,s>=0?(S=c,C=l,T=d,E=f,ee=m,O=h,te=_,A=v):(S=l,C=c,T=f,E=d,ee=h,O=m,te=v,A=_)):b>=x?(w=c,D=d,k=m,ne=_,c>=0?(S=l,C=s,T=f,E=u,ee=h,O=p,te=v,A=g):(S=s,C=l,T=u,E=f,ee=p,O=h,te=g,A=v)):(w=l,D=f,k=h,ne=v,l>=0?(S=s,C=c,T=u,E=d,ee=p,O=m,te=g,A=_):(S=c,C=s,T=d,E=u,ee=m,O=p,te=_,A=g)),w===0)return null;let j=S/w,re=C/w,M=1/w,ie=T-j*D,N=E-re*D,ae=ee-j*k,oe=O-re*k,se=te-j*ne,ce=A-re*ne,le=se*oe-ce*ae,P=ie*ce-N*se,ue=ae*N-oe*ie;if(r){if(le<0||P<0||ue<0)return null}else if((le<0||P<0||ue<0)&&(le>0||P>0||ue>0))return null;let de=le+P+ue;if(de===0)return null;let fe=M*(le*D+P*k+ue*ne);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wr=class extends vr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Tr=new Pt,Er=new Cr,Dr=new ir,Or=new H,kr=new H,Ar=new H,jr=new H,Mr=new H,Nr=new H,Pr=new H,Fr=new H,G=class extends cn{constructor(e=new fr,t=new wr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Nr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Mr.fromBufferAttribute(s,e),a?Nr.addScaledVector(Mr,r):Nr.addScaledVector(Mr.sub(t),r))}t.add(Nr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(i),Er.copy(e.ray).recast(e.near),!(Dr.containsPoint(Er.origin)===!1&&(Er.intersectSphere(Dr,Or)===null||Er.origin.distanceToSquared(Or)>(e.far-e.near)**2))&&(Tr.copy(i).invert(),Er.copy(e.ray).applyMatrix4(Tr),(n.boundingBox===null||Er.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Er)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Lr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Lr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Lr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Lr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ir(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Fr.copy(s),Fr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Fr);return l<n.near||l>n.far?null:{distance:l,point:Fr.clone(),object:e}}function Lr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,kr),e.getVertexPosition(c,Ar),e.getVertexPosition(l,jr);let u=Ir(e,t,n,r,kr,Ar,jr,Pr);if(u){let e=new H;Mn.getBarycoord(Pr,kr,Ar,jr,e),i&&(u.uv=Mn.getInterpolatedAttribute(i,s,c,l,e,new V)),a&&(u.uv1=Mn.getInterpolatedAttribute(a,s,c,l,e,new V)),o&&(u.normal=Mn.getInterpolatedAttribute(o,s,c,l,e,new H),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new H,materialIndex:0};Mn.getNormal(kr,Ar,jr,t.normal),u.face=t,u.barycoord=e}return u}var Rr=class extends Ot{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},zr=class extends Zn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Br=new Pt,Vr=new Pt,Hr=[],Ur=new Nn,Wr=new Pt,Gr=new G,Kr=new ir,qr=class extends G{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new zr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Wr)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Br),Ur.copy(e.boundingBox).applyMatrix4(Br),this.boundingBox.union(Ur)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ir),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Br),Kr.copy(e.boundingSphere).applyMatrix4(Br),this.boundingSphere.union(Kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Gr.geometry=this.geometry,Gr.material=this.material,Gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Kr.copy(this.boundingSphere),Kr.applyMatrix4(n),e.ray.intersectsSphere(Kr)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Br),Vr.multiplyMatrices(n,Br),Gr.matrixWorld=Vr,Gr.raycast(e,Hr);for(let e=0,n=Hr.length;e<n;e++){let n=Hr[e];n.instanceId=i,n.object=this,t.push(n)}Hr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new zr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Rr(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Jr=new ir,Yr=new V(.5,.5),Xr=new H,Zr=class{constructor(e=new gr,t=new gr,n=new gr,r=new gr,i=new gr,a=new gr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=We,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jr)}intersectsSprite(e){return Jr.center.set(0,0,0),Jr.radius=.7071067811865476+Yr.distanceTo(e.center),Jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Xr.x=r.normal.x>0?e.max.x:e.min.x,Xr.y=r.normal.y>0?e.max.y:e.min.y,Xr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Qr=class extends vr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$r=new Pt,ei=new Cr,ti=new ir,ni=new H,ri=class extends cn{constructor(e=new fr,t=new Qr){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ti.copy(n.boundingSphere),ti.applyMatrix4(r),ti.radius+=i,e.ray.intersectsSphere(ti)===!1)return;$r.copy(r).invert(),ei.copy(e.ray).applyMatrix4($r);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ni.fromBufferAttribute(l,n),ii(ni,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ni.fromBufferAttribute(l,a),ii(ni,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ii(e,t,n,r,i,a,o){let s=ei.distanceSqToPoint(e);if(s<n){let n=new H;ei.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var ai=class extends Ot{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},oi=class extends Ot{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},si=class extends Ot{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ci=class extends si{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},li=class extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ui=class e extends fr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new er(c,3)),this.setAttribute(`normal`,new er(l,3)),this.setAttribute(`uv`,new er(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new H;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},di=class e extends fr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new H,l=new V;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new er(a,3)),this.setAttribute(`normal`,new er(o,3)),this.setAttribute(`uv`,new er(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},fi=class e extends fr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new er(u,3)),this.setAttribute(`normal`,new er(d,3)),this.setAttribute(`uv`,new er(f,2));function _(){let a=new H,_=new H,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new V,m=new H,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},pi=class e extends fr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new er(i,3)),this.setAttribute(`normal`,new er(i.slice(),3)),this.setAttribute(`uv`,new er(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new H,r=new H,i=new H;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new H;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new H;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new H,t=new H,n=new H,r=new H,o=new V,s=new V,c=new V;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},mi=class e extends pi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},hi=class e extends fr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new er(p,3)),this.setAttribute(`normal`,new er(m,3)),this.setAttribute(`uv`,new er(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},gi=class e extends fr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new H,p=new V;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new er(s,3)),this.setAttribute(`normal`,new er(c,3)),this.setAttribute(`uv`,new er(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},_i=class e extends fr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new H,d=new H,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new er(p,3)),this.setAttribute(`normal`,new er(m,3)),this.setAttribute(`uv`,new er(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function vi(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(bi(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(bi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function yi(e){let t={};for(let n=0;n<e.length;n++){let r=vi(e[n]);for(let e in r)t[e]=r[e]}return t}function bi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function xi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Si(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:vt.workingColorSpace}var Ci={clone:vi,merge:yi},wi=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ti=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ei=class extends vr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wi,this.fragmentShader=Ti,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vi(e.uniforms),this.uniformsGroups=xi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new W().setHex(r.value);break;case`v2`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new kt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Pt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Di=class extends Ei{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Oi=class extends vr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new V(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ki=class extends vr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=L,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ai=class extends vr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ji(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Mi(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Ni=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Pi=class extends Ni{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ie,endingEnd:Ie}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case I:i=e,o=2*t-n;break;case Le:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case I:a=e,s=2*n-t;break;case Le:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Fi=class extends Ni{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ii=class extends Ni{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Li=class extends Ni{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Bi(n,t,g,y,r);i[p]=Ri(x,o,_,b,m)}return i}};function Ri(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function zi(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Bi(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ri(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=zi(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Vi=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ji(t,this.TimeBufferType),this.values=ji(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ji(e.times,Array),values:ji(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Mi(e.settings)&&(n.settings={inTangents:ji(e.settings.inTangents,Array),outTangents:ji(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ii(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Pi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Li(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ne:t=this.InterpolantFactoryMethodDiscrete;break;case F:t=this.InterpolantFactoryMethodLinear;break;case Pe:t=this.InterpolantFactoryMethodSmooth;break;case Fe:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ne;case this.InterpolantFactoryMethodLinear:return F;case this.InterpolantFactoryMethodSmooth:return Pe;case this.InterpolantFactoryMethodBezier:return Fe}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Mi(this.settings)&&(Hi(this.settings.inTangents,e),Hi(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ke(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Pe,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Mi(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Hi(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Vi.prototype.ValueTypeName=``,Vi.prototype.TimeBufferType=Float32Array,Vi.prototype.ValueBufferType=Float32Array,Vi.prototype.DefaultInterpolation=F;var Ui=class extends Vi{constructor(e,t,n){super(e,t,n)}};Ui.prototype.ValueTypeName=`bool`,Ui.prototype.ValueBufferType=Array,Ui.prototype.DefaultInterpolation=Ne,Ui.prototype.InterpolantFactoryMethodLinear=void 0,Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Wi=class extends Vi{constructor(e,t,n,r){super(e,t,n,r)}};Wi.prototype.ValueTypeName=`color`;var Gi=class extends Vi{constructor(e,t,n,r){super(e,t,n,r)}};Gi.prototype.ValueTypeName=`number`;var Ki=class extends Ni{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)dt.slerpFlat(i,0,a,c-o,a,c,s);return i}},qi=class extends Vi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ki(this.times,this.values,this.getValueSize(),e)}};qi.prototype.ValueTypeName=`quaternion`,qi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ji=class extends Vi{constructor(e,t,n){super(e,t,n)}};Ji.prototype.ValueTypeName=`string`,Ji.prototype.ValueBufferType=Array,Ji.prototype.DefaultInterpolation=Ne,Ji.prototype.InterpolantFactoryMethodLinear=void 0,Ji.prototype.InterpolantFactoryMethodSmooth=void 0;var Yi=class extends Vi{constructor(e,t,n,r){super(e,t,n,r)}};Yi.prototype.ValueTypeName=`vector`;var Xi=class extends cn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new W(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Zi=class extends Xi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Qi=new Pt,$i=new H,ea=new H,ta=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new V(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new Pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zr,this._frameExtents=new V(1,1),this._viewportCount=1,this._viewports=[new kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;$i.setFromMatrixPosition(e.matrixWorld),t.position.copy($i),ea.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ea),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Qi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Qi,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Qi)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},na=new H,ra=new dt,ia=new H,aa=class extends cn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=We,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(na,ra,ia),ia.x===1&&ia.y===1&&ia.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(na,ra,ia.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(na,ra,ia),ia.x===1&&ia.y===1&&ia.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(na,ra,ia.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},oa=new H,sa=new V,ca=new V,la=class extends aa{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=it*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(rt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return it*2*Math.atan(Math.tan(rt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){oa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(oa.x,oa.y).multiplyScalar(-e/oa.z),oa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oa.x,oa.y).multiplyScalar(-e/oa.z)}getViewSize(e,t){return this.getViewBounds(e,sa,ca),t.subVectors(ca,sa)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(rt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ua=class extends aa{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},da=class extends ta{constructor(){super(new ua(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},fa=class extends Xi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.shadow=new da}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},pa=-90,ma=1,ha=class extends cn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new la(pa,ma,e,t);r.layers=this.layers,this.add(r);let i=new la(pa,ma,e,t);i.layers=this.layers,this.add(i);let a=new la(pa,ma,e,t);a.layers=this.layers,this.add(a);let o=new la(pa,ma,e,t);o.layers=this.layers,this.add(o);let s=new la(pa,ma,e,t);s.layers=this.layers,this.add(s);let c=new la(pa,ma,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ga=class extends la{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},_a=`\\[\\]\\.:\\/`,va=RegExp(`[\\[\\]\\.:\\/]`,`g`),ya=`[^\\[\\]\\.:\\/]`,ba=`[^`+_a.replace(`\\.`,``)+`]`,xa=`((?:WC+[\\/:])*)`.replace(`WC`,ya),Sa=`(WCOD+)?`.replace(`WCOD`,ba),Ca=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,ya),wa=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,ya),Ta=RegExp(`^`+xa+Sa+Ca+wa+`$`),Ea=[`material`,`materials`,`bones`,`map`],Da=class{constructor(e,t,n){let r=n||Oa.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Oa=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(va,``)}static parseTrackName(e){let t=Ta.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ea.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Oa.Composite=Da,Oa.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Oa.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Oa.prototype.GetterByBindingType=[Oa.prototype._getValue_direct,Oa.prototype._getValue_array,Oa.prototype._getValue_arrayElement,Oa.prototype._getValue_toArray],Oa.prototype.SetterByBindingTypeAndVersioning=[[Oa.prototype._setValue_direct,Oa.prototype._setValue_direct_setNeedsUpdate,Oa.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Oa.prototype._setValue_array,Oa.prototype._setValue_array_setNeedsUpdate,Oa.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Oa.prototype._setValue_arrayElement,Oa.prototype._setValue_arrayElement_setNeedsUpdate,Oa.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Oa.prototype._setValue_fromArray,Oa.prototype._setValue_fromArray_setNeedsUpdate,Oa.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ka=new Pt,Aa=class{constructor(e,t,n=0,r=1/0){this.ray=new Cr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Gt,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):B(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return ka.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ka),this}intersectObject(e,t=!0,n=[]){return Ma(e,this,n,t),n.sort(ja),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Ma(e[r],this,n,t);return n.sort(ja),n}};function ja(e,t){return e.distance-t.distance}function Ma(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Ma(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Na(e,t,n,r){let i=Pa(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case O:return e*t*2/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case te:return e*t*4/i.components*i.byteLength;case A:case ne:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case j:case re:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ie:case ae:return Math.max(e,16)*Math.max(t,8)/4;case M:case N:return Math.max(e,8)*Math.max(t,8)/2;case oe:case se:case le:case P:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ce:case ue:case de:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case me:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case we:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Te:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ee:case De:case Oe:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ke:case Ae:return Math.ceil(e/4)*Math.ceil(t/4)*8;case je:case Me:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Pa(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Fa(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ia(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var K={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},q={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new U}},envmap:{envMap:{value:null},envMapRotation:{value:new U},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new U}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new U}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new U},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new U},normalScale:{value:new V(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new U},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new U}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new U}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new U}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0},uvTransform:{value:new U}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new V(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}}},La={basic:{uniforms:yi([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.fog]),vertexShader:K.meshbasic_vert,fragmentShader:K.meshbasic_frag},lambert:{uniforms:yi([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:K.meshlambert_vert,fragmentShader:K.meshlambert_frag},phong:{uniforms:yi([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:K.meshphong_vert,fragmentShader:K.meshphong_frag},standard:{uniforms:yi([q.common,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.roughnessmap,q.metalnessmap,q.fog,q.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag},toon:{uniforms:yi([q.common,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.gradientmap,q.fog,q.lights,{emissive:{value:new W(0)}}]),vertexShader:K.meshtoon_vert,fragmentShader:K.meshtoon_frag},matcap:{uniforms:yi([q.common,q.bumpmap,q.normalmap,q.displacementmap,q.fog,{matcap:{value:null}}]),vertexShader:K.meshmatcap_vert,fragmentShader:K.meshmatcap_frag},points:{uniforms:yi([q.points,q.fog]),vertexShader:K.points_vert,fragmentShader:K.points_frag},dashed:{uniforms:yi([q.common,q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:K.linedashed_vert,fragmentShader:K.linedashed_frag},depth:{uniforms:yi([q.common,q.displacementmap]),vertexShader:K.depth_vert,fragmentShader:K.depth_frag},normal:{uniforms:yi([q.common,q.bumpmap,q.normalmap,q.displacementmap,{opacity:{value:1}}]),vertexShader:K.meshnormal_vert,fragmentShader:K.meshnormal_frag},sprite:{uniforms:yi([q.sprite,q.fog]),vertexShader:K.sprite_vert,fragmentShader:K.sprite_frag},background:{uniforms:{uvTransform:{value:new U},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:K.background_vert,fragmentShader:K.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new U}},vertexShader:K.backgroundCube_vert,fragmentShader:K.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:K.cube_vert,fragmentShader:K.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:K.equirect_vert,fragmentShader:K.equirect_frag},distance:{uniforms:yi([q.common,q.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:K.distance_vert,fragmentShader:K.distance_frag},shadow:{uniforms:yi([q.lights,q.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:K.shadow_vert,fragmentShader:K.shadow_frag}};La.physical={uniforms:yi([La.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new U},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new U},clearcoatNormalScale:{value:new V(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new U},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new U},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new U},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new U},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new U},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new U},transmissionSamplerSize:{value:new V},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new U},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new U},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new U},anisotropyVector:{value:new V},anisotropyMap:{value:null},anisotropyMapTransform:{value:new U}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag};var Ra={r:0,b:0,g:0},za=new Pt,Ba=new U;Ba.set(-1,0,0,0,1,0,0,0,1);function Va(e,t,n,r,i,a){let o=new W(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new G(new ui(1,1,1),new Ei({name:`BackgroundCubeMaterial`,uniforms:vi(La.backgroundCube.uniforms),vertexShader:La.backgroundCube.vertexShader,fragmentShader:La.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(za.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ba),l.material.toneMapped=vt.getTransfer(i.colorSpace)!==Be,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new G(new hi(2,2),new Ei({name:`BackgroundMaterial`,uniforms:vi(La.background.uniforms),vertexShader:La.background.vertexShader,fragmentShader:La.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=vt.getTransfer(i.colorSpace)!==Be,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ra,Si(e)),n.buffers.color.setClear(Ra.r,Ra.g,Ra.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ha(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ua(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Wa(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ga(e){let t=this,n=null,r=0,i=!1,a=!1,o=new gr,s=new U,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ka=4,qa=6,Ja=20,Ya=256,Xa=new ua,Za=new W,Qa=null,$a=0,eo=0,to=!1,no=new H,ro=new H,io=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=no}=i;Qa=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qa,$a,eo),this._renderer.xr.enabled=to,e.scissorTest=!1,so(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qa=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),eo=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:R,depthBuffer:!1},r=oo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ao(r)),this._blurMaterial=lo(r,e,t),this._ggxMaterial=co(r,e,t)}return r}_compileMaterial(e){let t=new G(new fr,e);this._renderer.compile(t,Xa)}_sceneToCubeUV(e,t,n,r,i){let a=new la(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Za),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new G(new ui,new wr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Za),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;so(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uo());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;so(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Xa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ka?n-d+Ka:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,so(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Xa),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,so(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Xa)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];so(t,3*l*(r>this._lodMax-Ka?r-this._lodMax+Ka:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Xa)}};function ao(e){let t=[],n=[],r=e,i=e-Ka+1+qa;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?ro.set(1,r,n):e===1?ro.set(-n,1,-r):e===2?ro.set(-n,r,1):e===3?ro.set(-1,r,-n):e===4?ro.set(-n,-1,r):ro.set(n,r,-1),ro.toArray(l,(e*6+t)*3)}}let u=new fr;u.setAttribute(`position`,new Zn(c,3)),u.setAttribute(`outputDirection`,new Zn(l,3)),n.push(new G(u,null)),r>Ka&&r--}return{lodMeshes:n,sizeLods:t}}function oo(e,t,n){let r=new jt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function so(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function co(e,t,n){return new Ei({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ya,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:po(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function lo(e,t,n){return new Ei({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ja,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:po(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function uo(){return new Ei({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fo(){return new Ei({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function po(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var mo=class extends jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ai(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ui(5,5,5),i=new Ei({name:`CubemapFromEquirect`,uniforms:vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new G(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new ha(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ho(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new mo(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new io(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new io(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function go(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Qe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function _o(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?$n:Qn)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function vo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function yo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function bo(e,t,n){let r=new WeakMap,i=new kt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new Mt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new V(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function xo(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var So={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Co(e,t,n,r,i,a){let o=new jt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new fr;l.setAttribute(`position`,new er([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new er([0,2,0,0,2,0],2));let u=new Di({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new G(l,u),f=new ua(-1,1,1,-1,0,1),p=null,m=null,h=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new jt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new jt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},vt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=So[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var wo=new Ot,To=new si(1,1),Eo=new Mt,Do=new Nt,Oo=new ai,ko=[],Ao=[],jo=new Float32Array(16),Mo=new Float32Array(9),No=new Float32Array(4);function Po(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ko[i];if(a===void 0&&(a=new Float32Array(i),ko[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Fo(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Io(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Lo(e,t){let n=Ao[t];n===void 0&&(n=new Int32Array(t),Ao[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ro(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function zo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Fo(n,t))return;e.uniform2fv(this.addr,t),Io(n,t)}}function Bo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Fo(n,t))return;e.uniform3fv(this.addr,t),Io(n,t)}}function Vo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Fo(n,t))return;e.uniform4fv(this.addr,t),Io(n,t)}}function Ho(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Fo(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Io(n,t)}else{if(Fo(n,r))return;No.set(r),e.uniformMatrix2fv(this.addr,!1,No),Io(n,r)}}function Uo(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Fo(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Io(n,t)}else{if(Fo(n,r))return;Mo.set(r),e.uniformMatrix3fv(this.addr,!1,Mo),Io(n,r)}}function Wo(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Fo(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Io(n,t)}else{if(Fo(n,r))return;jo.set(r),e.uniformMatrix4fv(this.addr,!1,jo),Io(n,r)}}function Go(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ko(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Fo(n,t))return;e.uniform2iv(this.addr,t),Io(n,t)}}function qo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Fo(n,t))return;e.uniform3iv(this.addr,t),Io(n,t)}}function Jo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Fo(n,t))return;e.uniform4iv(this.addr,t),Io(n,t)}}function Yo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Xo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Fo(n,t))return;e.uniform2uiv(this.addr,t),Io(n,t)}}function Zo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Fo(n,t))return;e.uniform3uiv(this.addr,t),Io(n,t)}}function Qo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Fo(n,t))return;e.uniform4uiv(this.addr,t),Io(n,t)}}function $o(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(To.compareFunction=n.isReversedDepthBuffer()?518:515,a=To):a=wo,n.setTexture2D(t||a,i)}function es(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Do,i)}function ts(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Oo,i)}function ns(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Eo,i)}function rs(e){switch(e){case 5126:return Ro;case 35664:return zo;case 35665:return Bo;case 35666:return Vo;case 35674:return Ho;case 35675:return Uo;case 35676:return Wo;case 5124:case 35670:return Go;case 35667:case 35671:return Ko;case 35668:case 35672:return qo;case 35669:case 35673:return Jo;case 5125:return Yo;case 36294:return Xo;case 36295:return Zo;case 36296:return Qo;case 35678:case 36198:case 36298:case 36306:case 35682:return $o;case 35679:case 36299:case 36307:return es;case 35680:case 36300:case 36308:case 36293:return ts;case 36289:case 36303:case 36311:case 36292:return ns}}function is(e,t){e.uniform1fv(this.addr,t)}function as(e,t){let n=Po(t,this.size,2);e.uniform2fv(this.addr,n)}function os(e,t){let n=Po(t,this.size,3);e.uniform3fv(this.addr,n)}function ss(e,t){let n=Po(t,this.size,4);e.uniform4fv(this.addr,n)}function cs(e,t){let n=Po(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ls(e,t){let n=Po(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function us(e,t){let n=Po(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ds(e,t){e.uniform1iv(this.addr,t)}function fs(e,t){e.uniform2iv(this.addr,t)}function ps(e,t){e.uniform3iv(this.addr,t)}function ms(e,t){e.uniform4iv(this.addr,t)}function hs(e,t){e.uniform1uiv(this.addr,t)}function gs(e,t){e.uniform2uiv(this.addr,t)}function _s(e,t){e.uniform3uiv(this.addr,t)}function vs(e,t){e.uniform4uiv(this.addr,t)}function ys(e,t,n){let r=this.cache,i=t.length,a=Lo(n,i);Fo(r,a)||(e.uniform1iv(this.addr,a),Io(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?To:wo;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function bs(e,t,n){let r=this.cache,i=t.length,a=Lo(n,i);Fo(r,a)||(e.uniform1iv(this.addr,a),Io(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Do,a[e])}function xs(e,t,n){let r=this.cache,i=t.length,a=Lo(n,i);Fo(r,a)||(e.uniform1iv(this.addr,a),Io(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Oo,a[e])}function Ss(e,t,n){let r=this.cache,i=t.length,a=Lo(n,i);Fo(r,a)||(e.uniform1iv(this.addr,a),Io(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Eo,a[e])}function Cs(e){switch(e){case 5126:return is;case 35664:return as;case 35665:return os;case 35666:return ss;case 35674:return cs;case 35675:return ls;case 35676:return us;case 5124:case 35670:return ds;case 35667:case 35671:return fs;case 35668:case 35672:return ps;case 35669:case 35673:return ms;case 5125:return hs;case 36294:return gs;case 36295:return _s;case 36296:return vs;case 35678:case 36198:case 36298:case 36306:case 35682:return ys;case 35679:case 36299:case 36307:return bs;case 35680:case 36300:case 36308:case 36293:return xs;case 36289:case 36303:case 36311:case 36292:return Ss}}var ws=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=rs(t.type)}},Ts=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cs(t.type)}},Es=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ds=/(\w+)(\])?(\[|\.)?/g;function Os(e,t){e.seq.push(t),e.map[t.id]=t}function ks(e,t,n){let r=e.name,i=r.length;for(Ds.lastIndex=0;;){let a=Ds.exec(r),o=Ds.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Os(n,l===void 0?new ws(s,e,t):new Ts(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Es(s),Os(n,e)),n=e}}}var As=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);ks(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function js(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ms=37297,Ns=0;function Ps(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Fs=new U;function Is(e){vt._getMatrix(Fs,vt.workingColorSpace,e);let t=`mat3( ${Fs.elements.map(e=>e.toFixed(4))} )`;switch(vt.getTransfer(e)){case ze:return[t,`LinearTransferOETF`];case Be:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ls(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ps(e.getShaderSource(t),r)}return i}function Rs(e,t){let n=Is(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var zs={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Bs(e,t){let n=zs[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Vs=new H;function Hs(){return vt.getLuminanceCoefficients(Vs),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Vs.x.toFixed(4)}, ${Vs.y.toFixed(4)}, ${Vs.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Us(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Ks).join(`
`)}function Ws(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Gs(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Ks(e){return e!==``}function qs(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Js(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ys=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xs(e){return e.replace(Ys,Qs)}var Zs=new Map;function Qs(e,t){let n=K[t];if(n===void 0){let e=Zs.get(t);if(e!==void 0)n=K[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Xs(n)}var $s=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ec(e){return e.replace($s,tc)}function tc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function nc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var rc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function ic(e){return rc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var ac={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function oc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:ac[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var sc={302:`ENVMAP_MODE_REFRACTION`};function cc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:sc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var lc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function uc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:lc[e.combine]||`ENVMAP_BLENDING_NONE`}function dc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function fc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=ic(n),l=oc(n),u=cc(n),d=uc(n),f=dc(n),p=Us(n),m=Ws(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ks).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ks).join(`
`),_.length>0&&(_+=`
`)):(g=[nc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Ks).join(`
`),_=[nc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:K.tonemapping_pars_fragment,n.toneMapping===0?``:Bs(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,K.colorspace_pars_fragment,Rs(`linearToOutputTexel`,n.outputColorSpace),Hs(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Ks).join(`
`)),o=Xs(o),o=qs(o,n),o=Js(o,n),s=Xs(s),s=qs(s,n),s=Js(s,n),o=ec(o),s=ec(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=js(i,i.VERTEX_SHADER,y),S=js(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Ls(i,x,`vertex`),n=Ls(i,S,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new As(i,h),T=Gs(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Ms)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ns++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var pc=0,mc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new hc(e),t.set(e,n)),n}},hc=class{constructor(e){this.id=pc++,this.code=e,this.usedTimes=0}};function gc(e){return e===1030||e===37490||e===36285}function _c(e,t,n,r,i,a){let o=new Gt,s=new mc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,ee,O,k;if(C){let e=La[C];D=e.vertexShader,ee=e.fragmentShader}else{D=i.vertexShader,ee=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let te=e.getRenderTarget(),A=e.state.buffers.depth.getReversed(),ne=h.isInstancedMesh===!0,j=h.isBatchedMesh===!0,re=!!i.map,M=!!i.matcap,ie=!!x,N=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,P=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.dispersion>0,me=i.retroreflectivity>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=de&&!!i.anisotropyMap,ye=fe&&!!i.clearcoatMap,be=fe&&!!i.clearcoatNormalMap,xe=fe&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,we=ge&&!!i.sheenColorMap,Te=ge&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,De=!!i.specularColorMap,Oe=!!i.specularIntensityMap,ke=_e&&!!i.transmissionMap,Ae=_e&&!!i.thicknessMap,je=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,F=!!i.alphaHash,Pe=!!i.extensions,Fe=0;i.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Fe=e.toneMapping);let Ie={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:ee,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:j,batchingColor:j&&h._colorsTexture!==null,instancing:ne,instancingColor:ne&&h.instanceColor!==null,instancingMorph:ne&&h.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:vt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:M,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:N,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&gc(i.normalMap.format),metalnessMap:P,roughnessMap:ue,anisotropy:de,anisotropyMap:ve,clearcoat:fe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:pe,retroreflection:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:_e,transmissionMap:ke,thicknessMap:Ae,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:F,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:N&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:P&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:De&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:ke&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:Me&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||de),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||Me),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:A,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Fe,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&vt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&vt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Pe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Pe&&i.extensions.multiDraw===!0||j)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=La[t];n=Ci.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new fc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function vc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function yc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function bc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function xc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||yc),r.length>1&&r.sort(t||bc),i.length>1&&i.sort(t||bc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Sc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new xc,e.set(t,[i])):n>=r.length?(i=new xc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Cc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new H,color:new W};break;case`SpotLight`:n={position:new H,direction:new H,color:new W,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new H,color:new W,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new H,skyColor:new W,groundColor:new W};break;case`RectAreaLight`:n={color:new W,position:new H,halfWidth:new H,halfHeight:new H}}return e[t.id]=n,n}}}function wc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Tc=0;function Ec(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Dc(e){let t=new Cc,n=wc(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new H);let i=new H,a=new Pt,o=new Pt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Ec);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=q.LTC_FLOAT_1,r.rectAreaLTC2=q.LTC_FLOAT_2):(r.rectAreaLTC1=q.LTC_HALF_1,r.rectAreaLTC2=q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Tc++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Oc(e){let t=new Dc(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function kc(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Oc(e),t.set(n,[a])):r>=i.length?(a=new Oc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ac=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Mc=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Nc=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Pc=new Pt,Fc=new H,Ic=new H;function Lc(e,t,n){let i=new Zr,a=new V,s=new V,c=new kt,l=new ki,u=new Ai,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new Ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new V},radius:{value:4}},vertexShader:Ac,fragmentShader:jc}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new fr;y.setAttribute(`position`,new Zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new G(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){z(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new jt(a.x,a.y,{format:O,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new si(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new mo(a.x),p.map.depthTexture=new ci(a.x,m)):(p.map=new jt(a.x,a.y),p.map.depthTexture=new si(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Fc.setFromMatrixPosition(d.matrixWorld),e.position.copy(Fc),Ic.copy(e.position),Ic.add(Mc[t]),e.up.copy(Nc[t]),e.lookAt(Ic),e.updateMatrixWorld(),n.makeTranslation(-Fc.x,-Fc.y,-Fc.z),Pc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(Pc,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new jt(a.x,a.y,{format:O,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Rc(e,t){function n(){let t=!1,n=new kt,r=null,i=new kt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?P(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=et[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?P(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,ee=null,O=null,k=null,te=null,A=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,j=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),ne=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(re)[1]),ne=j>=1);let M=null,ie={},N=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new kt().fromArray(N),se=new kt().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),P(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),P(e.CULL_FACE),ge(0);function P(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ue(e.BLEND),g=!1);else if(g===!1&&(P(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):P(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?P(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?ue(e.CULL_FACE):(P(e.CULL_FACE),t!==ee&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),ee=t}function be(t){t!==O&&(ne&&e.lineWidth(t),O=t)}function xe(t,n,r){t?(P(e.POLYGON_OFFSET_FILL),(k!==n||te!==r)&&(k=n,te=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?P(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+A-1),M!==t&&(e.activeTexture(t),M=t)}function we(t,n,r){r===void 0&&(r=M===null?e.TEXTURE0+A-1:M);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(M!==r&&(e.activeTexture(r),M=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Te(){let t=ie[M];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Pe(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Fe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ie(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function I(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Le(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function L(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Re(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function R(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},M=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,ee=null,O=null,k=null,te=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:P,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:F,texImage3D:Pe,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:L,uniformBlockBinding:Re,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:I,viewport:Le,reset:R}}function zc(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new V,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):qe(`canvas`)}function T(e,t,n){let r=1,i=Fe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function D(e){return e.generateMipmaps}function ee(e){l.generateMipmap(e)}function O(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function k(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?ze:vt.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function te(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function A(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ne(e){let t=e.target;t.removeEventListener(`dispose`,ne),re(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),ie(t)}function re(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&M(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function M(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function ie(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let N=0;function ae(){N=0}function oe(){return N}function se(e){N=e}function ce(){let e=N;return e>=p.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),N+=1,e}function le(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(e,t){let n=f.get(e);if(e.isVideoTexture&&F(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{be(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function ue(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?be(n,e,t):(e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t))}function de(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?be(n,e,t):d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function fe(e,t){let n=f.get(e);e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version?xe(n,e,t):d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let pe={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},me={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},he={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function ge(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,pe[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,pe[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,pe[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,me[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,me[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,he[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function _e(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,ne));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=le(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&M(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function ve(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ye(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=ve(r.start,t.width,4),c=ve(n.start,t.width,4);r.start<=o+1&&s===c&&ve(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function be(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=_e(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=vt.getPrimaries(vt.workingColorSpace),n=t.colorSpace===``?null:vt.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=Pe(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=k(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);ge(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=A(t,e);if(t.isDepthTexture)u=te(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&ye(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=Na(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=Na(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Fe(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Fe(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&ee(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function xe(e,t,n){if(t.image.length!==6)return;let r=_e(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=vt.getPrimaries(vt.workingColorSpace),o=t.colorSpace===``?null:vt.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Pe(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=k(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=A(t,h);ge(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Fe(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&ee(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Se(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=k(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),Ne(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Me(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function Ce(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=te(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;Ne(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Me(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Me(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=k(i.internalFormat,a,o,i.normalized,i.colorSpace);Ne(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Me(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Me(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function we(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,i.__webglTexture&&t.depthTexture.image.width===t.width&&t.depthTexture.image.height===t.height||(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,ne)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),ge(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else P(t.depthTexture,0);let a=i.__webglTexture,o=Me(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)Ne(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)Ne(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Te(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)we(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?we(t.__webglFramebuffer[0],e,0):we(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),Ce(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),Ce(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function Ee(e,t,n){let r=f.get(e);t!==void 0&&Se(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Te(e)}function De(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,j);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&Ne(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=k(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=Me(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),Ce(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),ge(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)Se(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else Se(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&ee(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),ge(o,r),Se(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&ee(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),ge(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)Se(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else Se(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&ee(i),d.unbindTexture()}e.depthBuffer&&Te(e)}function Oe(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=O(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),ee(t),d.unbindTexture()}}}let ke=[],Ae=[];function je(e){if(e.samples>0){if(Ne(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(ke.length=0,Ae.length=0,ke.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(ke.push(a),Ae.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,Ae)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,ke))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Me(e){return Math.min(p.maxSamples,e.samples)}function Ne(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function F(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Pe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(vt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Fe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ce,this.resetTextureUnits=ae,this.getTextureUnits=oe,this.setTextureUnits=se,this.setTexture2D=P,this.setTexture2DArray=ue,this.setTexture3D=de,this.setTextureCube=fe,this.rebindTextures=Ee,this.setupRenderTarget=De,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function Bc(e,t){function n(n,r=``){let i,a=vt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Vc=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hc=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Uc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new li(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ei({vertexShader:Vc,fragmentShader:Hc,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new G(new hi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wc=class extends tt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new Uc,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],ee=new V,O=null,k=null,te=new la;te.viewport=new kt;let A=new la;A.viewport=new kt;let ne=[te,A],j=new ga,re=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new dn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new dn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new dn,C[e]=t),t.getHandSpace()};function ie(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function N(){r.removeEventListener(`select`,ie),r.removeEventListener(`selectstart`,ie),r.removeEventListener(`selectend`,ie),r.removeEventListener(`squeeze`,ie),r.removeEventListener(`squeezestart`,ie),r.removeEventListener(`squeezeend`,ie),r.removeEventListener(`end`,N),r.removeEventListener(`inputsourceschange`,ae);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}re=null,M=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(ee.width,ee.height,!1),k!==null){let e=k.camera;e.fov=k.fov,e.zoom=k.zoom,e.updateProjectionMatrix(),k=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,ie),r.addEventListener(`selectstart`,ie),r.addEventListener(`selectend`,ie),r.addEventListener(`squeeze`,ie),r.addEventListener(`squeezestart`,ie),r.addEventListener(`squeezeend`,ie),r.addEventListener(`end`,N),r.addEventListener(`inputsourceschange`,ae),b.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(ee),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new jt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new si(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new jt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ae(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let oe=new H,se=new H;function ce(e,t,n){oe.setFromMatrixPosition(t.matrixWorld),se.setFromMatrixPosition(n.matrixWorld);let r=oe.distanceTo(se),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function le(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=A.near=te.near=t,j.far=A.far=te.far=n,(re!==j.near||M!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),re=j.near,M=j.far),j.layers.mask=e.layers.mask|6,te.layers.mask=j.layers.mask&-5,A.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;le(j,i);for(let e=0;e<a.length;e++)le(a[e],i);a.length===2?ce(j,te,A):j.projectionMatrix.copy(te.projectionMatrix),k===null&&e.isPerspectiveCamera&&(k={camera:e,fov:e.fov,zoom:e.zoom}),P(e,j,i)};function P(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=it*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let ue=null;function de(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=ne[n];o===void 0&&(o=new la,o.layers.enable(n),o.viewport=new kt,ne[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new li,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ue&&ue(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let fe=new Fa;fe.setAnimationLoop(de),this.setAnimationLoop=function(e){ue=e},this.dispose=function(){}}},Gc=new Pt,Kc=new U;Kc.set(-1,0,0,0,1,0,0,0,1);function qc(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Si(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Gc.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Kc),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Jc(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Yc=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Xc=null;function Zc(){return Xc===null&&(Xc=new Rr(Yc,16,16,O,g),Xc.name=`DFG_LUT`,Xc.minFilter=o,Xc.magFilter=o,Xc.wrapS=t,Xc.wrapT=t,Xc.generateMipmaps=!1,Xc.needsUpdate=!0),Xc}var Qc=class{constructor(e={}){let{canvas:t=Je(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([te,k,ee]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new H,O=null,A=null,ne=[],j=[],re=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,ie=!1,N=null,ae=null,oe=null,se=null;this._outputColorSpace=Re;let ce=0,le=0,P=null,ue=-1,de=null,fe=new kt,pe=new kt,me=null,he=new W(0),ge=0,_e=t.width,ve=t.height,ye=1,be=null,xe=null,Se=new kt(0,0,_e,ve),Ce=new kt(0,0,_e,ve),we=!1,Te=new Zr,Ee=!1,De=!1,Oe=new Pt,ke=new H,Ae=new kt,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Me=!1;function Ne(){return P===null?ye:1}let F=n;function Pe(e,n){return t.getContext(e,n)}let Fe,Ie,I,Le,L,R,ze,Be,Ve,He,Ue,Ge,Ke,qe,Ye,Ze,Qe,et,tt,nt,rt,it,at;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ct,!1),t.addEventListener(`webglcontextrestored`,lt,!1),t.addEventListener(`webglcontextcreationerror`,ut,!1),F===null){let t=`webgl2`;if(F=Pe(t,e),F===null)throw Pe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}ot()}catch(e){throw t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),B(`WebGLRenderer: `+e.message),e}function ot(){Fe=new go(F),Fe.init(),rt=new Bc(F,Fe),Ie=new Wa(F,Fe,e,rt),I=new Rc(F,Fe),Ie.reversedDepthBuffer&&h&&I.buffers.depth.setReversed(!0),ae=F.createFramebuffer(),oe=F.createFramebuffer(),se=F.createFramebuffer(),Le=new yo(F),L=new vc,R=new zc(F,Fe,I,L,Ie,rt,Le),ze=new ho(M),Be=new Ia(F),it=new Ha(F,Be),Ve=new _o(F,Be,Le,it),He=new xo(F,Ve,Be,it,Le),et=new bo(F,Ie,R),Ye=new Ga(L),Ue=new _c(M,ze,Fe,Ie,it,Ye),Ge=new qc(M,L),Ke=new Sc,qe=new kc(Fe),Qe=new Va(M,ze,I,He,x,s),Ze=new Lc(M,He,Ie),at=new Jc(F,Le,Ie,I),tt=new Ua(F,Fe,Le),nt=new vo(F,Fe,Le),Le.programs=Ue.programs,M.capabilities=Ie,M.extensions=Fe,M.properties=L,M.renderLists=Ke,M.shadowMap=Ze,M.state=I,M.info=Le}S!==1009&&(re=new Co(S,t.width,t.height,o,r,i));let st=new Wc(M,F);this.xr=st,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(e){e!==void 0&&(ye=e,this.setSize(_e,ve,!1))},this.getSize=function(e){return e.set(_e,ve)},this.setSize=function(e,n,r=!0){st.isPresenting?z(`WebGLRenderer: Can't change size while VR device is presenting.`):(_e=e,ve=n,t.width=Math.floor(e*ye),t.height=Math.floor(n*ye),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),re!==null&&re.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(_e*ye,ve*ye).floor()},this.setDrawingBufferSize=function(e,n,r){_e=e,ve=n,ye=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009)B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}re.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(fe)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),I.viewport(fe.copy(Se).multiplyScalar(ye).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),I.scissor(pe.copy(Ce).multiplyScalar(ye).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(e){I.setScissorTest(we=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(P!==null){let t=P.texture.format;e=C.has(t)}if(e){let e=P.texture.type,t=w.has(e),n=Qe.getClearColor(),r=Qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,F.clearBufferuiv(F.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,F.clearBufferiv(F.COLOR,0,E))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),N=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),Qe.dispose(),Ke.dispose(),qe.dispose(),L.dispose(),ze.dispose(),He.dispose(),it.dispose(),at.dispose(),Ue.dispose(),st.dispose(),st.removeEventListener(`sessionstart`,ht),st.removeEventListener(`sessionend`,gt),_t.stop()};function ct(e){e.preventDefault(),Xe(`WebGLRenderer: Context Lost.`),ie=!0}function lt(){Xe(`WebGLRenderer: Context Restored.`),ie=!1;let e=Le.autoReset,t=Ze.enabled,n=Ze.autoUpdate,r=Ze.needsUpdate,i=Ze.type;ot(),Le.autoReset=e,Ze.enabled=t,Ze.autoUpdate=n,Ze.needsUpdate=r,Ze.type=i}function ut(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function V(e){let t=e.target;t.removeEventListener(`dispose`,V),dt(t)}function dt(e){ft(e),L.remove(e)}function ft(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=je);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;it.setup(i,r,s,n,c);let h,g=tt;if(c!==null&&(h=Be.get(c),g=nt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*Ne()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*Ne()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(Fe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function pt(e,t,n,r){N!==null&&e.isNodeMaterial&&N.setObject(r,e),Ee===!0&&Ye.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,wt(e,t,r),e.side=0,e.needsUpdate=!0,wt(e,t,r),e.side=2):wt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),N!==null&&N.renderStart(e,t,n),A=qe.get(n),A.init(t),j.push(A),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(A.pushLight(e),e.castShadow&&A.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(A.pushLight(e),e.castShadow&&A.pushShadow(e))}),A.setupLights(),N!==null&&N.updateLights(A.state.lightsArray),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),Ee===!0&&Ye.setGlobalState(this.clippingPlanes,t),N!==null&&Ze.render(A.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];pt(o,n,t,e),r.add(o)}else pt(i,n,t,e),r.add(i)}}),A=j.pop(),N!==null&&N.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=L.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Fe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let U=null;function mt(e){U&&U(e)}function ht(){_t.stop()}function gt(){_t.start()}let _t=new Fa;_t.setAnimationLoop(mt),typeof self<`u`&&_t.setContext(self),this.setAnimationLoop=function(e){U=e,st.setAnimationLoop(e),e===null?_t.stop():_t.start()},st.addEventListener(`sessionstart`,ht),st.addEventListener(`sessionend`,gt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ie===!0)return;N!==null&&N.renderStart(e,t);let n=st.enabled===!0&&st.isPresenting===!0,r=re!==null&&(P===null||n)&&re.begin(M,P);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(re===null||re.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(t),t=st.getCamera()),e.isScene===!0&&e.onBeforeRender(M,e,t,P),A=qe.get(e,j.length),A.init(t),A.state.textureUnits=R.getTextureUnits(),j.push(A),Oe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Te.setFromProjectionMatrix(Oe,We,t.reversedDepth),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),O=Ke.get(e,ne.length),O.init(),ne.push(O),st.enabled===!0&&st.isPresenting===!0){let e=M.xr.getDepthSensingMesh();e!==null&&yt(e,t,-1/0,M.sortObjects)}yt(e,t,0,M.sortObjects),O.finish(),N!==null&&N.updateLights(A.state.lightsArray),M.sortObjects===!0&&O.sort(be,xe),Me=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,Me&&Qe.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&Ye.beginShadows();let i=A.state.shadowsArray;if(Ze.render(i,e,t),Ee===!0&&Ye.endShadows(),(r&&re.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(A.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}Me&&Qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(O,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),Me&&Qe.render(e),bt(O,e,t)}P!==null&&le===0&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),r&&re.end(M),e.isScene===!0&&e.onAfterRender(M,e,t),it.resetDefaultState(),ue=-1,de=null,j.pop(),j.length>0?(A=j[j.length-1],R.setTextureUnits(A.state.textureUnits),Ee===!0&&Ye.setGlobalState(M.clippingPlanes,A.state.camera)):A=null,ne.pop(),O=ne.length>0?ne[ne.length-1]:null,N!==null&&N.renderEnd()};function yt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)A.pushLightProbeGrid(e);else if(e.isLight)A.pushLight(e),e.castShadow&&A.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Te)){r&&Ae.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);let i=He.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Ae.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Te))){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ae.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ae.copy(e.boundingSphere.center)),Ae.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Ae.z,s,t)}}else a.visible&&O.push(e,i,a,n,Ae.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)yt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;A.setupLightsView(n),Ee===!0&&Ye.setGlobalState(M.clippingPlanes,n),r&&I.viewport(fe.copy(r)),i.length>0&&St(i,t,n),a.length>0&&St(a,t,n),o.length>0&&St(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[r.id]===void 0){let e=Fe.has(`EXT_color_buffer_half_float`)||Fe.has(`EXT_color_buffer_float`);A.state.transmissionRenderTarget[r.id]=new jt(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Ie.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:vt.workingColorSpace})}let a=A.state.transmissionRenderTarget[r.id],o=r.viewport||fe;a.setSize(o.z*M.transmissionResolutionScale,o.w*M.transmissionResolutionScale);let s=M.getRenderTarget(),u=M.getActiveCubeFace(),d=M.getActiveMipmapLevel();M.setRenderTarget(a),M.getClearColor(he),ge=M.getClearAlpha(),ge<1&&M.setClearColor(16777215,.5),M.clear(),Me&&Qe.render(n);let f=M.toneMapping;M.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),A.setupLightsView(r),Ee===!0&&Ye.setGlobalState(M.clippingPlanes,r),St(e,n,r),R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a),Fe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a))}M.setRenderTarget(s,u,d),M.setClearColor(he,ge),p!==void 0&&(r.viewport=p),M.toneMapping=f}function St(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ct(o,t,n,s,l,c)}}function Ct(e,t,n,r,i,a){N!==null&&i.isNodeMaterial&&N.setObject(e,i),e.onBeforeRender(M,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(M,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=2):M.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(M,t,n,r,i,a)}function wt(e,t,n){t.isScene!==!0&&(t=je);let r=L.get(e),i=A.state.lights,a=A.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,A.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,V),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=Ue.getUniforms(e),N!==null&&e.isNodeMaterial&&N.build(e,n,s),e.onBeforeCompile(s,M),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),Et(e,s),r.needsLights=Mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=A.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=As.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Dt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=je),R.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:vt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(h=M.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),y=A.state.lights;if(Ee===!0&&(De===!0||e!==de)){let t=e===de&&r.id===ue;Ye.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=A.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=wt(r,t,i),N&&r.isNodeMaterial&&N.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(I.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ue&&(ue=r.id,C=!0),v.needsLights){let e=Dt(A.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||de!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(F,`projectionMatrix`,e.projectionMatrix),T.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(F,ke.setFromMatrixPosition(e.matrixWorld)),Ie.logarithmicDepthBuffer&&T.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),de!==e&&(de=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(F,`sunShadowMap`,y.state.sunShadowMap,R),y.state.directionalShadowMap.length>0&&T.setValue(F,`directionalShadowMap`,y.state.directionalShadowMap,R),y.state.spotShadowMap.length>0&&T.setValue(F,`spotShadowMap`,y.state.spotShadowMap,R),y.state.pointShadowMap.length>0&&T.setValue(F,`pointShadowMap`,y.state.pointShadowMap,R)),i.isSkinnedMesh){T.setOptional(F,i,`bindMatrix`),T.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(F,`boneTexture`,e.boneTexture,R))}i.isBatchedMesh&&(T.setOptional(F,i,`batchingTexture`),T.setValue(F,`batchingTexture`,i._matricesTexture,R),T.setOptional(F,i,`batchingIdTexture`),T.setValue(F,`batchingIdTexture`,i._indirectTexture,R),T.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(F,`batchingColorTexture`,i._colorsTexture,R));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&et.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Zc()),C){if(T.setValue(F,`toneMappingExposure`,M.toneMappingExposure),v.needsLights&&At(E,w),a&&r.fog===!0&&Ge.refreshFogUniforms(E,a),Ge.refreshMaterialUniforms(E,r,ye,ve,A.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}As.upload(F,Tt(v),E,R)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(As.upload(F,Tt(v),E,R),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(F,`center`,i.center),T.setValue(F,`modelViewMatrix`,i.modelViewMatrix),T.setValue(F,`normalMatrix`,i.normalMatrix),T.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];at.update(n,x),at.bind(n,x)}}return x}function At(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ce},this.getActiveMipmapLevel=function(){return le},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){P=e,ce=t,le=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest,I.viewport(fe),I.scissor(pe),I.setScissorTest(me),ue=-1;return}if(o.__webglFramebuffer===void 0)R.setupRenderTarget(e);else if(o.__hasExternalTextures)R.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);R.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&R.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest}else fe.copy(Se).multiplyScalar(ye).floor(),pe.copy(Ce).multiplyScalar(ye).floor(),me=we;if(n!==0&&(r=ae),I.bindFramebuffer(F.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(fe),I.scissor(pe),I.setScissorTest(me),i){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ue=-1};function Nt(e){let t=L.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ie.textureFormatReadable(e.format),t.__typeReadable=Ie.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let u=Nt(o);if(u.__formatReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,rt.convert(c),rt.convert(l),a)}finally{let e=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let d=Nt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,rt.convert(l),rt.convert(u),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let p=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,p);let m=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await $e(F,m,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(f),F.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;R.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=rt.convert(t.format),_=rt.convert(t.type),v;t.isData3DTexture?(R.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(R.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(R.setTexture2D(t,0),v=F.TEXTURE_2D),I.activeTexture(F.TEXTURE0),I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(F.UNPACK_ROW_LENGTH),b=I.getParameter(F.UNPACK_IMAGE_HEIGHT),x=I.getParameter(F.UNPACK_SKIP_PIXELS),S=I.getParameter(F.UNPACK_SKIP_ROWS),C=I.getParameter(F.UNPACK_SKIP_IMAGES);I.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(F.UNPACK_SKIP_PIXELS,l),I.pixelStorei(F.UNPACK_SKIP_ROWS,u),I.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,o,s,f,p,o,s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,oe),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,se);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,o,s,f,p,o,s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(F.UNPACK_ROW_LENGTH,y),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(F.UNPACK_SKIP_PIXELS,x),I.pixelStorei(F.UNPACK_SKIP_ROWS,S),I.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&R.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?R.setTextureCube(e,0):e.isData3DTexture?R.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?R.setTexture2DArray(e,0):R.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){ce=0,le=0,P=null,I.reset(),it.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return We}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=vt._getUnpackColorSpace()}},$c=1/120,el=.1,tl=12,nl=0,rl=class{constructor({step:e,frame:t}){this.stepFn=e,this.frameFn=t,this.running=!1,this.rafId=0,this.lastTime=0,this.acc=0,this.hidden=typeof document<`u`&&document.hidden,this.frameCount=0,this._tick=this._tick.bind(this),this._onVisibility=this._onVisibility.bind(this),document.addEventListener(`visibilitychange`,this._onVisibility)}start(){this.running||(this.running=!0,nl++,this.lastTime=-1,this.acc=0,this.hidden||(this.rafId=requestAnimationFrame(this._tick)))}stop(){this.running&&(this.running=!1,nl--,this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=0)}resetClock(){this.lastTime=-1,this.acc=0}_onVisibility(){this.hidden=document.hidden,this.running&&(this.hidden?(this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=0):this.rafId||=(this.lastTime=-1,requestAnimationFrame(this._tick)))}_tick(e){if(this.rafId=0,!this.running||this.hidden)return;this.rafId=requestAnimationFrame(this._tick);let t=this.lastTime<0?$c:(e-this.lastTime)/1e3;this.lastTime=e,t>el&&(t=el),t<0&&(t=0),this.acc+=t;let n=0;for(;this.acc>=.008333333333333333&&n<tl;)this.stepFn($c),this.acc-=$c,n++;n===tl&&(this.acc=0),this.frameCount++,this.frameFn(this.acc/$c,t,e)}dispose(){this.stop(),document.removeEventListener(`visibilitychange`,this._onVisibility)}static get activeLoops(){return nl}};Object.freeze([`boot`,`menu`,`garage`,`select`,`loading`,`countdown`,`racing`,`paused`,`results`,`error`]);var il=Object.freeze({boot:[`menu`,`error`],menu:[`garage`,`select`,`loading`,`error`],garage:[`menu`,`select`,`error`],select:[`menu`,`garage`,`loading`,`error`],loading:[`countdown`,`menu`,`error`],countdown:[`racing`,`paused`,`countdown`,`menu`,`error`],racing:[`paused`,`results`,`countdown`,`menu`,`error`],paused:[`racing`,`countdown`,`menu`,`error`],results:[`countdown`,`loading`,`menu`,`select`,`garage`,`error`],error:[`menu`,`boot`]});function al(e,t){let n=il[e];return!!n&&n.includes(t)}var ol=class{constructor(e={}){this.state={phase:`boot`,prevPhase:null,screen:`main`,mode:`campaign`,levelId:null,trackId:`beginner`,variant:`grandprix`,difficulty:`medium`,laps:3,error:null,...e},this.listeners=new Set,this.history=[]}get phase(){return this.state.phase}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}go(e,t=null){let n=this.state.phase;if(n!==e&&!al(n,e))throw Error(`Illegal phase transition ${n} -> ${e}`);if(n===e&&!al(n,e)&&!t)return!1;let r=this.state;return this.state={...r,...t,phase:e,prevPhase:n},this.history.push(e),this.history.length>64&&this.history.shift(),this._emit(r),!0}set(e){if(`phase`in e)throw Error(`Use go() to change phase`);let t=this.state;this.state={...t,...e},this._emit(t)}_emit(e){for(let t of this.listeners)t(this.state,e)}},sl=Object.freeze({low:{id:`low`,pixelRatioCap:1,shadows:!1,shadowSize:512,particles:120,skidMarks:300,drawDistance:.7,propDensity:.55,antialias:!1},medium:{id:`medium`,pixelRatioCap:1.5,shadows:!0,shadowSize:1024,particles:260,skidMarks:600,drawDistance:.85,propDensity:.8,antialias:!0},high:{id:`high`,pixelRatioCap:2,shadows:!0,shadowSize:2048,particles:400,skidMarks:1e3,drawDistance:1,propDensity:1,antialias:!0}}),cl=[`low`,`medium`,`high`],ll=class{constructor(e=`high`,t=!0){this.setPreset(e),this.adaptive=t,this.avgMs=16.7,this.overBudgetTime=0,this.underBudgetTime=0,this.pixelRatio=1,this.listeners=new Set}setPreset(e){this.preset=sl[e]||sl.high,this.id=this.preset.id,this.dynamicScale=1}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}computePixelRatio(){let e=typeof window<`u`&&window.devicePixelRatio||1;return this.pixelRatio=Math.max(.5,Math.min(e,2,this.preset.pixelRatioCap)*this.dynamicScale),this.pixelRatio}sample(e,t){if(!this.adaptive||e>250)return!1;this.avgMs+=(e-this.avgMs)*Math.min(1,t*2);let n=1e3/58;if(this.avgMs>n*1.12?(this.overBudgetTime+=t,this.underBudgetTime=0):this.avgMs<n*.75?(this.underBudgetTime+=t,this.overBudgetTime=0):(this.overBudgetTime=0,this.underBudgetTime=0),this.overBudgetTime>2){if(this.overBudgetTime=0,this.dynamicScale>.65)this.dynamicScale=Math.max(.6,this.dynamicScale-.15);else{let e=cl.indexOf(this.id);if(e<=0)return!1;this.setPreset(cl[e-1])}return this._emit(),!0}return this.underBudgetTime>6&&this.dynamicScale<1&&(this.underBudgetTime=0,this.dynamicScale=Math.min(1,this.dynamicScale+.1),this._emit(),!0)}_emit(){for(let e of this.listeners)e(this)}},ul=`apexgp.save`;function dl(){return{version:2,carId:`falcon`,livery:{falcon:`ember`},settings:{quality:`high`,adaptiveQuality:!0,master:.8,sfx:.9,music:.5,muted:!1,camera:`chase`,units:`kmh`,assists:`medium`,handling:`arcade`,playerName:`Driver`,showMinimap:!0,freePlay:!1,bindings:null},stars:{},cups:{},bestLaps:{},bestDrift:{},bestSplits:{},ghosts:{},records:{races:0,wins:0,distance:0,longestDrift:0},unlockedCars:[`falcon`,`viper`,`comet`],unlockedLiveries:[`ember`,`glacier`,`volt`,`graphite`],seenIntro:!1}}var fl=e=>typeof e==`object`&&!!e&&!Array.isArray(e),pl=(e,t,n,r)=>typeof e==`number`&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):r,ml=(e,t,n)=>t.includes(e)?e:n,hl=(e,t)=>typeof e==`boolean`?e:t;function gl(e,t,n){let r={};if(!fl(e))return r;for(let i of Object.keys(e)){if(typeof i!=`string`||i.length>64)continue;let a=e[i];typeof a==`number`&&Number.isFinite(a)&&a>=t&&a<=n&&(r[i]=a)}return r}function _l(e){let t={};if(!fl(e))return t;for(let n of Object.keys(e)){let r=e[n];if(!fl(r)||!fl(r.lap)||typeof r.time!=`number`||!Number.isFinite(r.time))continue;let i=r.lap;!Array.isArray(i.data)||typeof i.count!=`number`||i.count<2||i.count>6e3||i.data.length!==i.count*4||i.data.every(e=>typeof e==`number`&&Number.isFinite(e))&&(t[n]={lap:{rate:typeof i.rate==`number`?i.rate:20,count:i.count,data:i.data},time:r.time,carId:typeof r.carId==`string`?r.carId:null,livery:typeof r.livery==`string`?r.livery:null})}return t}function vl(e){let t={};if(!fl(e))return t;for(let n of Object.keys(e)){let r=e[n];Array.isArray(r)&&r.length<=64&&r.every(e=>typeof e==`number`&&Number.isFinite(e)&&e>=0&&e<36e3)&&(t[n]=r.slice())}return t}function yl(e,t){if(!Array.isArray(e))return t.slice();let n=e.filter(e=>typeof e==`string`&&e.length<32);for(let e of t)n.includes(e)||n.push(e);return n}function bl(e){let t=dl();if(!fl(e))return t;let n=fl(e.settings)?e.settings:{},r={version:2,carId:typeof e.carId==`string`?e.carId:t.carId,livery:{},settings:{quality:ml(n.quality,[`low`,`medium`,`high`],t.settings.quality),adaptiveQuality:hl(n.adaptiveQuality,t.settings.adaptiveQuality),master:pl(n.master,0,1,t.settings.master),sfx:pl(n.sfx,0,1,t.settings.sfx),music:pl(n.music,0,1,t.settings.music),muted:hl(n.muted,t.settings.muted),camera:ml(n.camera,[`chase`,`close`,`cockpit`,`tv`],t.settings.camera),units:ml(n.units,[`kmh`,`mph`],t.settings.units),assists:ml(n.assists,[`easy`,`medium`,`hard`],t.settings.assists),handling:ml(n.handling,[`arcade`,`sim`],t.settings.handling),playerName:typeof n.playerName==`string`&&n.playerName.trim()?n.playerName.slice(0,14):t.settings.playerName,showMinimap:hl(n.showMinimap,t.settings.showMinimap),freePlay:hl(n.freePlay,t.settings.freePlay),bindings:fl(n.bindings)?xl(n.bindings):null},stars:gl(e.stars,0,3),cups:{},bestLaps:gl(e.bestLaps,1,36e3),bestDrift:gl(e.bestDrift,0,1e9),bestSplits:vl(e.bestSplits),ghosts:_l(e.ghosts),records:{races:pl(e.records&&e.records.races,0,1e9,0),wins:pl(e.records&&e.records.wins,0,1e9,0),distance:pl(e.records&&e.records.distance,0,0xe8d4a51000,0),longestDrift:pl(e.records&&e.records.longestDrift,0,1e9,0)},unlockedCars:yl(e.unlockedCars,t.unlockedCars),unlockedLiveries:yl(e.unlockedLiveries,t.unlockedLiveries),seenIntro:hl(e.seenIntro,!1)};for(let e of Object.keys(r.stars))r.stars[e]=Math.round(r.stars[e]);if(fl(e.cups))for(let t of Object.keys(e.cups))e.cups[t]===!0&&(r.cups[t]=!0);if(fl(e.livery))for(let t of Object.keys(e.livery))typeof e.livery[t]==`string`&&(r.livery[t]=e.livery[t]);return r}function xl(e){let t={};for(let n of Object.keys(e))Array.isArray(e[n])&&(t[n]=e[n].filter(e=>typeof e==`string`&&e.length<24).slice(0,3));return t}var Sl=class e{constructor(t){this.storage=t===void 0?e.probeStorage():t,this.available=!!this.storage,this.data=dl(),this.loadError=null,this.listeners=new Set}static probeStorage(){try{let e=window.localStorage,t=`__apexgp_probe__`;return e.setItem(t,`1`),e.removeItem(t),e}catch{return null}}load(){if(!this.storage)return this.data=dl(),this.data;let e=null;try{e=this.storage.getItem(ul)}catch{return this.loadError=`read-failed`,this.available=!1,this.data=dl(),this.data}if(e===null)return this.data=dl(),this.data;try{this.data=bl(JSON.parse(e))}catch{this.loadError=`corrupt`,this.data=dl(),this.save()}return this.data}save(){if(!this.storage)return!1;try{return this.storage.setItem(ul,JSON.stringify(this.data)),!0}catch{return this.available=!1,!1}}update(e){e(this.data),this.save();for(let e of this.listeners)e(this.data)}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}reset(){let e=this.data.settings;this.data=dl(),this.data.settings=e,this.save();for(let e of this.listeners)e(this.data)}},Cl=Object.freeze({throttle:[`KeyW`,`ArrowUp`],brake:[`KeyS`,`ArrowDown`],left:[`KeyA`,`ArrowLeft`],right:[`KeyD`,`ArrowRight`],handbrake:[`Space`],boost:[`ShiftLeft`,`ShiftRight`,`KeyN`],speedbreak:[`KeyQ`],camera:[`KeyC`],reset:[`KeyR`,`Backspace`],pause:[`Escape`,`KeyP`],mute:[`KeyM`],debug:[`F3`]}),wl=Object.freeze({throttle:`Throttle`,brake:`Brake / reverse`,left:`Steer left`,right:`Steer right`,handbrake:`Handbrake / drift`,boost:`Nitro (hold)`,speedbreak:`Speedbreaker`,camera:`Camera`,reset:`Reset (hold: restart)`,pause:`Pause`,mute:`Mute`,debug:`Debug overlay`}),Tl=[`throttle`,`brake`,`left`,`right`,`handbrake`,`boost`,`speedbreak`,`camera`,`reset`],El=Object.freeze({kbA:{throttle:[`KeyW`],brake:[`KeyS`],left:[`KeyA`],right:[`KeyD`],handbrake:[`Space`],boost:[`ShiftLeft`],camera:[`KeyC`],reset:[`KeyR`]},kbB:{throttle:[`ArrowUp`],brake:[`ArrowDown`],left:[`ArrowLeft`],right:[`ArrowRight`],handbrake:[`ControlRight`,`Numpad0`],boost:[`ShiftRight`,`Enter`],camera:[`Slash`],reset:[`Period`]}}),Dl=Object.freeze({all:`Keyboard / pad`,kbA:`Keyboard WASD`,kbB:`Keyboard arrows`,pad0:`Gamepad 1`,pad1:`Gamepad 2`,pad2:`Gamepad 3`,pad3:`Gamepad 4`}),Ol={A:0,B:1,X:2,Y:3,LB:4,RB:5,LT:6,RT:7,BACK:8,START:9,UP:12,DOWN:13,LEFT:14,RIGHT:15},kl=.15,Al=4;function jl(e){return e?e.startsWith(`Key`)?e.slice(3):e.startsWith(`Digit`)?e.slice(5):{ArrowUp:`↑`,ArrowDown:`↓`,ArrowLeft:`←`,ArrowRight:`→`,Space:`Space`,ShiftLeft:`Shift`,ShiftRight:`R-Shift`,Escape:`Esc`,Backspace:`Bksp`,Enter:`Enter`,ControlLeft:`Ctrl`,ControlRight:`R-Ctrl`,AltLeft:`Alt`,Tab:`Tab`,Slash:`/`,Period:`.`,Numpad0:`Num0`}[e]||e:`—`}function Ml(){return{connected:!1,throttle:0,brake:0,steer:0,handbrake:!1,boost:!1,resetHeld:!1,prev:[],prevStick:null}}var Nl=class{constructor(e=window){this.target=e,this.down=new Set,this.pressQueue=new Map,this.devicePress=new Map,this.holdStart=new Map,this.time=0,this.enabled=!0,this.captureNext=null,this.setBindings(null),this.state={throttle:0,brake:0,steer:0,handbrake:!1,boost:!1},this.touch={throttle:0,brake:0,left:0,right:0,handbrake:!1,boost:!1},this.pads=Array.from({length:Al},Ml),this.gamepad=this.pads[0],this.devStates=new Map,this.navQueue=[],this.lastDevice=`keyboard`,this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._onBlur=this._onBlur.bind(this),this._onVisibility=this._onVisibility.bind(this),e.addEventListener(`keydown`,this._onKeyDown),e.addEventListener(`keyup`,this._onKeyUp),window.addEventListener(`blur`,this._onBlur),document.addEventListener(`visibilitychange`,this._onVisibility),this.splitCodes=new Map;for(let e of Object.keys(El))for(let t of Object.keys(El[e]))for(let n of El[e][t])this.splitCodes.has(n)||this.splitCodes.set(n,[]),this.splitCodes.get(n).push([e,t])}setBindings(e){let t={};for(let e of Object.keys(Cl))t[e]=Cl[e].slice();if(e)for(let n of Tl)Array.isArray(e[n])&&e[n].length&&(t[n]=e[n].slice(0,3));this.bindings=t,this.codeToActions=new Map;for(let e of Object.keys(t))for(let n of t[e])this.codeToActions.has(n)||this.codeToActions.set(n,[]),this.codeToActions.get(n).push(e)}static get rebindable(){return Tl}captureKey(e){this.captureNext=e}_onKeyDown(e){if(this.captureNext){e.preventDefault();let t=this.captureNext;this.captureNext=null,t(e.code===`Escape`?null:e.code);return}let t=e.target&&e.target.tagName;if(t===`INPUT`||t===`TEXTAREA`||t===`SELECT`)return;this.lastDevice=`keyboard`;let n=this.codeToActions.get(e.code),r=this.splitCodes.get(e.code);if((n||r)&&(this.enabled&&(e.code.startsWith(`Arrow`)||e.code===`Space`||e.code===`Backspace`||e.code===`F3`||e.code===`Slash`)&&e.preventDefault(),!e.repeat&&!this.down.has(e.code))){if(this.down.add(e.code),n)for(let e of n)this._press(e);if(r)for(let[e,t]of r)this._pressDevice(e,t)}}_onKeyUp(e){if(!this.down.has(e.code))return;this.down.delete(e.code);let t=this.codeToActions.get(e.code);if(t)for(let e of t)this._held(e)||this.holdStart.delete(e)}_press(e){this.pressQueue.set(e,(this.pressQueue.get(e)||0)+1),this.holdStart.has(e)||this.holdStart.set(e,this.time)}_pressDevice(e,t){let n=`${e}:${t}`;this.devicePress.set(n,(this.devicePress.get(n)||0)+1)}_held(e){let t=this.bindings[e];if(t){for(let e of t)if(this.down.has(e))return!0}return!1}_onBlur(){this.releaseAll()}_onVisibility(){document.hidden&&this.releaseAll()}releaseAll(){this.down.clear(),this.holdStart.clear(),this.pressQueue.clear(),this.devicePress.clear();for(let e of Object.keys(this.touch))this.touch[e]=typeof this.touch[e]!=`boolean`&&0;let e=this.state;e.throttle=0,e.brake=0,e.steer=0,e.handbrake=!1,e.boost=!1;for(let e of this.devStates.values())e.throttle=e.brake=e.steer=0,e.handbrake=e.boost=!1}consume(e){return this.pressQueue.get(e)?(this.pressQueue.delete(e),!0):!1}consumeDevice(e,t){let n=`${e}:${t}`;return this.devicePress.get(n)?(this.devicePress.delete(n),!0):!1}clearPresses(){this.pressQueue.clear(),this.devicePress.clear()}isHeld(e){return this._held(e)||e===`reset`&&this.gamepad.resetHeld}heldFor(e){if(!this.isHeld(e))return 0;let t=this.holdStart.get(e);return t===void 0?0:this.time-t}consumeNav(){return this.navQueue.length?this.navQueue.shift():null}get padCount(){let e=0;for(let t of this.pads)t.connected&&e++;return e}poll(e){this.time+=e,this._pollGamepads();let t=e=>+!!this._held(e),n=null;for(let e of this.pads)if(e.connected){n=e;break}this.gamepad=n||this.pads[0];let r=this.gamepad,i=this.touch,a=t(`right`)-t(`left`),o=i.right-i.left,s=a||o;Math.abs(r.steer)>Math.abs(s)&&(s=r.steer);let c=this.state;return c.throttle=Math.max(t(`throttle`),i.throttle,r.throttle),c.brake=Math.max(t(`brake`),i.brake,r.brake),c.steer=Math.max(-1,Math.min(1,s)),c.handbrake=!!(t(`handbrake`)||i.handbrake||r.handbrake),c.boost=!!(t(`boost`)||i.boost||r.boost),this.enabled||(c.throttle=0,c.brake=0,c.steer=0,c.handbrake=!1,c.boost=!1),c}deviceState(e){if(e===`all`||!e)return this.state;let t=this.devStates.get(e);t||this.devStates.set(e,t={throttle:0,brake:0,steer:0,handbrake:!1,boost:!1});let n=El[e];if(n){let e=e=>{for(let t of n[e])if(this.down.has(t))return 1;return 0};t.throttle=e(`throttle`),t.brake=e(`brake`),t.steer=e(`right`)-e(`left`),t.handbrake=!!e(`handbrake`),t.boost=!!e(`boost`)}else if(e.startsWith(`pad`)){let n=this.pads[Number(e.slice(3))]||Ml();t.throttle=n.throttle,t.brake=n.brake,t.steer=n.steer,t.handbrake=n.handbrake,t.boost=n.boost}return this.enabled||(t.throttle=t.brake=t.steer=0,t.handbrake=t.boost=!1),t}_pollGamepads(){let e=null;try{e=navigator.getGamepads?navigator.getGamepads():null}catch{e=null}let t=[];if(e)for(let n of e)n&&n.connected&&t.push(n);for(let e=0;e<Al;e++){let n=this.pads[e],r=t[e];if(!r){n.connected=!1,n.throttle=n.brake=n.steer=0,n.handbrake=n.boost=!1,n.resetHeld=!1;continue}n.connected=!0;let i=e=>r.buttons[e]?r.buttons[e].value||+!!r.buttons[e].pressed:0,a=e=>!!(r.buttons[e]&&r.buttons[e].pressed),o=r.axes[0]||0,s=Math.abs(o);o=s<kl?0:Math.sign(o)*(s-kl)/.85,n.steer+=(o-n.steer)*.5,Math.abs(n.steer)<.01&&(n.steer=0),n.throttle=i(Ol.RT),n.brake=i(Ol.LT),n.handbrake=a(Ol.A),n.boost=a(Ol.X)||a(Ol.RB),n.resetHeld=a(Ol.Y);let c=`pad${e}`,l=[[Ol.B,`camera`],[Ol.START,`pause`],[Ol.Y,`reset`],[Ol.BACK,`mute`],[Ol.LB,`speedbreak`]],u=n.prev;for(let[e,t]of l)a(e)&&!u[e]&&(this._press(t),this._pressDevice(c,t),this.lastDevice=`gamepad`),!a(e)&&u[e]&&t===`reset`&&this.holdStart.delete(`reset`);if(e===0||t.length===1){let e=[[Ol.UP,`up`],[Ol.DOWN,`down`],[Ol.LEFT,`left`],[Ol.RIGHT,`right`],[Ol.A,`confirm`],[Ol.B,`back`]];for(let[t,n]of e)a(t)&&!u[t]&&this.navQueue.push(n);let t=r.axes[1]||0,i=Math.abs(t)>.6?t<0?`up`:`down`:Math.abs(r.axes[0]||0)>.6?(r.axes[0]||0)<0?`left`:`right`:null;i&&i!==n.prevStick&&this.navQueue.push(i),n.prevStick=i}this.navQueue.length>8&&this.navQueue.splice(0,this.navQueue.length-8);for(let e=0;e<r.buttons.length;e++)u[e]=a(e)}}rumble(e,t,n,r=-1){try{let i=navigator.getGamepads?navigator.getGamepads():[],a=0;for(let o of i)o&&o.connected&&((r<0||r===a)&&o.vibrationActuator&&o.vibrationActuator.playEffect&&o.vibrationActuator.playEffect(`dual-rumble`,{duration:n,strongMagnitude:e,weakMagnitude:t}).catch(()=>{}),a++)}catch{}}dispose(){this.target.removeEventListener(`keydown`,this._onKeyDown),this.target.removeEventListener(`keyup`,this._onKeyUp),window.removeEventListener(`blur`,this._onBlur),document.removeEventListener(`visibilitychange`,this._onVisibility)}};function Pl(){try{return window.matchMedia(`(pointer: coarse)`).matches||navigator.maxTouchPoints>0}catch{return!1}}var Fl=e=>440*2**((e-69)/12),Il=class{constructor(e){this.ctx=null,this.settings={master:.8,sfx:.9,music:.5,muted:!1,...e},this.engine=null,this.music=null,this.musicOn=!1,this.paused=!1,this.noiseBuffer=null,this.lastPlay=Object.create(null),this.unlocked=!1,this._unlock=this._unlock.bind(this),window.addEventListener(`pointerdown`,this._unlock,!0),window.addEventListener(`keydown`,this._unlock,!0)}_unlock(e){if(!e||e.isTrusted){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{this.ctx=null;return}this._buildGraph()}this.ctx.state===`suspended`&&!this.paused&&this.ctx.resume().catch(()=>{}),this.unlocked=!0,this.wantMusic&&!this.music&&this.startMusic(),this.wantEngine&&!this.engine&&this._startEngine()}}_buildGraph(){let e=this.ctx;this.master=e.createGain(),this.sfxBus=e.createGain(),this.musicBus=e.createGain(),this.sfxBus.connect(this.master),this.musicBus.connect(this.master),this.master.connect(e.destination),this.applyVolumes();let t=e.sampleRate*1;this.noiseBuffer=e.createBuffer(1,t,e.sampleRate);let n=this.noiseBuffer.getChannelData(0),r=12345;for(let e=0;e<t;e++)r=r*16807%2147483647,n[e]=r/2147483647*2-1}setVolumes(e){Object.assign(this.settings,e),this.applyVolumes()}applyVolumes(){if(!this.ctx)return;let e=this.ctx.currentTime,t=this.settings,n=t.muted||this.paused?0:t.master;this.master.gain.setTargetAtTime(n,e,.03),this.sfxBus.gain.setTargetAtTime(t.sfx,e,.03),this.musicBus.gain.setTargetAtTime(t.music*.6,e,.05)}toggleMute(){return this.settings.muted=!this.settings.muted,this.applyVolumes(),this.settings.muted}setPaused(e){this.paused=e,this.applyVolumes(),this.ctx&&(e?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{}))}startRace(){this.stopMusic(),this.wantEngine=!0,this.ctx&&!this.engine&&this._startEngine()}_startEngine(){let e=this.ctx,t=e.createGain();t.gain.value=0,t.connect(this.sfxBus);let n=e.createBiquadFilter();n.type=`lowpass`,n.frequency.value=900,n.Q.value=3,n.connect(t);let r=e.createOscillator();r.type=`sawtooth`;let i=e.createOscillator();i.type=`square`;let a=e.createOscillator();a.type=`triangle`;let o=e.createGain();o.gain.value=.5;let s=e.createGain();s.gain.value=.22;let c=e.createGain();c.gain.value=.4,r.connect(o).connect(n),i.connect(s).connect(n),a.connect(c).connect(n);let l=e.createBufferSource();l.buffer=this.noiseBuffer,l.loop=!0;let u=e.createBiquadFilter();u.type=`bandpass`,u.frequency.value=1800,u.Q.value=6;let d=e.createGain();d.gain.value=0,l.connect(u).connect(d).connect(this.sfxBus);let f=e.createBufferSource();f.buffer=this.noiseBuffer,f.loop=!0;let p=e.createBiquadFilter();p.type=`lowpass`,p.frequency.value=500;let m=e.createGain();m.gain.value=0,f.connect(p).connect(m).connect(this.sfxBus),r.start(),i.start(),a.start(),l.start(),f.start(),this.engine={out:t,filter:n,o1:r,o2:i,o3:a,sq:l,sqf:u,sqg:d,rd:f,rdf:p,rdg:m,nodes:[t,n,r,i,a,o,s,c,l,u,d,f,p,m]}}updateCar(e,t,n=1){let r=this.engine;if(!r||!this.ctx||this.paused)return;let i=this.ctx.currentTime,a=e.rpm,o=(34+a/12500*150)*(.55+.45*n);r.o1.frequency.setTargetAtTime(o,i,.03),r.o2.frequency.setTargetAtTime(o*2.01,i,.03),r.o3.frequency.setTargetAtTime(o*.5,i,.03);let s=t?e.throttle*.6:e.throttle;r.filter.frequency.setTargetAtTime(500+s*2400+a/12500*900,i,.05),r.out.gain.setTargetAtTime(.07+s*.09+(e.boostTime>0||e.nitroActive?.05:0),i,.05);let c=Math.min(1,e.skid)*+(e.u>6);r.sqg.gain.setTargetAtTime(c*.16,i,.05),r.sqf.frequency.setTargetAtTime(1500+Math.abs(e.slip)*900,i,.08),r.rdg.gain.setTargetAtTime(Math.min(.12,e.speed/700),i,.1),r.rdf.frequency.setTargetAtTime(300+e.speed*12,i,.1)}stopRace(){this.wantEngine=!1;let e=this.engine;if(e){for(let t of e.nodes){try{t.stop&&t.stop()}catch{}t.disconnect()}this.engine=null}}_env(e,t,n,r,i){e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(r,t+n),e.gain.exponentialRampToValueAtTime(1e-4,t+n+i)}_tone(e,t,n,r,i=0,a=0){let o=this.ctx,s=o.currentTime+i,c=o.createOscillator();c.type=e,c.frequency.setValueAtTime(t,s),a&&c.frequency.exponentialRampToValueAtTime(a,s+n);let l=o.createGain();this._env(l,s,.005,r,n),c.connect(l).connect(this.sfxBus),c.start(s),c.stop(s+n+.05),c.onended=()=>{c.disconnect(),l.disconnect()}}_noise(e,t,n,r=1,i=`lowpass`,a=0,o=0){let s=this.ctx,c=s.currentTime+a,l=s.createBufferSource();l.buffer=this.noiseBuffer;let u=s.createBiquadFilter();u.type=i,u.frequency.setValueAtTime(n,c),o&&u.frequency.exponentialRampToValueAtTime(o,c+e),u.Q.value=r;let d=s.createGain();this._env(d,c,.004,t,e),l.connect(u).connect(d).connect(this.sfxBus),l.start(c,Math.random()*.5),l.stop(c+e+.05),l.onended=()=>{l.disconnect(),u.disconnect(),d.disconnect()}}play(e,t=1){if(!this.ctx||this.paused||this.ctx.state!==`running`)return;let n=this.ctx.currentTime;if(n-(this.lastPlay[e]||0)<.04)return;this.lastPlay[e]=n;let r=Math.max(.1,Math.min(1,t));switch(e){case`click`:this._tone(`square`,1800,.03,.05);break;case`hover`:this._tone(`square`,1200,.02,.025);break;case`beep`:this._tone(`sine`,660,.22,.25);break;case`go`:this._tone(`sine`,1320,.5,.3),this._tone(`triangle`,660,.5,.15);break;case`thud`:this._tone(`sine`,90,.25,.5*r,0,45),this._noise(.18,.35*r,900);break;case`thudSoft`:this._tone(`sine`,120,.2,.35*r,0,70),this._noise(.12,.12*r,500);break;case`cone`:this._tone(`square`,520,.06,.12),this._tone(`square`,780,.05,.08,.04);break;case`boost`:this._noise(.6,.25,400,2,`bandpass`,0,3200);break;case`lap`:this._tone(`sine`,Fl(76),.18,.2),this._tone(`sine`,Fl(83),.3,.2,.14);break;case`bank`:this._tone(`triangle`,Fl(72),.1,.12),this._tone(`triangle`,Fl(76),.1,.12,.07),this._tone(`triangle`,Fl(79),.18,.12,.14);break;case`warn`:this._tone(`square`,330,.12,.1),this._tone(`square`,330,.12,.1,.18);break;case`token`:this._tone(`sine`,Fl(88),.15,.18),this._tone(`sine`,Fl(93),.2,.15,.06);break;case`finish`:for(let[e,t]of[[72,0],[76,.12],[79,.24],[84,.36]])this._tone(`triangle`,Fl(e),.5,.15,t)}}startMusic(){this.wantMusic=!0,this.ctx&&!this.music&&(this.music={nextTime:this.ctx.currentTime+.1,step:0,nodes:new Set})}stopMusic(){if(this.wantMusic=!1,this.music){for(let e of this.music.nodes)try{e.stop()}catch{}this.music=null}}update(){let e=this.music;if(!e||!this.ctx||this.paused||this.ctx.state!==`running`)return;let t=this.ctx,n=.5,r=[[57,60,64],[53,57,60],[55,59,62],[52,55,59]];for(;e.nextTime<t.currentTime+.3;){let t=e.nextTime,i=r[Math.floor(e.step/8)%r.length];if(e.step%8==0)for(let e of i)this._musicNote(`sine`,Fl(e),t,n*7.5,.05);if(e.step%2==0){let r=i[e.step/2%3]+12;this._musicNote(`triangle`,Fl(r),t,n*.9,.035)}e.step++,e.nextTime+=n}}_musicNote(e,t,n,r,i){let a=this.ctx,o=a.createOscillator();o.type=e,o.frequency.value=t;let s=a.createGain();s.gain.setValueAtTime(1e-4,n),s.gain.exponentialRampToValueAtTime(i,n+Math.min(.4,r*.2)),s.gain.exponentialRampToValueAtTime(1e-4,n+r),o.connect(s).connect(this.musicBus),o.start(n),o.stop(n+r+.05);let c=this.music.nodes;c.add(o),o.onended=()=>{c.delete(o),o.disconnect(),s.disconnect()}}dispose(){this.stopRace(),this.stopMusic(),window.removeEventListener(`pointerdown`,this._unlock,!0),window.removeEventListener(`keydown`,this._unlock,!0),this.ctx&&this.ctx.close().catch(()=>{})}},Ll=9.81,J=Object.freeze({wheelbase:3.4,cgToFront:1.75,cgToRear:1.65,cgHeight:.32,muBase:1.55,corneringFront:9.5,corneringRear:11.5,tyreFalloff:.18,lowSpeedBlend:5,steerLockLow:.52,steerSpeedFalloff:26,steerLockMin:.13,steerRate:4.2,steerReturn:6.5,visualSteerClamp:25*Math.PI/180,rolling:.35,aeroDrag:55e-5,reverseMax:13,reverseAccel:6,engineBrake:1.2,shiftTime:.07,gearRatios:[.24,.37,.5,.62,.74,.87,1.04],idleRpm:4200,maxRpm:12500,handbrakeRearGrip:.36,handbrakeYaw:3.2,handbrakeDecel:2.6,driftEnterAngle:13*Math.PI/180,driftExitAngle:6*Math.PI/180,driftExitDelay:.22,driftMinSpeed:11,driftRearGrip:.74,driftThrottleThrust:3.2,assist:{easy:{hold:7,maxAngle:50*Math.PI/180,spin:22},medium:{hold:4.5,maxAngle:60*Math.PI/180,spin:14},hard:{hold:2.2,maxAngle:75*Math.PI/180,spin:7}},arcadeGrip:1.12,arcadeAngle:.38,arcadeAngleSteer:.26,arcadeAngleRate:6,arcadeRecover:7,arcadeExitDelay:.18,arcadeScrub:7,arcadeDrive:.5,brakeTapWindow:.45,nitroStart:.5,nitroAccel:10,nitroTopSpeedBonus:1.14,nitroBurn:.3,nitroDriftFill:.3,nitroSpeedFill:.02,nitroDraftFill:.08,nitroNearMiss:.08,speedbreakScale:.45,speedbreakDrain:.22,speedbreakFill:.035,speedbreakGrip:1.25,boostAccel:9.5,boostTopSpeedBonus:1.12,padBoostDuration:1.1,padBoostAccel:12,slipstreamAccel:1.4,wallRestitution:.15,wallFriction:.12,wallSpeedLoss:.35,stuckSpeed:2.5,stuckTime:3}),Rl=Object.freeze({asphalt:{id:`asphalt`,grip:1,drag:0,bump:0},kerb:{id:`kerb`,grip:.94,drag:.3,bump:.035},grass:{id:`grass`,grip:.58,drag:5.5,bump:.02},sand:{id:`sand`,grip:.5,drag:11,bump:.03},oil:{id:`oil`,grip:.22,drag:0,bump:0}});function zl(e){let t=t=>Math.max(1,Math.min(10,e[t]||5)),n=t(`acceleration`),r=t(`topSpeed`),i=t(`braking`),a=t(`handling`),o=t(`downforce`),s=t(`drift`);return{maxAccel:8.2+n*.62,vTop:69+r*2,brakeDecel:17+i*1.6,mu:J.muBase*(.9+a*.022),steerRateMul:.85+a*.035,downforce:4e-5+o*16e-6,driftEnter:J.driftEnterAngle*(1.18-s*.03),driftRearGrip:J.driftRearGrip*(1.06-s*.018),driftStab:.8+s*.05,driftAngleMul:.9+s*.025,driftBoostGain:.18+s*.022,powerOversteer:.25+n*.05}}var Bl=Object.freeze({width:1.8,length:4.2,height:.95,wheelbase:3.4,frontAxle:1.75,rearAxle:1.65,track:1.5,wheelRadius:.34,wheelWidth:.34}),Vl=.8,Hl=Bl.width*Vl/2,Ul=Bl.length*Vl/2;Math.hypot(Bl.width/2,Bl.length/2);var Wl=Object.freeze({cone:{radius:.22,height:.6,mass:3},tyreStack:{radius:.45,height:.9},block:{width:1.2,length:2.4,height:.9},barrel:{radius:.4,height:.9},gate:{width:.5,length:6,height:1.2},truck:{width:2.5,length:8,height:3.2},oil:{radius:3.2},boostPad:{width:3.6,length:6},token:{radius:.9}}),Gl=Object.freeze({height:1.1,thickness:1,segment:4}),Kl=Object.freeze({width:1.4,height:.06,block:2}),ql=Math.PI*2;function Jl(e,t=48){let n=e.length,r=[];for(let i=0;i<n;i++){let a=e[(i-1+n)%n],o=e[i],s=e[(i+1)%n],c=e[(i+2)%n],l=(e,t)=>Math.max(1e-4,Math.hypot(t[0]-e[0],t[1]-e[1])**.5),u=0+l(a,o),d=u+l(o,s),f=d+l(s,c);for(let e=0;e<t;e++){let n=u+(d-u)*e/t,i=[0,0];for(let e=0;e<2;e++){let t=(u-n)/(u-0)*a[e]+(n-0)/(u-0)*o[e],r=(d-n)/(d-u)*o[e]+(n-u)/(d-u)*s[e],l=(f-n)/(f-d)*s[e]+(n-d)/(f-d)*c[e],p=(d-n)/(d-0)*t+(n-0)/(d-0)*r,m=(f-n)/(f-u)*r+(n-u)/(f-u)*l;i[e]=(d-n)/(d-u)*p+(n-u)/(d-u)*m}r.push(i)}}return r}function Yl(e,t,n){if(e==null)return n;if(typeof e==`number`)return e;let r=e.length;if(r===0)return n;if(r===1)return e[0][1];t=(t%1+1)%1;let i=r-1;for(let n=0;n<r;n++)if(e[n][0]>t){i=n-1;break}let a=e[(i+r)%r],o=e[(i+1)%r],s=a[0],c=o[0];i<0&&--s,c<=s&&(c+=1);let l=(t-s)/(c-s);return l<0&&(l+=1),l=Math.max(0,Math.min(1,l)),l=l*l*(3-2*l),a[1]+(o[1]-a[1])*l}var Xl=class{constructor(e){this.def=e;let t=Jl(e.points),n=[0];for(let e=1;e<=t.length;e++){let r=t[e-1],i=t[e%t.length];n.push(n[e-1]+Math.hypot(i[0]-r[0],i[1]-r[1]))}let r=n[t.length],i=Math.max(64,Math.round(r/1));this.n=i,this.length=r,this.ds=r/i,this.px=new Float32Array(i),this.pz=new Float32Array(i),this.py=new Float32Array(i),this.tx=new Float32Array(i),this.tz=new Float32Array(i),this.kappa=new Float32Array(i),this.width=new Float32Array(i),this.bank=new Float32Array(i),this.slope=new Float32Array(i),this.kerbL=new Uint8Array(i),this.kerbR=new Uint8Array(i),this.sandL=new Uint8Array(i),this.sandR=new Uint8Array(i);let a=0;for(let e=0;e<i;e++){let r=e*this.ds;for(;n[a+1]<r;)a++;let i=t[a],o=t[(a+1)%t.length],s=(r-n[a])/Math.max(1e-9,n[a+1]-n[a]);this.px[e]=i[0]+(o[0]-i[0])*s,this.pz[e]=i[1]+(o[1]-i[1])*s}for(let e=0;e<i;e++){let t=(e-1+i)%i,n=(e+1)%i,r=this.px[n]-this.px[t],a=this.pz[n]-this.pz[t],o=Math.hypot(r,a)||1;this.tx[e]=r/o,this.tz[e]=a/o}let o=new Float32Array(i);for(let e=0;e<i;e++){let t=(e-3+i)%i,n=(e+3)%i,r=Math.atan2(this.tx[t],this.tz[t]),a=Math.atan2(this.tx[n],this.tz[n])-r;for(;a>Math.PI;)a-=ql;for(;a<-Math.PI;)a+=ql;o[e]=a/(6*this.ds)}for(let e=0;e<i;e++){let t=0;for(let n=-6;n<=6;n++)t+=o[(e+n+i)%i];this.kappa[e]=t/13}for(let t=0;t<i;t++){let n=t/i;this.width[t]=Yl(e.width,n,14),this.py[t]=Yl(e.height,n,0),this.bank[t]=Math.tan(Yl(e.bank,n,0)*Math.PI/180)}for(let e=0;e<i;e++){let t=(e-2+i)%i,n=(e+2)%i;this.slope[e]=(this.py[n]-this.py[t])/(4*this.ds)}this.runoff=e.runoff??10,this.gaps=[],this.tunnels=(e.tunnels||[]).map(([e,t])=>[e*r,t*r]);for(let t of e.moving||[])t.type===`truck`&&this.gaps.push({s:t.u*r,half:7});this.halfWidthMax=0;for(let e=0;e<i;e++)this.halfWidthMax=Math.max(this.halfWidthMax,this.width[e]/2);this._markKerbs(),this._bounds()}_markKerbs(){let e=this.n,t=this.def.kerbCurvature??1/160,n=this.def.sandCurvature??1/110,r=Math.round(14/this.ds),i=new Uint8Array(e);for(let n=0;n<e;n++)Math.abs(this.kappa[n])>t&&(i[n]=1);let a=new Uint8Array(e);for(let t=0;t<e;t++)if(i[t])for(let n=-r;n<=r;n++)a[(t+n+e)%e]=1;for(let t=0;t<e;t++)a[t]&&(this.kerbL[t]=1,this.kerbR[t]=1);for(let t=0;t<e;t++){let i=this.kappa[t];if(!(Math.abs(i)<n))for(let n=-r;n<=r*2;n++){let r=(t+n+e)%e;i>0?this.sandR[r]=1:this.sandL[r]=1}}}_bounds(){let e=1/0,t=-1/0,n=1/0,r=-1/0,i=1/0,a=-1/0;for(let o=0;o<this.n;o++)e=Math.min(e,this.px[o]),t=Math.max(t,this.px[o]),n=Math.min(n,this.pz[o]),r=Math.max(r,this.pz[o]),i=Math.min(i,this.py[o]),a=Math.max(a,this.py[o]);this.bounds={minX:e,maxX:t,minZ:n,maxZ:r,minY:i,maxY:a}}isTunnel(e){for(let[t,n]of this.tunnels)if(this.deltaS(t,e)>=0&&this.deltaS(e,n)>=0)return!0;return!1}isGap(e){for(let t of this.gaps)if(Math.abs(this.deltaS(t.s,e))<t.half)return!0;return!1}wrapS(e){let t=this.length;return e%=t,e<0?e+t:e}deltaS(e,t){let n=t-e,r=this.length;return n>r/2?n-=r:n<-r/2&&(n+=r),n}index(e){let t=Math.floor(this.wrapS(e)/this.ds);return t>=this.n?this.n-1:t}halfWidthAt(e){return this.width[this.index(e)]/2}wallOffset(e){return this.halfWidthAt(e)+this.runoff}kerbAt(e,t){let n=this.index(e);return t>0?this.kerbR[n]===1:this.kerbL[n]===1}pointAt(e,t,n){e=this.wrapS(e);let r=e/this.ds,i=Math.floor(r);i>=this.n&&(i=this.n-1);let a=r-i,o=(i+1)%this.n,s=this.tx[i]+(this.tx[o]-this.tx[i])*a,c=this.tz[i]+(this.tz[o]-this.tz[i])*a,l=Math.hypot(s,c)||1;s/=l,c/=l;let u=this.px[i]+(this.px[o]-this.px[i])*a,d=this.pz[i]+(this.pz[o]-this.pz[i])*a,f=this.py[i]+(this.py[o]-this.py[i])*a,p=this.bank[i]+(this.bank[o]-this.bank[i])*a;return n.x=u-c*t,n.z=d+s*t,n.y=f+p*t,n.tx=s,n.tz=c,n.i=i,n}heightAt(e,t){e=this.wrapS(e);let n=e/this.ds,r=Math.floor(n);r>=this.n&&(r=this.n-1);let i=n-r,a=(r+1)%this.n;return this.py[r]+(this.py[a]-this.py[r])*i+(this.bank[r]+(this.bank[a]-this.bank[r])*i)*t}heading(e){let t=this.index(e);return Math.atan2(this.tx[t],this.tz[t])}project(e,t,n,r){let i=this.n,a=0,o=1/0;if(n===void 0||n<0)for(let n=0;n<i;n++){let r=e-this.px[n],i=t-this.pz[n],s=r*r+i*i;s<o&&(o=s,a=n)}else for(let r=-48;r<=48;r++){let s=(n+r+i)%i,c=e-this.px[s],l=t-this.pz[s],u=c*c+l*l;u<o&&(o=u,a=s)}let s=a*this.ds,c=0,l=1/0;for(let n=-1;n<=0;n++){let r=(a+n+i)%i,o=(r+1)%i,u=this.px[r],d=this.pz[r],f=this.px[o]-u,p=this.pz[o]-d,m=f*f+p*p||1,h=((e-u)*f+(t-d)*p)/m;h=h<0?0:h>1?1:h;let g=u+f*h,_=d+p*h,v=(e-g)*(e-g)+(t-_)*(t-_);if(v<l){l=v,s=(r+h)*this.ds;let n=Math.sqrt(m);c=((e-g)*-p+(t-_)*f)/n}}return r.s=this.wrapS(s),r.t=c,r.i=a,r}surfaceAt(e,t){let n=this.index(e),r=this.width[n]/2,i=Math.abs(t);if(i<=r)return Rl.asphalt;let a=t>0;return i<=r+Kl.width&&(a?this.kerbR[n]:this.kerbL[n])?Rl.kerb:this.def.runoffSurface===`asphalt`?Rl.asphalt:(a?this.sandR[n]:this.sandL[n])?Rl.sand:Rl.grass}validate(){let e=this.n,t=1/0,n=0;for(let r=0;r<e;r++){let e=1/Math.max(1e-6,Math.abs(this.kappa[r]));e<t&&(t=e,n=r*this.ds)}let r=1/0,i=null,a=Gl.thickness*2+(this.halfWidthMax+this.runoff)*2;for(let t=0;t<e;t+=4)for(let n=0;n<e;n+=4){if(Math.abs(this.deltaS(t*this.ds,n*this.ds))<a*2.2+40)continue;let e=Math.hypot(this.px[t]-this.px[n],this.pz[t]-this.pz[n]);e<r&&(r=e,i=[t*this.ds,n*this.ds])}let o=a+4,s=this.halfWidthMax+this.runoff;return{length:this.length,minRadius:t,minRadiusS:n,minSep:r,sepAt:i,needSep:o,ok:r>o&&t>s+4,wallT:s}}},Y=Object.freeze({void:856343,slate:1448738,asphalt:1843496,edge:3159613,chalk:15134195,ash:9147550,red:16273737,infoBlue:1619967,goodGreen:4063119,warnAmber:16758784}),Zl=16777215;function Ql(e){return`#`+e.toString(16).padStart(6,`0`)}var X=Object.freeze({kerbRed:14692907,kerbWhite:15921902,boostBlue:1619967,boostGreen:4063119,hazardAmber:16758784,hazardBlack:1382170,cone:16742938,coneStripe:15921902,oil:723982,oilRim:16758784,tyre:2105894,tyreBand:15921902,concrete:12104872,barrierSteel:10134445,barrierStripe:14692907,gridLine:15921902,startLight:16273737,startLightOff:2757909,sparks:16765562,smoke:14211288,skid:1052688,token:4063119,helmetVisor:1382170,tyreRubber:1579292,rim:9147550,carbon:2237739,brakeOff:3804427,brakeOn:16722463,shadowBlob:0}),$l=Object.freeze({beginner:{name:`Daytime`,skyTop:5219296,skyBottom:13494519,fog:13494519,ground:6268997,groundAlt:5148985,runoff:14861704,accent:16273737,props:3112250,propsAlt:8016434,road:4869717,roadLine:15921902,wall:14277076,sun:16774108,hemiSky:14216447,hemiGround:5995068,sunIntensity:2.4,hemiIntensity:1.1,fogNear:220,fogFar:900},street:{name:`Dusk City`,skyTop:3874142,skyBottom:16747084,fog:8014442,ground:2828851,groundAlt:2368299,runoff:3815748,accent:16727972,props:1908265,propsAlt:1619967,road:3618879,roadLine:15262960,wall:9078678,sun:16756874,hemiSky:11832024,hemiGround:3812154,sunIntensity:1.6,hemiIntensity:1.2,fogNear:160,fogFar:700,neon:[16727972,1619967,4063119,16758784]},speed:{name:`Salt Flat`,skyTop:10471914,skyBottom:16052194,fog:15854296,ground:15128237,groundAlt:14272144,runoff:15721670,accent:1619967,props:16053488,propsAlt:12601903,road:5592924,roadLine:16316660,wall:15790316,sun:16775398,hemiSky:16777215,hemiGround:12560503,sunIntensity:2.6,hemiIntensity:1.2,fogNear:300,fogFar:1300},technical:{name:`Alpine`,skyTop:2067082,skyBottom:12576479,fog:11130575,ground:3038778,groundAlt:2510641,runoff:9210492,accent:14692907,props:1851944,propsAlt:15331056,road:4474701,roadLine:15921902,wall:13620182,sun:16773590,hemiSky:13628398,hemiGround:3099187,sunIntensity:2.2,hemiIntensity:1.1,fogNear:200,fogFar:850},night:{name:`Night City`,skyTop:329754,skyBottom:1910098,fog:856880,ground:1381916,groundAlt:1052950,runoff:2763571,accent:1619967,props:1053210,propsAlt:16758784,road:2434604,roadLine:14212326,wall:5922670,sun:10466559,hemiSky:5925546,hemiGround:1052696,sunIntensity:1,hemiIntensity:1.05,fogNear:150,fogFar:700,night:!0,neon:[16727972,1619967,4063119,16758784,11832024]},garage:{name:`Garage`,skyTop:856343,skyBottom:1448738,fog:856343,ground:1843496,groundAlt:1448738,runoff:3159613,accent:16273737,props:3159613,propsAlt:15134195,road:1843496,roadLine:3159613,wall:3159613,sun:16777215,hemiSky:15134195,hemiGround:1843496,sunIntensity:2.4,hemiIntensity:.9,fogNear:30,fogFar:90}}),eu=Object.freeze([{id:`ember`,name:`Ember`,primary:16273737,secondary:1448738,accent:15134195},{id:`glacier`,name:`Glacier`,primary:15134195,secondary:1619967,accent:856343},{id:`volt`,name:`Volt`,primary:1448738,secondary:4063119,accent:15134195},{id:`sunset`,name:`Sunset`,primary:16747050,secondary:1843496,accent:16765503},{id:`cobalt`,name:`Cobalt`,primary:2577097,secondary:15134195,accent:16273737},{id:`graphite`,name:`Graphite`,primary:3159613,secondary:15134195,accent:16273737},{id:`jade`,name:`Jade`,primary:1019759,secondary:856343,accent:16765503},{id:`magenta`,name:`Magenta`,primary:13642892,secondary:1448738,accent:1619967}]),tu=Object.freeze([15921902,16765503,1619967,16273737,4063119,16747050,11832024,2577097]),nu=new W,ru=class{constructor(){this.pos=[],this.col=[],this.idx=[],this.uv=null}get count(){return this.pos.length/3}v(e,t,n,r){return typeof r==`number`?nu.setHex(r):nu.copy(r),this.pos.push(e,t,n),this.col.push(nu.r,nu.g,nu.b),this.count-1}tri(e,t,n){this.idx.push(e,t,n)}quad(e,t,n,r){this.idx.push(e,t,n,e,n,r)}build(){let e=new fr;e.setAttribute(`position`,new er(this.pos,3)),e.setAttribute(`color`,new er(this.col,3)),this.uv&&e.setAttribute(`uv`,new er(this.uv,2));let t=this.count;return e.setIndex(t>65535?new $n(this.idx,1):new Qn(this.idx,1)),e.computeVertexNormals(),e.computeBoundingSphere(),e.computeBoundingBox(),e}};function iu(e,t,n){let r=e>>16&255,i=e>>8&255,a=e&255,o=t>>16&255,s=t>>8&255,c=t&255,l=Math.round(r+(o-r)*n),u=Math.round(i+(s-i)*n),d=Math.round(a+(c-a)*n);return l<<16|u<<8|d}function au(e,t){return t>=0?iu(e,Zl,t):iu(e,0,-t)}var ou=new Pt,su=new dt,cu=new H,lu=new H,uu=new Wt,du=new W;function Z(e,t,n,r,i,a,o,s,c=0){let l=i/2,u=a/2,d=o/2,f=Math.cos(c),p=Math.sin(c),m=(e,i,a)=>[t+e*f+a*p,n+i,r-e*p+a*f],h=[[[-l,-u,d],[l,-u,d],[l,u,d],[-l,u,d]],[[l,-u,-d],[-l,-u,-d],[-l,u,-d],[l,u,-d]],[[l,-u,d],[l,-u,-d],[l,u,-d],[l,u,d]],[[-l,-u,-d],[-l,-u,d],[-l,u,d],[-l,u,-d]],[[-l,u,d],[l,u,d],[l,u,-d],[-l,u,-d]],[[-l,-u,-d],[l,-u,-d],[l,-u,d],[-l,-u,d]]];for(let t of h){let n=t.map(t=>e.v(...m(...t),s));e.quad(n[0],n[1],n[2],n[3])}}function fu(e,t,n,r,i,a,o,s,c=s){let l=[t,n+a,r];for(let a=0;a<o;a++){let u=a/o*Math.PI*2,d=(a+1)/o*Math.PI*2,f=[t+Math.sin(u)*i,n,r+Math.cos(u)*i],p=[t+Math.sin(d)*i,n,r+Math.cos(d)*i],m=e.v(...f,s),h=e.v(...p,s),g=e.v(...l,c);e.tri(m,h,g)}}function pu(e,t,n,r,i,a,o,s,c=s){for(let l=0;l<o;l++){let u=l/o*Math.PI*2,d=(l+1)/o*Math.PI*2,f=Math.sin(u)*i,p=Math.cos(u)*i,m=Math.sin(d)*i,h=Math.cos(d)*i,g=e.v(t+f,n,r+p,s),_=e.v(t+m,n,r+h,s),v=e.v(t+m,n+a,r+h,s),y=e.v(t+f,n+a,r+p,s);e.quad(g,_,v,y);let b=e.v(t,n+a,r,c),x=e.v(t+f,n+a,r+p,c),S=e.v(t+m,n+a,r+h,c);e.tri(b,x,S)}}function mu(e){let t=new ru;return pu(t,0,0,0,.35,2.2,5,e.propsAlt),fu(t,0,1.6,0,2.4,3.6,6,e.props,au(e.props,.15)),fu(t,0,3.6,0,1.8,3,6,au(e.props,.08),au(e.props,.22)),t.build()}function hu(e){let t=new ru;return pu(t,0,0,0,.3,1.6,5,au(e.props,-.45)),fu(t,0,1.2,0,2,4.2,6,e.props,au(e.props,.12)),fu(t,0,3.8,0,1.4,3.6,6,au(e.props,.06),au(e.props,.2)),fu(t,0,6.2,0,.8,2.6,6,au(e.props,.1),e.propsAlt),t.build()}function gu(e,t){let n=new ru;return fu(n,0,0,0,1,1,7,e,t),n.build()}function _u(e){let t=new ru,n=au(e.props,-.05);for(let e=0;e<6;e++)Z(t,0,.6+e*1.1,-e*1.4,40,1.2+e*2.2,1.4,e%2?n:au(n,-.08));Z(t,0,.4,3,40,.8,4,au(e.props,-.2)),Z(t,0,10.5,-3.5,42,.4,10,e.accent);for(let n=-2;n<=2;n++)Z(t,40/4.4*n,5.2,-8,.4,10.4,.4,au(e.props,-.3));for(let e=0;e<6;e++)for(let n=0;n<18;n++){let r=-18.8+n*37.6/17+(e*7+n*3)%5*.12,i=[Y.red,Y.chalk,Y.infoBlue,Y.warnAmber,Y.goodGreen,Y.ash][(e*5+n*7)%6];Z(t,r,1.6+e*2.2,-e*1.4+.1,.6,.7,.5,i)}return t.build()}function vu(e){let t=new ru;return Z(t,0,.5,0,1,1,1,e.props),Z(t,0,1.01,0,.8,.04,.8,au(e.props,.1)),t.build()}function yu(){let e=new ru;for(let t=0;t<6;t++){let n=.12+t*.15;Z(e,0,n,.505,.8,.05,.01,Y.warnAmber),Z(e,.505,n,0,.01,.05,.8,Y.warnAmber),Z(e,0,n,-.505,.8,.05,.01,Y.warnAmber),Z(e,-.505,n,0,.01,.05,.8,Y.warnAmber)}return e.build()}function bu(e){let t=new ru;return Z(t,-2.2,2,0,.25,4,.25,X.carbon),Z(t,2.2,2,0,.25,4,.25,X.carbon),Z(t,0,4.2,0,6,2.2,.3,e.accent),Z(t,0,4.2,.17,5,.4,.02,Y.chalk),t.build()}function xu(){let e=new ru;return pu(e,0,0,0,.14,7,5,X.carbon),Z(e,.7,7,0,1.6,.18,.3,X.carbon),e.build()}function Su(){let e=new ru;pu(e,0,0,0,.08,6,4,Y.ash);let t=e.v(0,6,0,Y.chalk),n=e.v(0,4.6,0,Y.chalk),r=e.v(0,5.3,2,Y.chalk);return e.tri(t,n,r),e.tri(t,r,n),e.build()}function Cu(e){let t=new ru;Z(t,0,2,0,8,4,6,au(e.propsAlt,-.1));let n=4.6,r=[-4.6,4,3.4],i=[n,4,3.4],a=[n,6.6,0],o=[-4.6,6.6,0],s=[-4.6,4,-3.4],c=[n,4,-3.4],l=n=>n.map(n=>t.v(n[0],n[1],n[2],e.accent)),u=l([r,i,a,o]);return t.quad(u[0],u[1],u[2],u[3]),u=l([c,s,o,a]),t.quad(u[0],u[1],u[2],u[3]),u=l([i,c,a]),t.tri(u[0],u[1],u[2]),u=l([s,r,o]),t.tri(u[0],u[1],u[2]),t.build()}function wu(e,t,n,r,i=12){let a={s:0,t:0,i:0},o={x:0,y:0,z:0,tx:0,tz:1};for(let s=0;s<i;s++){let i=t.range(0,e.length),s=t.sign(),c=e.wallOffset(i)+t.range(n,r);if(e.pointAt(i,s*c,o),e.project(o.x,o.z,-1,a),!(Math.abs(a.t)<e.wallOffset(a.s)+n*.8))return{x:o.x,z:o.z,y:e.heightAt(a.s,Math.sign(a.t)*e.wallOffset(a.s)),s:i,side:s,heading:Math.atan2(o.tx,o.tz),d:c}}return null}function Tu(e,t,n,r){let i=e.group.getObjectByName(`terrain`);if(!i)return r;Eu.set(lu.set(t,500,n),Du);let a=Eu.intersectObject(i,!1);return a.length?a[0].point.y:r}var Eu=new Aa,Du=new H(0,-1,0);function Ou(e,t,n,r,{castShadow:i=!1,colors:a=null}={}){if(!n.length)return e.dispose(),null;let o=new qr(e,t,n.length);o.name=r;for(let e=0;e<n.length;e++){let t=n[e];su.setFromEuler(uu.set(0,t.rot||0,0)),cu.set(t.sx??t.scale??1,t.sy??t.scale??1,t.sz??t.scale??1),ou.compose(lu.set(t.x,t.y,t.z),su,cu),o.setMatrixAt(e,ou),a&&o.setColorAt(e,du.setHex(a[e%a.length]))}return o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),o.castShadow=i,o.receiveShadow=!1,o.computeBoundingSphere(),o}function ku(e,t,n,r,i,a=1){let o=new ln;o.name=`props`;let s=new Oi({vertexColors:!0,flatShading:!0}),c=n.props||{},l=e=>Math.round((c[e]||0)*a),u=(t.bounds.minX+t.bounds.maxX)/2,d=(t.bounds.minZ+t.bounds.maxZ)/2,f=Math.max(t.bounds.maxX-t.bounds.minX,t.bounds.maxZ-t.bounds.minZ)/2,p=e=>e&&o.add(e),m=0,h=e.propBoxes||=[],g=(e,t,n,r,i,a,o,s,c)=>h.push({x:e,z:n,rot:r,x0:i,x1:a,z0:o,z1:s,minY:t-.5,maxY:t+c}),_=(n,r,a,o)=>{let s=[];for(let c=0;c<n;c++){let n=wu(t,i,r,a);if(!n)continue;n.y=Tu(e,n.x,n.z,n.y);let l=o(n,c);l&&s.push(l)}return m+=s.length,s};if(l(`trees`)&&p(Ou(mu(r),s,_(l(`trees`),8,160,e=>({x:e.x,y:e.y-.2,z:e.z,rot:i.range(0,6.28),scale:i.range(.8,1.5)})),`trees`,{castShadow:!1})),l(`pines`)&&p(Ou(hu(r),s,_(l(`pines`),7,170,e=>({x:e.x,y:e.y-.2,z:e.z,rot:i.range(0,6.28),scale:i.range(.9,1.9)})),`pines`)),l(`hills`)){let e=[];for(let r=0;r<l(`hills`);r++){let a=r/l(`hills`)*Math.PI*2+i.range(-.2,.2),o=f+i.range(420,900),s=n.theme===`technical`?i.range(140,320):i.range(40,110),c=n.theme===`technical`?s*i.range(1.1,1.6):s*i.range(2.4,3.6);e.push({x:u+Math.sin(a)*o,y:t.bounds.minY-4,z:d+Math.cos(a)*o,rot:i.range(0,6),sx:c,sy:s,sz:c})}let a=n.theme===`technical`?Y.chalk:au(r.groundAlt,.1);p(Ou(gu(au(r.groundAlt,-.15),a),s,e,`hills`)),m+=e.length}if(l(`grandstands`)){let e=[],n=l(`grandstands`);for(let r=0;r<n;r++){let a=t.wrapS(-160+r*(c.pits?50:320/Math.max(1,n-1))+i.range(-6,6)),o=c.pits||r%2==0?-1:1,s={x:0,y:0,z:0,tx:0,tz:1},l=t.wallOffset(a)+12;t.pointAt(a,o*l,s);let u=Math.atan2(s.tx,s.tz);e.push({x:s.x,y:t.heightAt(a,o*l)-.3,z:s.z,rot:u+(o>0?Math.PI/2:-Math.PI/2)})}p(Ou(_u(r),s,e,`grandstands`,{castShadow:!1}));for(let t of e)g(t.x,t.y,t.z,t.rot,-21,21,-8.7,5,11);m+=e.length}if(l(`signs`)){let e=[],n={x:0,y:0,z:0,tx:0,tz:1};for(let r=0;r<l(`signs`);r++){let a=t.length*(r+i.range(.1,.9))/l(`signs`),o=i.sign(),s=t.wallOffset(a)+4;t.pointAt(a,o*s,n),e.push({x:n.x,y:t.heightAt(a,o*s)-.2,z:n.z,rot:Math.atan2(n.tx,n.tz)+Math.PI/2})}p(Ou(bu(r),s,e,`signs`)),m+=e.length}if(l(`flags`)){let e=[],n={x:0,y:0,z:0,tx:0,tz:1};for(let r=0;r<l(`flags`);r++){let a=t.length*r/l(`flags`),o=r%2?1:-1,s=t.wallOffset(a)+3;t.pointAt(a,o*s,n),e.push({x:n.x,y:t.heightAt(a,o*s),z:n.z,rot:i.range(0,6.28)})}p(Ou(Su(),s,e,`flags`,{colors:[Y.red,Y.infoBlue,Y.chalk,Y.goodGreen]})),m+=e.length}if(l(`chalets`)){let e=_(l(`chalets`),20,120,e=>({x:e.x,y:e.y-.3,z:e.z,rot:i.range(0,6.28),scale:i.range(.9,1.3)}));p(Ou(Cu(r),s,e,`chalets`));for(let t of e)g(t.x,t.y,t.z,t.rot,-4.6*t.scale,4.6*t.scale,-3.4*t.scale,3.4*t.scale,6.6*t.scale)}if(l(`buildings`)){let e=_(l(`buildings`),9,90,e=>{let t=i.range(14,28);return{x:e.x,y:e.y-.5,z:e.z,rot:e.heading+i.range(-.15,.15),sx:t,sy:i.range(14,46),sz:i.range(14,26)}});for(let n of e){let e={s:0,t:0,i:0};t.project(n.x,n.z,-1,e);let r=Math.abs(e.t)-t.wallOffset(e.s)-4,i=Math.hypot(n.sx,n.sz)/2;if(i>r){let e=Math.max(.3,r/i);n.sx*=e,n.sz*=e}}p(Ou(vu(r),s,e,`buildings`,{castShadow:!1,colors:[Y.chalk,au(Y.chalk,-.1),au(Y.chalk,-.2)]}));for(let t of e)g(t.x,t.y,t.z,t.rot,-t.sx/2,t.sx/2,-t.sz/2,t.sz/2,t.sy);let n=new wr({vertexColors:!0});p(Ou(yu(),n,e,`windows`,{colors:r.neon?[Y.chalk,r.neon[3],au(Y.chalk,-.3)]:[Y.chalk]}))}if(l(`neon`)){let e=[],n={x:0,y:0,z:0,tx:0,tz:1};for(let r=0;r<l(`neon`);r++){let a=t.length*(r+i.range(.2,.8))/l(`neon`),o=i.sign(),s=t.wallOffset(a)+5.5;t.pointAt(a,o*s,n);let c=t.heightAt(a,o*s);e.push({x:n.x,y:c+i.range(5,9),z:n.z,ground:c,rot:Math.atan2(n.tx,n.tz)+Math.PI/2,sx:i.range(5,9),sy:i.range(.8,1.6),sz:.3})}p(Ou(new ui(1,1,1),new wr({color:Y.chalk}),e,`neon`,{colors:r.neon||[r.accent]}));let a=e.map(e=>({x:e.x,y:e.ground,z:e.z,rot:e.rot,sx:.3,sy:e.y-e.ground,sz:.3}));p(Ou(vu({props:X.carbon}),s,a,`neon-posts`)),m+=e.length}if(l(`lamps`)){let e=[],n={x:0,y:0,z:0,tx:0,tz:1};for(let r=0;r<l(`lamps`);r++){let i=t.length*r/l(`lamps`),a=r%2?1:-1,o=t.wallOffset(i)+1.6;t.pointAt(i,a*o,n),e.push({x:n.x,y:t.heightAt(i,a*o),z:n.z,rot:Math.atan2(n.tx,n.tz)+(a>0?Math.PI/2:-Math.PI/2)})}p(Ou(xu(),s,e,`lamps`));let r=e.map(e=>({x:e.x+Math.cos(e.rot)*1.3,y:e.y+6.82,z:e.z-Math.sin(e.rot)*1.3,rot:e.rot,sx:1.2,sy:.12,sz:.25}));p(Ou(new ui(1,1,1),new wr({color:Y.chalk}),r,`lamp-heads`,{colors:[Y.warnAmber]}));let i=e.map((e,n)=>{let r=t.length*n/l(`lamps`),i=n%2?1:-1,a={x:0,y:0,z:0,tx:0,tz:1},o=i*(t.halfWidthAt(r)-2.5);return t.pointAt(r,o,a),{x:a.x,y:t.heightAt(r,o)+.04,z:a.z,rot:0,sx:1,sy:1,sz:1}}),a=new di(5.5,12);a.rotateX(-Math.PI/2),p(Ou(a,new wr({color:Y.warnAmber,transparent:!0,opacity:.16,depthWrite:!1,blending:2,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),i,`light-pools`)),m+=e.length}let v={x:0,y:0,z:0,tx:0,tz:1},y=t.length,b=e=>t.isGap(e)||t.isTunnel(e),x=e=>Math.abs(t.kappa[t.index(e)]);if(l(`clouds`)&&!r.night){let e=new ru;fu(e,0,0,0,1,.35,7,Y.chalk,Y.chalk),fu(e,.6,.05,.3,.7,.3,6,Y.chalk,Y.chalk),fu(e,-.55,.02,-.2,.65,.28,6,Y.chalk,Y.chalk);let n=e.build(),r=[];for(let e=0;e<l(`clouds`);e++){let e=i.range(0,Math.PI*2),n=i.range(0,f+500),a=i.range(40,90);r.push({x:u+Math.sin(e)*n,y:t.bounds.maxY+i.range(160,260),z:d+Math.cos(e)*n,rot:i.range(0,6.28),sx:a,sy:a*.8,sz:a*i.range(.5,.8)})}p(Ou(n,new wr({vertexColors:!0,fog:!1,transparent:!0,opacity:.85}),r,`clouds`))}if(c.fences){let e=[],n=new ru,i=au(r.wall,-.25);for(let r of[-1,1])for(let a=0;a<y;a+=9){if(b(a)||b(a+9))continue;let o=r*(t.wallOffset(a)+Gl.thickness*.5);t.pointAt(a,o,v);let s=t.heightAt(a,r*t.wallOffset(a))+Gl.height;e.push({x:v.x,y:s,z:v.z,rot:0,sx:.09,sy:3.2,sz:.09});let c=r*(t.wallOffset(a+9)+Gl.thickness*.5);for(let e of[1.5,3.1]){t.pointAt(a,o,v);let l=n.v(v.x,s+e,v.z,i),u=n.v(v.x,s+e+.08,v.z,i);t.pointAt(a+9,c,v);let d=t.heightAt(a+9,r*t.wallOffset(a+9))+Gl.height,f=n.v(v.x,d+e+.08,v.z,i),p=n.v(v.x,d+e,v.z,i);n.quad(l,u,f,p)}}p(Ou(vu({props:au(r.wall,-.3)}),s,e,`fence-posts`));let a=new G(n.build(),new Oi({vertexColors:!0,side:2}));a.name=`fence-rails`,o.add(a)}if(l(`banners`)){let e=[],n=[r.accent,Y.chalk,Y.infoBlue,Y.red,Y.goodGreen],a=0;for(let n=0;n<400&&a<l(`banners`);n++){let n=i.range(0,y);if(b(n)||x(n)>1/300||x(n+12)>1/300)continue;let r=i.sign()*(t.wallOffset(n)-.03);t.pointAt(n,r,v);let o=t.heightAt(n,r)+Gl.height;e.push({x:v.x,y:o-.62,z:v.z,rot:Math.atan2(v.tx,v.tz),sx:.04,sy:.6,sz:9}),a++}p(Ou(new ui(1,1,1),new Oi({color:Y.chalk}),e,`banners`,{colors:n})),m+=e.length}if(c.pits){let e=new ru;for(let n=-100;n<40;n+=10){let i=t.wrapS(n),a=1*(t.wallOffset(i)+16);t.pointAt(i,a,v);let o=t.heightAt(i,1*t.wallOffset(i))-.3,s=Math.atan2(v.tx,v.tz);Z(e,v.x,o+3,v.z,14,6,10.2,au(Y.chalk,-.12),s),t.pointAt(i,1*(t.wallOffset(i)+8.95),v),Z(e,v.x,o+2,v.z,.1,3.6,6.5,Y.void,s),t.pointAt(i,1*(t.wallOffset(i)+16),v),Z(e,v.x,o+6.3,v.z,14.4,.6,10.4,r.accent,s)}let n=new G(e.build(),s);n.name=`pits`,o.add(n);for(let e=-100;e<40;e+=10){let n=t.wrapS(e);t.pointAt(n,1*(t.wallOffset(n)+16),v),g(v.x,t.heightAt(n,1*t.wallOffset(n))-.3,v.z,Math.atan2(v.tx,v.tz),-7.2,7.2,-5.2,5.2,6.6)}}if(c.boards){let e=[[],[],[]],n=0;for(let r=0;r<y;r+=2){let i=x(r);if(i<1/200)n+=2;else{if(n>160&&i>1/90){let n=t.kappa[t.index(r)]>0?1:-1;[150,100,50].forEach((i,a)=>{let o=t.wrapS(r-i);if(b(o))return;let s=n*(t.wallOffset(o)+2.4);t.pointAt(o,s,v),e[a].push({x:v.x,y:t.heightAt(o,n*t.wallOffset(o))-.2,z:v.z,rot:Math.atan2(v.tx,v.tz)+Math.PI/2})})}n=0}}e.forEach((e,t)=>{let n=new ru;Z(n,0,1.5,0,.2,3,.2,X.carbon),Z(n,0,3.4,0,2.2,1.4,.14,Y.chalk);for(let e=0;e<3-t;e++)Z(n,-.6+e*.6,3.4,.08,.32,1.2,.02,X.kerbRed,0);p(Ou(n.build(),s,e,`brake-boards-${3-t}`)),m+=e.length})}if(l(`billboards`)){let e=[];for(let n=0;n<l(`billboards`);n++){let r=y*(n+i.range(.15,.85))/l(`billboards`);if(b(r))continue;let a=i.sign(),o=a*(t.wallOffset(r)+9);t.pointAt(r,o,v);let s=t.heightAt(r,a*t.wallOffset(r));e.push({x:v.x,y:s+i.range(9,13),z:v.z,ground:s,rot:Math.atan2(v.tx,v.tz)+Math.PI/2+i.range(-.3,.3),sx:i.range(10,16),sy:i.range(4,6),sz:.4})}p(Ou(new ui(1,1,1),new wr({color:Y.chalk}),e,`billboards`,{colors:r.neon||[r.accent]}));let n=e.map(e=>({x:e.x,y:e.ground,z:e.z,rot:e.rot,sx:.5,sy:e.y-e.ground-e.sy/2,sz:.5}));p(Ou(vu({props:X.carbon}),s,n,`billboard-poles`));for(let t of e)g(t.x,t.ground,t.z,t.rot,-t.sx/2,t.sx/2,-.4,.4,t.y-t.ground+t.sy/2);m+=e.length}return e.group.add(o),{count:m,meshes:o.children.length}}function Au(e=1){let t=e>>>0,n=()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};return{next:n,range:(e,t)=>e+(t-e)*n(),int:(e,t)=>Math.floor(e+(t-e+1)*n()),pick:e=>e[Math.floor(n()*e.length)],sign:()=>n()<.5?-1:1}}var ju=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
  gl_Position.z = gl_Position.w; // keep the dome on the far plane
}`,Mu=`
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform vec3 horizonColor;
varying vec3 vDir;
void main() {
  float h = clamp(vDir.y, -1.0, 1.0);
  vec3 col = h > 0.0
    ? mix(horizonColor, topColor, pow(h, 0.55))
    : mix(horizonColor, bottomColor, clamp(-h * 4.0, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;function Nu(e){let t=new G(new _i(1,24,12),new Ei({uniforms:{topColor:{value:new W(e.skyTop)},horizonColor:{value:new W(e.skyBottom)},bottomColor:{value:new W(e.fog)}},vertexShader:ju,fragmentShader:Mu,side:1,depthWrite:!1,fog:!1}));return t.scale.setScalar(1500),t.renderOrder=-1,t.frustumCulled=!1,t.name=`sky`,t}function Pu(e,{shadows:t=!0,shadowSize:n=1024,shadowExtent:r=40}={}){let i=new ln;i.name=`lights`;let a=new Zi(e.hemiSky,e.hemiGround,e.hemiIntensity);i.add(a);let o=new fa(e.sun,e.sunIntensity);if(o.position.set(60,120,40),o.castShadow=t,t){o.shadow.mapSize.set(n,n);let e=o.shadow.camera;e.left=-r,e.right=r,e.top=r,e.bottom=-r,e.near=1,e.far=400,o.shadow.bias=-8e-4,o.shadow.normalBias=.02}return i.add(o),i.add(o.target),{group:i,hemi:a,sun:o}}var Fu=new H(60,120,40);function Iu(e,t,n,r){let i=.5,a=Math.round(t/i)*i,o=Math.round(r/i)*i;e.target.position.set(a,n,o),e.position.set(a+Fu.x,n+Fu.y,o+Fu.z)}function Lu(e,t,n=1){e.fog=new _n(t.fog,t.fogNear*n,t.fogFar*n),e.background=new W(t.fog)}function Ru(e){let t=new Set,n=new Set;e.traverse(e=>{e.isLight&&e.shadow&&e.shadow.map&&e.shadow.dispose(),e.geometry&&t.add(e.geometry),e.material&&(Array.isArray(e.material)?e.material.forEach(e=>n.add(e)):n.add(e.material))});for(let e of t)e.dispose();for(let e of n){for(let t in e){let n=e[t];n&&n.isTexture&&n.dispose()}if(e.uniforms)for(let t in e.uniforms){let n=e.uniforms[t].value;n&&n.isTexture&&n.dispose()}e.dispose()}}var zu=2,Bu=.35,Vu=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},Hu=class{constructor(e){this.def=e,this.theme=$l[e.theme],this.model=null,this.group=new ln,this.group.name=`track-${e.id}`,this.startLightMats=[],this.lightsOn=-1,this.propInfo=null,this.stats={triangles:0}}gridSlot(e){let t=this.model,n=t.halfWidthAt(0);return{s:t.wrapS(-14-e*9),t:(e%2==0?-1:1)*n*.28}}setStartLights(e){if(e!==this.lightsOn){this.lightsOn=e;for(let t=0;t<this.startLightMats.length;t++){let n=t<e,r=this.startLightMats[t];r.color.setHex(n?X.startLight:X.startLightOff),r.emissive.setHex(n?X.startLight:X.startLightOff),r.emissiveIntensity=n?2.2:.2}}}dispose(){Ru(this.group),this.group.parent&&this.group.parent.remove(this.group)}};function*Uu(e,{quality:t,propDensity:n=1}={}){let r=new Hu(e),i=r.theme,a=Au(e.seed);yield{progress:.05,label:`Tracing centreline`};let o=new Xl(e);r.model=o,yield{progress:.15,label:`Laying asphalt`};let s=new Oi({vertexColors:!0,flatShading:!0}),c=new G(Ku(o,i),s);c.name=`road`,c.receiveShadow=!0,r.group.add(c),yield{progress:.3,label:`Kerbs and runoff`};let l=new G(Ju(o,i),s);l.name=`runoff`,l.receiveShadow=!0,r.group.add(l);let u=new Oi({vertexColors:!0,flatShading:!0,side:2}),d=new G(qu(o),u);d.name=`kerbs`,d.receiveShadow=!0,r.group.add(d),yield{progress:.45,label:`Barriers`};let f=new Oi({vertexColors:!0,flatShading:!0,side:2}),p=new G(Yu(o,i),f);p.name=`walls`,p.receiveShadow=!0,p.castShadow=!1,r.group.add(p),yield{progress:.58,label:`Terrain`};let m=new G(Zu(o,e,i,a),s);m.name=`terrain`,m.receiveShadow=!0,r.group.add(m);let h=new G(new di(4e3,32),new Oi({color:i.groundAlt}));h.rotation.x=-Math.PI/2,h.position.set((o.bounds.minX+o.bounds.maxX)/2,o.bounds.minY-1.5,(o.bounds.minZ+o.bounds.maxZ)/2),h.name=`far-ground`,r.group.add(h),yield{progress:.7,label:`Start line`},$u(r,o,i),(e.tunnels&&e.tunnels.length||e.overpasses&&e.overpasses.length)&&(yield{progress:.76,label:`Tunnel and bridges`},td(r,o,e,i)),yield{progress:.8,label:`Scenery`},r.propInfo=ku(r,o,e,i,a,n*(t?t.propDensity:1)),yield{progress:.92,label:`Finishing`};let g=0;return r.group.traverse(e=>{e.isMesh&&e.geometry.index&&(g+=e.geometry.index.count/3*(e.isInstancedMesh?e.count:1)),e.matrixAutoUpdate=!1,e.updateMatrix()}),r.stats.triangles=g,r.setStartLights(0),r}function Wu(e,t){let n=Uu(e,t),r=n.next();for(;!r.done;)r=n.next();return r.value}function Gu(e,t){let n=[];for(let r=0;r<e.n;r+=t)n.push(r);return n}function Ku(e,t){let n=new ru,r=Gu(e,zu),i={x:0,y:0,z:0},a={x:0,y:0,z:0};for(let o=0;o<r.length;o++){let s=r[o],c=r[(o+1)%r.length],l=s*e.ds,u=o+1<r.length?c*e.ds:e.length,d=e.width[s]/2,f=e.width[c]/2,p=(Math.floor(l/8)*2654435761>>>0)%7,m=au(t.road,(p-3)*.012),h=[[-d,-d+Bu,-f,-f+Bu,t.roadLine],[-d+Bu,d-Bu,-f+Bu,f-Bu,m],[d-Bu,d,f-Bu,f,t.roadLine]];for(let[t,r,o,s,c]of h){e.pointAt(l,t,i);let d=n.v(i.x,i.y,i.z,c);e.pointAt(l,r,a);let f=n.v(a.x,a.y,a.z,c);e.pointAt(u,s,i);let p=n.v(i.x,i.y,i.z,c);e.pointAt(u,o,a);let m=n.v(a.x,a.y,a.z,c);n.quad(d,f,p,m)}}return n.build()}function qu(e){let t=new ru,n={x:0,y:0,z:0};for(let r of[-1,1]){let i=r>0?e.kerbR:e.kerbL;for(let a=0;a<e.n;a++){let o=(a+1)%e.n;if(!i[a]||!i[o])continue;let s=a*e.ds,c=o===0?e.length:o*e.ds,l=Math.floor(s/Kl.block)%2?X.kerbRed:X.kerbWhite,u=r*(e.width[a]/2-.05),d=r*(e.width[o]/2-.05),f=u+r*Kl.width,p=d+r*Kl.width,m=.012;e.pointAt(s,u,n);let h=t.v(n.x,n.y+m,n.z,l);e.pointAt(s,f,n);let g=t.v(n.x,n.y+Kl.height,n.z,l);e.pointAt(c,p,n);let _=t.v(n.x,n.y+Kl.height,n.z,l);e.pointAt(c,d,n);let v=t.v(n.x,n.y+m,n.z,l);r>0?t.quad(h,g,_,v):t.quad(g,h,v,_)}}return t.build()}function Ju(e,t){let n=new ru,r=Gu(e,zu),i={x:0,y:0,z:0};for(let a of[-1,1]){let o=a>0?e.sandR:e.sandL;for(let s=0;s<r.length;s++){let c=r[s],l=r[(s+1)%r.length],u=c*e.ds,d=s+1<r.length?l*e.ds:e.length,f=Math.floor(u/12)%2,p=o[c]?au(t.runoff,f?.02:-.02):f?t.ground:t.groundAlt,m=a*(e.width[c]/2-.02),h=a*(e.width[l]/2-.02),g=a*(e.width[c]/2+e.runoff+.2),_=a*(e.width[l]/2+e.runoff+.2),v=-.03;e.pointAt(u,m,i);let y=n.v(i.x,i.y+v,i.z,p);e.pointAt(u,g,i);let b=n.v(i.x,i.y+v,i.z,p);e.pointAt(d,_,i);let x=n.v(i.x,i.y+v,i.z,p);e.pointAt(d,h,i);let S=n.v(i.x,i.y+v,i.z,p);a>0?n.quad(y,b,x,S):n.quad(b,y,S,x)}}return n.build()}function Yu(e,t){let n=new ru,r=Gu(e,zu),i={x:0,y:0,z:0},a=Gl.height,o=Gl.thickness,s=au(t.wall,-.35),c=au(t.wall,.08);for(let l of[-1,1])for(let u=0;u<r.length;u++){let d=r[u],f=r[(u+1)%r.length],p=d*e.ds,m=u+1<r.length?f*e.ds:e.length;if(e.isGap(p)||e.isGap(m))continue;let h=l*(e.width[d]/2+e.runoff),g=l*(e.width[f]/2+e.runoff),_=Math.floor(p/6)%2==0,v=(l>0?e.kerbR[d]:e.kerbL[d])?Math.floor(p/4)%2?X.kerbRed:X.kerbWhite:_?t.wall:au(t.wall,-.08),y=[[0,.28,s],[.28,a,v]];for(let[t,r,a]of y){e.pointAt(p,h,i);let o=n.v(i.x,i.y+t-.3*(t===0),i.z,a),s=n.v(i.x,i.y+r,i.z,a);e.pointAt(m,g,i);let c=n.v(i.x,i.y+r,i.z,a),l=n.v(i.x,i.y+t-.3*(t===0),i.z,a);n.quad(o,s,c,l)}e.pointAt(p,h,i);let b=n.v(i.x,i.y+a,i.z,c);e.pointAt(p,h+l*o,i);let x=n.v(i.x,i.y+a,i.z,c);e.pointAt(m,g+l*o,i);let S=n.v(i.x,i.y+a,i.z,c);e.pointAt(m,g,i);let C=n.v(i.x,i.y+a,i.z,c);n.quad(b,x,S,C),e.pointAt(p,h+l*o,i);let w=n.v(i.x,i.y-.4,i.z,s),T=n.v(i.x,i.y+a,i.z,s);e.pointAt(m,g+l*o,i);let E=n.v(i.x,i.y+a,i.z,s),D=n.v(i.x,i.y-.4,i.z,s);n.quad(w,T,E,D)}return n.build()}var Xu={beginner:6,street:0,speed:.6,technical:16,garage:0};function Zu(e,t,n,r){let i=e.bounds,a=e.halfWidthMax+e.runoff,o=a+240,s=Math.floor((i.minX-o)/10)*10,c=Math.floor((i.minZ-o)/10)*10,l=Math.ceil((i.maxX+o-s)/10)+1,u=Math.ceil((i.maxZ+o-c)/10)+1,d=new Map,f=(e,t)=>e*100003+t;for(let t=0;t<e.n;t+=2){let n=f(Math.floor(e.px[t]/40),Math.floor(e.pz[t]/40)),r=d.get(n);r||d.set(n,r=[]),r.push(t)}let p=Xu[t.theme]??4,m=[r.range(0,6.28),r.range(0,6.28),r.range(0,6.28),r.range(0,6.28)],h=(i.minY+i.maxY)/2,g=(e,t)=>p*(.55*Math.sin(e*.011+m[0])*Math.sin(t*.013+m[1])+.3*Math.sin(e*.027+m[2])*Math.cos(t*.023+m[3])+.15*Math.sin((e+t)*.05+m[0])),_=new Float32Array(l*u),v=[],y={s:0,t:0,i:0};for(let t=0;t<u;t++)for(let r=0;r<l;r++){let i=s+r*10,o=c+t*10,u=Math.floor(i/40),p=Math.floor(o/40),m=-1,b=1/0;for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++){let r=d.get(f(u+n,p+t));if(r)for(let t of r){let n=i-e.px[t],r=o-e.pz[t],a=n*n+r*r;a<b&&(b=a,m=t)}}let x;if(m<0)x=h+g(i,o)*1.6;else{e.project(i,o,m,y);let t=Math.abs(y.t),n=e.heightAt(y.s,Math.max(-a,Math.min(a,y.t)))-.35,r=Vu(a+16,a+75,t);x=n+(h+g(i,o)*(1+Vu(150,400,t)*.6)-n)*r,t<a+16&&(x=Math.min(x,n))}_[t*l+r]=x;let S=(r*73856093^t*19349663)>>>0;v.push(iu(n.ground,n.groundAlt,S%100/100))}let b=new ru;for(let e=0;e<u;e++)for(let t=0;t<l;t++)b.v(s+t*10,_[e*l+t],c+e*10,v[e*l+t]);for(let e=0;e<u-1;e++)for(let t=0;t<l-1;t++){let n=e*l+t,r=(e+1)*l+t,i=(e+1)*l+t+1,a=e*l+t+1;b.quad(n,r,i,a)}return b.build()}function Qu(){let e=document.createElement(`canvas`);e.width=64,e.height=16;let t=e.getContext(`2d`),n=Ql(X.gridLine),i=Ql(X.hazardBlack);for(let e=0;e<2;e++)for(let r=0;r<8;r++)t.fillStyle=(r+e)%2?n:i,t.fillRect(r*8,e*8,8,8);let a=new oi(e);return a.colorSpace=Re,a.magFilter=r,a.minFilter=r,a.generateMipmaps=!1,a}function $u(t,n,r){let i=new ln;i.name=`start-area`;let a={x:0,y:0,z:0,tx:0,tz:1},o=n.halfWidthAt(0);{let t=new fr,r=[],s=[],c=[[-1.2,-o,0,0],[-1.2,o,1,0],[1.2,o,1,1],[1.2,-o,0,1]];for(let[e,t,i,l]of c)n.pointAt(e,t,a),r.push(a.x,a.y+.02,a.z),s.push(i*Math.round(o/2),l);t.setAttribute(`position`,new er(r,3)),t.setAttribute(`uv`,new er(s,2)),t.setIndex([0,1,2,0,2,3]),t.computeVertexNormals();let l=Qu();l.wrapS=e;let u=new G(t,new Oi({map:l,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));u.receiveShadow=!0,u.name=`finish-line`,i.add(u)}{let e=new ru,r=X.gridLine;for(let i=0;i<8;i++){let o=t.gridSlot(i),s=o.s+2.6,c=o.t-1.3,l=o.t+1.3,u=(t,i,o,s)=>{n.pointAt(t,o,a);let c=e.v(a.x,a.y+.025,a.z,r);n.pointAt(t,s,a);let l=e.v(a.x,a.y+.025,a.z,r);n.pointAt(i,s,a);let u=e.v(a.x,a.y+.025,a.z,r);n.pointAt(i,o,a);let d=e.v(a.x,a.y+.025,a.z,r);e.quad(c,l,u,d)};u(s-.3,s,c,l),u(s-2.2,s,c,c+.25),u(s-2.2,s,l-.25,l)}let o=new G(e.build(),new Oi({vertexColors:!0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));o.name=`grid-boxes`,i.add(o)}{let e=new Oi({color:X.carbon,flatShading:!0}),o=n.wallOffset(.5)+Gl.thickness+1,s=6.2,c=new ui(.6,s,.6);for(let r of[-1,1]){n.pointAt(.5,r*o,a);let l=new G(c,e);l.position.set(a.x,n.heightAt(.5,r*n.wallOffset(.5))+s/2-.4,a.z),l.castShadow=!0,i.add(l),(t.propBoxes||=[]).push({x:a.x,z:a.z,rot:0,x0:-.45,x1:.45,z0:-.45,z1:.45,minY:l.position.y-s/2,maxY:l.position.y+s/2})}n.pointAt(.5,0,a);let l=Math.atan2(a.tx,a.tz),u=new G(new ui(o*2+.6,.9,.7),e);u.position.set(a.x,a.y+s,a.z),u.rotation.y=l,u.castShadow=!0,i.add(u);let d=new ui(.9,.9,.3),f=new di(.3,12);for(let r=0;r<5;r++){let o=(r-2)*1.3;n.pointAt(.5,o,a);let c=new G(d,e);c.position.set(a.x,a.y+s-.9,a.z),c.rotation.y=l,i.add(c);let u=new Oi({color:X.startLightOff,emissive:X.startLightOff,emissiveIntensity:.2}),p=new G(f,u);n.pointAt(.5-.17,o,a),p.position.set(a.x,a.y+s-.9,a.z),p.rotation.y=l+Math.PI,i.add(p),t.startLightMats.push(u)}let p=new G(new ui(o*2-2,.5,.75),new Oi({color:r.accent}));n.pointAt(.5,0,a),p.position.set(a.x,a.y+s+.7,a.z),p.rotation.y=l,i.add(p)}t.group.add(i)}var ed=7.2;function td(e,t,n,r){let i=new ru,a=new ru,o={x:0,y:0,z:0,tx:0,tz:1},s=au(r.wall,.05),c=r.neon?r.neon[1]:r.accent,l=au(r.wall,-.45),u=e.propBoxes||=[];for(let[e,n]of t.tunnels){let u=t.deltaS(e,n)>0?t.deltaS(e,n):t.length-e+n,d=Math.max(2,Math.ceil(u/2));for(let n=0;n<d;n++){let f=t.wrapS(e+u*n/d),p=t.wrapS(e+u*(n+1)/d);for(let e of[-1,1]){let n=e*t.wallOffset(f),r=e*t.wallOffset(p);t.pointAt(f,n,o);let l=t.heightAt(f,n),u=i.v(o.x,l+Gl.height,o.z,s),d=i.v(o.x,l+ed,o.z,s);t.pointAt(p,r,o);let m=t.heightAt(p,r),h=i.v(o.x,m+ed,o.z,s),g=i.v(o.x,m+Gl.height,o.z,s);i.quad(u,d,h,g);for(let[n,r]of[[2.3,2.55]]){let i=e*(t.wallOffset(f)-.04),s=e*(t.wallOffset(p)-.04);t.pointAt(f,i,o);let u=a.v(o.x,l+n,o.z,c),d=a.v(o.x,l+r,o.z,c);t.pointAt(p,s,o),a.quad(u,d,a.v(o.x,m+r,o.z,c),a.v(o.x,m+n,o.z,c))}}for(let[e,n]of[[0,l],[.7,au(r.ground,-.1)]]){let r=t.wallOffset(f)+1.4,a=t.wallOffset(p)+1.4;t.pointAt(f,-r,o);let s=i.v(o.x,t.heightAt(f,0)+ed+e,o.z,n);t.pointAt(f,r,o);let c=i.v(o.x,t.heightAt(f,0)+ed+e,o.z,n);t.pointAt(p,a,o);let l=i.v(o.x,t.heightAt(p,0)+ed+e,o.z,n);t.pointAt(p,-a,o);let u=i.v(o.x,t.heightAt(p,0)+ed+e,o.z,n);i.quad(s,c,l,u)}if(n%3==0){let i=t.wrapS(e+u*(n+.5)/d);t.pointAt(i,0,o),Z(a,o.x,t.heightAt(i,0)+ed-.1,o.z,3.2,.12,1.2,r.night?X.sparks:X.gridLine,Math.atan2(o.tx,o.tz))}}for(let a of[e,n]){t.pointAt(a,0,o);let e=(t.wallOffset(a)+1.6)*2;Z(i,o.x,t.heightAt(a,0)+ed+.9,o.z,e,1.8,1.2,r.accent,Math.atan2(o.tx,o.tz))}}for(let e of n.overpasses||[]){let n=t.wrapS(e*t.length);t.pointAt(n,0,o);let a=Math.atan2(o.tx,o.tz),s=t.heightAt(n,0),c=t.wallOffset(n)+16;Z(i,o.x,s+9.6,o.z,c*2,1.2,9,au(r.wall,.05),a),Z(i,o.x,s+10.6,o.z,c*2,.9,.4,r.accent,a);for(let e of[-1,1]){let s=e*(t.wallOffset(n)+6);t.pointAt(n,s,o);let c=t.heightAt(n,e*t.wallOffset(n))-.4;Z(i,o.x,c+4.6,o.z,1.6,9.2,4,au(r.wall,-.15),a),u.push({x:o.x,z:o.z,rot:a,x0:-.8,x1:.8,z0:-2,z1:2,minY:c,maxY:c+9.2})}t.pointAt(n,0,o),u.push({x:o.x,z:o.z,rot:a,x0:-c,x1:c,z0:-4.5,z1:4.5,minY:s+9,maxY:s+11.2})}let d=new Oi({vertexColors:!0,flatShading:!0,side:2}),f=new G(i.build(),d);if(f.name=`structures`,f.castShadow=!0,f.receiveShadow=!0,e.group.add(f),a.count){let t=new G(a.build(),new wr({vertexColors:!0,side:2}));t.name=`tunnel-lights`,e.group.add(t)}}var nd=Object.freeze({beginner:{id:`beginner`,name:`Beginner GP`,venue:`Meadow Park`,theme:`beginner`,difficulty:1,seed:1101,points:[[0,-234],[135,-236],[225,-209],[274,-148],[270,-86],[223,-56],[214,-11],[256,36],[275,108],[236,180],[162,227],[86,221],[40,176],[-22,173],[-74,216],[-148,227],[-220,184],[-263,99],[-254,9],[-281,-76],[-254,-164],[-155,-223]],width:17,runoff:13,height:0,bank:0,kerbCurvature:1/170,sandCurvature:1/95,sectors:[.34,.68],laps:{grandprix:3,timeattack:3,drift:2,practice:0},boostPads:[{u:.18,t:0},{u:.62,t:-3}],driftZones:[[.27,.36],[.74,.86]],obstacles:[{type:`cones`,u:.45,t:4,count:5,spacing:3.5,axis:`along`},{type:`tyres`,u:.52,t:-16,count:4,spacing:2,axis:`along`},{type:`oil`,u:.9,t:3}],props:{trees:150,grandstands:4,hills:14,signs:10,clouds:18,fences:!0,banners:16,pits:!0,boards:!0}},street:{id:`street`,name:`Street GP`,venue:`Neon Harbour`,theme:`street`,difficulty:3,seed:2202,points:[[0,-210],[110,-212],[190,-205],[222,-176],[240,-138],[280,-126],[326,-120],[352,-82],[330,-40],[262,-44],[228,-20],[216,40],[214,96],[218,176],[190,214],[142,222],[96,204],[76,166],[40,150],[2,168],[-24,206],[-70,222],[-150,220],[-196,196],[-206,150],[-180,112],[-182,66],[-222,34],[-234,-14],[-232,-150],[-200,-200],[-110,-212]],width:12,runoff:4.5,runoffSurface:`asphalt`,height:0,bank:0,kerbCurvature:1/140,sandCurvature:1/30,sectors:[.33,.66],laps:{grandprix:3,timeattack:3,drift:2,practice:0},boostPads:[{u:.05,t:0},{u:.7,t:2}],driftZones:[[.21,.33],[.5,.6]],obstacles:[{type:`cones`,u:.13,t:-3.5,count:4,spacing:3,axis:`along`},{type:`block`,u:.38,t:4.2},{type:`block`,u:.44,t:-4.2},{type:`oil`,u:.56,t:0},{type:`cones`,u:.62,t:3,count:4,spacing:3,axis:`along`},{type:`tyres`,u:.93,t:-4.5,count:3,spacing:1.8,axis:`along`}],moving:[{type:`truck`,u:.81,period:9,phase:.2}],props:{buildings:80,neon:30,lamps:46,billboards:8,banners:10,boards:!0}},speed:{id:`speed`,name:`Speed GP`,venue:`Salt Flat Speedway`,theme:`speed`,difficulty:2,seed:3303,points:[[0,-400],[250,-402],[420,-362],[484,-250],[466,-120],[386,-40],[346,60],[384,170],[356,300],[204,362],[40,372],[-60,340],[-150,372],[-260,352],[-372,292],[-440,170],[-424,40],[-450,-60],[-410,-170],[-312,-322],[-170,-396]],width:16,runoff:15,height:0,bank:[[0,0],[.2,4],[.32,0],[.62,0],[.75,4],[.9,0]],kerbCurvature:1/230,sandCurvature:1/150,sectors:[.33,.67],laps:{grandprix:3,timeattack:2,drift:2,practice:0},boostPads:[{u:.05,t:-3},{u:.42,t:3},{u:.56,t:0}],driftZones:[[.16,.27],[.33,.42],[.7,.8]],obstacles:[{type:`cones`,u:.3,t:5,count:6,spacing:4,axis:`along`},{type:`oil`,u:.47,t:-3},{type:`tyres`,u:.85,t:5,count:4,spacing:2,axis:`along`}],moving:[{type:`barrel`,u:.6,period:6,phase:0}],props:{grandstands:8,flags:30,hills:10,signs:14,clouds:12,fences:!0,banners:20,pits:!0,boards:!0}},technical:{id:`technical`,name:`Technical GP`,venue:`Alpine Ring`,theme:`technical`,difficulty:4,seed:4404,points:[[0,-250],[140,-252],[204,-222],[214,-160],[168,-116],[160,-66],[214,-36],[282,-56],[336,-16],[330,62],[262,96],[232,152],[266,212],[234,274],[134,286],[62,248],[0,266],[-80,296],[-172,268],[-206,196],[-160,146],[-150,96],[-196,70],[-262,74],[-312,20],[-300,-60],[-262,-120],[-186,-152],[-146,-210],[-80,-250]],width:13.5,runoff:8,height:[[0,0],[.12,3],[.25,8],[.36,12],[.48,7],[.62,1],[.75,-3],[.88,-1]],bank:[[0,0],[.3,0],[.36,-3],[.42,0],[.7,0],[.76,3],[.82,0]],kerbCurvature:1/150,sandCurvature:1/60,sectors:[.33,.66],laps:{grandprix:3,timeattack:3,drift:2,practice:0},boostPads:[{u:.02,t:0},{u:.57,t:-2}],driftZones:[[.12,.22],[.44,.52],[.8,.9]],obstacles:[{type:`cones`,u:.24,t:3.5,count:5,spacing:3,axis:`along`},{type:`block`,u:.35,t:-4.5},{type:`oil`,u:.48,t:2},{type:`tyres`,u:.66,t:-5,count:3,spacing:1.8,axis:`along`},{type:`cones`,u:.9,t:-3,count:4,spacing:3,axis:`along`}],moving:[{type:`gate`,u:.74,period:7,phase:.5}],props:{pines:230,hills:18,chalets:10,signs:10,clouds:16,fences:!0,banners:12,pits:!0,boards:!0}},night:{id:`night`,name:`Night City GP`,venue:`Midnight Boulevard`,theme:`night`,difficulty:3,seed:5505,points:[[0,-300],[220,-300],[400,-280],[520,-200],[560,-60],[520,60],[420,110],[330,160],[300,260],[220,330],[80,350],[-20,300],[-56,226],[-92,160],[-160,146],[-196,196],[-270,182],[-380,140],[-460,40],[-470,-100],[-420,-220],[-300,-290],[-150,-300]],width:16,runoff:7,runoffSurface:`asphalt`,height:[[0,0],[.3,0],[.4,3],[.5,4],[.6,1],[.7,0]],bank:[[0,0],[.06,3],[.18,3],[.26,0],[.7,0],[.8,-3],[.9,-3],[.96,0]],kerbCurvature:1/160,sandCurvature:1,sectors:[.33,.66],laps:{grandprix:3,timeattack:3,drift:2,practice:0},boostPads:[{u:.03,t:0},{u:.36,t:-3},{u:.74,t:3}],driftZones:[[.1,.22],[.27,.36],[.76,.9]],obstacles:[{type:`cones`,u:.46,t:-5,count:5,spacing:3,axis:`along`},{type:`oil`,u:.55,t:3},{type:`cones`,u:.66,t:5,count:4,spacing:3,axis:`along`},{type:`tyres`,u:.94,t:-6,count:3,spacing:1.8,axis:`along`}],tunnels:[[.01,.07]],overpasses:[.5],props:{buildings:120,neon:44,lamps:64,billboards:14}}}),rd=Object.freeze([`beginner`,`street`,`speed`,`technical`,`night`]),id=8,ad=64,od=128,sd=class{constructor(e){this.model=e,this.nS=Math.max(1,Math.ceil(e.length/id)),this.cells=new Map,this.all=[],this.stamp=1,this.lastTested=[],this.debugCells=!1,this._proj={s:0,t:0,i:-1}}_key(e,t){return e=(e%this.nS+this.nS)%this.nS,e*od+(t+ad)}locate(e){let t=this.model,n=t.project(e.x,e.z,e._hint??-1,this._proj);e._hint=n.i,e.s=n.s,e.t=n.t;let r=e.shape===`circle`?e.r:Math.hypot(e.hx,e.hz),i=t.kappa[n.i];e.sr=r/Math.max(.25,Math.abs(1+i*n.t))+.5,e.tr=r+.5}add(e){return e.s===void 0&&this.locate(e),e.stamp=0,e.keys=[],this._file(e),this.all.push(e),e}_file(e){let t=Math.floor((e.s-e.sr)/id),n=Math.floor((e.s+e.sr)/id),r=Math.max(-64,Math.floor((e.t-e.tr)/id)),i=Math.min(63,Math.floor((e.t+e.tr)/id));for(let a=t;a<=n;a++)for(let t=r;t<=i;t++){let n=this._key(a,t),r=this.cells.get(n);r||this.cells.set(n,r=[]),r.push(e),e.keys.push(n)}}_unfile(e){for(let t of e.keys){let n=this.cells.get(t);if(!n)continue;let r=n.indexOf(e);r>=0&&(n[r]=n[n.length-1],n.pop())}e.keys.length=0}move(e){this._unfile(e),this.locate(e),this._file(e)}remove(e){this._unfile(e);let t=this.all.indexOf(e);t>=0&&this.all.splice(t,1)}query(e,t,n,r,i){let a=++this.stamp,o=Math.floor((e-n)/id),s=Math.floor((e+n)/id),c=Math.max(-64,Math.floor((t-r)/id)),l=Math.min(63,Math.floor((t+r)/id));this.debugCells&&(this.lastTested.length=0);for(let e=o;e<=s;e++)for(let t=c;t<=l;t++){let n=this._key(e,t);this.debugCells&&this.lastTested.push(n);let r=this.cells.get(n);if(r)for(let e=0;e<r.length;e++){let t=r[e];t.stamp!==a&&(t.stamp=a,!t.disabled&&i(t))}}}extentFor(e,t,n){let r=this.model.kappa[e];return n/Math.max(.25,Math.abs(1+r*t))+id*.25}addWalls(){let e=this.model,t={x:0,y:0,z:0,tx:0,tz:1,i:0},n=0;for(let r of[-1,1]){let i=0;for(;i<e.length;){let a=e.index(i),o=e.width[a]/2+e.runoff,s=Math.abs(e.kappa[a]),c=s>1e-5?Math.abs(1+e.kappa[a]*r*o)/s:1e5,l=Math.max(1.4,Math.min(Gl.segment,Math.sqrt(.4*c))),u=i+l/2;if(e.isGap(u)){i+=l;continue}let d=r*(e.width[e.index(u)]/2+e.runoff+Gl.thickness/2);e.pointAt(u,d,t);let f={kind:`wall`,shape:`box`,x:t.x,z:t.z,h:Math.atan2(t.tx,t.tz),hx:Gl.thickness/2,hz:l/2+.35,height:Gl.height,side:r};this.add(f),n++,i+=l}}return n}cellBounds(e){let t=Math.floor(e/od),n=e%od-ad;return{s0:t*id,s1:(t+1)*id,t0:n*id,t1:(n+1)*id}}},cd=class{constructor(e,t=[.33,.66],n=16){this.model=e;let r=e.length,i=[];for(let e=0;e<n;e++)i.push(r*e/n);this.sectorS=t.map(e=>r*e);for(let e of this.sectorS)i.push(e);i.sort((e,t)=>e-t),this.points=i.filter((e,t)=>t===0||e-i[t-1]>5),this.sectorIndex=this.sectorS.map(e=>{let t=1;for(let n=1;n<this.points.length;n++)Math.abs(this.points[n]-e)<Math.abs(this.points[t]-e)&&(t=n);return t})}get count(){return this.points.length}createState(e){return{next:0,laps:-1,highLaps:-1,lastS:e,started:!1,crossings:0,lastCrossTime:-1}}update(e,t,n,r){let i=this.model.deltaS(e.lastS,t);if(r.type=null,r.index=-1,i===0)return r;if(Math.abs(i)>60)return e.lastS=t,r;if(i>0){let t=this.points[e.next];if(this._crossed(e.lastS,i,t)){let t=e.next;if(e.next=(e.next+1)%this.points.length,r.index=t,t===0)e.laps++,e.laps>e.highLaps?(e.highLaps=e.laps,e.crossings++,e.lastCrossTime=n,r.type=e.laps===0?`start`:`lap`,r.lap=e.laps):r.type=`recross`;else{r.type=`checkpoint`;let e=this.sectorIndex.indexOf(t);e>=0&&(r.type=`sector`,r.sector=e)}}}else{let n=(e.next-1+this.points.length)%this.points.length,a=this.points[n];this._crossed(t,-i,a)&&e.laps>=0&&(e.next=n,n===0&&e.laps--,r.type=`back`,r.index=n)}return e.lastS=t,r}_crossed(e,t,n){let r=this.model.length,i=n-e;return i=(i%r+r)%r,i>=0&&i<=t}progress(e,t){return e.laps*this.model.length+t}},ld=class{constructor(e,{aLat:t=15,aBrake:n=16,aAccel:r=7,vMax:i=80,margin:a=2.2}={}){this.model=e;let o=e.n;this.offset=new Float32Array(o),this.speed=new Float32Array(o),this.curv=new Float32Array(o);let s=this.offset,c=new Float32Array(o);for(let t=0;t<o;t++)c[t]=Math.max(0,e.width[t]/2-a);let l=Math.max(2,Math.round(6/e.ds));for(let t=0;t<220;t++)for(let t=0;t<o;t++){let n=(t-l+o)%o,r=(t+l)%o,i=e.px[n]-e.tz[n]*s[n],a=e.pz[n]+e.tx[n]*s[n],u=e.px[r]-e.tz[r]*s[r],d=e.pz[r]+e.tx[r]*s[r],f=(i+u)/2-e.px[t],p=(a+d)/2-e.pz[t],m=f*-e.tz[t]+p*e.tx[t],h=s[t]+(m-s[t])*.6;s[t]=h>c[t]?c[t]:h<-c[t]?-c[t]:h}let u=new Float32Array(o);for(let e=0;e<o;e++){let t=0;for(let n=-4;n<=4;n++)t+=s[(e+n+o)%o];u[e]=t/9}for(let e=0;e<o;e++)s[e]=Math.max(-c[e],Math.min(c[e],u[e]));let d=new Float32Array(o),f=new Float32Array(o);for(let t=0;t<o;t++)d[t]=e.px[t]-e.tz[t]*this.offset[t],f[t]=e.pz[t]+e.tx[t]*this.offset[t];for(let e=0;e<o;e++){let t=(e-4+o)%o,n=(e+4)%o,r=d[e]-d[t],i=f[e]-f[t],a=d[n]-d[e],s=f[n]-f[e],c=Math.atan2(a,s)-Math.atan2(r,i);for(;c>Math.PI;)c-=Math.PI*2;for(;c<-Math.PI;)c+=Math.PI*2;let l=Math.hypot(r,i)+Math.hypot(a,s);this.curv[e]=Math.abs(c)/Math.max(.5,l/2)}let p=new Float32Array(o);for(let e=0;e<o;e++){let t=0;for(let n=-3;n<=3;n++)t+=this.curv[(e+n+o)%o];p[e]=t/7}for(let e=0;e<o;e++)this.speed[e]=Math.min(i,Math.sqrt(t/Math.max(1e-4,p[e])));let m=e.ds;for(let e=0;e<2;e++){for(let e=2*o-1;e>=0;e--){let t=e%o,r=(t+1)%o,i=Math.sqrt(this.speed[r]*this.speed[r]+2*n*m);this.speed[t]>i&&(this.speed[t]=i)}for(let e=0;e<2*o;e++){let t=e%o,n=(t+1)%o,i=Math.sqrt(this.speed[t]*this.speed[t]+2*r*m);this.speed[n]>i&&(this.speed[n]=i)}}}offsetAt(e){return this.offset[this.model.index(e)]}speedAt(e){return this.speed[this.model.index(e)]}minSpeedAhead(e,t){let n=this.model,r=1/0,i=Math.max(1,Math.round(t/(n.ds*4)));for(let a=0;a<=i;a++){let o=this.speed[n.index(e+t*a/i)];o<r&&(r=o)}return r}};function ud(e,t,n){let r=Math.sin(e.h),i=Math.cos(e.h),a=Math.sin(t.h),o=Math.cos(t.h),s=i,c=-r,l=r,u=i,d=o,f=-a,p=a,m=o,h=t.x-e.x,g=t.z-e.z,_=1/0,v=0,y=0;for(let n=0;n<4;n++){let r,i;n===0?(r=s,i=c):n===1?(r=l,i=u):n===2?(r=d,i=f):(r=p,i=m);let a=e.hx*Math.abs(s*r+c*i)+e.hz*Math.abs(l*r+u*i),o=t.hx*Math.abs(d*r+f*i)+t.hz*Math.abs(p*r+m*i),b=h*r+g*i,x=a+o-Math.abs(b);if(x<=0)return!1;if(x<_){_=x;let e=b>0?-1:1;v=r*e,y=i*e}}return n.nx=v,n.nz=y,n.depth=_,!0}function dd(e,t,n,r,i){let a=Math.sin(e.h),o=Math.cos(e.h),s=t-e.x,c=n-e.z,l=s*o-c*a,u=s*a+c*o,d=Math.max(-e.hx,Math.min(e.hx,l)),f=Math.max(-e.hz,Math.min(e.hz,u)),p=l-d,m=u-f,h=p*p+m*m;if(h>r*r)return!1;let g,_,v;if(h>1e-10){let e=Math.sqrt(h);g=-p/e,_=-m/e,v=r-e}else{let t=e.hx-Math.abs(l),n=e.hz-Math.abs(u);t<n?(g=l>0?-1:1,_=0,v=t+r):(g=0,_=u>0?-1:1,v=n+r)}return i.nx=g*o+_*a,i.nz=-g*a+_*o,i.depth=v,!0}var fd=new Pt,pd=new dt,md=new Wt,hd=new H,gd=new H,_d=new H,vd=9.81,yd={x:0,z:0,h:0,hx:Bl.width/2+.15,hz:Bl.length/2+.15},bd={nx:0,nz:0,depth:0},xd=48;function Sd(){let e=new ru;return Z(e,0,.02,0,.42,.04,.42,X.cone),fu(e,0,.04,0,.18,.56,8,X.cone,X.cone),pu(e,0,.26,0,.115,.08,8,X.coneStripe,X.coneStripe),e.build()}function Cd(){let e=new ru;for(let t=0;t<3;t++)pu(e,0,t*.3,0,.45,.28,10,X.tyre,X.tyre),pu(e,0,t*.3+.1,0,.455,.06,10,X.tyreBand,X.tyre);return e.build()}function wd(){let e=new ru,{width:t,length:n,height:r}=Wl.block;Z(e,0,r/2,0,t,r,n,X.concrete);for(let i of[-1,1])for(let a=0;a<6;a++){let o=-n/2+(a+.5)*(n/6);Z(e,i*(t/2+.005),r*.55,o,.01,r*.5,n/6,a%2?X.hazardAmber:X.hazardBlack)}return e.build()}function Td(){let e=new ru,t=Wl.oil.radius,n=e.v(0,.035,0,X.oil);for(let r=0;r<14;r++){let i=r/14*Math.PI*2,a=(r+1)/14*Math.PI*2,o=t*(.86+.14*Math.sin(r*2.3)),s=t*(.86+.14*Math.sin((r+1)*2.3)),c=e.v(Math.sin(i)*o,.035,Math.cos(i)*o,X.oil),l=e.v(Math.sin(a)*s,.035,Math.cos(a)*s,X.oil);e.tri(n,c,l);let u=e.v(Math.sin(i)*(o+.25),.033,Math.cos(i)*(o+.25),X.oilRim),d=e.v(Math.sin(a)*(s+.25),.033,Math.cos(a)*(s+.25),X.oilRim),f=e.v(Math.sin(i)*o,.033,Math.cos(i)*o,X.oilRim),p=e.v(Math.sin(a)*s,.033,Math.cos(a)*s,X.oilRim);e.quad(f,u,d,p)}return e.build()}function Ed(){let e=new ru,{width:t,length:n}=Wl.boostPad;Z(e,0,.02,0,t,.04,n,X.boostBlue);for(let t=0;t<3;t++){let r=-n/2+1.2+t*1.7;for(let t of[-1,1]){let n=t*.75;Z(e,t*.62,.05,r,1.5,.02,.38,X.boostGreen,n)}}return e.build()}function Dd(){let e=new ru;return Z(e,0,1.4,0,.2,2.8,.2,X.carbon),Z(e,0,2.6,0,1.4,.9,.12,X.boostGreen),Z(e,0,2.6,.07,.9,.18,.01,Y.void),e.build()}function Od(){let e=new ru;return Z(e,0,.03,0,.3,.02,2.4,X.boostGreen),e.build()}function kd(){return new mi(.6,0)}function Ad(){let e=new ru,{width:t,length:n,height:r}=Wl.truck;Z(e,0,r*.58,-.8,t,r*.78,n-1.8,au(Y.chalk,-.12)),Z(e,0,r*.3,-.8,t+.02,.4,n-1.8,X.hazardAmber),Z(e,0,r*.42,n/2-.9,t,r*.7,1.8,Y.red),Z(e,0,r*.62,n/2-.05,t*.8,r*.25,.1,X.helmetVisor);for(let r of[-n/2+1,-n/2+2.2,n/2-1])for(let n of[-t/2,t/2])Z(e,n,.45,r,.35,.9,.9,X.tyre);return e.build()}function jd(){let e=new ru,{length:t,width:n,height:r}=Wl.gate;Z(e,0,r/2+.2,0,.6,r+.4,.6,X.carbon);for(let i=0;i<8;i++)Z(e,0,r*.7,.4+(i+.5)*((t-.4)/8),n,.45,(t-.4)/8,i%2?X.hazardAmber:X.hazardBlack);return Z(e,0,r*.35,t-.2,.3,r*.7,.3,X.carbon),e.build()}function Md(){let e=new ru,t=Wl.barrel.radius;pu(e,0,-t,0,t,t*2,10,X.hazardAmber,X.hazardBlack),pu(e,0,-.12,0,t+.01,.24,10,X.hazardBlack,X.hazardAmber);let n=e.build();return n.rotateX(Math.PI/2),n}function Nd(){let e=new ru;return Z(e,0,1.6,0,.18,3.2,.18,X.carbon),e.build()}var Pd=class{constructor(e,t,n,{seed:r=1,obstacles:i=!0,moving:a=!0,tokens:o=!0}={}){this.track=e,this.model=e.model,this.world=t,this.def=n,this.group=new ln,this.group.name=`obstacles`,this.mat=new Oi({vertexColors:!0,flatShading:!0}),this.cones=[],this.movers=[],this.tokensList=[],this.zones=(n.driftZones||[]).map(([e,t])=>[e*this.model.length,t*this.model.length]),this.conesKnocked=0,this.time=0,this.rng=Au(r),this._pt={x:0,y:0,z:0,tx:0,tz:1,i:0},this._tl={t:0,dir:1,ph:0,travel:0},this.propBoxes=[],i&&this._buildStatic(),this._buildPads(),this._buildZones(),a&&this._buildMovers(),o&&this._buildTokens()}get tokenCount(){return this.tokensList.length}_place(e,t,n=this._pt){let r=this.model,i=r.wrapS(e*r.length);return r.pointAt(i,t,n),n.s=i,n.y=r.heightAt(i,t),n.h=Math.atan2(n.tx,n.tz),n}_buildStatic(){let e=[],t=[],n=[],r=[],i=()=>this.rng.range(-.35,.35);for(let a of this.def.obstacles||[]){let o=a.count||1;for(let s=0;s<o;s++){let c=a.axis===`across`?0:(s-(o-1)/2)*(a.spacing||3),l=a.axis===`across`?(s-(o-1)/2)*(a.spacing||2):0,u=a.u+c/this.model.length,d=this._place(u,a.t+l+(a.type===`cones`?i()*.5:0));if(a.type===`cones`){if(this.cones.length+e.length>=xd)continue;e.push({x:d.x,y:d.y,z:d.z,h:d.h+this.rng.range(0,6)})}else a.type===`tyres`?t.push({x:d.x,y:d.y,z:d.z,h:d.h}):a.type===`block`?n.push({x:d.x,y:d.y,z:d.z,h:d.h}):a.type===`oil`&&r.push({x:d.x,y:d.y,z:d.z,h:this.rng.range(0,6)})}}if(e.length){this.coneMesh=new qr(Sd(),this.mat,e.length),this.coneMesh.name=`cones`,this.coneMesh.castShadow=!0;for(let t=0;t<e.length;t++){let n=e[t],r={kind:`cone`,shape:`circle`,x:n.x,z:n.z,r:Wl.cone.radius+.08,height:Wl.cone.height,y:n.y,home:{x:n.x,y:n.y,z:n.z,h:n.h},pos:new H(n.x,n.y,n.z),vel:new H,rot:new dt().setFromEuler(new Wt(0,n.h,0)),spin:new H,knocked:!1,resting:!0,index:t};this.world.add(r),this.cones.push(r),this._writeCone(r)}this.coneMesh.instanceMatrix.needsUpdate=!0,this.group.add(this.coneMesh)}let a=(e,t,n,r=1,i=!1)=>{if(!t.length)return e.dispose(),null;let a=new qr(e,this.mat,t.length);a.name=n,a.castShadow=i,a.receiveShadow=!0;for(let e=0;e<t.length;e++){let n=t[e];pd.setFromEuler(md.set(0,n.h,0)),fd.compose(hd.set(n.x,n.y,n.z),pd,gd.set(r,r,r)),a.setMatrixAt(e,fd)}return a.instanceMatrix.needsUpdate=!0,a.computeBoundingSphere(),this.group.add(a),a};a(Cd(),t,`tyre-stacks`,1,!0);for(let e of t)this.world.add({kind:`soft`,shape:`circle`,x:e.x,z:e.z,r:Wl.tyreStack.radius,height:Wl.tyreStack.height,y:e.y});a(wd(),n,`blocks`,1,!0);for(let e of n)this.world.add({kind:`solid`,shape:`box`,x:e.x,z:e.z,h:e.h,hx:Wl.block.width/2,hz:Wl.block.length/2,height:Wl.block.height,y:e.y});a(Td(),r,`oil`);for(let e of r)this.world.add({kind:`area`,type:`oil`,shape:`circle`,x:e.x,z:e.z,r:Wl.oil.radius*.95,y:e.y});this.oilSpots=r}_buildPads(){let e=[];for(let t of this.def.boostPads||[]){let n=this._place(t.u,t.t);e.push({x:n.x,y:n.y,z:n.z,h:n.h}),this.world.add({kind:`area`,type:`boost`,shape:`box`,x:n.x,z:n.z,h:n.h,hx:Wl.boostPad.width/2,hz:Wl.boostPad.length/2,y:n.y})}if(this.pads=e,!e.length)return;let t=new qr(Ed(),new wr({vertexColors:!0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),e.length);t.name=`boost-pads`;for(let n=0;n<e.length;n++){let r=e[n];pd.setFromEuler(md.set(0,r.h,0)),fd.compose(hd.set(r.x,r.y,r.z),pd,gd.set(1,1,1)),t.setMatrixAt(n,fd)}t.instanceMatrix.needsUpdate=!0,t.computeBoundingSphere(),this.group.add(t)}_buildZones(){if(!this.zones.length)return;let e=this.model,t=[],n=[];for(let[r,i]of this.zones){for(let n of[r,i])for(let r of[-1,1]){let i=r*(e.halfWidthAt(n)+2.2);e.pointAt(n,i,this._pt),t.push({x:this._pt.x,y:e.heightAt(n,i),z:this._pt.z,h:Math.atan2(this._pt.tx,this._pt.tz)+Math.PI})}let a=e.deltaS(r,i)>0?e.deltaS(r,i):e.length-r+i;for(let t=0;t<a;t+=6){let i=e.wrapS(r+t);for(let t of[-1,1]){let r=t*(e.halfWidthAt(i)-.8);e.pointAt(i,r,this._pt),n.push({x:this._pt.x,y:e.heightAt(i,r),z:this._pt.z,h:Math.atan2(this._pt.tx,this._pt.tz)})}}}let r=(e,t,n,r)=>{let i=new qr(e,r,t.length);i.name=n;for(let e=0;e<t.length;e++){let n=t[e];pd.setFromEuler(md.set(0,n.h,0)),fd.compose(hd.set(n.x,n.y,n.z),pd,gd.set(1,1,1)),i.setMatrixAt(e,fd)}i.instanceMatrix.needsUpdate=!0,i.computeBoundingSphere(),this.group.add(i)};r(Dd(),t,`drift-zone-posts`,this.mat),r(Od(),n,`drift-zone-lines`,new wr({vertexColors:!0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}))}_buildMovers(){let e=this.model;for(let t of this.def.moving||[]){let n=e.wrapS(t.u*e.length),r=e.halfWidthAt(n),i=e.wallOffset(n),a={type:t.type,s:n,period:t.period,phase:t.phase||0,hw:r,wallT:i,col:null,mesh:null,warn:null,time:0};if(t.type===`truck`)a.mesh=new G(Ad(),this.mat),a.mesh.castShadow=!0,a.col={kind:`solid`,shape:`box`,x:0,z:0,h:0,hx:Wl.truck.width/2,hz:Wl.truck.length/2,height:Wl.truck.height,y:0},this._buildJunction(a);else if(t.type===`gate`)a.mesh=new G(jd(),this.mat),a.mesh.castShadow=!0,a.col={kind:`solid`,shape:`box`,x:0,z:0,h:0,hx:Wl.gate.width/2+.05,hz:Wl.gate.length/2,height:Wl.gate.height,y:0},a.side=-1,e.pointAt(n,a.side*(r+.6),this._pt),this.world.add({kind:`solid`,shape:`circle`,x:this._pt.x,z:this._pt.z,r:.4,height:1.6,y:e.heightAt(n,0)});else if(t.type===`barrel`)a.mesh=new G(Md(),this.mat),a.mesh.castShadow=!0,a.col={kind:`soft`,shape:`circle`,x:0,z:0,r:Wl.barrel.radius+.1,height:.9,y:0};else continue;a.mesh.name=`mover-${t.type}`,this.group.add(a.mesh),this._positionMover(a,0),this.world.add(a.col),this.movers.push(a)}}_buildJunction(e){let t=this.model,n=new ru,r=au(this.track.theme.road,-.05),i=this._pt;for(let a of[-1,1]){let o=[];for(let n of[-6.5,6.5])for(let r of[e.wallT-.5,e.wallT+46])t.pointAt(e.s+n,a*r,i),o.push([i.x,t.heightAt(e.s,a*e.wallT)-.01,i.z]);let s=o.map(e=>n.v(e[0],e[1],e[2],r));a>0?n.quad(s[0],s[1],s[3],s[2]):n.quad(s[0],s[2],s[3],s[1]);for(let r of[-6.9,6.9])t.pointAt(e.s+r,a*(e.wallT+22),i),Z(n,i.x,t.heightAt(e.s,a*e.wallT)+.55,i.z,.8,1.1,46,this.track.theme.wall,Math.atan2(i.tx,i.tz)+Math.PI/2)}let a=new G(n.build(),this.mat);a.name=`junction`,a.receiveShadow=!0,this.group.add(a);let o=new wr({color:X.hazardAmber}),s=new ln,c=Nd(),l=new ui(.5,.5,.5);for(let n of[-1,1])for(let r of[-22,9]){t.pointAt(e.s+r,n*(e.hw+2.2),i);let a=t.heightAt(e.s+r,n*e.hw),u=new G(c,this.mat);u.position.set(i.x,a,i.z),s.add(u);let d=new G(l,o);d.position.set(i.x,a+3.4,i.z),s.add(d)}s.name=`junction-lamps`,this.group.add(s),e.warn=o}truckLateral(e,t,n){let r=((t/e.period+e.phase)%1+1)%1,i=e.wallT+14;return r<.25?(n.t=-i+r/.25*i*2,n.dir=1):r<.5?(n.t=i,n.dir=1):r<.75?(n.t=i-(r-.5)/.25*i*2,n.dir=-1):(n.t=-i,n.dir=-1),n.ph=r,n.travel=i,n}truckBlocks(e,t,n){let r=this._tl,i=Wl.truck.length/2+2.5;for(let a=-2;a<=2;a++)if(this.truckLateral(e,e.time+t+n*a/2,r),Math.abs(r.t)<e.hw+i)return!0;return!1}_positionMover(e,t){let n=this.model,r=((t/e.period+e.phase)%1+1)%1,i=this._pt;if(e.type===`truck`){let a=this.truckLateral(e,t,this._tl),o=a.t,s=a.dir,c=a.travel;n.pointAt(e.s,o,i);let l=n.heightAt(e.s,Math.max(-e.wallT,Math.min(e.wallT,o))),u=Math.atan2(i.tx,i.tz)-(s>0?Math.PI/2:-Math.PI/2);e.mesh.position.set(i.x,l,i.z),e.mesh.rotation.set(0,u,0),e.col.x=i.x,e.col.z=i.z,e.col.h=u,e.col.y=l;let d=Math.abs(o)<e.wallT+12||r>.4&&r<.5||r>.9;e.active=Math.abs(o)<c-.5,e.warn&&e.warn.color.setHex(d&&Math.floor(t*4)%2==0?X.hazardAmber:X.hazardBlack)}else if(e.type===`gate`){let t=.5-.5*Math.cos(r*Math.PI*2),a=e.side*(e.hw+.6);n.pointAt(e.s,a,i);let o=Math.atan2(i.tx,i.tz)+Math.PI+Math.PI/2*t*.83*-e.side,s=n.heightAt(e.s,e.side*e.hw);e.mesh.position.set(i.x,s,i.z),e.mesh.rotation.set(0,o,0);let c=Wl.gate.length/2;e.col.x=i.x+Math.sin(o)*c,e.col.z=i.z+Math.cos(o)*c,e.col.h=o,e.col.y=s}else if(e.type===`barrel`){let t=Math.sin(r*Math.PI*2)*(e.hw-1.2);n.pointAt(e.s,t,i);let a=n.heightAt(e.s,t);e.mesh.position.set(i.x,a+Wl.barrel.radius,i.z);let o=Math.atan2(i.tx,i.tz);e.mesh.rotation.set(0,o,0),e.mesh.rotateZ(-t/Wl.barrel.radius),e.col.x=i.x,e.col.z=i.z,e.col.y=a}}_buildTokens(){let e=this.model,t=kd(),n=new Oi({color:X.token,emissive:X.token,emissiveIntensity:.5,flatShading:!0});this.tokenMesh=new qr(t,n,5),this.tokenMesh.name=`tokens`;for(let t=0;t<5;t++){let n=(t+.5)/5+this.rng.range(-.03,.03),r=e.wrapS(n*e.length),i=this.rng.range(-.5,.5)*(e.halfWidthAt(r)-2);e.pointAt(r,i,this._pt);let a={kind:`area`,type:`token`,shape:`circle`,x:this._pt.x,z:this._pt.z,r:Wl.token.radius,y:e.heightAt(r,i)+1.3,collected:!1,index:t};this.world.add(a),this.tokensList.push(a)}this.group.add(this.tokenMesh),this._writeTokens()}_writeTokens(){if(this.tokenMesh){for(let e of this.tokensList){pd.setFromEuler(md.set(0,this.time*2+e.index,0));let t=e.collected?1e-4:1;fd.compose(hd.set(e.x,e.y+Math.sin(this.time*3+e.index)*.15,e.z),pd,gd.set(t,t*1.4,t)),this.tokenMesh.setMatrixAt(e.index,fd)}this.tokenMesh.instanceMatrix.needsUpdate=!0,this.tokenMesh.computeBoundingSphere()}}collectToken(e){e.collected=!0,e.disabled=!0}inDriftZone(e){let t=this.model;for(let[n,r]of this.zones){let i=t.deltaS(n,r)>0?t.deltaS(n,r):t.length-n+r;if(t.wrapS(e-n)<=i)return!0}return!1}knockCone(e,t,n){e.knocked=!0,e.resting=!1,e.disabled=!0,this.conesKnocked++;let r=Math.hypot(t,n),i=this.rng;e.vel.set(t*i.range(.7,1.2)+i.range(-2,2),Math.min(9,2.5+r*.18),n*i.range(.7,1.2)+i.range(-2,2)),e.spin.set(i.range(-12,12),i.range(-6,6),i.range(-12,12))}step(e,t){this.time+=e;for(let n of this.movers){let r=n.col;r.x,r.z,r.h,this._positionMover(n,n.time+e);let i=!1;if(t)for(let e=0;e<t.length&&!i;e++){let n=t[e].vehicle;yd.x=n.x,yd.z=n.z,yd.h=n.h,i=r.shape===`circle`?dd(yd,r.x,r.z,r.r,bd):ud(yd,r,bd)}i?(this._positionMover(n,n.time),n.blocked=!0):(n.time+=e,n.blocked=!1),this.world.move(r)}for(let t of this.cones){if(t.resting)continue;t.vel.y-=vd*e,t.pos.addScaledVector(t.vel,e);let n=this.model.heightAt(t.s,t.t);t.pos.y<n&&(t.pos.y=n,Math.abs(t.vel.y)>1.5?(t.vel.y*=-.35,t.vel.x*=.6,t.vel.z*=.6,t.spin.multiplyScalar(.6)):(t.vel.y=0,t.vel.x*=Math.exp(-4*e),t.vel.z*=Math.exp(-4*e),t.spin.multiplyScalar(Math.exp(-5*e)),t.vel.lengthSq()<.05&&(t.resting=!0)));let r=t.spin.length();r>.001&&(_d.copy(t.spin).multiplyScalar(1/r),pd.setFromAxisAngle(_d,r*e),t.rot.premultiply(pd)),t.x=t.pos.x,t.z=t.pos.z,this._coneDirty=!0}}_writeCone(e){fd.compose(e.pos,e.rot,gd.set(1,1,1)),this.coneMesh.setMatrixAt(e.index,fd)}frame(){if(this._coneDirty&&this.coneMesh){for(let e of this.cones)e.knocked&&this._writeCone(e);this.coneMesh.instanceMatrix.needsUpdate=!0,this.coneMesh.computeBoundingSphere(),this._coneDirty=!1}this.tokenMesh&&this._writeTokens()}reset(){this.time=0,this.conesKnocked=0;for(let e of this.cones)e.knocked=!1,e.resting=!0,e.disabled=!1,e.pos.set(e.home.x,e.home.y,e.home.z),e.vel.set(0,0,0),e.spin.set(0,0,0),e.rot.setFromEuler(md.set(0,e.home.h,0)),e.x=e.home.x,e.z=e.home.z,this.coneMesh&&this._writeCone(e);this.coneMesh&&(this.coneMesh.instanceMatrix.needsUpdate=!0,this.coneMesh.computeBoundingSphere());for(let e of this.tokensList)e.collected=!1,e.disabled=!1;for(let e of this.movers)e.time=0,e.blocked=!1,this._positionMover(e,0),this.world.move(e.col);this._writeTokens()}get hazards(){if(!this._hazards){this._hazards=[];for(let e of this.world.all)(e.kind===`cone`||e.kind===`solid`||e.kind===`soft`||e.kind===`area`&&e.type===`oil`)&&this._hazards.push(e)}return this._hazards}hazardAhead(e,t,n,r,i){let a=this.model,o=1/0,s=this.hazards;for(let c=0;c<s.length;c++){let l=s[c];if(l.disabled||l.kind===`wall`||l.kind===`solid`&&l.shape===`box`&&l.hz>3&&Math.abs(l.t)>a.halfWidthAt(l.s)+2)continue;let u=a.deltaS(e,l.s);if(u<=0||u>n||u>=o)continue;let d=l.shape===`circle`?l.r:Math.max(l.hx,l.hz);Math.abs(l.t-t)>r+d||(o=u,i.d=u,i.t=l.t,i.r=d)}return o<1/0}dispose(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose()}),this.mat.dispose(),this.group.traverse(e=>{e.material&&e.material!==this.mat&&e.material.dispose()}),this.group.parent&&this.group.parent.remove(this.group)}},Fd=(e,t,n)=>e<t?t:e>n?n:e,Id=e=>e>0?1:e<0?-1:0;function Ld(e,t){let n=e<0?-e:e,r=n<=1?n:1-t*Math.min(1,(n-1)/3);return e<0?-r:r}var Rd=class{constructor(e,{assist:t=`medium`,handling:n=`arcade`}={}){this.stats=e,this.params=zl(e),this.handling=n,this.setAssist(t),this.events={driftStart:0,driftEnd:0,boost:0,shift:0},this.reset(0,0,0)}setAssist(e){this.assist=J.assist[e]||J.assist.medium}reset(e,t,n,r=0){this.x=e,this.z=t,this.y=r,this.h=n,this.px=e,this.pz=t,this.py=r,this.ph=n,this.u=0,this.v=0,this.r=0,this.steer=0,this.steerAngle=0,this.throttle=0,this.brakeInput=0,this.handbrake=!1,this.gear=1,this.rpm=J.idleRpm,this.shiftTimer=0,this.drifting=!1,this.driftTime=0,this.exitTimer=0,this.slip=0,this.driftSide=1,this.pathRate=0,this.prevPsi=n,this.boostTime=0,this.boostAccel=0,this.nitro=J.nitroStart,this.nitroActive=!1,this.speedbreak=!1,this.recovering=!1,this.brakeTapTimer=9,this.surface=Rl.asphalt,this.longAccel=0,this.latAccel=0,this.skid=0,this.wheelAngle=0,this.braking=!1,this.reversing=!1,this.lastImpact=0,this.slipstream=0}savePrev(){this.px=this.x,this.pz=this.z,this.py=this.y,this.ph=this.h}get speed(){return Math.hypot(this.u,this.v)}get vx(){return Math.sin(this.h)*this.u+Math.cos(this.h)*this.v}get vz(){return Math.cos(this.h)*this.u-Math.sin(this.h)*this.v}setWorldVelocity(e,t){let n=Math.sin(this.h),r=Math.cos(this.h);this.u=e*n+t*r,this.v=e*r-t*n}triggerBoost(e,t){e<=0||(this.boostTime=Math.max(this.boostTime,e),this.boostAccel=Math.max(t,this.boostTime>0?this.boostAccel:0),this.events.boost++)}get boostMeter(){return this.nitro}addNitro(e){this.nitro=Math.min(1,this.nitro+e)}startDrift(e){this.drifting||(this.drifting=!0,this.driftSide=e,this.driftTime=0,this.exitTimer=0,this.recovering=!1,this.events.driftStart++)}step(e,t,n=Rl.asphalt){let r=this.params,i=J.cgToFront,a=J.cgToRear,o=i+a;this.surface=n;let s=Fd(t.steer||0,-1,1),c=(Math.abs(s)>Math.abs(this.steer)&&Id(s)===Id(this.steer||s)?J.steerRate*r.steerRateMul:J.steerReturn)*(this.speedbreak?1.3:1)*e;this.steer+=Fd(s-this.steer,-c,c);let l=Math.max(J.steerLockMin,J.steerLockLow/(1+Math.abs(this.u)/J.steerSpeedFalloff));this.drifting&&(l=Math.max(l,.3));let u=-this.steer*l;this.steerAngle=u;let d=Fd(t.throttle||0,0,1),f=Fd(t.brake||0,0,1);this.throttle=d,this.brakeInput=f,this.handbrake=!!t.handbrake;let p=this.u,m=r.vTop*(this.boostTime>0?J.boostTopSpeedBonus:1)*(this.nitroActive?J.nitroTopSpeedBonus:1),h=0;if(this.braking=!1,this.reversing=!1,d>0){if(p<-.5)h+=r.brakeDecel*d,this.braking=!0;else{let e=Math.max(0,p)/m,t=r.maxAccel*Math.max(0,1-e*e*e)+J.rolling+J.aeroDrag*p*p;this.shiftTimer>0&&(t*=.35),h+=d*t}}f>0&&(p>.8?(h-=f*r.brakeDecel,this.braking=!0):d<.1&&p>-J.reverseMax&&(h-=J.reverseAccel*f,this.reversing=!0));let g=Id(p);if(Math.abs(p)>.05&&(h-=g*(J.rolling+J.aeroDrag*p*p),d<.05&&(h-=g*J.engineBrake),h-=g*n.drag*Fd(Math.abs(p)/15,0,1),this.handbrake&&(h-=g*J.handbrakeDecel)),this.boostTime>0&&(h+=this.boostAccel*Fd(1-Math.max(0,p)/(m*1.05),0,1)+J.aeroDrag*p*p,this.boostTime-=e,this.boostTime<=0&&(this.boostTime=0,this.boostAccel=0)),this.nitroActive=!!t.boost&&this.nitro>.01&&p>-.5,this.nitroActive){let t=r.vTop*J.nitroTopSpeedBonus;h+=J.nitroAccel*Fd(1.08-Math.max(0,p)/t,0,1)+J.aeroDrag*p*p,this.nitro=Math.max(0,this.nitro-J.nitroBurn*e)}this.drifting&&d>0&&(h+=d*J.driftThrottleThrust),f>.5&&p>18?this.brakeTapTimer=0:this.brakeTapTimer+=e,this.slipstream>0&&d>0&&(h+=this.slipstream*(J.slipstreamAccel+J.aeroDrag*p*p*.35));let _=Ll*(1+r.downforce*p*p),v=this.longAccel,y=_*a/o-v*J.cgHeight/o,b=_*i/o+v*J.cgHeight/o;y=Math.max(y,_*.15),b=Math.max(b,_*.15);let x=this.handling===`arcade`,S=r.mu*n.grip*(x?J.arcadeGrip:1)*(this.speedbreak?J.speedbreakGrip:1),C=S*y,w=S*b;if(this.handbrake&&p>2)w*=J.handbrakeRearGrip;else if(this.drifting){let e=Math.min(1,d*1.25+Math.abs(this.steer)*.6);w*=1-(1-r.driftRearGrip)*e}d>0&&p>2&&(w*=1-r.powerOversteer*d*.3*Fd(1-p/45,0,1));let T=this.u,E=this.v,D=this.r,ee=Math.max(Math.abs(p),1),O=u-Math.atan2(this.v+i*this.r,ee),k=-Math.atan2(this.v-a*this.r,ee),te=C*Ld(J.corneringFront*O,J.tyreFalloff),A=w*Ld(J.corneringRear*k,J.tyreFalloff),ne=Math.cos(u),j=Math.sin(u),re=p<0?0:Fd((Math.abs(p)-1.5)/(J.lowSpeedBlend-1.5),0,1),M=h+re*(-te*j+this.v*this.r),ie=te*ne+A-p*this.r,N=(i*te*ne-a*A)/(i*a);this.handbrake&&p>8&&(N+=-this.steer*J.handbrakeYaw*Fd(p/22,0,1.2));let ae=p>.5?Math.atan2(this.v,p):0;this.slip=ae;let oe=Math.abs(ae);if(p>3&&oe>this.assist.maxAngle&&(N+=Id(ae)*this.assist.spin*(oe-this.assist.maxAngle)),T+=M*e,E+=ie*e,D+=N*e,!x&&this.drifting&&p>3){let t=this.driftSide,n=(.4+.34*(this.steer*t))*Fd((d-.15)/.65,0,1)*r.driftAngleMul;n=Fd(n,0,this.assist.maxAngle-.06);let i=this.pathRate-t*3.2*(n-oe);D+=(i-D)*(1-Math.exp(-this.assist.hold*r.driftStab*e))}let se=!1;if(x&&this.drifting&&p>3){se=!0;let t=this.driftSide,n=Math.hypot(this.u,this.v),i=this.steer*t,a=Math.atan2(this.v,Math.max(.5,this.u)),o=i<-.45||Math.abs(this.steer)<.12&&!this.handbrake||d<.12||n<J.driftMinSpeed*.75;this.exitTimer=o?this.exitTimer+e:0,this.exitTimer>J.arcadeExitDelay&&(this.recovering=!0);let s=0;this.recovering||(s=t*Fd((J.arcadeAngle+J.arcadeAngleSteer*i+(this.handbrake?.14:0))*r.driftAngleMul,.1,.8));let c=this.recovering?J.arcadeRecover:J.arcadeAngleRate,l=a+(s-a)*(1-Math.exp(-c*e)),u=S*Ll*(1+r.downforce*n*n)*(.72+.32*Math.max(-.5,i)+(this.handbrake?.2:0)),f=this.recovering?Math.abs(this.pathRate)*Math.exp(-3*e):u/Math.max(8,n),p=this.h+a-t*f*e,m=Math.max(0,n+(h*Math.cos(a)*J.arcadeDrive-J.arcadeScrub*Math.abs(Math.sin(a))*Fd(n/20,0,1.5))*e),g=p-l-this.h;g>Math.PI?g-=Math.PI*2:g<-Math.PI&&(g+=Math.PI*2),D=g/e,T=m*Math.cos(l),E=m*Math.sin(l),this.recovering&&Math.abs(l)<.05&&this.endDrift(!0)}if(this.braking&&p>0&&T<0&&(T=0),this.braking&&p<0&&T>0&&(T=0),re<1&&!se){let t=T*Math.tan(u)/o,n=this.v*Math.exp(-12*e);D=t+(D-t)*re,E=n+(E-n)*re}T<-J.reverseMax&&(T=-J.reverseMax);let ce=(T-this.u)/e-this.v*this.r,le=(E-this.v)/e+this.u*this.r;this.longAccel+=(Fd(ce,-40,30)-this.longAccel)*Math.min(1,e*10),this.latAccel+=(Fd(le,-45,45)-this.latAccel)*Math.min(1,e*8),this.u=T,this.v=E,this.r=D;let P=Math.sin(this.h),ue=Math.cos(this.h);this.x+=(P*this.u+ue*this.v)*e,this.z+=(ue*this.u-P*this.v)*e,this.h+=this.r*e,this.h>Math.PI?this.h-=Math.PI*2:this.h<-Math.PI&&(this.h+=Math.PI*2),this.h-this.ph>Math.PI?this.ph+=Math.PI*2:this.h-this.ph<-Math.PI&&(this.ph-=Math.PI*2);let de=Math.hypot(this.u,this.v),fe=Math.atan2(P*this.u+ue*this.v,ue*this.u-P*this.v);if(de>3){let t=fe-this.prevPsi;t>Math.PI?t-=Math.PI*2:t<-Math.PI&&(t+=Math.PI*2),this.pathRate+=(t/e-this.pathRate)*Math.min(1,e*30)}else this.pathRate=0;this.prevPsi=fe;let pe=this.u>.5?Math.atan2(this.v,this.u):0,me=Math.abs(pe);if(x){if(!this.drifting&&this.u>J.driftMinSpeed){let e=this.steer;this.handbrake&&Math.abs(e)>.25||this.brakeTapTimer<J.brakeTapWindow&&Math.abs(e)>.55&&d>.3&&this.u>18?this.startDrift(Id(e)):me>r.driftEnter*1.3&&this.startDrift(Id(pe))}else this.drifting&&(this.driftTime+=e)}else this.drifting&&Id(pe)!==this.driftSide&&me>r.driftEnter&&this.endDrift(!0),this.drifting?(this.driftTime+=e,this.exitTimer=me<J.driftExitAngle?this.exitTimer+e:0,(this.exitTimer>J.driftExitDelay||this.u<J.driftMinSpeed*.6)&&this.endDrift(!0)):this.u>J.driftMinSpeed&&me>r.driftEnter&&(this.drifting=!0,this.driftSide=Id(pe),this.driftTime=0,this.exitTimer=0,this.events.driftStart++);this.drifting&&(this.nitro=Math.min(1,this.nitro+r.driftBoostGain*J.nitroDriftFill*(.4+Math.min(1.2,me/.5))*Fd(this.u/30,0,1.4)*e)),this.u>r.vTop*.78&&!this.nitroActive&&(this.nitro=Math.min(1,this.nitro+J.nitroSpeedFill*e)),this.slipstream>0&&(this.nitro=Math.min(1,this.nitro+J.nitroDraftFill*this.slipstream*e)),this.updateDrivetrain(e,d),this.wheelAngle+=this.u/.34*e,(this.wheelAngle>1e4||this.wheelAngle<-1e4)&&(this.wheelAngle%=Math.PI*2),this.skid=this.u>5&&n!==Rl.grass&&n!==Rl.sand?Fd((me-.09)*4.5,0,1)+(this.handbrake&&this.u>6?.4:0):0,this.skid>1&&(this.skid=1)}endDrift(e){this.drifting&&(this.drifting=!1,this.recovering=!1,this.exitTimer=0,this.events.driftEnd++,e||(this.r*=.5))}updateDrivetrain(e,t){let n=this.params,r=this.u,i;if(r<-.5)i=0;else{i=J.gearRatios.length;for(let e=0;e<J.gearRatios.length;e++)if(r<J.gearRatios[e]*n.vTop){i=e+1;break}}i>0&&this.gear>0&&i<this.gear&&r>J.gearRatios[i-1]*n.vTop*.93&&(i=this.gear),i>this.gear&&this.gear>0&&(this.shiftTimer=J.shiftTime,this.events.shift++),this.gear=i,this.shiftTimer>0&&(this.shiftTimer=Math.max(0,this.shiftTimer-e));let a;if(i===0)a=J.idleRpm+Math.abs(r)/J.reverseMax*5e3;else{let e=J.gearRatios[i-1]*n.vTop;a=J.maxRpm*Math.max(0,r)/e,i===1&&(a=Math.max(a,J.idleRpm+t*3e3))}a=Fd(a,J.idleRpm,J.maxRpm),this.rpm+=(a-this.rpm)*Math.min(1,e*14)}applyContact(e,t,n,r=J.wallRestitution,i=J.wallFriction){this.x+=e*n,this.z+=t*n;let a=this.vx,o=this.vz,s=a*e+o*t;if(s>=0)return 0;let c=-s;a-=(1+r)*s*e,o-=(1+r)*s*t;let l=-t,u=e,d=a*l+o*u,f=Math.min(Math.abs(d),i*c+.5*c*J.wallSpeedLoss);return a-=Id(d)*f*l,o-=Id(d)*f*u,this.setWorldVelocity(a,o),this.r*=c>8?.4:.85,this.lastImpact=c,c}applyImpulse(e,t){this.setWorldVelocity(this.vx+e,this.vz+t)}},zd=Bl.frontAxle,Bd=-Bl.rearAxle,Vd=.66,Hd=.7,Ud=.33,Wd=.36,Gd=null;function Kd(){if(Gd)return Gd;let e=(e,t)=>{let n=new ru;for(let r=0;r<10;r++){let i=r/10*Math.PI*2,a=(r+1)/10*Math.PI*2,o=Math.cos(i)*e,s=Math.sin(i)*e,c=Math.cos(a)*e,l=Math.sin(a)*e,u=r===0?X.rim:X.tyreRubber,d=n.v(-t/2,o,s,u),f=n.v(t/2,o,s,u),p=n.v(t/2,c,l,u),m=n.v(-t/2,c,l,u);n.quad(d,m,p,f);for(let r of[-1,1]){let u=r*t/2,d=e*.62,f=n.v(u+r*.005,0,0,X.rim),p=n.v(u,Math.cos(i)*d,Math.sin(i)*d,X.rim),m=n.v(u,Math.cos(a)*d,Math.sin(a)*d,X.rim),h=n.v(u,o,s,X.tyreRubber),g=n.v(u,c,l,X.tyreRubber),_=n.v(u,Math.cos(i)*d,Math.sin(i)*d,X.tyreRubber),v=n.v(u,Math.cos(a)*d,Math.sin(a)*d,X.tyreRubber);r>0?(n.tri(f,p,m),n.quad(_,h,g,v)):(n.tri(f,m,p),n.quad(v,g,h,_))}}return n.build()};return Gd={front:e(Ud,.32),rear:e(Wd,.42),mat:new Oi({vertexColors:!0,flatShading:!0})},Gd}function qd(e,{z0:t,z1:n,w0:r,w1:i,yb0:a,yt0:o,yb1:s,yt1:c,color:l,x:u=0}){let d=[[u-r/2,a,t],[u+r/2,a,t],[u+r/2,o,t],[u-r/2,o,t],[u-i/2,s,n],[u+i/2,s,n],[u+i/2,c,n],[u-i/2,c,n]];for(let t of[[1,0,3,2],[4,5,6,7],[0,4,7,3],[5,1,2,6],[3,7,6,2],[0,1,5,4]]){let n=t.map(t=>e.v(d[t][0],d[t][1],d[t][2],l));e.quad(n[0],n[1],n[2],n[3])}}function Jd(e,t,n){let r=new ru,i=t.primary,a=t.secondary,o=t.accent,s=X.carbon,c=e.bodyWidth,l=zd+.35+e.nose*.45;qd(r,{z0:Bd-.3,z1:zd-.35,w0:1.2,w1:1,yb0:.08,yt0:.14,yb1:.08,yt1:.14,color:s}),qd(r,{z0:-.6,z1:.9,w0:c,w1:c*.82,yb0:.14,yt0:.62,yb1:.14,yt1:.58,color:i}),qd(r,{z0:.9,z1:l,w0:c*.62,w1:.2,yb0:.2,yt0:.56,yb1:.18,yt1:.3,color:i}),qd(r,{z0:.9,z1:l-.05,w0:.16,w1:.06,yb0:.56,yt0:.585,yb1:.3,yt1:.32,color:o});for(let t of[-1,1]){let n=t*(c/2+e.podWidth/2-.02);qd(r,{x:n,z0:-.2-e.podLength*.6,z1:.75,w0:e.podWidth*.55,w1:e.podWidth,yb0:.14,yt0:.38,yb1:.14,yt1:.5,color:i}),qd(r,{x:n,z0:.74,z1:.78,w0:e.podWidth*.8,w1:e.podWidth*.8,yb0:.22,yt0:.44,yb1:.22,yt1:.44,color:X.hazardBlack}),qd(r,{x:n+t*.001,z0:-.1,z1:.6,w0:e.podWidth*.86,w1:e.podWidth*1.01,yb0:.3,yt0:.36,yb1:.38,yt1:.45,color:a})}qd(r,{z0:Bd+.1,z1:-.6,w0:.42,w1:c*.9,yb0:.14,yt0:.42,yb1:.14,yt1:.62+e.engineCover*.5,color:i}),qd(r,{z0:-.62,z1:-.25,w0:.34,w1:.3,yb0:.62,yt0:.62+e.engineCover*.6,yb1:.6,yt1:.95+e.engineCover*.3,color:a}),e.fin&&qd(r,{z0:Bd+.2,z1:-.5,w0:.04,w1:.04,yb0:.42,yt0:.72,yb1:.6,yt1:.9,color:o}),qd(r,{z0:-.35,z1:.45,w0:c*.56,w1:c*.5,yb0:.6,yt0:.63,yb1:.57,yt1:.6,color:X.hazardBlack}),pu(r,0,.6,0,.16,.18,8,n,n),fu(r,0,.78,0,.16,.08,8,n,au(n,.15)),Z(r,0,.71,.12,.26,.06,.1,X.helmetVisor),Z(r,0,.74,.5,.06,.28,.06,s),Z(r,0,.88,.2,.06,.04,.62,s);for(let e of[-1,1])Z(r,e*.22,.8,-.08,.05,.05,.5,s,e*.35);let u=e.frontWing,d=l-.05;Z(r,0,.1,d,u,.04,.42,a),Z(r,0,.16,d-.16,u*.92,.035,.18,o);for(let e of[-1,1])Z(r,e*(u/2-.02),.16,d-.02,.03,.18,.5,a);qd(r,{z0:d-.1,z1:d+.1,w0:.14,w1:.12,yb0:.1,yt0:.26,yb1:.1,yt1:.22,color:i});let f=e.rearWing,p=Bd-.38,m=e.rearWingHeight;for(let e of[-1,1])Z(r,f/2*e,m*.68,p,.04,m*.62,.62,a);Z(r,0,m*.86,p-.04,f,.05,.42,a),Z(r,0,m*.96,p-.18,f*.98,.04,.2,o),Z(r,0,m*.45,p+.12,.1,m*.62,.12,s),qd(r,{z0:Bd-.55,z1:Bd+.2,w0:1,w1:1.1,yb0:.12,yt0:.3,yb1:.08,yt1:.14,color:s});for(let e of[-1,1])Z(r,e*.42,.34,zd,.52,.03,.06,s),Z(r,e*.42,.24,zd,.52,.03,.06,s),Z(r,e*.46,.34,Bd,.5,.03,.06,s),Z(r,e*.46,.24,Bd,.5,.03,.06,s);return Z(r,0,.36,Bd-.58,.18,.08,.04,X.hazardBlack),r.build()}function Yd(e){return eu.find(t=>t.id===e)||eu[0]}var Xd=class{constructor(e,t,{helmetIndex:n=0,castShadow:r=!0}={}){this.def=e,this.root=new ln,this.root.name=`car-${e.id}`,this.bodyGroup=new ln,this.root.add(this.bodyGroup),this.helmet=tu[n%tu.length],this.bodyMat=new Oi({vertexColors:!0,flatShading:!0}),this.body=new G(Jd(e.shape,Yd(t),this.helmet),this.bodyMat),this.body.castShadow=r,this.body.name=`body`,this.bodyGroup.add(this.body),this.liveryId=t;let i=Kd();this.wheels=[];let a=e.shape.wheelScale||1,o=[[Vd,zd,!0,Ud],[-.66,zd,!0,Ud],[Hd,Bd,!1,Wd],[-.7,Bd,!1,Wd]];for(let[e,t,n,s]of o){let o=new ln;o.position.set(e,s*a,t);let c=new G(n?i.front:i.rear,i.mat);c.scale.setScalar(a),c.castShadow=r,o.add(c),this.root.add(o),this.wheels.push({pivot:o,mesh:c,front:n})}this.brakeMat=new Oi({color:X.brakeOff,emissive:X.brakeOn,emissiveIntensity:0}),this.brakeLight=new G(new ui(.16,.06,.03),this.brakeMat),this.brakeLight.position.set(0,.36,Bd-.61),this.bodyGroup.add(this.brakeLight),this.brakeGlow=0,this.roll=0,this.pitch=0,this.visible=!0}setLivery(e){if(e===this.liveryId)return;this.liveryId=e;let t=this.body.geometry;this.body.geometry=Jd(this.def.shape,Yd(e),this.helmet),t.dispose()}update(e,t,n,r){let i=e.px+(e.x-e.px)*t,a=e.pz+(e.z-e.pz)*t,o=e.ph+(e.h-e.ph)*t,s=n?n.y:0;this.root.position.set(i,s,a),this.root.rotation.set(n?n.pitch:0,o,n?n.roll:0,`YXZ`);let c=Math.min(1,(r||.016)*8);this.roll+=(Math.max(-.07,Math.min(.07,e.latAccel*.0035))-this.roll)*c,this.pitch+=(Math.max(-.05,Math.min(.05,-e.longAccel*.0025))-this.pitch)*c,this.bodyGroup.rotation.set(this.pitch,0,this.roll),this.bodyGroup.position.y=n&&n.bump?n.bump:0;let l=Math.max(-J.visualSteerClamp,Math.min(J.visualSteerClamp,e.steerAngle));for(let t of this.wheels)t.mesh.rotation.x=e.wheelAngle,t.front&&(t.pivot.rotation.y=l);let u=e.braking?1:e.reversing?.5:0;this.brakeGlow+=(u-this.brakeGlow)*Math.min(1,(r||.016)*18),this.brakeMat.emissiveIntensity=this.brakeGlow*3}dispose(){this.body.geometry.dispose(),this.bodyMat.dispose(),this.brakeLight.geometry.dispose(),this.brakeMat.dispose(),this.root.parent&&this.root.parent.remove(this.root)}};function Zd(e){let t=[e.bodyMat];e.bodyMat.transparent=!0,e.bodyMat.opacity=.32,e.bodyMat.depthWrite=!1;let n=new Oi({vertexColors:!0,flatShading:!0,transparent:!0,opacity:.32,depthWrite:!1});for(let t of e.wheels)t.mesh.material=n,t.mesh.castShadow=!1;t.push(n),e.body.castShadow=!1,e.brakeLight.visible=!1,e.ghostMats=t;let r=e.dispose.bind(e);return e.dispose=()=>{n.dispose(),r()},e}var Qd=Object.freeze([{id:`falcon`,name:`Falcon F1-R`,tagline:`Long nose · balanced`,stats:{acceleration:6,topSpeed:7,braking:6,handling:6,downforce:6,drift:5},defaultLivery:`ember`,unlock:null,shape:{nose:1.25,bodyWidth:.78,podWidth:.42,podLength:1.3,frontWing:1.72,rearWing:1.05,rearWingHeight:.95,engineCover:.55,wheelScale:1,fin:!0}},{id:`viper`,name:`Viper V6`,tagline:`Short tail · drift specialist`,stats:{acceleration:7,topSpeed:5,braking:5,handling:7,downforce:4,drift:9},defaultLivery:`volt`,unlock:null,shape:{nose:1,bodyWidth:.74,podWidth:.36,podLength:1.1,frontWing:1.6,rearWing:.95,rearWingHeight:1.08,engineCover:.62,wheelScale:1.04,fin:!1}},{id:`comet`,name:`Comet C3`,tagline:`Compact · easy to drive`,stats:{acceleration:8,topSpeed:4,braking:7,handling:8,downforce:5,drift:6},defaultLivery:`glacier`,unlock:null,shape:{nose:.82,bodyWidth:.8,podWidth:.4,podLength:1,frontWing:1.55,rearWing:.9,rearWingHeight:.9,engineCover:.5,wheelScale:.94,fin:!1}},{id:`titan`,name:`Titan T9`,tagline:`Wide body · huge grip`,stats:{acceleration:5,topSpeed:6,braking:8,handling:6,downforce:9,drift:3},defaultLivery:`cobalt`,unlock:{stars:8,text:`8 stars`},shape:{nose:1.1,bodyWidth:.9,podWidth:.52,podLength:1.5,frontWing:1.78,rearWing:1.2,rearWingHeight:1,engineCover:.6,wheelScale:1.1,fin:!0}},{id:`raven`,name:`Raven R7`,tagline:`Low drag · top speed`,stats:{acceleration:6,topSpeed:9,braking:6,handling:5,downforce:5,drift:6},defaultLivery:`graphite`,unlock:{stars:16,text:`16 stars`},shape:{nose:1.4,bodyWidth:.72,podWidth:.34,podLength:1.6,frontWing:1.6,rearWing:.88,rearWingHeight:.82,engineCover:.46,wheelScale:.98,fin:!0}},{id:`nova`,name:`Nova N1`,tagline:`Flagship · all-rounder`,stats:{acceleration:9,topSpeed:8,braking:8,handling:8,downforce:7,drift:8},defaultLivery:`magenta`,unlock:{stars:26,text:`26 stars`},shape:{nose:1.2,bodyWidth:.8,podWidth:.46,podLength:1.4,frontWing:1.74,rearWing:1.1,rearWingHeight:1,engineCover:.58,wheelScale:1.02,fin:!0}}]),$d=Object.freeze([[`acceleration`,`Acceleration`],[`topSpeed`,`Top speed`],[`braking`,`Braking`],[`handling`,`Handling`],[`downforce`,`Downforce`],[`drift`,`Drift`]]);function ef(e){return Qd.find(t=>t.id===e)||Qd[0]}var tf=Object.freeze({minSpeed:9,baseRate:42,zoneMultiplier:2,comboStep:1.4,maxMultiplier:8,chainGrace:.85}),nf=class{constructor(){this.reset()}reset(){this.active=!1,this.current=0,this.multiplier=1,this.chainTime=0,this.grace=0,this.banked=0,this.bestCombo=0,this.longest=0,this.events=[],this.inZone=!1}get total(){return this.banked+this.current}update(e,t,{onTrack:n=!0,inZone:r=!1}={}){this.inZone=r;let i=t.drifting&&t.u>tf.minSpeed;if(i&&!n)this.breakCombo(`offtrack`);else if(i){this.active=!0,this.grace=0,this.chainTime+=e;let n=Math.min(1.6,Math.abs(t.slip)/.52),i=Math.min(2.2,t.u/30),a=r?tf.zoneMultiplier:1,o=this.multiplier;this.multiplier=Math.min(tf.maxMultiplier,1+Math.floor(this.chainTime/tf.comboStep)),this.multiplier>o&&this.events.push({type:`combo`,multiplier:this.multiplier}),this.current+=tf.baseRate*n*i*a*this.multiplier*e,this.chainTime>this.longest&&(this.longest=this.chainTime)}else this.active&&(this.grace+=e,this.grace>tf.chainGrace&&this.bank())}bank(){if(this.current>0){let e=Math.round(this.current);this.banked+=e,e>this.bestCombo&&(this.bestCombo=e),this.events.push({type:`bank`,points:e,multiplier:this.multiplier})}this.current=0,this.multiplier=1,this.chainTime=0,this.grace=0,this.active=!1}breakCombo(e){(this.current>0||this.active)&&this.events.push({type:`break`,points:Math.round(this.current),reason:e}),this.current=0,this.multiplier=1,this.chainTime=0,this.grace=0,this.active=!1}consumeEvents(){if(!this.events.length)return null;let e=this.events;return this.events=[],e}},rf=.9;function af(e,t){return e.finished&&t.finished?e.finishTime-t.finishTime:e.finished?-1:t.finished?1:t.progress-e.progress}var of=class{constructor({mode:e,laps:t,racers:n,checkpoints:r,seed:i=1,humans:a=1}){this.mode=e,this.humans=a,this.laps=t,this.racers=n,this.cp=r,this.seed=i,this.reset()}reset(){this.state=`grid`,this.time=0,this.countdown=0,this.lights=0;let e=Au(this.seed);this.holdAfterLights=.5+e.next()*.8,this.goTime=-1,this.finishTime=-1,this.playerFinished=!1,this.humansFinished=0,this.finishOrder=[],this.events=[]}get canDrive(){return this.state===`running`||this.state===`finished`}startCountdown(){this.state=`countdown`,this.countdown=0,this.lights=0}step(e){if(this.state===`countdown`){this.countdown+=e;let t=Math.min(5,Math.floor(this.countdown/rf)+1);t!==this.lights&&this.countdown<4.5&&(this.lights=t,this.events.push({type:`light`,n:t})),this.countdown>=4.5+this.holdAfterLights&&(this.lights=0,this.state=`running`,this.goTime=0,this.time=0,this.events.push({type:`go`}))}else(this.state===`running`||this.state===`finished`)&&(this.time+=e)}finish(e){e.finished||(e.finished=!0,e.finishTime=this.time+e.penalty,this.finishOrder.push(e),e.isHuman&&(this.humansFinished++,this.humansFinished>=this.humans&&(this.playerFinished=!0,this.state=`finished`,this.finishTime=this.time,this.events.push({type:`finish`,racer:e}))))}get allHumansFinished(){return this.humansFinished>=this.humans}forceFinish(){this.state===`running`&&(this.state=`finished`,this.finishTime=this.time,this.events.push({type:`finish`,racer:null}))}rank(){let e=this.racers;for(let t of e)t.progress=this.cp.progress(t.cp,t.proj.s);e.sort(af);for(let t=0;t<e.length;t++)e[t].position=t+1;return e}buildResults(e,t={}){this.rank();let n=this.racers.map(t=>{let n=t.finished?t.finishTime:null;if(!t.finished){let e=this.cp.model.length*Math.max(1,this.laps),r=Math.max(1,t.progress),i=r/Math.max(1,this.time);n=this.time+Math.max(0,e-r)/Math.max(5,i)+t.penalty}return{name:t.name,car:t.carDef.name,isPlayer:!!(t.isHuman||t.isRemote),you:t===e,finished:t.finished,time:n,best:t.timer.bestLap,position:t.position}});n.sort((e,t)=>e.time-t.time),n.forEach((e,t)=>e.position=t+1);let r=n.find(e=>e.you);return{mode:this.mode,laps:this.laps,position:r?r.position:1,totalTime:e.finished?e.finishTime:this.time,bestLap:e.timer.bestLap,lapTimes:e.timer.lapTimes.slice(),penalty:e.penalty,rows:n,...t}}},sf=class{constructor(e,t=3){this.cpCount=e,this.sectorCount=t,this.bestCp=null,this.reset()}reset(){this.raceTime=0,this.lapStart=-1,this.lapTime=0,this.lastLap=0,this.bestLap=0,this.lapTimes=[],this.sectorStart=0,this.sectors=Array.from({length:this.sectorCount},()=>0),this.lastSectors=Array.from({length:this.sectorCount},()=>0),this.bestSectors=Array.from({length:this.sectorCount},()=>0),this.sectorState=Array.from({length:this.sectorCount},()=>null),this.cpTimes=Array.from({length:this.cpCount},()=>0),this.delta=null,this.bestCp=null,this.penalty=0,this.running=!1}setReference(e,t){e>0&&(this.refLap=e,this.refCp=Array.isArray(t)&&t.length===this.cpCount?t.slice():null)}start(e){this.running=!0,this.lapStart=e,this.sectorStart=e,this.raceTime=e}tick(e){this.raceTime=e,this.lapStart>=0&&(this.lapTime=e-this.lapStart)}checkpoint(e,t){if(this.lapStart<0)return;let n=t-this.lapStart;this.cpTimes[e]=n;let r=this.refCp||this.bestCp;r&&e>0&&r[e]>0&&(this.delta=n-r[e])}sector(e,t){if(this.lapStart<0)return null;let n=t-this.sectorStart;this.sectorStart=t,this.sectors[e]=n;let r=this.bestSectors[e],i=`slow`;return(!r||n<r)&&(i=`best`,this.bestSectors[e]=n),this.sectorState[e]=i,{index:e,time:n,state:i}}lap(e){let t=e-this.lapStart;this.sector(this.sectorCount-1,e),this.lastLap=t,this.lapTimes.push(t);let n=!this.bestLap||t<this.bestLap,r=this.refLap||0;return this.delta=r?t-r:this.bestLap&&!n?t-this.bestLap:null,n&&(this.bestLap=t,this.bestCp=this.cpTimes.slice()),(!r||t<r)&&(this.refLap=t,this.refCp=this.cpTimes.slice(),this.refCp[0]=t),this.lastSectors=this.sectors.slice(),this.sectors.fill(0),this.sectorState.fill(null),this.cpTimes.fill(0),this.lapStart=e,this.sectorStart=e,this.lapTime=0,{time:t,best:n,lap:this.lapTimes.length}}};function cf(e,{short:t=!1,decimals:n=3}={}){if(!(e>0)||!Number.isFinite(e))return n===3?`-:--.---`:`-:--.-`;let r=Math.floor(e/60),i=e-r*60,a=i.toFixed(n).padStart(n+3,`0`);return t&&r===0?i.toFixed(n):`${r}:${a}`}function lf(e){return e==null||!Number.isFinite(e)?``:(e<0?`-`:`+`)+Math.abs(e).toFixed(3)}var uf=Object.freeze([`K. Arden`,`M. Volkova`,`J. Okafor`,`L. Moreau`,`R. Tanaka`,`S. Lindqvist`,`D. Reyes`]),df=Object.freeze({easy:{pace:.84,corner:.86,gain:2,band:[.9,1.06],mistake:.25},medium:{pace:.93,corner:.93,gain:2.3,band:[.95,1.04],mistake:.12},hard:{pace:.995,corner:.99,gain:2.5,band:[.985,1.025],mistake:.04}}),ff=e=>Math.atan2(Math.sin(e),Math.cos(e)),pf=(e,t,n)=>e<t?t:e>n?n:e,mf=class{constructor(e,t,n,{difficulty:r=`medium`,index:i=0,count:a=1,rng:o,obstacles:s}){this.racer=e,this.model=t,this.line=n,this.skill=df[r]||df.medium,this.index=i,this.count=a,this.obstacles=s,this.pace=this.skill.pace*(1-i*.012)*(o?o.range(.985,1.01):1),this.lane=(i%3-1)*.9+(o?o.range(-.4,.4):0),this.controls={throttle:0,brake:0,steer:0,handbrake:!1,boost:!1},this._pt={x:0,y:0,z:0,tx:0,tz:1,i:0},this._hz={d:0,t:0,r:0},this.reset()}reset(){this.avoid=0,this.avoidTarget=0,this.passSide=0,this.passTime=0,this.band=1,this.waiting=!1,this.controls.throttle=this.controls.brake=this.controls.steer=0}drive(e,t){let n=this.racer,r=n.vehicle,i=this.model,a=n.proj.s,o=Math.max(0,r.u),s=t.player;if(s&&s!==n&&!s.finished){let t=n.progress-s.progress,[r,i]=this.skill.band,a=1;t>60?a=r+(1-r)*Math.max(0,1-(t-60)/240):t<-60&&(a=1+(i-1)*Math.min(1,(-t-60)/240)),this.band+=(a-this.band)*Math.min(1,e*.5)}else this.band+=(1-this.band)*Math.min(1,e*.5);let c=null,l=22;for(let e of t.racers){if(e===n)continue;let t=i.deltaS(a,e.proj.s);t>0&&t<l&&Math.abs(e.proj.t-n.proj.t)<2.4&&(l=t,c=e)}if(c&&c.vehicle.u<o+2&&this.passTime<=0){let e=i.halfWidthAt(a),t=c.proj.t+e,n=e-c.proj.t;this.passSide=n>t?1:-1,this.passTime=2.2}this.passTime>0?this.passTime-=e:this.passSide=0;let u=i.halfWidthAt(a),d=a+(10+o*.5),f=this.line.offsetAt(d)+this.lane;if(this.passSide!==0&&c&&(f=c.proj.t+this.passSide*3.2),this.avoidTarget=0,this.obstacles&&this.obstacles.hazardAhead(a,f,30+o*.9,1.3,this._hz)){let e=this._hz,t=e.t-(e.r+1.9),n=e.t+(e.r+1.9),r=Math.abs(t-f)<Math.abs(n-f)?t:n,i=pf(r,-u+1.6,u-1.6);this.avoidTarget=Math.abs(i-e.t)<e.r+1.2?pf(r===t?n:t,-u+1.6,u-1.6)-f:i-f}this.avoid+=(this.avoidTarget-this.avoid)*Math.min(1,e*3),f=pf(f+this.avoid,-u+1.5,u-1.5),i.pointAt(d,f,this._pt);let p=ff(Math.atan2(this._pt.x-r.x,this._pt.z-r.z)-r.h),m=this.controls;m.steer=pf(-p*this.skill.gain+r.r*.1,-1,1);let h=o*.55+8,g=this.line.minSpeedAhead(a,h)*this.skill.corner;if(g=Math.min(g,r.params.vTop*this.pace),g*=this.band,this.skill.mistake>0&&Math.abs(i.kappa[n.proj.i])>1/60&&(g*=1-this.skill.mistake*.15),this.waiting=!1,this.obstacles)for(let e of this.obstacles.movers){if(e.type!==`truck`)continue;let t=i.deltaS(a,e.s);if(t<=-4||t>90)continue;let n=Math.max(0,t)/Math.max(4,o);if(t>0&&this.obstacles.truckBlocks(e,n,1.4)){let e=Math.max(0,t-11);g=Math.min(g,Math.sqrt(22*e)),o<3&&(this.waiting=!0)}}let _=g-o;return g<.5&&o<1.5?(m.throttle=0,m.brake=0):_>0?(m.throttle=pf(_*.4+.15,0,1),m.brake=0):(m.throttle=_>-1.5?.15:0,m.brake=_<-1.5&&o>1.2?pf(-_*.22,0,1):0),Math.abs(r.slip)>.2&&(m.throttle*=.4),m.handbrake=!1,m.boost=r.boostMeter>.6,m}},hf=e=>Math.atan2(Math.sin(e),Math.cos(e)),gf=(e,t)=>1-Math.exp(-e*t),_f=Object.freeze({chase:{dist:6.8,height:2.45,lookAhead:5.5,lookHeight:.9,fov:62,headingK:3,lateralK:4,heightK:7,swing:.55},close:{dist:5,height:2,lookAhead:6,lookHeight:1.05,fov:64,headingK:3.6,lateralK:5,heightK:9,swing:.45}}),vf=class{constructor(e=_f.chase){this.p=e,this.yaw=0,this.side=0,this.y=0,this.fov=e.fov,this.pos={x:0,y:0,z:0},this.look={x:0,y:0,z:0},this.initialized=!1}setPreset(e){this.p=e}snap(e){this.yaw=e.h,this.side=0,this.y=e.y+this.p.height,this.fov=this.p.fov,this.initialized=!0}update(e,t,n){let r=this.p;this.initialized||this.snap(e);let i=e.h+e.slip*r.swing;this.yaw+=hf(i-this.yaw)*gf(r.headingK,t);let a=Math.sin(e.h),o=Math.cos(e.h),s=-o,c=a,l=Math.sin(this.yaw),u=Math.cos(this.yaw),d=-r.dist*(l*s+u*c);this.side+=(d-this.side)*gf(r.lateralK,t);let f=-Math.sqrt(Math.max(.01,r.dist*r.dist-this.side*this.side)),p=e.x+a*f+s*this.side,m=e.z+o*f+c*this.side,h=e.y+r.height;this.y+=(h-this.y)*gf(r.heightK,t),Math.abs(this.y-h)>4&&(this.y=h);let g=this.y;if(n){let e=n(p,g,m);p=e.x,g=e.y,m=e.z}this.pos.x=p,this.pos.y=g,this.pos.z=m;let _=e.h+e.slip*r.swing*.6;this.look.x=e.x+Math.sin(_)*r.lookAhead,this.look.z=e.z+Math.cos(_)*r.lookAhead,this.look.y=e.y+r.lookHeight;let v=Math.min(1,e.speed/85)*13,y=Math.min(1,Math.abs(e.slip)/.6)*6,b=e.boost?9:0;return this.fov+=(r.fov+v+y+b-this.fov)*gf(e.boost?5:3,t),this}},yf=Object.freeze([`chase`,`close`,`cockpit`,`tv`]),bf=Object.freeze({chase:`Chase`,close:`Close chase`,cockpit:`Cockpit`,tv:`TV`}),xf=new H,Sf=class{constructor(e=`chase`){this.camera=new la(62,1,.15,2600),this.chase=new vf(_f.chase),this.mode=yf.includes(e)?e:`chase`,this.model=null,this.tvSpots=[],this.tvIndex=-1,this.carState={x:0,y:0,z:0,h:0,speed:0,slip:0},this._proj={s:0,t:0,i:-1},this._clampOut={x:0,y:0,z:0},this._tmp={x:0,y:0,z:0,tx:0,tz:1,i:0},this._clamp=this._clamp.bind(this),this.shake=0,this.shakeT=0,this._applyPreset()}setTrack(e){this.model=e,this._proj.i=-1,this.tvSpots=[];let t={x:0,y:0,z:0},n=Math.max(6,Math.round(e.length/140));for(let r=0;r<n;r++){let i=e.length*(r+.5)/n;if(e.isTunnel(i)||e.isTunnel(i+40)||e.isTunnel(i-40))continue;let a=r%2?1:-1,o=a*(e.wallOffset(i)+2.5);e.pointAt(i,o,t),this.tvSpots.push({s:i,x:t.x,y:e.heightAt(i,a*e.wallOffset(i))+7.5,z:t.z})}}setMode(e){this.mode=e,this._applyPreset(),this.chase.initialized=!1,this.tvIndex=-1}cycle(){let e=yf.indexOf(this.mode);return this.setMode(yf[(e+1)%yf.length]),this.mode}_applyPreset(){this.mode===`close`?this.chase.setPreset(_f.close):this.chase.setPreset(_f.chase)}setAspect(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}addShake(e){this.shake=Math.min(1,this.shake+e)}snap(){this.chase.initialized=!1,this._proj.i=-1,this.tvIndex=-1}_clamp(e,t,n){let r=this._clampOut;r.x=e,r.y=t,r.z=n;let i=this.model;if(!i)return r;let a=i.project(e,n,this._proj.i,this._proj),o=i.wallOffset(a.s)-.45,s=this._tmp;Math.abs(a.t)>o&&(i.pointAt(a.s,Math.sign(a.t)*o,s),r.x=s.x,r.z=s.z);let c=i.heightAt(a.s,Math.max(-o,Math.min(o,a.t)));return r.y<c+.7&&(r.y=c+.7),r}update(e,t){let n=this.camera,r=62;if(this.mode===`cockpit`){let t=Math.sin(e.h),i=Math.cos(e.h);n.position.set(e.x+t*.15,e.y+.98,e.z+i*.15),xf.set(e.x+t*30,e.y+.6,e.z+i*30),n.up.set(0,1,0),n.lookAt(xf),r=72+Math.min(1,e.speed/85)*8}else if(this.mode===`tv`&&this.tvSpots.length){let t=this.model,i=t.project(e.x,e.z,this._proj.i,this._proj),a=0,o=1/0;for(let e=0;e<this.tvSpots.length;e++){let n=Math.abs(t.deltaS(i.s+25,this.tvSpots[e].s));n<o&&(o=n,a=e)}this.tvIndex=a;let s=this.tvSpots[a];n.position.set(s.x,s.y,s.z),n.lookAt(e.x,e.y+.6,e.z);let c=Math.hypot(s.x-e.x,s.z-e.z);r=Math.max(10,Math.min(50,1100/Math.max(20,c)))}else{let i=this.chase.update(e,t,this._clamp);n.position.set(i.pos.x,i.pos.y,i.pos.z),n.lookAt(i.look.x,i.look.y,i.look.z),r=i.fov}if(this.shake>.001){this.shakeT+=t*60;let e=this.shake*.12;n.position.x+=Math.sin(this.shakeT*1.7)*e,n.position.y+=Math.sin(this.shakeT*2.3)*e*.6,this.shake*=Math.exp(-t*7)}Math.abs(n.fov-r)>.01&&(n.fov=r,n.updateProjectionMatrix())}},Cf=`
attribute float size;
attribute float alpha;
attribute vec3 tint;
varying float vAlpha;
varying vec3 vTint;
uniform float scale;
void main() {
  vAlpha = alpha;
  vTint = tint;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = min(size * scale / max(0.1, -mv.z), 56.0);
  gl_Position = projectionMatrix * mv;
}`,wf=`
varying float vAlpha;
varying vec3 vTint;
void main() {
  if (vAlpha <= 0.003) discard;
  gl_FragColor = vec4(vTint, vAlpha);
  #include <colorspace_fragment>
}`,Tf=class{constructor(e=300){this.cap=e,this.pos=new Float32Array(e*3),this.vel=new Float32Array(e*3),this.tint=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.life=new Float32Array(e),this.maxLife=new Float32Array(e),this.grow=new Float32Array(e),this.alpha0=new Float32Array(e),this.gravity=new Float32Array(e),this.drag=new Float32Array(e),this.next=0,this.live=0;let t=new fr;this.posAttr=new Zn(this.pos,3).setUsage(Ue),this.sizeAttr=new Zn(this.size,1).setUsage(Ue),this.alphaAttr=new Zn(this.alpha,1).setUsage(Ue),this.tintAttr=new Zn(this.tint,3).setUsage(Ue),t.setAttribute(`position`,this.posAttr),t.setAttribute(`size`,this.sizeAttr),t.setAttribute(`alpha`,this.alphaAttr),t.setAttribute(`tint`,this.tintAttr),t.boundingSphere=new ir(new H,1e6),this.material=new Ei({vertexShader:Cf,fragmentShader:wf,uniforms:{scale:{value:600}},transparent:!0,depthWrite:!1}),this.points=new ri(t,this.material),this.points.frustumCulled=!1,this.points.name=`particles`,this.group=this.points,this.colors={smoke:new W(X.smoke),dust:new W(X.concrete),sand:new W(X.oilRim).lerp(new W(Y.chalk),.55),spark:new W(X.sparks),flame:new W(X.cone),flameCore:new W(X.boostBlue)}}_spawn(e,t,n,r,i,a,o,s,c,l,u,d,f){let p=this.next;this.next=(this.next+1)%this.cap;let m=p*3;this.pos[m]=e,this.pos[m+1]=t,this.pos[m+2]=n,this.vel[m]=r,this.vel[m+1]=i,this.vel[m+2]=a,this.tint[m]=u.r,this.tint[m+1]=u.g,this.tint[m+2]=u.b,this.size[p]=o,this.grow[p]=s,this.life[p]=c,this.maxLife[p]=c,this.alpha0[p]=l,this.alpha[p]=l,this.gravity[p]=d,this.drag[p]=f}smoke(e,t,n,r,i,a=1){let o=Math.random;this._spawn(e,t,n,r+(o()-.5)*1.5,.6+o()*.8,i+(o()-.5)*1.5,.35+o()*.25,1.1,.9+o()*.5,.26*Math.min(1,a+.3),this.colors.smoke,-.4,1.2)}dust(e,t,n,r,i,a=1,o=!1){let s=Math.random,c=o?this.colors.sand:this.colors.dust;for(let o=0;o<a;o++)this._spawn(e,t,n,r+(s()-.5)*3,.8+s()*1.5,i+(s()-.5)*3,.22+s()*.18,.7,.6+s()*.4,.3,c,1.5,1.5)}sparks(e,t,n,r,i,a=10){let o=Math.random;for(let s=0;s<a;s++){let a=4+o()*8;this._spawn(e,t,n,r*a+(o()-.5)*6,1.5+o()*4,i*a+(o()-.5)*6,.12+o()*.08,-.05,.35+o()*.35,1,this.colors.spark,14,.5)}}flame(e,t,n,r,i,a=!1){let o=Math.random,s=o()<(a?.7:.4),c=a?s?.14:.2:s?.1:.16;this._spawn(e,t,n,r*7+(o()-.5),(o()-.3)*.6,i*7+(o()-.5),c,-.3,.12+o()*.1,.9,s?this.colors.flameCore:this.colors.flame,0,2)}update(e,t){let n=this.cap,r=0;for(let t=0;t<n;t++){if(this.life[t]<=0){this.alpha[t]!==0&&(this.alpha[t]=0);continue}r++,this.life[t]-=e;let n=t*3,i=Math.exp(-this.drag[t]*e);this.vel[n]*=i,this.vel[n+1]=this.vel[n+1]*i-this.gravity[t]*e,this.vel[n+2]*=i,this.pos[n]+=this.vel[n]*e,this.pos[n+1]+=this.vel[n+1]*e,this.pos[n+2]+=this.vel[n+2]*e,this.size[t]=Math.max(.02,this.size[t]+this.grow[t]*e);let a=Math.max(0,this.life[t]/this.maxLife[t]);this.alpha[t]=this.alpha0[t]*a}this.live=r,t&&(this.material.uniforms.scale.value=window.innerHeight/(2*Math.tan(t.fov*Math.PI/360))),this.posAttr.needsUpdate=!0,this.sizeAttr.needsUpdate=!0,this.alphaAttr.needsUpdate=!0,this.tintAttr.needsUpdate=!0}reset(){this.life.fill(0),this.alpha.fill(0),this.alphaAttr.needsUpdate=!0,this.live=0}dispose(){this.points.geometry.dispose(),this.material.dispose(),this.points.parent&&this.points.parent.remove(this.points)}},Ef=new W,Df=class{constructor(e=800){this.cap=e,this.next=0,this.count=0,this.pos=new Float32Array(e*4*3),this.col=new Float32Array(e*4*4);let t=new Uint32Array(e*6);for(let n=0;n<e;n++){let e=n*4;t.set([e,e+1,e+2,e,e+2,e+3],n*6)}let n=new fr;this.posAttr=new Zn(this.pos,3).setUsage(Ue),this.colAttr=new Zn(this.col,4).setUsage(Ue),n.setAttribute(`position`,this.posAttr),n.setAttribute(`color`,this.colAttr),n.setIndex(new Zn(t,1)),n.boundingSphere=new ir(new H,1e6),this.material=new wr({vertexColors:!0,transparent:!0,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),this.mesh=new G(n,this.material),this.mesh.frustumCulled=!1,this.mesh.name=`skidmarks`,this.dirty=!1,Ef.setHex(X.skid),this.r=Ef.r,this.g=Ef.g,this.b=Ef.b}add(e,t,n,r,i,a,o){let s=r-e,c=a-n,l=Math.hypot(s,c);if(l<.05||l>4)return;let u=.16,d=-c/l*u,f=s/l*u,p=this.next;this.next=(this.next+1)%this.cap,this.count=Math.min(this.cap,this.count+1);let m=p*12,h=this.pos;h[m]=e-d,h[m+1]=t,h[m+2]=n-f,h[m+3]=e+d,h[m+4]=t,h[m+5]=n+f,h[m+6]=r+d,h[m+7]=i,h[m+8]=a+f,h[m+9]=r-d,h[m+10]=i,h[m+11]=a-f;let g=.2+.4*o,_=p*16;for(let e=0;e<4;e++)this.col[_+e*4]=this.r,this.col[_+e*4+1]=this.g,this.col[_+e*4+2]=this.b,this.col[_+e*4+3]=g;this.dirty=!0}update(){this.dirty&&=(this.posAttr.needsUpdate=!0,this.colAttr.needsUpdate=!0,!1)}reset(){this.pos.fill(0),this.col.fill(0),this.next=0,this.count=0,this.dirty=!0,this.update()}dispose(){this.mesh.geometry.dispose(),this.material.dispose(),this.mesh.parent&&this.mesh.parent.remove(this.mesh)}};function Q(e,t={},n=[]){let r=document.createElement(e);for(let e in t){let n=t[e];if(n!=null&&n!==!1){if(e===`className`)r.className=n;else if(e===`text`)r.textContent=n;else if(e===`dataset`)Object.assign(r.dataset,n);else if(e===`style`)Object.assign(r.style,n);else if(e===`attrs`)for(let e in n)n[e]!==void 0&&n[e]!==null&&n[e]!==!1&&r.setAttribute(e,n[e]===!0?``:String(n[e]));else e.startsWith(`on`)&&typeof n==`function`?r.addEventListener(e.slice(2).toLowerCase(),n):r[e]=n}}return Of(r,n),r}function Of(e,t){if(t==null||t===!1)return e;if(Array.isArray(t))for(let n of t)Of(e,n);else t instanceof Node?e.appendChild(t):e.appendChild(document.createTextNode(String(t)));return e}function kf(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function Af(e,t){let n=String(t);e.__text!==n&&(e.__text=n,e.textContent=n)}function jf(e,t,n){let r=`__c_`+t;e[r]!==n&&(e[r]=n,e.classList.toggle(t,n))}function Mf(e,t,n){let r=`__s_`+t;e[r]!==n&&(e[r]=n,e.style[t]=n)}function Nf({label:e,labelRight:t,raised:n=!1,translucent:r=!1,flush:i=!1,className:a=``,children:o}={}){let s=[`panel`];n&&s.push(`panel--raised`),r&&s.push(`panel--translucent`),i&&s.push(`panel--flush`),a&&s.push(a);let c=Q(`section`,{className:s.join(` `)});if(e){let n=Q(`header`,{className:`panel__label`},[Q(`span`,{text:e})]);t&&Of(n,t),c.appendChild(n)}return c.body=c,Of(c,o),c}function Pf({label:e,value:t=``,unit:n,size:r=`md`,align:i=`left`,hazard:a=!1,className:o=``}={}){let s=Q(`span`,{className:`stat__value`,text:String(t)}),c=Q(`span`,{className:`stat__unit`,text:n||``}),l=Q(`span`,{className:`stat__label`,text:e||``}),u=Q(`div`,{className:`stat stat--${r} stat--${i} ${o}`.trim()},[l,Q(`div`,{className:`stat__row`},[s,n?c:null])]);a&&u.classList.add(`stat--hazard`);let d=null;return u.set=e=>Af(s,e),u.setLabel=e=>Af(l,e),u.setUnit=e=>Af(c,e),u.setHazard=e=>jf(u,`stat--hazard`,!!e),u.setTone=e=>{e!==d&&(d&&u.classList.remove(`stat--${d}`),d=e,d&&u.classList.add(`stat--${d}`))},u.valueEl=s,u}function Ff({label:e,tone:t=`neutral`}={}){return Q(`span`,{className:`badge badge--${t}`,text:e})}function If({text:e,tone:t=`red`,size:n=`sm`,className:r=``}={}){let i=[`hazard-band`];t===`amber`&&i.push(`hazard-band--amber`),n===`lg`&&i.push(`hazard-band--lg`),r&&i.push(r);let a=Q(`div`,{className:i.join(` `),attrs:{role:e?`status`:`presentation`}}),o=e?Q(`span`,{className:`hazard-band__text`,text:e}):null;return o&&a.appendChild(o),a.setText=e=>{o&&(o.textContent=e)},a}function Lf({keys:e=[],label:t=``}={}){return Q(`span`,{className:`keyhint`},[Q(`span`,{className:`keyhint__keys`},e.map(e=>Q(`kbd`,{className:`kbd`,text:e}))),t?Q(`span`,{text:t}):null])}function Rf(e){return Q(`kbd`,{className:`kbd`,text:e})}var zf=class{constructor(e){this.el=Q(`div`,{className:`toast-stack layer-passive`,attrs:{"aria-live":`polite`}}),e.appendChild(this.el),this.items=[]}show(e,t=`neutral`,n=2.2){let r=Q(`div`,{className:`toast toast--${t}`,text:e});for(this.el.appendChild(r),this.items.push({el:r,t:n});this.items.length>4;)this._remove(0)}update(e){for(let t=this.items.length-1;t>=0;t--){let n=this.items[t];n.t-=e,n.t<=.4&&!n.leaving&&(n.leaving=!0,n.el.classList.add(`is-leaving`)),n.t<=0&&this._remove(t)}}_remove(e){let t=this.items[e];t.el.parentNode&&t.el.parentNode.removeChild(t.el),this.items.splice(e,1)}clear(){for(;this.items.length;)this._remove(0)}dispose(){this.clear(),this.el.parentNode&&this.el.parentNode.removeChild(this.el)}};function Bf({text:e,tone:t=`neutral`}={}){return Q(`div`,{className:`toast toast--${t}`,text:e})}var Vf=16,Hf=class{constructor(e,{mode:t,laps:n,opponents:r,units:i=`kmh`,touch:a=!1,bindings:o,onTouch:s,onPause:c,rect:l=null,compact:u=!1,label:d=null,device:f=`all`,speedbreak:p=!1}){this.mode=t,this.units=i,this.el=Q(`div`,{className:`hud layer-passive${l?` hud--split`:``}${u?` hud--compact`:``}`,attrs:{"aria-live":`off`}}),l&&Object.assign(this.el.style,{left:`${l[0]*100}%`,top:`${l[1]*100}%`,width:`${l[2]*100}%`,height:`${l[3]*100}%`,right:`auto`,bottom:`auto`}),e.appendChild(this.el),d&&this.el.appendChild(Q(`div`,{className:`hud__player`,text:d})),this.posStat=Pf({label:`Pos`,value:`-`,unit:`/ ${r+1}`,size:`lg`}),this.lapStat=Pf({label:`Lap`,value:`-`,unit:n>0?`/ ${n}`:``,size:`lg`}),this.modeBadge=Ff({label:Uf(t),tone:`solid`});let m=Nf({translucent:!0,className:`hud__tl`,children:[Q(`div`,{className:`hud__row`},[r>0?this.posStat:null,this.lapStat]),this.modeBadge]});this.el.appendChild(m),this.lapTime=Pf({label:`Lap time`,value:cf(0),size:`md`,align:`right`}),this.lastStat=Pf({label:`Last`,value:cf(0),size:`sm`,align:`right`}),this.bestStat=Pf({label:`Best`,value:cf(0),size:`sm`,align:`right`}),this.deltaEl=Q(`div`,{className:`hud__delta`}),this.sectorEls=[0,1,2].map(e=>Q(`span`,{className:`hud__sector`,text:`S${e+1}`})),this.targetStat=Pf({label:`Target`,value:``,size:`sm`,align:`right`});let h=Nf({translucent:!0,className:`hud__tr`,children:[this.lapTime,this.deltaEl,Q(`div`,{className:`hud__sectors`},this.sectorEls),Q(`div`,{className:`hud__row hud__row--right`},[this.lastStat,this.bestStat]),this.targetStat]});this.el.appendChild(h),this.targetStat.style.display=`none`,this.speedVal=Q(`span`,{className:`hud__speed-value`,text:`0`}),this.speedUnit=Q(`span`,{className:`hud__speed-unit`,text:i===`mph`?`MPH`:`KM/H`}),this.gearVal=Q(`span`,{className:`hud__gear`,text:`N`}),this.rpmSegs=[];for(let e=0;e<Vf;e++){let t=Q(`span`,{className:`hud__rpm-seg`+(e>=12?` is-red`:e>=8?` is-mid`:``)});this.rpmSegs.push(t)}let g=El[f],_=o||{},v=(e,t)=>g&&g[e]?jl(g[e][0]):f.startsWith(`pad`)?t.pad:_[e]&&_[e][0]?jl(_[e][0]):t.key;this.boostFill=Q(`div`,{className:`hud__boost-fill`}),this.boostWrap=Q(`div`,{className:`hud__boost`,attrs:{title:`Nitro: hold to burn. Refills from drifts, near misses, slipstream and flat-out speed.`}},[Q(`span`,{className:`hud__boost-label`,text:`Nitro ${v(`boost`,{key:`Shift`,pad:`X`})}`}),Q(`div`,{className:`hud__boost-track`},[this.boostFill])]),this.sbFill=Q(`div`,{className:`hud__boost-fill hud__sb-fill`}),this.sbWrap=p?Q(`div`,{className:`hud__boost hud__sb`,attrs:{title:`Speedbreaker: slow motion. Refills while drifting or flat out.`}},[Q(`span`,{className:`hud__boost-label`,text:`Speedbreaker ${v(`speedbreak`,{key:`Q`,pad:`LB`})}`}),Q(`div`,{className:`hud__boost-track`},[this.sbFill])]):null;let y=Q(`div`,{className:`hud__bc`},[Q(`div`,{className:`hud__rpm`},this.rpmSegs),Q(`div`,{className:`hud__speed-row`},[Q(`div`,{className:`hud__speed`},[this.speedVal,this.speedUnit]),Q(`div`,{className:`hud__gear-box`},[Q(`span`,{className:`hud__gear-label`,text:`Gear`}),this.gearVal])]),this.boostWrap,this.sbWrap]);this.el.appendChild(y),this.slowmo=Q(`div`,{className:`hud__slowmo`}),this.el.appendChild(this.slowmo),this.driftBanner=Q(`div`,{className:`hud__drift-banner`,text:`Drift`}),this.driftPts=Q(`div`,{className:`hud__drift-points`,text:`0`}),this.driftMult=Q(`div`,{className:`hud__drift-mult`,text:`×1`}),this.driftZone=Ff({label:`Drift zone ×2`,tone:`good`}),this.drift=Q(`div`,{className:`hud__drift`},[this.driftBanner,Q(`div`,{className:`hud__drift-row`},[this.driftPts,this.driftMult]),this.driftZone]),this.el.appendChild(this.drift),this.scoreStat=Pf({label:`Drift score`,value:`0`,size:`md`,align:`right`}),this.tokenStat=Pf({label:`Tokens`,value:`0`,size:`sm`,align:`right`});let b=Nf({translucent:!0,className:`hud__br`,children:[this.scoreStat,this.tokenStat]});this.el.appendChild(b),this.mapHolder=Q(`div`,{className:`hud__map`}),this.el.appendChild(this.mapHolder),this.center=Q(`div`,{className:`hud__center`}),this.bigText=Q(`div`,{className:`hud__big`}),this.subText=Q(`div`,{className:`hud__sub`}),this.wrongWay=If({text:`Wrong way`,tone:`amber`,size:`lg`,className:`hud__wrongway`}),this.center.append(this.bigText,this.subText,this.wrongWay),this.el.appendChild(this.center),this.bigTimer=0,this.lights=[];for(let e=0;e<5;e++)this.lights.push(Q(`span`,{className:`hud__light`}));this.lightsEl=Q(`div`,{className:`hud__lights`,attrs:{"aria-hidden":`true`}},this.lights),this.el.appendChild(this.lightsEl),this.holdFill=Q(`div`,{className:`hud__hold-fill`}),this.hold=Q(`div`,{className:`hud__hold`},[Q(`span`,{className:`hud__hold-label`,text:`Hold to restart`}),Q(`div`,{className:`hud__hold-track`},[this.holdFill])]),this.el.appendChild(this.hold);let x=(e,t)=>v(e,t);this.hints=Q(`div`,{className:`hud__hints`},[Lf({keys:g?[x(`throttle`,{}),x(`brake`,{})]:f.startsWith(`pad`)?[`RT`,`LT`]:[v(`throttle`,{key:`W`}),v(`brake`,{key:`S`})],label:`Drive`}),Lf({keys:g?[x(`left`,{}),x(`right`,{})]:f.startsWith(`pad`)?[`L-stick`]:[v(`left`,{key:`A`}),v(`right`,{key:`D`})],label:`Steer`}),Lf({keys:[v(`handbrake`,{key:`Space`,pad:`A`})],label:`Drift`}),Lf({keys:[v(`boost`,{key:`Shift`,pad:`X`})],label:`Nitro`}),p?Lf({keys:[v(`speedbreak`,{key:`Q`,pad:`LB`})],label:`Slow-mo`}):null,Lf({keys:[v(`camera`,{key:`C`,pad:`B`})],label:`Camera`}),l?null:Lf({keys:[`Esc`],label:`Pause`})]),this.el.appendChild(this.hints),this.hintTime=9,this.toasts=new zf(this.el),this.touchEl=null,a&&this._buildTouch(s,c),this.brPanel=b,t!==`drift`&&Mf(b,`display`,`none`),this.showDriftScore=t===`drift`,this.lastDriftVisible=null}_buildTouch(e,t){let n=(t,n,r)=>{let i=Q(`button`,{className:`touch-btn ${r||``}`,text:t,attrs:{type:`button`,"aria-label":n}}),a=t=>e(n,t);i.addEventListener(`pointerdown`,e=>{e.preventDefault(),i.setPointerCapture(e.pointerId),i.classList.add(`is-down`),a(!0)});let o=e=>{e.preventDefault(),i.classList.remove(`is-down`),a(!1)};return i.addEventListener(`pointerup`,o),i.addEventListener(`pointercancel`,o),i.addEventListener(`lostpointercapture`,o),i},r=Q(`button`,{className:`touch-btn touch-btn--pause`,text:`II`,attrs:{type:`button`,"aria-label":`Pause`}});r.addEventListener(`click`,()=>t()),this.touchEl=Q(`div`,{className:`touch`},[Q(`div`,{className:`touch__left`},[n(`◀`,`left`),n(`▶`,`right`)]),Q(`div`,{className:`touch__right`},[Q(`div`,{className:`touch__col`},[n(`Drift`,`handbrake`,`touch-btn--sm`),n(`Boost`,`boost`,`touch-btn--sm`)]),Q(`div`,{className:`touch__col`},[n(`Gas`,`throttle`,`touch-btn--tall`),n(`Brake`,`brake`)])]),r]),this.el.appendChild(this.touchEl)}setMiniMap(e){this.mapHolder.appendChild(e.canvas)}setMiniMapVisible(e){Mf(this.mapHolder,`display`,e?``:`none`)}flash(e,t=``,n=``,r=1.6){this.bigText.textContent=e,this.bigText.className=`hud__big`+(n?` hud__big--${n}`:``),this.subText.textContent=t,this.bigTimer=r,jf(this.center,`is-visible`,!0)}toast(e,t){this.toasts.show(e,t)}setLights(e,t){jf(this.lightsEl,`is-visible`,t);for(let t=0;t<5;t++)jf(this.lights[t],`is-on`,t<e)}update(e,t){let n=this.units===`mph`?e.speed*2.23694:e.speed*3.6;Af(this.speedVal,Math.round(Math.abs(n))),Af(this.gearVal,e.gear===0?`R`:e.speed<.5&&e.throttle<.05?`N`:String(e.gear));let r=Math.round((e.rpm-4200)/8300*Vf),i=e.rpm>12100;for(let e=0;e<Vf;e++)jf(this.rpmSegs[e],`is-on`,e<r);jf(this.el,`is-limiter`,i),Mf(this.boostFill,`transform`,`scaleX(${e.boostMeter.toFixed(2)})`),jf(this.boostWrap,`is-ready`,e.boostMeter>=.15),jf(this.boostWrap,`is-active`,!!e.nitroActive||e.boosting),this.sbWrap&&e.speedbreak>=0&&(Mf(this.sbFill,`transform`,`scaleX(${e.speedbreak.toFixed(2)})`),jf(this.sbWrap,`is-ready`,e.speedbreak>.15),jf(this.sbWrap,`is-active`,!!e.slowmo)),jf(this.slowmo,`is-on`,!!e.slowmo),Af(this.posStat.valueEl,e.position>0?e.position:`-`),Af(this.lapStat.valueEl,e.lap>0?e.lap:`-`),this.lapTime.set(e.lapTime>0?cf(e.lapTime):`0:00.000`),this.lastStat.set(cf(e.lastLap)),this.bestStat.set(cf(e.bestLap));let a=lf(e.delta);Af(this.deltaEl,a),jf(this.deltaEl,`is-good`,e.delta!==null&&e.delta<0),jf(this.deltaEl,`is-bad`,e.delta!==null&&e.delta>=0);for(let t=0;t<3;t++){let n=e.sectors[t];jf(this.sectorEls[t],`is-best`,n===`best`),jf(this.sectorEls[t],`is-done`,n===`slow`)}e.target?(Mf(this.targetStat,`display`,``),this.targetStat.setLabel(e.target.label),this.targetStat.set(e.target.value),this.targetStat.setHazard(!!e.target.hazard)):Mf(this.targetStat,`display`,`none`);let o=e.driftActive||e.driftPoints>0;o!==this.lastDriftVisible&&(this.lastDriftVisible=o,jf(this.drift,`is-visible`,o)),Af(this.driftPts,Math.round(e.driftPoints)),Af(this.driftMult,`×${e.driftMultiplier}`),jf(this.driftBanner,`is-live`,e.driftActive),Mf(this.driftZone,`display`,e.inDriftZone?``:`none`),(this.showDriftScore||e.driftTotal>0)&&(this.brPanel.style.display===`none`&&Mf(this.brPanel,`display`,``),this.scoreStat.set(Math.round(e.driftTotal))),this.tokenStat.set(`${e.tokens}/${e.tokensTotal}`),Mf(this.tokenStat,`display`,e.tokensTotal>0?``:`none`),jf(this.wrongWay,`is-visible`,e.wrongWay),jf(this.center,`has-wrongway`,e.wrongWay),jf(this.hold,`is-visible`,e.resetHold>.12),Mf(this.holdFill,`transform`,`scaleX(${Math.min(1,e.resetHold).toFixed(2)})`),this.bigTimer>0&&(this.bigTimer-=t,this.bigTimer<=0&&jf(this.center,`is-visible`,!1)),this.hintTime>0&&(this.hintTime-=t,this.hintTime<=0&&jf(this.hints,`is-hidden`,!0)),this.toasts.update(t)}dispose(){this.toasts.dispose(),this.el.parentNode&&this.el.parentNode.removeChild(this.el)}};function Uf(e){return{practice:`Practice`,timetrial:`Time trial`,grandprix:`Grand Prix`,timeattack:`Time attack`,drift:`Drift challenge`}[e]||e}var Wf=class{constructor(e,t=168){this.model=e,this.size=t;let n=Math.min(2,window.devicePixelRatio||1);this.canvas=document.createElement(`canvas`),this.canvas.className=`minimap__canvas`,this.canvas.width=Math.round(t*n),this.canvas.height=Math.round(t*n),this.canvas.style.width=`${t}px`,this.canvas.style.height=`${t}px`,this.ctx=this.canvas.getContext(`2d`),this.dpr=n;let r=e.bounds,i=Math.max(r.maxX-r.minX,r.maxZ-r.minZ);this.scale=(t-20)*n/i,this.ox=t*n/2-(r.minX+r.maxX)/2*this.scale,this.oz=t*n/2-(r.minZ+r.maxZ)/2*this.scale,this.base=document.createElement(`canvas`),this.base.width=this.canvas.width,this.base.height=this.canvas.height,this._drawBase(),this.colors={player:Ql(Y.infoBlue),ai:Ql(Y.chalk),leader:Ql(Y.red),ring:Ql(Y.void)}}_x(e){return this.canvas.width-(e*this.scale+this.ox)}_z(e){return this.canvas.height-(e*this.scale+this.oz)}_drawBase(){let e=this.base.getContext(`2d`),t=this.model;e.lineJoin=`round`,e.lineCap=`round`;let n=()=>{e.beginPath();for(let n=0;n<=t.n;n+=3){let r=n%t.n,i=this._x(t.px[r]),a=this._z(t.pz[r]);n===0?e.moveTo(i,a):e.lineTo(i,a)}e.closePath()};n(),e.strokeStyle=Ql(Y.void),e.lineWidth=9*this.dpr,e.stroke(),n(),e.strokeStyle=Ql(Y.chalk),e.lineWidth=3.5*this.dpr,e.stroke();let r=this._x(t.px[0]),i=this._z(t.pz[0]),a=-t.tx[0],o=-t.tz[0];e.strokeStyle=Ql(Y.red),e.lineWidth=3*this.dpr,e.beginPath(),e.moveTo(r-o*7*this.dpr,i+a*7*this.dpr),e.lineTo(r+o*7*this.dpr,i-a*7*this.dpr),e.stroke()}draw(e){let t=this.ctx;t.clearRect(0,0,this.canvas.width,this.canvas.height),t.drawImage(this.base,0,0);let n=3.6*this.dpr;for(let r=0;r<2;r++)for(let i=0;i<e.length;i++){let a=e[i];if(r===1!=!!a.player)continue;let o=this._x(a.x),s=this._z(a.z);t.fillStyle=this.colors.ring,t.fillRect(o-n-this.dpr,s-n-this.dpr,(n+this.dpr)*2,(n+this.dpr)*2),t.fillStyle=a.player?this.colors.player:a.leader?this.colors.leader:this.colors.ai,t.fillRect(o-n,s-n,n*2,n*2)}}},Gf=20,Kf=4,qf=class{constructor(){this.cap=4800,this.buf=new Float32Array(this.cap*Kf),this.count=0,this.acc=0,this.overflow=!1}begin(){this.count=0,this.acc=0,this.overflow=!1}record(e,t){if(this.acc+=e,this.acc<1/Gf-1e-9&&this.count>0)return;if(this.acc=0,this.count>=this.cap){this.overflow=!0;return}let n=this.count*Kf;this.buf[n]=t.x,this.buf[n+1]=t.y,this.buf[n+2]=t.z,this.buf[n+3]=t.h,this.count++}toLap(){return this.overflow||this.count<2?null:{rate:Gf,count:this.count,data:this.buf.slice(0,this.count*Kf)}}};function Jf(e){let t=Array.from(e.data,e=>Math.round(e*100)/100);return{rate:e.rate,count:e.count,data:t}}function Yf(e){return!e||typeof e!=`object`||!Array.isArray(e.data)||e.count*Kf!==e.data.length||e.count<2||!e.data.every(e=>typeof e==`number`&&Number.isFinite(e))?null:{rate:e.rate||Gf,count:e.count,data:Float32Array.from(e.data)}}function Xf(e,t,n){let r=t*e.rate,i=Math.floor(r);if(i<0||i>=e.count-1)return!1;let a=i*Kf,o=a+Kf,s=r-i,c=e.data;n.x=c[a]+(c[o]-c[a])*s,n.y=c[a+1]+(c[o+1]-c[a+1])*s,n.z=c[a+2]+(c[o+2]-c[a+2])*s;let l=c[o+3]-c[a+3];return l>Math.PI?l-=Math.PI*2:l<-Math.PI&&(l+=Math.PI*2),n.h=c[a+3]+l*s,!0}var Zf=3,Qf=Bl.width/2,$f=Bl.length/2,ep=2.6,tp=45,np=Object.freeze({throttle:0,brake:0,steer:0,handbrake:!1,boost:!1});function rp(e){if(e<=1)return{views:[[0,0,1,1]],spare:null};if(e===2)return{views:[[0,0,.5,1],[.5,0,.5,1]],spare:null};if(e<=4){let t=[[0,0,.5,.5],[.5,0,.5,.5],[0,.5,.5,.5],[.5,.5,.5,.5]];return{views:t.slice(0,e),spare:e===3?t[3]:null}}let t=1/3,n=[[0,0,t,.5],[t,0,t,.5],[2*t,0,t,.5],[0,.5,t,.5],[t,.5,t,.5],[2*t,.5,t,.5]];return{views:n.slice(0,e),spare:e===5?n[5]:null}}var ip=class{constructor(e,t){this.game=e,this.config=t,this.def=nd[t.circuitId],this.scene=new vn,this.online=t.online||null;let n=t.humans&&t.humans.length?t.humans:[{name:`You`,carId:t.carId,liveryId:t.liveryId,device:`all`}];this.humanDefs=n.slice(0,6),this.layout=rp(this.humanDefs.length),this.humans=[],this.ready=!1,this.paused=!1,this.inputBlocked=!1,this.finishedTimer=0,this.resultsSent=!1,this.onFinished=null,this.racers=[],this.player=null,this.contacts=[],this.debug={maxPenetration:0,lastPenetration:0,cameraInside:!1,steps:0},this.inputOverride=null,this.timeScale=1,this.speedbreakAllowed=this.humanDefs.length===1&&!this.online,this.waitingForGo=!!this.online,this.firstHumanFinish=-1,this._target={label:``,value:``,hazard:!1},this._ev={type:null,index:-1,lap:0,sector:0},this._box={x:0,z:0,h:0,hx:0,hz:0},this._box2={x:0,z:0,h:0,hx:0,hz:0},this._hit={nx:0,nz:0,depth:0},this._pt={x:0,y:0,z:0,tx:0,tz:1,i:0},this._pose={x:0,y:0,z:0,h:0,speed:0,slip:0,boost:!1},this._ground={y:0,pitch:0,roll:0,bump:0},this._dots=[],this.tokens=0}get views(){return this.humans.map(e=>({camera:e.rig.camera,rect:e.rect,human:e}))}get camera(){return this.humans[0].rig.camera}get rig(){return this.humans[0].rig}get hud(){return this.humans[0].hud}get drift(){return this.humans[0].drift}*load(){let e=this.game.quality.preset,t=this.config,n=this.humanDefs.length>1;yield{progress:.02,label:`Preparing circuit`};let r=$l[this.def.theme];Lu(this.scene,r,e.drawDistance),this.sky=Nu(r),this.scene.add(this.sky),this.lights=Pu(r,{shadows:e.shadows&&!n,shadowSize:e.shadowSize,shadowExtent:34}),this.scene.add(this.lights.group);let i=Uu(this.def,{quality:e,propDensity:n?.7:1}),a=i.next();for(;!a.done;)yield{progress:.04+a.value.progress*.56,label:a.value.label},a=i.next();this.track=a.value,this.model=this.track.model,this.scene.add(this.track.group),yield{progress:.64,label:`Colliders`},this.world=new sd(this.model),this.world.addWalls(),this.checkpoints=new cd(this.model,this.def.sectors),this.line=new ld(this.model,{aLat:15.5,vMax:82}),yield{progress:.72,label:`Obstacles`},this.obstacles=new Pd(this.track,this.world,this.def,{seed:this.def.seed+(t.levelIndex||0)*31,obstacles:t.obstacles!==!1,moving:t.moving!==!1,tokens:t.tokens!==!1&&!n&&!this.online}),this.scene.add(this.obstacles.group),yield{progress:.82,label:`Cars`},this._buildRacers(),t.mode===`timetrial`&&!n&&!this.online&&this._buildGhost(),yield{progress:.92,label:`Effects`},this.particles=new Tf(n?Math.round(e.particles*.6):e.particles),this.scene.add(this.particles.group),this.skids=new Df(e.skidMarks),this.scene.add(this.skids.mesh),this._buildHUDs();let o=`${this.def.id}:${t.mode}`,s=this.game.save.data;this.refLap=n||this.online?0:s.bestLaps[o]||0,this.refSplits=n||this.online?null:s.bestSplits[o]||null,this.manager=new of({mode:t.mode,laps:t.laps,racers:this.racers.slice(),checkpoints:this.checkpoints,seed:this.def.seed+7,humans:this.humans.length}),this.placeOnGrid(),this.ready=!0,yield{progress:1,label:`Ready`}}_makeRacer(e,t,n,r,i){let a=this.config,o=n===`human`,s=new Rd(e.stats,{assist:o?a.assists||`medium`:`easy`,handling:o?a.handling||`arcade`:`sim`}),c=new Xd(e,t,{helmetIndex:r,castShadow:o||this.game.quality.preset.id!==`low`});this.scene.add(c.root);let l={id:r,name:i,isHuman:o,isPlayer:o,isRemote:n===`remote`,netId:null,human:null,carDef:e,vehicle:s,view:c,proj:{s:0,t:0,i:-1},cp:null,timer:new sf(this.checkpoints.count,3),ai:null,finished:!1,finishTime:0,position:0,progress:0,penalty:0,offTime:0,onTime:0,offPenalised:!1,wrongTime:0,wrongWay:!1,stuckTime:0,ghost:0,oilTime:0,controls:np,padCooldown:0,skidPts:[{x:0,y:0,z:0,on:!1},{x:0,y:0,z:0,on:!1}],coast:{throttle:0,brake:0,steer:0,handbrake:!1,boost:!1},timedOut:!1,surface:Rl.asphalt,lastImpactTime:-10,recoveries:0,net:null};return n===`remote`&&(l.isPlayer=!0),l}_buildRacers(){let e=this.config,t=this.online,n=new Set;if(this.humanDefs.forEach((r,i)=>{let a=ef(r.carId||e.carId);n.add(a.id);let o=this._makeRacer(a,r.liveryId||a.defaultLivery,`human`,i,r.name||`P${i+1}`);o.netId=t?t.mySlot:null,o.human=this._makeHuman(o,r,i),this.humans.push(o.human),this.racers.push(o)}),this.player=this.racers[0],t)for(let e of t.players){if(e.slot===t.mySlot)continue;let n=ef(e.carId),r=this._makeRacer(n,e.livery||n.defaultLivery,`remote`,10+e.slot,e.name);r.netId=e.slot,r.slot=e.slot,this.racers.push(r)}let r=t?t.ai||0:e.opponents||0,i=Au(this.def.seed*13+r),a=Qd.filter(e=>!n.has(e.id)),o=a.length?a:Qd;for(let n=0;n<r;n++){let a=o[n%o.length],s=eu[(n*3+1)%eu.length].id,c=t&&!t.isHost,l=this._makeRacer(a,s,c?`remote`:`ai`,20+n,uf[n%uf.length]);l.isPlayer=!1,l.netId=`ai${n}`,c||(l.ai=new mf(l,this.model,this.line,{difficulty:e.difficulty||`medium`,index:n,count:r,rng:i,obstacles:this.obstacles})),this.racers.push(l)}}_makeHuman(e,t,n){let r=this.config,i=new Sf(n===0&&r.camera||`chase`);i.setTrack(this.model);let a=this.layout.views[n];return{index:n,racer:e,device:t.device||(this.humanDefs.length>1?[`kbA`,`kbB`,`pad0`,`pad1`,`pad2`,`pad3`][n]:`all`),rig:i,rect:a,drift:new nf,hud:null,hudData:{speed:0,gear:1,rpm:0,throttle:0,boostMeter:0,boosting:!1,nitroActive:!1,speedbreak:-1,slowmo:!1,position:0,lap:0,lapTime:0,lastLap:0,bestLap:0,delta:null,sectors:[null,null,null],target:null,driftActive:!1,driftPoints:0,driftMultiplier:1,driftTotal:0,inDriftZone:!1,wrongWay:!1,resetHold:0,tokens:0,tokensTotal:0,waiting:!1},pose:{x:0,y:0,z:0,h:0,speed:0,slip:0,boost:!1},nearCd:0,sb:{meter:.35,active:!1},lastDriftStart:0,nitroWas:!1}}_buildGhost(){this.ghostRec=new qf;let e=this.game.save.data.ghosts[this.def.id];this.ghostLap=e?Yf(e.lap):null,this.ghostTime=this.ghostLap?e.time:0,this.newGhost=null;let t=ef(e&&e.carId?e.carId:this.config.carId);this.ghostView=new Xd(t,e&&e.livery?e.livery:t.defaultLivery,{castShadow:!1}),Zd(this.ghostView),this.ghostView.root.visible=!1,this.scene.add(this.ghostView.root),this.ghostRecording=!1,this._ghostPose={x:0,y:0,z:0,h:0}}_buildHUDs(){let e=this.config,t=this.game,n=this.humans.length,r=this.racers.length,i=Pl()&&n===1;for(let a of this.humans){let o=a.racer;a.hud=new Hf(t.uiRoot,{mode:e.mode,laps:e.laps,opponents:r-1,units:e.units,touch:i,bindings:t.input.bindings,rect:n>1?a.rect:null,compact:n>2,label:n>1?o.name===`P${a.index+1}`?o.name:`P${a.index+1} · ${o.name}`:null,device:a.device,speedbreak:this.speedbreakAllowed,onTouch:(e,n)=>{let r=t.input.touch;r[e]=e===`left`||e===`right`||e===`throttle`||e===`brake`?+!!n:n},onPause:()=>t.requestPause()}),a.hudData.tokensTotal=this.obstacles.tokenCount,a.hud.setLights(0,!1)}if(this.minimap=new Wf(this.model,n>2?220:168),n<=1)this.humans[0].hud.setMiniMap(this.minimap),this.humans[0].hud.setMiniMapVisible(e.minimap!==!1);else if(n===2)this.humans[0].hud.setMiniMap(this.minimap),this.minimap2=new Wf(this.model),this.humans[1].hud.setMiniMap(this.minimap2);else if(this.layout.spare){let[e,n,r,i]=this.layout.spare;this.spareEl=Q(`div`,{className:`split-spare layer-passive`,style:{left:`${e*100}%`,top:`${n*100}%`,width:`${r*100}%`,height:`${i*100}%`}},[Q(`div`,{className:`t-label-sm t-secondary`,text:this.def.name}),this.minimap.canvas,this.standingsEl=Q(`ol`,{className:`split-spare__list`})]),t.uiRoot.appendChild(this.spareEl)}for(let e of this.racers)this._dots.push({x:0,z:0,player:e.isHuman||e.isRemote,leader:!1})}placeOnGrid(){let e=this.config,t=this.humans.length,n;if(this.online){let e=this.racers.filter(e=>e.isHuman||e.isRemote&&typeof e.netId==`number`).sort((e,t)=>e.netId-t.netId);n=e.concat(this.racers.filter(t=>!e.includes(t)))}else if(t>1)n=this.racers.filter(e=>!e.isHuman).concat(this.racers.filter(e=>e.isHuman));else{let t=e.opponents||0,r=t===0?0:Math.min(t,e.difficulty===`easy`?3:e.difficulty===`hard`?t:4),i=this.racers.filter(e=>!e.isHuman);n=i.slice(0,r).concat([this.player],i.slice(r))}n.forEach((e,t)=>{let n=this.track.gridSlot(t);this._spawn(e,n.s,n.t),e.cp=this.checkpoints.createState(n.s),e.timer.reset(),e===this.player&&this.refLap&&e.timer.setReference(this.refLap,this.refSplits),e.finished=!1,e.finishTime=0,e.penalty=0,e.offTime=0,e.offPenalised=!1,e.wrongTime=0,e.wrongWay=!1,e.stuckTime=0,e.ghost=0,e.oilTime=0,e.padCooldown=0,e.skidPts[0].on=e.skidPts[1].on=!1,e.timedOut=!1,e.recoveries=0,e.net=null,e.ai&&e.ai.reset(),e.vehicle.events.driftStart=e.vehicle.events.driftEnd=e.vehicle.events.boost=0});for(let e of this.humans)e.rig.snap(),e.drift.reset(),e.sb.active=!1,e.sb.meter=.35,e.nearCd=0;this.timeScale=1}_spawn(e,t,n){let r=this.model;r.pointAt(t,n,this._pt);let i=Math.atan2(this._pt.tx,this._pt.tz);e.vehicle.reset(this._pt.x,this._pt.z,i,r.heightAt(t,n)),e.proj.i=-1,r.project(e.vehicle.x,e.vehicle.z,-1,e.proj),e.view.update(e.vehicle,1,this._groundFor(e),0)}begin(){if(this.game.audio.startRace(),this.waitingForGo)for(let e of this.humans)e.hud.flash(`Waiting`,`for the other drivers`,`info`,60);else{this.manager.startCountdown();for(let e of this.humans)e.hud.setLights(0,!0)}}go(){if(this.waitingForGo){this.waitingForGo=!1;for(let e of this.humans)e.hud.bigTimer=.01;this.manager.startCountdown();for(let e of this.humans)e.hud.setLights(0,!0)}}restart(){let e=this.player.timer;e.refLap&&(!this.refLap||e.refLap<this.refLap)&&(this.refLap=e.refLap,this.refSplits=e.refCp?e.refCp.slice():null),this.manager.reset(),this.placeOnGrid(),this.obstacles.reset(),this.particles.reset(),this.skids.reset(),this.contacts.length=0,this.finishedTimer=0,this.firstHumanFinish=-1,this.resultsSent=!1,this.tokens=0,this.debug.maxPenetration=0,this.ghostRec&&(this.ghostRecording=!1,this.ghostView.root.visible=!1);for(let e of this.humans)e.hud.toasts.clear(),e.hud.hintTime=6;this.game.input.releaseAll(),this.begin()}toggleSpeedbreak(){if(!this.speedbreakAllowed||!this.manager.canDrive)return;let e=this.humans[0].sb;e.active?e.active=!1:e.meter>.15&&(e.active=!0,this.game.audio.play(`boost`),this.hud.toast(`Speedbreaker`,`info`))}step(e){if(!this.ready||this.paused)return;let t=this.humans[0].sb;if(this.speedbreakAllowed){t.active&&(t.meter=Math.max(0,t.meter-J.speedbreakDrain*e),t.meter<=0&&(t.active=!1));let n=t.active?J.speedbreakScale:1;this.timeScale+=(n-this.timeScale)*Math.min(1,e*8),Math.abs(this.timeScale-n)<.002&&(this.timeScale=n)}let n=e*this.timeScale,r=this.manager;r.step(n);for(let e of r.events)this._raceEvent(e);r.events.length=0;let i=r.canDrive;this.obstacles.step(n,this.racers);for(let e of this.racers){if(e.isRemote){this._stepRemote(e,n);continue}let r=e.vehicle;r.savePrev(),r.speedbreak=e===this.player&&t.active;let a=np;i?a=e.isHuman?e.finished?this._autoCoast(e):this.inputBlocked?np:this._humanInput(e):e.ai.drive(n,this):e.isHuman&&r.updateDrivetrain(n,this._humanInput(e).throttle),e.controls=a,e.oilTime>0&&(e.oilTime-=n);let o=e.oilTime>0?Rl.oil:this.model.surfaceAt(e.proj.s,e.proj.t);e.surface=o,(i||r.speed>.01)&&r.step(n,a,o),this.model.project(r.x,r.z,e.proj.i,e.proj),this._collideWorld(e),e.padCooldown>0&&(e.padCooldown-=n),e.ghost>0&&(e.ghost-=n)}this._collideCars();for(let e of this.racers){if(e.isRemote)continue;let t=e.vehicle;this.model.project(t.x,t.z,e.proj.i,e.proj),this._wallSafety(e),t.y=this.model.heightAt(e.proj.s,e.proj.t),i&&this._raceLogic(e,n)}if(this._slipstream(),i&&this._nearMisses(n),this.ghostRec&&this.ghostRecording&&i&&this.ghostRec.record(n,this.player.vehicle),i){for(let e of this.humans){let t=e.racer,r=Math.abs(t.proj.t)<=this.model.halfWidthAt(t.proj.s)+Kl.width+.6;e.drift.update(n,t.vehicle,{onTrack:r,inZone:this.obstacles.inDriftZone(t.proj.s)}),this.speedbreakAllowed&&!e.sb.active&&(t.vehicle.drifting||t.vehicle.u>t.vehicle.params.vTop*.75)&&(e.sb.meter=Math.min(1,e.sb.meter+J.speedbreakFill*n)),e.nearCd>0&&(e.nearCd-=n)}this.firstHumanFinish>=0&&r.state===`running`&&r.time-this.firstHumanFinish>tp&&r.forceFinish(),r.state===`finished`&&(this.finishedTimer+=e)}this._measurePenetration(),this.debug.steps++}_humanInput(e){return e===this.player&&this.inputOverride?this.inputOverride:this.game.input.deviceState(e.human.device)}_stepRemote(e,t){let n=e.vehicle;n.savePrev();let r=e.net;if(!r)return;let i=r.st,a=(performance.now()-r.at)/1e3;e.gone=a>Zf;let o=Math.min(.3,a),s=Math.sin(i[3]),c=Math.cos(i[3]),l=s*i[4]+c*i[5],u=c*i[4]-s*i[5],d=i[1]+l*o,f=i[2]+u*o,p=i[3]+i[6]*o,m=d-n.x,h=f-n.z;if(m*m+h*h>400)n.x=n.px=d,n.z=n.pz=f,n.h=n.ph=p;else{let e=Math.min(1,t*12);n.x+=m*e,n.z+=h*e;let r=p-n.h;r=Math.atan2(Math.sin(r),Math.cos(r)),n.h+=r*e}n.h-n.ph>Math.PI?n.ph+=Math.PI*2:n.h-n.ph<-Math.PI&&(n.ph-=Math.PI*2),n.u=i[4],n.v=i[5],n.r=i[6],n.steerAngle=-i[7]*.3,n.wheelAngle+=n.u/.34*t,n.drifting=!!(i[11]&1),n.nitroActive=!!(i[11]&2),n.braking=!!(i[11]&4),n.slip=n.u>.5?Math.atan2(n.v,n.u):0,n.skid=n.drifting?.6:0,this.model.project(n.x,n.z,e.proj.i,e.proj),n.y=this.model.heightAt(e.proj.s,e.proj.t),e.cp.laps=i[8],e.reportedS=i[9],i[10]>0&&!e.finished&&(e.finished=!0,e.finishTime=i[10],this.manager.finishOrder.push(e))}netStates(e){e.length=0;for(let t of this.racers){if(t.isRemote||!t.isHuman&&!this.online.isHost)continue;let n=t.vehicle;e.push([t.netId,+n.x.toFixed(3),+n.z.toFixed(3),+n.h.toFixed(4),+n.u.toFixed(3),+n.v.toFixed(3),+n.r.toFixed(4),+(t.controls.steer||0).toFixed(2),t.cp.laps,+t.proj.s.toFixed(2),t.finished?+t.finishTime.toFixed(3):0,+!!n.drifting|(n.nitroActive?2:0)|(n.braking?4:0)])}return e}applyNet(e){for(let t of this.racers){if(!t.isRemote)continue;let n=e.get(t.netId);if(n){if(t.net)t.net.st=n.st,t.net.at=n.at;else{t.net={st:n.st,at:n.at};let e=t.vehicle;e.x=e.px=n.st[1],e.z=e.pz=n.st[2],e.h=e.ph=n.st[3]}}}}_autoCoast(e){let t=e.coast;t.throttle=0,t.brake=e.vehicle.u>18?.25:0,t.handbrake=!1,t.boost=!1;let n=this.line.offsetAt(e.proj.s+20)-e.proj.t,r=Math.atan2(Math.sin(this.model.heading(e.proj.s+12)-e.vehicle.h),Math.cos(this.model.heading(e.proj.s+12)-e.vehicle.h));return t.steer=Math.max(-1,Math.min(1,-r*2.2+n*.08)),t}_collideWorld(e){let t=e.vehicle,n=this._box,r=this._hit,i=this.world,a=e.isHuman?Hl:Qf*.92,o=e.isHuman?Ul:$f*.92;for(let s=0;s<3;s++){n.x=t.x,n.z=t.z,n.h=t.h,n.hx=a,n.hz=o;let c=i.extentFor(e.proj.i,e.proj.t,3),l=!1;if(i.query(e.proj.s,e.proj.t,c,4.5,i=>{if(i.kind===`area`){s===0&&this._area(e,i);return}let a;if(a=i.shape===`circle`?dd(n,i.x,i.z,i.r,r):ud(n,i,r),!a)return;if(l=!0,i.kind===`cone`){s===0&&this._hitCone(e,i);return}let o=i.kind===`soft`,c=t.applyContact(r.nx,r.nz,r.depth+.002,o?.45:J.wallRestitution,o?.05:J.wallFriction);n.x=t.x,n.z=t.z,c>.5&&this._impact(e,i,c,r,o)}),!l)break}}_area(e,t){let n=e.vehicle,r=n.x-t.x,i=n.z-t.z;if(t.type===`oil`)r*r+i*i<t.r*t.r&&(e.oilTime=.35);else if(t.type===`boost`){let a=Math.sin(t.h),o=Math.cos(t.h),s=r*o-i*a,c=r*a+i*o;Math.abs(s)<=t.hx+.6&&Math.abs(c)<=t.hz&&e.padCooldown<=0&&(e.padCooldown=1.2,n.triggerBoost(J.padBoostDuration,J.padBoostAccel),e.isHuman&&(e.human.hud.toast(`Boost`,`info`),e===this.player&&this.game.audio.play(`boost`),this.game.input.rumble(.2,.5,200,this._padSlot(e))))}else t.type===`token`&&e.isHuman&&!t.collected&&r*r+i*i<(t.r+1.2)*(t.r+1.2)&&(this.obstacles.collectToken(t),this.tokens++,n.addNitro(.25),e.human.hud.toast(`Token ${this.tokens}/${this.obstacles.tokenCount} · +Nitro`,`good`),this.game.audio.play(`token`))}_padSlot(e){let t=e.human?e.human.device:`all`;return t&&t.startsWith(`pad`)?Number(t.slice(3)):-1}_hitCone(e,t){if(t.knocked)return;let n=e.vehicle;this.obstacles.knockCone(t,n.vx,n.vz),n.setWorldVelocity(n.vx*.97,n.vz*.97),e.isHuman&&(e===this.player&&this.game.audio.play(`cone`),this.config.mode===`timeattack`||this.config.mode===`timetrial`?(e.penalty+=.5,e.human.hud.toast(`Cone +0.5s`,`warn`)):e.human.hud.toast(`Cone`,`warn`))}_impact(e,t,n,r,i){let a=e.vehicle;if(this.contacts.length<24){let t=Math.sin(a.h),o=Math.cos(a.h);this.contacts.push({x:a.x-r.nx*.9+t*.3,y:a.y+.4,z:a.z-r.nz*.9+o*.3,nx:r.nx,nz:r.nz,impact:n,soft:i,player:e.isHuman})}if(e.isHuman){n>2.5&&e.human.drift.breakCombo(i?`tyres`:`wall`),a.drifting&&n>2.5&&a.endDrift(!1);let t=this.manager.time;t-e.lastImpactTime>.18&&(e.lastImpactTime=t,e===this.player&&this.game.audio.play(i?`thudSoft`:`thud`,Math.min(1,n/18)),e.human.rig.addShake(Math.min(.8,n/25)),this.game.input.rumble(Math.min(1,n/15),Math.min(1,n/10),160,this._padSlot(e)))}}_collideCars(){let e=this.racers,t=this._box,n=this._box2,r=this._hit;for(let i=0;i<e.length;i++){let a=e[i];if(a.ghost>0||a.gone)continue;let o=a.vehicle;for(let s=i+1;s<e.length;s++){let i=e[s];if(i.ghost>0||i.gone||a.isRemote&&i.isRemote)continue;let c=i.vehicle,l=c.x-o.x,u=c.z-o.z;if(l*l+u*u>25||(t.x=o.x,t.z=o.z,t.h=o.h,t.hx=a.isHuman?Hl:Qf*.92,t.hz=a.isHuman?Ul:$f*.92,n.x=c.x,n.z=c.z,n.h=c.h,n.hx=i.isHuman?Hl:Qf*.92,n.hz=i.isHuman?Ul:$f*.92,!ud(t,n,r)))continue;let d=a.isRemote?0:i.isRemote?1:.5,f=1-d,p=r.depth+.001;o.x+=r.nx*p*d,o.z+=r.nz*p*d,c.x-=r.nx*p*f,c.z-=r.nz*p*f;let m=o.vx,h=o.vz,g=c.vx,_=c.vz,v=(m-g)*r.nx+(h-_)*r.nz;if(v<0){let e=-1.2*v;a.isRemote||o.setWorldVelocity(m+e*d*r.nx,h+e*d*r.nz),i.isRemote||c.setWorldVelocity(g-e*f*r.nx,_-e*f*r.nz),a.isRemote||(o.r*=.9),i.isRemote||(c.r*=.9);let t=-v;for(let e of[a,i]){if(!e.isHuman||t<=2.5)continue;e.human.drift.breakCombo(`contact`),this.contacts.length<24&&this.contacts.push({x:(o.x+c.x)/2,y:o.y+.4,z:(o.z+c.z)/2,nx:r.nx,nz:r.nz,impact:t,soft:!1,player:!0});let n=this.manager.time;n-e.lastImpactTime>.2&&(e.lastImpactTime=n,e===this.player&&this.game.audio.play(`thud`,Math.min(1,t/15)),e.human.rig.addShake(Math.min(.6,t/25)))}}}}}_wallSafety(e){let t=this.model,n=e.vehicle,r=t.wallOffset(e.proj.s)-Qf*.6;if(Math.abs(e.proj.t)<=r)return;let i=Math.sign(e.proj.t);t.pointAt(e.proj.s,i*r,this._pt),n.x=this._pt.x,n.z=this._pt.z;let a=this._pt.tz*i,o=-this._pt.tx*i,s=n.vx*a+n.vz*o;s<0&&n.setWorldVelocity(n.vx-s*a,n.vz-s*o),e.proj.t=i*r}_slipstream(){let e=this.racers;for(let t of e)if(t.vehicle.slipstream=0,!(t.isRemote||t.vehicle.u<30))for(let n of e){if(n===t)continue;let e=this.model.deltaS(t.proj.s,n.proj.s);e>4&&e<28&&Math.abs(n.proj.t-t.proj.t)<2.4&&(t.vehicle.slipstream=Math.max(t.vehicle.slipstream,1-(e-4)/24))}}_nearMisses(){for(let e of this.humans){if(e.nearCd>0)continue;let t=e.racer,n=t.vehicle;if(!(n.u<25))for(let r of this.racers){if(r===t)continue;let i=this.model.deltaS(t.proj.s,r.proj.s),a=Math.abs(r.proj.t-t.proj.t),o=n.u-r.vehicle.u;if(Math.abs(i)<2.2&&a>1.95&&a<3.1&&Math.abs(o)>6){n.addNitro(J.nitroNearMiss),this.speedbreakAllowed&&(e.sb.meter=Math.min(1,e.sb.meter+.06)),e.nearCd=1.5,e.hud.toast(`Near miss · +Nitro`,`info`);break}}}}_raceLogic(e,t){let n=e.vehicle,r=this.model,i=this.manager,a=this.checkpoints.update(e.cp,e.proj.s,i.time,this._ev);a.type&&this._checkpointEvent(e,a),e.timer.tick(i.time);let o=r.tx[e.proj.i],s=r.tz[e.proj.i],c=n.speed,l=c>.1?(n.vx*o+n.vz*s)/c:0,u=Math.sin(n.h)*o+Math.cos(n.h)*s;c>4&&l<-.5&&u<-.2?e.wrongTime+=t:(l>.2||u>.3)&&(e.wrongTime=0);let d=e.wrongWay;e.wrongWay=e.wrongTime>1,e===this.player&&e.wrongWay&&!d&&this.game.audio.play(`warn`);let f=r.halfWidthAt(e.proj.s),p=Math.abs(e.proj.t)>f+Kl.width+.4;p?(e.offTime+=t,e.onTime=0,e.offTime>1.6&&!e.offPenalised&&e.isHuman&&!e.finished&&(e.offPenalised=!0,this.config.mode!==`practice`&&this.config.mode!==`drift`?(e.penalty+=1,e.human.hud.toast(`Track limits +1s`,`warn`)):e.human.hud.toast(`Track limits`,`warn`),e===this.player&&this.game.audio.play(`warn`))):(e.onTime+=t,e.onTime>.5&&(e.offTime=0,e.offPenalised=!1));let m=e.isHuman?e.controls.throttle>.2||e.controls.brake>.2:!e.ai.waiting;c<J.stuckSpeed&&!e.finished&&(m||p)?e.stuckTime+=t:e.stuckTime=0;let h=e.isHuman?J.stuckTime:2.5;e.stuckTime>h&&(e.stuckTime=0,this.recover(e),e.isHuman&&e.human.hud.toast(`Recovered`,`info`))}recover(e,t=6){let n=this.model,r=n.wrapS(e.proj.s-t),i=n.halfWidthAt(r),a=Math.max(-i*.55,Math.min(i*.55,e.proj.t));for(let t of this.racers)t!==e&&Math.abs(n.deltaS(r,t.proj.s))<7&&Math.abs(t.proj.t-a)<2.6&&(a=t.proj.t>0?a-3:a+3);a=Math.max(-i+1.4,Math.min(i-1.4,a));let o=e.cp,s=e.vehicle.nitro;this._spawn(e,r,a),e.vehicle.nitro=s,e.cp=o,e.cp.lastS=e.proj.s,e.ghost=1.2,e.recoveries++,e.wrongTime=0,e.offTime=0,e.skidPts[0].on=e.skidPts[1].on=!1,e.isHuman&&(e.human.drift.breakCombo(`reset`),e.human.rig.snap())}_checkpointEvent(e,t){let n=this.manager,r=e.timer;if((t.type===`checkpoint`||t.type===`sector`)&&r.checkpoint(t.index,n.time),t.type===`sector`){let i=r.sector(t.sector,n.time);e.isHuman&&i&&i.state===`best`&&r.lapTimes.length>0&&e.human.hud.toast(`S${t.sector+1} best`,`good`)}if(t.type===`start`&&this.config.mode===`practice`&&r.start(n.time),t.type===`lap`){let t=r.lap(n.time);e===this.player&&this.ghostRec&&this._ghostLap(t);let i=this.config.laps;if(e.isHuman){let n=e.human.hud;e===this.player&&this.game.audio.play(`lap`),i>0&&e.cp.laps>=i||(t.best&&r.lapTimes.length>1?n.flash(`Best lap`,cf(t.time),`good`,1.8):n.toast(`Lap ${t.lap} · ${cf(t.time)}`,t.best?`good`:`neutral`)),i>0&&e.cp.laps===i-1&&n.toast(`Final lap`,`info`)}if(i>0&&e.cp.laps>=i&&(n.finish(e),e.isHuman&&(this.firstHumanFinish<0&&(this.firstHumanFinish=n.time),this.humans.length>1&&!n.allHumansFinished))){let t=n.rank().indexOf(e)+1;e.human.hud.flash(`Finish`,`P${t}`,t<=3?`good`:``,4)}}}_ghostLap(e){if(this.ghostRecording){let t=this.ghostRec.toLap();t&&(!this.ghostTime||e.time<this.ghostTime)&&(this.ghostLap=t,this.ghostTime=e.time,this.newGhost={lap:t,time:e.time},this.hud.toast(`New ghost`,`info`))}this.ghostRec.begin(),this.ghostRecording=!0,this.ghostLapStart=this.manager.time}_raceEvent(e){if(e.type===`light`){this.track.setStartLights(e.n);for(let t of this.humans)t.hud.setLights(e.n,!0);this.game.audio.play(`beep`)}else if(e.type===`go`){this.track.setStartLights(0);for(let e of this.humans)e.hud.setLights(0,!1),e.hud.flash(`Go`,``,`good`,1);this.game.audio.play(`go`);for(let e of this.racers)this.config.mode!==`practice`&&e.timer.start(0);this.game.onRaceGo()}else if(e.type===`finish`){let e=this.manager.rank(),t=this.racers.length;for(let n of this.humans){let r=e.indexOf(n.racer)+1,i=t>1?`P${r} of ${t}`:cf(n.racer.finishTime);n.hud.flash(n.racer.finished?`Finish`:`Race over`,i,r<=3?`good`:``,ep)}this.game.audio.play(`finish`)}}_measurePenetration(){let e=this.player,t=e.vehicle,n=this._box;n.x=t.x,n.z=t.z,n.h=t.h,n.hx=Hl,n.hz=Ul;let r=0,i=this._hit;this.world.query(e.proj.s,e.proj.t,this.world.extentFor(e.proj.i,e.proj.t,3),4.5,e=>{(e.kind===`wall`||e.kind===`solid`)&&(e.shape===`circle`?dd(n,e.x,e.z,e.r,i):ud(n,e,i))&&i.depth>r&&(r=i.depth)}),this.debug.lastPenetration=r,r>this.debug.maxPenetration&&(this.debug.maxPenetration=r)}_groundFor(e){let t=this.model,n=e.vehicle,r=this._ground,i=e.proj.i<0?0:e.proj.i,a=Math.atan2(t.tx[i],t.tz[i]),o=n.h-a,s=Math.cos(o),c=Math.sin(o),l=t.slope[i],u=t.bank[i];return r.y=t.heightAt(e.proj.s,e.proj.t),r.pitch=-Math.atan(l*s-u*c),r.roll=Math.atan(-l*c-u*s),r.bump=e.surface===Rl.kerb&&n.speed>4?Math.sin(n.wheelAngle*3.1)*Rl.kerb.bump:0,r}frame(e,t){if(!this.ready)return;let n=this.paused?1:e;for(let e of this.racers)e.view.update(e.vehicle,e.isRemote?1:n,this._groundFor(e),this.paused?0:t);for(let e of this.humans){let r=e.racer.vehicle,i=e.pose;i.x=r.px+(r.x-r.px)*n,i.z=r.pz+(r.z-r.pz)*n,i.y=r.py+(r.y-r.py)*n,i.h=r.ph+(r.h-r.ph)*n,i.speed=r.speed,i.slip=r.u>3?r.slip:0,i.boost=r.nitroActive||r.boostTime>0,this.paused||e.rig.update(i,t)}this.ghostView&&this._placeGhost();let r=this.humans[0].pose;Iu(this.lights.sun,r.x,r.y,r.z),this.paused||(this._fx(t),this.obstacles.frame(t),this._hud(t),this._audio()),this.prepareView(0),this.debug.cameraInside=this.cameraInsideGeometry(),this.manager.state===`finished`&&this.finishedTimer>ep&&!this.resultsSent&&(this.resultsSent=!0,this.onFinished&&this.onFinished(this.buildResults()))}prepareView(e){let t=this.humans[e],n=t.rig.camera.position;this.sky.position.copy(n);for(let e of this.racers){if(e===t.racer){e.view.root.visible=!0;continue}let r=e.vehicle.x-n.x,i=e.vehicle.z-n.z,a=e.vehicle.y+.5-n.y;e.view.root.visible=!e.gone&&r*r+i*i+a*a>2.6*2.6}}_placeGhost(){let e=this.ghostView;if(!this.ghostLap||!this.ghostRecording||this.player.finished){e.root.visible=!1;return}let t=this._ghostPose;Xf(this.ghostLap,this.manager.time-this.ghostLapStart,t)?(e.root.visible=!0,e.root.position.set(t.x,t.y,t.z),e.root.rotation.set(0,t.h,0)):e.root.visible=!1}_fx(e){let t=this.particles;for(let e of this.contacts)e.soft?t.dust(e.x,e.y,e.z,e.nx*2,e.nz*2,6):t.sparks(e.x,e.y,e.z,e.nx,e.nz,Math.min(24,6+e.impact));this.contacts.length=0;let n=e*this.timeScale;for(let e of this.racers){let n=e.vehicle,r=Math.sin(n.h),i=Math.cos(n.h);for(let a=0;a<2;a++){let o=a===0?.7:-.7,s=n.x+i*o-r*1.65,c=n.z-r*o-i*1.65,l=n.y+.03,u=e.skidPts[a];n.skid>.22?(u.on&&this.skids.add(u.x,u.y,u.z,s,l,c,Math.min(1,n.skid)),u.on=!0,u.x=s,u.y=l,u.z=c,Math.random()<n.skid*.9*this.timeScale&&t.smoke(s,l+.2,c,n.vx*.15,n.vz*.15,n.skid)):u.on=!1;let d=e.surface;(d===Rl.grass||d===Rl.sand)&&n.speed>6&&Math.random()<.6*this.timeScale&&t.dust(s,l+.1,c,-n.vx*.05,-n.vz*.05,1,d===Rl.sand)}(n.boostTime>0||n.nitroActive)&&Math.random()<.85&&t.flame(n.x-r*2.3,n.y+.45,n.z-i*2.3,-r,-i,n.nitroActive)}t.update(n,this.camera),this.skids.update()}_hud(e){this.manager.rank();let t=this.config.laps;for(let n of this.humans){let r=n.racer,i=r.vehicle,a=n.hudData;a.speed=i.speed,a.gear=i.gear,a.rpm=i.rpm,a.throttle=i.throttle,a.boostMeter=i.nitro,a.boosting=i.boostTime>0,a.nitroActive=i.nitroActive,a.speedbreak=this.speedbreakAllowed?n.sb.meter:-1,a.slowmo=this.timeScale<.98,a.position=r.position,a.lap=Math.max(1,Math.min(t>0?t:999,r.cp.laps+1)),a.lapTime=r.timer.lapTime,a.lastLap=r.timer.lastLap,a.bestLap=r.timer.bestLap,a.delta=r.timer.delta;for(let e=0;e<3;e++)a.sectors[e]=r.timer.sectorState[e];a.driftActive=n.drift.active&&i.drifting,a.driftPoints=n.drift.current,a.driftMultiplier=n.drift.multiplier,a.driftTotal=n.drift.total,a.inDriftZone=n.drift.inZone&&i.drifting,a.wrongWay=r.wrongWay,a.resetHold=n.index===0&&this.resetHold||0,a.tokens=this.tokens,a.target=n.index===0?this._targetInfo():null,n.hud.update(a,e);let o=n.drift.consumeEvents();if(o)for(let e of o)e.type===`bank`&&e.points>0?(n.hud.toast(`+${e.points} drift${e.multiplier>1?` ×${e.multiplier}`:``}`,`good`),r===this.player&&this.game.audio.play(`bank`)):e.type===`break`&&e.points>0?n.hud.toast(`Combo lost −${e.points}`,`hazard`):e.type===`combo`&&e.multiplier>=3&&n.hud.toast(`Combo ×${e.multiplier}`,`good`)}let n=null;for(let e of this.racers)e.position===1&&(n=e);for(let e=0;e<this.racers.length;e++){let t=this.racers[e],r=this._dots[e];r.x=t.vehicle.x,r.z=t.vehicle.z,r.player=t.isHuman||t.isRemote,r.leader=t===n&&this.racers.length>1}(this.config.minimap!==!1||this.humans.length>1)&&(this.minimap.draw(this._dots),this.minimap2&&this.minimap2.draw(this._dots)),this.standingsEl&&this._drawStandings()}_drawStandings(){let e=this.manager.racers,t=this.standingsEl;for(;t.children.length<e.length;)t.appendChild(Q(`li`,{}));for(let n=0;n<e.length;n++){let r=e[n],i=`${r.name}${r.finished?` ✓`:``}`,a=t.children[n];a.__t!==i&&(a.__t=i,a.textContent=i),a.className=r.isHuman?`is-human`:``}}_targetInfo(){let e=this.config.target;if(!e)return null;let t=this._target,n=this.player;if(e.type===`lap`){let r=e.timeLimit;if(r){let e=Math.max(0,r-this.manager.time-n.penalty);t.label=`Time left`,t.value=cf(e,{decimals:1}),t.hazard=e<10&&this.manager.state===`running`,e<=0&&this.manager.state===`running`&&!n.finished&&this._timeUp()}else t.label=`Target lap`,t.value=cf(e.gold),t.hazard=!1;return t}if(e.type===`drift`){let n=this.drift;t.label=`Target`;let r=n.total<e.bronze?e.bronze:n.total<e.silver?e.silver:e.gold;return t.value=`${Math.round(n.total)} / ${r}`,t.hazard=!1,t}return e.type===`position`?(t.label=`Goal`,t.value=`Top 3`,t.hazard=!1,t):null}_timeUp(){let e=this.player;e.timedOut=!0,this.manager.finish(e),this.hud.flash(`Time up`,``,`hazard`,ep)}_audio(){let e=this.humans[0],t=e.racer.vehicle;t.events.driftStart!==e.lastDriftStart&&(e.lastDriftStart=t.events.driftStart,t.events.driftStart>0&&this.game.input.rumble(.15,.35,140,this._padSlot(e.racer))),t.nitroActive&&!e.nitroWas&&this.game.audio.play(`boost`),e.nitroWas=t.nitroActive,this.game.audio.updateCar(t,this.manager.state===`countdown`,this.timeScale)}buildResults(){let e=this.player,t=this.humans.length>1||!!this.online,n={circuitId:this.def.id,circuitName:this.def.name,driftScore:0,bestCombo:this.drift.bestCombo,longestDrift:this.drift.longest,tokens:this.tokens,tokensTotal:this.obstacles.tokenCount,timedOut:!!e.timedOut,levelId:this.config.levelId||null,carId:e.carDef.id,multi:t,online:!!this.online};n.bestSplits=e.timer.bestCp?Array.from(e.timer.bestCp):null,this.newGhost&&(n.ghost={lap:Jf(this.newGhost.lap),time:Math.round(this.newGhost.time*1e3)/1e3,carId:e.carDef.id,livery:e.view.liveryId});for(let e of this.humans)e.drift.current>0&&e.drift.bank();n.driftScore=Math.round(this.drift.banked),this.humans.length>1&&(n.driftScores=this.humans.map(e=>({name:e.racer.name,score:Math.round(e.drift.banked)})));let r=this.manager.buildResults(e,n);if(t){let e=r.rows.find(e=>e.isPlayer);r.winner=e?e.name:null}return r}resetPlayer(e=this.player){this.manager.canDrive&&this.recover(e,0)}setPaused(e){this.paused=e}cameraInsideGeometry(){let e=this.camera.position,t=this.model,n=t.project(e.x,e.z,this._camHint??-1,this._camProj||={s:0,t:0,i:-1});this._camHint=n.i;let r=t.wallOffset(n.s),i=t.heightAt(n.s,Math.max(-r,Math.min(r,n.t)));if(e.y<i+.05)return`ground`;let a=Math.abs(n.t);if(!t.isGap(n.s)&&a>r-.05&&a<r+1.05&&e.y<i+1.15)return`wall`;let o=null,s=this.world.debugCells;if(this.world.debugCells=!1,this.world.query(n.s,n.t,6,6,t=>{if(o||t.kind===`area`||t.kind===`wall`)return;let n=(t.y||i)+(t.height||1);if(!(e.y>n)){if(t.shape===`circle`){let n=e.x-t.x,r=e.z-t.z;n*n+r*r<t.r*t.r&&(o=t.kind)}else{let n=Math.sin(t.h),r=Math.cos(t.h),i=e.x-t.x,a=e.z-t.z;Math.abs(i*r-a*n)<t.hx&&Math.abs(i*n+a*r)<t.hz&&(o=t.kind)}}}),this.world.debugCells=s,o)return o;if(this.track.propBoxes)for(let t of this.track.propBoxes){if(e.y<t.minY||e.y>t.maxY)continue;let n=e.x-t.x,r=e.z-t.z,i=Math.cos(t.rot),a=Math.sin(t.rot),o=n*i-r*a,s=n*a+r*i;if(o>t.x0&&o<t.x1&&s>t.z0&&s<t.z1)return`prop`}return!1}snapshot(){let e=this.player,t=e.vehicle,n=this.drift;return{x:t.x,y:t.y,z:t.z,h:t.h,u:t.u,v:t.v,speed:t.speed,s:e.proj.s,t:e.proj.t,gear:t.gear,rpm:t.rpm,drifting:t.drifting,slip:t.slip,surface:e.surface.id,lap:e.cp.laps,next:e.cp.next,lapTimes:e.timer.lapTimes.slice(),bestLap:e.timer.bestLap,penalty:e.penalty,wrongWay:e.wrongWay,finished:e.finished,drift:{total:Math.round(n.total),banked:Math.round(n.banked),current:Math.round(n.current),multiplier:n.multiplier,active:n.active},boostMeter:t.nitro,nitro:t.nitro,nitroActive:t.nitroActive,boostTime:t.boostTime,speedbreak:this.speedbreakAllowed?this.humans[0].sb.meter:-1,timeScale:this.timeScale,position:e.position,camera:{x:this.camera.position.x,y:this.camera.position.y,z:this.camera.position.z,fov:this.camera.fov,mode:this.rig.mode,inside:this.debug.cameraInside},penetration:this.debug.lastPenetration,maxPenetration:this.debug.maxPenetration,raceState:this.manager.state,raceTime:this.manager.time,length:this.model.length,halfWidth:this.model.halfWidthAt(e.proj.s),wallOffset:this.model.wallOffset(e.proj.s),conesKnocked:this.obstacles.conesKnocked,lastImpactAge:this.manager.time-e.lastImpactTime,tokens:this.tokens,humans:this.humans.length}}dispose(){this.ready=!1;for(let e of this.racers)e.view.dispose();this.racers.length=0,this.ghostView&&this.ghostView.dispose(),this.track&&this.track.dispose(),this.obstacles&&this.obstacles.dispose(),this.particles&&this.particles.dispose(),this.skids&&this.skids.dispose();for(let e of this.humans)e.hud&&e.hud.dispose();this.spareEl&&this.spareEl.parentNode&&this.spareEl.parentNode.removeChild(this.spareEl),Ru(this.scene),this.scene.clear()}},ap=e=>Math.atan2(Math.sin(e),Math.cos(e)),op=class{constructor(e){this.game=e,this.scene=new vn;let t=nd.beginner,n=$l[t.theme];Lu(this.scene,n),this.sky=Nu(n),this.scene.add(this.sky);let r=e.quality.preset;this.lights=Pu(n,{shadows:r.shadows,shadowSize:Math.min(1024,r.shadowSize),shadowExtent:30}),this.scene.add(this.lights.group),this.track=Wu(t,{quality:r,propDensity:.7}),this.scene.add(this.track.group),this.model=this.track.model,this.line=new ld(this.model,{aLat:13,vMax:60}),this.camera=new la(42,e.aspect||16/9,.2,2400),this.cars=[],[Qd[0],Qd[1],Qd[2]].forEach((e,t)=>{let n=new Rd(e.stats,{assist:`easy`}),r=new Xd(e,e.defaultLivery,{helmetIndex:t+2}),i=this.model.wrapS(120-t*22),a={x:0,y:0,z:0,tx:0,tz:1};this.model.pointAt(i,this.line.offsetAt(i)+(t-1)*1.6,a),n.reset(a.x,a.z,Math.atan2(a.tx,a.tz)),n.u=25,this.scene.add(r.root),this.cars.push({v:n,view:r,proj:{s:i,t:0,i:-1},lane:(t-1)*1.6,pace:.8-t*.03})}),this.time=0,this.orbit=0,this._ground={y:0,pitch:0,roll:0,bump:0},this._pt={x:0,y:0,z:0,tx:0,tz:1},this._look=new H}setAspect(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}step(e){this.time+=e;let t=this.model;for(let n of this.cars){let r=n.v;r.savePrev(),t.project(r.x,r.z,n.proj.i,n.proj);let i=9+r.u*.45;t.pointAt(n.proj.s+i,this.line.offsetAt(n.proj.s+i)+n.lane,this._pt);let a=ap(Math.atan2(this._pt.x-r.x,this._pt.z-r.z)-r.h),o=this.line.minSpeedAhead(n.proj.s,r.u*.5+8)*n.pace-r.u;r.step(e,{steer:Math.max(-1,Math.min(1,-a*2.2)),throttle:o>0?Math.min(1,o*.4+.1):0,brake:o<-2?Math.min(1,-o*.2):0,handbrake:!1,boost:!1},t.surfaceAt(n.proj.s,n.proj.t)),r.y=t.heightAt(n.proj.s,n.proj.t)}}frame(e,t){for(let n of this.cars)this._ground.y=n.v.y,n.view.update(n.v,e,this._ground,t);let n=this.cars[0].v,r=n.px+(n.x-n.px)*e,i=n.pz+(n.z-n.pz)*e;this.orbit+=t*.12;let a=n.h+Math.PI*.75+Math.sin(this.orbit)*.9,o=13+Math.sin(this.orbit*.7)*3;this.camera.position.set(r+Math.sin(a)*o,n.y+3.2+Math.sin(this.orbit*.5)*.8,i+Math.cos(a)*o);let s=Math.cos(a),c=-Math.sin(a),l=this.camera.aspect>1.2?3.4:0;this._look.set(r-s*l,n.y+.8,i-c*l),this.camera.lookAt(this._look),this.sky.position.copy(this.camera.position),Iu(this.lights.sun,r,n.y,i)}dispose(){for(let e of this.cars)e.view.dispose();this.track.dispose(),Ru(this.scene),this.scene.clear()}},sp={y:0,pitch:0,roll:0,bump:0},cp=class{constructor(e){this.game=e;let t=$l.garage;this.scene=new vn,this.scene.background=new W(t.skyTop),this.scene.fog=new _n(t.fog,t.fogNear,t.fogFar);let n=Pu(t,{shadows:e.quality.preset.shadows,shadowSize:1024,shadowExtent:6});this.lights=n,n.sun.position.set(6,10,6),this.scene.add(n.group);let r=new fa(Y.infoBlue,.8);r.position.set(-6,4,-6),this.scene.add(r);let i=new G(new di(60,48),new Oi({color:t.ground}));i.rotation.x=-Math.PI/2,i.receiveShadow=!0,this.scene.add(i);let a=new ru;for(let e=-10;e<=10;e++)for(let[n,r,i,o]of[[e*3,-30,e*3,30],[-30,e*3,30,e*3]]){let e=.03,s=r===o,c=a.v(n-(s?0:e),.005,r-(s?e:0),t.runoff),l=a.v(n+(s?0:e),.005,r+(s?e:0),t.runoff),u=a.v(i+(s?0:e),.005,o+(s?e:0),t.runoff),d=a.v(i-(s?0:e),.005,o-(s?e:0),t.runoff);a.quad(c,l,u,d),a.quad(c,d,u,l)}this.scene.add(new G(a.build(),new wr({vertexColors:!0}))),this.table=new ln;let o=new G(new fi(3.6,3.7,.18,32),new Oi({color:t.props,flatShading:!0}));o.position.y=.09,o.receiveShadow=!0,this.table.add(o);let s=new G(new gi(3.62,3.72,48),new wr({color:Y.red}));s.rotation.x=-Math.PI/2,s.position.y=.185,this.table.add(s),this.scene.add(this.table),this.camera=new la(36,e.aspect||16/9,.1,200),this.view=null,this.fake={px:0,pz:0,x:0,z:0,ph:0,h:0,latAccel:0,longAccel:0,steerAngle:.2,wheelAngle:0,braking:!1,reversing:!1},this.yaw=.6,this.yawVel=0,this.pitch=.22,this.dist=9.5,this.dragging=!1,this.auto=!0,this.idle=0,this._down=this._down.bind(this),this._move=this._move.bind(this),this._up=this._up.bind(this),this._wheel=this._wheel.bind(this);let c=e.canvas;c.addEventListener(`pointerdown`,this._down),window.addEventListener(`pointermove`,this._move),window.addEventListener(`pointerup`,this._up),c.addEventListener(`wheel`,this._wheel,{passive:!0})}setCar(e,t,n){let r=ef(e);!this.view||this.view.def.id!==r.id?(this.view&&this.view.dispose(),this.view=new Xd(r,t,{helmetIndex:0}),this.table.add(this.view.root),this.view.root.position.y=.18,this.view.update(this.fake,1,sp,0),this.view.root.position.y=.18):this.view.setLivery(t),this.view.bodyMat.color.setScalar(n?.35:1)}setAspect(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}_down(e){e.button===0&&(this.dragging=!0,this.lastX=e.clientX,this.lastY=e.clientY,this.auto=!1,this.idle=0)}_move(e){if(!this.dragging)return;let t=e.clientX-this.lastX,n=e.clientY-this.lastY;this.lastX=e.clientX,this.lastY=e.clientY,this.yawVel=-t*.008,this.yaw+=this.yawVel,this.pitch=Math.max(.05,Math.min(.75,this.pitch+n*.004))}_up(){this.dragging=!1}_wheel(e){this.dist=Math.max(6.5,Math.min(14,this.dist+Math.sign(e.deltaY)*.6))}nudge(e){this.auto=!1,this.idle=0,this.yawVel=e*.05}step(e){this.dragging||(this.idle+=e,this.idle>4&&(this.auto=!0),this.auto?this.yaw+=e*.25:(this.yaw+=this.yawVel,this.yawVel*=Math.exp(-e*4)))}frame(){let e=this.dist,t=this.camera.aspect>1.2?-1.6:0,n=Math.sin(this.pitch)*e+.6,r=Math.cos(this.pitch)*e,i=Math.sin(this.yaw)*r,a=Math.cos(this.yaw)*r,o=Math.cos(this.yaw),s=-Math.sin(this.yaw);this.camera.position.set(i+o*t,n,a+s*t),this.camera.lookAt(o*t,.55,s*t)}dispose(){let e=this.game.canvas;e.removeEventListener(`pointerdown`,this._down),window.removeEventListener(`pointermove`,this._move),window.removeEventListener(`pointerup`,this._up),e.removeEventListener(`wheel`,this._wheel),this.view&&this.view.dispose(),Ru(this.scene),this.scene.clear()}},lp=class{constructor(e){this.game=e,this.size=380,this.zoom=3.2;let t=document.createElement(`canvas`);t.className=`debug-view`,t.width=this.size,t.height=this.size,Object.assign(t.style,{position:`absolute`,right:`12px`,top:`50%`,transform:`translateY(-50%)`,zIndex:70,border:`1px solid`,pointerEvents:`none`}),t.style.borderColor=Ql(Y.edge),e.uiRoot.appendChild(t),this.canvas=t,this.ctx=t.getContext(`2d`),this.trail=new Float32Array(600),this.trailN=0,this.trailI=0,this.colors={bg:Ql(Y.void),edge:Ql(Y.ash),wall:Ql(Y.chalk),line:Ql(Y.red),player:Ql(Y.infoBlue),ai:Ql(Y.chalk),cell:Ql(Y.warnAmber),cam:Ql(Y.goodGreen),trail:Ql(Y.infoBlue)}}draw(){let e=this.game.race,t=this.ctx,n=this.size;if(t.fillStyle=this.colors.bg,t.globalAlpha=.88,t.fillRect(0,0,n,n),t.globalAlpha=1,!e||!e.ready)return;e.world.debugCells=!0;let r=e.model,i=e.player.vehicle;this.trail[this.trailI*2]=i.x,this.trail[this.trailI*2+1]=i.z,this.trailI=(this.trailI+1)%(this.trail.length/2),this.trailN=Math.min(this.trail.length/2,this.trailN+1);let a=Math.cos(i.h),o=Math.sin(i.h),s=this.zoom,c=(e,t)=>{let r=e-i.x,c=t-i.z;return n/2+(-r*a+c*o)*s},l=(e,t)=>{let r=e-i.x,c=t-i.z;return n/2-(r*o+c*a)*s},u=n/s,d=e.player.proj.i,f=Math.ceil(u/r.ds),p={x:0,y:0,z:0,tx:0,tz:1},m=(e,n,i)=>{t.strokeStyle=n,t.lineWidth=i,t.beginPath();for(let n=-f;n<=f;n+=2){let i=(d+n)*r.ds;r.pointAt(i,e(i),p);let a=c(p.x,p.z),o=l(p.x,p.z);n===-f?t.moveTo(a,o):t.lineTo(a,o)}t.stroke()};t.strokeStyle=this.colors.cell,t.lineWidth=1;for(let n of e.world.lastTested){let i=e.world.cellBounds(n);t.beginPath(),[[i.s0,i.t0],[i.s1,i.t0],[i.s1,i.t1],[i.s0,i.t1]].forEach(([e,n],i)=>{r.pointAt(e,n,p),i===0?t.moveTo(c(p.x,p.z),l(p.x,p.z)):t.lineTo(c(p.x,p.z),l(p.x,p.z))}),t.closePath(),t.stroke()}m(e=>r.halfWidthAt(e),this.colors.edge,1),m(e=>-r.halfWidthAt(e),this.colors.edge,1),m(e=>r.wallOffset(e),this.colors.wall,2),m(e=>-r.wallOffset(e),this.colors.wall,2),m(t=>e.line.offsetAt(t),this.colors.line,1.5),t.fillStyle=this.colors.trail;for(let e=0;e<this.trailN;e+=3){let n=this.trail[e*2],r=this.trail[e*2+1];t.fillRect(c(n,r)-1,l(n,r)-1,2,2)}for(let n of e.racers){let e=n.vehicle,r=Math.cos(e.h),i=Math.sin(e.h);t.fillStyle=n.isPlayer?this.colors.player:this.colors.ai,t.beginPath();let a=.9,o=2.1;[[-.9,-2.1],[a,-2.1],[a,o],[-.9,o]].forEach(([n,a],o)=>{let s=e.x+n*r+a*i,u=e.z-n*i+a*r;o===0?t.moveTo(c(s,u),l(s,u)):t.lineTo(c(s,u),l(s,u))}),t.closePath(),t.fill(),n.ai&&n.ai._pt&&(t.strokeStyle=this.colors.ai,t.lineWidth=1,t.beginPath(),t.moveTo(c(e.x,e.z),l(e.x,e.z)),t.lineTo(c(n.ai._pt.x,n.ai._pt.z),l(n.ai._pt.x,n.ai._pt.z)),t.stroke())}let h=e.camera.position;t.fillStyle=this.colors.cam,t.fillRect(c(h.x,h.z)-3,l(h.x,h.z)-3,6,6),t.strokeStyle=this.colors.cam,t.beginPath(),t.moveTo(c(h.x,h.z),l(h.x,h.z)),t.lineTo(c(i.x,i.z),l(i.x,i.z)),t.stroke(),t.fillStyle=this.colors.wall,t.font=`10px monospace`,t.fillText(`cells ${e.world.lastTested.length}  pen ${(e.debug.lastPenetration*100).toFixed(1)}cm  cam ${e.debug.cameraInside||`clear`}`,8,n-8)}};function $({label:e,variant:t=`primary`,size:n=`md`,disabled:r=!1,onClick:i,hotkey:a,id:o,title:s,className:c=``}={}){let l=Q(`button`,{className:`btn btn--${t} btn--${n} ${c}`.trim(),attrs:{type:`button`,id:o,title:s,"aria-disabled":r?`true`:void 0}});return l.disabled=!!r,l.appendChild(Q(`span`,{className:`btn__label`,text:e})),a&&l.appendChild(Q(`span`,{className:`btn__key`,text:a,attrs:{"aria-hidden":`true`}})),i&&l.addEventListener(`click`,e=>{l.disabled||i(e)}),l}function up({label:e,value:t=0,compare:n}={}){let r=[];for(let e=0;e<10;e++)r.push(Q(`span`,{className:`statbar__seg`}));let i=Q(`span`,{className:`statbar__value`}),a=Q(`div`,{className:`statbar`,attrs:{role:`meter`,"aria-valuemin":1,"aria-valuemax":10,"aria-label":e}},[Q(`span`,{className:`statbar__label`,text:e}),Q(`span`,{className:`statbar__track`},r),i]);return a.set=(e,t)=>{let n=Math.max(0,Math.min(10,Math.round(e)));for(let e=0;e<10;e++){let i=e+1,a=r[e];a.className=`statbar__seg`,t==null?i<=n&&a.classList.add(`is-on`):i<=Math.min(n,t)?a.classList.add(`is-on`):i<=n?a.classList.add(`is-up`):i<=t&&a.classList.add(`is-down`)}i.textContent=String(n),a.setAttribute(`aria-valuenow`,String(n))},a.set(t,n),a}var dp=`http://www.w3.org/2000/svg`,fp=`10,1 12.6,7.4 19.5,7.6 14.1,11.9 16,18.6 10,14.7 4,18.6 5.9,11.9 0.5,7.6 7.4,7.4`;function pp(e){let t=document.createElementNS(dp,`svg`);t.setAttribute(`viewBox`,`0 0 20 20`),t.setAttribute(`class`,e?`stars__star is-on`:`stars__star`),t.setAttribute(`aria-hidden`,`true`);let n=document.createElementNS(dp,`polygon`);return n.setAttribute(`points`,fp),t.appendChild(n),t}function mp({value:e=0,max:t=3,size:n=`sm`}={}){let r=Q(`span`,{className:`stars stars--${n}`,attrs:{role:`img`,"aria-label":`${e} of ${t} stars`}});for(let n=0;n<t;n++)r.appendChild(pp(n<e));return r}function hp({title:e,subtitle:t,media:n,stars:r=0,badges:i=[],locked:a=!1,lockText:o=`LOCKED`,selected:s=!1,onSelect:c,onFocus:l}={}){let u=Q(`button`,{className:`card level-card${a?` is-locked`:``}${s?` is-selected`:``}`,attrs:{type:`button`,"aria-pressed":s?`true`:`false`,"aria-disabled":a?`true`:void 0}});return n&&(n.classList.add(`card__media`),u.appendChild(n)),u.appendChild(Q(`div`,{className:`card__body`},[Q(`div`,{className:`card__title`,text:e}),t?Q(`div`,{className:`t-label-xs t-secondary`,text:t}):null,Q(`div`,{className:`card__meta`},[mp({value:r}),...i.map(e=>Ff(e))])])),a&&u.appendChild(If({text:o,className:`card__lock`})),c&&u.addEventListener(`click`,()=>c()),l&&(u.addEventListener(`focus`,()=>l()),u.addEventListener(`mouseenter`,()=>l())),u}function gp({name:e,tagline:t,swatches:n=[],locked:r=!1,lockText:i=`LOCKED`,selected:a=!1,onSelect:o}={}){let s=Q(`button`,{className:`card car-card${r?` is-locked`:``}${a?` is-selected`:``}`,attrs:{type:`button`,"aria-pressed":a?`true`:`false`,"aria-disabled":r?`true`:void 0}});return s.appendChild(Q(`div`,{className:`card__body`},[Q(`div`,{className:`card__title`,text:e}),Q(`div`,{className:`t-label-xs t-secondary`,text:t}),Q(`div`,{className:`card__meta`},n.map(e=>Q(`span`,{className:`card__swatch`,style:{background:e}})))])),r&&s.appendChild(If({text:i,className:`card__lock`})),o&&s.addEventListener(`click`,()=>o()),s}function _p({title:e,message:t,confirmLabel:n=`Confirm`,cancelLabel:r=`Cancel`,onConfirm:i,onCancel:a}={}){let o=$({label:r,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>a&&a()});return o.dataset.autofocus=``,Nf({raised:!0,className:`confirm`,children:[If({text:`Confirm`}),Q(`h2`,{className:`t-display-3`,text:e}),Q(`p`,{className:`t-body`,text:t}),Q(`div`,{className:`confirm__actions`},[o,$({label:n,variant:`primary`,size:`md`,onClick:()=>i&&i()})])]})}var vp=new Map;function yp(e){return vp.has(e)||vp.set(e,new Xl(nd[e])),vp.get(e)}function bp(e,t=320,n=200,{mono:r=!1}={}){let i=document.createElement(`canvas`),a=Math.min(2,window.devicePixelRatio||1);i.width=Math.round(t*a),i.height=Math.round(n*a);let o=i.getContext(`2d`),s=yp(e),c=nd[e],l=$l[c.theme],u=i.width,d=i.height;o.fillStyle=Ql(r?Y.void:au(l.ground,-.35)),o.fillRect(0,0,u,d);let f=s.bounds,p=14*a,m=Math.min((u-p*2)/(f.maxX-f.minX),(d-p*2)/(f.maxZ-f.minZ)),h=u/2+(f.minX+f.maxX)/2*m,g=d/2+(f.minZ+f.maxZ)/2*m,_=e=>h-e*m,v=e=>g-e*m,y=()=>{o.beginPath();for(let e=0;e<=s.n;e+=2){let t=e%s.n;e===0?o.moveTo(_(s.px[t]),v(s.pz[t])):o.lineTo(_(s.px[t]),v(s.pz[t]))}o.closePath()};o.lineJoin=`round`,o.lineCap=`round`,y(),o.strokeStyle=Ql(r?Y.edge:au(l.runoff,-.1)),o.lineWidth=Math.max(5*a,(s.halfWidthMax*2+s.runoff*2)*m),o.stroke(),y(),o.strokeStyle=Ql(Y.chalk),o.lineWidth=Math.max(2.5*a,s.halfWidthMax*2*m),o.stroke();for(let[e,t]of c.driftZones||[]){o.beginPath();let n=Math.floor(e*s.n),r=Math.floor(t*s.n);for(let e=n;e<=r;e++){let t=e%s.n;e===n?o.moveTo(_(s.px[t]),v(s.pz[t])):o.lineTo(_(s.px[t]),v(s.pz[t]))}o.strokeStyle=Ql(Y.goodGreen),o.lineWidth=2*a,o.stroke()}o.fillStyle=Ql(Y.infoBlue);for(let e of c.boostPads||[]){let t=Math.floor(e.u*s.n)%s.n;o.fillRect(_(s.px[t])-3*a,v(s.pz[t])-3*a,6*a,6*a)}let b=s.tx[0],x=s.tz[0],S=_(s.px[0]),C=v(s.pz[0]);o.strokeStyle=Ql(Y.red),o.lineWidth=3*a,o.beginPath();let w=9*a;return o.moveTo(S-x*w,C-b*w),o.lineTo(S+x*w,C+b*w),o.stroke(),i.style.width=`100%`,i.style.height=`auto`,i.setAttribute(`role`,`img`),i.setAttribute(`aria-label`,`${c.name} layout`),i}function xp(e,t,n){if(!t)return 0;if(t.type===`position`)return!n.rows||n.rows.length<2?0:n.position===1?3:n.position===2?2:+(n.position===3);if(t.type===`lap`){if(n.timedOut)return 0;let e=n.bestLap;if(!(e>0))return 0;let r=Math.max(1,n.lapTimes?n.lapTimes.length:1),i=e+(n.penalty||0)/r;return i<=t.gold?3:i<=t.silver?2:+(i<=t.bronze)}if(t.type===`drift`){let e=n.driftScore||0;return e>=t.gold?3:e>=t.silver?2:+(e>=t.bronze)}return 0}function Sp(e){return e===1?`Gold`:e===2?`Silver`:e===3?`Bronze`:``}var Cp=Object.freeze([`grandprix`,`timeattack`,`drift`]),wp=Object.freeze({grandprix:`Grand Prix`,timeattack:`Time Attack`,drift:`Drift Challenge`}),Tp=Object.freeze({beginner:0,street:5,speed:11,technical:17,night:23}),Ep=Object.freeze({sunset:3,cobalt:9,jade:15,magenta:22}),Dp=Object.freeze({beginner:{laps:3,opponents:5,difficulty:`easy`},street:{laps:3,opponents:6,difficulty:`medium`},speed:{laps:3,opponents:7,difficulty:`medium`},technical:{laps:2,opponents:7,difficulty:`hard`},night:{laps:3,opponents:7,difficulty:`hard`}}),Op=new Map;function kp(e){if(Op.has(e))return Op.get(e);let t=new Xl(nd[e]),n=new ld(t,{aLat:15.5,vMax:82}),r=0;for(let e=0;e<t.n;e++)r+=t.ds/Math.max(5,n.speed[e]);let i={lap:r,length:t.length};return Op.set(e,i),i}function Ap(e){return Math.round(e*10)/10}function jp(){let e=[];return rd.forEach((t,n)=>{let r=nd[t];Cp.forEach((i,a)=>{let o={id:`${t}-${i}`,index:n*3+a,circuitId:t,variant:i,name:`${r.venue}`,title:`${r.name} · ${wp[i]}`,difficulty:r.difficulty,unlockStars:Tp[t]};if(i===`grandprix`){let e=Dp[t];Object.assign(o,{mode:`grandprix`,laps:e.laps,opponents:e.opponents,aiDifficulty:e.difficulty,target:{type:`position`}})}else i===`timeattack`?(o.mode=`timeattack`,o.laps=t===`technical`?2:3,o.opponents=0,o.lazyTarget=!0):(o.mode=`drift`,o.laps=2,o.opponents=0,o.lazyTarget=!0);e.push(o)})}),e}var Mp=jp();function Np(e){if(!e.lazyTarget||e.target)return e.target;let t=kp(e.circuitId);if(e.variant===`timeattack`){let n=Ap(t.lap*1.07),r=Ap(t.lap*1.15),i=Ap(t.lap*1.27);e.target={type:`lap`,gold:n,silver:r,bronze:i,timeLimit:Math.round(i*e.laps*1.12+8)}}else{let n=t.length;e.target={type:`drift`,bronze:Math.round(n*1.1/50)*50,silver:Math.round(n*2.4/50)*50,gold:Math.round(n*4.2/50)*50}}return e.target}function Pp(e){return Mp.find(t=>t.id===e)||null}function Fp(e){let t=0;for(let n of Object.keys(e.stars))t+=e.stars[n]||0;return t}function Ip(e,t){let n=0;for(let r of Cp)n+=e.stars[`${t}-${r}`]||0;return n}function Lp(e,t){return e.settings.freePlay?!0:Fp(e)>=Tp[t]}function Rp(e,t){return Lp(e,t.circuitId)}function zp(e,t){return e.settings.freePlay||!t.unlock?!0:e.unlockedCars.includes(t.id)||Fp(e)>=t.unlock.stars}function Bp(e,t,n){if(e.settings.freePlay||n&&n.defaultLivery===t||e.unlockedLiveries.includes(t))return!0;let r=Ep[t];return r!==void 0&&Fp(e)>=r}function Vp(e,t){return{circuitId:e.circuitId,mode:e.mode,laps:e.laps,opponents:e.opponents,difficulty:e.aiDifficulty||`medium`,target:Np(e),levelId:e.id,levelIndex:e.index,carId:t.carId}}function Hp(e,t,n){let r={...t,stars:0,previousStars:0,newUnlocks:[],records:{}};if(!n)return r;let i=e.data,a=Fp(i),o=`${n.circuitId}:${n.mode}`;return e.update(e=>{if(e.records.races+=1,t.mode===`grandprix`&&t.position===1&&!t.ended&&(e.records.wins+=1),t.longestDrift>e.records.longestDrift&&(e.records.longestDrift=Math.round(t.longestDrift*10)/10),t.bestLap>0&&(!e.bestLaps[o]||t.bestLap<e.bestLaps[o])&&(e.bestLaps[o]=Math.round(t.bestLap*1e3)/1e3,t.bestSplits&&(e.bestSplits[o]=t.bestSplits.map(e=>Math.round(e*1e3)/1e3)),r.records.bestLap=!0),t.ghost&&n.mode===`timetrial`){let r=e.ghosts[n.circuitId];(!r||t.ghost.time<r.time)&&(e.ghosts[n.circuitId]=t.ghost)}if(t.driftScore>0&&(!e.bestDrift[o]||t.driftScore>e.bestDrift[o])&&(e.bestDrift[o]=t.driftScore,r.records.drift=!0),n.levelId){let i=Pp(n.levelId),a=i&&!t.ended?xp(i,Np(i),t):0;r.stars=a,r.previousStars=e.stars[n.levelId]||0,a>r.previousStars&&(e.stars[n.levelId]=a);for(let t of rd)Ip(e,t)>=6&&(e.cups[t]=!0)}let i=Fp(e);for(let t of Qd)t.unlock&&!e.unlockedCars.includes(t.id)&&i>=t.unlock.stars&&(e.unlockedCars.push(t.id),r.newUnlocks.push({type:`car`,name:t.name}));for(let t of eu){let n=Ep[t.id];n!==void 0&&!e.unlockedLiveries.includes(t.id)&&i>=n&&(e.unlockedLiveries.push(t.id),r.newUnlocks.push({type:`livery`,name:t.name}))}for(let e of rd){let t=Tp[e];t>0&&a<t&&i>=t&&r.newUnlocks.push({type:`circuit`,name:nd[e].name})}}),r.totalStars=Fp(i),r}function Up(e,t){let n=t.results||e.game.lastResults||{},r=e.game.race,i=r?r.config:{},a=i.levelId?Pp(i.levelId):null,o=e.game.net,s=!!n.online&&!!o,c;c=$(s?{label:`Back to lobby`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>{o.isHost&&o.backToLobby(),e._go(`select`,{screen:`lobby`})}}:{label:`Race again`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>e._restart()}),c.dataset.autofocus=``,e.primary=c,e.back=()=>e._go(`menu`,{screen:`main`});let l,u;if(n.timedOut)l=`Time up`,u=`The clock ran out before the finish.`;else if(n.multi&&n.mode===`drift`&&n.driftScores){let e=n.driftScores.slice().sort((e,t)=>t.score-e.score)[0];l=`${e.name} wins`,u=`${e.score} drift points`}else n.multi&&n.mode===`grandprix`&&!n.online&&n.winner?(l=`${n.winner} wins`,u=`Best placed driver`):n.mode===`grandprix`?(l=`P${n.position}`,u=n.position<=3?`${Sp(n.position)} medal`:`Finished ${Kp(n.position)} of ${n.rows.length}`):n.mode===`drift`?(l=`${n.driftScore}`,u=`Drift points`):n.mode===`timeattack`||n.mode===`timetrial`?(l=cf(n.bestLap),u=`Best lap`):(l=n.ended?`Session over`:`Finish`,u=n.lapTimes&&n.lapTimes.length?`${n.lapTimes.length} timed laps`:`No timed laps`);let d=n.records||{},f=[Pf({label:`Total`,value:n.mode===`practice`?`—`:cf(n.totalTime+(n.penalty||0)),size:`md`}),Pf({label:`Best lap`,value:cf(n.bestLap),size:`md`,className:d.bestLap?`stat--good`:``}),Pf({label:`Drift`,value:String(n.driftScore||0),size:`md`,className:d.drift&&n.mode===`drift`?`stat--good`:``}),n.tokensTotal?Pf({label:`Tokens`,value:`${n.tokens}/${n.tokensTotal}`,size:`md`}):null,n.penalty?Pf({label:`Penalties`,value:`+${n.penalty.toFixed(1)}s`,size:`md`,className:`stat--warn`}):null],p=[];d.bestLap&&p.push(Ff({label:`New best lap`,tone:`good`})),d.drift&&n.driftScore>0&&p.push(Ff({label:`New drift record`,tone:`good`})),n.stars>n.previousStars&&p.push(Ff({label:`+${n.stars-n.previousStars} ★`,tone:`good`}));for(let e of n.newUnlocks||[])p.push(Ff({label:`Unlocked ${e.type}: ${e.name}`,tone:`info`}));let m=n.rows&&n.rows.length>1?Wp(n.rows):Gp(n.lapTimes||[]);if(n.driftScores&&n.mode===`drift`){let e=n.driftScores.slice().sort((e,t)=>t.score-e.score);m=Q(`table`,{className:`standings`},[Q(`thead`,{},[Q(`tr`,{},[Q(`th`,{text:`Pos`}),Q(`th`,{text:`Driver`}),Q(`th`,{text:`Drift points`})])]),Q(`tbody`,{},e.map((e,t)=>Q(`tr`,{className:t===0?`is-best`:``},[Q(`td`,{text:String(t+1)}),Q(`td`,{text:e.name}),Q(`td`,{text:String(e.score)})])))])}let h=null;if(a){let t=Mp[a.index+1];t&&Rp(e.game.save.data,t)&&(h=$({label:`Next level`,variant:`secondary`,size:`md`,onClick:()=>e._startLevel(t)}))}let g=a?Np(a):null;e._screen(`screen--results`,[Nf({raised:!0,className:`results`,children:[Q(`div`,{className:`t-label-sm t-secondary`,text:`${Uf(n.mode)} · ${n.circuitName||``}${a?` · Level ${a.index+1}`:``}`}),Q(`div`,{className:`results__head`},[Q(`div`,{},[Q(`h1`,{className:`t-hero results__title`,text:l}),Q(`div`,{className:`t-label t-secondary`,text:u})]),a?Q(`div`,{className:`results__stars`},[mp({value:n.stars||0,size:`lg`}),Q(`div`,{className:`t-label-xs t-secondary`,text:qp(g)})]):null]),If({}),Q(`div`,{className:`results__stats`},f),p.length?Q(`div`,{className:`results__badges`},p):null,m,Q(`div`,{className:`results__actions`},[c,h,$({label:s?`Leave room`:`Menu`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>e._go(`menu`,{screen:`main`})})])]})])}function Wp(e){return Q(`table`,{className:`standings`},[Q(`thead`,{},[Q(`tr`,{},[`Pos`,`Driver`,`Car`,`Time`,`Best`].map(e=>Q(`th`,{text:e})))]),Q(`tbody`,{},e.map((t,n)=>{let r=n===0?cf(t.time):`+${(t.time-e[0].time).toFixed(3)}`;return Q(`tr`,{className:t.isPlayer?`is-player`:``},[Q(`td`,{text:String(t.position)}),Q(`td`,{text:t.name}),Q(`td`,{text:t.car}),Q(`td`,{text:t.finished?r:`${r} est.`}),Q(`td`,{text:cf(t.best)})])}))])}function Gp(e){if(!e.length)return null;let t=Math.min(...e);return Q(`table`,{className:`standings`},[Q(`thead`,{},[Q(`tr`,{},[Q(`th`,{text:`Lap`}),Q(`th`,{text:`Time`})])]),Q(`tbody`,{},e.map((e,n)=>Q(`tr`,{className:e===t?`is-best`:``},[Q(`td`,{text:String(n+1)}),Q(`td`,{text:cf(e)})])))])}function Kp(e){let t=[`th`,`st`,`nd`,`rd`],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}function qp(e){return e?e.type===`position`?`Top 3 earns stars`:e.type===`lap`?`3★ ${cf(e.gold)} · 2★ ${cf(e.silver)} · 1★ ${cf(e.bronze)}`:e.type===`drift`?`3★ ${e.gold} · 2★ ${e.silver} · 1★ ${e.bronze}`:``:``}var Jp=[{urls:[`stun:stun.l.google.com:19302`,`stun:stun1.l.google.com:19302`,`stun:stun2.l.google.com:19302`]},{urls:`stun:stun.cloudflare.com:3478`}];function Yp(){return!1}function Xp(){let e={BASE_URL:`./`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1,VITE_TURN_CREDENTIAL:``,VITE_TURN_URLS:``,VITE_TURN_USERNAME:``},t=Jp.slice();return e.VITE_TURN_URLS&&t.push({urls:String(e.VITE_TURN_URLS).split(`,`).map(e=>e.trim()).filter(Boolean),username:e.VITE_TURN_USERNAME||``,credential:e.VITE_TURN_CREDENTIAL||``}),t}var Zp=`modulepreload`,Qp=function(e,t){return new URL(e,t).href},$p={},em=function(e){return e.pathname.endsWith(`.css`)},tm=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},nm=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Qp(t,n);let r=s(t),i=em(r);return tm($p,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Zp,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},rm=`apexgp-v1-`,im=2e4,am=15e3,om=6e3,sm=Yp()?`Could not connect to the host. Check both internet connections and try again.`:`Could not connect to the host: one of your networks blocks direct connections (common on mobile data and office or campus Wi-Fi). Try another network, or let the player on home Wi-Fi host the room.`,cm=class{constructor(){this.handlers={message:[],join:[],leave:[],error:[]},this.isHost=!1,this.closed=!1,this._onPageHide=()=>this.close(),typeof window<`u`&&window.addEventListener(`pagehide`,this._onPageHide)}_unhook(){typeof window<`u`&&window.removeEventListener(`pagehide`,this._onPageHide)}onMessage(e){this.handlers.message.push(e)}onJoin(e){this.handlers.join.push(e)}onLeave(e){this.handlers.leave.push(e)}onError(e){this.handlers.error.push(e)}_emit(e,...t){for(let n of this.handlers[e])try{n(...t)}catch(e){console.error(e)}}},lm=class extends cm{constructor(){super(),this.peer=null,this.conns=new Map}async _peer(e){let{Peer:t}=await nm(async()=>{let{Peer:e}=await import(`./bundler-Cyhcs-8Y.js`);return{Peer:e}},[],import.meta.url);return new Promise((n,r)=>{let i={debug:0,config:{iceServers:Xp()}},a=e?new t(e,i):new t(i),o=setTimeout(()=>{a.destroy(),r(Error(`Could not reach the matchmaking server (check your internet connection).`))},im);a.on(`open`,()=>{clearTimeout(o),n(a)}),a.on(`error`,e=>{clearTimeout(o);let t=e.type===`unavailable-id`?`That room code is already in use.`:e.type===`peer-unavailable`?`Room not found. Check the code.`:e.type===`network`||e.type===`server-error`||e.type===`socket-error`?`Network problem: could not reach the matchmaking server.`:e.type===`browser-incompatible`?`This browser does not support WebRTC.`:String(e.message||e.type||e),n=Error(t);n.type=e.type,this.peer?this._emit(`error`,n):(a.destroy(),r(n))})})}_wire(e){e.on(`data`,t=>this._emit(`message`,e.peer,t)),e.on(`close`,()=>{this.conns.delete(e.peer),this._emit(`leave`,e.peer)}),e.on(`error`,()=>{this.conns.delete(e.peer),this._emit(`leave`,e.peer)})}async host(e){this.isHost=!0,this.peer=await this._peer(rm+e),this.peer.on(`connection`,e=>{let t=0;e.on(`iceStateChanged`,n=>{clearTimeout(t),n===`failed`||n===`closed`?e.close():n===`disconnected`&&(t=setTimeout(()=>e.close(),om))}),e.on(`open`,()=>{this.conns.set(e.peer,e),this._wire(e),this._emit(`join`,e.peer)})}),this.peer.on(`disconnected`,()=>{this.closed||this.peer.reconnect()})}async join(e){this.isHost=!1,this.peer=await this._peer(null);let t=rm+e;await new Promise((e,n)=>{let r=this.peer.connect(t,{reliable:!0,serialization:`json`}),i=setTimeout(()=>n(Error(sm)),am);r.on(`iceStateChanged`,e=>{e===`failed`&&(clearTimeout(i),n(Error(sm)))}),r.on(`open`,()=>{clearTimeout(i),this.conns.set(t,r),this._wire(r),e()}),this.peer.on(`error`,e=>{clearTimeout(i),n(Error(e.type===`peer-unavailable`?`Room not found. Check the code.`:String(e.message||e.type)))})}),this.hostId=t}send(e,t){let n=this.conns.get(e);n&&n.open&&n.send(t)}broadcast(e){for(let t of this.conns.values())t.open&&t.send(e)}close(){this.closed=!0,this._unhook();for(let e of this.conns.values())try{e.close()}catch{}this.conns.clear(),this.peer&&this.peer.destroy(),this.peer=null}},um=class extends cm{constructor(){super(),this.id=`p`+Math.random().toString(36).slice(2,10),this.clients=new Set,this.channel=null}_open(e){this.channel=new BroadcastChannel(`apexgp-room-`+e),this.channel.onmessage=e=>{let t=e.data;t&&(t.to===this.id||t.to===`host`&&this.isHost)&&(t.kind===`hello`&&this.isHost?(this.clients.add(t.from),this.channel.postMessage({kind:`welcome`,to:t.from,from:this.id}),this._emit(`join`,t.from)):t.kind===`welcome`&&!this.isHost?(this.hostId=t.from,this._joined&&this._joined()):t.kind===`bye`?(this.isHost&&this.clients.delete(t.from),this._emit(`leave`,t.from)):t.kind===`busy`&&!this.isHost?this._busy&&this._busy():t.kind===`ping`&&this.isHost?this.channel.postMessage({kind:`busy`,to:t.from,from:this.id}):t.kind===`data`&&this._emit(`message`,t.from,t.data))}}async host(e){this.isHost=!0,this._open(e);let t=await new Promise(e=>{this._busy=()=>e(!0),this.isHost=!1,this.channel.postMessage({kind:`ping`,to:`host`,from:this.id}),setTimeout(()=>e(!1),150)});if(this.isHost=!0,this._busy=null,t)throw this.close(),Error(`That room code is already in use.`)}async join(e){this.isHost=!1,this._open(e),await new Promise((e,t)=>{let n=setTimeout(()=>t(Error(`Room not found. Check the code.`)),2e3);this._joined=()=>{clearTimeout(n),e()},this.channel.postMessage({kind:`hello`,to:`host`,from:this.id})})}send(e,t){this.channel&&this.channel.postMessage({kind:`data`,to:e,from:this.id,data:t})}broadcast(e){if(this.channel){if(this.isHost)for(let t of this.clients)this.send(t,e);else this.send(this.hostId,e)}}close(){if(!this.closed){if(this.closed=!0,this._unhook(),this.channel){let e=this.isHost?null:this.hostId;if(this.isHost)for(let e of this.clients)this.channel.postMessage({kind:`bye`,to:e,from:this.id});else e&&this.channel.postMessage({kind:`bye`,to:e,from:this.id});this.channel.close()}this.channel=null}}};function dm(e=Math.random){let t=``;for(let n=0;n<4;n++)t+=`ABCDEFGHJKLMNPQRSTUVWXYZ`[Math.floor(e()*24)];return t}var fm=1,pm=3e3,mm=class{constructor({kind:e=`peer`,name:t=`Driver`,carId:n=`falcon`,livery:r=`ember`}={}){this.kind=e,this.me={name:hm(t),carId:n,livery:r},this.transport=e===`local`?new um:new lm,this.isHost=!1,this.code=null,this.slot=-1,this.players=[],this.settings={circuitId:`beginner`,laps:3,ai:0,mode:`grandprix`},this.remote=new Map,this.state=`idle`,this.listeners={lobby:[],start:[],go:[],error:[],closed:[]},this.sendAcc=0,this._outbox=null,this.transport.onMessage((e,t)=>this._onMessage(e,t)),this.transport.onJoin(()=>{}),this.transport.onLeave(e=>this._onLeave(e)),this.transport.onError(e=>this._emit(`error`,e))}on(e,t){return this.listeners[e].push(t),()=>{let n=this.listeners[e].indexOf(t);n>=0&&this.listeners[e].splice(n,1)}}_emit(e,...t){for(let n of this.listeners[e].slice())n(...t)}async create(e){for(let t=0;;t++){let n=e||dm();try{await this.transport.host(n),e=n;break}catch(n){if(e||n.type!==`unavailable-id`||t>=3)throw n}}return this.isHost=!0,this.code=e,this.slot=0,this.players=[{slot:0,...this.me,peerId:`host`,loaded:!1}],this.state=`lobby`,this._emit(`lobby`),e}async join(e){if(e=String(e||``).trim().toUpperCase(),!/^[A-Z]{4}$/.test(e))throw Error(`Room codes are 4 letters.`);await this.transport.join(e),this.code=e,this.state=`joining`,this.transport.broadcast({t:`hello`,v:fm,...this.me}),await new Promise((e,t)=>{let n=setTimeout(()=>t(Error(`The host did not answer.`)),8e3);this._welcome=r=>{clearTimeout(n),r?t(r):e()}}),this.state=`lobby`}updateMe(e){Object.assign(this.me,e),e.name!==void 0&&(this.me.name=hm(e.name)),this.isHost?(Object.assign(this.players[0],this.me),this._sendLobby()):this.transport.broadcast({t:`me`,...this.me})}setSettings(e){this.isHost&&(Object.assign(this.settings,e),this.settings.ai=Math.max(0,Math.min(8-this.players.length,this.settings.ai|0)),this._sendLobby())}_sendLobby(){let e={t:`lobby`,players:this.players.map(({slot:e,name:t,carId:n,livery:r})=>({slot:e,name:t,carId:n,livery:r})),settings:this.settings,code:this.code};this.transport.broadcast(e),this._emit(`lobby`)}start(){if(!this.isHost)return;for(let e of this.players)e.loaded=!1;this.remote.clear();let e={t:`start`,settings:this.settings,players:this.players.map(({slot:e,name:t,carId:n,livery:r})=>({slot:e,name:t,carId:n,livery:r})),seed:Math.floor(Math.random()*1e6)};this.transport.broadcast(e),this.state=`racing`,this._emit(`start`,e)}loaded(){this.isHost?(this.players[0].loaded=!0,this._maybeGo(),clearTimeout(this._goTimer),this._goTimer=setTimeout(()=>this._go(),15e3)):this.transport.broadcast({t:`loaded`})}_maybeGo(){this.players.every(e=>e.loaded)&&this._go()}_go(){this._wentGo||(this._wentGo=!0,clearTimeout(this._goTimer),this.transport.broadcast({t:`go`}),this._emit(`go`))}backToLobby(){this._wentGo=!1,this.state=`lobby`,this.isHost&&(this.transport.broadcast({t:`lobbyReturn`}),this._sendLobby())}setOutgoing(e){this._outbox=e}tick(e){if(this.sendAcc+=e,!(this.sendAcc<1/15||!this._outbox)){if(this.sendAcc=0,this.isHost){let e=this._outbox.slice(),t=performance.now();for(let[n,r]of this.remote)!String(n).startsWith(`ai`)&&t-r.at<pm&&e.push(r.st);this.transport.broadcast({t:`sts`,list:e})}else this.transport.broadcast({t:`st`,list:this._outbox})}}_onMessage(e,t){if(!t||typeof t!=`object`)return;let n=performance.now();if(this.isHost){if(t.t===`hello`){if(t.v!==fm)return this.transport.send(e,{t:`reject`,reason:`Different game version. Reload the page.`});if(this.state===`racing`)return this.transport.send(e,{t:`reject`,reason:`A race is in progress. Try again when it ends.`});if(this.players.length>=6)return this.transport.send(e,{t:`reject`,reason:`Room is full (6 players).`});let n=new Set(this.players.map(e=>e.slot)),r=1;for(;n.has(r);)r++;this.players.push({slot:r,name:hm(t.name),carId:String(t.carId||`falcon`),livery:String(t.livery||`ember`),peerId:e,loaded:!1}),this.players.sort((e,t)=>e.slot-t.slot),this.settings.ai=Math.min(this.settings.ai,8-this.players.length),this.transport.send(e,{t:`welcome`,slot:r}),this._sendLobby()}else if(t.t===`me`){let n=this.players.find(t=>t.peerId===e);n&&(n.name=hm(t.name),n.carId=String(t.carId||n.carId),n.livery=String(t.livery||n.livery),this._sendLobby())}else if(t.t===`loaded`){let t=this.players.find(t=>t.peerId===e);t&&(t.loaded=!0),this._maybeGo()}else if(t.t===`st`&&Array.isArray(t.list))for(let e of t.list)Array.isArray(e)&&this.remote.set(e[0],{st:e,at:n})}else if(t.t===`welcome`)this.slot=t.slot,this._welcome&&this._welcome(null);else if(t.t===`reject`)this._welcome&&this._welcome(Error(t.reason)),this.close();else if(t.t===`lobby`)this.players=t.players,this.settings=t.settings,this._emit(`lobby`);else if(t.t===`start`)this.remote.clear(),this.players=t.players,this.settings=t.settings,this.state=`racing`,this._wentGo=!1,this._emit(`start`,t);else if(t.t===`go`)this._wentGo=!0,this._emit(`go`);else if(t.t===`lobbyReturn`)this.state=`lobby`,this._emit(`lobby`);else if(t.t===`sts`&&Array.isArray(t.list))for(let e of t.list)Array.isArray(e)&&e[0]!==this.slot&&this.remote.set(e[0],{st:e,at:n})}_onLeave(e){if(this.isHost){let t=this.players.findIndex(t=>t.peerId===e);if(t>=0){let e=this.players[t].slot;this.players.splice(t,1),this.remote.delete(e),this._sendLobby(),this._maybeGo()}}else this.state!==`closed`&&(this.close(),this._emit(`error`,Error(`The host left the room.`)))}close(){this.state!==`closed`&&(this.state=`closed`,clearTimeout(this._goTimer),this.transport.close(),this._emit(`closed`))}};function hm(e){return String(e||``).replace(/[^\p{L}\p{N} _.-]/gu,``).trim().slice(0,14)||`Driver`}var gm=[`kbA`,`kbB`,`pad0`,`pad1`,`pad2`,`pad3`];function _m(){return Qd.slice()}function vm(){return rd.slice()}function ym(e,t,n){let r=Q(`span`,{className:`stepper__value`,text:t}),i=Q(`button`,{className:`btn btn--secondary btn--sm`,text:`◀`,attrs:{type:`button`,"aria-label":`Previous ${e}`}}),a=Q(`button`,{className:`btn btn--secondary btn--sm`,text:`▶`,attrs:{type:`button`,"aria-label":`Next ${e}`}});return i.addEventListener(`click`,()=>r.replaceChildren(String(n(-1)))),a.addEventListener(`click`,()=>r.replaceChildren(String(n(1)))),Q(`span`,{className:`stepper`},[i,r,a])}function bm(e){let t=El[e];return t?`${t.throttle.concat(t.left,t.brake,t.right).map(jl).join(` `)} · drift ${jl(t.handbrake[0])} · nitro ${jl(t.boost[0])} · cam ${jl(t.camera[0])}`:`RT/LT drive · stick steer · A drift · X nitro · B camera`}function xm(e){e.back=()=>e._go(`menu`,{screen:`main`});let t=(e,t,n,r,i)=>Q(`button`,{className:`card mode-card`,attrs:{type:`button`,"data-autofocus":i?``:void 0},onClick:r},[Q(`div`,{className:`card__title`,text:e}),Q(`p`,{className:`t-body`,text:t}),Q(`div`,{className:`card__meta`},[Ff(n)])]);e._screen(`screen--mode`,[e._header(`Multiplayer`,`1 to 6 drivers`),Q(`div`,{className:`mode-grid`},[t(`Split-screen`,`Up to 6 players on this computer. Two share the keyboard (WASD and arrows), the rest use gamepads. Add AI to fill the grid.`,{label:`2–6 players`,tone:`info`},()=>{e.click(),e.game.store.set({screen:`split`}),e.render(e.game.store.state)},!0),t(`Online`,`Play from different computers with a 4-letter room code. Up to 6 drivers; the host can add AI. Needs an internet connection.`,{label:`Room code`,tone:`good`},()=>{e.click(),e.game.store.set({screen:`online`}),e.render(e.game.store.state)})]),e._footer([$({label:`Back`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>e.back()})])])}function Sm(e){let t=_m(),n=vm(),r=e.split=e.split||{players:2,slots:gm.map((e,n)=>({name:`P${n+1}`,device:e,car:t[n%t.length].id})),circuitId:n[0],laps:3,ai:2,mode:`grandprix`};n.includes(r.circuitId)||(r.circuitId=n[0]),e.back=()=>{e.click(),e.game.store.set({screen:`mp`}),e.render(e.game.store.state)};let i=Q(`div`,{className:`mp-slots`}),a=()=>{kf(i);for(let n=0;n<r.players;n++){let o=r.slots[n],s=e.game.input.padCount,c=!o.device.startsWith(`pad`)||Number(o.device.slice(3))<s;i.appendChild(Q(`div`,{className:`mp-slot`},[Q(`span`,{className:`mp-slot__tag`,text:`P${n+1}`}),ym(`car`,ef(o.car).name,e=>{let n=t.findIndex(e=>e.id===o.car);return o.car=t[(n+e+t.length)%t.length].id,ef(o.car).name}),ym(`controls`,Dl[o.device],e=>{let t=gm.indexOf(o.device);return o.device=gm[(t+e+gm.length)%gm.length],setTimeout(a,0),Dl[o.device]}),Q(`span`,{className:`t-label-xs t-secondary mp-slot__hint`,text:bm(o.device)}),c?null:Ff({label:`Connect this gamepad`,tone:`warn`})]))}};a();let o=$({label:`Start`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>Cm(e)});o.dataset.autofocus=``,e.primary=o;let s=Q(`div`,{className:`mp-preview`},[bp(r.circuitId,320,190)]);e._screen(`screen--setup`,[e._header(`Split-screen`,`${r.players} players on one screen`),Q(`div`,{className:`setup`},[Nf({label:`Players`,raised:!0,className:`setup__panel`,children:[e._segmented(`Players`,[2,3,4,5,6],r.players,e=>{r.players=e,r.ai=Math.min(r.ai,8-e),a()}),i,Q(`p`,{className:`t-body`,text:`Gamepads connected: ${e.game.input.padCount}. Press any button on a gamepad if it is not detected.`})]}),Nf({label:`Race`,className:`setup__panel`,children:[e._segmented(`Circuit`,n,r.circuitId,e=>{r.circuitId=e,s.replaceChildren(bp(e,320,190))},e=>nd[e].name.replace(` GP`,``)),s,e._segmented(`Mode`,[`grandprix`,`drift`],r.mode,e=>r.mode=e,e=>e===`drift`?`Drift battle`:`Race`),e._segmented(`Laps`,[1,2,3,4,5],r.laps,e=>r.laps=e),e._segmented(`AI cars`,[0,1,2,3,4,5,6],r.ai,e=>r.ai=Math.min(e,8-r.players))]})]),e._footer([$({label:`Back`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>e.back()}),o])])}function Cm(e){let t=e.split;e.click();let n=t.slots.slice(0,t.players).map((t,n)=>{let r=ef(t.car);return{name:`P${n+1}`,carId:r.id,liveryId:e.game.save.data.livery[r.id]||r.defaultLivery,device:t.device}});e.game.startRace({circuitId:t.circuitId,mode:t.mode,laps:t.laps,opponents:Math.min(t.ai,8-t.players),difficulty:`medium`,humans:n,tokens:!1})}function wm(e){let t=e.game,n=t.save.data,r=ef(n.carId);e.back=()=>{e.click(),t.store.set({screen:`mp`}),e.render(t.store.state)};let i=e.online=e.online||{kind:`peer`,busy:!1,error:``},a=Q(`input`,{className:`text-input`,attrs:{type:`text`,maxlength:14,value:n.settings.playerName,"aria-label":`Your name`,autocomplete:`off`}}),o=Q(`input`,{className:`text-input text-input--code`,attrs:{type:`text`,maxlength:4,placeholder:`ABCD`,"aria-label":`Room code`,autocomplete:`off`}});o.addEventListener(`input`,()=>o.value=o.value.toUpperCase().replace(/[^A-Z]/g,``));let s=Q(`p`,{className:`t-body mp-status`,attrs:{role:`status`},text:i.error}),c=(e,t=``)=>{i.busy=e,s.textContent=t,u.disabled=e,d.disabled=e},l=()=>{let e=a.value.trim()||`Driver`;return t.save.update(t=>t.settings.playerName=e),new mm({kind:i.kind,name:e,carId:r.id,livery:n.livery[r.id]||r.defaultLivery})},u=$({label:`Create room`,variant:`primary`,size:`lg`,onClick:async()=>{c(!0,`Creating room…`);let n=l();try{await n.create(),t.attachNet(n),i.error=``,t.store.set({screen:`lobby`}),e.render(t.store.state)}catch(e){n.close(),c(!1,e.message)}}});u.dataset.autofocus=``;let d=$({label:`Join`,variant:`secondary`,size:`lg`,onClick:async()=>{if(!/^[A-Z]{4}$/.test(o.value)){c(!1,`Enter the 4-letter room code from the host.`),o.focus();return}c(!0,`Joining ${o.value}…`);let n=l();try{await n.join(o.value),t.attachNet(n),i.error=``,t.store.set({screen:`lobby`}),e.render(t.store.state)}catch(e){n.close(),c(!1,e.message)}}});o.addEventListener(`keydown`,e=>{e.key===`Enter`&&d.click()}),e.primary=u,e._screen(`screen--setup`,[e._header(`Online`,`Up to 6 drivers with a room code`),Q(`div`,{className:`setup`},[Nf({label:`You`,raised:!0,className:`setup__panel`,children:[Q(`label`,{className:`field`},[Q(`span`,{className:`field__label`,text:`Name`}),a]),Q(`div`,{className:`field`},[Q(`span`,{className:`field__label`,text:`Car`}),Q(`span`,{className:`t-label`,text:r.name}),$({label:`Garage`,variant:`ghost`,size:`sm`,onClick:()=>e._go(`garage`,{returnTo:`select`,returnScreen:`online`})})]),e._segmented(`Connection`,[`peer`,`local`],i.kind,e=>i.kind=e,e=>e===`peer`?`Internet`:`This browser`),Q(`p`,{className:`t-body`,text:`Internet connects every player straight to the host. If a friend cannot join, let the player on home Wi-Fi host (mobile data and office or campus Wi-Fi often block direct links). "This browser" links tabs and windows on one computer.`})]}),Nf({label:`Room`,className:`setup__panel`,children:[Q(`div`,{className:`t-label-sm t-secondary`,text:`Host a race`}),u,If({}),Q(`div`,{className:`t-label-sm t-secondary`,text:`Join a friend`}),Q(`div`,{className:`mp-join`},[o,d]),s]})]),e._footer([$({label:`Back`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>e.back()})])])}function Tm(e){let t=e.game,n=t.net;if(!n){t.store.set({screen:`online`}),e.render(t.store.state);return}let r=t.save.data;e.back=()=>{e.click(),t.closeNet(),t.store.set({screen:`online`}),e.render(t.store.state)};let i=Q(`ol`,{className:`mp-lobby`});for(let e of n.players)i.appendChild(Q(`li`,{className:e.slot===n.slot?`is-me`:``},[Q(`span`,{className:`mp-lobby__name`,text:e.name}),Q(`span`,{className:`t-label-xs t-secondary`,text:ef(e.carId).name}),e.slot===0?Ff({label:`Host`,tone:`solid`}):null,e.slot===n.slot?Ff({label:`You`,tone:`info`}):null]));let a=_m(),o=vm(),s=ym(`car`,ef(n.me.carId).name,e=>{let t=Math.max(0,a.findIndex(e=>e.id===n.me.carId)),i=a[(t+e+a.length)%a.length];return n.updateMe({carId:i.id,livery:r.livery[i.id]||i.defaultLivery}),i.name}),c=[Q(`div`,{className:`mp-code`},[Q(`span`,{className:`t-label-sm t-secondary`,text:`Room code`}),Q(`span`,{className:`t-display-1 mp-code__value`,text:n.code||`----`})]),Q(`p`,{className:`t-body`,text:`${n.players.length} / 6 drivers. Friends open the game, choose Multiplayer → Online, and enter this code.`}),i,Q(`div`,{className:`field`},[Q(`span`,{className:`field__label`,text:`Your car`}),s])],l=null,u=[],d=[];if(n.isHost){let t=n.settings;o.includes(t.circuitId)||n.setSettings({circuitId:o[0]}),u.push(e._segmented(`Circuit`,o,t.circuitId,e=>n.setSettings({circuitId:e}),e=>nd[e].name.replace(` GP`,``)),e._segmented(`Laps`,[1,2,3,4,5],t.laps,e=>n.setSettings({laps:e})),e._segmented(`AI cars`,[0,1,2,3,4],Math.min(t.ai,4),e=>n.setSettings({ai:e}))),l=$({label:`Start race`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>{e.click(),n.start()}}),l.dataset.autofocus=``,e.primary=l}else{let e=n.settings;d.push(Q(`p`,{className:`t-label`,text:`${nd[e.circuitId]?nd[e.circuitId].name:``} · ${e.laps} laps · ${e.ai} AI`}),Q(`p`,{className:`t-body mp-status`,text:`Waiting for the host to start the race…`}))}let f=[bp(n.settings.circuitId,360,200)];n.isHost?f.push(...u,l):f.push(...d),e._screen(`screen--setup`,[e._header(`Lobby`,n.isHost?`You are hosting`:`Joined`),Q(`div`,{className:`setup`},[Nf({label:`Drivers`,raised:!0,className:`setup__panel`,children:c}),Nf({label:`Race`,className:`setup__panel`,children:f})]),e._footer([$({label:`Leave room`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>e.back()})])])}var Em=[{id:`campaign`,name:`Campaign`,desc:`15 levels across 5 circuits. Earn stars to unlock circuits, cars and liveries.`,badge:{label:`15 levels`,tone:`solid`}},{id:`grandprix`,name:`Grand Prix`,desc:`Race a full grid of AI drivers. Pick laps, grid size and difficulty.`,badge:{label:`vs AI`,tone:`info`}},{id:`timetrial`,name:`Time Trial`,desc:`Solo laps against the clock. Your personal best sets the delta.`,badge:{label:`Solo`,tone:`neutral`}},{id:`drift`,name:`Drift Challenge`,desc:`Chain long slides for points. Drift zones double the score.`,badge:{label:`Score`,tone:`good`}},{id:`practice`,name:`Practice`,desc:`Unlimited laps, no pressure. End the session from the pause menu.`,badge:{label:`Free`,tone:`neutral`}}],Dm=[`Tap the handbrake (or the brake) while turning in to start a drift, then hold the throttle to keep it.`,`Let go of the steering or counter-steer to straighten a slide. Lifting off ends it and banks the points.`,`Drifting, flat-out speed and near misses fill the nitro tank. Hold Shift to burn it.`,`Press Q for Speedbreaker: slow motion that makes tight corners and traffic easy.`,`Multiplayer: up to 6 players on one screen, or online with a room code.`,`Hitting a wall breaks your drift combo and loses the unbanked points.`,`Blue chevron pads give a burst of speed. Amber means hazard.`,`Tuck in behind a rival on a straight to catch the slipstream.`,`Hold R to restart instantly. Tap R to get back on the road.`],Om=`button:not([disabled]):not([aria-disabled="true"]), [role="radio"], input[type="range"], [tabindex="0"]`,km=class{constructor(e){this.game=e,this.root=e.uiRoot,this.layer=Q(`div`,{className:`menu-layer`}),this.root.appendChild(this.layer),this.toasts=new zf(this.root),this.toasts.el.classList.add(`toast-stack--menu`),this.primary=null,this.back=null,this.overlay=null,this.garageIndex=0,this.selectedLevel=null,this.setup={circuitId:`beginner`,difficulty:`medium`,laps:3,opponents:5},this.loadingEls=null,this.tipIndex=0,this._onKey=this._onKey.bind(this),window.addEventListener(`keydown`,this._onKey)}onLobby(){let e=this.game.store.state;if(e.phase===`select`&&e.screen===`lobby`&&!this.overlay){let t=document.activeElement&&document.activeElement.textContent;if(this.render(e),t){for(let e of this.layer.querySelectorAll(`button`))if(e.textContent===t){e.focus({preventScroll:!0});break}}}}overlayOpen(){return!!this.overlay}toast(e,t=`neutral`){let n=this.game.store.phase;this.game.race&&this.game.race.hud&&(n===`racing`||n===`countdown`)?this.game.race.hud.toast(e,t):this.toasts.show(e,t)}click(){this.game.audio.play(`click`)}render(e){let t=e.phase;this.closeOverlay(!1),this.primary=null,this.back=null,kf(this.layer),this.layer.className=`menu-layer menu-layer--${t}`,this.loadingEls=null,this.garageEls=null,t===`menu`?this._main():t===`select`?e.screen===`track`?this._track(e):e.screen===`setup`?this._setup(e):e.screen===`mp`?xm(this):e.screen===`split`?Sm(this):e.screen===`online`?wm(this):e.screen===`lobby`?Tm(this):this._mode(e):t===`garage`?this._garage(e):t===`loading`?this._loading(e):t===`paused`?this._pause(e):t===`results`?this._results(e):(t===`countdown`||t===`racing`)&&(this.layer.className=`menu-layer menu-layer--hidden`),t===`menu`&&e.screen===`settings`&&this.openSettings(),t===`menu`&&e.screen===`controls`&&this.openControls();let n=this.layer.querySelector(`[data-autofocus]`)||this.primary;n&&t!==`countdown`&&t!==`racing`&&n.focus({preventScroll:!0})}_screen(e,t){let n=Q(`div`,{className:`screen ${e}`},t);return this.layer.appendChild(n),n}_main(){let e=this.game.save.data,t=Fp(e),n=$({label:`Drive`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>this._go(`select`,{screen:`mode`})});n.dataset.autofocus=``,this.primary=n;let r=ef(e.carId),i=Nf({raised:!0,className:`hero-card`,children:[Q(`div`,{className:`t-label-sm t-secondary`,text:`Season 01 · Low-poly formula racing`}),Q(`h1`,{className:`t-hero hero-card__title`,text:`Apex GP`}),If({}),Q(`p`,{className:`t-body`,text:`Fifteen levels, five circuits, six cars. Drift, burn nitro, race your friends.`}),Q(`div`,{className:`hero-card__actions`},[n,$({label:`Multiplayer`,variant:`secondary`,size:`md`,onClick:()=>this._go(`select`,{screen:`mp`})}),$({label:`Garage`,variant:`secondary`,size:`md`,onClick:()=>this._go(`garage`,{returnTo:`menu`})}),$({label:`Quick practice`,variant:`secondary`,size:`md`,onClick:()=>this._quickPractice()}),$({label:`Settings`,variant:`ghost`,size:`md`,onClick:()=>this.openSettings()}),$({label:`Controls`,variant:`ghost`,size:`md`,onClick:()=>this.openControls()})]),Q(`div`,{className:`hero-card__meta`},[Ff({label:`★ ${t} / ${Mp.length*3}`,tone:`solid`}),Ff({label:r.name,tone:`info`}),this.game.save.available?null:Ff({label:`Progress not saved (storage blocked)`,tone:`warn`}),e.settings.freePlay?Ff({label:`Free play`,tone:`good`}):null])]});this._screen(`screen--main`,[i,Q(`div`,{className:`screen__corner`},[Lf({keys:[`M`],label:`Mute`}),Lf({keys:[`F3`],label:`Debug`})])])}_quickPractice(){this.click();let e=this.game.save.data,t=this.setup.circuitId,n=Lp(e,t)?t:`beginner`;this.game.startRace({circuitId:n,mode:`practice`,laps:0,opponents:0})}_go(e,t){this.click(),this.game.store.go(e,t)}_mode(e){let t=Em.map((t,n)=>Q(`button`,{className:`card mode-card${e.mode===t.id?` is-selected`:``}`,attrs:{type:`button`,"data-autofocus":e.mode===t.id||!e.mode&&n===0?``:void 0},onClick:()=>{this.click(),this.game.store.set({mode:t.id,screen:`track`}),this.render(this.game.store.state)}},[Q(`div`,{className:`card__title`,text:t.name}),Q(`p`,{className:`t-body`,text:t.desc}),Q(`div`,{className:`card__meta`},[Ff(t.badge)])]));this.back=()=>this._go(`menu`,{screen:`main`}),this._screen(`screen--mode`,[this._header(`Choose mode`,`Step 1 of 3`),Q(`div`,{className:`mode-grid`},t),this._footer([$({label:`Back`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>this.back()})])])}_header(e,t,n){return Q(`header`,{className:`screen__header`},[Q(`div`,{},[Q(`div`,{className:`t-label-sm t-secondary`,text:t||``}),Q(`h1`,{className:`t-display-2`,text:e})]),n||null])}_footer(e){return Q(`footer`,{className:`screen__footer`},e)}_track(e){let t=this.game.save.data;if(this.back=()=>{this.click(),this.game.store.set({screen:`mode`}),this.render(this.game.store.state)},e.mode===`campaign`)return this._campaign(t);let n=rd.map(n=>{let r=nd[n],i=!Lp(t,n),a=t.bestLaps[`${n}:${e.mode}`],o=hp({title:r.name,subtitle:`${r.venue} · ${Math.round(Mm(n))} m`,media:bp(n,320,200),stars:0,badges:[{label:jm(r.difficulty),tone:r.difficulty>=4?`outlineHazard`:r.difficulty>=3?`info`:`good`},a?{label:`PB ${cf(a)}`,tone:`neutral`}:null].filter(Boolean),locked:i,lockText:`Need ${Tp[n]} stars`,selected:this.setup.circuitId===n,onSelect:()=>{i?this.toast(`Earn ${Tp[n]} campaign stars to unlock`,`warn`):(this.click(),this.setup.circuitId=n,this.game.store.set({screen:`setup`,trackId:n}),this.render(this.game.store.state))}});return o.querySelector(`.stars`).remove(),this.setup.circuitId===n&&(o.dataset.autofocus=``),o});this._screen(`screen--track`,[this._header(`Choose circuit`,`${Uf(e.mode)} · Step 2 of 3`),Q(`div`,{className:`track-grid`},n),this._footer([$({label:`Back`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>this.back()})])])}_campaign(e){let t=Fp(e),n=rd.map(t=>{let n=nd[t],r=Lp(e,t),i=Mp.filter(e=>e.circuitId===t).map(i=>{let a=e.stars[i.id]||0,o=hp({title:wp[i.variant],subtitle:i.mode===`grandprix`?`${i.laps} laps · ${i.opponents+1} cars`:i.mode===`timeattack`?`${i.laps} laps · beat the clock`:`${i.laps} laps · score target`,media:bp(t,240,140),stars:a,badges:[{label:`L${i.index+1}`,tone:`solid`}],locked:!r,lockText:`Need ${Tp[t]} stars`,selected:this.selectedLevel===i.id,onSelect:()=>{if(!r)this.toast(`Earn ${Tp[t]} stars to unlock ${n.name}`,`warn`);else if(this.selectedLevel===i.id&&o.classList.contains(`is-selected`))this._startLevel(i);else{this.click(),this.selectedLevel=i.id,this._showLevelDetail(i);for(let e of this.layer.querySelectorAll(`.level-card`))e.classList.remove(`is-selected`);o.classList.add(`is-selected`)}}});return o.dataset.level=i.id,o});return Q(`section`,{className:`campaign-row`},[Q(`div`,{className:`campaign-row__head`},[Q(`div`,{},[Q(`div`,{className:`card__title`,text:n.name}),Q(`div`,{className:`t-label-xs t-secondary`,text:`${n.venue} · ${jm(n.difficulty)}`})]),r?Ff({label:`★ ${Ip(e,t)} / 9`,tone:e.cups[t]?`good`:`neutral`}):If({text:`Locked · ${Tp[t]} ★`}),e.cups[t]?Ff({label:`Cup won`,tone:`good`}):null]),Q(`div`,{className:`campaign-row__levels`},i)])});this.detail=Nf({raised:!0,className:`level-detail`}),this._screen(`screen--campaign`,[this._header(`Campaign`,`Step 2 of 2`,Ff({label:`★ ${t} / ${Mp.length*3}`,tone:`solid`})),Q(`div`,{className:`campaign`},[Q(`div`,{className:`campaign__rows`},n),this.detail]),this._footer([$({label:`Back`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>this.back()}),$({label:`Garage`,variant:`ghost`,size:`md`,onClick:()=>this._go(`garage`,{returnTo:`select`})})])]);let r=this.selectedLevel?Pp(this.selectedLevel):null;r&&Rp(e,r)||(r=Mp.find(t=>Rp(e,t)&&(e.stars[t.id]||0)<3)||Mp[0]),this.selectedLevel=r.id;let i=this.layer.querySelector(`[data-level="${r.id}"]`);i&&(i.classList.add(`is-selected`),i.dataset.autofocus=``),this._showLevelDetail(r)}_showLevelDetail(e){let t=this.game.save.data,n=nd[e.circuitId],r=Np(e),i=t.stars[e.id]||0,a=[];r.type===`position`?a.push([`3 ★`,`Win`],[`2 ★`,`2nd place`],[`1 ★`,`3rd place`]):r.type===`lap`?a.push([`3 ★`,`Lap ≤ ${cf(r.gold)}`],[`2 ★`,`Lap ≤ ${cf(r.silver)}`],[`1 ★`,`Lap ≤ ${cf(r.bronze)}`],[`Limit`,`${cf(r.timeLimit,{decimals:1})} total`]):a.push([`3 ★`,`${r.gold} pts`],[`2 ★`,`${r.silver} pts`],[`1 ★`,`${r.bronze} pts`]);let o=`${e.circuitId}:${e.mode}`,s=e.mode===`drift`?t.bestDrift[o]:t.bestLaps[o],c=$({label:`Start`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>this._startLevel(e)});this.primary=c,kf(this.detail),this.detail.append(Q(`div`,{className:`t-label-sm t-secondary`,text:`Level ${e.index+1} · ${n.venue}`}),Q(`h2`,{className:`t-display-3`,text:`${n.name}`}),Q(`div`,{className:`t-label t-info`,text:wp[e.variant]}),bp(e.circuitId,300,180),Q(`div`,{className:`level-detail__row`},[mp({value:i,size:`lg`})]),Q(`table`,{className:`kv`},a.map(([e,t])=>Q(`tr`,{},[Q(`th`,{text:e}),Q(`td`,{text:t})]))),Q(`div`,{className:`level-detail__row`},[Pf({label:`Laps`,value:e.laps,size:`sm`}),Pf({label:`Cars`,value:(e.opponents||0)+1,size:`sm`}),Pf({label:e.mode===`drift`?`Best score`:`Best lap`,value:s?e.mode===`drift`?s:cf(s):`—`,size:`sm`})]),Q(`div`,{className:`level-detail__row`},[Ff({label:`Car: ${ef(t.carId).name}`,tone:`info`})]),c)}_startLevel(e){this.click();let t=this.game.save.data;this.game.startRace(Vp(e,t))}_setup(e){let t=e.mode,n=this.setup.circuitId,r=nd[n],i=this.game.save.data,a=this.setup;t===`grandprix`&&(a.laps=a.laps||3),this.back=()=>{this.click(),this.game.store.set({screen:`track`}),this.render(this.game.store.state)};let o=[];t===`grandprix`?(o.push(this._segmented(`Difficulty`,[`easy`,`medium`,`hard`],a.difficulty,e=>a.difficulty=e,e=>Am(e))),o.push(this._segmented(`Laps`,[1,2,3,4,5],a.laps,e=>a.laps=e)),o.push(this._segmented(`Opponents`,[3,4,5,6,7],a.opponents,e=>a.opponents=e))):t===`timetrial`?(a.ttLaps=a.ttLaps||3,o.push(this._segmented(`Laps`,[1,2,3,4,5],a.ttLaps,e=>a.ttLaps=e))):t===`drift`?(a.driftLaps=a.driftLaps||2,o.push(this._segmented(`Laps`,[1,2,3],a.driftLaps,e=>a.driftLaps=e))):o.push(Q(`p`,{className:`t-body`,text:`Unlimited laps. Lap times and sector splits are recorded. Pause and choose End session to see your summary.`})),o.push(this._segmented(`Obstacles`,[`on`,`off`],a.obstacles===!1?`off`:`on`,e=>a.obstacles=e===`on`,e=>Am(e)));let s=ef(i.carId),c=$({label:`Start`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>this._startSetup(t)});c.dataset.autofocus=``,this.primary=c;let l=`${n}:${t}`,u=t===`drift`?i.bestDrift[l]:i.bestLaps[l];this._screen(`screen--setup`,[this._header(r.name,`${Uf(t)} · Step 3 of 3`),Q(`div`,{className:`setup`},[Nf({label:`Race setup`,raised:!0,className:`setup__panel`,children:o}),Nf({label:`Circuit`,className:`setup__panel`,children:[bp(n,360,220),Q(`div`,{className:`level-detail__row`},[Pf({label:`Length`,value:Math.round(Mm(n)),unit:`m`,size:`sm`}),Pf({label:t===`drift`?`Best score`:`Best lap`,value:u?t===`drift`?u:cf(u):`—`,size:`sm`})]),Q(`div`,{className:`level-detail__row`},[Ff({label:s.name,tone:`info`}),$({label:`Change car`,variant:`ghost`,size:`sm`,onClick:()=>this._go(`garage`,{returnTo:`select`})})])]})]),this._footer([$({label:`Back`,variant:`secondary`,size:`md`,hotkey:`Esc`,onClick:()=>this.back()}),c])])}_startSetup(e){this.click();let t=this.setup,n={circuitId:t.circuitId,mode:e,obstacles:t.obstacles!==!1,moving:t.obstacles!==!1};if(e===`grandprix`)Object.assign(n,{laps:t.laps,opponents:t.opponents,difficulty:t.difficulty});else if(e===`timetrial`)Object.assign(n,{laps:t.ttLaps,opponents:0});else if(e===`drift`){let e=Pp(`${t.circuitId}-drift`);Object.assign(n,{laps:t.driftLaps,opponents:0,target:Np(e)})}else Object.assign(n,{laps:0,opponents:0});this.game.startRace(n)}_segmented(e,t,n,r,i=e=>String(e)){let a=Q(`div`,{className:`segmented`,attrs:{role:`radiogroup`,"aria-label":e}}),o=t.map(e=>{let t=Q(`button`,{className:`segmented__opt`,text:i(e),attrs:{type:`button`,role:`radio`,"aria-checked":e===n?`true`:`false`}});return t.addEventListener(`click`,()=>{this.click();for(let e of o)e.setAttribute(`aria-checked`,`false`);t.setAttribute(`aria-checked`,`true`),r(e)}),t});return a.append(...o),Q(`div`,{className:`field`},[Q(`span`,{className:`field__label`,text:e}),a])}_range(e,t,n){let r=Q(`span`,{className:`range-row__value`,text:String(Math.round(t*100))}),i=Q(`input`,{className:`range`,attrs:{type:`range`,min:0,max:100,step:5,value:Math.round(t*100),"aria-label":e}});return i.addEventListener(`input`,()=>{let e=Number(i.value)/100;Af(r,Math.round(e*100)),n(e)}),Q(`div`,{className:`field`},[Q(`span`,{className:`field__label`,text:e}),Q(`div`,{className:`range-row`},[i,r])])}_garage(e){let t=this.game.save.data,n=Qd.findIndex(e=>e.id===t.carId);this.garageIndex=n<0?0:n,this.back=()=>this._leaveGarage(e);let r=Q(`h1`,{className:`t-display-2`,text:``}),i=Q(`div`,{className:`t-label-sm t-secondary`,text:``}),a=$d.map(([,e])=>up({label:e,value:1})),o=Q(`div`,{className:`livery-row`,attrs:{role:`radiogroup`,"aria-label":`Livery`}}),s=Q(`div`,{className:`garage__lock`}),c=$({label:`Select car`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>this._selectCar(e)});c.dataset.autofocus=``,this.primary=c;let l=Q(`div`,{className:`car-strip`}),u=$({label:`◀ Prev`,variant:`secondary`,size:`sm`,onClick:()=>this._cycleCar(-1)}),d=$({label:`Next ▶`,variant:`secondary`,size:`sm`,onClick:()=>this._cycleCar(1)}),f=Nf({raised:!0,className:`garage__panel`,children:[Q(`div`,{className:`garage__nav`},[u,Q(`span`,{className:`t-label-xs t-secondary garage__count`}),d]),i,r,s,Q(`div`,{className:`garage__stats`},a),Q(`div`,{className:`t-label-xs t-secondary`,text:`Livery`}),o,Q(`div`,{className:`garage__actions`},[c,$({label:`Back`,variant:`secondary`,size:`lg`,hotkey:`Esc`,onClick:()=>this.back()})]),Q(`div`,{className:`garage__hint`},[Lf({keys:[`←`,`→`],label:`Car`}),Lf({keys:[`Drag`],label:`Rotate`})])]});this.garageEls={nameEl:r,tagEl:i,bars:a,liveryRow:o,lockEl:s,select:c,strip:l,count:f.querySelector(`.garage__count`)},this._screen(`screen--garage`,[this._header(`Garage`,e.returnTo===`select`?`Choose your car`:`Cars & liveries`),f,l]),this._refreshGarage()}_cycleCar(e){this.click(),this.garageIndex=(this.garageIndex+e+Qd.length)%Qd.length,this.garageLivery=null,this._refreshGarage()}_refreshGarage(){let e=this.garageEls;if(!e)return;let t=this.game.save.data,n=Qd[this.garageIndex],r=ef(t.carId),i=!zp(t,n),a=this.garageLivery||t.livery[n.id]||n.defaultLivery;this.garageLivery=a,Af(e.nameEl,n.name),Af(e.tagEl,n.tagline),Af(e.count,`${this.garageIndex+1} / ${Qd.length}`),$d.forEach(([t],i)=>e.bars[i].set(n.stats[t],n.id===r.id?void 0:r.stats[t])),kf(e.lockEl),i?e.lockEl.append(If({text:`Unlock with ${n.unlock.stars} stars`})):n.id===r.id&&e.lockEl.append(Ff({label:`Equipped`,tone:`good`})),e.select.disabled=i,e.select.setAttribute(`aria-disabled`,i?`true`:`false`),kf(e.liveryRow);for(let r of eu){let o=Bp(t,r.id,n),s=Q(`button`,{className:`livery${r.id===a?` is-selected`:``}${o?``:` is-locked`}`,attrs:{type:`button`,role:`radio`,"aria-checked":r.id===a?`true`:`false`,"aria-label":`${r.name}${o?``:` (locked)`}`,title:o?r.name:`${r.name} · ${Ep[r.id]??0} stars`}},[Q(`span`,{className:`livery__a`,style:{background:Ql(r.primary)}}),Q(`span`,{className:`livery__b`,style:{background:Ql(r.secondary)}}),Q(`span`,{className:`livery__c`,style:{background:Ql(r.accent)}})]);s.addEventListener(`click`,()=>{o?(this.click(),this.garageLivery=r.id,i||this.game.save.update(e=>e.livery[n.id]=r.id),this._refreshGarage()):this.toast(`${r.name} unlocks at ${Ep[r.id]??0} stars`,`warn`)}),e.liveryRow.appendChild(s)}kf(e.strip),Qd.forEach((n,r)=>{let i=!zp(t,n),a=gp({name:n.name,tagline:n.tagline,swatches:[Ql(eu.find(e=>e.id===(t.livery[n.id]||n.defaultLivery)).primary),Ql(eu.find(e=>e.id===(t.livery[n.id]||n.defaultLivery)).secondary)],locked:i,lockText:i?`${n.unlock.stars} ★`:``,selected:r===this.garageIndex,onSelect:()=>{r===this.garageIndex&&!i?this._selectCar(this.game.store.state):r===this.garageIndex?this.toast(`${n.name} unlocks at ${n.unlock.stars} stars`,`warn`):(this.click(),this.garageIndex=r,this.garageLivery=null,this._refreshGarage())}});e.strip.appendChild(a)}),this.game.garageScene&&this.game.garageScene.setCar(n.id,a,i)}_selectCar(e){let t=this.game.save.data,n=Qd[this.garageIndex];zp(t,n)&&(this.click(),this.game.save.update(e=>{e.carId=n.id,this.garageLivery&&(e.livery[n.id]=this.garageLivery)}),this.toast(`${n.name} selected`,`good`),this._leaveGarage(e))}_leaveGarage(e){this.click(),e.returnTo===`select`?this.game.store.go(`select`,{screen:e.returnScreen||(e.mode===`campaign`?`track`:`setup`),returnScreen:null}):this.game.store.go(`menu`,{screen:`main`})}_loading(e){let t=e.raceConfig,n=nd[t.circuitId],r=Q(`div`,{className:`loading__fill`}),i=Q(`div`,{className:`t-label-xs t-secondary loading__label`,text:`Preparing`}),a=Q(`span`,{className:`t-display-3`,text:`0%`});this.tipIndex=(this.tipIndex+1)%Dm.length,this.loadingEls={fill:r,label:i,pct:a},this._screen(`screen--loading`,[Nf({raised:!0,className:`loading`,children:[Q(`div`,{className:`t-label-sm t-secondary`,text:`${Uf(t.mode)} · ${n.venue}`}),Q(`h1`,{className:`t-display-1`,text:n.name}),Q(`div`,{className:`loading__row`},[Q(`div`,{className:`loading__bar`},[r]),a]),i,Q(`p`,{className:`t-body loading__tip`,text:Dm[this.tipIndex]})]})])}setLoading(e,t){let n=this.loadingEls;n&&(n.fill.style.transform=`scaleX(${Math.max(0,Math.min(1,e)).toFixed(3)})`,Af(n.label,t),Af(n.pct,`${Math.round(e*100)}%`))}_pause(){let e=this.game.race,t=e?e.config.mode:`practice`,n=$({label:`Resume`,variant:`primary`,size:`lg`,hotkey:`Enter`,onClick:()=>this._resume()});n.dataset.autofocus=``,this.primary=n,this.back=()=>this._resume();let r=!!(e&&e.online),i=!r&&(t===`practice`||t===`timetrial`)&&e&&e.humans.length===1;this._screen(`screen--pause`,[Nf({raised:!0,className:`pause`,children:[Q(`div`,{className:`t-label-sm t-secondary`,text:`${Uf(t)} · ${e?e.def.name:``}`}),Q(`h1`,{className:`t-display-1`,text:r?`Menu`:`Paused`}),r?Q(`p`,{className:`t-body`,text:`Online races keep running for everyone else — your car coasts while this menu is open.`}):null,If({}),Q(`div`,{className:`pause__actions`},[n,r?null:$({label:`Restart`,variant:`secondary`,size:`md`,hotkey:`R`,onClick:()=>this._restart()}),i?$({label:`End session`,variant:`secondary`,size:`md`,onClick:()=>this._endSession()}):null,$({label:`Settings`,variant:`ghost`,size:`md`,onClick:()=>this.openSettings()}),$({label:`Controls`,variant:`ghost`,size:`md`,onClick:()=>this.openControls()}),$({label:r?`Leave race`:`Quit to menu`,variant:`ghost`,size:`md`,onClick:()=>this._confirmQuit()})])]})])}_resume(){this.click(),this.game.resume()}_restart(){this.click(),this.game.restartRace()}_endSession(){this.click(),this.game.endSession()}_confirmQuit(){this.openOverlay(_p({title:`Quit race?`,message:`Progress in this race will be lost.`,confirmLabel:`Quit`,onConfirm:()=>{this.closeOverlay(),this.click(),this.game.quitToMenu()},onCancel:()=>this.closeOverlay()}))}_results(e){Up(this,e)}openOverlay(e){this.closeOverlay(!1);let t=Q(`div`,{className:`overlay`,attrs:{role:`dialog`,"aria-modal":`true`}},[e]);this.root.appendChild(t),this.overlay=t;let n=t.querySelector(`[data-autofocus]`)||t.querySelector(Om);n&&n.focus({preventScroll:!0})}closeOverlay(e=!0){if(this.overlay&&(this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.overlay=null,this.capturing&&=(this.game.input.captureNext=null,!1),e)){let e=this.layer.querySelector(`[data-autofocus]`)||this.primary;e&&e.focus({preventScroll:!0})}}openSettings(){this.click();let e=this.game,t=e.save,n=t.data.settings,r=e=>t.update(t=>e(t.settings)),i=Q(`div`,{className:`settings`}),a=[[`Graphics`,[this._segmented(`Quality`,[`low`,`medium`,`high`],n.quality,t=>{r(e=>e.quality=t),e.applyQuality(t,n.adaptiveQuality)},Am),this._segmented(`Adaptive`,[`on`,`off`],n.adaptiveQuality?`on`:`off`,n=>{r(e=>e.adaptiveQuality=n===`on`),e.applyQuality(t.data.settings.quality,n===`on`)},Am)]],[`Audio`,[this._range(`Master`,n.master,t=>{r(e=>e.master=t),e.audio.setVolumes({master:t})}),this._range(`Effects`,n.sfx,t=>{r(e=>e.sfx=t),e.audio.setVolumes({sfx:t})}),this._range(`Music`,n.music,t=>{r(e=>e.music=t),e.audio.setVolumes({music:t})}),this._segmented(`Sound`,[`on`,`off`],n.muted?`off`:`on`,t=>{r(e=>e.muted=t===`off`),e.audio.setVolumes({muted:t===`off`})},Am)]],[`Gameplay`,[this._segmented(`Camera`,[`chase`,`close`,`cockpit`,`tv`],n.camera,e=>r(t=>t.camera=e),e=>bf[e]),this._segmented(`Handling`,[`arcade`,`sim`],n.handling,e=>r(t=>t.handling=e),e=>e===`arcade`?`Arcade (NFS)`:`Sim`),this._segmented(`Drift assist`,[`easy`,`medium`,`hard`],n.assists,e=>r(t=>t.assists=e),e=>({easy:`Strong`,medium:`Normal`,hard:`Light`})[e]),this._segmented(`Units`,[`kmh`,`mph`],n.units,e=>r(t=>t.units=e),e=>e===`kmh`?`km/h`:`mph`),this._segmented(`Mini-map`,[`on`,`off`],n.showMinimap?`on`:`off`,e=>r(t=>t.showMinimap=e===`on`),Am),this._segmented(`Free play`,[`off`,`on`],n.freePlay?`on`:`off`,e=>r(t=>t.freePlay=e===`on`),e=>e===`on`?`All unlocked`:`Off`)]]];for(let[e,t]of a)i.appendChild(Q(`section`,{className:`settings__section`},[Q(`h2`,{className:`t-label-sm t-secondary`,text:e}),...t]));let o=Q(`div`,{className:`bindings`}),s=()=>{kf(o);for(let n of Nl.rebindable){let i=e.input.bindings[n],a=Q(`button`,{className:`bind-btn`,attrs:{type:`button`,"aria-label":`Rebind ${wl[n]}`}},i.map(e=>Rf(jl(e))));a.addEventListener(`click`,()=>{this.click(),kf(a),a.appendChild(Q(`span`,{className:`t-label-xs t-warn`,text:`Press a key… (Esc cancels)`})),this.capturing=!0,e.input.captureKey(i=>{if(this.capturing=!1,i){let a={...t.data.settings.bindings};for(let t of Nl.rebindable)a[t]=(a[t]||e.input.bindings[t]).filter(e=>e!==i);a[n]=[i,...(e.input.bindings[n]||[]).filter(e=>e!==i)].slice(0,2),r(e=>e.bindings=a),e.input.setBindings(a)}s(),a.focus()})}),o.appendChild(Q(`div`,{className:`field`},[Q(`span`,{className:`field__label`,text:wl[n]}),a]))}o.appendChild(Q(`div`,{className:`settings__row`},[$({label:`Reset keys`,variant:`ghost`,size:`sm`,onClick:()=>{r(e=>e.bindings=null),e.input.setBindings(null),s()}})]))};s(),i.appendChild(Q(`section`,{className:`settings__section`},[Q(`h2`,{className:`t-label-sm t-secondary`,text:`Keyboard`}),o])),i.appendChild(Q(`section`,{className:`settings__section`},[Q(`h2`,{className:`t-label-sm t-secondary`,text:`Progress`}),Q(`p`,{className:`t-body`,text:e.save.available?`Progress is saved in this browser.`:`Browser storage is blocked: progress lasts until you close the tab.`}),$({label:`Reset progress`,variant:`secondary`,size:`sm`,onClick:()=>this._confirmReset()})]));let c=Nf({label:`Settings`,raised:!0,className:`sub-panel`,children:[i,Q(`div`,{className:`sub-panel__actions`},[$({label:`Done`,variant:`primary`,size:`md`,hotkey:`Esc`,onClick:()=>this._closeSub()})])]});this.openOverlay(c),this.overlayBack=()=>this._closeSub()}_closeSub(){this.click(),this.closeOverlay();let e=this.game.store.state;e.phase===`menu`&&e.screen!==`main`&&this.game.store.set({screen:`main`}),e.phase===`menu`&&this.render(this.game.store.state)}_confirmReset(){this.openOverlay(_p({title:`Reset progress?`,message:`All stars, best laps, records and unlocks will be erased. Settings are kept. This cannot be undone.`,confirmLabel:`Erase progress`,onConfirm:()=>{this.game.save.reset(),this.closeOverlay(),this.toast(`Progress reset`,`warn`),this.game.store.phase===`menu`&&this.render(this.game.store.state)},onCancel:()=>{this.closeOverlay(),this.openSettings()}})),this.overlayBack=()=>{this.closeOverlay(),this.openSettings()}}openControls(){this.click();let e=this.game.input.bindings,t=(e,t)=>Q(`tr`,{},[Q(`th`,{text:e}),Q(`td`,{},t.map(e=>Rf(e)))]),n=Q(`table`,{className:`kv kv--wide`},[t(`Throttle`,e.throttle.map(jl)),t(`Brake / reverse`,e.brake.map(jl)),t(`Steer`,[...e.left.map(jl),...e.right.map(jl)]),t(`Handbrake / drift`,e.handbrake.map(jl)),t(`Nitro (hold)`,e.boost.map(jl)),t(`Speedbreaker`,e.speedbreak.map(jl)),t(`Camera`,e.camera.map(jl)),t(`Reset (hold: restart)`,e.reset.map(jl)),t(`Pause`,Cl.pause.map(jl)),t(`Mute`,[`M`]),t(`Debug overlay`,[`F3`])]),r=Q(`table`,{className:`kv kv--wide`},[t(`Throttle / brake`,[`RT`,`LT`]),t(`Steer`,[`L-stick`]),t(`Drift`,[`A`]),t(`Nitro`,[`X`,`RB`]),t(`Speedbreaker`,[`LB`]),t(`Camera`,[`B`]),t(`Reset (hold: restart)`,[`Y`]),t(`Pause`,[`Start`])]),i=$({label:`Done`,variant:`primary`,size:`md`,hotkey:`Esc`,onClick:()=>this._closeSub()}),a=Nf({label:`Controls`,raised:!0,className:`sub-panel`,children:[Q(`div`,{className:`controls-guide`},[Q(`section`,{},[Q(`h2`,{className:`t-label-sm t-secondary`,text:`Keyboard`}),n]),Q(`section`,{},[Q(`h2`,{className:`t-label-sm t-secondary`,text:`Gamepad`}),r,Q(`h2`,{className:`t-label-sm t-secondary`,text:`Touch`}),Q(`p`,{className:`t-body`,text:`On touch screens, on-screen buttons appear during a race: steer on the left, gas / brake / drift / boost on the right.`})]),Q(`section`,{},[Q(`h2`,{className:`t-label-sm t-secondary`,text:`Drifting`}),Q(`p`,{className:`t-body`,text:`Arcade handling (the default) drifts like Need for Speed: turn in and tap the handbrake or the brake, keep the throttle on, and the car holds the slide at a steady angle. Steer into it to tighten the line, let go or counter-steer to straighten. Drifting fills the nitro tank. Points bank when you straighten; hitting a wall or leaving the track loses the unbanked points. Switch to Sim handling in Settings for the realistic model.`})])]),Q(`div`,{className:`sub-panel__actions`},[i])]});this.openOverlay(a),this.overlayBack=()=>this._closeSub()}_focusables(){let e=this.overlay||this.layer;return Array.from(e.querySelectorAll(Om)).filter(e=>e.offsetParent!==null)}_moveFocus(e){let t=this._focusables();if(!t.length)return;let n=t.indexOf(document.activeElement);(n<0?t[0]:t[(n+e+t.length)%t.length]).focus({preventScroll:!1}),this.game.audio.play(`hover`)}_activePhaseIsMenu(){let e=this.game.store.phase;return e===`menu`||e===`select`||e===`garage`||e===`paused`||e===`results`}_onKey(e){if(this.capturing||!this._activePhaseIsMenu()&&!this.overlay)return;let t=(document.activeElement&&document.activeElement.tagName)===`INPUT`;if(e.key===`Escape`||e.key===`p`&&this.game.store.phase===`paused`&&!this.overlay)e.preventDefault(),this.overlay?this.overlayBack?this.overlayBack():this.closeOverlay():this.back&&this.back();else if(e.key===`Enter`){let t=document.activeElement;if(t&&t.tagName===`INPUT`&&t.type===`text`||t&&(this.layer.contains(t)||this.overlay&&this.overlay.contains(t))&&(t.tagName===`BUTTON`||t.getAttribute(`role`)===`radio`))return;!this.overlay&&this.primary&&!this.primary.disabled&&(e.preventDefault(),this.primary.click())}else{if(this.game.store.phase===`garage`&&!this.overlay&&(e.key===`ArrowLeft`||e.key===`ArrowRight`)&&!t){let t=document.activeElement;if(!t||!t.closest||!t.closest(`.livery-row, .segmented`)){e.preventDefault(),this._cycleCar(e.key===`ArrowLeft`?-1:1);return}}if([`ArrowDown`,`ArrowUp`,`ArrowLeft`,`ArrowRight`].includes(e.key)&&!t){e.preventDefault();let t=document.activeElement,n=t&&t.closest&&t.closest(`.segmented, .livery-row`);if(n&&(e.key===`ArrowLeft`||e.key===`ArrowRight`)){let r=Array.from(n.querySelectorAll(`button`)),i=r[(r.indexOf(t)+(e.key===`ArrowLeft`?-1:1)+r.length)%r.length];i.focus(),i.click();return}this._moveFocus(e.key===`ArrowDown`||e.key===`ArrowRight`?1:-1)}}}frame(e){this.toasts.update(e);let t=this.game.input.consumeNav();if(t&&(this._activePhaseIsMenu()||this.overlay)){if(t===`confirm`){let e=document.activeElement;e&&e.tagName===`BUTTON`&&(this.layer.contains(e)||this.overlay&&this.overlay.contains(e))?e.click():this.primary&&this.primary.click()}else t===`back`?this.overlay?this.overlayBack?this.overlayBack():this.closeOverlay():this.back&&this.back():this.game.store.phase===`garage`&&(t===`left`||t===`right`)&&!this.overlay?this._cycleCar(t===`left`?-1:1):this._moveFocus(t===`down`||t===`right`?1:-1)}}};function Am(e){let t=String(e);return t.charAt(0).toUpperCase()+t.slice(1)}function jm(e){return[``,`Beginner`,`Intermediate`,`Advanced`,`Expert`][e]||`Intermediate`}function Mm(e){return yp(e).length}var Nm=null;function Pm(e,{title:t,message:n,detail:r,actions:i=[]}){Fm();let a=i.map(e=>$({label:e.label,variant:e.variant||`primary`,size:`md`,onClick:e.onClick})),o=Nf({label:`System`,raised:!0,className:`error-card`,children:[If({text:`Fault`}),Q(`h1`,{className:`t-display-2`,text:t}),Q(`p`,{className:`t-body`,text:n}),r?Q(`pre`,{className:`error-card__detail`,text:r}):null,a.length?Q(`div`,{className:`error-card__actions`},a):null]}),s=Q(`div`,{className:`screen-center`,attrs:{role:`alertdialog`,"aria-label":t}},[o]);return e.appendChild(s),Nm=s,a[0]&&a[0].focus(),{remove:Fm}}function Fm(){Nm&&Nm.parentNode&&Nm.parentNode.removeChild(Nm),Nm=null}function Im(e){if(e&&e.has(`nowebgl`))return!1;try{let e=document.createElement(`canvas`);return!!(e.getContext(`webgl2`)||e.getContext(`webgl`))}catch{return!1}}var Lm=class{constructor({canvas:e,uiRoot:t,params:n}){this.canvas=e,this.uiRoot=t,this.params=n,this.debugMode=n.has(`debug`),this.renderMode=n.get(`render`)||`always`,this.save=new Sl(n.has(`nostorage`)?null:void 0),this.save.load();let r=this.save.data.settings;this.store=new ol,this.quality=new ll(n.get(`quality`)||r.quality,!n.has(`quality`)&&r.adaptiveQuality),this.input=new Nl(window),this.input.setBindings(r.bindings),this.audio=new Il({master:r.master,sfx:r.sfx,music:r.music,muted:r.muted}),this.renderer=null,this.race=null,this.menuScene=null,this.garageScene=null,this.loader=null,this.loadProgress=0,this.lastResults=null,this.contextLost=!1,this.frameMs=0,this.renderRequests=0,this.debugOverlay=null,this.debugView=null,this.loop=new rl({step:e=>this.step(e),frame:(e,t,n)=>this.frame(e,t,n)}),this._bgTimer=0,document.addEventListener(`visibilitychange`,()=>this._syncBackground()),this._onResize=this._onResize.bind(this),this._onPhase=this._onPhase.bind(this)}init(){try{this.renderer=new Qc({canvas:this.canvas,antialias:this.quality.preset.antialias,powerPreference:`high-performance`,preserveDrawingBuffer:!1})}catch(e){return this.fail(`Graphics unavailable`,`APEX GP could not start WebGL on this device or browser.`,e),!1}let e=this.renderer;return e.outputColorSpace=Re,e.shadowMap.enabled=this.quality.preset.shadows,e.shadowMap.type=1,e.info.autoReset=!1,this.canvas.addEventListener(`webglcontextlost`,e=>this._contextLost(e),!1),this.canvas.addEventListener(`webglcontextrestored`,()=>this._contextRestored(),!1),Pl()&&document.body.classList.add(`has-touch`),this.ui=new km(this),this.store.subscribe(this._onPhase),window.addEventListener(`resize`,this._onResize),this.quality.onChange(()=>{let e=this.quality.preset.shadows;this.renderer.shadowMap.enabled=e,this.race&&this.race.lights&&(this.race.lights.sun.castShadow=e),this._onResize()}),this._onResize(),this.params.has(`debugview`)&&(this.debugView=new lp(this)),this.debugMode&&this._installHook(),this.store.go(`menu`),this.loop.start(),!0}_onPhase(e,t){let n=e.phase,r=t.phase;if(this.input.clearPresses(),n===`menu`&&this.net&&this.closeNet(),(n===`menu`||n===`select`)&&(this._leaveRace(),this._ensureMenuScene(),this.audio.startMusic()),n===`garage`&&(this._leaveRace(),this._ensureGarageScene(),this.audio.startMusic()),n===`loading`&&(this._leaveRace(),this.audio.stopMusic(),this.race=new ip(this,e.raceConfig),this.renderer.shadowMap.enabled=this.quality.preset.shadows&&this.race.humanDefs.length===1,this._applyAspects(),this.race.onFinished=e=>this._onRaceFinished(e),this.loader=this.race.load(),this.loadProgress=0),n===`countdown`&&(r===`loading`?(this._disposeBackdrops(),this.race.begin(),this.race.online&&this.net&&this.net.loaded()):r===`paused`&&e.resumeTo===`countdown`?(this.race.setPaused(!1),this.audio.setPaused(!1)):(this.race.setPaused(!1),this.audio.setPaused(!1),this.race.restart()),this.loop.resetClock()),n===`racing`&&r===`paused`&&(this.race.setPaused(!1),this.race.inputBlocked=!1,this.audio.setPaused(!1),this.loop.resetClock()),n===`paused`&&(this.race.online?this.race.inputBlocked=!0:(this.race.setPaused(!0),this.audio.setPaused(!0)),this.input.releaseAll()),n===`results`&&(this.audio.setPaused(!1),this.audio.stopRace()),this.race&&this.race.humans)for(let e of this.race.humans)e.hud&&e.hud.el.classList.toggle(`is-hidden`,n===`paused`||n===`results`);this.ui.render(e,t)}_ensureMenuScene(){this.menuScene||=new op(this),this.garageScene&&=(this.garageScene.dispose(),null)}_ensureGarageScene(){this.garageScene||=new cp(this),this.menuScene&&=(this.menuScene.dispose(),null)}_disposeBackdrops(){this.menuScene&&=(this.menuScene.dispose(),null),this.garageScene&&=(this.garageScene.dispose(),null)}_leaveRace(){this.race&&(this.audio.stopRace(),this.audio.setPaused(!1),this.race.dispose(),this.race=null,this.loader=null,this.input.releaseAll(),this.renderer.renderLists.dispose(),this.renderer.shadowMap.enabled=this.quality.preset.shadows)}_applyAspects(){if(!this.race)return;let e=window.innerWidth,t=Math.max(1,window.innerHeight);for(let n of this.race.humans)n.rig.setAspect(n.rect[2]*e/Math.max(1,n.rect[3]*t))}attachNet(e){this.net&&this.net!==e&&this.closeNet(),this.net=e,this._netOut=[],this._syncBackground(),e.on(`start`,e=>this._netStart(e)),e.on(`go`,()=>{this.race&&this.race.go()}),e.on(`lobby`,()=>this.ui.onLobby&&this.ui.onLobby()),e.on(`error`,t=>{this.ui.toast(t.message||String(t),`warn`),e.state===`closed`&&(this.net=null,this.store.phase!==`menu`&&this.quitToMenu())})}closeNet(){let e=this.net;this.net=null,e&&e.close(),this._syncBackground()}_netStart(e){let t=this.net;if(!t)return;let n=this.save.data.settings,r=t.me,i={circuitId:e.settings.circuitId,mode:`grandprix`,laps:e.settings.laps,opponents:0,difficulty:`medium`,carId:r.carId,liveryId:r.livery,camera:n.camera,units:n.units,assists:n.assists,handling:n.handling,minimap:n.showMinimap,target:null,obstacles:!0,moving:!0,tokens:!1,humans:[{name:r.name,carId:r.carId,liveryId:r.livery,device:`all`}],online:{players:e.players,mySlot:t.slot,isHost:t.isHost,ai:e.settings.ai||0}},a=this.store.phase;(a===`racing`||a===`countdown`||a===`paused`)&&this.store.go(`menu`,{screen:`main`}),this.store.go(`loading`,{raceConfig:i})}_syncBackground(){let e=typeof document<`u`&&document.hidden&&!!this.net;e&&!this._bgTimer?(this._bgLast=performance.now(),this._bgTimer=setInterval(()=>this._backgroundTick(),100)):!e&&this._bgTimer&&(clearInterval(this._bgTimer),this._bgTimer=0)}_backgroundTick(){if(!document.hidden||!this.net){this._syncBackground();return}let e=performance.now(),t=Math.min(2,(e-this._bgLast)/1e3);this._bgLast=e;for(let e=0;e<64&&this.loader&&this.store.phase===`loading`;e++)this.frame(0,0);let n=Math.floor(t/$c);for(let e=0;e<n;e++)this.step($c);this.frame(0,t)}startRace(e){let t=this.save.data.settings,n=ef(e.carId||this.save.data.carId),r={circuitId:e.circuitId||`beginner`,mode:e.mode||`practice`,laps:e.laps??nd[e.circuitId||`beginner`].laps.grandprix,opponents:e.opponents||0,difficulty:e.difficulty||`medium`,carId:n.id,liveryId:e.liveryId||this.save.data.livery[n.id]||n.defaultLivery,camera:t.camera,units:t.units,assists:t.assists,minimap:t.showMinimap,handling:t.handling,target:e.target||null,levelId:e.levelId||null,levelIndex:e.levelIndex||0,obstacles:e.obstacles!==!1,moving:e.moving!==!1,tokens:e.tokens!==!1,humans:e.humans||null};this.store.go(`loading`,{raceConfig:r})}requestPause(){let e=this.store.phase;(e===`racing`||e===`countdown`)&&this.store.go(`paused`,{resumeTo:e})}resume(){this.store.phase===`paused`&&this.store.go(this.store.state.resumeTo===`countdown`?`countdown`:`racing`)}restartRace(){if(this.race&&this.race.online)return;let e=this.store.phase;(e===`racing`||e===`paused`||e===`results`||e===`countdown`)&&this.store.go(`countdown`,{resumeTo:null})}quitToMenu(){this.store.go(`menu`,{screen:`main`})}endSession(){if(!this.race)return;let e=this.race.buildResults();e.ended=!0,this._onRaceFinished(e)}onRaceGo(){this.store.phase===`countdown`&&this.store.go(`racing`)}_onRaceFinished(e){this.lastResults=Hp(this.save,e,this.race?this.race.config:null),this.store.phase===`paused`&&(this.race.setPaused(!1),this.audio.setPaused(!1),this.store.go(`racing`)),this.store.phase===`racing`&&this.store.go(`results`,{results:this.lastResults})}step(e){let t=this.store.phase;this.race&&(t===`countdown`||t===`racing`||t===`paused`&&this.race.online)?this.race.step(e):this.menuScene&&(t===`menu`||t===`select`)?this.menuScene.step(e):this.garageScene&&t===`garage`&&this.garageScene.step(e)}frame(e,t){if(this.contextLost)return;let n=performance.now();this.input.poll(t),this._globalKeys(t);let r=this.store.phase;if(r===`loading`&&this.loader){let e=this.loader.next();!e.done&&e.value&&(this.loadProgress=e.value.progress,this.ui.setLoading(e.value.progress,e.value.label)),(e.done||e.value&&e.value.progress>=1)&&(this.loader=null,this.ui.setLoading(1,`Ready`),this._applyAspects(),this.store.go(`countdown`))}let i=null,a=null,o=null;this.race&&this.race.ready&&r!==`loading`?(this.net&&this.race.online&&(this.net.setOutgoing(this.race.netStates(this._netOut)),this.net.tick(t),this.race.applyNet(this.net.remote)),this.race.frame(e,t),i=this.race.scene,a=this.race.camera,this.race.humans.length>1&&(o=this.race.views)):this.garageScene&&r===`garage`?(this.garageScene.frame(e,t),i=this.garageScene.scene,a=this.garageScene.camera):this.menuScene&&(this.menuScene.frame(e,t),i=this.menuScene.scene,a=this.menuScene.camera),this.ui.frame(t),this.audio.update(),i&&a&&(this.renderMode===`always`||this.renderRequests>0)&&(this.renderer.info.reset(),o?this._renderViews(i,o):this.renderer.render(i,a),this.renderRequests>0&&this.renderRequests--),this.debugView&&this.debugView.draw(),this.frameMs=performance.now()-n,r===`racing`&&this.quality.adaptive&&this.renderMode===`always`&&this.quality.sample(t*1e3,t),this.debugOverlay&&this._updateDebugOverlay(t)}_renderViews(e,t){let n=this.renderer,r=window.innerWidth,i=window.innerHeight;n.setScissorTest(!0);for(let a=0;a<t.length;a++){let[o,s,c,l]=t[a].rect,u=Math.round(o*r),d=Math.round((o+c)*r)-u,f=Math.round(s*i),p=Math.round((s+l)*i)-f,m=i-f-p;n.setViewport(u,m,d,p),n.setScissor(u,m,d,p),this.race.prepareView(a),n.render(e,t[a].camera)}n.setScissorTest(!1),n.setViewport(0,0,r,i)}_globalKeys(){let e=this.input,t=this.store.phase;if(e.consume(`mute`)){let e=this.audio.toggleMute();this.save.update(t=>t.settings.muted=e),this.ui.toast(e?`Sound off`:`Sound on`)}if(e.consume(`debug`)&&this.toggleDebugOverlay(),t===`racing`||t===`countdown`){if(e.consume(`pause`)&&this.requestPause(),e.consume(`speedbreak`)&&t===`racing`&&this.race.toggleSpeedbreak(),this.race.humans.length>1){e.consume(`camera`),e.consume(`reset`);for(let n of this.race.humans)e.consumeDevice(n.device,`camera`)&&n.hud.toast(`Camera: ${n.rig.cycle()}`),e.consumeDevice(n.device,`reset`)&&t===`racing`&&this.race.resetPlayer(n.racer);return}if(e.consume(`camera`)){let e=this.race.rig.cycle();this.ui.toast(`Camera: ${e}`)}let n=this.race.online?0:e.heldFor(`reset`);if(this.race.resetHold=n,n>1){e.holdStart.delete(`reset`),e.down.clear(),this.restartRace();return}e.consume(`reset`)&&(this._resetTapPending=!0),this._resetTapPending&&!e.isHeld(`reset`)&&(this._resetTapPending=!1,t===`racing`&&this.race.resetPlayer())}else e.consume(`camera`),e.consume(`reset`),e.consume(`speedbreak`),e.consume(`pause`)&&t===`paused`&&e.lastDevice===`gamepad`&&!this.ui.overlayOpen()&&this.resume()}toggleDebugOverlay(){this.debugOverlay?(this.debugOverlay.remove(),this.debugOverlay=null):(this.debugOverlay=Q(`div`,{className:`debug-overlay`}),this.uiRoot.appendChild(this.debugOverlay),this._dbgAcc=0,this._dbgFrames=0)}_updateDebugOverlay(e){if(this._dbgAcc+=e,this._dbgFrames++,this._dbgAcc<.25)return;let t=this._dbgFrames/this._dbgAcc;this._dbgAcc=0,this._dbgFrames=0;let n=this.renderer.info,r=[`FPS ${t.toFixed(0)}  frame ${this.frameMs.toFixed(2)} ms`,`draw calls ${n.render.calls}  triangles ${n.render.triangles}`,`geometries ${n.memory.geometries}  textures ${n.memory.textures}`,`quality ${this.quality.id}  pixel ratio ${this.quality.pixelRatio.toFixed(2)}`];if(this.race&&this.race.ready){let e=this.race.snapshot();r.push(`speed ${(e.speed*3.6).toFixed(0)} km/h  slip ${(e.slip*180/Math.PI).toFixed(1)}°  ${e.surface}`),r.push(`s ${e.s.toFixed(1)} / ${e.length.toFixed(0)}  t ${e.t.toFixed(2)}  cam ${e.camera.mode}`)}this.debugOverlay.textContent=r.join(`
`)}_onResize(){let e=window.innerWidth,t=window.innerHeight;this.renderer.setPixelRatio(this.quality.computePixelRatio()),this.renderer.setSize(e,t,!1);let n=e/Math.max(1,t);this.race&&this.race.humans.length&&this._applyAspects(),this.menuScene&&this.menuScene.setAspect(n),this.garageScene&&this.garageScene.setAspect(n),this.aspect=n}applyQuality(e,t){this.quality.setPreset(e),this.quality.adaptive=t,this.renderer.shadowMap.enabled=this.quality.preset.shadows,this._onResize()}_contextLost(e){e.preventDefault(),this.contextLost=!0,this.loop.stop(),Pm(this.uiRoot,{title:`Graphics reset`,message:`The graphics context was lost (driver reset or too many tabs). Trying to restore it…`,actions:[{label:`Reload`,onClick:()=>window.location.reload()}]})}_contextRestored(){this.contextLost=!1,Fm(),this._onResize(),this.loop.resetClock(),this.loop.start()}fail(e,t,n){this.loop.stop(),n&&console.error(n),Pm(this.uiRoot,{title:e,message:t,detail:n?String(n&&n.message?n.message:n):void 0,actions:[{label:`Reload`,onClick:()=>window.location.reload()}]})}_installHook(){let e=this;window.__apex={game:e,ready:()=>e.store.phase,getState:()=>({...e.store.state,results:void 0,raceConfig:e.store.state.raceConfig}),getCar:()=>e.race&&e.race.ready?e.race.snapshot():null,getRace:()=>{let t=e.race;return!t||!t.ready?null:{state:t.manager.state,time:t.manager.time,laps:t.player.cp.laps,totalLaps:t.config.laps,racers:t.racers.map(e=>({name:e.name,player:e.isPlayer,laps:e.cp.laps,s:e.proj.s,t:e.proj.t,speed:e.vehicle.speed,position:e.position,finished:e.finished,finishTime:e.finishTime,stuck:e.stuckTime,recoveries:e.recoveries,progress:e.progress})),results:e.lastResults}},getTrack:()=>{let t=e.race;if(!t||!t.ready)return null;let n=t.model,r={length:n.length,ds:n.ds*2,n:Math.floor(n.n/2),px:[],pz:[],tx:[],tz:[],w:[],line:[],speed:[],kappa:[]};for(let e=0;e<n.n;e+=2)r.px.push(n.px[e]),r.pz.push(n.pz[e]),r.tx.push(n.tx[e]),r.tz.push(n.tz[e]),r.w.push(n.width[e]),r.line.push(t.line.offset[e]),r.speed.push(t.line.speed[e]),r.kappa.push(n.kappa[e]);return r.n=r.px.length,r},setInput:t=>{e.race&&(e.race.inputOverride=t?{throttle:0,brake:0,steer:0,handbrake:!1,boost:!1,...t}:null)},step:(t=1)=>{if(!e.race)return null;for(let n=0;n<t;n++)e.race.step(1/120);return e.race.snapshot()},teleport:(t,n=0)=>{let r=e.race;return r?(r._spawn(r.player,r.model.wrapS(t),n),r.player.cp.lastS=r.player.proj.s,r.rig.snap(),r.snapshot()):null},startRace:t=>e.startRace(t),go:(t,n)=>e.store.go(t,n),render:()=>{e.renderRequests++},info:()=>({calls:e.renderer.info.render.calls,triangles:e.renderer.info.render.triangles,geometries:e.renderer.info.memory.geometries,textures:e.renderer.info.memory.textures,programs:e.renderer.info.programs?e.renderer.info.programs.length:0,loops:rl.activeLoops,frameMs:e.frameMs,quality:e.quality.id,pixelRatio:e.renderer.getPixelRatio(),shadows:e.renderer.shadowMap.enabled}),slowFrames:(t,n)=>{for(let r=0;r<t;r++)e.quality.sample(n,n/1e3);return window.__apex.info()},save:()=>e.save.data,netCreate:async(t=`local`,n=`Host`,r)=>{let i=new mm({kind:t,name:n,carId:e.save.data.carId});return await i.create(r),e.attachNet(i),e.store.go(`select`,{screen:`lobby`}),i.code},netJoin:async(t,n,r=`Guest`)=>{let i=new mm({kind:t,name:r,carId:e.save.data.carId});return await i.join(n),e.attachNet(i),e.store.go(`select`,{screen:`lobby`}),i.slot},netSettings:t=>e.net&&e.net.setSettings(t),netStart:()=>e.net&&e.net.start(),netInfo:()=>e.net?{code:e.net.code,slot:e.net.slot,host:e.net.isHost,players:e.net.players.map(e=>e.name),remote:[...e.net.remote.keys()],state:e.net.state}:null,levels:()=>Mp.map(e=>({id:e.id,index:e.index,mode:e.mode})),startLevel:t=>e.startRace(Vp(Pp(t),e.save.data)),campaignSelfTest:()=>{let e=[{},{},{},{},{},{}],t=Pp(`beginner-grandprix`),n=[1,2,3,4].map(n=>xp(t,Np(t),{position:n,rows:e})),r=Pp(`beginner-timeattack`),i=Np(r),a=(e,t={})=>xp(r,i,{bestLap:e,lapTimes:[e,e,e],penalty:0,...t}),o=[a(i.gold-.1),a(i.silver-.1),a(i.bronze-.1),a(i.bronze+1),a(i.gold-1,{timedOut:!0})],s=Pp(`beginner-drift`),c=Np(s),l=[c.gold,c.silver,c.bronze,c.bronze-1].map(e=>xp(s,c,{driftScore:e})),u=new Sl(null);u.load();let d=e=>Vp(Pp(e),u.data),f=()=>Object.values(u.data.stars).reduce((e,t)=>e+t,0),p={mode:`grandprix`,position:1,rows:e,bestLap:50,lapTimes:[50],driftScore:0,longestDrift:0};Hp(u,p,d(`beginner-grandprix`));let m=Hp(u,{mode:`timeattack`,bestLap:i.gold-.5,lapTimes:[i.gold-.5],penalty:0,driftScore:0,longestDrift:0},d(`beginner-timeattack`)),h=Hp(u,{mode:`drift`,bestLap:60,lapTimes:[60],driftScore:c.silver+1,longestDrift:3},d(`beginner-drift`)),g=f()>=5,_=Hp(u,{mode:`grandprix`,position:4,rows:e,bestLap:60,lapTimes:[60],driftScore:0,longestDrift:0},d(`beginner-grandprix`)),v=Hp(u,{...p},d(`street-grandprix`));return{gp:n,ta:o,drift:l,unlocks:{street:g,titan:u.data.unlockedCars.includes(`titan`),newUnlocks:m.newUnlocks.length+h.newUnlocks.length+v.newUnlocks.length,keepsBest:_.stars===0&&u.data.stars[`beginner-grandprix`]===3,total:f()}}}}}},Rm=[`void`,`slate`,`asphalt`,`edge`,`chalk`,`ash`,`red`,`info-blue`,`good-green`,`warn-amber`],zm=[[`t-hero`,`Hero 112`],[`t-display-1`,`Display-1 72`],[`t-display-2`,`Display-2 48`],[`t-display-3`,`Display-3 32`],[`t-display-4`,`Display-4 24`]],Bm=[[`t-label`,`Label 14`],[`t-label-md`,`Label 12`],[`t-label-sm`,`Label 11`],[`t-label-xs`,`Label 10`]];function Vm(e,t){return Q(`section`,{className:`sg-section`},[Q(`h2`,{className:`t-label-sm t-secondary sg-section__title`,text:e}),Q(`div`,{className:`sg-section__body`},t)])}function Hm(){let e=document.createElement(`canvas`);e.width=320,e.height=200;let t=e.getContext(`2d`),n=getComputedStyle(document.documentElement);return t.fillStyle=n.getPropertyValue(`--void`).trim(),t.fillRect(0,0,320,200),t.strokeStyle=n.getPropertyValue(`--chalk`).trim(),t.lineWidth=6,t.beginPath(),t.ellipse(160,100,120,60,0,0,Math.PI*2),t.stroke(),e}function Um(e){document.documentElement.classList.add(`is-scrollable`),document.title=`APEX GP — Styleguide`;let t=Pf({label:`Speed`,value:`287`,unit:`km/h`,size:`lg`}),n=Q(`main`,{className:`styleguide`},[Q(`header`,{className:`sg-header`},[Q(`div`,{className:`t-label-sm t-secondary`,text:`APEX GP / Design system`}),Q(`h1`,{className:`t-display-1`,text:`Styleguide`}),If({})]),Vm(`Colour tokens`,[Q(`div`,{className:`sg-swatches`},Rm.map(e=>Q(`div`,{className:`sg-swatch`},[Q(`span`,{className:`sg-swatch__chip`,style:{background:`var(--${e})`}}),Q(`span`,{className:`t-label-xs`,text:`--${e}`})])))]),Vm(`Type scale`,[...zm.map(([e,t])=>Q(`div`,{className:e,text:t})),...Bm.map(([e,t])=>Q(`div`,{className:e,text:t})),Q(`p`,{className:`t-body`,text:`Body copy in JetBrains Mono. Labels are uppercase with 0.18em tracking.`})]),Vm(`Buttons`,[Q(`div`,{className:`sg-row`},[$({label:`Drive`,variant:`primary`,size:`lg`,hotkey:`Enter`}),$({label:`Primary`,variant:`primary`,size:`md`}),$({label:`Hover`,variant:`primary`,size:`md`,className:`is-hover`}),$({label:`Press`,variant:`primary`,size:`md`,className:`is-active`}),$({label:`Small`,variant:`primary`,size:`sm`}),$({label:`Disabled`,variant:`primary`,size:`md`,disabled:!0})]),Q(`div`,{className:`sg-row`},[$({label:`Secondary`,variant:`secondary`,size:`md`}),$({label:`Hover`,variant:`secondary`,size:`md`,className:`is-hover`}),$({label:`Press`,variant:`secondary`,size:`md`,className:`is-active`}),$({label:`Ghost`,variant:`ghost`,size:`md`}),$({label:`Ghost hover`,variant:`ghost`,size:`md`,className:`is-hover`})])]),Vm(`Badges`,[Q(`div`,{className:`sg-row`},[Ff({label:`Neutral`}),Ff({label:`Solid`,tone:`solid`}),Ff({label:`Hazard`,tone:`hazard`}),Ff({label:`Outline hazard`,tone:`outlineHazard`}),Ff({label:`Info`,tone:`info`}),Ff({label:`Best`,tone:`good`}),Ff({label:`Penalty`,tone:`warn`})])]),Vm(`Panels & stats`,[Q(`div`,{className:`sg-grid`},[Nf({label:`Panel`,children:[Pf({label:`Position`,value:`3`,unit:`/ 8`,size:`md`})]}),Nf({label:`Raised`,raised:!0,children:[Pf({label:`Lap`,value:`2`,unit:`/ 3`,size:`md`})]}),Nf({label:`Translucent`,translucent:!0,children:[Pf({label:`Delta`,value:`-0.412`,size:`md`,className:`stat--good`})]}),Nf({label:`Hazard stat`,children:[Pf({label:`Time left`,value:`0:08.2`,size:`md`,hazard:!0})]}),Nf({label:`Large`,children:[t]}),Nf({label:`Flush`,flush:!0,children:[Q(`div`,{className:`sg-flush-demo t-label-xs t-secondary`,text:`Flush body`})]})])]),Vm(`Racing components`,[Q(`div`,{className:`sg-grid`},[Nf({label:`Stat bars`,children:[up({label:`Acceleration`,value:8}),up({label:`Top speed`,value:6,compare:8}),up({label:`Drift`,value:9,compare:5})]}),Nf({label:`Stars & keys`,children:[Q(`div`,{className:`sg-row`},[mp({value:0}),mp({value:2}),mp({value:3,size:`lg`})]),Q(`div`,{className:`sg-row`},[Lf({keys:[`W`,`↑`],label:`Throttle`}),Lf({keys:[`Space`],label:`Drift`})])]}),Nf({label:`Hazard bands`,children:[If({text:`Locked`}),If({text:`Wrong way`,tone:`amber`,size:`lg`})]}),Nf({label:`Toasts`,children:[Bf({text:`Best lap`,tone:`good`}),Bf({text:`Boost`,tone:`info`}),Bf({text:`+2s penalty`,tone:`warn`})]})]),Q(`div`,{className:`sg-cards`},[hp({title:`Level card`,subtitle:`Grand Prix · 3 laps`,media:Hm(),stars:2,badges:[{label:`Easy`,tone:`good`}],selected:!0}),hp({title:`Locked level`,subtitle:`Drift challenge`,media:Hm(),stars:0,locked:!0,lockText:`Need 6 stars`}),gp({name:`Car card`,tagline:`Long nose · balanced`,swatches:[`var(--red)`,`var(--void)`,`var(--chalk)`]}),gp({name:`Locked car`,tagline:`Wide body`,locked:!0,lockText:`Win Street Cup`})])]),Vm(`Motion`,[Q(`div`,{className:`sg-row`},[Q(`span`,{className:`badge badge--hazard sg-blink`,text:`Blink hazard`}),Q(`span`,{className:`t-label-xs t-secondary`,text:`60 / 120 / 200 / 400 ms · linear or hard-step only`})])])]);e.appendChild(n)}var Wm=new URLSearchParams(window.location.search),Gm=document.getElementById(`ui-root`),Km=document.getElementById(`game-canvas`);function qm(){if(Wm.has(`styleguide`)){Km.style.display=`none`,Um(Gm);return}if(!Im(Wm)){Pm(Gm,{title:`WebGL not available`,message:`APEX GP needs WebGL to draw the 3D track. Enable hardware acceleration in your browser settings, update your graphics drivers, or try a recent Chrome, Edge or Firefox.`,actions:[{label:`Try again`,onClick:()=>window.location.reload()}]});return}let e=new Lm({canvas:Km,uiRoot:Gm,params:Wm});window.__game=Wm.has(`debug`)?e:void 0;try{e.init()}catch(t){e.fail(`Something went wrong`,`APEX GP failed to start. Reloading usually fixes it.`,t)}}qm();