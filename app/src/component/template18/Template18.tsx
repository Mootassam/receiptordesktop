import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template18Props {
  formData: FormData;
}

const Template18: React.FC<Template18Props> = ({ formData }) => {
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

  // Parse ETH amount (remove commas if any)
  const rawAmount = formData.amount
    ? parseFloat(String(formData.amount).replace(/,/g, ''))
    : 12496.31;

  // Compute USD value
  let usdFormatted = '';
  if (!loading && ethUsdRate !== null && ethUsdRate > 0) {
    const usdValue = rawAmount * ethUsdRate;
    usdFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(usdValue);
  } else if (loading) {
    usdFormatted = 'Loading...';
  } else {
    usdFormatted = 'Rate unavailable';
  }

  // Helper to split address into two lines with indentation on the second line
  const formatReceiver = (address: string) => {
    const splitIndex = 23;
    const firstLine = address.slice(0, splitIndex);
    const secondLine = address.slice(splitIndex);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span>{firstLine}</span>
        <span style={{ marginLeft: '24px' }}>{secondLine}</span>
      </div>
    );
  };

  const defaultAddress = '0xB6755A53889e71cc0F72123d018E0c1f4A7DB8b9';

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
          width: 369px;
          height: 800px;
          margin: 0 auto;
        }

        .groups {
          position: relative;
          width: 369px;
          height: 269px;
          margin: 0 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 28;
          overflow: visible auto;
        }

        .groups-1 {
          position: relative;
          width: 369px;
          height: 45px;
          margin: 2px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 35;
        }

        .time {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          height: 19px;
          right: 291px;
          bottom: 9px;
          color: #fff;
          font-family: Inter, var(--default-font-family);
          font-size: 17px;
          font-weight: 500;
          line-height: 19px;
          text-align: left;
          white-space: nowrap;
          z-index: 39;
        }

        .image {
          position: absolute;
          width: 27px;
          height: 13px;
          right: 19px;
          bottom: 11px;
          background: url(${assetBase}template6/NMvvKDDhXn.png) no-repeat center;
          background-size: cover;
          z-index: 36;
        }

        .image-2 {
          position: absolute;
          width: 20px;
          height: 13px;
          right: 74px;
          bottom: 11px;
          background: url(${assetBase}template6/EAts1ioTQm.png) no-repeat center;
          background-size: cover;
          z-index: 38;
        }

        .image-3 {
          position: absolute;
          width: 17px;
          height: 12px;
          right: 51px;
          bottom: 12px;
          background: url(${assetBase}template6/yigZ9OeWvY.png) no-repeat center;
          background-size: cover;
          z-index: 37;
        }

        .groups-4 {
          position: relative;
          width: 369px;
          height: 50px;
          margin: 1px 0 0 0;
          background: rgba(0, 0, 0, 0);
          z-index: 33;
          overflow: visible auto;
        }

        .image-5 {
          position: relative;
          width: 23px;
          height: 14px;
          margin: 16px 0 0 16px;
          background: url(${assetBase}template6/4iCMCT7nDJ.png) no-repeat center;
          background-size: cover;
          z-index: 34;
        }

        .withdraw-usdt {
          display: block;
          position: relative;
          height: 27px;
          margin: 27px 0 0 16px;
          color: #fff;
          font-family: Inter, var(--default-font-family);
          font-size: 19px;
          font-weight: 600;
          line-height: 26.625px;
          text-align: left;
          white-space: nowrap;
          z-index: 40;
        }

        .groups-6 {
          position: relative;
          width: 369px;
          height: 83px;
          margin: 26px 0 0 0;
          font-size: 0px;
          background: rgba(0, 0, 0, 0);
          z-index: 30;
          overflow: visible auto;
        }

        .pending {
          display: block;
          position: relative;
          height: 21px;
          margin: 10px 0 0 16px;
          color: #FBB658;
          font-family: Inter, var(--default-font-family);
          font-size: 15px;
          font-weight: 600;
          line-height: 18.153px;
          text-align: left;
          white-space: nowrap;
          z-index: 32;
        }

        .time-info {
          display: block;
          position: relative;
          height: 21px;
          margin: 9px 0 0 16px;
          color: #fff;
          font-family: Inter, var(--default-font-family);
          font-size: 17px;
          font-weight: 400;
          line-height: 20.574px;
          text-align: left;
          white-space: nowrap;
          z-index: 31;
        }

        .groups-7 {
          position: relative;
          width: 369px;
          height: 530px;
          margin: 1px 0 0 0;
          background: rgba(0, 0, 0, 0);
          overflow: visible auto;
        }

        .groups-8 {
          position: relative;
          background: rgba(0, 0, 0, 0);
          z-index: 3;
          overflow: visible auto;
        }

        /* ---------- NEW FLEX DETAILS CONTAINER ---------- */
        .details-flex {
          display: flex;
          flex-direction: column;
          padding: 0 16px;                 /* equal horizontal padding for all rows */
          width: 100%;
        }

        /* Amount block */
        .amount-header {
          margin-top: 41px;                /* original flex-column-f top spacing */
        }

        .crypto__amount {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 6px;
        }

        .number-info {
          color: #232323;
          font-family: Inter, var(--default-font-family);
          font-size: 44px;
          font-weight: 400;
          line-height: 53px;
          white-space: nowrap;
        }

        .crypto {
          color: #a5a5a5;
          font-family: Inter, var(--default-font-family);
          font-size: 22px;
          font-weight: 400;
          line-height: 24px;
          white-space: nowrap;
        }

        .button {
          margin-bottom: 33px;             /* gap to Withdrawal details */
        }

        .background {
          width: max-content;
          height: 25px;
          background: #f7fbfb;
          border: 1px solid #ccd7d6;
          border-radius: 3px 3px 3px 0;
          padding: 4px 8px;
          display: flex;
          align-items: center;
        }

        .amount {
          color: #6e6b6c;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 15.733px;
          white-space: nowrap;
        }

        /* Withdrawal details label */
        .withdrawal-details {
          color: #bab9ba;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 15.733px;
          white-space: nowrap;
          margin-bottom: 7px;              /* small gap before divider */
        }

        /* Divider line */
        .divider {
          width: 100%;
          height: 3px;
          background: url(${assetBase}template6/oU7Ojcv9P6.png) no-repeat center;
          background-size: cover;
          margin-bottom: 7px;
        }

        /* Generic detail row: label left, value right */
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        /* Sending row */
        .sending-label {
          color: #2F2F31;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 18px;
          white-space: nowrap;
        }

        .sending-value {
          color: #2F2F31;
          font-family: Inter, var(--default-font-family);
          font-size: 14px;
          font-weight: 400;
          line-height: 17px;
          text-align: right;
          white-space: nowrap;
        }

        /* Withdraw to row */
        .withdraw-to-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .withdraw-to-label {
          color: #2F2F31;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 15.733px;
          white-space: nowrap;
          margin-top: 4px;             /* align with first line of address */
        }

        .withdraw-to-value {
          color: #2F2F31;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 16.125px;
          text-align: right;
        }

        /* Network Type row */
        .network-type-label,
        .network-type-value {
          color: #2F2F31;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 18px;
          white-space: nowrap;
        }

        .network-type-value {
          text-align: right;
        }

        /* Fee row */
        .fee-label,
        .fee-value {
          color: #2F2F31;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 16px;
          white-space: nowrap;
        }

        .fee-value {
          text-align: right;
        }

        /* Total row */
        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 7px;
        }

        .total-label {
          color: #2F2F31;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 15px;
          white-space: nowrap;
        }

        .total-value {
          color: #2F2F31;
          font-family: Inter, var(--default-font-family);
          font-size: 13px;
          font-weight: 400;
          line-height: 16.943px;
          text-align: right;
          white-space: nowrap;
        }

        /* Bottom dash */
        .background-11 {
    position: absolute;
    bottom: 10px;
    width: 131px;
    height: 5px;
    left: 0;
    right: 0;
    margin: auto;
    background: url(/template6/A1qzfmrCBy.png) no-repeat center;
    background-size: cover;
    z-index: 2;
        }

        .background-12 {
          position: absolute;
          width: 369px;
          height: 269px;
          right: 0;
          bottom: 531px;
          background: #151d34 no-repeat center;
          background-size: cover;
          z-index: 1;
        }

        .background-13 {
          position: absolute;
          width: 369px;
          height: 530px;
          right: 0;
          bottom: 0;
          background: #fff no-repeat center;
          background-size: cover;
          z-index: 1;
        }
      `}</style>

      <div className="main-container">
        <div className="groups">
          <div className="groups-1">
            <span className="time">{formData.time || '12:19'}</span>
            <div className="image" />
            <div className="image-2" />
            <div className="image-3" />
          </div>
          <div className="groups-4">
            <div className="image-5" />
          </div>
          <span className="withdraw-usdt">
            Withdraw ETH (Ethereum (ERC20))
          </span>
          <div className="groups-6">
            <span className="pending">Pending</span>
            <span className="time-info">
              {Dates.formatTemplate6(formData.date)}
            </span>
          </div>
        </div>
        <div className="groups-7">
          <div className="groups-8">
            {/* ---- FLEX DETAILS SECTION ---- */}
            <div className="details-flex">
              {/* Amount header */}
              <div className="amount-header">
                <div className="crypto__amount">
                  <span className="number-info">
                    {formData.amount || '12,496.31'}
                  </span>
                  <span className="crypto">ETH</span>
                </div>
                <div className="button">
                  <div className="background">
                    <span className="amount">{usdFormatted} USD</span>
                  </div>
                </div>
              </div>

              {/* Withdrawal details label */}
              <span className="withdrawal-details">Withdrawal details</span>

              {/* Divider */}
              <div className="divider" />

              {/* Sending row */}
              <div className="detail-row">
                <span className="sending-label">Sending</span>
                <span className="sending-value">
                  {formData.amount ? `${formData.amount} ETH` : '12,486.31 ETH'}
                </span>
              </div>

              {/* Withdraw to row */}
              <div className="withdraw-to-row">
                <span className="withdraw-to-label">Withdraw to</span>
                <div className="withdraw-to-value">
                  {formData.receiver
                    ? formatReceiver(formData.receiver)
                    : formatReceiver(defaultAddress)}
                </div>
              </div>

              {/* Network Type row */}
              <div className="detail-row">
                <span className="network-type-label">Network Type</span>
                <span className="network-type-value">ERC20</span>
              </div>

              {/* Fee row */}
              <div className="detail-row">
                <span className="fee-label">Fee</span>
                <span className="fee-value">
                  {formData.fee || '10.00'} ETH
                </span>
              </div>

              {/* Total row */}
              <div className="total-row">
                <span className="total-label">Total</span>
                <span className="total-value">
                  {formData.amount ? `${formData.amount} ETH` : '12,496.31 ETH'}
                </span>
              </div>
            </div>

          </div>
          <div className="background-11" />

        </div>
        <div className="background-12" />
        <div className="background-13" />
      </div>
    </>
  );
};

export default Template18;