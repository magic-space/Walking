!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.maximumGrass=t.maximumTrees=t.noiseSeed=t.chunkRange=t.chunkSize=t.mountainMod=t.heights=void 0,t.heights={water:4.3,sand:5,plainsMin:4,plainsMax:35,mountainFactor:1.6},t.mountainMod=t.heights.plainsMax-(t.heights.plainsMin+(t.heights.plainsMax-t.heights.plainsMin)/4),t.chunkSize={x:128,y:128},t.chunkRange=3,t.noiseSeed=1024,t.maximumTrees=150,t.maximumGrass=2e3},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),importScripts("js/three.min.js","js/perlin.js");const r=self,s=n(0),i=n(2);noise.seed(s.noiseSeed),r.addEventListener("message",(function(e){switch(e.data[0]){case"land":!function(e,t,n){let s,o,a,u=new Float32Array((n+1)*(n+1)*3),l=n+1,f=n+1,m=new Float32Array((n+1)*(n+1));for(let r=0;r<l;r++)for(let l=0;l<f;l++)s=r-n/2+e,o=l-n/2+t,u[3*(r*f+l)]=s,u[3*(r*f+l)+2]=o,a=i.getHeight(s,o),u[3*(r*f+l)+1]=a,m[r*f+l]=i.getLandTexture(s,o,a);r.postMessage({type:"land",x:e,y:t,pa:u.buffer,landTextures:m.buffer,size:n},[u.buffer,m.buffer])}(e.data[1],e.data[2],e.data[3]);break;case"grass":!function(e,t,n,o){let a,u,l,f=new THREE.Matrix4,m=new THREE.Vector3,c=new THREE.Euler,h=new THREE.Quaternion,p=new THREE.Vector3(1,1,1),d=new Float32Array(s.maximumGrass),g=new Float32Array(16*s.maximumGrass),x=new Float32Array(16*s.maximumTrees),y=0,M=0,E=0,b=0,T=0;for(let r=0;r<n;r+=1)for(let o=0;o<n&&!(y>=s.maximumGrass);o+=1)a=r-n/2+e,u=o-n/2+t,l=i.getHeight(a,u),2==i.getLandTexture(a,u,l)&&l<s.mountainMod-4&&noise.simplex2(a/5,u/5)>.6&&(p.set(1,1,1),m.x=a+noise.simplex2(a+2,u+2),m.z=u+noise.simplex2(a+4,u+4),l=i.getHeight(m.x,m.z),m.y=l+.25,c.y=noise.simplex2(a,u)*Math.PI*2,h.setFromEuler(c),f.compose(m,h,p),f.toArray().forEach(e=>{g[E++]=e}),d[b++]=Math.abs(noise.simplex2(a,u)),y++);for(let n=0;n<o;n++)for(let r=0;r<o&&!(M>=s.maximumTrees);r++)if(a=n-o/2+e,u=r-o/2+t,l=i.getHeight(a,u),2==i.getLandTexture(a,u,l)&&noise.simplex2(a/35,u/35)>.7&&noise.simplex2(2*a,2*u)>.9){let e=.3+noise.simplex2(a/35,u/35);p.set(e,e,e),m.x=a,m.z=u,m.y=l-.1,c.y=noise.simplex2(a/5,u/5)*Math.PI,h.setFromEuler(c),f.compose(m,h,p),f.toArray().forEach(e=>{x[T++]=e}),M++}r.postMessage({type:"grass",grassMatrices:g.buffer,grassTextures:d.buffer,treeMatrices:x.buffer},[g.buffer,d.buffer,x.buffer])}(e.data[1],e.data[2],e.data[3],e.data[4])}})),t.default={}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getTreeGeometery=t.getLandTexture=t.getHeight=void 0;const r=n(0),s=r.heights.plainsMin+(r.heights.plainsMax-r.heights.plainsMin)/4;t.getHeight=function(e,t){let n=.5*noise.simplex2(e/8,t/8)+2*noise.simplex2(e/32,t/32)+10*noise.simplex2(e/100,t/100)+32*noise.simplex2(e/200,t/200)+32*noise.simplex2(e/500,t/500)+24*noise.simplex2(e/900,t/900);n+=30;let i=r.heights.plainsMin+(n-r.heights.plainsMin)/4;return n>r.heights.plainsMax?Math.pow(i-s,r.heights.mountainFactor)+s:i},t.getLandTexture=function(e,t,n){if(n<r.heights.water)return 0;if(n<r.heights.sand+.5)return 1;if(n<r.heights.sand+1)return 1+2*(n-(r.heights.sand+.5));let s=3+3*noise.simplex2(e/20,t/20);if(n>r.heights.plainsMax+3+s)return 4;if(n>r.heights.plainsMax+2+s)return n-(r.heights.plainsMax+2+s)+3;let i=5+5*noise.simplex2(e/15,t/15);return n>r.mountainMod+i?3:n>r.mountainMod+i-1?n-(r.mountainMod+i-1)+2:2},t.getTreeGeometery=function(){const e=new THREE.Color(2853674),t=new THREE.Color(5056285),n=new THREE.Geometry,r=new THREE.ConeGeometry(1,2,8);r.faces.forEach(t=>t.color.set(e)),r.translate(0,4,0),n.merge(r);const s=new THREE.ConeGeometry(1.2,2,8);s.faces.forEach(t=>t.color.set(e)),s.translate(0,3,0),n.merge(s);const i=new THREE.ConeGeometry(1.4,2,8);i.faces.forEach(t=>t.color.set(e)),i.translate(0,2,0),n.merge(i);const o=new THREE.CylinderGeometry(.3,.3,3);o.translate(0,-.5,0),o.faces.forEach(e=>e.color.set(t)),n.merge(o);let a=new THREE.BufferGeometry;return a.fromGeometry(n),a}}]);
//# sourceMappingURL=worker.js.map