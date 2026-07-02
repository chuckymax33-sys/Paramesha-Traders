import{r as w,j as e}from"./index-DLMhZaPM.js";const m=o=>new Intl.NumberFormat("en-IN",{maximumFractionDigits:0}).format(Math.round(o));function $(o){if(!o||o===0)return"Zero only";const g=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],N=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],v=r=>{if(r<20)return g[r];const c=Math.floor(r/10),h=r%10;return N[c]+(h?` ${g[h]}`:"")},x=r=>{const c=Math.floor(r/100),h=r%100;let f="";return c&&(f+=`${g[c]} hundred`),h&&(f+=`${c?" and ":""}${v(h)}`),f};let l=Math.floor(o);const d=[],p=Math.floor(l/1e7);p&&(d.push(`${x(p)} crore`),l%=1e7);const j=Math.floor(l/1e5);j&&(d.push(`${x(j)} lakh`),l%=1e5);const u=Math.floor(l/1e3);return u&&(d.push(`${x(u)} thousand`),l%=1e3),l&&d.push(x(l)),`${d.join(" ")} only`.replace(/\s+/g," ").trim()}function _({invoiceNo:o,invoiceDate:g,customerName:N,address:v,partyGstinNo:x,partyState:l="",partyStateCode:d="",items:p,cell1:j="9908538555",cell2:u="9959315999",bankName:r="Kotak Mahindra",branch:c="Chaitnyapuri, Dilsukhnagar",accountNo:h="0414240740",ifscCode:f="KKBK0000563",onChangeItems:y,onPrint:B}){const P=w.useRef(null),S=w.useMemo(()=>p.map((i,a)=>({...i,amount:i.qty*i.rate,globalIndex:a})),[p]),b=w.useMemo(()=>S.reduce((i,a)=>i+a.amount,0),[S]),R=2.5,z=b*(R/100),I=b*(R/100),M=0,A=b+z+I+M,D=w.useMemo(()=>$(Math.round(A)),[A]),C=(i,a)=>{if(!y)return;const s=[...p];s[i]={...s[i],rate:a},y(s)},T=15,E=30,L=20,n=[];let t=[...S];if(t.length===0)n.push([]);else for(;t.length>0;)if(n.length===0)t.length<=T?(n.push(t),t=[]):(n.push(t.slice(0,T)),t=t.slice(T));else if(t.length<=L)n.push(t),t=[];else if(t.length<=E){const i=t.length-5;n.push(t.slice(0,i)),t=t.slice(i)}else n.push(t.slice(0,E)),t=t.slice(E);return e.jsxs("div",{className:"invoice-shell",ref:P,children:[n.map((i,a)=>e.jsx("div",{className:a<n.length-1?"print-page-break":"",style:{padding:"5mm 0"},children:e.jsxs("div",{className:"invoice-page",style:{minHeight:"280mm"},children:[a===0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"top-row",children:[e.jsxs("div",{className:"tax-title",children:["TAX INVOICE ",n.length>1?`(Page ${a+1} of ${n.length})`:""]}),e.jsxs("div",{className:"cells",children:[e.jsxs("div",{children:["Cell : ",j]}),e.jsx("div",{children:u})]})]}),e.jsxs("div",{className:"company-block",children:[e.jsx("div",{className:"company-name",children:"PARAMESHA TRADERS"}),e.jsx("div",{className:"subtitle",children:"BUILDING MATERIAL SUPPLIERS"}),e.jsx("div",{className:"subtitle",children:"SAND, METAL, ROBO SAND, BRICKS ETC"}),e.jsx("div",{className:"address-line",children:"H.No. 3-9-545/1, Plot No. 17, Sri Rama Hills, Mansoorabad, L.B. Nagar, Hyd - 500 068."})]}),e.jsxs("div",{className:"state-row",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"State :"})," TELANGANA"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"State Code :"})," 36"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"GSTIN :"})," 36AJZPG2941A1Z8"]})]}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsxs("div",{className:"info-item",style:{flex:1,paddingRight:"16px"},children:[e.jsx("span",{className:"label",children:"Invoice No."}),e.jsx("span",{className:"value handwritten",style:{fontWeight:400,fontSize:"17px"},children:o})]}),e.jsxs("div",{className:"info-item right",style:{flex:"0 0 200px",marginTop:0,paddingTop:"1.4mm",paddingBottom:"1.4mm"},children:[e.jsx("span",{className:"label",style:{minWidth:"auto",marginRight:"6px"},children:"Date :"}),e.jsx("span",{className:"value handwritten",style:{fontSize:"17px"},children:g})]})]}),e.jsxs("div",{className:"info-item full",children:[e.jsx("span",{className:"label",children:"NAME"}),e.jsx("span",{className:"value handwritten",style:{fontWeight:400,fontSize:"17px"},children:N})]}),e.jsxs("div",{className:"info-item full",children:[e.jsx("span",{className:"label",children:"ADDRESS"}),e.jsx("span",{className:"value handwritten",style:{fontWeight:400,fontSize:"17px"},children:v})]}),e.jsxs("div",{className:"info-item full",children:[e.jsx("span",{className:"label",children:"Party GSTIN No"}),e.jsx("span",{className:"value handwritten",style:{fontWeight:800,fontSize:"16px"},children:x}),e.jsx("span",{className:"label inline-state",children:"State"}),e.jsx("span",{className:"value small handwritten",children:l}),e.jsx("span",{className:"label inline-state",children:"State Code"}),e.jsx("span",{className:"value small handwritten",children:d})]})]})]}),e.jsxs("table",{className:"items-table",children:[e.jsxs("colgroup",{children:[e.jsx("col",{style:{width:"5%"}}),e.jsx("col",{style:{width:"14%"}}),e.jsx("col",{style:{width:"11%"}}),e.jsx("col",{style:{width:"16%"}}),e.jsx("col",{style:{width:"12%"}}),e.jsx("col",{style:{width:"7%"}}),e.jsx("col",{style:{width:"10%"}}),e.jsx("col",{style:{width:"10%"}}),e.jsx("col",{style:{width:"15%"}})]}),e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"S.No"}),e.jsx("th",{children:"DATE"}),e.jsx("th",{children:"TRIP SHEET No."}),e.jsx("th",{children:"VEHICLE NO."}),e.jsx("th",{children:"MATERIAL"}),e.jsx("th",{children:"HSN CODE"}),e.jsx("th",{children:"QTY"}),e.jsx("th",{children:"RATE"}),e.jsx("th",{children:"AMOUNT"})]})}),e.jsx("tbody",{children:i.map((s,H)=>{const k=s.globalIndex;return e.jsxs("tr",{children:[e.jsxs("td",{className:"center",children:[k+1,"."]}),e.jsx("td",{className:"handwritten",children:s.date}),e.jsx("td",{className:"handwritten",children:s.tripSheetNo}),e.jsx("td",{className:"handwritten",children:s.vehicleNo}),e.jsx("td",{className:"handwritten",children:s.material}),e.jsx("td",{className:"center handwritten",children:s.hsnCode??""}),e.jsx("td",{className:"right handwritten",children:s.qty.toFixed(3)}),e.jsx("td",{className:"right handwritten",children:y?e.jsx("input",{className:"rate-input",type:"number",value:s.rate,onChange:G=>C(k,Number(G.target.value||0))}):m(s.rate)}),e.jsx("td",{className:"right handwritten",children:m(s.amount)})]},`${s.tripSheetNo}-${k}`)})})]}),a===n.length-1?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"lower-section",children:[e.jsxs("div",{className:"left-side",children:[e.jsxs("div",{className:"words-box",children:[e.jsx("div",{className:"words-title",children:"TOTAL VALUE IN WORDS :"}),e.jsx("div",{className:"words-text handwritten",children:D})]}),e.jsxs("div",{className:"bank-box",children:[e.jsxs("div",{children:[e.jsx("span",{className:"bank-label",children:"Bank Name"})," : ",r]}),e.jsxs("div",{children:[e.jsx("span",{className:"bank-label",children:"Branch"})," : ",c]}),e.jsxs("div",{children:[e.jsx("span",{className:"bank-label",children:"A/c. No."})," : ",h]}),e.jsxs("div",{children:[e.jsx("span",{className:"bank-label",children:"IFSC Code"})," : ",f]})]})]}),e.jsxs("div",{className:"totals-box",children:[e.jsxs("div",{className:"total-row",children:[e.jsx("span",{children:"SUB. TOTAL"}),e.jsx("span",{className:"handwritten",children:m(b)})]}),e.jsxs("div",{className:"total-row",children:[e.jsx("span",{children:"CGST : 2.5 %"}),e.jsx("span",{className:"handwritten",children:m(z)})]}),e.jsxs("div",{className:"total-row",children:[e.jsx("span",{children:"SGST : 2.5 %"}),e.jsx("span",{className:"handwritten",children:m(I)})]}),e.jsxs("div",{className:"total-row",children:[e.jsx("span",{children:"IGST : %"}),e.jsx("span",{className:"handwritten",children:m(M)})]}),e.jsxs("div",{className:"total-row grand",children:[e.jsx("span",{children:"GTOTAL"}),e.jsx("span",{className:"handwritten",children:m(A)})]})]})]}),e.jsxs("div",{className:"footer",children:[e.jsxs("div",{className:"customer-sign",children:[e.jsx("div",{className:"sign-line handwritten"}),e.jsx("div",{children:"Customer's Signature"})]}),e.jsx("div",{className:"seal-space",children:e.jsx("div",{className:"seal-circle",children:"SEAL"})}),e.jsxs("div",{className:"auth-sign",children:[e.jsxs("div",{children:["For ",e.jsx("strong",{children:"PARAMESHA TRADERS"})]}),e.jsx("div",{className:"sign-line handwritten"}),e.jsx("div",{children:"Authorised Signatory"})]})]})]}):e.jsx("div",{style:{flex:1,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:"20px",fontStyle:"italic",color:"#666"},children:"Continued on next page..."})]})},a)),e.jsx("style",{jsx:!0,global:!0,children:`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f4f4f4;
          font-family: Arial, Helvetica, sans-serif;
        }

        .invoice-shell {
          width: 100%;
          padding: 0; /* removed padding to fit properly inside my layout */
        }

        .actions {
          max-width: 210mm;
          margin: 0 auto 12px auto;
          display: flex;
          justify-content: flex-end;
        }

        .print-btn {
          border: none;
          padding: 10px 16px;
          border-radius: 10px;
          background: #1f3a8a;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        .invoice-page {
          width: 200mm;
          min-height: 280mm;
          margin: 0 auto;
          background: white;
          border: 4px solid #24336f;
          padding: 6mm 6mm 5mm 6mm;
          color: #111;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .top-row {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          font-size: 12px;
          line-height: 1.2;
          position: relative;
        }

        .tax-title {
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.6px;
          color: #24336f;
          pointer-events: none;
        }

        .cells {
          width: 34%;
          text-align: right;
          font-weight: 700;
          color: #24336f;
        }

        .company-block {
          text-align: center;
          margin-top: 2mm;
          padding-bottom: 2mm;
          border-bottom: 1.5px solid #24336f;
        }

        .company-name {
          font-size: 30px;
          font-weight: 900;
          color: #24336f;
          letter-spacing: 1px;
          line-height: 1.1;
        }

        .subtitle {
          font-size: 15px;
          font-weight: 700;
          color: #24336f;
          line-height: 1.15;
          margin-top: 1mm;
        }

        .address-line {
          margin-top: 1mm;
          font-size: 12px;
          color: #333;
        }

        .state-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1.25fr;
          border-bottom: 1.5px solid #24336f;
          font-size: 12px;
          font-weight: 700;
          color: #24336f;
        }

        .state-row > div {
          padding: 2.2mm 2mm 1.8mm;
          border-right: 1px solid #24336f;
          text-align: center;
        }

        .state-row > div:last-child {
          border-right: none;
        }

        .info-grid {
          border-bottom: 1.5px solid #24336f;
          padding-top: 2mm;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 1.4mm 0;
          font-size: 12px;
        }

        .info-item.full {
          border-top: 1px solid transparent;
        }

        .info-item.right {
          justify-content: flex-end;
        }

        .label {
          font-weight: 700;
          color: #24336f;
          font-size: 14px;
          min-width: 95px;
        }

        .inline-state {
          margin-left: 14px;
          min-width: auto;
        }

        .value {
          flex: 1;
          display: flex;
          align-items: flex-end;
          border-bottom: 1px solid #24336f;
          min-height: 20px;
          padding: 0 4px 2px 4px;
        }

        .value.small {
          flex: 0 0 120px;
          min-width: 120px;
        }

        .handwritten {
          letter-spacing: 1px;
          word-spacing: 3px;
          font-weight: 500;
          color: #000;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          margin-top: 0;
          font-size: 12px;
        }

        .items-table th,
        .items-table td {
          border: 1px solid #24336f;
          padding: 2mm 1.5mm;
          vertical-align: top;
          overflow: hidden;
          word-wrap: break-word;
        }

        .items-table th {
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #24336f;
          line-height: 1.1;
        }

        .center {
          text-align: center;
        }

        .right {
          text-align: right;
        }

        .rate-input {
          width: 100%;
          border: none;
          outline: none;
          text-align: right;
          font: inherit;
          background: transparent;
          padding: 0;
        }

        .lower-section {
          display: grid;
          grid-template-columns: 1fr 240px;
          border-left: 1px solid #24336f;
          border-right: 1px solid #24336f;
          border-bottom: 1px solid #24336f;
        }

        .left-side {
          border-right: 1px solid #24336f;
        }

        .words-box {
          min-height: 20mm;
          padding: 2mm;
          border-bottom: 1px solid #24336f;
        }

        .words-title {
          font-size: 12px;
          font-weight: 700;
          color: #24336f;
          margin-bottom: 1mm;
        }

        .for-company {
          font-size: 11px;
          margin-bottom: 12mm;
        }

        .words-text {
          font-size: 14px;
          line-height: 1.4;
          text-transform: lowercase;
        }

        .bank-box {
          padding: 3mm 2mm;
          font-size: 14px;
          line-height: 1.8;
        }

        .bank-label {
          display: inline-block;
          min-width: 85px;
          font-weight: 700;
        }

        .totals-box {
          display: grid;
          grid-template-rows: repeat(5, 1fr);
        }

        .signatures {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: auto;
          padding: 0 5mm;
          padding-bottom: 2mm;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #24336f;
          padding: 3mm 2mm;
          font-size: 14px;
          font-weight: 700;
          color: #24336f;
        }

        .total-row:last-child {
          border-bottom: none;
        }

        .grand {
          font-size: 16px;
        }

        .footer {
          display: grid;
          grid-template-columns: 1fr 120px 1fr;
          align-items: end;
          gap: 8px;
          min-height: 28mm;
          padding-top: 2mm;
        }

        .customer-sign,
        .auth-sign {
          text-align: center;
          font-size: 12px;
          color: #24336f;
        }

        .sign-line {
          width: 85%;
          margin: 0 auto 8px auto;
          border-bottom: 1px solid #24336f;
          min-height: 22px;
        }

        .seal-space {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .seal-circle {
          width: 82px;
          height: 82px;
          border: 2px solid #666;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #666;
          font-weight: 700;
          opacity: 0.85;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body, html {
            /* removed height limit to allow multi-page print */
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: white !important;
            padding: 4mm !important;
            box-sizing: border-box !important;
          }
          .invoice-shell {
            padding: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
          }
          .print-page-break {
            page-break-after: always;
            break-after: page;
          }
          .invoice-page {
            border: none !important;
            box-shadow: inset 0 0 0 4px #24336f !important;
            width: 202mm !important;
            margin: 0 auto !important;
          }
        }
      `})]})}export{_ as P};
