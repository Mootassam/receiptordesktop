import React, { useEffect, useState } from 'react';
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';
import axios from 'axios';

interface Template19Props {
  formData: FormData;
}

const Template19: React.FC<Template19Props> = ({ formData }) => {
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
        )
        const data = await response.data;
        const rate = data.bitcoin?.usd;
        if (rate && typeof rate === 'number' && rate > 0) {
          setBtcUsdRate(rate);
          console.log('Template19 - BTC rate from API:', rate);
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

  // Parse amount (USD) and fee (USD) with defaults
  const rawAmountUSD = (() => {
    if (formData.amount) {
      const parsed = parseFloat(String(formData.amount).replace(/,/g, ''));
      return isNaN(parsed) ? 175.97 : parsed;
    }
    return 175.97;
  })();

  const rawFeeUSD = (() => {
    if (formData.fee) {
      const parsed = parseFloat(String(formData.fee).replace(/,/g, ''));
      return isNaN(parsed) ? 3.11 : parsed;
    }
    return 3.11;
  })();

  const totalUSD = rawAmountUSD + rawFeeUSD;

  // Compute BTC values - use API value, handle 0 rate
  const effectiveRate = btcUsdRate !== null && btcUsdRate > 0 ? btcUsdRate : 0;
  const amountBTC = effectiveRate > 0 ? rawAmountUSD / effectiveRate : 0;
  const totalBTC = effectiveRate > 0 ? totalUSD / effectiveRate : 0;

  // Format BTC with 8 decimal places
  const formatBTC = (value: number) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    });
  };

  const amountBTCFormatted = formatBTC(amountBTC);
  const totalBTCFormatted = formatBTC(totalBTC);

  // Format USD values
  const formattedAmountUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rawAmountUSD);

  const formattedFeeUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rawFeeUSD);

  const formattedTotalUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalUSD);

  // Helper (unused but kept for consistency)
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
  width: 446.4px;
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
  background: rgba(0, 0, 0, 0);
}
.groups {
  position: absolute;
  width: 446.4px;
  height: 795.2px;
  right: 0;
  bottom: 4.8px;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
}
.groups-1 {
  position: relative;
  width: 446.4px;
  height: 252px;
  margin: 0 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 28;
  overflow: visible auto;
}
.image {

}
.bitcoin-withdraw {
  display: block;
  position: relative;
  height: 34.4px;
  margin: 21.6px 0 0 28.801px;
  color: #282828;
  font-family: Inter, var(--default-font-family);
  font-size: 28px;
  font-weight: 700;
  line-height: 33.886px;
  text-align: left;
  white-space: nowrap;
  z-index: 32;
}
.today-at {
  display: block;
  position: relative;
  height: 22.4px;
  margin: 10.4px 0 0 26.398px;
  color: #828282;
  font-family: Inter, var(--default-font-family);
  font-size: 16.80000114440918px;
  font-weight: 400;
  line-height: 20.332px;
  text-align: left;
  white-space: nowrap;
  z-index: 31;
}
.dollar {
  display: block;
  position: relative;
  height: 56.8px;
  margin: 28.8px 0 0 27.199px;
  color: #6d6d6d;
  font-family: Inter, var(--default-font-family);
  font-size: 49.60000228881836px;
  font-weight: 700;
  line-height: 56.8px;
  text-align: left;
  white-space: nowrap;
  z-index: 30;
}
.btc {
  display: block;
  position: relative;
  height: 30px;
  margin: 7.2px 0 0 28px;
  color: #797979;
  font-family: Inter, var(--default-font-family);
  font-size: 24.80000114440918px;
  font-weight: 700;
  line-height: 30px;
  text-align: left;
  white-space: nowrap;
  z-index: 29;
}
.background {
  position: relative;
  width: 397.6px;
  height: 2.4px;
  margin: 0 0 0 24px;
  background: url(./template19/RaUFahFZJB.png)
    no-repeat center;
  background-size: cover;
  z-index: 27;
}
.groups-2 {
  position: relative;
  width: 446.4px;
  height: 533.6px;
  margin: 7.2px 0 0 0;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
}
.groups-3 {
  position: absolute;
  width: 446.4px;
  height: 335.2px;
  right: 0;
  bottom: 193.6px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 13;
}
.tracking {
  display: block;
  position: relative;
  height: 33.6px;
  margin: 27.2px 0 0 27.199px;
  color: #303030;
  font-family: Inter, var(--default-font-family);
  font-size: 24.80000114440918px;
  font-weight: 700;
  line-height: 30.014px;
  text-align: left;
  white-space: nowrap;
  z-index: 26;
}
.groups-4 {
  position: absolute;
  width: 446.4px;
  height: 82.4px;
  right: 0;
  bottom: 177.6px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 22;
}
.today-at-pm {
  display: block;
  position: relative;
  height: 21.6px;
  margin: 16px 0 0 49.598px;
  color: #404040;
  font-family: Inter, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 19.364px;
  text-align: left;
  white-space: nowrap;
  z-index: 24;
}
.withdrawal-created {
  display: block;
  position: relative;
  height: 17px;
  margin: 4.8px 0 0 49.598px;
  color: #626262;
  font-family: Inter, var(--default-font-family);
  font-size: 14.40000057220459px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  white-space: nowrap;
  z-index: 23;
}
.image-5 {
  position: absolute;
  width: 13.6px;
  height: 97.6px;
  right: 414.402px;
  bottom: 142.4px;
  background: url(./template19/BKCfeEPpc2.png)
    no-repeat center;
  background-size: cover;
  z-index: 25;
}
.groups-6 {
  position: absolute;
  width: 432.8px;
  height: 84.8px;
  right: 3.202px;
  bottom: 95.2px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 18;
}
.upcoming {
  display: block;
  position: relative;
  height: 21.6px;
  margin: 20px 0 0 40.801px;
  color: #3a3a3a;
  font-family: Inter, var(--default-font-family);
  font-size: 16.80000114440918px;
  font-weight: 700;
  line-height: 20.332px;
  text-align: left;
  white-space: nowrap;
  z-index: 20;
}
.awaiting-confirm {
  display: block;
  position: relative;
  height: 19.2px;
  margin: 4.8px 0 0 40px;
  color: #5d5d5d;
  font-family: Inter, var(--default-font-family);
  font-size: 15.199999809265137px;
  font-weight: 400;
  line-height: 18.395px;
  text-align: left;
  white-space: nowrap;
  z-index: 19;
}
.background-7 {
  position: absolute;
  width: 6.4px;
  height: 63.2px;
  right: 418.402px;
  bottom: 76px;
  background: url(./template19/GhpxU8bjEm.png)
    no-repeat center;
  background-size: cover;
  z-index: 21;
}
.groups-8 {
  position: absolute;
  width: 432px;
  height: 100.8px;
  right: 2.4px;
  bottom: 190.4px;
  background: rgba(0, 0, 0, 0);
  z-index: 14;
}
.flex-column-c {
  position: absolute;
  width: 396px;
  height: 79.2px;
  right: 24px;
  bottom: 0px;
  font-size: 0px;
  z-index: 16;
}
.upcoming-9 {
  display: block;
  position: relative;
  height: 20.8px;
  margin: 0 0 0 26.398px;
  color: #383838;
  font-family: Inter, var(--default-font-family);
  font-size: 16.80000114440918px;
  font-weight: 700;
  line-height: 20.332px;
  text-align: left;
  white-space: nowrap;
  z-index: 16;
}
.withdrawal-confi {
  display: block;
  position: relative;
  height: 18.4px;
  margin: 4.8px 0 0 26.398px;
  color: #646464;
  font-family: Inter, var(--default-font-family);
  font-size: 14.40000057220459px;
  font-weight: 400;
  line-height: 17.427px;
  text-align: left;
  white-space: nowrap;
  z-index: 15;
}
.background-a {
  position: relative;
  width: 396px;
  height: 0.8px;
  margin: 34.4px 0 0 0;
  background: #e6e6e6;
  z-index: 12;
}
.background-b {
  position: absolute;
  width: 13.6px;
  height: 14.4px;
  right: 412.002px;
  bottom: 61.6px;
  background: url(./template19/kmr2AvdkxX.png)
    no-repeat center;
  background-size: cover;
  z-index: 17;
}
.groups-c {
  position: absolute;
  width: 446.4px;
  height: 191.2px;
  right: 0;
  bottom: 0px;
  font-size: 0px;
  background: rgba(0, 0, 0, 0);
  z-index: 4;
}
.exchange-rate-fees {
  display: block;
  position: relative;
  height: 34.4px;
  margin: 35.2px 0 0 28.801px;
  color: #3a3a3a;
  font-family: Inter, var(--default-font-family);
  font-size: 24px;
  font-weight: 700;
  line-height: 29.045px;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.flex-row-bf {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 392.802px;
  height: 20.8px;
  margin: 10.4px 0 0 27.199px;
  z-index: 10;
}
.transfer-amount {
  flex-shrink: 0;
  position: relative;
  height: 20.8px;
  color: #898989;
  font-family: Inter, var(--default-font-family);
  font-size: 16.80000114440918px;
  font-weight: 400;
  line-height: 20.8px;
  text-align: left;
  white-space: nowrap;
  z-index: 10;
}
.dollar-d {
  flex-shrink: 0;
  position: relative;
  height: 20.8px;
  color: #444444;
  font-family: Inter, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 20.8px;
  text-align: left;
  white-space: nowrap;
  z-index: 9;
}
.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 392.001px;
  height: 20.8px;
  margin: 16px 0 0 28px;
  z-index: 8;
}
.fees {
  flex-shrink: 0;
  position: relative;
  height: 19.2px;
  color: #929292;
  font-family: Inter, var(--default-font-family);
  font-size: 16.80000114440918px;
  font-weight: 400;
  line-height: 19.2px;
  text-align: left;
  white-space: nowrap;
  z-index: 8;
}
.fees-amount {
  flex-shrink: 0;
  position: relative;
  height: 20.8px;
  color: #2a2a2a;
  font-family: Inter, var(--default-font-family);
  font-size: 15.199999809265137px;
  font-weight: 700;
  line-height: 20.8px;
  text-align: left;
  white-space: nowrap;
  z-index: 7;
}
.flex-row-e {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 393.598px;
  height: 21.6px;
  margin: 16px 0 0 27.199px;
  z-index: 6;
}
.total {
  flex-shrink: 0;
  position: relative;
  height: 17.6px;
  color: #919191;
  font-family: Inter, var(--default-font-family);
  font-size: 16.80000114440918px;
  font-weight: 400;
  line-height: 17.6px;
  text-align: left;
  white-space: nowrap;
  z-index: 6;
}
.total-amount {
  flex-shrink: 0;
  position: relative;
  height: 21.6px;
  color: #373737;
  font-family: Inter, var(--default-font-family);
  font-size: 16px;
  font-weight: 700;
  line-height: 21.6px;
  text-align: left;
  white-space: nowrap;
  z-index: 5;
}
.image-f {
  position: absolute;
  width: 446.4px;
  height: 800px;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  background-size: cover;
  z-index: 1;
}

      `}</style>

      <>
        <div className="main-container">
          <div className="root">
            <div className="groups">
              <div className="groups-1">
                <span className="bitcoin-withdraw">Bitcoin withdrawal</span>
                <span className="today-at">{Dates.formatTemplate19(formData.date)}</span>
                <span className="dollar">{formattedAmountUSD}</span>
                <span className="btc">
                  {loading ? 'Loading...' : `${amountBTCFormatted} BTC`}
                </span>
              </div>
              <div className="background" />
              <div className="groups-2">
                <div className="groups-3">
                  <span className="tracking">Tracking</span>
                  <div className="groups-4">
                    <span className="today-at-pm">{Dates.formatTemplate19(formData.date)}</span>
                    <span className="withdrawal-created">Withdrawal created</span>
                  </div>
                  <div className="image-5" />
                  <div className="groups-6">
                    <span className="upcoming">Upcoming</span>
                    <span className="awaiting-confirm">Awaiting confirmation</span>
                  </div>
                  <div className="background-7" />
                </div>
                <div className="groups-8">
                  <div className="flex-column-c">
                    <span className="upcoming-9">Upcoming</span>
                    <span className="withdrawal-confi">
                      Withdrawal confirmed on-chain
                    </span>
                    <div className="background-a" />
                  </div>
                  <div className="background-b" />
                </div>
              </div>
            </div>
            <div className="groups-c">
              <span className="exchange-rate-fees">Exchange rate and fees</span>
              <div className="flex-row-bf">
                <span className="transfer-amount">Transfer amount</span>
                <span className="dollar-d">{formattedAmountUSD}</span>
              </div>
              <div className="flex-row">
                <span className="fees">Fees</span>
                <span className="fees-amount">{formattedFeeUSD}</span>
              </div>
              <div className="flex-row-e">
                <span className="total">Total</span>
                <span className="total-amount">
                  {loading ? 'Loading...' : `${formattedTotalUSD} (${totalBTCFormatted} BTC)`}
                </span>
              </div>
            </div>
          </div>
          <div className="image-f" />
        </div>
      </>
    </>
  );
};

export default Template19;