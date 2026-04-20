import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template7Props {
  formData: FormData;
}

const Template7: React.FC<Template7Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  // Prepare dynamic values
  const senderAddress = formData.sender || "TA7mLh3Zy1sHj2n9u5XoV8w9e6r4q3b2c1";
  const amountValue = formData.amount || 70;
  const feeValue = formData.fee !== undefined ? formData.fee : 0;
  const dateTimeDisplay = formData.date && formData.time 
    ? `${formData.date} ${formData.time}` 
    : (formData.date || "2026-03-24") + " " + (formData.time || "10:27:53");
  const referenceNo = formData.referenceNo || "358056349021";
  const txidValue = formData.txid || "358056349021";

  return (
    <>

      <style>{` :root {
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
  width: 503.125px;
  height: 800px;
  margin: 0 auto;
  background: #1e252f;
}
.groups {
  position: absolute;
  width: 503.125px;
  height: 800px;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
}
.groups-1 {
  position: relative;
  width: 503.125px;
  height: 473.125px;
  margin: 297.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  overflow: visible auto;
}
.groups-2 {
  position: relative;
  width: 503.125px;
  height: 235.625px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 16;
  overflow: visible auto;
}
.groups-3 {
  position: relative;
  width: 503.125px;
  height: 48.75px;
  margin: 25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 26;
}
.trx {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.125px;
  right: 18.75px;
  bottom: 16.25px;
  color: #b8bdc4;
  font-family: Inter, var(--default-font-family);
  font-size: 18.125px;
  font-weight: 400;
  line-height: 18.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 27;
}
.network {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.75px;
  right: 410.625px;
  bottom: 15px;
  color: #727983;
  font-family: Inter, var(--default-font-family);
  font-size: 17.5px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 28;
}
.groups-4 {
  position: relative;
  width: 503.125px;
  height: auto;
  min-height: 160px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 17;
}
.flex-column-b {
  position: absolute;
  width: 264.375px;
  height: auto;
  min-height: 138.75px;
  right: 0px;
  bottom: 11.25px;
  font-size: 0px;
  z-index: 24;
  padding-right: 18.75px;
}
.tnypi-ao-ft-wsxv {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  gap: 8.75px;
  color: #afb3bc;
  font-family: Inter, var(--default-font-family);
  font-size: 17.5px;
  font-weight: 400;
  line-height: 23.237px;
  text-align: right;
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
  z-index: 24;
  overflow: visible;
  max-width: 246px;
  margin-left: auto;
}
.save-address {
  display: block;
  position: relative;
  height: 17px;
  margin: 9.375px 0 0 129.875px;
  color: #9a8541;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 700;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 22;
}
.off-chain-transf {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  height: 23.125px;
  color: #a5a9b2;
  font-family: Inter, var(--default-font-family);
  font-size: 17.5px;
  font-weight: 400;
  line-height: 21.179px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.text-6 {
    display: block;
    position: relative;
    height: 23.125px;
    margin: 0px;
    color: #a6aab3;
    font-family: Inter, var(--default-font-family);
    font-size: 17.5px;
    font-weight: 400;
    line-height: 21.179px;
    text-align: left;
    white-space: nowrap;
    z-index: 19;
    display: flex;
    justify-content: flex-end;
}
.flex-column {
  position: absolute;
  width: 70px;
  height: auto;
  min-height: 108.75px;
  right: 406.125px;
  bottom: 38.125px;
  font-size: 0px;
  z-index: 25;
}
.address {
  display: block;
  position: relative;
  height: 18.75px;
  margin: 0 0 0 0;
  color: #767d87;
  font-family: Inter, var(--default-font-family);
  font-size: 17.5px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 25;
}
.txid {
  display: block;
  position: relative;
  height: 18.125px;
  margin: 71.875px 0 0 0;
  color: #79808a;
  font-family: Inter, var(--default-font-family);
  font-size: 16.875px;
  font-weight: 400;
  line-height: 18.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 21;
}
.flex-column-caaf {
  position: absolute;
  width: 18.125px;
  height: 121.25px;
  right: 21.875px;
  bottom: 25px;
  z-index: 23;
}
.image {
  position: relative;
  width: 18.125px;
  height: 18.125px;
  background: url(${assetBase}template7/8Qnv2RNFk2.png)
    no-repeat center;
  background-size: cover;
  z-index: 23;
  flex-shrink: 0;
}
.image-5 {
  position: relative;
  width: 18.125px;
  height: 18.75px;
  background: url(${assetBase}template7/f0KgnrPDuU.png)
    no-repeat center;
  background-size: cover;
  z-index: 18;
}
.groups-6 {
  position: relative;
  width: 503.125px;
  height: 47.5px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 13;
}
.usdt {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 19.375px;
  right: 18.75px;
  bottom: 14.375px;
  color: #a7abb4;
  font-family: Inter, var(--default-font-family);
  font-size: 18.125px;
  font-weight: 400;
  line-height: 19.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 14;
}
.amount {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.75px;
  right: 414.75px;
  bottom: 13.75px;
  color: #79808a;
  font-family: Inter, var(--default-font-family);
  font-size: 17.5px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.groups-7 {
  position: relative;
  width: 503.125px;
  height: 48.75px;
  margin: 1.875px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 10;
}
.network-fee {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 22.5px;
  right: 378.875px;
  bottom: 14.375px;
  color: #727983;
  font-family: Inter, var(--default-font-family);
  font-size: 18.125px;
  font-weight: 400;
  line-height: 21.935px;
  text-align: left;
  white-space: nowrap;
  z-index: 12;
}
.ousdt {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 19.375px;
  right: 18.75px;
  bottom: 16.25px;
  color: #b3b7bf;
  font-family: Inter, var(--default-font-family);
  font-size: 18.125px;
  font-weight: 400;
  line-height: 19.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.groups-8 {
  position: relative;
  width: 503.125px;
  height: 50.625px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 7;
}
.spot-wallet {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 23.75px;
  right: 17.5px;
  bottom: 15.625px;
  color: #aaaeb6;
  font-family: Inter, var(--default-font-family);
  font-size: 17.5px;
  font-weight: 400;
  line-height: 21.179px;
  text-align: left;
  white-space: nowrap;
  z-index: 8;
}
.wallet {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.75px;
  right: 430.625px;
  bottom: 19.375px;
  color: #79808a;
  font-family: Inter, var(--default-font-family);
  font-size: 17.5px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.groups-9 {
  position: relative;
  width: 503.125px;
  height: 53.75px;
  margin: -3.75px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
}
.time-stamp {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 24.375px;
  right: 17.5px;
  bottom: 18.75px;
  color: #abafb7;
  font-family: Inter, var(--default-font-family);
  font-size: 18.75px;
  font-weight: 400;
  line-height: 22.692px;
  text-align: left;
  white-space: nowrap;
  z-index: 5;
}
.date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.125px;
  right: 443.125px;
  bottom: 21.25px;
  color: #79808a;
  font-family: Inter, var(--default-font-family);
  font-size: 16.875px;
  font-weight: 400;
  line-height: 18.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}
.image-a {
  position: absolute;
  width: 19.375px;
  height: 20px;
  right: 288.75px;
  bottom: 0;
  background: url('/template7/ZrWWeExejc.png')
    no-repeat center;
  background-size: cover;
  z-index: 3;
}
.scam-report {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 18.75px;
  right: 191.25px;
  bottom: 0;
  color: #7a818b;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 700;
  line-height: 17.397px;
  text-align: left;
  white-space: nowrap;
  z-index: 2;
}
.groups-b {
  position: absolute;
  width: 503.125px;
  height: 293.75px;
  right: 0;
  bottom: 506.25px;
  background: rgba(0, 0, 0, 0);
  z-index: 29;
}
.groups-c {
  position: relative;
  width: 503.125px;
  height: 60.625px;
  margin: 9.375px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 37;
}
.withdrawal-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 28.75px;
  right: 135px;
  bottom: 17.5px;
  color: #bfc3ca;
  font-family: Inter, var(--default-font-family);
  font-size: 24.375px;
  font-weight: 700;
  line-height: 28.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 39;
}
.image-d {
  position: absolute;
  width: 23.125px;
  height: 20.625px;
  right: 21.875px;
  bottom: 21.25px;
  background: url(${assetBase}template7/whDie95cR4.png)
    no-repeat center;
  background-size: cover;
  z-index: 38;
}
.image-e {
  position: absolute;
  width: 20.625px;
  height: 15.625px;
  right: 459.375px;
  bottom: 23.75px;
  background: url(${assetBase}template7/RUrRkdeW6m.png)
    no-repeat center;
  background-size: cover;
  z-index: 40;
}
.groups-f {
  position: absolute;
  width: 503.125px;
  height: 211.25px;
  right: 0;
  bottom: 502.5px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 30;
}
.usdt-10 {
  display: flex;
  justify-content: center;
  position: relative;
  height: 36.25px;
  margin: 17.5px 0 0 0px;
  color: #cdd0d6;
  font-family: Inter, var(--default-font-family);
  font-size: 35.625px;
  font-weight: 700;
  line-height: 36.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 36;
}
.flex-row-f {
  display: flex;
  align-items: center;
  justify-content: center;
  gap:8.75px;
  position: relative;
  height: 24.375px;
  margin: 19.375px 0 0 0px;
  z-index: 35;
}
.image-11 {
  flex-shrink: 0;
  position: relative;
  width: 20.625px;
  height: 21.25px;
  background: url(${assetBase}template7/6CHSM2iqWw.png)
    no-repeat center;
  background-size: cover;
  z-index: 35;
}
.completed {
  flex-shrink: 0;
  position: relative;
  height: 24.375px;
  color: #3e8470;
  font-family: Inter, var(--default-font-family);
  font-size: 18.125px;
  font-weight: 400;
  line-height: 24.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 34;
}
.crypto-transferr {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 42.5px;
  margin: 12.5px 0 0 0px;
  color: #6f7680;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 17.988px;
  text-align: center;
  text-overflow: initial;
  z-index: 33;
  overflow: hidden;
}
.why-hasnt-my-wi {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 18.75px;
  margin: 3.125px 0 0 0px;
  color: #93803d;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 700;
  line-height: 17.397px;
  text-align: left;
  white-space: nowrap;
  z-index: 32;
}
.background {
  position: relative;
  width: 503.125px;
  height: 1.875px;
  margin: 33.125px 0 0 0;
  background: #272e38;
  z-index: 31;
}

.chain__off {
  display: flex;
  align-items: center;
  gap: 8.75px;
  justify-content: flex-end;
  margin: 16.75px 0 0px;
}

/* Additional style for txid value */
.txid-value {
  display: block;
  position: absolute;
  right: 18.75px;
  bottom: 5px;
  color: #afb3bc;
  font-family: Inter, var(--default-font-family);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  text-align: right;
  white-space: pre-line;
  word-break: break-all;
  max-width: 200px;
  z-index: 20;
}
`}</style>

      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="index.css" />
        <div className="main-container">
          <div className="groups">
            <div className="groups-1">
              <div className="groups-2">
                <div className="groups-3">
                  <span className="trx">TRX</span>
                  <span className="network">Network</span>
                </div>
                <div className="groups-4">
                  <div className="flex-column-b">
                    <div>
                      <span className="tnypi-ao-ft-wsxv">
                        {senderAddress}
                        <div className="image" />
                      </span>
                      <span className="save-address">Save Address</span>
                    </div>
                    <div className='chain__off'>
                      <div>
                        <span className="off-chain-transf">Off-chain Transfer</span>
                        <span className="text-6">{referenceNo}</span>
                      </div>
                      <div className="image-5" />
                    </div>
                  </div>
                  <div className="flex-column">
                    <span className="address">Address</span>
                    <span className="txid">Txid</span>
                  </div>
                  <div className="flex-column-caaf">
                    {/* Txid value displayed here */}
                    {/* <span className="txid-value">{txidValue}</span> */}
                  </div>
                </div>
              </div>
              <div className="groups-6">
                <span className="usdt">{amountValue} USDT</span>
                <span className="amount">Amount</span>
              </div>
              <div className="groups-7">
                <span className="network-fee">Network fee</span>
                <span className="ousdt">{feeValue} USDT</span>
              </div>
              <div className="groups-8">
                <span className="spot-wallet">Spot Wallet</span>
                <span className="wallet">Wallet</span>
              </div>
              <div className="groups-9">
                <span className="time-stamp">{Dates.formatTemplate7(formData.date)}</span>
                <span className="date">Date</span>
              </div>
              <div className="image-a" />
              <span className="scam-report">Scam Report</span>
            </div>
            <div className="groups-b">
              <div className="groups-c">
                <span className="withdrawal-details">Withdrawal Details</span>
                <div className="image-d" />
                <div className="image-e" />
              </div>
            </div>
            <div className="groups-f">
              <span className="usdt-10">-{amountValue} USDT</span>
              <div className="flex-row-f">
                <div className="image-11" />
                <span className="completed">Completed</span>
              </div>
              <span className="crypto-transferr">
                Crypto transferred out of Binance. Please contact the recipient
                <br />
                platform for your transaction receipt.
              </span>
              <span className="why-hasnt-my-wi">
                Why hasn't my withdrawal arrived?
              </span>
              <div className="background" />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Template7;