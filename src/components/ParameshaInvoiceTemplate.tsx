import React, { useMemo, useRef, useState } from "react";

export type InvoiceItem = {
  date: string;
  tripSheetNo: string;
  vehicleNo: string;
  material: string;
  hsnCode?: string;
  qty: number;
  rate: number;
};

export type InvoiceProps = {
  invoiceNo: string;
  invoiceDate: string;
  customerName: string;
  address: string;
  partyGstinNo: string;
  partyState?: string;
  partyStateCode?: string;

  items: InvoiceItem[];

  cell1?: string;
  cell2?: string;

  bankName?: string;
  branch?: string;
  accountNo?: string;
  ifscCode?: string;

  onChangeItems?: (items: InvoiceItem[]) => void;
  onPrint?: () => void;
};

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));

function numberToWords(num: number): string {
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
    "nineteen",
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
    "ninety",
  ];

  const twoDigits = (n: number): string => {
    if (n < 20) return ones[n];
    const t = Math.floor(n / 10);
    const o = n % 10;
    return tens[t] + (o ? ` ${ones[o]}` : "");
  };

  const threeDigits = (n: number): string => {
    const h = Math.floor(n / 100);
    const rest = n % 100;
    let result = "";
    if (h) result += `${ones[h]} hundred`;
    if (rest) result += `${h ? " and " : ""}${twoDigits(rest)}`;
    return result;
  };

  let n = Math.floor(num);
  const parts: string[] = [];

  const crore = Math.floor(n / 10000000);
  if (crore) {
    parts.push(`${threeDigits(crore)} crore`);
    n %= 10000000;
  }

  const lakh = Math.floor(n / 100000);
  if (lakh) {
    parts.push(`${threeDigits(lakh)} lakh`);
    n %= 100000;
  }

  const thousand = Math.floor(n / 1000);
  if (thousand) {
    parts.push(`${threeDigits(thousand)} thousand`);
    n %= 1000;
  }

  if (n) parts.push(threeDigits(n));

  return `${parts.join(" ")} only`.replace(/\s+/g, " ").trim();
}

export default function ParameshaInvoiceTemplate({
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
  onPrint,
}: InvoiceProps) {
  const printRef = useRef<HTMLDivElement | null>(null);

  const enrichedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        amount: item.qty * item.rate,
      })),
    [items]
  );

  const subtotal = useMemo(
    () => enrichedItems.reduce((sum, item) => sum + item.amount, 0),
    [enrichedItems]
  );

  const gstRate = 2.5;
  const cgst = subtotal * (gstRate / 100);
  const sgst = subtotal * (gstRate / 100);
  const igst = 0;
  const grandTotal = subtotal + cgst + sgst + igst;

  const totalWords = useMemo(
    () => numberToWords(Math.round(grandTotal)),
    [grandTotal]
  );

  const updateRate = (index: number, rate: number) => {
    if (!onChangeItems) return;
    const next = [...items];
    next[index] = { ...next[index], rate };
    onChangeItems(next);
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
      return;
    }
    window.print();
  };

  return (
    <div className="invoice-shell">
      <div className="invoice-page" ref={printRef}>
        <div className="top-row">
          <div className="tax-title">TAX INVOICE</div>
          <div className="cells">
            <div>Cell : {cell1}</div>
            <div>{cell2}</div>
          </div>
        </div>

        <div className="company-block">
          <div className="company-name">PARAMESHA TRADERS</div>
          <div className="subtitle">BUILDING MATERIAL SUPPLIERS</div>
          <div className="subtitle">SAND, METAL, ROBO SAND, BRICKS ETC</div>
          <div className="address-line">
            H.No. 3-9-545/1, Plot No. 17, Sri Rama Hills, Mansoorabad, L.B. Nagar,
            Hyd - 500 068.
          </div>
        </div>

        <div className="state-row">
          <div>
            <strong>State :</strong> TELANGANA
          </div>
          <div>
            <strong>State Code :</strong> 36
          </div>
          <div>
            <strong>GSTIN :</strong> 36AJZPG2941A1Z8
          </div>
        </div>

        <div className="info-grid">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="info-item" style={{ flex: 1, paddingRight: "16px" }}>
              <span className="label">Invoice No.</span>
              <span className="value handwritten" style={{ fontWeight: 400, fontSize: "17px" }}>{invoiceNo}</span>
            </div>

            <div className="info-item right" style={{ flex: "0 0 200px", marginTop: 0, paddingTop: "1.4mm", paddingBottom: "1.4mm" }}>
              <span className="label" style={{ minWidth: "auto", marginRight: "6px" }}>Date :</span>
              <span className="value handwritten" style={{ fontSize: "17px" }}>{invoiceDate}</span>
            </div>
          </div>

          <div className="info-item full">
            <span className="label">NAME</span>
            <span className="value handwritten" style={{ fontWeight: 400, fontSize: "17px" }}>{customerName}</span>
          </div>

          <div className="info-item full">
            <span className="label">ADDRESS</span>
            <span className="value handwritten" style={{ fontWeight: 400, fontSize: "17px" }}>{address}</span>
          </div>

          <div className="info-item full">
            <span className="label">Party GSTIN No</span>
            <span className="value handwritten" style={{ fontWeight: 800, fontSize: "16px" }}>{partyGstinNo}</span>
            <span className="label inline-state">State</span>
            <span className="value small handwritten">{partyState}</span>
            <span className="label inline-state">State Code</span>
            <span className="value small handwritten">{partyStateCode}</span>
          </div>
        </div>

        <table className="items-table">
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>S.No</th>
              <th>DATE</th>
              <th>TRIP SHEET No.</th>
              <th>VEHICLE NO.</th>
              <th>MATERIAL</th>
              <th>HSN CODE</th>
              <th>QTY</th>
              <th>RATE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>

          <tbody>
            {enrichedItems.map((item, index) => (
              <tr key={`${item.tripSheetNo}-${index}`}>
                <td className="center">{index + 1}.</td>
                <td className="handwritten">{item.date}</td>
                <td className="handwritten">{item.tripSheetNo}</td>
                <td className="handwritten">{item.vehicleNo}</td>
                <td className="handwritten">{item.material}</td>
                <td className="center handwritten">{item.hsnCode ?? ""}</td>
                <td className="right handwritten">{item.qty.toFixed(3)}</td>
                <td className="right handwritten">
                  {onChangeItems ? (
                    <input
                      className="rate-input"
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        updateRate(index, Number(e.target.value || 0))
                      }
                    />
                  ) : (
                    formatINR(item.rate)
                  )}
                </td>
                <td className="right handwritten">{formatINR(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="lower-section">
          <div className="left-side">
            <div className="words-box">
              <div className="words-title">TOTAL VALUE IN WORDS :</div>
              <div className="words-text handwritten">{totalWords}</div>
            </div>

            <div className="bank-box">
              <div>
                <span className="bank-label">Bank Name</span> : {bankName}
              </div>
              <div>
                <span className="bank-label">Branch</span> : {branch}
              </div>
              <div>
                <span className="bank-label">A/c. No.</span> : {accountNo}
              </div>
              <div>
                <span className="bank-label">IFSC Code</span> : {ifscCode}
              </div>
            </div>
          </div>

          <div className="totals-box">
            <div className="total-row">
              <span>SUB. TOTAL</span>
              <span className="handwritten">{formatINR(subtotal)}</span>
            </div>
            <div className="total-row">
              <span>CGST : 2.5 %</span>
              <span className="handwritten">{formatINR(cgst)}</span>
            </div>
            <div className="total-row">
              <span>SGST : 2.5 %</span>
              <span className="handwritten">{formatINR(sgst)}</span>
            </div>
            <div className="total-row">
              <span>IGST : %</span>
              <span className="handwritten">{formatINR(igst)}</span>
            </div>
            <div className="total-row grand">
              <span>GTOTAL</span>
              <span className="handwritten">{formatINR(grandTotal)}</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="customer-sign">
            <div className="sign-line handwritten" />
            <div>Customer's Signature</div>
          </div>

          <div className="seal-space">
            <div className="seal-circle">SEAL</div>
          </div>

          <div className="auth-sign">
            <div>For <strong>PARAMESHA TRADERS</strong></div>
            <div className="sign-line handwritten" />
            <div>Authorised Signatory</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
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
      `}</style>
    </div>
  );
}
