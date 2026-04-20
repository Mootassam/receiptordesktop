import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template10Props {
  formData: FormData;
}

const Template10: React.FC<Template10Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  // Prepare formatted date/time
  const dateTimeDisplay = `${formData.date || "2024-04-02"} ${formData.time || "20:59:54"}`;
  
  // Amount and fee display
  const amountDisplay = formData.amount ? `${formData.amount} USDT` : "100 USDT";
  const feeDisplay = formData.fee !== undefined ? `${formData.fee}` : "1.3";
  
  // Withdrawal address and transaction hash will wrap naturally via CSS
  const withdrawalAddress = formData.sender || "TU7uuxXtMdXkFrjbFXoCm8E2v2oxKjehxQ";
  const txHash = formData.txid || "32da073058657255e317e137c2c062a2af8ae55129b4a586170f8cfed9df620b";

  return (
    <div>
      <style>{`   :root {
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
  width: 368.75px;
  height: 800px;
  margin: 0 auto;
  background: #020203;
}
.groups {
  position: relative;
  width: 368.75px;
  height: 203.75px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 31;
  overflow: visible auto;
}
.groups-1 {
  position: relative;
  width: 368.75px;
  height: 48.75px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 37;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 291.875px;
  bottom: 16.25px;
  color: #c7c7c9;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 800;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 42;
}
.image {
  position: absolute;
  width: 27.5px;
  height: 13.75px;
  right: 31.875px;
  bottom: 16.875px;
  background: url(${assetBase}template10/0oZDawKE1Z.png)
    no-repeat center;
  background-size: cover;
  z-index: 38;
}
.image-2 {
  position: absolute;
  width: 19.375px;
  height: 12.5px;
  right: 88.125px;
  bottom: 17.5px;
  background: url(${assetBase}template10/OgWKkfWbSZ.png)
    no-repeat center;
  background-size: cover;
  z-index: 40;
}
.image-3 {
  position: absolute;
  width: 17.5px;
  height: 12.5px;
  right: 65px;
  bottom: 17.5px;
  background: url(${assetBase}template10/d8GT2txwA9.png)
    no-repeat center;
  background-size: cover;
  z-index: 39;
}
.image-4 {
  position: absolute;
  width: 12.5px;
  height: 13.125px;
  right: 276.25px;
  bottom: 16.875px;
  background: url(${assetBase}template10/45UZ8qD9AS.png)
    no-repeat center;
  background-size: cover;
  z-index: 41;
}
.groups-5 {
  position: relative;
  width: 368.75px;
  height: 46.875px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 34;
}
.withdrawal-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 110.625px;
  bottom: 15px;
  color: #dbdbdc;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 900;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 35;
}
.image-6 {
  position: absolute;
  width: 14.375px;
  height: 13.75px;
  right: 337.5px;
  bottom: 14.375px;
  background: url(${assetBase}template10/BS2AHaC2jG.png)
    no-repeat center;
  background-size: cover;
  z-index: 36;
}
.quantity {
  display: block;
  position: relative;
  height: 14.375px;
  margin: 23.75px 0 0 161.875px;
  color: #7c7b81;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 600;
  line-height: 12.859px;
  text-align: left;
  white-space: nowrap;
  z-index: 45;
}
.usdt {
  display: flex;
  justify-content: center;
  position: relative;
  height: 16.25px;
  margin: 8.125px 0 0 0px;
  color: #cfcfd1;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 700;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 44;
}
.withdrawal-completed {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 116.25px;
  bottom: 20px;
  color: #2e7759;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 700;
  line-height: 12.859px;
  text-align: left;
  white-space: nowrap;
  z-index: 43;
}
.image-7 {
  position: absolute;
  width: 12.5px;
  height: 12.5px;
  right: 241.875px;
  bottom: 21.875px;
  background: url(${assetBase}template10/wMRpqXLseO.png)
    no-repeat center;
  background-size: cover;
  z-index: 33;
}
.groups-8 {
  position: relative;
  width: 368.75px;
  height: 586.875px;
  margin: 8.75px 0 0 0;
  background: rgba(0, 0, 0, 0);
}
.background {
  position: absolute;
  width: 368.75px;
  height: 586.875px;
  right: 0;
  bottom: 0;
  background: url(${assetBase}template10/2bi21tQ02Q.png)
    no-repeat center;
  background-size: cover;
  z-index: 1;
}
.groups-9 {
  position: relative;
  height: 239.375px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 7;
}
.groups-a {
  height: 239.375px;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  padding-left: 13.75px;
  padding-right: 13.13px;
  z-index: 8;
}
.groups-b {
  position: relative;
  height: 62.5px;
  margin: 1.875px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 24;
  overflow: visible auto;
}
.flex-row-a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 13px;
  margin: 14.375px 0 0 0px;
  z-index: 30;
}
.withdrawal-accou {
  flex-shrink: 0;
  position: relative;
  height: 12.5px;
  color: #78797e;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 700;
  line-height: 12.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 30;
}
.funding-account {
  flex-shrink: 0;
  position: relative;
  height: 13px;
  color: #a4a4a6;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 700;
  line-height: 13px;
  text-align: left;
  white-space: nowrap;
  z-index: 29;
}
.groups-c {
margin-top: 16.25px;
}
.groups-d {
display: flex;
justify-content: space-between;
  background: rgba(0, 0, 0, 0);
  z-index: 26;

}
.fees {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  bottom: 8px;
  color: #838388;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 700;
  line-height: 12.859px;
  text-align: left;
  white-space: nowrap;
  z-index: 28;
}
.dot {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 11.25px;
  right: 13.75px;
  bottom: 8.75px;
  color: #a9a9ab;
  font-family: Inter, var(--default-font-family);
  font-size: 11.875px;
  font-weight: 400;
  line-height: 11.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 27;
}
.groups-e {
  position: relative;
  background: rgba(0, 0, 0, 0);
  z-index: 21;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
.chain-type {
  display: flex;
  align-items: center;
  justify-content: flex-start;
    height: 13.75px;
  bottom: 5.625px;
  color: #7e7e83;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 700;
  line-height: 12.859px;
  text-align: left;
  white-space: nowrap;
  z-index: 23;
}
.trc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 12px;
  bottom: 7.375px;
  color: #b7b7b9;
  font-family: Inter, var(--default-font-family);
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  text-align: left;
  white-space: nowrap;
  z-index: 22;
}
.groups-f {
  position: relative;
display: flex;
justify-content: space-between;

  background: rgba(0, 0, 0, 0);
  z-index: 18;
  margin:15px 0 16px 0px;
}
.time-10 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 12.5px;
  bottom: 8.125px;
  color: #a7a7a9;
  font-family: Inter, var(--default-font-family);
  font-size: 10px;
  font-weight: 700;
  line-height: 12.102px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.time-11 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 11.25px;
  bottom: 8.75px;
  color: #7f7e84;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 700;
  line-height: 11.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.groups-12 {
  position: relative;
display: flex;
justify-content: space-between;
  min-height: 38.75px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 13;
}
.tuuuxxtmdxkfrjb {
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 2.5px;
  min-height: 31.875px;
  right: 27.5px;
  bottom: 1.875px;
  color: #bababc;
  font-family: Inter, var(--default-font-family);
  font-size: 10px;
  font-weight: 700;
  line-height: 15px;
  text-align: right;
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
  z-index: 16;
  overflow: visible;
  max-width: 125px;
}
.withdrawal-address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 13px;
  bottom: 18.875px;
  color: #7d7c82;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 700;
  line-height: 12.859px;
  text-align: left;
  white-space: nowrap;
  z-index: 17;
}
.image-13 {
  width: 10.625px;
  height: 10.625px;
  right: 14.375px;
  bottom: 21.25px;
  background: url(${assetBase}template10/gdXQuodQVJ.png)
    no-repeat center;
  background-size: cover;
  z-index: 15;
  flex-shrink: 0;
}
.image-14 {
  position: absolute;
  width: 0.63px;
  height: 6.25px;
  right: 24.375px;
  bottom: 7.5px;
  background: url(${assetBase}template10/FCwaEDBdmH.png)
    no-repeat center;
  background-size: cover;
  z-index: 14;
}
.groups-15 {
  position: relative;
display: flex;
justify-content: space-between;
  min-height: 72.5px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 9;
}
.da {
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 2.5px;
  min-height: 60px;
  right: 26.25px;
  bottom: 5px;
  color: #b6b6b8;
  font-family: Merriweather, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 700;
  line-height: 14.779px;
  text-align: right;
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
  z-index: 11;
  overflow: visible;
  max-width: 125px;
}
.transaction-hash {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 13px;
  bottom: 50.125px;
  color: #78797e;
  font-family: Inter, var(--default-font-family);
  font-size: 10.625px;
  font-weight: 700;
  line-height: 12.859px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.image-16 {
  width: 10.625px;
  height: 10.625px;
  right: 14.375px;
  bottom: 51.875px;
  background: url(${assetBase}template10/0LPVFSAsUv.png)
    no-repeat center;
  background-size: cover;
  z-index: 10;
  flex-shrink: 0;
}
.groups-17 {
  position: relative;
  width: 345.625px;
  height: 49.375px;
  margin: 259.375px 0 0 10.625px;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
  overflow: visible auto;
}
.button {
  position: relative;
  width: 341.875px;
  height: 45.625px;
  margin: 1.875px 0 0 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
  overflow: visible auto;
}
.background-18 {
  position: relative;
  width: 337.5px;
  height: 41.25px;
  margin: 2.5px 0 0 3.125px;
  background: #15161b;
  border: 0.63px solid #333338;
  z-index: 5;
  border-radius: 3.75px;
}
.view-in-blockchain {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 84.375px;
  bottom: 11.875px;
  color: #c7c7c9;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 600;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}
.background-19 {
  position: relative;
  width: 131.25px;
  height: 4.375px;
  margin: 28.125px 0 0 118.75px;
  background: #100f15
    no-repeat center;
  background-size: cover;
  z-index: 2;
}
.background-1a {
  position: absolute;
  width: 368.75px;
  height: 203.75px;
  right: 0;
  bottom: 596.25px;
  background: #100f15
    no-repeat center;
  background-size: cover;
  z-index: 1;
}`}</style>

      <div className="main-container">
        <div className="groups">
          <div className="groups-1">
            <span className="time">{formData.time || "9:11"}</span>
            <div className="image"></div>
            <div className="image-2"></div>
            <div className="image-3"></div>
            <div className="image-4"></div>
          </div>
          <div className="groups-5">
            <span className="withdrawal-details">Withdrawal Details</span>
            <div className="image-6"></div>
          </div>
          <span className="quantity">Quantity</span>
          <span className="usdt">{amountDisplay}</span>
          <span className="withdrawal-completed">Withdrawal Completed</span>
          <div className="image-7"></div>
        </div>
        <div className="groups-8">
          <div className="background">
            <div className="groups-9">
              <div className="groups-a">
                <div className="groups-b">
                  <div className="flex-row-a">
                    <span className="withdrawal-accou">Withdrawal Account</span>
                    <span className="funding-account">Funding Account</span>
                  </div>
                  <div className="groups-c">
                    <div className="groups-d">
                      <span className="fees">Fees</span>
                      <span className="dot">{feeDisplay}</span>
                    </div>
                  </div>
                </div>
                <div className="groups-e">
                  <span className="chain-type">Chain Type</span>
                  <span className="trc">TRC20</span>
                </div>
                <div className="groups-f">
                  <span className="time-11">Time</span>
                  <span className="time-10">{Dates.formatTemplate10(formData.date)}</span>
                </div>
                <div className="groups-12">
                  <span className="withdrawal-address">Withdrawal Address</span>
                  <span className="tuuuxxtmdxkfrjb">
                    {withdrawalAddress}
                    <div className="image-13"></div>
                  </span>
                </div>
                <div className="groups-15">
                  <span className="transaction-hash">Transaction Hash</span>
                  <span className="da">
                    {txHash}
                    <div className="image-16"></div>
                  </span>
                </div>
              </div>
            </div>
            <div className="groups-17">
              <div className="button">
                <div className="background-18">
                  <span className="view-in-blockchain">View in Blockchain Explorer</span>
                </div>
              </div>
            </div>
            <div className="background-19"></div>
          </div>
        </div>
        <div className="background-1a"></div>
      </div>
    </div>
  );
};

export default Template10;