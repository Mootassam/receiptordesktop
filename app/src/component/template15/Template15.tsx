import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template15Props {
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

// Format sender address: first 7, last 7 characters "TAzsQ9G...PHzA8wr"
const formatSender = (sender: string) => truncateString(sender, 7, 7);

// Format USD amount with commas and 2 decimal places
const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Exchange rate USDT to USD (small realistic variation)
const USDT_TO_USD_RATE = 1.001;

const Template15: React.FC<Template15Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  // Parse amount (remove any non-numeric characters if needed, but assume it's a number or numeric string)
  const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 2482.112203;
  const amountDisplay = formData.amount ? `+${formData.amount}USDT` : "+2,482.112203USDT";

  // Calculate USD equivalent using the rate
  const usdValue = rawAmount * USDT_TO_USD_RATE;
  const usdEquivalent = formatUSD(usdValue);

  // Date and time combined display
  const dateTimeDisplay = formData.date || "Today at 6:11 AM";
  
  // Network fee (could also derive from amount * small rate, but keep as is)
  const feeDisplay = formData.fee ? `${formData.fee} TRX($0.00)` : "0 TRX($0.00)";

  // Time in status bar (top right)
  const timeDisplay = formData.time || "9:44";
  
  // Format sender (now 7+7)
  const senderFormatted = formatSender(formData.sender || "TAzsQ9GPHzA8wr");

  return (
    <>
      <style>{`:root {
  --default-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei",
    "Source Han Sans CN", sans-serif;
}



.groups {
  position: relative;
  width: 368.75px;
  height: 45.625px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 29;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 289.375px;
  bottom: 13.75px;
  color: #c8c8c8;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 800;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 34;
}
.image {
  position: absolute;
  width: 26.875px;
  height: 13.75px;
  right: 32.5px;
  bottom: 14.375px;
  background: url(${assetBase}template15/JXPMueKpuh.png)
    no-repeat center;
  background-size: cover;
  z-index: 30;
}
.image-1 {
  position: absolute;
  width: 19.375px;
  height: 13.75px;
  right: 88.125px;
  bottom: 14.375px;
  background: url(${assetBase}template15/tmhKZffptD.png)
    no-repeat center;
  background-size: cover;
  z-index: 32;
}
.image-2 {
  position: absolute;
  width: 12.5px;
  height: 13.75px;
  right: 273.75px;
  bottom: 14.375px;
  background: url(${assetBase}template15/aGrhjY4r9W.png)
    no-repeat center;
  background-size: cover;
  z-index: 33;
}
.image-3 {
  position: absolute;
  width: 17.5px;
  height: 12.5px;
  right: 65px;
  bottom: 15px;
  background: url(${assetBase}template15/VwFFSzDMxP.png)
    no-repeat center;
  background-size: cover;
  z-index: 31;
}
.groups-4 {
  position: relative;
  width: 368.75px;
  height: 42.5px;
  margin: -3.75px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 25;
}
.transfer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 153.125px;
  bottom: 12.5px;
  color: #c0c0c0;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 800;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 27;
}
.image-5 {
  position: absolute;
  width: 15px;
  height: 16.25px;
  right: 23.75px;
  bottom: 11.875px;
  background: url(${assetBase}template15/PAELoUFG2M.png)
    no-repeat center;
  background-size: cover;
  z-index: 26;
}
.image-6 {
  position: absolute;
  width: 16.25px;
  height: 12.5px;
  right: 340px;
  bottom: 15px;
  background: url(${assetBase}template15/MwTecw7Drx.png)
    no-repeat center;
  background-size: cover;
  z-index: 28;
}
.groups-7 {
  position: relative;
  width: 368.75px;
  height: 86.25px;
  margin: -3.75px 0 0 0;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 22;
  overflow: visible auto;
}
.usd-amount {
  display: flex;
  position: relative;
  justify-content: center;
  height: 25px;
  margin: 29.75px 0 0 0px;
  color: #4ac681;
  font-family: Inter, var(--default-font-family);
  font-size: 19.375px;
  font-weight: 700;
  line-height: 23.448px;
  text-align: left;
  white-space: nowrap;
  z-index: 24;
}
.usd-equivalent {
 display: flex;
  position: relative;
  justify-content: center;
  height: 15.625px;
  margin: 5.25px 0 0 0px;
  color: #5d6064;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 23;
}
.background {
  position: relative;
  width: 131.25px;
  height: 4.375px;
  margin: 621.25px 0 0 118.75px;
  background: url(${assetBase}template15/RAhdORRxEm.png)
    no-repeat center;
  background-size: cover;
  z-index: 2;
}
.background-8 {
  position: absolute;
  width: 348.125px;
  height: 120.625px;
  right: 10.625px;
  bottom: 486.875px;
  background: #242326;
  border: 3.125px solid #1b1b1b;
  z-index: 14;
}
.groups-9 {
  position: relative;
  width: 344.375px;
  height: 116.875px;
  margin: 1.875px 0 0 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 13;
  overflow: visible auto;
}
.flex-row-ec {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 316.875px;
  height: 14.375px;
  margin: 18.75px 0 0 14.375px;
  z-index: 21;
}
.date {
  flex-shrink: 0;
  position: relative;
  height: 12.5px;
  color: #616469;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 400;
  line-height: 12.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 21;
}
.today-at-am {
  flex-shrink: 0;
  position: relative;
  height: 14.375px;
  color: #959497;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 14.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.flex-row-dd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 317.5px;
  height: 26.25px;
  margin: 12.5px 0 0 13.75px;
  z-index: 19;
}
.regroup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  position: relative;
  width: 72.5px;
  height: 26.25px;
  z-index: 19;
}
.status {
  flex-shrink: 0;
  position: relative;
  height: 12.5px;
  color: #5f6065;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 12.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.image-a {
  flex-shrink: 0;
  position: relative;
  width: 34.375px;
  height: 26.25px;
  background: url(${assetBase}template15/Ty19FTGnXS.png)
    no-repeat center;
  background-size: cover;
  z-index: 15;
}
.completed {
  flex-shrink: 0;
  position: relative;
  height: 14.375px;
  color: #949396;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 14.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 18;
}
.flex-row-c {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 318.125px;
  height: 14.375px;
  margin: 13.125px 0 0 13.75px;
  z-index: 17;
}
.sender {
  flex-shrink: 0;
  position: relative;
  height: 12.5px;
  color: #5c5e63;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 12.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 17;
}
.tazsqg-phzaw {
  flex-shrink: 0;
  position: relative;
  height: 14.375px;
  color: #939396;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 14.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 16;
}
.groups-b {
  position: absolute;
  width: 351.25px;
  height: 282.5px;
  right: 8.75px;
  bottom: 323.125px;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
}
.background-c {
  position: relative;
  margin: 130px 0 0 1.25px;
  background: #232225;
  border: 3.125px solid #1b1b1b;
  z-index: 7;
}
.groups-d {
  position: relative;
  width: 344.375px;
  height: 85px;
  margin: 1.875px 0 0 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 6;
  overflow: visible auto;
}
.flex-row-d {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 317.5px;
  height: 15.625px;
  margin: 18.125px 0 0 13.75px;
  z-index: 12;
}
.status-e {
  flex-shrink: 0;
  position: relative;
  height: 13.125px;
  color: #606266;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 13.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.completed-f {
  flex-shrink: 0;
  position: relative;
  height: 15.625px;
  color: #98979a;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.flex-row-e {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 316.875px;
  height: 26.25px;
  margin: 11.875px 0 0 14.375px;
  z-index: 10;
}
.regroup-10 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  position: relative;
  width: 103.125px;
  height: 26.25px;
  z-index: 10;
}
.network-fee {
  flex-shrink: 0;
  position: relative;
  height: 13.125px;
  color: #5e6066;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 13.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 10;
}
.image-11 {
  flex-shrink: 0;
  position: relative;
  width: 34.375px;
  height: 26.25px;
  background: url(${assetBase}template15/B4UZO1tfCR.png)
    no-repeat center;
  background-size: cover;
  z-index: 8;
}
.o-trx {
  flex-shrink: 0;
  position: relative;
  height: 15px;
  color: #9d9d9f;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.groups-12 {
  width: 351.25px;
  height: 47.5px;
  margin: 16.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
}
.view-block-ex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 13.75px;
  right: 121.25px;
  bottom: 15.625px;
  color: #46966b;
  font-family: Inter, var(--default-font-family);
  font-size: 9.375px;
  font-weight: 700;
  line-height: 11.346px;
  text-align: left;
  white-space: nowrap;
  z-index: 5;
}
.image-13 {
  position: absolute;
  width: 369.75px;
  height: 800px;
  right: 0;
  bottom: 0;
  background: url(${assetBase}template15/L5u8dg6HOE.png)
    no-repeat center;
  background-size: cover;
}
`}  </style>

      <>


        <div className="main-container">
            <div className="groups">
              <span className="time">{timeDisplay}</span>
              <div className="image" />
              <div className="image-1" />
              <div className="image-2" />
              <div className="image-3" />
            </div>
            <div className="groups-4">
              <span className="transfer">Transfer</span>
              <div className="image-5" />
              <div className="image-6" />
            </div>
            <div className="groups-7">
              <span className="usd-amount">{amountDisplay}</span>
              <span className="usd-equivalent">{usdEquivalent}</span>
            </div>
            <div className="background" />
            <div className="background-8">
              <div className="groups-9">
                <div className="flex-row-ec">
                  <span className="date">Date</span>
                  <span className="today-at-am">{Dates.formatTemplate15(formData.date)}</span>
                </div>
                <div className="flex-row-dd">
                  <div className="regroup">
                    <span className="status">Status</span>
                    <div className="image-a" />
                  </div>
                  <span className="completed">Completed</span>
                </div>
                <div className="flex-row-c">
                  <span className="sender">Sender</span>
                  <span className="tazsqg-phzaw">{senderFormatted}</span>
                </div>
              </div>
            </div>
            <div className="groups-b">
              <div className="background-c">
                <div className="groups-d">
                  <div className="flex-row-d">
                    <span className="status-e">Status</span>
                    <span className="completed-f">Completed</span>
                  </div>
                  <div className="flex-row-e">
                    <div className="regroup-10">
                      <span className="network-fee">Network fee</span>
                      <div className="image-11" />
                    </div>
                    <span className="o-trx">{feeDisplay}</span>
                  </div>
                </div>
              </div>
              <div className="groups-12">
                <span className="view-block-ex">View on block explorer</span>
              </div>
            </div>
      
          <div className="image-13" />
        </div>
      </>


    </>
  );
};

export default Template15;