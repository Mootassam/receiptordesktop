import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template16Props {
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

// Format recipient address: first 6, last 6 characters
const formatRecipient = (recipient: string) => truncateString(recipient, 6, 6);

// Format USD amount with commas and 2 decimal places
const formatUSD = (amount: number): string => {
  if (isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Small exchange rate USDT → USD (realistic variation)
const USDT_TO_USD_RATE = 1.001;

const Template16: React.FC<Template16Props> = ({ formData }) => {
  // State for live ETH/USD rate
  const [ethUsdRate, setEthUsdRate] = useState<number | null>(null);
  const [loadingRate, setLoadingRate] = useState<boolean>(true);
  const [rateError, setRateError] = useState<boolean>(false);

  // Fetch live ETH/USD rate from CoinGecko
  useEffect(() => {
    const fetchEthUsdRate = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        const rate = data.ethereum?.usd;
        if (rate && typeof rate === 'number') {
          setEthUsdRate(rate);
        } else {
          throw new Error('Invalid rate data');
        }
      } catch (err) {
        console.error('Failed to fetch ETH/USD rate:', err);
        setRateError(true);
        // Fallback to a reasonable estimate
        setEthUsdRate(3000);
      } finally {
        setLoadingRate(false);
      }
    };

    fetchEthUsdRate();
  }, []);

  // Parse amount (remove commas if any)
  const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 307.331805;
  const amountDisplay = formData.amount ? `${formData.amount}USDT` : "307.331805USDT";
  const usdValue = rawAmount * USDT_TO_USD_RATE;
  const usdFormatted = formatUSD(usdValue).replace('$', ''); // remove dollar sign for display

  // Format recipient (sender address)
  const recipientFormatted = formatRecipient(formData.sender || "0x98aF7097534");

  // ----- SAFE FEE HANDLING -----
  const rawFee = formData.fee !== undefined ? String(formData.fee).replace(/,/g, '') : '0';
  const parsedFee = parseFloat(rawFee);
  const safeFeeEth = isNaN(parsedFee) ? 0 : parsedFee;

  let feeUsdFormatted = '$0.00';
  if (!loadingRate && ethUsdRate !== null) {
    const feeUsd = safeFeeEth * ethUsdRate;
    feeUsdFormatted = formatUSD(feeUsd);
  } else if (loadingRate) {
    feeUsdFormatted = 'Loading...';
  } else if (rateError) {
    feeUsdFormatted = 'Rate unavailable';
  }

  const feeDisplay = `${safeFeeEth} ETH (${feeUsdFormatted})`;
  // -----------------------------

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
  height: 45.625px;
  right: 0;
  bottom: 754.375px;
  background: rgba(0, 0, 0, 0);
  z-index: 42;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 17px;
  right: 292.5px;
  bottom: 11.125px;
  color: #1e1e1e;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 500;
  line-height: 16.641px;
  text-align: left;
  white-space: nowrap;
  z-index: 50;
}
.image {
  position: absolute;
  width: 28.75px;
  height: 14.375px;
  right: 31.25px;
  bottom: 11.875px;
  background: url(/images/template16/HOf3KcPPTz.png)
    no-repeat center;
  background-size: cover;
  z-index: 43;
}
.image-1 {
  position: absolute;
  width: 21.875px;
  height: 13.125px;
  right: 89.375px;
  bottom: 12.5px;
  background: url(/images/template16/vRAZdwWOrD.png)
    no-repeat center;
  background-size: cover;
  z-index: 45;
}
.image-2 {
  position: absolute;
  width: 16.875px;
  height: 13.125px;
  right: 66.25px;
  bottom: 12.5px;
  background: url(/images/template16/Jur70QaNWP.png)
    no-repeat center;
  background-size: cover;
  z-index: 44;
}
.image-3 {
  position: absolute;
  width: 13.125px;
  height: 13.125px;
  right: 253.75px;
  bottom: 11.875px;
  background: url(/images/template16/Az1PchX9Zr.png)
    no-repeat center;
  background-size: cover;
  z-index: 48;
}
.image-4 {
  position: absolute;
  width: 13.125px;
  height: 11.25px;
  right: 273.75px;
  bottom: 12.5px;
  background: url(/images/template16/3xrdxSygwh.png)
    no-repeat center;
  background-size: cover;
  z-index: 49;
}
.image-5 {
  position: absolute;
  width: 13.75px;
  height: 10px;
  right: 233.125px;
  bottom: 13.75px;
  background: url(/images/template16/9i3GRkcd2o.png)
    no-repeat center;
  background-size: cover;
  z-index: 47;
}
.image-6 {
  position: absolute;
  width: 4.375px;
  height: 4.375px;
  right: 218.125px;
  bottom: 16.875px;
  background: url(/images/template16/0HgyTOTZAX.png)
    no-repeat center;
  background-size: cover;
  z-index: 46;
}
.flex-row-fcd {
  position: absolute;
  width: 351.25px;
  height: 800px;
  right: 0;
  bottom: 0;
  z-index: 24;
}
.background {
  position: absolute;
  width: 1.25px;
  height: 800px;
  right: 0;
  bottom: 0;
  background: url(/images/template16/XP5UdfRb2j.png)
    no-repeat center;
  background-size: cover;
  z-index: 2;
}
.background-7 {
  position: absolute;
  width: 340px;
  height: 123.75px;
  right: 10px;
  bottom: 510.625px;
  background: #f4f4f6;
  border: 3.75px solid #ffffff;
  z-index: 24;
}
.groups-8 {
  position: relative;
  width: 336.25px;
  height: 115px;
  margin: 1.875px 0 0 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 23;
}
.flex-column {
  position: absolute;
  width: 133.75px;
  height: 91.875px;
  right: 12.5px;
  bottom: 11.875px;
  font-size: 0px;
  z-index: 32;
}
.mar-10-31-pm {
  display: block;
  position: relative;
  height: 18.125px;
  margin: 0 0 0 10px;
  color: #464648;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 600;
  line-height: 18.125px;
  text-align: right;
  white-space: nowrap;
  z-index: 32;
}
.completed {
  display: block;
  position: relative;
  height: 18px;
  margin: 20px 0 0 53.75px;
  color: #3d3d3f;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  text-align: right;
  white-space: nowrap;
  z-index: 29;
}
.xaf {
  display: block;
  position: relative;
  height: 16.25px;
  margin: 19.5px 0 0 0;
  color: #444446;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 600;
  line-height: 16.25px;
  text-align: right;
  white-space: nowrap;
  z-index: 26;
}
.flex-column-fb {
  position: absolute;
  width: 68.125px;
  height: 92.5px;
  right: 253.75px;
  bottom: 10px;
  font-size: 0px;
  z-index: 33;
}
.date {
  display: block;
  position: relative;
  height: 15px;
  margin: 0 0 0 0.63px;
  color: #7d7d7f;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 33;
}
.status {
  display: block;
  position: relative;
  height: 15px;
  margin: 22.5px 0 0 0;
  color: #858587;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 30;
}
.recipient {
  display: block;
  position: relative;
  height: 17.5px;
  margin: 22.5px 0 0 0.63px;
  color: #78787a;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 27;
}
.groups-9 {
  position: absolute;
  width: 341.875px;
  height: 306.875px;
  right: 9.375px;
  bottom: 320.625px;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
}
.groups-a {
  position: relative;
  width: 341.875px;
  height: 48.125px;
  margin: 258.75px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
  overflow: visible auto;
}
.background-b {
  position: relative;
  width: 333.125px;
  height: 38.75px;
  margin: 4.375px 0 0 5px;
  background: #f3f3f6;
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
  bottom: 11.875px;
  color: #454547;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 500;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 8;
}
.image-c {
  position: absolute;
  width: 6.25px;
  height: 9.375px;
  right: 18.75px;
  bottom: 15px;
  background: url(/images/template16/yyd3UmszA0.png)
    no-repeat center;
  background-size: cover;
  z-index: 7;
}
.background-d {
  position: absolute;
  width: 340.625px;
  height: 101.875px;
  right: 0;
  bottom: 68.75px;
  background: #f4f4f6;
  border: 3.75px solid #fefefe;
}
.groups-e {
  position: absolute;
  width: 336.875px;
  height: 102.5px;
  right: 2.5px;
  bottom: 65.625px;
  background: rgba(0, 0, 0, 0);
  z-index: 9;
}
.groups-f {
  position: relative;
  width: 333.125px;
  height: 56.875px;
  margin: -0.25px 0 0 2.375px;
  background: rgba(0, 0, 0, 0);
  z-index: 16;
}
.span-dot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  width: 181.875px;
  height: 43.75px;
  right: 9.375px;
  bottom: 3.75px;
  color: #424244;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 600;
  line-height: 20.464px;
  text-align: right;
  z-index: 19;
}
.span-network-fee {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 231.25px;
  bottom: 18.125px;
  color: #777779;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 500;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 22;
}
.image-10 {
  position: absolute;
  width: 11.25px;
  height: 11.25px;
  right: 216.25px;
  bottom: 20px;
  background: url(/images/template16/ke2pqinpsj.png)
    no-repeat center;
  background-size: cover;
  z-index: 21;
}
.groups-11 {
  position: relative;
  width: 333.125px;
  height: 45.625px;
  margin: -1.625px 0 0 1.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 11;
}
.span-nonce {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 271.75px;
  bottom: 13.875px;
  color: #808082;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.span-50 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15px;
  right: 11.875px;
  bottom: 13.875px;
  color: #4d4d4f;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 600;
  line-height: 15px;
  text-align: right;
  white-space: nowrap;
  z-index: 14;
}
.background-12 {
  position: absolute;
  width: 85.625px;
  height: 3.125px;
  right: 136.875px;
  bottom: 8.125px;
  background: url(/images/template16/tfbAV3Ggps.png)
    no-repeat center;
  background-size: cover;
  z-index: 1;
}
.groups-13 {
  position: absolute;
  width: 359.375px;
  height: 39.375px;
  right: 0;
  bottom: 708.75px;
  background: rgba(0, 0, 0, 0);
  z-index: 38;
}
.span-transfer {
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
  z-index: 40;
}
.image-14 {
  position: absolute;
  width: 13.125px;
  height: 14.375px;
  right: 16.25px;
  bottom: 11.875px;
  background: url(/images/template16/6bZqKkooQ7.png)
    no-repeat center;
  background-size: cover;
  z-index: 39;
}
.image-15 {
  position: absolute;
  width: 16.25px;
  height: 13.75px;
  right: 328.75px;
  bottom: 11.875px;
  background: url(/images/template16/jtJKXkn8xt.png)
    no-repeat center;
  background-size: cover;
  z-index: 41;
}
.groups-16 {
  position: absolute;
  width: 359.375px;
  height: 67.5px;
  right: 0;
  bottom: 638.125px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 34;
}
.usdt {
  display: flex ;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 26.875px;
  margin: 11.875px 0 0 0px;
  color: #383838;
  font-family: Inter, var(--default-font-family);
  font-size: 25.625px;
  font-weight: 700;
  line-height: 26.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 37;
}
.flex-row-e {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 16.875px;
  margin: 3.125px 0 0 0px;
  z-index: 36;
  gap:6px; 
}
.image-17 {
  flex-shrink: 0;
  position: relative;
  width: 8.125px;
  height: 6.875px;
  background: url(/images/template16/Vtz0Vutge4.png)
    no-repeat center;
  background-size: cover;
  z-index: 36;
}
.dollar {
  flex-shrink: 0;
  position: relative;
  height: 16.875px;
  color: #727272;
  font-family: Inter, var(--default-font-family);
  font-size: 15.625px;
  font-weight: 700;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 35;
}
        `}</style>

      <div className="main-container">
        <div className="root">
          <div className="groups">
            <span className="time">{formData.time || "12:18"}</span>
            <div className="image" />
            <div className="image-1" />
            <div className="image-2" />
            <div className="image-3" />
            <div className="image-4" />
            <div className="image-5" />
            <div className="image-6" />
          </div>
          <div className="flex-row-fcd">
            <div className="background" />
            <div className="background-7">
              <div className="groups-8">
                <div className="flex-column">
                  <span className="mar-10-31-pm">{Dates.formatTemplate16(formData.date)}</span>
                  <span className="completed">Completed</span>
                  <span className="xaf">{recipientFormatted}</span>
                </div>
                <div className="flex-column-fb">
                  <span className="date">Date</span>
                  <span className="status">Status</span>
                  <span className="recipient">Recipient</span>
                </div>
              </div>
            </div>
            <div className="groups-9">
              <div className="groups-a">
                <div className="background-b">
                  <span className="more-details">More Details</span>
                  <div className="image-c" />
                </div>
              </div>
              <div className="background-d" />
              <div className="groups-e">
                <div className="groups-f">
                  {/* Fixed: no NaN anymore */}
                  <span className="span-dot">{feeDisplay}</span>
                  <span className="span-network-fee">Network fee</span>
                  <div className="image-10" />
                </div>
                <div className="groups-11">
                  <span className="span-nonce">Nonce</span>
                  <span className="span-50">50</span>
                </div>
              </div>
            </div>
            <div className="background-12" />
          </div>
          <div className="groups-13">
            <span className="span-transfer">Transfer</span>
            <div className="image-14" />
            <div className="image-15" />
          </div>
          <div className="groups-16">
            <span className="usdt">-{amountDisplay}</span>
            <div className="flex-row-e">
              <div className="image-17" />
              <span className="dollar">${usdFormatted}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template16;