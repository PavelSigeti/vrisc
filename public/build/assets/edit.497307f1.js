import{_ as y,u as b,X as A,r as n,i as V,a as u,o as m,c as w,d as k,w as M,b as t,e as _,f as g,S as v,Y as h,U,F as B,g as C,Q as E}from"./app.08e4a853.js";import{A as N}from"./AppEditor.796df726.js";import{A as S}from"./AppHeader.38a9a9cf.js";import{A as x}from"./logo.170de005.js";const H={name:"page.edit",components:{AppEditor:N,AppHeader:S,AppLoader:x},setup(){const l=b(),o=A(),i=n(!1),e=n(),r=n(),d=n(),s=n(""),c=o.params.id;return V(async()=>{i.value=!0;try{const p=(await axios.get(`/api/admin/page/${c}`)).data;r.value=e.value=p.title,d.value=p.slug,s.value=p.text}catch{l.dispatch("notification/displayMessage",{value:"\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",type:"error"})}i.value=!1}),{submit:async()=>{try{await axios.patch(`/api/admin/page/${c}/update`,{title:r.value,slug:d.value,text:s.value}),l.dispatch("notification/displayMessage",{value:"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430",type:"primary"})}catch{l.dispatch("notification/displayMessage",{value:"\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",type:"error"})}},title:r,text:s,slug:d,h1:e,AppLoader:x,loading:i}}},L={class:"container-fluid g-0"},R={class:"row"},D={class:"col-12"},F={class:"dashboard-item"},I={class:"form-control"},T=t("label",{for:"title"},"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",-1),Q={class:"form-control"},X=t("label",{for:"slug"},"URI (Slug)",-1),Y={class:"form-control"},j=t("label",{for:"content"},"\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435",-1);function q(l,o,i,e,r,d){const s=u("AppHeader"),c=u("AppLoader"),f=u("AppEditor");return m(),w(B,null,[k(s,null,{default:M(()=>[C(E(e.h1),1)]),_:1}),t("main",null,[t("div",L,[t("div",R,[t("div",D,[t("div",F,[e.loading?(m(),_(c,{key:0})):g("",!0),t("form",null,[t("div",I,[T,v(t("input",{class:"form-input",type:"text",name:"title","onUpdate:modelValue":o[0]||(o[0]=a=>e.title=a),id:"title",placeholder:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"},null,512),[[h,e.title]])]),t("div",Q,[X,v(t("input",{class:"form-input",type:"text",name:"slug","onUpdate:modelValue":o[1]||(o[1]=a=>e.slug=a),id:"slug",placeholder:"URI (\u0427\u041F\u0423)"},null,512),[[h,e.slug]])]),t("div",Y,[j,e.text?(m(),_(f,{key:0,modelValue:e.text,"onUpdate:modelValue":o[2]||(o[2]=a=>e.text=a),id:"content"},null,8,["modelValue"])):g("",!0)]),t("button",{class:"btn btn-default btn-settings",onClick:o[3]||(o[3]=U((...a)=>e.submit&&e.submit(...a),["prevent"]))},"\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C")])])])])])])],64)}const O=y(H,[["render",q]]);export{O as default};
