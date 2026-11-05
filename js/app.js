const MESH_CATALOG = [
// família, número, espaçamento L/T (cm), fio L/T (mm), As L/T (cm²/m), massa (kg/m²)
["Q",61,15,15,3.4,3.4,0.61,0.61,0.97],["Q",75,15,15,3.8,3.8,0.75,0.75,1.21],["Q",92,15,15,4.2,4.2,0.92,0.92,1.48],["Q",113,10,10,3.8,3.8,1.13,1.13,1.80],["Q",138,10,10,4.2,4.2,1.38,1.38,2.20],["Q",166,10,10,4.6,4.6,1.66,1.66,2.63],["Q",196,10,10,5,5,1.96,1.96,3.11],["Q",238,10,10,5.5,5.5,2.38,2.38,3.77],["Q",283,10,10,6,6,2.83,2.83,4.48],["Q",335,15,15,8,8,3.35,3.35,5.37],["Q",385,10,10,7,7,3.85,3.85,6.10],["Q",503,10,10,8,8,5.03,5.03,7.97],["Q",709,10,10,9.5,9.5,7.09,7.09,11.24],["Q",785,10,10,10,10,7.85,7.85,12.46],
["T",92,30,15,4.2,4.2,0.46,0.92,1.12],["T",113,30,10,3.8,3.8,0.38,1.13,1.22],["T",138,30,10,4.2,4.2,0.46,1.38,1.49],["T",166,30,10,4.6,4.6,0.55,1.66,1.78],["T",196,30,10,5,5,0.65,1.96,2.11],["T",238,30,10,5.5,5.5,0.79,2.38,2.55],["T",283,30,10,6,6,0.94,2.83,3.03],["T",335,30,15,6,8,0.94,3.35,3.45],["T",385,30,10,6,7,0.94,3.85,3.84],["T",503,30,10,6,8,0.94,5.03,4.76],
["L",113,10,30,3.8,3.8,1.13,0.38,1.21],["L",138,10,30,4.2,4.2,1.38,0.46,1.47],["L",166,10,30,4.6,4.6,1.66,0.55,1.77],["L",196,10,30,5,5,1.96,0.65,2.09],["L",238,10,30,5.5,5.5,2.38,0.79,2.52],["L",283,10,30,6,6,2.83,0.94,3.00],["L",335,15,30,8,6,3.35,0.94,3.48],["L",385,10,30,7,6,3.85,0.94,3.82],["L",503,10,30,8,6,5.03,0.94,4.77],["L",709,10,30,9.5,6,7.09,0.94,6.42],["L",785,10,30,10,6,7.85,0.94,7.03],
["R",138,10,15,4.2,4.2,1.38,0.92,1.83],["R",166,10,15,4.6,4.6,1.66,1.11,2.20],["R",196,10,15,5,5,1.96,1.31,2.60],["R",238,10,15,5.5,5.5,2.38,1.59,3.15],["R",283,10,15,6,6,2.83,1.89,3.74],
["M",138,10,20,4.2,4.2,1.38,0.69,1.65],["M",166,10,20,4.6,4.6,1.66,0.83,1.98],["M",196,10,20,5,5,1.96,0.98,2.34],["M",238,10,20,5.5,5.5,2.38,1.19,2.83],["M",283,10,20,6,6,2.83,1.42,3.37],["M",385,10,20,7,7,3.85,1.92,4.59]
];
const MODULES = [
{id:"splice",n:"01",name:"Emendas por traspasse",desc:"Comprimento calculado automaticamente a partir do fck, bitola e aço. Apresenta boa e má aderência e os cenários normativos de percentual emendado.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["phi","Ø BARRA =",10,"bitola"],["steel","Tipo de aço", "CA-50","steel"]]},
{id:"anchor",n:"02",name:"Ancoragem",desc:"Selecione fck, bitola, aço e configuração Lb1 (reta) ou Lbe (gancho). O diâmetro interno mínimo do pino é calculado automaticamente conforme a Tabela 9.1 da ABNT NBR 6118:2023 e apresentado nos resultados para conferência.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["phi","Ø BARRA =",10,"bitola"],["steel","Tipo de aço","CA-50","steel"],["anchorType","Configuração da ancoragem","Lb1","anchorType"],["coverOK","Cobrimento normal ao plano do gancho ≥ 3φ?","Não","yesno"],["angle","Ângulo do gancho (graus)",180,"select",[90,135,180]],]},
{id:"bend",n:"03",name:"Dobras de armaduras",desc:"Dobra de armadura longitudinal conforme ABNT NBR 6118:2023, com diâmetro interno do pino e ponta reta calculados automaticamente.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["phi","Ø BARRA =",8,"bitola"],["steel","Tipo de aço","CA-50","steel"],["angle","Ângulo da dobra (graus)",180,"select",[90,135,180]]]},
{id:"straight",n:"04",name:"Distribuição reta",desc:"Calcula número de barras com espaçamento máximo e distribuição uniforme entre as extremidades.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["length","Comprimento da forma (cm)",1350,"number"],["coverL","Cobrimento/afastamento esquerdo (cm)",0,"number"],["coverR","Cobrimento/afastamento direito (cm)",0,"number"],["spacing","Espaçamento máximo (cm)",50,"number"]]},
{id:"circular",n:"05",name:"Distribuição circular",desc:"Distribui barras igualmente em 360°. O raio deve ser medido na linha dos eixos das barras.",fields:[["radius","Raio da distribuição (cm)",100,"number"],["spacing","Espaçamento máximo no arco (cm)",30,"number"],["start","Ângulo inicial (graus)",360,"number"]]},
{id:"helix",n:"06",name:"Espiral de estaca",desc:"Comprimento geométrico da hélice, sem pontas, ganchos, emendas ou perdas de corte.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["diameter","Diâmetro da linha de centro da espiral (cm)",15,"number"],["height","Altura da espiral (cm)",40,"number"],["pitch","Passo (cm)",5,"number"],["phi","Ø BARRA =",8,"bitola"],["tail","Adicional para pontas/fechamento (cm)",0,"number"]]},
{id:"mesh",n:"07",name:"Telas soldadas",desc:"Quantitativo de telas soldadas por família e designação do catálogo Gerdau. Informe a área e o acréscimo estimado de consumo.",fields:[["meshType","Família da tela","Q","meshType"],["meshNumber","Número da tela",785,"meshNumber"],["area","Área aplicada (m²)",11.52,"number"],["overlap","Acréscimo estimado (%)",10,"number"]]},
{id:"beam",n:"08",name:"Distribuição em vigas",desc:"Verificação preliminar de acomodação em camadas. Informe barras, largura interna disponível e espaçamentos mínimos calculados.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["width","Largura interna disponível (cm)",18,"number"],["aggregate","Dimensão máxima do agregado (mm)",19,"number"],["stirrup","Diâmetro do estribo (mm)",8,"number"],["cover","Cobrimento lateral (cm)",5,"number"],["bars","Quantidade de barras longitudinais",5,"number"],["phi","Ø BARRA =",12.5,"bitola"],["hspace","Espaçamento livre horizontal mínimo (cm)",2.28,"number"],["vspace","Espaçamento livre vertical mínimo (cm)",2,"number"],["layers","Número máximo de camadas",3,"number"]]},
{id:"convert",n:"09",name:"Conversão de bitolas",desc:"Calcula quantidade inteira de barras para manter área geométrica igual ou superior. A equivalência de área não autoriza substituição sem aprovação do projetista.",fields:[["fck","fck do concreto (MPa)",30,"fck"],["oldPhi","Ø BARRA ORIGINAL =",12.5,"bitola"],["oldQty","Quantidade original",5,"number"],["newPhi","Ø BARRA SUBSTITUTA =",10,"bitola"]]}
];
const $=s=>document.querySelector(s), nav=$("#moduleNav"), cards=$("#moduleCards");
let current=null, lastResult=null;
const fmt=(n,d=2)=>Number(n).toLocaleString("pt-BR",{minimumFractionDigits:d,maximumFractionDigits:d});
const num=(v)=>Number(v);
function fieldHTML(f){
 let [id,label,value,type,opts]=f;
 const isMm=label.includes("(mm)") || type==="bitola";
 const displayLabel=type==="bitola"?label:label.replace(/\\s*\\(mm\\)/i,"");
 let control="";
 if(type==="meshType") control=`<select id="${id}">${["Q","T","L","R","M"].map(x=>`<option value="${x}" ${x===value?"selected":""}>${x}</option>`).join("")}</select>`;
 else if(type==="meshNumber") {const fam=document.querySelector("#meshType")?.value||"Q";control=`<select id="${id}">${MESH_CATALOG.filter(x=>x[0]===fam).map(x=>`<option value="${x[1]}" ${Number(x[1])===Number(value)?"selected":""}>${x[1]}</option>`).join("")}</select>`;}
 else if(type==="select") control=`<select id="${id}">${opts.map(x=>`<option value="${x}" ${x===value?"selected":""}>${x}°</option>`).join("")}</select>`;
 else if(type==="bitola") control=`<select id="${id}">${[5,6.3,8,10,12.5,16,20,25,32,40].map(x=>`<option value="${x}" ${Number(x)===Number(value)?"selected":""}>${String(x).replace(".",",")}</option>`).join("")}</select>`;
 else if(type==="fck") control=`<select id="${id}" class="fck-select">
  <option value="9" ${Number(value)===9?"selected":""}>9 MPa</option>
  <option value="12" ${Number(value)===12?"selected":""}>12 MPa</option>
  <option value="15" ${Number(value)===15?"selected":""}>15 MPa</option>
  <option value="20" ${Number(value)===20?"selected":""}>20 MPa</option>
  <option value="25" ${Number(value)===25?"selected":""}>25 MPa</option>
  <option value="30" ${Number(value)===30?"selected":""}>30 MPa</option>
  <option value="35" ${Number(value)===35?"selected":""}>35 MPa</option>
  <option value="40" ${Number(value)===40?"selected":""}>40 MPa</option>
  <option value="45" ${Number(value)===45?"selected":""}>45 MPa</option>
  <option value="50" ${Number(value)===50?"selected":""}>50 MPa</option>
</select>`;
 else if(type==="steel") control=`<select id="${id}"><option value="CA-50" ${value==="CA-50"?"selected":""}>CA-50</option><option value="CA-60" ${value==="CA-60"?"selected":""}>CA-60</option></select>`;
 else if(type==="anchorType") control=`<select id="${id}"><option value="Lb1" ${value==="Lb1"?"selected":""}>Lb1 — Reto (boa aderência)</option><option value="Lbe" ${value==="Lbe"?"selected":""}>Lbe — Gancho (má aderência)</option></select>`;
 else if(type==="yesno") control=`<select id="${id}"><option value="Não" ${value==="Não"?"selected":""}>Não</option><option value="Sim" ${value==="Sim"?"selected":""}>Sim</option></select>`;
 else control=`<input id="${id}" type="${type}" value="${value}" ${type==="number"?'step="any"':''}>`;
 const unit=isMm?'<span>mm</span>':"";
 return `<div class="field ${label.length>35?"full":""}"><label for="${id}">${displayLabel}</label>${isMm?`<div class="input-unit">${control}${unit}</div>`:control}</div>`
}
function values(){let o={};current.fields.forEach(f=>o[f[0]]=$( "#"+f[0]).value);return o}
function showModule(id){current=MODULES.find(m=>m.id===id);$("#welcome").classList.add("hidden");$("#workspace").classList.remove("hidden");$("#moduleNumber").textContent="MÓDULO "+current.n;$("#moduleTitle").textContent=current.name;$("#moduleDescription").textContent=current.desc;$("#calcForm").innerHTML=`<div class="field-grid">${current.fields.map(fieldHTML).join("")}</div>`;if(id==="mesh"){$("#meshType").addEventListener("change",()=>{const opts=MESH_CATALOG.filter(x=>x[0]===$("#meshType").value);$("#meshNumber").innerHTML=opts.map(x=>`<option value="${x[1]}">${x[1]}</option>`).join("");});}$("#results").innerHTML='<div class="empty">Preencha os dados e selecione Calcular.</div>';$("#diagram").innerHTML="";lastResult=null;renderHistory();document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b.dataset.id===id));}
MODULES.forEach(m=>{let b=document.createElement("button");b.dataset.id=m.id;b.innerHTML=`<span class="nav-num">${m.n}</span>${m.name}`;b.onclick=()=>showModule(m.id);nav.append(b);let c=document.createElement("button");c.className="module-card";c.innerHTML=`<span class="num">MÓDULO ${m.n}</span><b>${m.name}</b><small>${m.desc}</small>`;c.onclick=()=>showModule(m.id);cards.append(c)});
function metric(k,v){return `<div class="metric"><span>${k}</span><strong>${v}</strong></div>`}
function calculate(){
 let v=values(), out=[], notes=[], status="ok", diagram="";
 const positive=(...keys)=>keys.every(k=>Number(v[k])>0);
 const phi=()=>num(v.phi);
 switch(current.id){
 case "splice":{
  const fck=num(v.fck), d=num(v.phi), fyk=v.steel==="CA-60"?600:500, gammaS=1.15, gammaC=1.4;
  if(![9,12,15,20,25,30,35,40,45,50].includes(fck)||!d||!["CA-50","CA-60"].includes(v.steel))throw Error("Selecione um fck disponível, bitola e tipo de aço.");
  if(fck<20){status="warn";notes.push("ATENÇÃO: fck inferior a 20 MPa. Este valor está abaixo da classe mínima usual para concreto estrutural armado na ABNT NBR 6118. Os resultados são apenas estimativos e não devem ser adotados como dimensionamento normativo sem enquadramento técnico específico.");}
  if(d>32){status="bad";out=[["Bitola selecionada",String(d).replace(".",",")+" mm"],["Emenda por traspasse","NÃO PERMITIDA"]];notes.push("A NBR 6118 não permite emenda por traspasse de barras com diâmetro superior a 32 mm. Avaliar luva, solda ou solução específica de projeto.");break}
  const fctkinf=0.21*Math.pow(fck,2/3), fctd=fctkinf/gammaC;
  const eta1=2.25, eta3=d<=32?1:(132-d)/100, fyd=fyk/gammaS;
  const calc=(eta2)=>{
    const fbd=eta1*eta2*eta3*fctd;
    const lb=(d/4)*(fyd/fbd);
    const lbnec=Math.max(lb,0.3*lb,10*d,100);
    return {fbd,lb,lbnec};
  };
  const good=calc(1.0), poor=calc(0.7);
  const pctCases=[["Até 20%",1.2],["25%",1.4],["33%",1.6],["50%",1.8],["> 50%",2.0]];
  const rows=(obj,label)=>pctCases.map(([pct,a])=>({pct,a,l0:Math.max(a*obj.lbnec,0.3*a*obj.lb,15*d,200)}));
  const g=rows(good), p=rows(poor);
  out=[
   ["fck selecionado",fmt(fck,0)+" MPa"],["Aço selecionado",v.steel],["Bitola selecionada",String(d).replace(".",",")+" mm"],
   ["Resistência de aderência fbd — boa",fmt(good.fbd)+" MPa"],["Resistência de aderência fbd — má",fmt(poor.fbd)+" MPa"],
   ["Ancoragem básica lb — boa",fmt(good.lb/10)+" cm"],["Ancoragem básica lb — má",fmt(poor.lb/10)+" cm"],
   ["Ancoragem necessária adotada — boa",fmt(good.lbnec/10)+" cm"],["Ancoragem necessária adotada — má",fmt(poor.lbnec/10)+" cm"]
  ];
  const table=`<div class="norm-table-wrap"><h3>Comprimento de traspasse — barras tracionadas</h3><p>Percentual de barras emendadas na mesma seção e coeficiente α₀t aplicável.</p><table class="norm-table"><thead><tr><th>Barras na mesma seção</th><th>α₀t</th><th>Boa aderência</th><th>Má aderência</th></tr></thead><tbody>${pctCases.map(([pct,a],i)=>`<tr><td>${pct}</td><td>${fmt(a,1)}</td><td>${fmt(g[i].l0/10)} cm</td><td>${fmt(p[i].l0/10)} cm</td></tr>`).join("")}</tbody></table></div>`;
  notes.push("O fator α₀t não é digitado: é selecionado automaticamente pela faixa de barras emendadas na mesma seção. A tabela apresenta todos os cenários para escolha de detalhamento.");
  notes.push("Cálculo-base: CA nervurado (η₁=2,25), η₂=1,0 para boa aderência e 0,7 para má aderência; γc=1,4 e γs=1,15. A razão As,calc/As,ef foi considerada igual a 1,00 por não haver dimensionamento da armadura conectado ao módulo.");
  notes.push("Verificar Tabela 9.3, armadura transversal, afastamento entre barras emendadas, cobrimento, confinamento, posição da emenda e demais condições dos itens 9.4 e 9.5 da ABNT NBR 6118. Para barras comprimidas aplica-se expressão distinta.");
  diagram=table;
  break}
 case "anchor":{
  const d=num(v.phi), fck=num(v.fck), fyk=v.steel==="CA-60"?600:500, gammaS=1.15, gammaC=1.4;
  if(![9,12,15,20,25,30,35,40,45,50].includes(fck)||!d||!["CA-50","CA-60"].includes(v.steel))throw Error("Selecione fck, bitola e tipo de aço válidos.");
  if(!["Lb1","Lbe"].includes(v.anchorType))throw Error("Selecione a configuração da ancoragem.");
  const eta2=v.anchorType==="Lb1"?1.0:0.7;
  const fctd=0.21*Math.pow(fck,2/3)/gammaC, fyd=fyk/gammaS, eta1=2.25, eta3=d<=32?1:(132-d)/100;
  const fbd=eta1*eta2*eta3*fctd, lb=(d/4)*(fyd/fbd);
  const lbmin=Math.max(0.3*lb,10*d,100), alpha=(v.anchorType==="Lbe"&&v.coverOK==="Sim")?0.7:1.0;
  const lbnec=Math.max(alpha*lb,lbmin);
  let pinFactor=null, pinStatus="";
  if(v.steel==="CA-50") pinFactor=d<20?5:8;
  else if(v.steel==="CA-60"&&d<20) pinFactor=6;
  if(pinFactor) pinStatus=`${fmt(pinFactor,0)} × φ = ${fmt(pinFactor*d,1)} mm`;
  else pinStatus="Sem valor tabelado para esta combinação na Tabela 9.1";
  const angle=num(v.angle);
  if(v.anchorType==="Lbe"&&![90,135,180].includes(angle))throw Error("Verifique o ângulo do gancho.");
  let arc=0, hookLength=0;
  if(v.anchorType==="Lbe"&&pinFactor){
    const r=(pinFactor*d+d)/2/10; arc=r*(angle*Math.PI/180); hookLength=arc;
  }
  out=[["Configuração selecionada",v.anchorType==="Lb1"?"Lb1 — Reto":"Lbe — Gancho"],["fck selecionado",fmt(fck,0)+" MPa"],["Tipo de aço",v.steel],["Bitola",String(d).replace(".",",")+" mm"],["Condição de aderência adotada",v.anchorType==="Lb1"?"Boa aderência":"Má aderência"],["Resistência de aderência fbd",fmt(fbd)+" MPa"],["Comprimento básico lb",fmt(lb/10)+" cm"],["Comprimento mínimo lb,min",fmt(lbmin/10)+" cm"],["Comprimento necessário adotado",fmt(lbnec/10)+" cm"]];
  if(v.anchorType==="Lbe"){
    out.push(["Diâmetro interno mínimo do pino — conferência",pinStatus]);
    if(pinFactor)out.push(["Comprimento geométrico do arco do gancho",fmt(arc)+" cm"],["Redução por gancho aplicada (α)",fmt(alpha,1)]);
    else out.push(["Desenvolvimento geométrico do gancho","Não calculado — verificar pino"]);
  }
  if(fck<20){status="warn";notes.push("ATENÇÃO: fck inferior a 20 MPa. Valor abaixo da classe mínima usual para concreto estrutural armado. Resultado apenas estimativo.");}
  if(v.anchorType==="Lbe"&&v.coverOK!=="Sim")notes.push("A redução α=0,7 não foi aplicada porque não foi confirmado cobrimento no plano normal ao gancho ≥ 3φ. Foi mantido α=1,0.");
  notes.push("Diâmetro interno mínimo calculado pela Tabela 9.1 da ABNT NBR 6118:2023: CA-50, 5φ para bitolas <20 mm e 8φ para bitolas ≥20 mm; CA-60, 6φ para bitolas <20 mm. Para CA-60 com bitola ≥20 mm não há valor tabelado nessa tabela.");
  notes.push("Atenção: a condição de boa ou má aderência não é determinada simplesmente pela presença de gancho; depende da posição da barra durante a concretagem, conforme item 9.3.1. A seleção Lb1/Lbe identifica os cenários de cálculo solicitados, mas a classificação real deve ser confirmada no projeto.");
  notes.push("A relação As,calc/As,ef foi considerada igual a 1,00 por não haver integração com o dimensionamento estrutural. Verificar confinamento, armadura transversal, cobrimento e força a ancorar.");
  diagram=`<svg viewBox="0 0 360 130" role="img"><path d="M35 25 H145 A45 45 0 0 1 145 115 H310" fill="none" stroke="#078b55" stroke-width="5"/><text x="35" y="17" font-size="11" fill="#536779">Esquema ilustrativo do eixo da barra</text></svg>`;
  break}
 case "bend":{
  const d=num(v.phi), angle=num(v.angle), steel=v.steel||"CA-50";
  if(!(d>0)||![90,135,180].includes(angle))throw Error("Verifique a bitola e o ângulo da dobra.");
  let pinFactor=null;
  if(steel==="CA-50") pinFactor=d<20?5:8;
  else if(steel==="CA-60"&&d<20) pinFactor=6;
  if(!pinFactor)throw Error("A ABNT NBR 6118:2023 não apresenta diâmetro de pino tabelado para CA-60 com bitola ≥ 20 mm. Verifique solução específica.");
  const pin=pinFactor*d, r=(pin+d)/2/10, a=angle*Math.PI/180, arc=r*a;
  const straightFactor=angle===180?2:(angle===135?4:8), straight=straightFactor*d/10, total=arc+straight;
  out=[["Tipo de armadura","Longitudinal"],["Tipo de aço",steel],["Diâmetro interno mínimo do pino",`${fmt(pinFactor,0)} × φ = ${fmt(pin,1)} mm`],["Raio interno",fmt(pin/20)+" cm"],["Raio pelo eixo da barra",fmt(r)+" cm"],["Ângulo da dobra",fmt(angle,0)+"°"],["Ponta reta mínima",`${straightFactor} × φ = ${fmt(straight,2)} cm`],["Comprimento do arco",fmt(arc)+" cm"],["Comprimento geométrico (arco + ponta reta)",fmt(total)+" cm"]];
  notes.push("Critérios para ganchos de armaduras longitudinais de tração: ABNT NBR 6118:2023, item 9.4.2.3 e Tabela 9.1. A ponta reta mínima depende da geometria: 2φ para gancho semicircular, 4φ para ângulo interno de 45° e 8φ para ângulo reto.");
  diagram=`<svg viewBox="0 0 360 130" role="img"><path d="M45 20 H150 A45 45 0 0 1 150 110 H300" fill="none" stroke="#078b55" stroke-width="5"/></svg>`;break}
 case "straight":{
  let L=num(v.length)-num(v.coverL)-num(v.coverR), s=num(v.spacing);if(L<=0||s<=0)throw Error("Comprimento útil e espaçamento devem ser positivos.");
  let intervals=Math.ceil(L/s), bars=intervals+1, actual=L/intervals;out=[["Comprimento útil",fmt(L)+" cm"],["Intervalos",intervals],["Quantidade de barras",bars],["Espaçamento real",fmt(actual)+" cm"]];notes.push("Distribuição uniforme com barras nas duas extremidades do comprimento útil. Confirmar se os afastamentos informados representam eixo de barra ou face da forma.");break}
 case "circular":{
  if(!positive("radius","spacing"))throw Error("Raio e espaçamento devem ser positivos.");let C=2*Math.PI*num(v.radius), n=Math.ceil(C/num(v.spacing)), e=C/n, ang=360/n;out=[["Comprimento da circunferência",fmt(C)+" cm"],["Quantidade de barras",n],["Espaçamento real no arco",fmt(e)+" cm"],["Ângulo entre barras",fmt(ang,4)+"°"]];notes.push("Raio considerado na linha de centro das barras. Verificar diâmetro efetivo da seção, cobrimento, estribos e geometria da peça.");diagram=`<svg viewBox="0 0 240 240"><circle cx="120" cy="120" r="88" fill="none" stroke="#9aaab7" stroke-width="2"/>${Array.from({length:Math.min(n,180)},(_,i)=>{let a=(num(v.start)+i*360/n)*Math.PI/180;return `<circle cx="${120+88*Math.cos(a)}" cy="${120+88*Math.sin(a)}" r="3.4" fill="#078b55"/>`}).join("")}<circle cx="120" cy="120" r="3" fill="#17324d"/></svg>`;break}
 case "helix":{
  if(!positive("diameter","height","pitch","phi")||num(v.tail)<0)throw Error("Diâmetro, altura, passo e bitola devem ser positivos.");let turns=num(v.height)/num(v.pitch), length=turns*Math.sqrt(Math.pow(Math.PI*num(v.diameter),2)+Math.pow(num(v.pitch),2))+num(v.tail);out=[["Número de voltas (altura/passo)",fmt(turns,2)],["Comprimento geométrico da hélice",fmt(length-num(v.tail))+" cm"],["Adicional informado",fmt(v.tail)+" cm"],["Comprimento total estimado",fmt(length)+" cm"],["Peso linear teórico",fmt(Math.pow(num(v.phi),2)/162)+" kg/m"],["Peso estimado",fmt(length/100*Math.pow(num(v.phi),2)/162)+" kg"]];notes.push("O comprimento é calculado na linha de centro da espiral. Conferir passo variável, trechos de ponta, ganchos, emendas, tolerâncias e detalhamento específico da estaca.");break}
 case "mesh":{
  if(!positive("area")||num(v.overlap)<0)throw Error("A área deve ser positiva e o acréscimo não pode ser negativo.");
  const mesh=MESH_CATALOG.find(x=>x[0]===v.meshType&&String(x[1])===String(v.meshNumber));if(!mesh)throw Error("Selecione uma designação de tela válida para a família escolhida.");
  const [,n,spaceL,spaceT,wireL,wireT,asL,asT,mass]=mesh, area=num(v.area), pct=num(v.overlap), kg=area*mass, totalArea=area*(1+pct/100), totalKg=kg*(1+pct/100), panelArea=2.45*6, panels=totalArea/panelArea;
  out=[["Designação da tela",`${v.meshType} ${n}`],["Área informada",fmt(area)+" m²"],["Massa nominal da tela",fmt(mass)+" kg/m²"],["Área sem acréscimo",fmt(area)+" m²"],["Massa sem acréscimo",fmt(kg)+" kg"],["Acréscimo adotado",fmt(pct)+" %"],["Área com acréscimo",fmt(totalArea)+" m²"],["Massa com acréscimo",fmt(totalKg)+" kg"],["Painéis equivalentes sem acréscimo",fmt(area/panelArea,2)+" un. (2,45 × 6,00 m)"],["Painéis equivalentes com acréscimo",fmt(panels,2)+" un. (2,45 × 6,00 m)"],["Fio longitudinal",fmt(wireL,1)+" mm"],["Espaçamento longitudinal",fmt(spaceL,1)+" cm"],["Aço longitudinal nominal",fmt(asL)+" cm²/m"],["Fio transversal",fmt(wireT,1)+" mm"],["Espaçamento transversal",fmt(spaceT,1)+" cm"],["Aço transversal nominal",fmt(asT)+" cm²/m"]];
  notes.push("Dados dimensionais e massa nominal conforme catálogo de telas soldadas Gerdau consultado para esta versão. Confirmar a especificação comercial vigente no fornecimento.");
  notes.push("O percentual informado é um acréscimo estimado de consumo aplicado igualmente à área e à massa. Não representa percentual obrigatório da ABNT NBR 6118.");
  notes.push("Painéis equivalentes são uma conversão teórica pela área nominal de 14,70 m² por painel. Não representam paginação, quantidade inteira de painéis nem cálculo geométrico de recortes e sobreposições. Para área irregular, o consumo real depende do formato e da distribuição das telas.");break}
 case "beam":{
  if(!positive("width","aggregate","bars","phi","hspace","vspace","layers")||num(v.cover)<0)throw Error("Verifique os dados de seção, barras e espaçamentos.");
  let w=num(v.width), p=num(v.phi)/10, hmin=Math.max(2,num(v.hspace)), vmin=Math.max(2,num(v.vspace)), maxLayers=Math.floor(num(v.layers));
  let perLayer=Math.floor((w+hmin)/(p+hmin));let remain=num(v.bars), dist=[];for(let i=0;i<maxLayers&&remain>0;i++){let count=Math.min(perLayer,remain);dist.push(count);remain-=count}
  let pass=remain===0;out=[["Largura interna disponível",fmt(w)+" cm"],["Espaçamento livre horizontal adotado",fmt(hmin)+" cm"],["Capacidade estimada por camada",perLayer+" barras"],["Distribuição por camada",dist.map((x,i)=>`C${i+1}: ${x}`).join(" · ")||"—"],["Barras não acomodadas",remain],["Resultado preliminar",pass?"Barras acomodadas":"Seção insuficiente"]];if(!pass)status="bad";else if(dist.length>1)status="warn";
  notes.push("Modelo simplificado de empacotamento em camadas iguais. Não verifica posição individual, estribos, cobrimentos, interferência com barras transversais, ancoragens, diâmetro do agregado pela fórmula normativa ou condições reais de concretagem. Validar com desenho da seção e NBR 6118 vigente.");diagram=`<svg viewBox="0 0 340 210"><rect x="55" y="12" width="230" height="185" fill="none" stroke="#334b60" stroke-width="5"/>${dist.map((cnt,li)=>Array.from({length:cnt},(_,i)=>{let step=230/(cnt+1);return `<circle cx="${55+step*(i+1)}" cy="${35+li*55}" r="${p*3.2}" fill="#286c9d" stroke="#153d5c"/>`}).join("")).join("")}<text x="170" y="207" text-anchor="middle" font-size="10" fill="#526477">Esquema ilustrativo · não executivo</text></svg>`;break}
 case "convert":{
  if(!positive("oldPhi","oldQty","newPhi"))throw Error("Bitolas e quantidade devem ser positivas.");let aOld=Math.PI*Math.pow(num(v.oldPhi),2)/4/100, aNew=Math.PI*Math.pow(num(v.newPhi),2)/4/100, As=aOld*num(v.oldQty), n=Math.ceil(As/aNew), supplied=n*aNew;out=[["Área original por barra",fmt(aOld,4)+" cm²"],["Área total original",fmt(As,4)+" cm²"],["Área da barra substituta",fmt(aNew,4)+" cm²"],["Quantidade substituta",n+" barras"],["Área substituta fornecida",fmt(supplied,4)+" cm²"],["Diferença de área",fmt(supplied-As,4)+" cm²"]];notes.push("Equivalência geométrica de área. Substituição exige aprovação do projetista e nova verificação de resistência, ductilidade, espaçamentos, ancoragem, emendas, fissuração e detalhamento.");break}
 }
 if(v.fck!==undefined){
  const fck=num(v.fck);
  if(!out.some(x=>x[0]==="fck selecionado"))out.unshift(["fck selecionado",fmt(fck,0)+" MPa"]);
  if(fck<20){
   status=status==="bad"?"bad":"warn";
   notes.unshift("ATENÇÃO: fck de "+fmt(fck,0)+" MPa. Valor inferior à classe mínima usual de concreto estrutural armado da ABNT NBR 6118. Nos módulos em que o fck não participa diretamente da fórmula, ele é registrado como dado do concreto; nos módulos de ancoragem/emenda, o resultado é apenas estimativo e exige enquadramento técnico específico.");
  }else if(!["splice","anchor"].includes(current.id)){
   notes.unshift("O fck foi registrado como característica do concreto do projeto. Este módulo não utiliza o fck diretamente em sua fórmula de cálculo.");
  }
 }
 lastResult={module:current.name,inputs:v,outputs:out,notes,status,date:new Date().toISOString()};renderResult(lastResult,diagram);
}
function renderResult(r,diagram=""){let html=r.outputs.map(x=>metric(x[0],x[1])).join("");let cls=r.status==="bad"?"bad":r.status==="warn"?"warn":"";html+=`<div class="status ${cls}">${r.status==="bad"?"NÃO ATENDE — revisar geometria":r.status==="warn"?"ATENÇÃO — revisar distribuição em camadas":"RESULTADO CALCULADO — conferir critérios de projeto"}</div>`;html+=`<div class="result-note">${r.notes.map(x=>"• "+x).join("<br>")}</div>`;$("#results").innerHTML=html;$("#diagram").innerHTML=diagram;}
function historyKey(){return "sia-history-"+current.id}
function renderHistory(){let h=JSON.parse(localStorage.getItem(historyKey())||"[]");$("#history").innerHTML=h.length?h.slice().reverse().map(x=>`<div class="history-item"><span>${new Date(x.date).toLocaleString("pt-BR")} · ${x.module}</span><b>${x.outputs[0]?.[1]||"Cálculo"}</b></div>`).join(""):'<div class="empty">Nenhum cálculo salvo neste módulo.</div>'}
$("#calculate").onclick=()=>{try{calculate()}catch(e){$("#results").innerHTML=`<div class="status bad">${e.message}</div>`}};
$("#saveResult").onclick=()=>{if(!lastResult){alert("Calcule antes de salvar.");return}let h=JSON.parse(localStorage.getItem(historyKey())||"[]");h.push(lastResult);localStorage.setItem(historyKey(),JSON.stringify(h));renderHistory()};
$("#resetModule").onclick=()=>showModule(current.id);
$("#clearHistory").onclick=()=>{localStorage.removeItem(historyKey());renderHistory()};
$("#exportData").onclick=()=>{let data={app:"SIA",version:"0.3",exportedAt:new Date().toISOString(),storage:Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith("sia-history-")).map(k=>[k,localStorage.getItem(k)]))};download("sia-backup.json",JSON.stringify(data,null,2),"application/json")};
$("#importData").onchange=async e=>{let f=e.target.files[0];if(!f)return;try{let d=JSON.parse(await f.text());Object.entries(d.storage||{}).forEach(([k,v])=>{if(k.startsWith("sia-history-"))localStorage.setItem(k,v)});alert("Backup importado.");if(current)renderHistory()}catch{alert("Arquivo JSON inválido.")}};
function download(name,content,type){let a=document.createElement("a"),u=URL.createObjectURL(new Blob([content],{type}));a.href=u;a.download=name;a.click();URL.revokeObjectURL(u)}