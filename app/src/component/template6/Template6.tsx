import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template6Props {
  formData: FormData;
}

const Template6: React.FC<Template6Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

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

  // Parse USDT amount (remove commas if any)
  const rawAmount = formData.amount
    ? parseFloat(String(formData.amount).replace(/,/g, ''))
    : 12496.31; // default fallback

  // Compute USD value
  let usdFormatted = '';
  if (!loading && usdtUsdRate !== null) {
    const usdValue = rawAmount * usdtUsdRate;
    usdFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(usdValue);
  } else if (loading) {
    usdFormatted = 'Loading...';
  } else if (error) {
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

  const defaultAddress = "0xB6755A53889e71cc0F72123d018E0c1f4A7DB8b9";

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
           font-size: 22px;
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
           width: 369px;
           height: 383px;
           margin: 2px 0 0 0;
           background: rgba(0, 0, 0, 0);
           z-index: 3;
           overflow: visible auto;
         }
         .groups-9 {
           position: relative;
           width: 369px;
           height: 194px;
           margin: 0 0 0 0;
           background: rgba(0, 0, 0, 0);
           z-index: 19;
         }
         .flex-column-f {
           position: absolute;
           width: 208px;
           height: 141px;
           right: 148px;
           bottom: 12px;
           font-size: 0px;
           z-index: 27;
         }
         .number-info {
           display: block;
           position: relative;
           height: 53px;
           margin: 0 0 0 4px;
           color: #232323;
           font-family: Inter, var(--default-font-family);
           font-size: 44px;
           font-weight: 400;
           line-height: 53px;
           text-align: left;
           white-space: nowrap;
           z-index: 27;
         }
         .button {
           position: relative;
           height: 28px;
           margin: 6px 0 0 0;
           background: rgba(0, 0, 0, 0);
           z-index: 21;
           overflow: visible auto;
         }
         .background {
           position: relative;
           width: max-content;
           display:flex;
           justify-content: center;
           align-items: center;
           height: 25px;
           margin: 2px 0 0 3px;
           background: #f7fbfb;
           border: 1px solid #ccd7d6;
           z-index: 22;
           border-radius: 3px 3px 3px 0;
           padding:4px 8px;
         }
         .amount {
           display: flex;
           align-items: center;
           justify-content: flex-start;
           height: 16px;
           right: 38px;
           bottom: 4px;
           color: #6e6b6c;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 15.733px;
           text-align: left;
           white-space: nowrap;
           z-index: 24;
         }
         .currency {
           display: flex;
           align-items: center;
           justify-content: flex-start;
           height: 15px;
           right: 6px;
           bottom: 5px;
           color: #999a9c;
           font-family: Inter, var(--default-font-family);
           font-size: 14px;
           font-weight: 200;
           line-height: 15px;
           text-align: left;
           white-space: nowrap;
           z-index: 23;
         }
         .symbol {
           display: flex;
           align-items: center;
           justify-content: center;
           width: 8px;
           height: 15px;
           right: 103px;
           bottom: 5px;
           color: #a0a0a2;
           font-family: Inter, var(--default-font-family);
           font-size: 11px;
           font-weight: 400;
           line-height: 13.313px;
           text-align: center;
           white-space: nowrap;
           z-index: 25;
         }
         .withdrawal-details {
           display: block;
           position: relative;
           height: 17px;
           margin: 37px 0 0 2px;
           color: #bab9ba;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 15.733px;
           text-align: left;
           white-space: nowrap;
           z-index: 20;
         }
         .crypto {
           display: flex;
           align-items: center;
           justify-content: flex-start;
           height: 24px;
           right: 80px;
           bottom: 114px;
           color: #a5a5a5;
           font-family: Inter, var(--default-font-family);
           font-size: 22px;
           font-weight: 400;
           line-height: 24px;
           text-align: left;
           white-space: nowrap;
           z-index: 26;
         }
         .groups-a {
           position: relative;
           width: 369px;
           height: 186px;
           margin: 3px 0 0 0;
           background: rgba(0, 0, 0, 0);
           z-index: 4;
           overflow: visible auto;
         }
         .groups-b {
           position: relative;
           width: 369px;
           height: 38px;
           margin: -1px 0 0 0;
           background: rgba(0, 0, 0, 0);
           z-index: 15;
           overflow: visible auto;
         }
         .background-c {
           position: relative;
           width: 341px;
           height: 3px;
           margin: 0 0 0 14px;
           background: url(${assetBase}template6/oU7Ojcv9P6.png) no-repeat center;
           background-size: cover;
           z-index: 18;
         }
         .flex-row {
           display: flex;
           align-items: center;
           justify-content: space-between;
           position: relative;
           width: 339px;
           height: 18px;
           margin: 7px 0 0 16px;
           z-index: 17;
         }
         .sending {
           flex-shrink: 0;
           position: relative;
           height: 18px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 18px;
           text-align: left;
           white-space: nowrap;
           z-index: 17;
         }
         .usdt {
           flex-shrink: 0;
           position: relative;
           height: 17px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 14px;
           font-weight: 400;
           line-height: 17px;
           text-align: right;
           white-space: nowrap;
           z-index: 16;
         }
         .groups-d {
           position: relative;
           width: 369px;
           height: 43px;
           margin: 1px 0 0 0;
           background: rgba(0, 0, 0, 0);
           z-index: 12;
         }
         .xbae {
           display: flex;
           align-items: center;
           justify-content: flex-end;
           position: absolute;
           width: 187px;
           height: 35px;
           right: 13px;
           bottom: 4px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 16.125px;
           text-align: right;
           text-overflow: initial;
           z-index: 13;
           overflow: hidden;
         }
         /* Override for the formatted address to stack vertically */
         .xbae > div {
           width: 100%;
         }
         .withdraw-to {
           display: flex;
           align-items: center;
           justify-content: flex-start;
           position: absolute;
           height: 16px;
           right: 282px;
           bottom: 15px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 15.733px;
           text-align: left;
           white-space: nowrap;
           z-index: 14;
         }
         .flex-row-e {
           display: flex;
           align-items: center;
           justify-content: space-between;
           position: relative;
           width: 338px;
           height: 18px;
           margin: 10px 0 0 16px;
           z-index: 11;
         }
         .network-type {
           flex-shrink: 0;
           position: relative;
           height: 18px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 18px;
           text-align: left;
           white-space: nowrap;
           z-index: 11;
         }
         .erc {
           flex-shrink: 0;
           position: relative;
           height: 15px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 15px;
           text-align: right;
           white-space: nowrap;
           z-index: 10;
         }
         .flex-row-cca {
           display: flex;
           align-items: center;
           justify-content: space-between;
           position: relative;
           width: 338px;
           height: 16px;
           margin: 14px 0 0 16px;
           z-index: 9;
         }
         .fee {
           flex-shrink: 0;
           position: relative;
           height: 16px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 16px;
           text-align: left;
           white-space: nowrap;
           z-index: 9;
         }
         .usdt-e {
           flex-shrink: 0;
           position: relative;
           height: 16px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 16px;
           text-align: right;
           white-space: nowrap;
           z-index: 8;
         }
         .groups-f {
           position: relative;
           width: 369px;
           height: 37px;
           margin: 7px 0 0 0;
           background: rgba(0, 0, 0, 0);
           z-index: 5;
         }
         .usdt-10 {
           display: flex;
           align-items: center;
           justify-content: flex-start;
           position: absolute;
           height: 17px;
           right: 15px;
           bottom: 10px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 16.943px;
           text-align: right;
           white-space: nowrap;
           z-index: 6;
         }
         .total {
           display: flex;
           align-items: center;
           justify-content: flex-start;
           position: absolute;
           height: 15px;
           right: 326px;
           bottom: 12px;
           color: #2F2F31;
           font-family: Inter, var(--default-font-family);
           font-size: 13px;
           font-weight: 400;
           line-height: 15px;
           text-align: left;
           white-space: nowrap;
           z-index: 7;
         }
         .background-11 {
           position: relative;
           width: 131px;
           height: 5px;
           margin: 132px 0 0 119px;
           background: url(${assetBase}template6/A1qzfmrCBy.png) no-repeat center;
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

         .crypto__amount { 
           display: flex;
           align-items: center;
           justify-content: flex-start;
           gap: 7px;
         }
      `}</style>

      <div className="main-container">
        <div className="groups">
          <div className="groups-1">
            <span className="time">{formData.time || "12:19"}</span>
            <div className="image"></div>
            <div className="image-2"></div>
            <div className="image-3"></div>
          </div>
          <div className="groups-4"><div className="image-5"></div></div>
          <span className="withdraw-usdt">Withdraw USDT (Eth)</span>
          <div className="groups-6">
            <span className="pending">Pending</span>
            <span className="time-info">{Dates.formatTemplate6(formData.date)}</span>
          </div>
        </div>
        <div className="groups-7">
          <div className="groups-8">
            <div className="groups-9">
              <div className="flex-column-f">
                <div className="crypto__amount">
                  <span className="number-info">{formData.amount || "12,496.31"}</span>
                  <span className="crypto">USDT</span>
                </div>
                <div className="button">
                  <div className="background">
                    <span className="amount">{usdFormatted} USD</span>
                  </div>
                </div>
                <span className="withdrawal-details">Withdrawal details</span>
              </div>
            </div>
            <div className="groups-a">
              <div className="groups-b">
                <div className="background-c"></div>
                <div className="flex-row">
                  <span className="sending">Sending</span>
                  <span className="usdt">{formData.amount ? `${formData.amount} USDT` : "12,486.31 USDT"}</span>
                </div>
              </div>
              <div className="groups-d">
                <span className="xbae">
                  {formData.receiver
                    ? formatReceiver(formData.receiver)
                    : formatReceiver(defaultAddress)}
                </span>
                <span className="withdraw-to">Withdraw to</span>
              </div>
              <div className="flex-row-e">
                <span className="network-type">Network Type</span>
                <span className="erc">ERC20</span>
              </div>
              <div className="flex-row-cca">
                <span className="fee">Fee</span>
                <span className="usdt-e">{formData.fee || "10.00"} USDT</span>
              </div>
              <div className="groups-f">
                <span className="usdt-10">{formData.amount ? `${formData.amount} USDT` : "12,496.31 USDT"}</span>
                <span className="total">Total</span>
              </div>
            </div>
          </div>
          <div className="background-11"></div>
        </div>
        <div className="background-12"></div>
        <div className="background-13"></div>
      </div>
    </>
  );
};

export default Template6;