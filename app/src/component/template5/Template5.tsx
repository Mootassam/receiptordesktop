import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template5Props {
  formData: FormData;
}

// Format USD with commas and 2 decimals
const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const Template5: React.FC<Template5Props> = ({ formData }) => {
  const [usdtUsdRate, setUsdtUsdRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Fetch live USDT/USD rate from CoinGecko
  useEffect(() => {
    const fetchUsdtUsdRate = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd'
        );
        const data = await response.json();
        const rate = data.tether?.usd;
        if (rate && typeof rate === 'number') {
          setUsdtUsdRate(rate);
        } else {
          throw new Error('Invalid rate data');
        }
      } catch (err) {
        console.error('Failed to fetch USDT/USD rate:', err);
        setError(true);
        // Fallback to 1.00 (USDT is a stablecoin)
        setUsdtUsdRate(1.00);
      } finally {
        setLoading(false);
      }
    };

    fetchUsdtUsdRate();
  }, []);

  // Parse amount (remove commas if any)
  const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 35985.00;

  // Compute USD value only if rate is available
  let usdFormatted = '';
  if (!loading && usdtUsdRate !== null) {
    const usdValue = rawAmount * usdtUsdRate;
    usdFormatted = formatUSD(usdValue);
  } else if (loading) {
    usdFormatted = 'Loading...';
  } else if (error) {
    usdFormatted = 'Rate unavailable';
  }

  // Prepare deposit from text
  const depositFromText = `${formData.sender || "OxOB341b8dEd2598bd9fA3D6Df3d8A29B542ebc6a8"}`;

  return (
    <>
      <style>{`    :root {
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
  position: relative;
  width: 369.375px;
  height: 256.875px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 21;
  overflow: visible auto;
}
.groups-1 {
  position: relative;
  width: 369.375px;
  height: 38.75px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 28;
}
.time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 15.625px;
  right: 305px;
  bottom: 8.75px;
  color: #b1bbc5;
  font-family: Inter, var(--default-font-family);
  font-size: 13.75px;
  font-weight: 700;
  line-height: 15.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 33;
}
.image {
  position: absolute;
  width: 11.25px;
  height: 11.25px;
  right: 293.125px;
  bottom: 11.25px;
  background: url(./template5/PTtX6U5NpP.png)
    no-repeat center;
  background-size: cover;
  z-index: 32;
}
.image-2 {
  position: absolute;
  width: 24.375px;
  height: 11.25px;
  right: 13.75px;
  bottom: 10.625px;
  background: url(./template5/08kDoBRQFi.png)
    no-repeat center;
  background-size: cover;
  z-index: 29;
}
.image-3 {
  position: absolute;
  width: 17.5px;
  height: 11.25px;
  right: 62.5px;
  bottom: 10.625px;
  background: url(./template5/QbJ4rrJ1vJ.png)
    no-repeat center;
  background-size: cover;
  z-index: 31;
}
.image-4 {
  position: absolute;
  width: 15px;
  height: 11.25px;
  right: 43.125px;
  bottom: 10.625px;
  background: url(./template5/iApoegf9HZ.png)
    no-repeat center;
  background-size: cover;
  z-index: 30;
}
.groups-5 {
  position: relative;
  width: 369.375px;
  height: 53.125px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 26;
  overflow: visible auto;
}
.image-6 {
  position: relative;
  width: 21.25px;
  height: 13.75px;
  margin: 18.75px 0 0 15.625px;
  background: url(./template5/zvgC1TWB16.png)
    no-repeat center;
  background-size: cover;
  z-index: 27;
}
.usdt-dep {
  display: block;
  position: relative;
  height: 28.75px;
  margin: 22.5px 0 0 16.25px;
  color: #ccd6de;
  font-family: Inter, var(--default-font-family);
  font-size: 21.25px;
  font-weight: 600;
  line-height: 25.717px;
  text-align: left;
  white-space: nowrap;
  z-index: 34;
}
.groups-7 {
  position: relative;
  width: 369.375px;
  height: 84.375px;
  margin: 23.75px 0 0 0;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 23;
  overflow: visible auto;
}
.processed {
  display: block;
  position: relative;
  height: 16.875px;
  margin: 10.625px 0 0 15.625px;
  color: #477f98;
  font-family: Inter, var(--default-font-family);
  font-size: 14.375px;
  font-weight: 500;
  line-height: 16.875px;
  text-align: left;
  white-space: nowrap;
  z-index: 25;
}
.date-time {
  display: block;
  position: relative;
  height: 22.5px;
  margin: 11.25px 0 0 15px;
  color: #abbdcb;
  font-family: Inter, var(--default-font-family);
  font-size: 15px;
  font-weight: 400;
  line-height: 18.153px;
  text-align: left;
  white-space: nowrap;
  z-index: 24;
}
.groups-8 {
  position: relative;
  width: 369.375px;
  height: 541.875px;
  margin: 0.63px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
}
.background {
  position: absolute;
  width: 369.375px;
  height: 541.875px;
  right: 0;
  bottom: 0;
  background: #fff
    no-repeat center;
  background-size: cover;
  z-index: 2;
}
.groups-9 {
  position: relative;
  width: 369.375px;
  height: 277.5px;
  margin: 1.25px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
  overflow: visible auto;
}
.groups-a {
  position: relative;
  width: 369.375px;
  height: 136.875px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 15;
  overflow: visible auto;
}
.flex-row-ea {
  display: flex;
  align-items: center;
  position: relative;
  width: 291.25px;
  height: 45.625px;
  margin: 41.25px 0 0 0px;
  z-index: 20;
  gap:5px;
}
.plus-amount {
  flex-shrink: 0;
  position: relative;
  height: 45.625px;
  color: #57bdaa;
  font-family: Inter, var(--default-font-family);
  font-size: 41.25px;
  font-weight: 400;
  line-height: 45.625px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.usdt {
  flex-shrink: 0;
  position: relative;
  height: 27.5px;
  color: #b6cbc7;
  font-family: Inter, var(--default-font-family);
  font-size: 21.25px;
  font-weight: 400;
  line-height: 27.5px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.button {
  position: relative;
  height: 31.25px;
  margin: 7.5px 0 0 11.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 16;
  overflow: visible auto;
}
.background-b {
position: relative;
    width: max-content;
    background: #fafcfc;
    border: 0.63px solid #c2c9c8;
    z-index: 17;
    border-radius: 2.5px;
}
.usd-amount {
    padding: 4.5px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a5b8b5;
    font-family: Inter, var(--default-font-family);
    font-size: 13.125px;
    font-weight: 400;
    line-height: 15.884px;
    text-align: left;
    white-space: nowrap;
}
.groups-c {
  position: relative;
  width: 369.375px;
  height: 45.625px;
  margin: 7.5px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 13;
}
.deposit-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.875px;
  right: 269.50px;
  bottom: 13.75px;
  color: #a3a3a3;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 500;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 14;
}
.groups-d {
  position: absolute;
  width: 369.375px;
  height: 59.375px;
  right: 0;
  bottom: 26.875px;
  background: rgba(0, 0, 0, 0);
  z-index: 9;
}
.background-e {
  position: relative;
  width: 338.75px;
  height: 0.63px;
  margin: -0.63px 0 0 15px;
  background: #dedede;
  z-index: 12;
}
.flex-row-e {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 340.625px;
  min-height: 33.125px;
  margin: 5.625px 0 0 15.625px;
  z-index: 11;
}
.deposit-from {
  flex-shrink: 0;
  position: relative;
  height: 16.25px;
  color: #000;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 500;
  line-height: 16.25px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.oxobbded {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  position: relative;
  width: 185.625px;
  min-height: 33.125px;
  color: #89aeb8;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 500;
  line-height: 15.43px;
  text-align: right;
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: unset;
  overflow: visible;
  z-index: 10;
}
.groups-f {
  position: absolute;
  width: 369.375px;
  height: 64.375px;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 5;
}
.groups-10 {
  position: relative;
  width: 369.375px;
  height: 43.125px;
  margin: 20px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 6;
}
.network-type {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 16.25px;
  right: 277.17px;
  bottom: 13.75px;
  color: #000;
  font-family: Inter, var(--default-font-family);
  font-size: 12.5px;
  font-weight: 500;
  line-height: 15.128px;
  text-align: left;
  white-space: nowrap;
  z-index: 8;
}
.erc20 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  height: 14.375px;
  right: 14.375px;
  bottom: 15.625px;
  color: #1E1E1E;
  font-family: Inter, var(--default-font-family);
  font-size: 13.125px;
  font-weight: 400;
  line-height: 14.375px;
  text-align: left;
  white-space: nowrap;
  z-index: 7;
}
.background-11 {
  position: relative;
  width: 131.875px;
  height: 5px;
  margin: 251.875px 0 0 118.75px;
  background: url(./template5/2eyeJo5wcU.png)
    no-repeat center;
  background-size: cover;
  z-index: 3;
}
.background-12 {
  position: absolute;
  width: 369.375px;
  height: 256.875px;
  right: 0;
  bottom: 543.125px;
  background: #051d43
    no-repeat center;
  background-size: cover;
  z-index: 1;
}`}</style>

      <div className="main-container">
        <div className="root">
          <div className="groups">
            <div className="groups-1">
              <span className="time">{formData.time || "08:43"}</span>
              <div className="image"></div>
              <div className="image-2"></div>
              <div className="image-3"></div>
              <div className="image-4"></div>
            </div>
            <div className="groups-5"><div className="image-6"></div></div>
            <span className="usdt-dep">USDT (ERC20) Deposit</span>
            <div className="groups-7">
              <span className="processed">Processed</span>
              <span className="date-time">{Dates.formatTemplate5(formData.date)}</span>
            </div>
          </div>
          <div className="groups-8">
            <div className="background">
              <div className="groups-9">
                <div className="groups-a">
                  <div className="flex-row-ea">
                    <span className="plus-amount">{formData.amount ? `+${formData.amount}` : "+35,985.00"}</span>
                    <span className="usdt">USDT</span>
                  </div>
                  <div className="button">
                    <div className="background-b">
                      <span className="usd-amount">+{usdFormatted} USD</span>
                    </div>
                  </div>
                </div>
                <div className="groups-c">
                  <span className="deposit-details">Deposit details</span>
                </div>
                <div className="groups-d">
                  <div className="background-e"></div>
                  <div className="flex-row-e">
                    <span className="deposit-from">Deposit from</span>
                    <span className="oxobbded">{depositFromText}</span>
                  </div>
                </div>
                <div className="groups-f">
                  <div className="groups-10">
                    <span className="network-type">Network Type</span>
                    <span className="erc20">ERC20</span>
                  </div>
                </div>
              </div>
              <div className="background-11"></div>
            </div>
          </div>
        </div>
        <div className="background-12"></div>
      </div>
    </>
  );
};

export default Template5;