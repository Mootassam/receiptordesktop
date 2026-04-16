import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template14Props {
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

// Format sender address: first 10, last 10 characters (e.g., "TBzgJv9jWw...pRsSTpuvJ")
const formatSender = (sender: string) => truncateString(sender, 10, 10);

const Template14: React.FC<Template14Props> = ({ formData }) => {
  console.log("🚀 ~ Template14 ~ formData:", formData);

  // Prepare formatted values with fallbacks
  const senderFormatted = formatSender(formData.sender || "TBzgJv9jWwpRsSTpuvJ");
  // Date is used as-is (the fallback "13Jul,01:40" matches the expected format)
  // Amount is displayed with a plus sign

  return (
    <>
      <style>{`
      :root {
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
  width: 369.375px;
  height: 756.25px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0);
}
.groups-1 {
  position: relative;
  width: 369.375px;
  height: 29.375px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 31;
}
.image {
  position: absolute;
  width: 13.125px;
  height: 13.75px;
  right: 115.625px;
  bottom: 5.625px;
  background: url(./template14/W4R2eKq28g.png)
    no-repeat center;
  background-size: cover;
  z-index: 37;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14px;
  right: 309.375px;
  bottom: 5.375px;
  color: #747474;
  font-family: Inter, var(--default-font-family);
  font-size: 11.25px;
  font-weight: 700;
  line-height: 13.615px;
  text-align: left;
  white-space: nowrap;
  z-index: 42;
}
.image-2 {
  position: absolute;
  width: 11.875px;
  height: 11.875px;
  right: 295.625px;
  bottom: 6.875px;
  background: url(./template14/vqkmDdEyua.png)
    no-repeat center;
  background-size: cover;
  z-index: 41;
}
.image-3 {
  position: absolute;
  width: 23.75px;
  height: 10.625px;
  right: 25px;
  bottom: 7.5px;
  background: url(./template14/P8j0LB397o.png)
    no-repeat center;
  background-size: cover;
  z-index: 33;
}
.image-4 {
  position: absolute;
  width: 15.625px;
  height: 11.875px;
  right: 53.75px;
  bottom: 6.25px;
  background: url(./template14/ksPTGBECCH.png)
    no-repeat center;
  background-size: cover;
  z-index: 34;
}
.image-5 {
  position: absolute;
  width: 6.875px;
  height: 10px;
  right: 16.25px;
  bottom: 7.5px;
  background: url(./template14/9Ww1SeYZpW.png)
    no-repeat center;
  background-size: cover;
  z-index: 32;
}
.image-6 {
  position: absolute;
  width: 16.875px;
  height: 10.625px;
  right: 73.75px;
  bottom: 6.875px;
  background: url(./template14/znEg0RPqh6.png)
    no-repeat center;
  background-size: cover;
  z-index: 35;
}
.image-7 {
  position: absolute;
  width: 16.25px;
  height: 10.625px;
  right: 94.375px;
  bottom: 6.875px;
  background: url(./template14/xudRRowgBH.png)
    no-repeat center;
  background-size: cover;
  z-index: 36;
}
.image-8 {
  position: absolute;
  width: 11.875px;
  height: 10.625px;
  right: 261.25px;
  bottom: 6.875px;
  background: url(./template14/GMYGh33Z1A.png)
    no-repeat center;
  background-size: cover;
  z-index: 39;
}
.image-9 {
  position: absolute;
  width: 11.875px;
  height: 10px;
  right: 278.125px;
  bottom: 6.875px;
  background: url(./template14/462aEoSiV0.png)
    no-repeat center;
  background-size: cover;
  z-index: 40;
}
.image-a {
  position: absolute;
  width: 6.875px;
  height: 2.5px;
  right: 244.375px;
  bottom: 11.25px;
  background: url(./template14/i5PJvjBKef.png)
    no-repeat center;
  background-size: cover;
  z-index: 38;
}
.groups-b {
  position: relative;
  width: 369.375px;
  height: 35.625px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 27;
}
.transfer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 151.875px;
  bottom: 9.375px;
  color: #3e3e3e;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 700;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 29;
}
.image-c {
  position: absolute;
  width: 15.625px;
  height: 16.875px;
  right: 19.375px;
  bottom: 8.75px;
  background: url(./template14/VE69gVPLft.png)
    no-repeat center;
  background-size: cover;
  z-index: 28;
}
.image-d {
  position: absolute;
  width: 15px;
  height: 15px;
  right: 335.625px;
  bottom: 10px;
  background: url(./template14/3emDB8jydc.png)
    no-repeat center;
  background-size: cover;
  z-index: 30;
}
.groups-e {
  position: relative;
  width: 369.375px;
  height: 351.25px;
  margin: 6.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  overflow: visible auto;
}
.groups-f {
  position: relative;
  width: 369.375px;
  height: 73.125px;
  margin: 0 0 0 0;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 24;
  overflow: visible auto;
}
.plus-usdt {
  display: block;
  position: relative;
  height: 26.25px;
  margin: 14.375px 0 0 121.25px;
  color: #343434;
  font-family: Inter, var(--default-font-family);
  font-size: 23.125px;
  font-weight: 700;
  line-height: 26.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 26;
}
.usd {
  display: block;
  position: relative;
  height: 16.25px;
  margin: 5.625px 0 0 152.5px;
  color: #787878;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 25;
}
.groups-10 {
  position: relative;
  width: 346.25px;
  height: 123.75px;
  margin: 8.75px 0 0 11.25px;
  background: rgba(0, 0, 0, 0);
  z-index: 11;
}
.background {
  position: absolute;
  width: 346.875px;
  height: 121.875px;
  right: 0;
  bottom: -0.63px;
  background: #f4f4f6;
  border: 1.875px solid #ffffff;
  z-index: 12;
}
.groups-11 {
  position: absolute;
  width: 346.25px;
  height: 40px;
  right: 1.25px;
  bottom: 80px;
  background: rgba(0, 0, 0, 0);
  z-index: 21;
}
.jul-time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 14.375px;
  bottom: 11.875px;
  color: #2c2c2e;
  font-family: Inter, var(--default-font-family);
  font-size: 11.875px;
  font-weight: 500;
  line-height: 14.371px;
  text-align: left;
  white-space: nowrap;
  z-index: 22;
}
.date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 13.125px;
  right: 303.625px;
  bottom: 13.75px;
  color: #908f91;
  font-family: Inter, var(--default-font-family);
  font-size: 11.875px;
  font-weight: 400;
  line-height: 13.125px;
  text-align: left;
  white-space: nowrap;
  z-index: 23;
}
.background-12 {
  position: absolute;
  width: 320.625px;
  height: 1.875px;
  right: 11.875px;
  bottom: 79.375px;
  background: #f4f4f6;
  z-index: 20;
}
.groups-13 {
  position: absolute;
  width: 343.125px;
  height: 41.875px;
  right: 1.875px;
  bottom: 38.125px;
  background: rgba(0, 0, 0, 0);
  z-index: 16;
}
.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 313.75px;
  height: 15.625px;
  margin: 12.5px 0 0 15.625px;
  z-index: 19;
}
.status {
  flex-shrink: 0;
  position: relative;
  height: 13.75px;
  color: #919193;
  font-family: Inter, var(--default-font-family);
  font-size: 11.875px;
  font-weight: 400;
  line-height: 13.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.completed {
  flex-shrink: 0;
  position: relative;
  height: 15.625px;
color: #2c2c2e;
    font-family: Inter, var(--default-font-family);
    font-size: 11.875px;
    font-weight: 500;
  text-align: left;
  white-space: nowrap;
  z-index: 18;
}
.background-14 {
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 319.375px;
  height: 1.875px;
  margin: 9.375px 0 0 13.125px;
  background: #f4f4f6;
  z-index: -Infinity;
}
.groups-15 {
  position: absolute;
  width: 346.875px;
  height: 41.25px;
  right: 0.63px;
  bottom: -1.25px;
  background: rgba(0, 0, 0, 0);
  z-index: 13;
}
.tbzgjvjww-prs {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 15px;
  bottom: 13.125px;
color: #2c2c2e;
    font-family: Inter, var(--default-font-family);
    font-size: 11.875px;
    font-weight: 500;
  text-align: left;
  white-space: nowrap;
  z-index: 14;
}
.sender {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 13.75px;
  right: 290.25px;
  bottom: 15px;
  color: #8d8d8f;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 400;
  line-height: 13.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.groups-16 {
  position: relative;
  width: 348.125px;
  height: 42.5px;
  margin: 27.5px 0 0 8.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 6;
}
.background-17 {
  position: absolute;
  width: 341.25px;
  height: 40px;
  right: 1.875px;
  bottom: 1.875px;
  background: #f3f3f5;
  border: 0.63px solid #f7f7f8;
  z-index: 7;
  border-radius: 4.375px;
}
.o-trx {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14px;
  right: 17.5px;
  bottom: 15.375px;
color: #2c2c2e;
    font-family: Inter, var(--default-font-family);
    font-size: 11.875px;
    font-weight: 500;
    line-height: 14.371px;
  white-space: nowrap;
  z-index: 9;
}
.network-fee {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 13.75px;
  right: 256.875px;
  bottom: 15px;
  color: #939395;
  font-family: Inter, var(--default-font-family);
  font-size: 11.875px;
  font-weight: 400;
  line-height: 13.75px;
  text-align: left;
  white-space: nowrap;
  z-index: 10;
}
.image-18 {
  position: absolute;
  width: 11.25px;
  height: 10.625px;
  right: 241.25px;
  bottom: 16.25px;
  background: url(./template14/Zncap9nYSo.png)
    no-repeat center;
  background-size: cover;
  z-index: 8;
}
.groups-19 {
  position: relative;
  width: 349.375px;
  height: 50px;
  margin: 25.625px 0 0 8.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
}
.background-1a {
  position: absolute;
  width: 340.625px;
  height: 45px;
  right: 3.125px;
  bottom: 3.125px;
  background: #f3f3f6;
  z-index: 3;
  border-radius: 4.375px;
}
.more-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 256.25px;
  bottom: 18.75px;
  color: #6f6e70;
  font-family: Inter, var(--default-font-family);
  font-size: 11.875px;
  font-weight: 400;
  line-height: 14.371px;
  text-align: left;
  white-space: nowrap;
  z-index: 5;
}
.image-1b {
  position: absolute;
  width: 7.5px;
  height: 11.25px;
  right: 24.375px;
  bottom: 20px;
  background: url(./template14/hQPmQ54btP.png)
    no-repeat center;
  background-size: cover;
  z-index: 4;
}
.background-1c {
  position: absolute;
  width: 369.375px;
  height: 756.25px;
  right: 0;
  bottom: 0;
  background: #fefefe;
}

        `}</style>

      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Generated by Codia AI</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        />
        <link rel="stylesheet" href="index.css" />
        <div className="main-container">
          <div className="groups-1">
            <div className="image" />
            <span className="time">{formData.time || "7:43"}AM</span>
            <div className="image-2" />
            <div className="image-3" />
            <div className="image-4" />
            <div className="image-5" />
            <div className="image-6" />
            <div className="image-7" />
            <div className="image-8" />
            <div className="image-9" />
            <div className="image-a" />
          </div>
          <div className="groups-b">
            <span className="transfer">Transfer</span>
            <div className="image-c" />
            <div className="image-d" />
          </div>
          <div className="groups-e">
            <div className="groups-f">
              <span className="plus-usdt">+{formData.amount || 346} USDT</span>
              <span className="usd">${formData.amount || 346.19}</span>
            </div>
            <div className="groups-10">
              <div className="background" />
              <div className="groups-11">
                <span className="jul-time">{Dates.formatTemplate14(formData.date)}</span>
                <span className="date">Date</span>
              </div>
              <div className="background-12" />
              <div className="groups-13">
                <div className="flex-row">
                  <span className="status">Status</span>
                  <span className="completed">Completed</span>
                </div>
                <div className="background-14" />
              </div>
              <div className="groups-15">
                <span className="tbzgjvjww-prs">{senderFormatted}</span>
                <span className="sender">Sender</span>
              </div>
            </div>
            <div className="groups-16">
              <div className="background-17" />
              <span className="o-trx">{formData.fee || "0"} TRX</span>
              <span className="network-fee">Network fee</span>
              <div className="image-18" />
            </div>
            <div className="groups-19">
              <div className="background-1a" />
              <span className="more-details">More Details</span>
              <div className="image-1b" />
            </div>
          </div>
          <div className="background-1c" />
        </div>
      </>

    </>
  );
};

export default Template14;