import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template4Props {
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

const Template4: React.FC<Template4Props> = ({ formData }) => {
  const assetBase = window.location.protocol === 'file:' ? './' : '/';

  const [ethUsdRate, setEthUsdRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Fetch live ETH/USD rate from CoinGecko
  useEffect(() => {
    const fetchEthUsdRate = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'ethereum',
              vs_currencies: 'usd',
            },
          }
        );
        const data = response.data;
        const rate = data.ethereum?.usd;
        if (rate && typeof rate === 'number' && rate > 0) {
          setEthUsdRate(rate);
        } else {
          throw new Error('Invalid rate data');
        }
      } catch (err) {
        console.error('Failed to fetch ETH/USD rate:', err);
        setError(true);
        setEthUsdRate(0);
      } finally {
        setLoading(false);
      }
    };

    fetchEthUsdRate();
  }, []);

  // Parse amount (remove commas if any)
  const rawAmount = formData.amount
    ? parseFloat(String(formData.amount).replace(/,/g, ''))
    : 35985.0;

  // Compute USD value only if rate is available
  let usdFormatted = '';
  if (!loading && ethUsdRate !== null && ethUsdRate > 0) {
    const usdValue = rawAmount * ethUsdRate;
    usdFormatted = formatUSD(usdValue);
  } else if (loading) {
    usdFormatted = 'Loading...';
  } else {
    usdFormatted = 'Rate unavailable';
  }

  // Prepare deposit from text
  const depositFromText = `${formData.sender || 'OxOB341b8dEd2598bd9fA3D6Df3d8A29B542ebc6a8'
    }`;

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
          background: url(${assetBase}template5/PTtX6U5NpP.png) no-repeat center;
          background-size: cover;
          z-index: 32;
        }

        .image-2 {
          position: absolute;
          width: 24.375px;
          height: 11.25px;
          right: 13.75px;
          bottom: 10.625px;
          background: url(${assetBase}template5/08kDoBRQFi.png) no-repeat center;
          background-size: cover;
          z-index: 29;
        }

        .image-3 {
          position: absolute;
          width: 17.5px;
          height: 11.25px;
          right: 62.5px;
          bottom: 10.625px;
          background: url(${assetBase}template5/QbJ4rrJ1vJ.png) no-repeat center;
          background-size: cover;
          z-index: 31;
        }

        .image-4 {
          position: absolute;
          width: 15px;
          height: 11.25px;
          right: 43.125px;
          bottom: 10.625px;
          background: url(${assetBase}template5/iApoegf9HZ.png) no-repeat center;
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
          background: url(${assetBase}template5/zvgC1TWB16.png) no-repeat center;
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
          background: #fff no-repeat center;
          background-size: cover;
          z-index: 2;
        }

        /* ---------- NEW FLEX DETAIL SECTION ---------- */
        .groups-9 {
          position: relative;
          width: 369.375px;
          height: auto;               /* let content decide height */
          margin: 1.25px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 4;
          display: flex;
          flex-direction: column;
          padding: 0 15.625px;        /* equal horizontal padding for all rows */
        }

        /* Amount block */
        .amount-wrapper {
          margin-top: 41.25px;        /* align with original top spacing */
        }

        .flex-row-ea {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 7.5px;       /* original gap before button */
        }

        .plus-amount {
          color: #57bdaa;
          font-family: Inter, var(--default-font-family);
          font-size: 41.25px;
          font-weight: 400;
          line-height: 45.625px;
          white-space: nowrap;
        }

        .usdt {
          color: #b6cbc7;
          font-family: Inter, var(--default-font-family);
          font-size: 21.25px;
          font-weight: 400;
          line-height: 27.5px;
          white-space: nowrap;
        }

        .button {
          margin-left: 0;             /* was 11.875px, now padding gives left space */
        }

        .background-b {
          width: max-content;
          background: #fafcfc;
          border: 0.63px solid #c2c9c8;
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

        /* Deposit details header */
        .deposit-details-header {
          height: 45.625px;
          display: flex;
          align-items: center;
          margin-top: 7.5px;          /* original groups-c margin-top */
        }

        .deposit-details-text {
          color: #a3a3a3;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 500;
          line-height: 15.128px;
          text-align: left;
          white-space: nowrap;
        }

        /* Divider line */
        .divider {
          width: 100%;
          height: 0.63px;
          background: #dedede;
          margin-top: 1.25px;         /* small gap */
        }

        /* Deposit from row */
        .deposit-from-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 33.125px;
          margin-top: 5.625px;        /* original flex-row-e margin-top */
        }

        .deposit-from-label {
          color: #000;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 500;
          line-height: 16.25px;
          white-space: nowrap;
        }

        .deposit-from-address {
          color: #89aeb8;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 500;
          line-height: 15.43px;
          text-align: right;
          white-space: pre-line;
          word-break: break-all;
          overflow-wrap: break-word;
          max-width: 185px;
        }

        /* Network Type row */
        .network-type-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 43.125px;
        }

        .network-type-label {
          color: #000;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 500;
          line-height: 15.128px;
          white-space: nowrap;
        }

        .network-type-value {
          color: #1E1E1E;
          font-family: Inter, var(--default-font-family);
          font-size: 13.125px;
          font-weight: 400;
          line-height: 14.375px;
          white-space: nowrap;
        }

        /* Bottom dash remains untouched */
        .background-11 {
    position: absolute;
    width: 131.875px;
    height: 5px;
    left: 0;
    right: 0;
    bottom: 10px;
    margin: auto;
    background: url(/template5/2eyeJo5wcU.png) no-repeat center;
    background-size: cover;
    z-index: 3;
        }

        .background-12 {
          position: absolute;
          width: 369.375px;
          height: 256.875px;
          right: 0;
          bottom: 543.125px;
          background: #051d43 no-repeat center;
          background-size: cover;
          z-index: 1;
        }
      `}</style>

      <div className="main-container">
        <div className="root">
          <div className="groups">
            <div className="groups-1">
              <span className="time">{formData.time || '08:43'}</span>
              <div className="image" />
              <div className="image-2" />
              <div className="image-3" />
              <div className="image-4" />
            </div>
            <div className="groups-5">
              <div className="image-6" />
            </div>
            <span className="usdt-dep">
              Deposit ETH (Ethereum (ERC20))
            </span>
            <div className="groups-7">
              <span className="processed">Processed</span>
              <span className="date-time">
                {Dates.formatTemplate5(formData.date)}
              </span>
            </div>
          </div>
          <div className="groups-8">
            <div className="background">
              {/* ---- FLEX DETAIL SECTION ---- */}
              <div className="groups-9">
                {/* Amount */}
                <div className="amount-wrapper">
                  <div className="flex-row-ea">
                    <span className="plus-amount">
                      {formData.amount ? `+${formData.amount}` : '+35,985.00'}
                    </span>
                    <span className="usdt">ETH</span>
                  </div>
                  <div className="button">
                    <div className="background-b">
                      <span className="usd-amount">+{usdFormatted} USD</span>
                    </div>
                  </div>
                </div>

                {/* Deposit details header */}
                <div className="deposit-details-header">
                  <span className="deposit-details-text">Deposit details</span>
                </div>

                {/* Divider */}
                <div className="divider" />

                {/* Deposit from */}
                <div className="deposit-from-row">
                  <span className="deposit-from-label">Deposit from</span>
                  <span className="deposit-from-address">{depositFromText}</span>
                </div>

                {/* Network Type */}
                <div className="network-type-row">
                  <span className="network-type-label">Network Type</span>
                  <span className="network-type-value">ERC20</span>
                </div>
              </div>

              <div className="background-11" />
            </div>
          </div>
        </div>
        <div className="background-12" />
      </div>
    </>
  );
};

export default Template4;