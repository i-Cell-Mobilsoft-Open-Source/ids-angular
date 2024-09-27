import{c as Z,d as x,f as v,g as ii,h as E}from"./chunk-ZEFZD7YS.js";import{a as I}from"./chunk-OJY3LY5W.js";import{a as Q,f as K,n as J}from"./chunk-CDJZBGNX.js";import{a as X}from"./chunk-HKSJJNJW.js";import{a as P,b as $}from"./chunk-5HLHXSZV.js";import{e as Y,f as D}from"./chunk-33ZLOP25.js";import{$b as j,Da as n,Db as d,Eb as p,Fb as C,Hb as B,Ib as y,Jb as q,Kb as h,Lb as z,Mb as V,Sb as R,Tb as U,Vb as M,Wb as W,Z as L,Za as r,a as _,aa as m,ac as T,fa as g,hb as F,ib as O,nb as G,qa as k,qb as u,ra as H,sc as c,tb as N,ub as l,xb as S,yb as f}from"./chunk-75JNA2NC.js";var ti={SURFACE:"surface",LIGHT:"light",PRIMARY:"primary"};var b={ONHANDLE:"onhandle",ONTRACK:"ontrack"},ei={LEFT:"left",RIGHT:"right"};var A=new L("IDS_SWITCH_DEFAULT_CONFIG",{providedIn:"root",factory:w});function w(){return{size:Y.COMPACT,variant:ti.SURFACE,hasIcon:!1,iconPosition:b.ONHANDLE,labelPosition:ei.RIGHT}}var ci=[[["ids-switch"]]],ri=["ids-switch"],li=0,di=w(),ni=(()=>{let o=class o{constructor(){this._componentClass="ids-switch-group",this._uniqueId=`${this._componentClass}-${++li}`,this._defaultConfig=_(_({},di),m(A,{optional:!0})),this.id=n(this._uniqueId,{transform:t=>I(t,this._uniqueId)}),this.size=n(this._defaultConfig.size),this.hasIcon=n(this._defaultConfig.hasIcon),this.iconPosition=n(this._defaultConfig.iconPosition),this.labelPosition=n(this._defaultConfig.labelPosition),this._hostClasses=c(()=>D(this._componentClass,[this.size()]))}get classes(){return this._hostClasses()}};o.\u0275fac=function(s){return new(s||o)},o.\u0275cmp=g({type:o,selectors:[["ids-switch-group"]],hostVars:3,hostBindings:function(s,e){s&2&&(y("id",e.id()),S(e.classes))},inputs:{id:[1,"id"],size:[1,"size"],hasIcon:[1,"hasIcon"],iconPosition:[1,"iconPosition"],labelPosition:[1,"labelPosition"]},standalone:!0,features:[T],ngContentSelectors:ri,decls:1,vars:0,template:function(s,e){s&1&&(z(ci),V(0))},encapsulation:2,changeDetection:0});let i=o;return i})();var oi=Z("switchAnimation",[ii("off <=> on",[E(".ids-icon:enter",[v({opacity:0}),x("0.1s ease-in",v({opacity:1}))],{optional:!0}),E(".ids-icon:leave",[x("0.1s ease-out",v({opacity:0}))],{optional:!0})])]);var hi=["switch"],_i=["ngModel",""];function ui(i,o){if(i&1&&C(0,"ids-icon",6),i&2){let a=h(2);l("icon",a._onIcon)}}function fi(i,o){if(i&1&&C(0,"ids-icon",6),i&2){let a=h(2);l("icon",a._offIcon)}}function mi(i,o){if(i&1&&(d(0,"div",5),u(1,ui,1,1,"ids-icon",6),p(),d(2,"div",5),u(3,fi,1,1,"ids-icon",6),p()),i&2){let a=h();r(),f(a.isChecked()?1:-1),r(2),f(a.isChecked()?-1:3)}}function pi(i,o){if(i&1&&C(0,"ids-icon",6),i&2){let a=h(2);l("icon",a._onIcon)}}function Ci(i,o){if(i&1&&C(0,"ids-icon",6),i&2){let a=h(2);l("icon",a._offIcon)}}function Ii(i,o){if(i&1&&u(0,pi,1,1,"ids-icon",6)(1,Ci,1,1,"ids-icon",6),i&2){let a=h();f(a.isChecked()?0:1)}}var bi=0,wi=w(),it=(()=>{let o=class o{constructor(){this._componentClass="ids-switch",this._uniqueId=`${this._componentClass}-${++bi}`,this._defaultConfig=_(_({},wi),m(A,{optional:!0})),this._switchGroup=m(ni,{optional:!0}),this._onIcon=K,this._offIcon=J,this._switchElement=O("switch"),this.isChecked=F(!1),this.id=n(this._uniqueId,{transform:t=>I(t,this._uniqueId)}),this.label=n(),this.ariaLabel=n(),this.ariaLabelledBy=n(void 0,{transform:t=>I(t,this.id())}),this.ariaDescribedBy=n(),this.name=n(),this.required=n(!1,{transform:P}),this.readonly=n(!1,{transform:P}),this.size=n(this._defaultConfig.size),this.tabIndex=n(0,{transform:$}),this.value=n(),this.variant=n(this._defaultConfig.variant),this.hasIcon=n(this._defaultConfig.hasIcon),this.iconPosition=n(this._defaultConfig.iconPosition),this.labelPosition=n(this._defaultConfig.labelPosition),this.isDisabled=F(!1),this._safeSize=c(()=>this._switchGroup?.size()??this.size()),this._safeHasIcon=c(()=>this._switchGroup?.hasIcon()??this.hasIcon()),this._safeIconPosition=c(()=>this._switchGroup?.iconPosition()??this.iconPosition()),this._safeLabelPosition=c(()=>this._switchGroup?.labelPosition()??this.labelPosition()),this._hasHandleIcon=c(()=>this._safeHasIcon()&&this._safeIconPosition()===b.ONHANDLE),this._hasTrackIcon=c(()=>this._safeHasIcon()&&this._safeIconPosition()===b.ONTRACK),this._isFocusable=c(()=>!this.isDisabled()&&!this.readonly()),this._hostClasses=c(()=>D(this._componentClass,[this._safeSize(),this.variant(),this.isDisabled()?"disabled":null,this.isChecked()?"on":null])),this._onChange=()=>{},this._onTouched=()=>{}}set disabled(t){t!==this.disabled&&this.isDisabled.set(t)}get classes(){return this._hostClasses()}focus(){this._isFocusable()&&this._switchElement()?.nativeElement.focus()}writeValue(t){this.isChecked.set(!!t)}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.isDisabled.set(t)}toggle(){!this.isDisabled()&&!this.readonly()&&(this.isChecked.update(t=>!t),this._onChange(this.isChecked()),this._onTouched())}handleClick(){this.isDisabled()||this.toggle()}};o.\u0275fac=function(s){return new(s||o)},o.\u0275cmp=g({type:o,selectors:[["ids-switch","ngModel",""],["ids-switch","formControl",""],["ids-switch","formControlName",""]],viewQuery:function(s,e){s&1&&R(e._switchElement,hi,5),s&2&&U()},hostVars:3,hostBindings:function(s,e){s&2&&(y("id",e.id()),S(e.classes))},inputs:{id:[1,"id"],label:[1,"label"],ariaLabel:[1,"ariaLabel"],ariaLabelledBy:[1,"ariaLabelledBy"],ariaDescribedBy:[1,"ariaDescribedBy"],name:[1,"name"],required:[1,"required"],readonly:[1,"readonly"],size:[1,"size"],tabIndex:[1,"tabIndex"],value:[1,"value"],variant:[1,"variant"],hasIcon:[1,"hasIcon"],iconPosition:[1,"iconPosition"],labelPosition:[1,"labelPosition"],disabled:[2,"disabled","disabled",P]},standalone:!0,features:[j([{provide:X,useExisting:o,multi:!0}]),G,T],attrs:_i,decls:8,vars:14,consts:[["switch",""],["role","switch","type","button",1,"ids-switch__button",3,"click","tabIndex","disabled","id","name"],[1,"ids-switch__track"],[1,"ids-switch__handle"],[1,"ids-switch__label",3,"for"],[1,"ids-switch__track-icon"],["aria-hidden","true",3,"icon"]],template:function(s,e){if(s&1){let si=B();d(0,"button",1,0),q("click",function(){return k(si),H(e.handleClick())}),d(2,"div",2),u(3,mi,4,2),d(4,"div",3),u(5,Ii,2,1),p()()(),d(6,"label",4),M(7),p()}s&2&&(l("tabIndex",e.isDisabled()?-1:e.tabIndex())("disabled",e.isDisabled())("id",e.id())("name",e.name())("@switchAnimation",e.isChecked()?"on":"off"),N("aria-label",e.ariaLabel())("aria-labelledby",e.ariaLabelledBy())("aria-describedby",e.ariaDescribedBy())("aria-required",e.required()||null)("aria-checked",e.isChecked()),r(3),f(e._hasTrackIcon()?3:-1),r(2),f(e._hasHandleIcon()?5:-1),r(),l("for",e.id()),r(),W(e.label()))},dependencies:[Q],encapsulation:2,data:{animation:[oi]},changeDetection:0});let i=o;return i})();export{ti as a,ni as b,it as c};
