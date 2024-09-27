import{a as A,p as N}from"./chunk-CDJZBGNX.js";import{c as L}from"./chunk-DHZI2MM3.js";import{e as O,f as E}from"./chunk-33ZLOP25.js";import{Da as R,Db as o,Eb as a,Fb as H,Ib as P,Kb as B,Lb as y,Mb as c,Nb as p,Pb as m,Q,Qb as h,Z as q,Za as _,aa as v,ac as S,fa as C,ha as u,hb as d,mb as M,pa as b,qb as l,sc as D,ub as w,wa as x,xb as I,yb as f}from"./chunk-75JNA2NC.js";var z=(()=>{let e=class e{constructor(){}};e.\u0275fac=function(i){return new(i||e)},e.\u0275dir=u({type:e,selectors:[["","idsMessageSuffix",""]],standalone:!0});let t=e;return t})();function W(t){return t==null||(typeof t=="string"||Array.isArray(t))&&t.length===0}var $=class{static required(e){return G(e)}static requiredTrue(e){return J(e)}static requiredFalse(e){return K(e)}};function G(t){return W(t.value)?{required:!0}:null}function J(t){return t.value===!0?null:{requiredTrue:!0}}function K(t){return t.value===!1?null:{requiredFalse:!0}}var j=(()=>{let e=class e{constructor(){}};e.\u0275fac=function(i){return new(i||e)},e.\u0275dir=u({type:e,selectors:[["","idsMessagePrefix",""]],standalone:!0});let t=e;return t})();var T=new q("IdsFormElement"),le=new q("IdsFormField");var X=0,V=(()=>{let e=class e{constructor(){this._componentClass="ids-message",this._injector=v(x),this.id=R(`${this._componentClass}-${X++}`,{transform:s=>`${this._componentClass}-${s}`}),this.inputSize=O.COMFORTABLE,this._size=d(O.COMFORTABLE),this._variant=d(L.SURFACE),this._disabled=d(!1),this._hostClasses=D(()=>E(this._componentClass,[this._size(),this._variant(),this._disabled()?"disabled":null])),this._receivedInputSize=!1,this._receivedInputVariant=!1}ngOnChanges(s){let i=s.inputSize,n=s.inputVariant;i&&(this._size.set(i.currentValue),this._receivedInputSize=!0),n&&(this._size.set(n.currentValue),this._receivedInputVariant=!0)}ngOnInit(){let s=this._injector.get(T,null,{skipSelf:!0,optional:!0});s&&(this._receivedInputSize||this._size.set(s.size()),this._receivedInputVariant||this._variant.set(s.variant()),this._disabled.set(s.isDisabled()))}get classes(){return this._hostClasses()}};e.\u0275fac=function(i){return new(i||e)},e.\u0275dir=u({type:e,selectors:[["","idsMessage",""]],hostVars:3,hostBindings:function(i,n){i&2&&(P("id",n.id()),I(n.classes))},inputs:{id:[1,"id"],inputSize:[0,"size","inputSize"],inputVariant:[0,"variant","inputVariant"]},standalone:!0,features:[b]});let t=e;return t})();var Y=["*",[["","idsMessagePrefix",""]],[["","idsMessageSuffix",""]]],Z=["*","[idsMessagePrefix]","[idsMessageSuffix]"];function ee(t,e){t&1&&c(0,1)}function te(t,e){if(t&1&&H(0,"ids-icon",1),t&2){let U=B();w("icon",U.defaultPrefixIcon)}}function ie(t,e){t&1&&(o(0,"div",3),c(1,2),a())}var Ve=(()=>{let e=class e{constructor(){this._componentClass="ids-error-message",this._injector=v(x),this._errors=d(null),this._hostClasses=D(()=>E(this._componentClass)),this.defaultPrefixIcon=N}get classes(){return this._hostClasses()}ngOnInit(){let s=this._injector.get(T,null,{skipSelf:!0,optional:!0});if(s){let i=s.controlDir;this._subscription=i?.statusChanges?.pipe(Q(i.errors)).subscribe(()=>{this._errors.set(i.errors)})}}ngOnDestroy(){this._subscription?.unsubscribe()}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=C({type:e,selectors:[["ids-error-message"]],contentQueries:function(i,n,g){if(i&1&&(p(g,j,4),p(g,z,4)),i&2){let r;m(r=h())&&(n.prefixes=r),m(r=h())&&(n.suffixes=r)}},hostVars:2,hostBindings:function(i,n){i&2&&I(n.classes)},standalone:!0,features:[M([V]),S],ngContentSelectors:Z,decls:6,vars:2,consts:[[1,"ids-message__prefix"],["aria-hidden","true",3,"icon"],[1,"ids-message__text"],[1,"ids-message__suffix"]],template:function(i,n){i&1&&(y(Y),o(0,"div",0),l(1,ee,1,0)(2,te,1,1,"ids-icon",1),a(),o(3,"div",2),c(4),a(),l(5,ie,2,0,"div",3)),i&2&&(_(),f(n.prefixes.length?1:2),_(4),f(n.suffixes.length?5:-1))},dependencies:[A],encapsulation:2});let t=e;return t})();var se=["*",[["","idsMessagePrefix",""]],[["","idsMessageSuffix",""]]],ne=["*","[idsMessagePrefix]","[idsMessageSuffix]"];function re(t,e){t&1&&(o(0,"div",0),c(1,1),a())}function oe(t,e){t&1&&(o(0,"div",2),c(1,2),a())}var be=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=C({type:e,selectors:[["ids-hint-message"]],contentQueries:function(i,n,g){if(i&1&&(p(g,j,4),p(g,z,4)),i&2){let r;m(r=h())&&(n.prefixes=r),m(r=h())&&(n.suffixes=r)}},hostAttrs:[1,"ids-hint-message"],standalone:!0,features:[M([{directive:V,inputs:["size","size","variant","variant"]}]),S],ngContentSelectors:ne,decls:4,vars:2,consts:[[1,"ids-message__prefix"],[1,"ids-message__text"],[1,"ids-message__suffix"]],template:function(i,n){i&1&&(y(se),l(0,re,2,0,"div",0),o(1,"div",1),c(2),a(),l(3,oe,2,0,"div",2)),i&2&&(f(n.prefixes.length?0:-1),_(3),f(n.suffixes.length?3:-1))},encapsulation:2});let t=e;return t})();export{T as a,le as b,V as c,j as d,z as e,$ as f,Ve as g,be as h};
