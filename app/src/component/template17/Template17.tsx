import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template17Props {
  formData: FormData;
}

// Helper: truncate a string to show first N and last M characters
const truncateString = (str: string, startChars: number, endChars: number): string => {
  if (!str) return '';
  if (str.length <= startChars + endChars) return str;
  const start = str.slice(0, startChars);
  const end = str.slice(-endChars);
  return `${start}...${end}`;
};

// Format recipient address: first 7, last 7 characters → "TDii6va...8xcqYx"
const formatRecipient = (recipient: string) => truncateString(recipient, 7, 7);

// Format USD amount with commas and 2 decimal places
const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Exchange rate USDT → USD (small realistic variation)
const USDT_TO_USD_RATE = 1.001;

const Template17: React.FC<Template17Props> = ({ formData }) => {
  // Parse amount (remove commas if any)
  const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 3.960836;
  const amountDisplay = formData.amount ? `${formData.amount} USDT` : "3.960836 USDT";
  
  // Calculate USD equivalent using the rate
  const usdValue = rawAmount * USDT_TO_USD_RATE;
  const usdEquivalent = formatUSD(usdValue); // e.g., "$3.96"
  const usdDisplay = usdEquivalent.replace('$', ''); // remove $ sign because template already has "$" in the span

  // Date and time display (format: "Mar 7,4:09AM")
  // If formData.date is provided in that format, use it; otherwise combine or fallback
  const dateDisplay = formData.date || "Mar 7, 4:09 AM";
  
  // Network fee (static or from formData)
  const feeDisplay = formData.fee !== undefined ? `${formData.fee} TRX` : "0 TRX";

  // Time in status bar (top right)
  const timeDisplay = formData.time || "10:54";
  
  // Format recipient (sender address)
  const recipientFormatted = formatRecipient(formData.sender || "TDii6va8xcqYx");

  return (
    <>
      <style>{`:root {
  --default-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei",
    "Source Han Sans CN", sans-serif;
}

.main-container {
  overflow: hidden;
}

.main-container,
.main-container * {
  box-sizing: border-box;
}

input,
select,
textarea,
button {
  outline: 0;
}

.main-container {
  position: relative;
  width: 359.375px;
  height: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
}
.root {
  position: absolute;
  height: 800px;
  top: 0;
  right: 0;
  left: 0;
  background: #ffffff;
}
.groups {
  position: absolute;
  width: 359.375px;
  height: 46.25px;
  right: 0;
  bottom: 753.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 36;
}
.time-span {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 288.125px;
  bottom: 11.875px;
  color: #272727;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 500;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 44;
}
.image {
  position: absolute;
  width: 28.75px;
  height: 14.375px;
  right: 31.25px;
  bottom: 12.5px;
  background: url(/images/template17/zeCM4UsL2n.png)
    no-repeat center;
  background-size: cover;
  z-index: 37;
}
.image-1 {
  position: absolute;
  width: 21.875px;
  height: 13.125px;
  right: 89.375px;
  bottom: 13.125px;
  background: url(/images/template17/hgZJCij1wZ.png)
    no-repeat center;
  background-size: cover;
  z-index: 39;
}
.image-2 {
  position: absolute;
  width: 16.875px;
  height: 13.125px;
  right: 66.25px;
  bottom: 13.125px;
  background: url(/images/template17/QxnkepQD1N.png)
    no-repeat center;
  background-size: cover;
  z-index: 38;
}
.image-3 {
  position: absolute;
  width: 12.5px;
  height: 11.25px;
  right: 229.375px;
  bottom: 13.125px;
  background: url(/images/template17/brfn5JJorH.png)
    no-repeat center;
  background-size: cover;
  z-index: 41;
}
.image-4 {
  position: absolute;
  width: 12.5px;
  height: 11.25px;
  right: 249.375px;
  bottom: 13.125px;
  background: url(/images/template17/OXA3yQsAFP.png)
    no-repeat center;
  background-size: cover;
  z-index: 42;
}
.image-5 {
  position: absolute;
  width: 12.5px;
  height: 11.25px;
  right: 269.375px;
  bottom: 13.125px;
  background: url(/images/template17/vW6dAs6867.png)
    no-repeat center;
  background-size: cover;
  z-index: 43;
}
.image-6 {
  position: absolute;
  width: 5px;
  height: 4.375px;
  right: 213.125px;
  bottom: 17.5px;
  background: url(/images/template17/FYBwO8Eqcf.png)
    no-repeat center;
  background-size: cover;
  z-index: 40;
}
.flex-row {
  position: absolute;
  width: 350.625px;
  height: 800px;
  right: 0;
  bottom: 0;
  z-index: 17;
}
.background {
  position: absolute;
  width: 1.25px;
  height: 800px;
  right: 0;
  bottom: 0;
  background: url(/images/template17/T5YTNEkOUm.png)
    no-repeat center;
  background-size: cover;
  z-index: 2;
}
.background-7 {
  position: absolute;
  width: 340.625px;
  height: 123.375px;
  right: 9.375px;
  bottom: 510px;
  background: #f4f4f6;
  border: 3.75px solid #ffffff;
  z-index: 17;
}
.groups-8 {
  position: relative;
  width: 336.25px;
  height: 115.625px;
  margin: 1.875px 0 0 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 16;
  overflow: visible auto;
}
.flex-row-bfb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 308.125px;
  height: 18.125px;
  margin: 11.875px 0 0 15px;
  z-index: 28;
}
.date {
  flex-shrink: 0;
  position: relative;
  height: 15px;
  color: #7d7d7f;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 28;
}
.mar-7-4-09am {
  flex-shrink: 0;
  position: relative;
  height: 18.125px;
  color: #424244;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 600;
  line-height: 18.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 27;
}
.flex-row-ba {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 309.375px;
  height: 18px;
  margin: 19.375px 0 0 14.375px;
  z-index: 25;
}
.status {
  flex-shrink: 0;
  position: relative;
  height: 15px;
  color: #858587;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 25;
}
.completed {
  flex-shrink: 0;
  position: relative;
  height: 18px;
  color: #3d3d3f;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  white-space: nowrap;
  z-index: 24;
}
.groups-9 {
  position: relative;
  width: 333.75px;
  height: 39.375px;
  margin: 7.625px 0 0 0.63px;
  background: rgba(0, 0, 0, 0);
  z-index: 19;
}
.tdiiva-8xcqyx {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18px;
  right: 10.625px;
  bottom: 9.5px;
  color: #535355;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  white-space: nowrap;
  z-index: 21;
}
.recipient {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17.5px;
  right: 258.875px;
  bottom: 9.375px;
  color: #78787a;
    font-family: Inter, var(--default-font-family);
    font-size: 14.375px;
    font-weight: 500;
    line-height: 15px;
    text-align: left;
  white-space: nowrap;
  z-index: 22;
}
.groups-a {
  position: absolute;
  width: 340px;
  height: 243.75px;
  right: 10.625px;
  bottom: 383.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
}
.groups-b {
  position: relative;
  width: 336.25px;
  height: 40.625px;
  margin: 137.5px 0 0 2.5px;
  background: rgba(0, 0, 0, 0);
  z-index: 9;
  overflow: visible auto;
}
.background-c {
  position: relative;
  width: 333.125px;
  height: 37.5px;
  margin: 2.5px 0 0 1.875px;
  background: #f3f3f6;
  z-index: 10;
  border-radius: 3.75px;
}
.o-trx {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 15.625px;
  bottom: 11.875px;
  color: #444446;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 700;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.network-fee {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 231.875px;
  bottom: 11.25px;
  color: #78787a;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 500;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.image-d {
  position: absolute;
  width: 11.25px;
  height: 11.25px;
  right: 216.875px;
  bottom: 13.125px;
  background: url(/images/template17/G6WmUZsYLd.png)
    no-repeat center;
  background-size: cover;
  z-index: 14;
}
.groups-e {
  position: relative;
  width: 340px;
  height: 45.625px;
  margin: 20px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
  overflow: visible auto;
}
.background-f {
  position: relative;
  width: 333.125px;
  height: 38.125px;
  margin: 5px 0 0 4.375px;
  background: #f4f3f6;
  z-index: 5;
  border-radius: 3.75px;
}
.more-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 230.625px;
  bottom: 11.25px;
  color: #49494b;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 500;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 8;
}
.image-10 {
  position: absolute;
  width: 6.25px;
  height: 9.375px;
  right: 18.75px;
  bottom: 14.375px;
  background: url(/images/template17/kOHiAyVcu0.png)
    no-repeat center;
  background-size: cover;
  z-index: 7;
}
.background-11 {
  position: absolute;
  width: 85.625px;
  height: 3.125px;
  right: 136.875px;
  bottom: 8.125px;
  background: url(/images/template17/CrRrfdBDpZ.png)
    no-repeat center;
  background-size: cover;
  z-index: 1;
}
.groups-12 {
  position: absolute;
  width: 359.375px;
  height: 40px;
  right: 0;
  bottom: 708.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 32;
}
.transfer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17.5px;
  right: 143.125px;
  bottom: 10.625px;
  color: #3e3e3e;
  font-family: Inter, var(--default-font-family);
  font-size: 17.5px;
  font-weight: 700;
  line-height: 17.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 34;
}
.image-13 {
  position: absolute;
  width: 13.125px;
  height: 14.375px;
  right: 16.25px;
  bottom: 11.875px;
  background: url(/images/template17/2qfYtNBB2z.png)
    no-repeat center;
  background-size: cover;
  z-index: 33;
}
.image-14 {
  position: absolute;
  width: 16.25px;
  height: 13.75px;
  right: 328.75px;
  bottom: 11.875px;
  background: url(/images/template17/CgghCcyo7k.png)
    no-repeat center;
  background-size: cover;
  z-index: 35;
}
.groups-15 {
  position: absolute;
  width: 359.375px;
  height: 68.125px;
  right: 0;
  bottom: 638.125px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 29;
}
.usdt {
  display: flex;
  justify-content: center;
  position: relative;
  height: 26.25px;
  margin: 12.5px 0 0 0px;
  color: #3a3a3a;
  font-family: Inter, var(--default-font-family);
  font-size: 25.625px;
  font-weight: 700;
  line-height: 26.25px;
  text-align: center;
  white-space: nowrap;
  z-index: 31;
}
.dollar {
  display: flex;
  justify-content: center;
  position: relative;
  height: 16.875px;
  margin: 3.75px 0 0 0px;
  color: #767676;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 600;
  line-height: 16.875px;
  text-align: center;
  white-space: nowrap;
  z-index: 30;
}

`}  </style>

<>

  <div className="main-container">
    <div className="root">
      <div className="groups">
        <span className="time-span">{timeDisplay}</span>
        <div className="image" />
        <div className="image-1" />
        <div className="image-2" />
        <div className="image-3" />
        <div className="image-4" />
        <div className="image-5" />
        <div className="image-6" />
      </div>
      <div className="flex-row">
        <div className="background" />
        <div className="background-7">
          <div className="groups-8">
            <div className="flex-row-bfb">
              <span className="date">Date</span>
              <span className="mar-7-4-09am">{Dates.formatTemplate17(formData.date)}</span>
            </div>
            <div className="flex-row-ba">
              <span className="status">Status</span>
              <span className="completed">Completed</span>
            </div>
            <div className="groups-9">
              <span className="tdiiva-8xcqyx">{recipientFormatted}</span>
              <span className="recipient">Recipient</span>
            </div>
          </div>
        </div>
        <div className="groups-a">
          <div className="groups-b">
            <div className="background-c">
              <span className="o-trx">{feeDisplay}</span>
              <span className="network-fee">Network fee</span>
              <div className="image-d" />
            </div>
          </div>
          <div className="groups-e">
            <div className="background-f">
              <span className="more-details">More Details</span>
              <div className="image-10" />
            </div>
          </div>
        </div>
        <div className="background-11" />
      </div>
      <div className="groups-12">
        <span className="transfer">Transfer</span>
        <div className="image-13" />
        <div className="image-14" />
      </div>
      <div className="groups-15">
        <span className="usdt">-{amountDisplay}</span>
        <span className="dollar">${usdDisplay}</span>
      </div>
    </div>
  </div>
  {/* Generated by Codia AI - https://codia.ai/ */}
</>

    </>
  );
};

export default Template17;