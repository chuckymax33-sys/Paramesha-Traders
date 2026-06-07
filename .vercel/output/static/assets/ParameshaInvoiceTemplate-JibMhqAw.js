import{r as b,j as e}from"./index-C56qAsMQ.js";const d=n=>new Intl.NumberFormat("en-IN",{maximumFractionDigits:0}).format(Math.round(n));function M(n){if(!n||n===0)return"Zero only";const m=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],u=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],w=s=>{if(s<20)return m[s];const l=Math.floor(s/10),r=s%10;return u[l]+(r?` ${m[r]}`:"")},c=s=>{const l=Math.floor(s/100),r=s%100;let x="";return l&&(x+=`${m[l]} hundred`),r&&(x+=`${l?" and ":""}${w(r)}`),x};let i=Math.floor(n);const a=[],h=Math.floor(i/1e7);h&&(a.push(`${c(h)} crore`),i%=1e7);const f=Math.floor(i/1e5);f&&(a.push(`${c(f)} lakh`),i%=1e5);const g=Math.floor(i/1e3);return g&&(a.push(`${c(g)} thousand`),i%=1e3),i&&a.push(c(i)),`${a.join(" ")} only`.replace(/\s+/g," ").trim()}function C({invoiceNo:n,invoiceDate:m,customerName:u,address:w,partyGstinNo:c,partyState:i="",partyStateCode:a="",items:h,cell1:f="9908538555",cell2:g="9959315999",bankName:s="Kotak Mahindra",branch:l="Chaitnyapuri, Dilsukhnagar",accountNo:r="0414240740",ifscCode:x="KKBK0000563",onChangeItems:N,onPrint:I}){const k=b.useRef(null),v=b.useMemo(()=>h.map(t=>({...t,amount:t.qty*t.rate})),[h]),j=b.useMemo(()=>v.reduce((t,o)=>t+o.amount,0),[v]),S=2.5,A=j*(S/100),T=j*(S/100),z=0,y=j+A+T+z,E=b.useMemo(()=>M(Math.round(y)),[y]),R=(t,o)=>{if(!N)return;const p=[...h];p[t]={...p[t],rate:o},N(p)};return e.jsxs("div",{className:"invoice-shell",children:[e.jsxs("div",{className:"invoice-page",ref:k,children:[e.jsxs("div",{className:"top-row",children:[e.jsx("div",{className:"tax-title",children:"TAX INVOICE"}),e.jsxs("div",{className:"cells",children:[e.jsxs("div",{children:["Cell : ",f]}),e.jsx("div",{children:g})]})]}),e.jsxs("div",{className:"company-block",children:[e.jsx("div",{className:"company-name",children:"PARAMESHA TRADERS"}),e.jsx("div",{className:"subtitle",children:"BUILDING MATERIAL SUPPLIERS"}),e.jsx("div",{className:"subtitle",children:"SAND, METAL, ROBO SAND, BRICKS ETC"}),e.jsx("div",{className:"address-line",children:"H.No. 3-9-545/1, Plot No. 17, Sri Rama Hills, Mansoorabad, L.B. Nagar, Hyd - 500 068."})]}),e.jsxs("div",{className:"state-row",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"State :"})," TELANGANA"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"State Code :"})," 36"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"GSTIN :"})," 36AJZPG2941A1Z8"]})]}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsxs("div",{className:"info-item",style:{flex:1,paddingRight:"16px"},children:[e.jsx("span",{className:"label",children:"Invoice No."}),e.jsx("span",{className:"value handwritten",style:{fontWeight:400,fontSize:"17px"},children:n})]}),e.jsxs("div",{className:"info-item right",style:{flex:"0 0 200px",marginTop:0,paddingTop:"1.4mm",paddingBottom:"1.4mm"},children:[e.jsx("span",{className:"label",style:{minWidth:"auto",marginRight:"6px"},children:"Date :"}),e.jsx("span",{className:"value handwritten",style:{fontSize:"17px"},children:m})]})]}),e.jsxs("div",{className:"info-item full",children:[e.jsx("span",{className:"label",children:"NAME"}),e.jsx("span",{className:"value handwritten",style:{fontWeight:400,fontSize:"17px"},children:u})]}),e.jsxs("div",{className:"info-item full",children:[e.jsx("span",{className:"label",children:"ADDRESS"}),e.jsx("span",{className:"value handwritten",style:{fontWeight:400,fontSize:"17px"},children:w})]}),e.jsxs("div",{className:"info-item full",children:[e.jsx("span",{className:"label",children:"Party GSTIN No"}),e.jsx("span",{className:"value handwritten",style:{fontWeight:800,fontSize:"16px"},children:c}),e.jsx("span",{className:"label inline-state",children:"State"}),e.jsx("span",{className:"value small handwritten",children:i}),e.jsx("span",{className:"label inline-state",children:"State Code"}),e.jsx("span",{className:"value small handwritten",children:a})]})]}),e.jsxs("table",{className:"items-table",children:[e.jsxs("colgroup",{children:[e.jsx("col",{style:{width:"5%"}}),e.jsx("col",{style:{width:"14%"}}),e.jsx("col",{style:{width:"11%"}}),e.jsx("col",{style:{width:"16%"}}),e.jsx("col",{style:{width:"12%"}}),e.jsx("col",{style:{width:"7%"}}),e.jsx("col",{style:{width:"10%"}}),e.jsx("col",{style:{width:"10%"}}),e.jsx("col",{style:{width:"15%"}})]}),e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"S.No"}),e.jsx("th",{children:"DATE"}),e.jsx("th",{children:"TRIP SHEET No."}),e.jsx("th",{children:"VEHICLE NO."}),e.jsx("th",{children:"MATERIAL"}),e.jsx("th",{children:"HSN CODE"}),e.jsx("th",{children:"QTY"}),e.jsx("th",{children:"RATE"}),e.jsx("th",{children:"AMOUNT"})]})}),e.jsx("tbody",{children:v.map((t,o)=>e.jsxs("tr",{children:[e.jsxs("td",{className:"center",children:[o+1,"."]}),e.jsx("td",{className:"handwritten",children:t.date}),e.jsx("td",{className:"handwritten",children:t.tripSheetNo}),e.jsx("td",{className:"handwritten",children:t.vehicleNo}),e.jsx("td",{className:"handwritten",children:t.material}),e.jsx("td",{className:"center handwritten",children:t.hsnCode??""}),e.jsx("td",{className:"right handwritten",children:t.qty.toFixed(3)}),e.jsx("td",{className:"right handwritten",children:N?e.jsx("input",{className:"rate-input",type:"number",value:t.rate,onChange:p=>R(o,Number(p.target.value||0))}):d(t.rate)}),e.jsx("td",{className:"right handwritten",children:d(t.amount)})]},`${t.tripSheetNo}-${o}`))})]}),e.jsxs("div",{className:"lower-section",children:[e.jsxs("div",{className:"left-side",children:[e.jsxs("div",{className:"words-box",children:[e.jsx("div",{className:"words-title",children:"TOTAL VALUE IN WORDS :"}),e.jsx("div",{className:"words-text handwritten",children:E})]}),e.jsxs("div",{className:"bank-box",children:[e.jsxs("div",{children:[e.jsx("span",{className:"bank-label",children:"Bank Name"})," : ",s]}),e.jsxs("div",{children:[e.jsx("span",{className:"bank-label",children:"Branch"})," : ",l]}),e.jsxs("div",{children:[e.jsx("span",{className:"bank-label",children:"A/c. No."})," : ",r]}),e.jsxs("div",{children:[e.jsx("span",{className:"bank-label",children:"IFSC Code"})," : ",x]})]})]}),e.jsxs("div",{className:"totals-box",children:[e.jsxs("div",{className:"total-row",children:[e.jsx("span",{children:"SUB. TOTAL"}),e.jsx("span",{className:"handwritten",children:d(j)})]}),e.jsxs("div",{className:"total-row",children:[e.jsx("span",{children:"CGST : 2.5 %"}),e.jsx("span",{className:"handwritten",children:d(A)})]}),e.jsxs("div",{className:"total-row",children:[e.jsx("span",{children:"SGST : 2.5 %"}),e.jsx("span",{className:"handwritten",children:d(T)})]}),e.jsxs("div",{className:"total-row",children:[e.jsx("span",{children:"IGST : %"}),e.jsx("span",{className:"handwritten",children:d(z)})]}),e.jsxs("div",{className:"total-row grand",children:[e.jsx("span",{children:"GTOTAL"}),e.jsx("span",{className:"handwritten",children:d(y)})]})]})]}),e.jsxs("div",{className:"footer",children:[e.jsxs("div",{className:"customer-sign",children:[e.jsx("div",{className:"sign-line handwritten"}),e.jsx("div",{children:"Customer's Signature"})]}),e.jsx("div",{className:"seal-space",children:e.jsx("div",{className:"seal-circle",children:"SEAL"})}),e.jsxs("div",{className:"auth-sign",children:[e.jsxs("div",{children:["For ",e.jsx("strong",{children:"PARAMESHA TRADERS"})]}),e.jsx("div",{className:"sign-line handwritten"}),e.jsx("div",{children:"Authorised Signatory"})]})]})]}),e.jsx("style",{jsx:!0,global:!0,children:`
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
          min-height: 287mm;
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
            height: 297mm !important;
            overflow: hidden !important;
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
          .invoice-page {
            border: none !important;
            box-shadow: inset 0 0 0 4px #24336f !important;
            width: 202mm !important;
            height: 288mm !important;
            min-height: 288mm !important;
            max-height: 288mm !important;
            margin: 0 auto !important;
            overflow: hidden !important;
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        }
      `})]})}export{C as P};
