import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template23Props {
  formData: FormData;
}

const Template23: React.FC<Template23Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  const [ethUsdRate, setEthUsdRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch live ETH/USD rate from CoinGecko
  useEffect(() => {
    const fetchEthUsdRate = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'ethereum',
              vs_currencies: 'usd'
            }
          }
        );
        const data = await response.data;
        const rate = data.ethereum?.usd;
        if (rate && typeof rate === 'number' && rate > 0) {
          setEthUsdRate(rate);
        } else {
          throw new Error('Invalid rate data');
        }
      } catch (err) {
        console.error('Failed to fetch ETH/USD rate:', err);
        setEthUsdRate(0);
      } finally {
        setLoading(false);
      }
    };
    fetchEthUsdRate();
  }, []);

  // Helper: parse number from string (remove commas)
  const parseNumber = (value: string | number | undefined, defaultValue: number): number => {
    if (value === undefined || value === null) return defaultValue;
    const parsed = parseFloat(String(value).replace(/,/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  };

  const amountUSD = parseNumber(formData.amount, 52.05);
  const feeUSD = parseNumber(formData.fee, 0.16);

  const rate = ethUsdRate !== null && ethUsdRate > 0 ? ethUsdRate : 0;

  const amountETH = rate > 0 ? amountUSD / rate : 0;
  const feeETH = rate > 0 ? feeUSD / rate : 0;

  const formatETH = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    });
  };

  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const amountETHFormatted = formatETH(amountETH);
  const feeETHFormatted = formatETH(feeETH);
  const amountUSDFormatted = formatUSD(amountUSD);
  const pricePerCoinFormatted = rate > 0
    ? `$${rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/ETH`
    : '$0/ETH';

  const displayTime = formData.time || '4:37';
  const displayAmountETH = amountETHFormatted;
  const displayAmountUSD = formData.amount ? `~$${formData.amount}` : '~$52.05';
  const displayAddress = formData.receiver || '0x9096498474448D8Ec4aF3837498d43b3eFf6f664';
  const displayPrice = pricePerCoinFormatted;
  const displayNetwork = formData?.chain || 'Ethereum (ERC20)';
  const displayFeeETH = feeETHFormatted;
  const displayDate = formData.date || 'Apr 8,2026 4:36AM';
  const displayReference = formData.reference || '391788550';
  const displayStatus = formData.status || 'Pending';

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
          background: #000000;
        }

        .groups {
          position: relative;
          width: 369.375px;
          height: 41.25px;
          margin: 0 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 42;
        }

        .time {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 15px;
          right: 303.125px;
          bottom: 10.625px;
          color: #bababa;
          font-family: Inter, var(--default-font-family);
          font-size: 13.75px;
          font-weight: 700;
          line-height: 15px;
          text-align: left;
          white-space: nowrap;
          z-index: 46;
        }

        .image {
          position: absolute;
          width: 23.75px;
          height: 12.5px;
          right: 17.5px;
          bottom: 11.875px;
          background: url(${assetBase}template23/YgVw2zxC9c.png) no-repeat center;
          background-size: cover;
          z-index: 43;
        }

        .text-2 {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 12.5px;
          right: 45px;
          bottom: 11.875px;
          color: #adadad;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 12.5px;
          text-align: left;
          white-space: nowrap;
          z-index: 44;
        }

        .image-1 {
          position: absolute;
          width: 16.25px;
          height: 11.25px;
          right: 66.875px;
          bottom: 12.5px;
          background: url(${assetBase}template23/gYHCr7y34U.png) no-repeat center;
          background-size: cover;
          z-index: 45;
        }

        .groups-2 {
          position: relative;
          width: 369.375px;
          height: 42.5px;
          margin: 1.25px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 40;
          overflow: visible auto;
        }

        .image-3 {
          position: relative;
          width: 7.5px;
          height: 15px;
          margin: 15.625px 0 0 22.5px;
          background: url(${assetBase}template23/5dLYuxouvK.png) no-repeat center;
          background-size: cover;
          z-index: 41;
        }

        .groups-4 {
          position: relative;
          width: 369.375px;
          height: 543.75px;
          margin: 2.5px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 5;
          overflow: visible auto;
        }

        .groups-5 {
          position: relative;
          width: 369.375px;
          height: 117.5px;
          margin: 0 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 36;
          overflow: visible auto;
        }

        .image-6 {
          position: relative;
          width: 34.375px;
          height: 34.375px;
          margin: 8.125px 0 0 167.5px;
          background: url(${assetBase}template23/hqKrsDQLAx.png) no-repeat center;
          background-size: cover;
          z-index: 39;
        }

        .withdrawing {
          display: flex;
          justify-content:center ; 
          align-items: center ; 
          position: relative;
          height: 28.125px;
          margin: 9.375px 0 0 0px;
          color: #dedede;
          font-family: Inter, var(--default-font-family);
          font-size: 21.25px;
          font-weight: 700;
          line-height: 25.717px;
          text-align: left;
          white-space: nowrap;
          z-index: 38;
        }

        .withdraw-amount {
           display: flex;
          justify-content:center ; 
          align-items: center ; 
          height: 17px;
          margin: 1.875px 0 0 0px;
          color: #7f7f7f;
          font-family: Inter, var(--default-font-family);
          font-size: 13.75px;
          font-weight: 400;
          line-height: 16.641px;
          text-align: left;
          white-space: nowrap;
          z-index: 37;
        }

        /* Status row (unchanged from original) */
        .flex-row-fab {
          position: relative;
          width: 323.125px;
          height: 30.625px;
          margin: 20px 0 0 22.5px;
          z-index: 35;
        }

        .image-7 {
          position: absolute;
          width: 30.625px;
          height: 30.625px;
          right: 292.5px;
          bottom: 0;
          background: url(${assetBase}template23/okLOHGVFNn.png) no-repeat center;
          background-size: cover;
          z-index: 35;
        }

        .status {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 15.625px;
          right: 236.25px;
          bottom: 7.5px;
          color: #b3b3b3;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 15.625px;
          text-align: left;
          white-space: nowrap;
          z-index: 34;
        }

        .pending {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 17px;
          right: 17.125px;
          bottom: 6.125px;
          color: #909090;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 17px;
          text-align: left;
          white-space: nowrap;
          z-index: 33;
        }

        .image-8 {
          position: absolute;
          width: 13.125px;
          height: 12.5px;
          right: 0;
          bottom: 8.75px;
          background: url(${assetBase}template23/YHckQzzCvw.png) no-repeat center;
          background-size: cover;
          z-index: 32;
        }

        .processing-message {
          display: block;
          position: relative;
          height: 16.875px;
          margin: 2.5px 0 0 145px;
          color: #747474;
          font-family: Inter, var(--default-font-family);
          font-size: 11.875px;
          font-weight: 400;
          line-height: 14.371px;
          text-align: left;
          white-space: nowrap;
          z-index: 31;
        }

        .background {
          position: relative;
          width: 369.375px;
          height: 1.875px;
          margin: 19.375px 0 0 0;
          background: url(${assetBase}template23/R5qNuU3XRY.png) no-repeat center;
          background-size: cover;
          z-index: 30;
        }

        /* ---------- FLEX DETAILS SECTION ---------- */
        .details-section {
          width: 369.375px;
          margin: 0;
          padding: 0 22.5px 0 22.5px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          background: rgba(0, 0, 0, 0);
        }

        /* Address block */
        .address-block {
          margin-top: 20px;
        }

        .address-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .address-label {
          color: #b7b7b7;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: left;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .address-value-wrapper {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          max-width: 200px; /* forces wrapping */
        }

        .address-text {
          color: #9e9e9e;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: right;
          word-break: break-all;
        }

        .copy-icon {
          width: 13.125px;
          height: 13.125px;
          background: url(${assetBase}template23/yZQDrbfGfp.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        .address-four {
          text-align: right;
          margin-top: 4px;
          padding-right: 2px;
        }

        .four-number {
          color: #8f8f8f;
          font-family: Inter, var(--default-font-family);
          font-size: 15.625px;
          font-weight: 400;
          line-height: 1;
        }

        /* General detail rows */
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .detail-label {
          color: #b7b7b7;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: left;
          white-space: nowrap;
        }

        .detail-value {
          color: #9e9e9e;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: right;
          word-break: break-word;
          max-width: 210px;
        }

        /* Price row with info icon */
        .price-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-icon {
          width: 13.125px;
          height: 12.5px;
          background: url(${assetBase}template23/Oi3wzveLoA.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Network row with icon */
        .network-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .network-icon {
          width: 13.75px;
          height: 14.375px;
          background: url(${assetBase}template23/yXcqcMsiqw.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Reference row with copy icon */
        .ref-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ref-copy-icon {
          width: 13.125px;
          height: 13.75px;
          background: url(${assetBase}template23/yu4g91LADp.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        .button {
          position: relative;
          width: 328.75px;
          height: 51.875px;
          margin: 72.5px 0 0 20px;
          background: rgba(0, 0, 0, 0);
          z-index: 2;
          overflow: visible auto;
        }

        .background-13 {
          position: relative;
          width: 323.125px;
          height: 45.625px;
          margin: 3.125px 0 0 3.125px;
          background: #123d05;
          border: 0.63px solid #16390d;
          z-index: 3;
          border-radius: 23.125px;
        }

        .cancel-withdrawal {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 16.25px;
          right: 102.5px;
          bottom: 14.375px;
          color: #96cc3e;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 700;
          line-height: 15.128px;
          text-align: left;
          white-space: nowrap;
          z-index: 4;
        }

        .background-14 {
          position: relative;
          width: 130px;
          height: 5px;
          margin: 31.875px 0 0 120px;
          background: url(${assetBase}template23/Bo0CJNCWoH.png) no-repeat center;
          background-size: cover;
          z-index: 1;
        }
      `}</style>

      <div className="main-container">
        <div className="root">
          <div className="groups">
            <span className="time">{displayTime}</span>
            <div className="image" />
            <span className="text-2">4G</span>
            <div className="image-1" />
          </div>
          <div className="groups-2">
            <div className="image-3" />
          </div>
          <div className="groups-4">
            <div className="groups-5">
              <div className="image-6" />
              <span className="withdrawing">Withdrawing {displayAmountETH} ETH</span>
              <span className="withdraw-amount">{displayAmountUSD}</span>
            </div>
            <div className="flex-row-fab">
              <div className="image-7" />
              <span className="status">Status</span>
              <span className="pending">{displayStatus}</span>
              <div className="image-8" />
            </div>
            <span className="processing-message">
              We're processing your withdrawal.
            </span>
            <div className="background" />

            {/* ----- DETAILS SECTION ----- */}.
            <div className="details-section">
              {/* Address block - now with wrapping text and inline icon */}
              <div className="address-block">
                <div className="address-row">
                  <span className="address-label">Address</span>
                  <div className="address-value-wrapper">
                    <span className="address-text">{displayAddress}</span>
                    <div className="copy-icon" />
                  </div>
                </div>
                
              </div>

              {/* Price */}
              <div className="detail-row">
                <span className="detail-label">Price</span>
                <div className="price-value-wrapper">
                  <span className="detail-value">{displayPrice}</span>
                  <div className="info-icon" />
                </div>
              </div>

              {/* Network */}
              <div className="detail-row">
                <span className="detail-label">Network</span>
                <div className="network-value-wrapper">
                  <span className="detail-value">{displayNetwork}</span>
                  <div className="network-icon" />
                </div>
              </div>

              {/* Network fee */}
              <div className="detail-row">
                <span className="detail-label">Network fee</span>
                <span className="detail-value">{displayFeeETH} ETH</span>
              </div>

              {/* Submitted time */}
              <div className="detail-row">
                <span className="detail-label">Submitted time</span>
                <span className="detail-value">{displayDate}</span>
              </div>

              {/* Reference no. */}
              <div className="detail-row">
                <span className="detail-label">Reference no.</span>
                <div className="ref-value-wrapper">
                  <span className="detail-value">{displayReference}</span>
                  <div className="ref-copy-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="button">
            <div className="background-13">
              <span className="cancel-withdrawal">Cancel withdrawal</span>
            </div>
          </div>
          <div className="background-14" />
        </div>
      </div>
    </>
  );
};

export default Template23;