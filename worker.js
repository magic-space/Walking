!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.maximumGrass=t.maximumTrees=t.noiseSeed=t.chunkRange=t.chunkSize=t.mountainMod=t.heights=void 0,t.heights={water:4.3,sand:5,plainsMin:4,plainsMax:35,mountainFactor:1.6},t.mountainMod=t.heights.plainsMax-(t.heights.plainsMin+(t.heights.plainsMax-t.heights.plainsMin)/4),t.chunkSize={x:128,y:128},t.chunkRange=3,t.noiseSeed=1024,t.maximumTrees=500,t.maximumGrass=2e3},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),importScripts("js/three.min.js","js/perlin.js");const r=self,a=n(0),s=n(2);function i(e,t,n,r){let a=0,s=0,i=0;for(;a<n;){s++,i=s-1;for(let o=-s;o<=s;o++)for(let u=-s;u<=s;u++){if(a>=n)return;o>-i&&o<i&&u>-i&&u<i&&(u=i),(o<-i||o>i||u<-i||u>i)&&(a+=r(e+o,t+u))}}}noise.seed(a.noiseSeed),r.addEventListener("message",(function(e){switch(e.data[0]){case"land":!function(e,t,n){let a,i,o,u=new Float32Array((n+1)*(n+1)*3),l=n+1,f=n+1,c=new Float32Array((n+1)*(n+1));for(let r=0;r<l;r++)for(let l=0;l<f;l++)a=r-n/2+e,i=l-n/2+t,u[3*(r*f+l)]=a,u[3*(r*f+l)+2]=i,o=s.getHeight(a,i),u[3*(r*f+l)+1]=o,c[r*f+l]=s.getLandTexture(a,i,o);r.postMessage({type:"land",x:e,y:t,pa:u.buffer,landTextures:c.buffer,size:n},[u.buffer,c.buffer])}(e.data[1],e.data[2],e.data[3]);break;case"grass":!function(e,t,n,o){let u,l=new THREE.Matrix4,f=new THREE.Vector3,c=new THREE.Euler,h=new THREE.Quaternion,m=new THREE.Vector3(1,1,1),d=new Float32Array(o),p=new Float32Array(16*o),g=0,x=0,M=0;i(e,t,o,(function(r,i){if(r=e+(e-r)*n,i=t+(t-i)*n,noise.simplex2(r/5,i/5)>.3&&(u=s.getHeight(r,i),u>a.heights.sand+1&&u<a.mountainMod)){m.set(1,1,1),f.x=r+noise.simplex2(r+2,i+2),f.z=i+noise.simplex2(r+4,i+4),u=s.getHeight(f.x,f.z),f.y=u+.25,c.y=noise.simplex2(r,i)*Math.PI*10,h.setFromEuler(c),l.compose(f,h,m),l.toArray().forEach(e=>{p[g++]=e}),d[x++]=Math.abs(noise.simplex2(r,i));let n=Math.max(Math.abs(e-r),Math.abs(t-i));return n>M&&(M=n),1}return 0})),r.postMessage({type:"grass",maxDistance:M,grassMatrices:p.buffer,grassTextures:d.buffer},[p.buffer,d.buffer])}(e.data[1],e.data[2],e.data[3],e.data[4]);break;case"tree":!function(e,t,n){let o,u=new THREE.Matrix4,l=new THREE.Vector3,f=new THREE.Euler,c=new THREE.Quaternion,h=new THREE.Vector3(1,1,1),m=new Float32Array(16*n),d=0,p=0;i(e,t,n,(function(n,r){let i=noise.simplex2(n/45,r/45);if(i>.4&&Math.abs(noise.simplex2(2*n,2*r))>.9&&(o=s.getHeight(n,r),o>a.heights.sand+1&&o<a.mountainMod)){let a=.4+i;h.set(a,a,a),l.x=n,l.z=r,l.y=o-.5,f.y=noise.simplex2(n/5,r/5)*Math.PI*2,c.setFromEuler(f),u.compose(l,c,h),u.toArray().forEach(e=>{m[d++]=e});let s=Math.max(Math.abs(e-n),Math.abs(t-r));return s>p&&(p=s),1}return 0})),r.postMessage({type:"tree",maxDistance:p,treeMatrices:m.buffer},[m.buffer])}(e.data[1],e.data[2],e.data[3]);break;case"seed":noise.seed(e.data[1])}})),t.default={}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getTreeGeometery=t.getLandTexture=t.getHeight=void 0;const r=n(0),a=r.heights.plainsMin+(r.heights.plainsMax-r.heights.plainsMin)/4;t.getHeight=function(e,t){let n=.5*noise.simplex2(e/8,t/8)+2*noise.simplex2(e/32,t/32)+10*noise.simplex2(e/100,t/100)+32*noise.simplex2(e/200,t/200)+32*noise.simplex2(e/500,t/500)+24*noise.simplex2(e/900,t/900);n+=30;let s=r.heights.plainsMin+(n-r.heights.plainsMin)/4;return n>r.heights.plainsMax?Math.pow(s-a,r.heights.mountainFactor)+a:s},t.getLandTexture=function(e,t,n){if(n<r.heights.water-1)return 0+Math.max(n-(r.heights.water-2),0);if(n<r.heights.sand+.5)return 1;if(n<r.heights.sand+1)return 1+2*(n-(r.heights.sand+.5));let a=3+3*noise.simplex2(e/20,t/20);if(n>r.heights.plainsMax+5+a)return 4;if(n>r.heights.plainsMax+3+a)return 3+.5*(n-(r.heights.plainsMax+3+a));let s=5+5*noise.simplex2(e/15,t/15);return n>r.mountainMod+s?3:n>r.mountainMod+s-2?2+.5*(n-(r.mountainMod+s-2)):2},t.getTreeGeometery=function(){const e=new THREE.Color(3242032),t=new THREE.Color(7222822),n=new THREE.Geometry,r=new THREE.ConeGeometry(.8,1.6,10);r.faces.forEach(t=>t.color.set(e)),r.translate(0,3.7,0),n.merge(r);const a=new THREE.ConeGeometry(1,1.8,10);a.faces.forEach(t=>t.color.set(e)),a.translate(0,2.9,0),n.merge(a);const s=new THREE.ConeGeometry(1.2,2,10);s.faces.forEach(t=>t.color.set(e)),s.translate(0,2,0),n.merge(s);const i=new THREE.CylinderGeometry(.3,.3,2);i.translate(0,-0,0),i.faces.forEach(e=>e.color.set(t)),n.merge(i);let o=new THREE.BufferGeometry;return o.fromGeometry(n),o}}]);
//# sourceMappingURL=worker.js.map