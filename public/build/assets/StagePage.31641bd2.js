import{A as u}from"./AppHeader.38a9a9cf.js";import{A as v,a as b}from"./AppUsersTables.d1c0410b.js";import{_ as f,r as _,X as A,i as T,a as l,o as t,c as a,d,w as x,b as s,Q as i,f as n,F as y,g as k}from"./app.08e4a853.js";import{t as H}from"./time.a44078dd.js";import"./logo.170de005.js";const w={name:"StagePage",components:{AppHeader:u,AppResultTable:v,AppUsersTables:b},setup(){const o=_({}),c=A().params.id,e=_("");return T(async()=>{try{const r=await axios.get(`/api/stage/${c}/show-users`);o.value=r.data,e.value=o.value.title,console.log(o.value.status)}catch(r){console.log(r.message)}}),{stage:o,id:c,h1:e,time:H}}},M={class:"container-fluid g-0"},L={class:"row"},N={class:"col-12"},R={key:0,class:"dashboard-item"},V={class:"user-stage__date mb0"},B={key:1,class:"dashboard-item"},C=["innerHTML"],S={key:2,class:"dashboard-item"},U=["innerHTML"],F={key:3,class:"dashboard-item"},P={key:4,class:"dashboard-item"};function D(o,g,c,e,r,E){const m=l("AppHeader"),p=l("AppUsersTables"),h=l("AppResultTable");return t(),a(y,null,[d(m,null,{default:x(()=>[k(i(e.h1),1)]),_:1}),s("main",null,[s("div",M,[s("div",L,[s("div",N,[e.stage&&e.stage.register_start?(t(),a("div",R,[s("div",V,[s("span",null,"\u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438: "+i(e.time(e.stage.register_start)),1),s("span",null,"\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438: "+i(e.time(e.stage.register_end)),1),s("span",null,"\u041D\u0430\u0447\u0430\u043B\u043E \u0433\u043E\u043D\u043E\u043A: "+i(e.time(e.stage.race_start)),1)])])):n("",!0),e.stage&&e.stage.participant_text&&e.stage.status!=="active"?(t(),a("div",B,[s("div",{class:"content",innerHTML:e.stage.participant_text},null,8,C)])):n("",!0),e.stage&&e.stage.description?(t(),a("div",S,[s("div",{class:"content",innerHTML:e.stage.description},null,8,U)])):n("",!0),e.stage&&e.stage.status==="active"?(t(),a("div",F,[d(p,{users:e.stage.users},null,8,["users"])])):n("",!0),e.stage&&e.stage.status!=="active"?(t(),a("div",P,[d(h,{id:e.id},null,8,["id"])])):n("",!0)])])])])],64)}const G=f(w,[["render",D]]);export{G as default};
