import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import StatusBar from '../../shared/StatusBar';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template25Props {
  formData: FormData;
}

const Template25: React.FC<Template25Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

  const [btcUsdRate, setBtcUsdRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch live BTC/USD rate from CoinGecko
  useEffect(() => {
    const fetchBtcUsdRate = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'bitcoin',
              vs_currencies: 'usd'
            }
          }
        );
        const data = await response.data;
        const rate = data.bitcoin?.usd;
        if (rate && typeof rate === 'number' && rate > 0) {
          setBtcUsdRate(rate);
        } else {
          throw new Error('Invalid rate data');
        }
      } catch (err) {
        console.error('Failed to fetch BTC/USD rate:', err);
        setBtcUsdRate(0);
      } finally {
        setLoading(false);
      }
    };
    fetchBtcUsdRate();
  }, []);

  // Helper: parse number from string (remove commas)
  const parseNumber = (value: string | number | undefined, defaultValue: number): number => {
    if (value === undefined || value === null) return defaultValue;
    const parsed = parseFloat(String(value).replace(/,/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  };

  // Amount in USD (from formData.amount)
  const amountUSD = parseNumber(formData.amount, 52.88);
  // Fee in USD (from formData.fee)
  const feeUSD = parseNumber(formData.fee, 1.10); // default fee ~0.000015 BTC at 73k

  // Effective rate - use API value, show 0 if unavailable
  const rate = btcUsdRate !== null && btcUsdRate > 0 ? btcUsdRate : 0;

  // Convert to BTC
  const amountBTC = rate > 0 ? amountUSD / rate : 0;
  const feeBTC = rate > 0 ? feeUSD / rate : 0;

  // Format BTC with 8 decimals
  const formatBTC = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    });
  };

  const amountBTCFormatted = formatBTC(amountBTC);
  const feeBTCFormatted = formatBTC(feeBTC);

  // Format USD values
  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const amountUSDFormatted = formatUSD(amountUSD);
  const feeUSDFormatted = formatUSD(feeUSD);
  const pricePerCoinFormatted = rate > 0 ? formatUSD(rate).replace('$', '') + '/BTC' : '$0/BTC';

  // Format transaction ID with ellipsis
  const formatTxid = (txid: string | undefined): string => {
    const defaultTxid = 'efe21...6a8de';
    if (!txid) return defaultTxid;
    if (txid.length <= 13) return txid;
    return `${txid.slice(0, 6)}...${txid.slice(-6)}`;
  };

  // Prepare display values
  const displayTime = formData.time || '2:44';
  const displayAmountBTC = amountBTCFormatted;
  const displayAmountUSD = formData.amount ? `~$${formData.amount}` : '~$52.88';
  const displayReceiver = formData.receiver || '38N87V6h6edvpgTm3EMLqnUg5xHqJH9XFh';
  const displayPrice = rate > 0 ? `$${rate.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}/BTC` : '$73,708.1/BTC';
  const displayNetwork = 'Bitcoin';
  const displayFeeBTC = feeBTCFormatted;
  const displayTxid = formatTxid(formData.txid);
   const displayDate = Dates.formatTemplate25(formData.date);
  const displayReference = formData.reference || '392059425';

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
          background: #000000;
        }

        .groups {
          position: relative;
          width: 369.375px;
          height: 41.25px;
          margin: 0 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 44;
        }

        .time {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 15px;
          right: 303.125px;
          bottom: 10.625px;
          color: #bebebe;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 15px;
          text-align: left;
          white-space: nowrap;
          z-index: 48;
        }

        .image {
          position: absolute;
          width: 23.75px;
          height: 11.875px;
          right: 17.5px;
          bottom: 11.875px;
          background: url(${assetBase}template25/60x0yixYKv.png) no-repeat center;
          background-size: cover;
          z-index: 45;
        }

        .image-1 {
          position: absolute;
          width: 15.625px;
          height: 11.875px;
          right: 46.25px;
          bottom: 11.875px;
          background: url(${assetBase}template25/44whL4tWDv.png) no-repeat center;
          background-size: cover;
          z-index: 46;
        }

        .image-2 {
          position: absolute;
          width: 16.25px;
          height: 10.625px;
          right: 66.875px;
          bottom: 12.5px;
          background: url(${assetBase}template25/rWfsTdv8Kj.png) no-repeat center;
          background-size: cover;
          z-index: 47;
        }

        .groups-3 {
          position: relative;
          width: 369.375px;
          height: 42.5px;
          margin: 1.25px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 42;
          overflow: visible auto;
        }

        .image-4 {
          position: relative;
          width: 7.5px;
          height: 15px;
          margin: 15.625px 0 0 22.5px;
          background: url(${assetBase}template25/s56wFp9qQc.png) no-repeat center;
          background-size: cover;
          z-index: 43;
        }

        .groups-5 {
          position: relative;
          width: 369.375px;
          height: 122.5px;
          margin: 0.63px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 38;
          overflow: visible auto;
        }

        .image-6 {
          position: relative;
          width: 34.375px;
          height: 34.375px;
          margin: 10px 0 0 167.5px;
          background: url(${assetBase}template25/s8uW9SyYkz.png) no-repeat center;
          background-size: cover;
          z-index: 41;
        }

        .text-2 {
          display: block;
          position: relative;
          height: 25px;
          margin: 9.375px 0 0 35px;
          color: #dedede;
          font-family: Inter, var(--default-font-family);
          font-size: 21.25px;
          font-weight: 700;
          line-height: 25px;
          text-align: left;
          white-space: nowrap;
          z-index: 40;
        }

        .text-3 {
          display: block;
          position: relative;
          height: 17px;
          margin: 5px 0 0 156.25px;
          color: #767676;
          font-family: Inter, var(--default-font-family);
          font-size: 13.75px;
          font-weight: 400;
          line-height: 16.641px;
          text-align: left;
          white-space: nowrap;
          z-index: 39;
        }

        .group-2 {
          position: relative;
          width: 369.375px;
          height: 67.5px;
          margin: 1.25px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 34;
        }

        .img-3 {
          position: absolute;
          width: 30.625px;
          height: 30.625px;
          right: 316.25px;
          bottom: 21.25px;
          background: url(${assetBase}template25/Ggge2DOSBX.png) no-repeat center;
          background-size: cover;
          z-index: 37;
        }

        .text-4 {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 18.125px;
          right: 21.875px;
          bottom: 26.875px;
          color: #949494;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 17.397px;
          text-align: left;
          white-space: nowrap;
          z-index: 35;
        }

        .text-5 {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 15.625px;
          right: 260px;
          bottom: 28.75px;
          color: #fff;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 15.625px;
          text-align: left;
          white-space: nowrap;
          z-index: 36;
        }

        /* ---------- REFACTORED FLEX SECTION (formerly .group-3) ---------- */
        .group-3 {
          width: 369.375px;
          margin: 24.375px 0 0 0;
          padding: 0 21.875px 0 21.875px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          background: rgba(0, 0, 0, 0);
          z-index: 1;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .detail-label {
          color: #fff;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: left;
          white-space: nowrap;
        }

        .detail-value {
          color: #939393; /* matches original values */
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 1.4;
          text-align: right;
          word-break: break-word;
          max-width: 200px;
        }

        /* Special styles for address row with copy icon */
        .address-row {
          align-items: center;
        }

        .address-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .copy-icon {
          width: 13.125px;
          height: 13.125px;
          background: url(${assetBase}template25/DGON2Zdu4y.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Price row with info icon */
        .price-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-icon {
          width: 13.125px;
          height: 13.125px;
          background: url(${assetBase}template25/2EJYvnYGtA.png) no-repeat center;
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
          height: 13.75px;
          background: url(${assetBase}template25/W1E4UzXzrU.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Transaction ID row with copy icon */
        .txid-value-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .txid-copy-icon {
          width: 13.125px;
          height: 13.125px;
          background: url(${assetBase}template25/NMrbBXQyqq.png) no-repeat center;
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
          height: 13.125px;
          background: url(${assetBase}template25/mruFnv7Gc3.png) no-repeat center;
          background-size: cover;
          flex-shrink: 0;
        }

        /* Status row (kept absolute for simplicity, matches original) */
        .group-2 {
          position: relative;
          width: 369.375px;
          height: 67.5px;
          margin: 1.25px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 34;
        }

        /* Footer section */
        .groups-12 {
          position: relative;
          // width: 369.375px;
          height: 92.5px;
          margin: 10px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 2;
          overflow: visible auto;
        }

        .button {
          position: relative;
          // width: 328.75px;
          // height: 48.75px;
          // margin: 1.875px auto;
          background: rgba(0, 0, 0, 0);
          z-index: 4;
          overflow: visible auto;
        }

        .background {
           position: relative;
    // width: 323.125px;
    height: 45.625px;
    margin: 1.25px 0 0 3.125px;
    background: #bafe2f;
    border: 0.63px solid #9ec739;
    z-index: 5;
    border-radius: 24.375px;
        }

        .view-on-blockchain {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 16.875px;
          right: 71.875px;
          bottom: 14.375px;
          color: #334c12;
          font-family: Inter, var(--default-font-family);
          font-size: 12.5px;
          font-weight: 700;
          line-height: 15.128px;
          text-align: left;
          white-space: nowrap;
          z-index: 6;
        }

        .transaction-arrival {
          display: block;
          position: relative;
          height: 18.125px;
          margin: 9.375px 0 0 0px;
          color: #bbbbbb;
          font-family: Inter, var(--default-font-family);
          font-size: 14.375px;
          font-weight: 400;
          line-height: 17.397px;
          text-align: center;
          white-space: nowrap;
          z-index: 3;
        }

        .background-13 {
          position: relative;
          width: 130.625px;
          height: 5px;
          margin: 27.5px 0 0 120px;
          background: url(${assetBase}template25/DBy7dYiUFP.png) no-repeat center;
          background-size: cover;
        }

        .background-14 {
          position: absolute;
          width: 369.375px;
          height: 1.875px;
          right: 0;
          bottom: 521.875px;
          background: url(${assetBase}template25/uZKPScuzsO.png) no-repeat center;
          background-size: cover;
          z-index: 33;
        }
      `}</style>

      <div className="main-container">
        <StatusBar defaultTheme="dark" />
        <div className="groups-3">
          <div className="image-4" />
        </div>
        <div className="groups-5">
          <div className="image-6" />
          <span className="text-2">Withdrawn {displayAmountBTC} BTC</span>
          <span className="text-3">{displayAmountUSD}</span>
        </div>
        <div className="group-2">
          <div className="img-3" />
          <span className="text-4">Completed</span>
          <span className="text-5">Status</span>
        </div>

        {/* ----- REFACTORED DETAILS SECTION ----- */}
        <div className="group-3">
          {/* Address */}
          <div className="detail-row address-row">
            <span className="detail-label">Address</span>
            <div className="address-value-wrapper">
              <span className="detail-value">{displayReceiver}</span>
              <div className="copy-icon" />
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
            <span className="detail-value">{displayFeeBTC} BTC</span>
          </div>

          {/* Transaction ID */}
          <div className="detail-row">
            <span className="detail-label">Transaction ID</span>
            <div className="txid-value-wrapper">
              <span className="detail-value">{displayTxid}</span>
              <div className="txid-copy-icon" />
            </div>
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

          {/* Footer (button + help text) */}
          <div className="groups-12">
            <div className="button">
              <div className="background">
                <span className="view-on-blockchain">
                  View on blockchain explorer
                </span>
              </div>
            </div>
            <span className="transaction-arrival">
              Why hasn't my transaction arrived?
            </span>
          </div>
        </div>

        <div className="background-13" />
        <div className="background-14" />
      </div>
    </>
  );
};

export default Template25;