import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
const formatINR = (value) => new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0
}).format(Math.round(value));
function numberToWords(num) {
  if (!num || num === 0) return "Zero only";
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
  ];
  const twoDigits = (n2) => {
    if (n2 < 20) return ones[n2];
    const t = Math.floor(n2 / 10);
    const o = n2 % 10;
    return tens[t] + (o ? ` ${ones[o]}` : "");
  };
  const threeDigits = (n2) => {
    const h = Math.floor(n2 / 100);
    const rest = n2 % 100;
    let result = "";
    if (h) result += `${ones[h]} hundred`;
    if (rest) result += `${h ? " and " : ""}${twoDigits(rest)}`;
    return result;
  };
  let n = Math.floor(num);
  const parts = [];
  const crore = Math.floor(n / 1e7);
  if (crore) {
    parts.push(`${threeDigits(crore)} crore`);
    n %= 1e7;
  }
  const lakh = Math.floor(n / 1e5);
  if (lakh) {
    parts.push(`${threeDigits(lakh)} lakh`);
    n %= 1e5;
  }
  const thousand = Math.floor(n / 1e3);
  if (thousand) {
    parts.push(`${threeDigits(thousand)} thousand`);
    n %= 1e3;
  }
  if (n) parts.push(threeDigits(n));
  return `${parts.join(" ")} only`.replace(/\s+/g, " ").trim();
}
function ParameshaInvoiceTemplate({
  invoiceNo,
  invoiceDate,
  customerName,
  address,
  partyGstinNo,
  partyState = "",
  partyStateCode = "",
  items,
  cell1 = "9908538555",
  cell2 = "9959315999",
  bankName = "Kotak Mahindra",
  branch = "Chaitnyapuri, Dilsukhnagar",
  accountNo = "0414240740",
  ifscCode = "KKBK0000563",
  onChangeItems,
  onPrint
}) {
  const printRef = reactExports.useRef(null);
  const enrichedItems = reactExports.useMemo(
    () => items.map((item, index) => ({
      ...item,
      amount: item.qty * item.rate,
      globalIndex: index
    })),
    [items]
  );
  const subtotal = reactExports.useMemo(
    () => enrichedItems.reduce((sum, item) => sum + item.amount, 0),
    [enrichedItems]
  );
  const gstRate = 2.5;
  const cgst = subtotal * (gstRate / 100);
  const sgst = subtotal * (gstRate / 100);
  const igst = 0;
  const grandTotal = subtotal + cgst + sgst + igst;
  const totalWords = reactExports.useMemo(
    () => numberToWords(Math.round(grandTotal)),
    [grandTotal]
  );
  const updateRate = (index, rate) => {
    if (!onChangeItems) return;
    const next = [...items];
    next[index] = { ...next[index], rate };
    onChangeItems(next);
  };
  const ITEMS_PER_PAGE_FIRST = 15;
  const ITEMS_PER_PAGE_MIDDLE = 30;
  const ITEMS_PER_PAGE_LAST = 20;
  const chunks = [];
  let remaining = [...enrichedItems];
  if (remaining.length === 0) {
    chunks.push([]);
  } else {
    while (remaining.length > 0) {
      if (chunks.length === 0) {
        if (remaining.length <= ITEMS_PER_PAGE_FIRST) {
          chunks.push(remaining);
          remaining = [];
        } else {
          chunks.push(remaining.slice(0, ITEMS_PER_PAGE_FIRST));
          remaining = remaining.slice(ITEMS_PER_PAGE_FIRST);
        }
      } else {
        if (remaining.length <= ITEMS_PER_PAGE_LAST) {
          chunks.push(remaining);
          remaining = [];
        } else if (remaining.length <= ITEMS_PER_PAGE_MIDDLE) {
          const take = remaining.length - 5;
          chunks.push(remaining.slice(0, take));
          remaining = remaining.slice(take);
        } else {
          chunks.push(remaining.slice(0, ITEMS_PER_PAGE_MIDDLE));
          remaining = remaining.slice(ITEMS_PER_PAGE_MIDDLE);
        }
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "invoice-shell", ref: printRef, children: [
    chunks.map((chunk, pageIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: pageIndex < chunks.length - 1 ? "print-page-break" : "",
        style: { padding: "5mm 0" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "invoice-page",
            style: { minHeight: "280mm" },
            children: [
              pageIndex === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-row", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tax-title", children: [
                    "TAX INVOICE ",
                    chunks.length > 1 ? `(Page ${pageIndex + 1} of ${chunks.length})` : ""
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cells", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      "Cell : ",
                      cell1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: cell2 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "company-block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "company-name", children: "PARAMESHA TRADERS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "subtitle", children: "BUILDING MATERIAL SUPPLIERS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "subtitle", children: "SAND, METAL, ROBO SAND, BRICKS ETC" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "address-line", children: "H.No. 3-9-545/1, Plot No. 17, Sri Rama Hills, Mansoorabad, L.B. Nagar, Hyd - 500 068." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "state-row", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "State :" }),
                    " TELANGANA"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "State Code :" }),
                    " 36"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "GSTIN :" }),
                    " 36AJZPG2941A1Z8"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-grid", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", style: { flex: 1, paddingRight: "16px" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Invoice No." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value handwritten", style: { fontWeight: 400, fontSize: "17px" }, children: invoiceNo })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item right", style: { flex: "0 0 200px", marginTop: 0, paddingTop: "1.4mm", paddingBottom: "1.4mm" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", style: { minWidth: "auto", marginRight: "6px" }, children: "Date :" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value handwritten", style: { fontSize: "17px" }, children: invoiceDate })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "NAME" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value handwritten", style: { fontWeight: 400, fontSize: "17px" }, children: customerName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "ADDRESS" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value handwritten", style: { fontWeight: 400, fontSize: "17px" }, children: address })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Party GSTIN No" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value handwritten", style: { fontWeight: 800, fontSize: "16px" }, children: partyGstinNo }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label inline-state", children: "State" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value small handwritten", children: partyState }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label inline-state", children: "State Code" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value small handwritten", children: partyStateCode })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "items-table", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("colgroup", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "5%" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "14%" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "11%" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "16%" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "12%" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "7%" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "10%" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "10%" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("col", { style: { width: "15%" } })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "S.No" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "DATE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "TRIP SHEET No." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "VEHICLE NO." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "MATERIAL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "HSN CODE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "QTY" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "RATE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "AMOUNT" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: chunk.map((item, localIndex) => {
                  const globalIndex = item.globalIndex;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "center", children: [
                      globalIndex + 1,
                      "."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "handwritten", children: item.date }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "handwritten", children: item.tripSheetNo }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "handwritten", children: item.vehicleNo }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "handwritten", children: item.material }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "center handwritten", children: item.hsnCode ?? "" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "right handwritten", children: item.qty.toFixed(3) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "right handwritten", children: onChangeItems ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        className: "rate-input",
                        type: "number",
                        value: item.rate,
                        onChange: (e) => updateRate(globalIndex, Number(e.target.value || 0))
                      }
                    ) : formatINR(item.rate) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "right handwritten", children: formatINR(item.amount) })
                  ] }, `${item.tripSheetNo}-${globalIndex}`);
                }) })
              ] }),
              pageIndex === chunks.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lower-section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "left-side", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "words-box", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "words-title", children: "TOTAL VALUE IN WORDS :" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "words-text handwritten", children: totalWords })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bank-box", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bank-label", children: "Bank Name" }),
                        " : ",
                        bankName
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bank-label", children: "Branch" }),
                        " : ",
                        branch
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bank-label", children: "A/c. No." }),
                        " : ",
                        accountNo
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bank-label", children: "IFSC Code" }),
                        " : ",
                        ifscCode
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "totals-box", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "total-row", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SUB. TOTAL" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "handwritten", children: formatINR(subtotal) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "total-row", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CGST : 2.5 %" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "handwritten", children: formatINR(cgst) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "total-row", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SGST : 2.5 %" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "handwritten", children: formatINR(sgst) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "total-row", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "IGST : %" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "handwritten", children: formatINR(igst) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "total-row grand", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GTOTAL" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "handwritten", children: formatINR(grandTotal) })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "customer-sign", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sign-line handwritten" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Customer's Signature" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seal-space", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seal-circle", children: "SEAL" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-sign", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      "For ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PARAMESHA TRADERS" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sign-line handwritten" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Authorised Signatory" })
                  ] })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "20px", fontStyle: "italic", color: "#666" }, children: "Continued on next page..." })
            ]
          }
        )
      },
      pageIndex
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { jsx: true, global: true, children: `
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
      ` })
  ] });
}
export {
  ParameshaInvoiceTemplate as P
};
