import{_ as C,u as M,r as p,o as n,c as o,b as a,S as V,Y as B,V as q,Q as l,g as k,U,F as A,P as x,f as h,j as b,a as f,d as I,w as $,m as R,x as L,e as w,G as j}from"./app.79450079.js";import{F as N,a as H,E as P,c as z,b as G,A as E}from"./logo.58fb23e5.js";import{t as Q}from"./time.a44078dd.js";import{A as Y}from"./AppHeader.3dfe0db9.js";const Z={name:"TheUserSearchForm",props:["team_id"],emits:["invite","load"],setup(i,{emit:t}){const c=M(),e=p(),m=p(null),r=p(null),s=p(!1);return{search:async()=>{if(s.value===!0){e.value="",s.value=!1;return}if(e.value.length>0){const g=await b.post("/api/user/search",{user:e.value});g.data.length>0?(m.value=g.data,s.value=!0):m.value=null}else m.value=null},searchCandidates:m,user:e,invite:async()=>{try{if(t("load"),r.value){const g=await b.post("/api/team-invite",{team_id:i.team_id,user_id:r.value.id});r.value=null,c.dispatch("notification/displayMessage",{value:"\u041F\u0440\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E",type:"primary"}),t("invite",g.data),t("load")}else c.dispatch("notification/displayMessage",{value:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",type:"error"}),t("load")}catch(g){console.log(g.message),c.dispatch("notification/displayMessage",{value:g.response.data.message,type:"error"}),t("load")}},selected:r,selectUser:g=>{e.value="",s.value=!1,m.value=null,r.value=g},displaySearch:s}}},J={key:0,class:"user-item"},K={class:"user-item__content"},O={class:"user-item__btn"},W={key:1,class:"user-item"},X={class:"user-item__content"},ee={class:"user-item__nickname"},te={class:"user-item__id"},se={class:"user-item__name"},ae={key:2,class:"search-container"},ne=["onClick"],oe={class:"search-candidate__nickname"},ie={class:"search-candidate__id"},le={class:"search-candidate__name"};function ce(i,t,c,e,m,r){return n(),o("form",{class:"invite-form",onSubmit:t[6]||(t[6]=U(()=>{},["prevent"]))},[e.selected?(n(),o("div",W,[a("div",X,[a("div",ee,[k(l(e.selected.nickname)+" ",1),a("span",te,"#"+l(e.selected.id),1)]),a("div",se,l(e.selected.surname)+" "+l(e.selected.name),1),a("div",{class:"user-item__cancel",onClick:t[3]||(t[3]=s=>e.selected=null)},"\u0423\u0431\u0440\u0430\u0442\u044C")]),a("div",{class:"user-item__invite",onClick:t[5]||(t[5]=s=>e.selected=null)},[a("button",{onClick:t[4]||(t[4]=U((...s)=>e.invite&&e.invite(...s),["prevent"])),class:"btn btn-default btn-team"},"\u041F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u044C")])])):(n(),o("div",J,[a("div",K,[V(a("input",{class:"form-input__user-search",type:"text",id:"user","onUpdate:modelValue":t[0]||(t[0]=s=>e.user=s),onInput:t[1]||(t[1]=s=>e.displaySearch=!1),placeholder:"\u041D\u0430\u0439\u0442\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",autocomplete:"off"},null,544),[[B,e.user]])]),a("div",O,[a("div",{onClick:t[2]||(t[2]=(...s)=>e.search&&e.search(...s)),class:q(["btn","btn-team",{"btn-default":!e.displaySearch,"btn-border":e.displaySearch}])},l(e.displaySearch?"\u041E\u0442\u0447\u0438\u0441\u0442\u0438\u0442\u044C":"\u041D\u0430\u0439\u0442\u0438"),3)])])),e.searchCandidates&&e.user.length>0&&e.displaySearch?(n(),o("div",ae,[(n(!0),o(A,null,x(e.searchCandidates,s=>(n(),o("div",{class:"search-candidate",key:s.id,onClick:_=>e.selectUser(s)},[a("div",oe,[k(l(s.nickname)+" ",1),a("span",ie,"#"+l(s.id),1)]),a("div",le,l(s.surname)+" "+l(s.name),1)],8,ne))),128))])):h("",!0)],32)}const re=C(Z,[["render",ce]]),de={name:"AppTeamInvite",props:["invites","load"],setup(i,{emit:t}){const c=p(i.invites),e=M();return{invites:c,rejectInvite:async(s,_)=>{t("load");try{await b.delete(`/api/team-invite/${s}/delete`),c.value.splice(_,1),e.dispatch("notification/displayMessage",{value:"\u041F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u043E",type:"primary"}),t("load")}catch{t("load"),e.dispatch("notification/displayMessage",{value:"\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u0438\u0438 \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F",type:"error"})}},acceptInvite:async s=>{t("load");try{await b.post(`/api/team-invite/${s}/accept`),c.value=[],e.dispatch("notification/displayMessage",{value:"\u0412\u044B \u0432\u0441\u0442\u0443\u043F\u0438\u043B\u0438 \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0443",type:"primary"}),t("update"),t("load")}catch(_){console.log(_.message),e.dispatch("notification/displayMessage",{value:"\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0438 \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0443",type:"error"}),t("load")}}}}},me={class:"team-invites"},_e=a("h3",null,"\u041F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0443",-1),ve={class:"team-invite__item-name"},ue={class:"b500"},pe={class:"team-invite__buttons"},ge=["onClick"],he=["onClick"];function fe(i,t,c,e,m,r){return n(),o("div",me,[_e,(n(!0),o(A,null,x(e.invites,(s,_)=>(n(),o("div",{class:"team-invite__item",key:s.id},[a("div",ve,[k(" \u041A\u043E\u043C\u0430\u043D\u0434\u0430: "),a("span",ue,l(s.name),1)]),a("div",pe,[a("div",{class:"btn btn-default btn-team btn-accept",onClick:v=>e.acceptInvite(s.id)}," \u041F\u0440\u0438\u043D\u044F\u0442\u044C ",8,ge),a("div",{class:"btn btn-border btn-team btn-cancel",onClick:v=>e.rejectInvite(s.id,_)}," \u041E\u0442\u043A\u0437\u0430\u0442\u044C\u0441\u044F ",8,he)])]))),128))])}const ye=C(de,[["render",fe]]),be={name:"AppConfirmation",emits:["close","confirmation"],props:["question"],setup(i){return{question:p(i.question)}}},ke={class:"modal"},Ce={class:"modal-container"};function we(i,t,c,e,m,r){return n(),o("div",ke,[a("div",{class:"modal-background",onClick:t[0]||(t[0]=s=>i.$emit("close"))}),a("div",Ce,[a("h3",null,l(e.question),1),a("div",{class:"btn btn-cancel btn-border btn-full-width mb15",onClick:t[1]||(t[1]=s=>i.$emit("confirmation"))},"\u0414\u0430"),a("div",{class:"btn btn-accept btn-default btn-full-width",onClick:t[2]||(t[2]=s=>i.$emit("close"))},"\u041D\u0435\u0442")])])}const Ae=C(be,[["render",we]]),Ie={name:"AppCreateTeam",components:{Field:N,Form:H,ErrorMessage:P},emits:["loading","loadData"],setup(i,{emit:t}){const c=M(),e=z({name:G().required("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435").min(3,"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0442 3-\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432").max(64,"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u043E 64-\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432")});return{submit:async r=>{t("loading",!0);try{await b.post("/api/team/store",{name:r.name}),t("loadData")}catch(s){s.response.status===422?c.dispatch("notification/displayMessage",{value:"\u0422\u0430\u043A\u043E\u0435 \u0438\u043C\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442",type:"error"}):console.log(s.message)}t("loading",!1)},validationSchema:e}}},Se={class:"content-block"},xe=a("p",null,"\u0412\u044B \u043D\u0435 \u0441\u043E\u0441\u0442\u043E\u0438\u0442\u0435 \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0435 :(",-1),Me={class:"form-control"},Te=a("label",{for:"name"},"\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0441\u0432\u043E\u044E \u043A\u043E\u043C\u0430\u043D\u0434\u0443",-1),$e=a("button",{class:"btn btn-default btn-full-width"},"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443",-1);function De(i,t,c,e,m,r){const s=f("Field"),_=f("ErrorMessage"),v=f("Form");return n(),o("div",Se,[xe,I(v,{onSubmit:e.submit,"validation-schema":e.validationSchema},{default:$(()=>[a("div",Me,[Te,I(s,{name:"name"},{default:$(({field:y,errors:g})=>[a("input",R(y,{type:"text",class:["form-input",{invalid:!!g.length}],placeholder:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B"}),null,16)]),_:1}),I(_,{class:"alert",name:"name"})]),$e]),_:1},8,["onSubmit","validation-schema"])])}const Le=C(Ie,[["render",De]]),Fe="/build/assets/crown.cd3f701d.svg",Ue={name:"TheTeamSettings",components:{AppUserSearchForm:re,AppTeamInvite:ye,AppLoader:E,AppConfirmation:Ae,AppCreateTeam:Le},setup(){const i=M(),t=p(),c=p(),e=p(!1),m=p([]),r=p(),s=p(!1),_=p(!1),v=()=>{s.value=!s.value},y=async()=>{s.value=!0;try{const u=await b.get("/api/team/edit");t.value=u.data.team,c.value=u.data.invites,e.value=u.data.owner,m.value=u.data.teammates,r.value=u.data.teamInvites}catch(u){console.log(u.message)}s.value=!1};return L(async()=>{await y()}),{name,team:t,owner:e,cancelInvite:async(u,D)=>{s.value=!0;try{await b.delete(`/api/team-invite/${u}/delete`),r.value.splice(D,1),i.dispatch("notification/displayMessage",{value:"\u041F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u043E",type:"primary"})}catch(S){console.log(S.message),i.dispatch("notification/displayMessage",{value:S.message,type:"error"})}s.value=!1},teammates:m,invites:c,getData:y,removeTeammate:async(u,D)=>{s.value=!0;try{await b.post("/api/user/remove-teammate",{id:u}),u===null?await y():m.value.splice(D,1),i.dispatch("notification/displayMessage",{value:"\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u043E\u043A\u0438\u043D\u0443\u043B \u043A\u043E\u043C\u0430\u043D\u0434\u0443",type:"primary"}),_.value=!1}catch(S){console.log(S.message),i.dispatch("notification/displayMessage",{value:S.response.data.message,type:"error"})}s.value=!1},deleteTeam:async()=>{s.value=!0;try{await b.delete("/api/team/delete"),i.dispatch("notification/displayMessage",{value:"\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u0440\u0430\u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0430!",type:"primary"}),await y()}catch(u){console.log(u.message),i.dispatch("notification/displayMessage",{value:u.response.data.message,type:"error"})}_.value=!1,s.value=!1},loading:s,toggleLoad:v,leaveConfirm:_,addInvite:u=>{r.value.push(u)},teamInvites:r}}},qe={class:"dashboard-item"},Ee=a("h3",null,"\u041A\u043E\u043C\u0430\u043D\u0434\u0430",-1),Ve={key:1,class:"content-block"},Be={class:"b500"},Re={class:"teammate-container"},je={class:"user-item__content"},Ne={class:"user-item__nickname"},He={class:"user-item__id"},Pe={class:"user-item__name"},ze={key:0,class:"user-item__icon"},Ge=a("img",{src:Fe,alt:"crown"},null,-1),Qe=[Ge],Ye=["onClick"],Ze=a("div",{class:"btn btn-border btn-team btn-cancel"},"\u0418\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C",-1),Je=[Ze],Ke={key:3,class:"team-invites"},Oe={class:"user-item__content"},We={class:"user-item__nickname"},Xe={class:"user-item__id"},et={class:"user-item__name"},tt=["onClick"],st=a("div",{class:"btn btn-border btn-team btn-cancel"},"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",-1),at=[st],nt={key:0,class:"dashboard-item"};function ot(i,t,c,e,m,r){const s=f("AppLoader"),_=f("AppCreateTeam"),v=f("AppUserSearchForm"),y=f("AppConfirmation"),g=f("AppTeamInvite");return n(),o(A,null,[a("div",qe,[e.loading?(n(),w(s,{key:0})):h("",!0),Ee,e.team?(n(),o("div",Ve,[a("p",null,[k("\u0412\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430: "),a("span",Be,l(e.team.name),1)]),a("div",Re,[(n(!0),o(A,null,x(e.teammates,(d,T)=>(n(),o("div",{class:"user-item",key:d.id},[a("div",je,[a("div",Ne,[k(l(d.nickname)+" ",1),a("span",He,"#"+l(d.id),1)]),a("div",Pe,l(d.surname)+" "+l(d.name),1)]),e.team.owner_id===d.id?(n(),o("div",ze,Qe)):h("",!0),e.owner&&e.team.owner_id!==d.id?(n(),o("div",{key:1,class:"user-item__btn user-item__cancel-btn",onClick:F=>e.removeTeammate(d.id,T)},Je,8,Ye)):h("",!0)]))),128))])])):(n(),w(_,{key:2,onLoading:t[0]||(t[0]=d=>{e.loading=d}),onLoadData:t[1]||(t[1]=d=>e.getData())})),e.teamInvites&&e.teamInvites.length>0?(n(),o("div",Ke,[(n(!0),o(A,null,x(e.teamInvites,(d,T)=>(n(),o("div",{class:"user-item",key:d.id},[a("div",Oe,[a("div",We,[k(l(d.nickname)+" ",1),a("span",Xe,"#"+l(d.user_id),1)]),a("div",et,l(d.surname)+" "+l(d.name),1)]),a("div",{class:"user-item__btn",onClick:F=>e.cancelInvite(d.id,T)},at,8,tt)]))),128))])):h("",!0),e.owner&&e.teamInvites&&e.teammates&&e.teamInvites.length<3-e.teammates.length?(n(),w(v,{key:4,team_id:e.team.id,onInvite:e.addInvite,onLoad:e.toggleLoad},null,8,["team_id","onInvite","onLoad"])):h("",!0),e.owner?(n(),o("button",{key:5,class:"btn btn-border btn-full-width",onClick:t[2]||(t[2]=d=>e.leaveConfirm=!0)},"\u0420\u0430\u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443")):h("",!0),e.owner&&e.leaveConfirm?(n(),w(y,{key:6,onConfirmation:e.deleteTeam,onClose:t[3]||(t[3]=d=>e.leaveConfirm=!1),question:"\u0420\u0430\u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443?"},null,8,["onConfirmation"])):h("",!0),!e.owner&&e.team?(n(),o("button",{key:7,class:"btn btn-border btn-full-width",onClick:t[4]||(t[4]=d=>e.leaveConfirm=!0)}," \u041F\u043E\u043A\u0438\u043D\u0443\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443 ")):h("",!0),!e.owner&&e.leaveConfirm?(n(),w(y,{key:8,onConfirmation:t[5]||(t[5]=d=>e.removeTeammate(null,null)),onClose:t[6]||(t[6]=d=>e.leaveConfirm=!1),question:"\u041F\u043E\u043A\u0438\u043D\u0443\u0442\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u0443?"})):h("",!0)]),e.invites&&e.invites.length>0?(n(),o("div",nt,[I(g,{invites:e.invites,onUpdate:e.getData,onLoad:e.toggleLoad},null,8,["invites","onUpdate","onLoad"])])):h("",!0)],64)}const it=C(Ue,[["render",ot]]),lt={name:"AppDashStages",components:{AppLoader:E},props:["stage"],setup(i){const t=()=>{const v=new Date().toLocaleString("ru-RU",{timeZone:"Europe/Moscow"}).split(",");r.value=`${v[0]} ${v[1]}`},c=M(),e=p(i.stage),m=p(!1),r=p();L(()=>{t()});const s=setInterval(t,1e3);return j(()=>{clearInterval(s)}),{stage:e,loading:m,time:Q,toggleReg:async()=>{m.value=!0;try{e.value.users_exists?(await axios.post(`/api/stage/${e.value.id}/cancel`),e.value.users_exists=!1,c.dispatch("notification/displayMessage",{value:"\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0438\u0441\u044C \u043E\u0442 \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u0440\u0435\u0433\u0430\u0442\u0435",type:"primary"})):(await axios.post(`/api/stage/${e.value.id}/accept`),e.value.users_exists=!0,c.dispatch("notification/displayMessage",{value:"\u0412\u044B \u0437\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u043D\u0430 \u0440\u0435\u0433\u0430\u0442\u0443",type:"primary"}))}catch(v){console.log(v.message),c.dispatch("notification/displayMessage",{value:v.response.data.message,type:"error"})}m.value=!1},now:r}}},ct={class:"dash-stage"},rt={class:"dash-stage__header"},dt={class:"dash-stage__tournament"},mt={key:0,class:"user-stage__participant"},_t={class:"dash-stage__date"},vt={key:1,class:"btn btn-disable btn-settings-280"},ut={key:2,class:"btn btn-disable btn-settings-280"},pt={key:4,class:"btn btn-disable btn-settings-280"};function gt(i,t,c,e,m,r){const s=f("AppLoader"),_=f("router-link");return n(),o("div",ct,[e.loading?(n(),w(s,{key:0})):h("",!0),a("div",rt,[I(_,{to:`/dashboard/stage/${e.stage.id}`,class:"dash-stage__title"},{default:$(()=>[k(l(e.stage.title),1)]),_:1},8,["to"]),a("div",dt,l(e.stage.tournament),1),e.stage.users_exists?(n(),o("div",mt,"\u0412\u044B \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u0435\u0442\u0435")):h("",!0)]),a("div",_t,[a("span",null,"\u041D\u0430\u0447\u0430\u043B\u043E \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438: "+l(e.time(e.stage.register_start)),1),a("span",null,"\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438: "+l(e.time(e.stage.register_end)),1),a("span",null,"\u041D\u0430\u0447\u0430\u043B\u043E \u0433\u043E\u043D\u043E\u043A: "+l(e.time(e.stage.race_start)),1)]),e.time(e.stage.register_start)>e.now?(n(),o("div",vt," \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043D\u0435 \u043D\u0430\u0447\u0430\u043B\u0430\u0441\u044C ")):e.time(e.stage.race_start)<e.now&&e.stage.status!=="finished"?(n(),o("div",ut," \u0420\u0435\u0433\u0430\u0442\u0430 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 ")):e.stage.status==="active"&&e.time(e.stage.register_end)>e.now?(n(),o("div",{key:3,class:q(["btn","btn-settings-280",{"btn-default":!e.stage.users_exists},{"btn-border":e.stage.users_exists}]),onClick:t[0]||(t[0]=(...v)=>e.toggleReg&&e.toggleReg(...v))},l(e.stage.users_exists?"\u041E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u043E\u0442 \u0443\u0447\u0430\u0441\u0442\u0438\u044F":"\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u0438\u0435"),3)):(n(),o("div",pt,"\u041E\u0436\u0438\u0434\u0430\u0439\u0442\u0435"))])}const ht=C(lt,[["render",gt]]),ft={name:"AppDashActualStages",components:{AppDashStages:ht},setup(){const i=p();return L(async()=>{try{const t=await axios.get("/api/stage/actual/dashboard");i.value=t.data}catch(t){console.log(t.message)}}),{stages:i}}};function yt(i,t,c,e,m,r){const s=f("AppDashStages");return n(!0),o(A,null,x(e.stages,_=>(n(),w(s,{key:_.id,stage:_},null,8,["stage"]))),128)}const bt=C(ft,[["render",yt]]),kt={name:"Dashboard",components:{TheTeamSettings:it,AppDashActualStages:bt,AppHeader:Y},setup(){return{}}},Ct={class:"container-fluid g-0"},wt={class:"row"},At={class:"col-lg-12"},It={class:"dashboard-item"},St=a("h3",null,"\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0433\u043E\u043D\u043A\u0438",-1),xt={class:"dash-stage__container"};function Mt(i,t,c,e,m,r){const s=f("AppHeader"),_=f("AppDashActualStages");return n(),o(A,null,[I(s,null,{default:$(()=>[k("\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442")]),_:1}),a("main",null,[a("div",Ct,[a("div",wt,[a("div",At,[a("div",It,[St,a("div",xt,[I(_)])])])])])])],64)}const Ft=C(kt,[["render",Mt]]);export{Ft as default};