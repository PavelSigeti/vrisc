import{t as U}from"./time.a44078dd.js";import{_ as v,r as g,x as h,G as C,a as _,o as a,c as n,b as s,d as f,w as H,g as S,Q as m,f as p,P as x,e as u,F as A,V as k}from"./app.433736e7.js";import{A as B}from"./AppHomeHeader.fd3fe750.js";import"./AppForgetPassword.567c9fe6.js";import"./logo.b9626c31.js";import"./vue-select.0f8196d4.js";const E={name:"AppHomeUserStage",components:{},props:["stage"],setup(o){const t=()=>{const i=new Date().toLocaleString("ru-RU",{timeZone:"Europe/Moscow"}).split(",");e.value=`${i[0]} ${i[1]}`},d=g(o.stage),e=g();h(()=>{t()});const l=setInterval(t,1e3);return C(()=>{clearInterval(l)}),{stage:d,time:U,now:e}}},V={class:"user-stage"},$={class:"user-stage__header"},L={class:"user-stage__tournament"},M={key:0,class:"user-stage__participant"},N=["innerHTML"],T={class:"user-stage__date"},D={key:1,class:"user-stage__info"},I={key:2,class:"user-stage__info"},F={key:3,class:"user-stage__info"},z={key:4,class:"user-stage__info"};function G(o,t,d,e,l,i){const c=_("router-link");return a(),n("div",V,[s("div",$,[f(c,{to:`/stage/${e.stage.id}`,class:"user-stage__title"},{default:H(()=>[S(m(e.stage.title),1)]),_:1},8,["to"]),s("div",L,m(e.stage.tournament),1),e.stage.users_exists?(a(),n("div",M,"\u0412\u044B \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u0435\u0442\u0435")):p("",!0)]),e.stage.excerpt?(a(),n("div",{key:0,class:"user-stage__excerpt content",innerHTML:e.stage.excerpt},null,8,N)):p("",!0),s("div",T,[s("span",null,"\u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438: "+m(e.time(e.stage.register_start)),1),s("span",null,"\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438: "+m(e.time(e.stage.register_end)),1),s("span",null,"\u041D\u0430\u0447\u0430\u043B\u043E \u0433\u043E\u043D\u043E\u043A: "+m(e.time(e.stage.race_start)),1)]),e.time(e.stage.register_start)>e.now?(a(),n("div",D," \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043D\u0435 \u043D\u0430\u0447\u0430\u043B\u0430\u0441\u044C ")):e.time(e.stage.race_start)<e.now&&e.stage.status!=="finished"?(a(),n("div",I," \u0420\u0435\u0433\u0430\u0442\u0430 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 ")):e.stage.status==="finished"?(a(),n("div",F," \u0420\u0435\u0433\u0430\u0442\u0430 \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0430\u0441\u044C ")):(a(),n("div",z," \u041E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 ")),f(c,{to:`/stage/${e.stage.id}`,class:"btn btn-border btn-settings-280 mt10"},{default:H(()=>[S("\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435")]),_:1},8,["to"])])}const y=v(E,[["render",G]]),P={name:"AppActualStage",components:{AppHomeUserStage:y},setup(){const o=g();return h(async()=>{try{const t=await axios.get("/api/home/stage/ended");o.value=t.data}catch(t){console.log(t.message)}}),{stages:o}}};function Q(o,t,d,e,l,i){const c=_("AppHomeUserStage");return a(!0),n(A,null,x(e.stages,r=>(a(),u(c,{key:r.id,stage:r},null,8,["stage"]))),128)}const R=v(P,[["render",Q]]),Z={name:"AppHomeActualStage",components:{AppHomeUserStage:y},setup(){const o=g();return h(async()=>{try{const t=await axios.get("/api/home/stage/actual");o.value=t.data}catch(t){console.log(t.message)}}),{stages:o}}};function j(o,t,d,e,l,i){const c=_("AppHomeUserStage");return a(!0),n(A,null,x(e.stages,r=>(a(),u(c,{key:r.id,stage:r},null,8,["stage"]))),128)}const q=v(Z,[["render",j]]),J={name:"HomeStage",components:{AppHomeEndedStage:R,AppHomeActualStage:q,AppHomeHeader:B},setup(){return{section:g("actual")}}},K={class:"container"},O={class:"row"},W=s("div",{class:"col-12 mt30 mb30"},[s("h1",null,"\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0440\u0435\u0433\u0430\u0442")],-1),X={class:"col-12"},Y={class:"tabs"},ee={class:"col-12"};function te(o,t,d,e,l,i){const c=_("AppHomeHeader"),r=_("AppHomeEndedStage"),b=_("AppHomeActualStage");return a(),n(A,null,[f(c),s("main",null,[s("div",K,[s("div",O,[W,s("div",X,[s("div",Y,[s("div",{class:k(["tab-item",{"tab-item__active":e.section==="actual"}]),onClick:t[0]||(t[0]=w=>e.section="actual")},"\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u0435\u0433\u0430\u0442\u044B",2),s("div",{class:k(["tab-item",{"tab-item__active":e.section==="ended"}]),onClick:t[1]||(t[1]=w=>e.section="ended")},"\u041F\u0440\u043E\u0448\u0435\u0434\u0448\u0438\u0435 \u0440\u0435\u0433\u0430\u0442\u044B",2)])]),s("div",ee,[e.section==="ended"?(a(),u(r,{key:0})):p("",!0),e.section==="actual"?(a(),u(b,{key:1})):p("",!0)])])])])],64)}const ie=v(J,[["render",te]]);export{ie as default};