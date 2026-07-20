import React from 'react';
import { FormData } from '../../shared/FormDataContext';
import StatusBar from '../../shared/StatusBar';
import Dates from '../../shared/dates';

interface Template11Props {
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

// Format txid: first 5, last 5  -> "0x13b...294c4"
const formatTxid = (txid: string) => truncateString(txid, 5, 5);

// Format USD amount with commas and 2 decimal places
const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Small exchange rate USDT -> USD (realistic variation)
const USDT_TO_USD_RATE = 1.001;

const Template11: React.FC<Template11Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";

    // Parse amount (remove commas if any)
    const rawAmount = formData.amount ? parseFloat(String(formData.amount).replace(/,/g, '')) : 58.860333;
    const amountDisplay = formData.amount ? `${formData.amount}USDT` : "58.860333USDT";
    const usdValue = rawAmount * USDT_TO_USD_RATE;
    const usdFormatted = formatUSD(usdValue);
    const usdDisplay = usdFormatted.replace('$', '~$');

    // Format txid
    const txidFormatted = formatTxid(formData.txid || "0x13b294c4");

    // Address
    const senderAddress = formData.sender || "0x98af70c4339476438a4c47f3796726d119097534";

    // Fee display
    const feeDisplay = formData.fee !== undefined ? `${formData.fee}` : "0.15";

    // Reference number
    const referenceNo = formData.referenceNo || "372620932";

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
                    background: rgba(0, 0, 0, 0);
                }

                .groups {
                    position: relative;
                    width: 359.375px;
                    height: 43.75px;
                    margin: 0.63px 0 0 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 47;
                }

                .time {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    position: absolute;
                    height: 15.625px;
                    right: 289.375px;
                    bottom: 10.625px;
                    color: #353535;
                    font-family: Inter, var(--default-font-family);
                    font-size: 14.375px;
                    font-weight: 700;
                    line-height: 15.625px;
                    text-align: left;
                    white-space: nowrap;
                    z-index: 53;
                }

                .image {
                    position: absolute;
                    width: 28.75px;
                    height: 14.375px;
                    right: 31.25px;
                    bottom: 10.625px;
                    background: url(${assetBase}template11/dU7BYQnb1j.png) no-repeat center;
                    background-size: cover;
                    z-index: 48;
                }

                .image-1 {
                    position: absolute;
                    width: 17.5px;
                    height: 13.125px;
                    right: 89.375px;
                    bottom: 11.25px;
                    background: url(${assetBase}template11/sMpUjnsXT8.png) no-repeat center;
                    background-size: cover;
                    z-index: 50;
                }

                .image-2 {
                    position: absolute;
                    width: 16.875px;
                    height: 13.125px;
                    right: 66.25px;
                    bottom: 11.25px;
                    background: url(${assetBase}template11/oLFOhVzcHw.png) no-repeat center;
                    background-size: cover;
                    z-index: 49;
                }

                .image-3 {
                    position: absolute;
                    width: 11.875px;
                    height: 12.5px;
                    right: 271.25px;
                    bottom: 11.25px;
                    background: url(${assetBase}template11/pKc5G9DM4p.png) no-repeat center;
                    background-size: cover;
                    z-index: 52;
                }

                .image-4 {
                    position: absolute;
                    width: 12.5px;
                    height: 6.875px;
                    right: 250.625px;
                    bottom: 13.75px;
                    background: url(${assetBase}template11/iUCbzrNnPb.png) no-repeat center;
                    background-size: cover;
                    z-index: 51;
                }

                .groups-5 {
                    position: relative;
                    width: 359.375px;
                    height: 520.625px;
                    margin: 0.63px 0 0 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 7;
                    overflow: visible auto;
                }

                .groups-6 {
                    position: relative;
                    width: 359.375px;
                    height: 206.25px;
                    margin: 0 0 0 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 35;
                    overflow: visible auto;
                }

                .groups-7 {
                    position: relative;
                    width: 359.375px;
                    height: 43.75px;
                    margin: 0 0 0 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 45;
                    overflow: visible auto;
                }

                .image-8 {
                    position: relative;
                    width: 6.25px;
                    height: 10.625px;
                    margin: 20.625px 0 0 19.375px;
                    background: url(${assetBase}template11/yWQiG2TOCi.png) no-repeat center;
                    background-size: cover;
                    z-index: 46;
                }

                .groups-9 {
                    position: relative;
                    width: 359.375px;
                    height: 95.625px;
                    margin: 0.63px 0 0 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 41;
                    overflow: visible auto;
                }

                .image-a {
                    position: relative;
                    width: 33.125px;
                    height: 33.125px;
                    margin: 5px 0 0 163.125px;
                    background: url(${assetBase}template11/OyRgi3FVHB.png) no-repeat center;
                    background-size: cover;
                    z-index: 44;
                }

                .withdrawn {
                    display: flex;
                    justify-content: center;
                    position: relative;
                    height: 16.875px;
                    margin: 6.25px 0 0 0px;
                    color: #2a2a2a;
                    font-family: Inter, var(--default-font-family);
                    font-size: 15px;
                    font-weight: 700;
                    line-height: 16.875px;
                    text-align: left;
                    white-space: nowrap;
                    z-index: 43;
                }

                .withdrawn-amount {
                    display: block;
                    position: relative;
                    height: 13.75px;
                    margin: 5px 0 0 159.375px;
                    color: #afafaf;
                    font-family: Inter, var(--default-font-family);
                    font-size: 11.875px;
                    font-weight: 400;
                    line-height: 13.75px;
                    text-align: left;
                    white-space: nowrap;
                    z-index: 42;
                }

                .groups-b {
                    position: relative;
                    width: 359.375px;
                    height: 58.75px;
                    margin: 3.125px 0 0 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 37;
                }

                .image-c {
                    position: absolute;
                    width: 25.625px;
                    height: 26.25px;
                    right: 314.375px;
                    bottom: 18.125px;
                    background: url(${assetBase}template11/rF10jm2PCr.png) no-repeat center;
                    background-size: cover;
                    z-index: 40;
                }

                .completed {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    position: absolute;
                    height: 15px;
                    right: 18.75px;
                    bottom: 23.125px;
                    color: #8d8d8d;
                    font-family: Inter, var(--default-font-family);
                    font-size: 11.875px;
                    font-weight: 400;
                    line-height: 14.371px;
                    text-align: left;
                    white-space: nowrap;
                    z-index: 38;
                }

                .status {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    position: absolute;
                    height: 12.5px;
                    right: 266.875px;
                    bottom: 25px;
                    color: #616161;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 12.5px;
                    text-align: left;
                    white-space: nowrap;
                    z-index: 39;
                }

                .background {
                    position: relative;
                    width: 359.375px;
                    height: 1.875px;
                    margin: 0.63px 0 0 0;
                    background: url(${assetBase}template11/gdoQL29TRD.png) no-repeat center;
                    background-size: cover;
                    z-index: 36;
                }

                /* ---------- NEW FLEX-BASED DETAIL CONTAINER ---------- */
                .detail-container {
                    display: flex;
                    flex-direction: column;
                    padding: 0 18.75px;
                    width: 359.375px;
                    min-height: 310.625px;
                    margin-top: 3.75px;
                    background: rgba(0, 0, 0, 0);
                    z-index: 8;
                    overflow: visible auto;
                }

                .detail-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }

                /* Address row – separate styling needed for the icon gap */
                .address-row {
                    min-height: 55.625px;
                    margin-top: 7.5px;
                }

                .address-label {
                    font-weight: 500;
                    color: #000;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    line-height: 13.125px;
                    text-align: left;
                    white-space: nowrap;
                }

                .address-value-group {
                    display: flex;
                    align-items: start;
                    justify-content: flex-end;
                    gap: 5px;
                    width: 166.25px;
                }

                .address-value-text {
                    color: #8d8d8d;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 13.965px;
                    text-align: right;
                    white-space: pre-line;
                    word-break: break-all;
                    overflow-wrap: break-word;
                    flex: 1;
                }

                .icon-address-copy {
                    width: 10px;
                    height: 10px;
                    background: url(${assetBase}template11/vjN0AqgajB.png) no-repeat center;
                    background-size: cover;
                    flex-shrink: 0;
                }

                /* Price row */
                .price-row {
                    height: 41.875px;
                    margin-top: 1.25px;
                }

                .price-left-group {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .price-label {
                    font-weight: 500;
                    color: #000;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    line-height: 12.5px;
                    text-align: left;
                    white-space: nowrap;
                }

                .icon-price-info {
                    width: 11.25px;
                    height: 11.25px;
                    background: url(${assetBase}template11/N5ZUvMUgaj.png) no-repeat center;
                    background-size: cover;
                }

                .price-value {
                    color: #8d8d8d;
                    font-family: Inter, var(--default-font-family);
                    font-size: 11.875px;
                    font-weight: 400;
                    line-height: 14.371px;
                    text-align: right;
                    white-space: nowrap;
                }

                /* Network row */
                .network-row {
                    height: 40.625px;
                    margin-top: 0.63px;
                }

                .network-label {
                    font-weight: 500;
                    color: #000;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    line-height: 12.5px;
                    text-align: left;
                    white-space: nowrap;
                }

                .network-right-group {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .icon-network {
                    width: 11.875px;
                    height: 11.875px;
                    background: url(${assetBase}template11/po3TdbxcBr.png) no-repeat center;
                    background-size: cover;
                }

                .network-value {
                    color: #8a8b8a;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 13.965px;
                    text-align: right;
                    white-space: nowrap;
                }

                /* Network fee row */
                .fee-row {
                    height: 40.625px;
                    margin-top: 0.63px;
                }

                .fee-label {
                    font-weight: 500;
                    color: #000;
                    font-family: Inter, var(--default-font-family);
                    font-size: 11.875px;
                    line-height: 13.125px;
                    text-align: left;
                    white-space: nowrap;
                }

                .fee-value {
                    color: #8b8b8b;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 13.965px;
                    text-align: right;
                    white-space: nowrap;
                }

                /* Txid row */
                .txid-row {
                    min-height: 35.625px;
                    margin-top: 0.63px;
                }

                .txid-label {
                    font-weight: 500;
                    color: #000;
                    font-family: Inter, var(--default-font-family);
                    font-size: 11.875px;
                    line-height: 13.125px;
                    text-align: left;
                    white-space: nowrap;
                }

                .txid-right-group {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .txid-value-text {
                    color: #8b8b8b;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 13.965px;
                    text-align: right;
                    white-space: nowrap;
                }

                .icon-txid-copy {
                    width: 10px;
                    height: 10px;
                    background: url(${assetBase}template11/yb3uAjK1sV.png) no-repeat center;
                    background-size: cover;
                }

                /* Submitted time row */
                .time-row {
                    height: 37.5px;
                    margin-top: 1.25px;
                }

                .time-label {
                    font-weight: 500;
                    color: #000;
                    font-family: Inter, var(--default-font-family);
                    font-size: 11.875px;
                    line-height: 13.125px;
                    text-align: left;
                    white-space: nowrap;
                }

                .time-value {
                    color: #8e8e8e;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 13.965px;
                    text-align: right;
                    white-space: nowrap;
                }

                /* Reference no row */
                .ref-row {
                    height: 42.5px;
                    margin-top: 0.63px;
                }

                .ref-label {
                    font-weight: 500;
                    color: #000;
                    font-family: Inter, var(--default-font-family);
                    font-size: 11.875px;
                    line-height: 13.125px;
                    text-align: left;
                    white-space: nowrap;
                }

                .ref-right-group {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .ref-value-text {
                    color: #8e8e8e;
                    font-family: Inter, var(--default-font-family);
                    font-size: 12.5px;
                    font-weight: 400;
                    line-height: 13.965px;
                    text-align: right;
                    white-space: nowrap;
                }

                .icon-ref-copy {
                    width: 10px;
                    height: 10px;
                    background: url(${assetBase}template11/xtBePPB5bh.png) no-repeat center;
                    background-size: cover;
                }

                /* Remaining unchanged styles */
                .button {
                    position: relative;
                    width: 325px;
                    height: 44.375px;
                    margin: 93.125px 0 0 16.875px;
                    background: rgba(0, 0, 0, 0);
                    z-index: 4;
                    overflow: visible auto;
                }

                .background-1b {
                    position: relative;
                    width: 320.625px;
                    height: 38.75px;
                    margin: 3.125px 0 0 2.5px;
                    background: #2a6c16;
                    border: 0.63px solid #3c682e;
                    z-index: 5;
                    border-radius: 18.75px;
                }

                .view-blockchain-explorer {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    position: absolute;
                    height: 14.375px;
                    right: 85.625px;
                    bottom: 11.875px;
                    color: #b5d0ad;
                    font-family: Inter, var(--default-font-family);
                    font-size: 10.625px;
                    font-weight: 700;
                    line-height: 12.859px;
                    text-align: left;
                    white-space: nowrap;
                    z-index: 6;
                }

                .transaction-arrived {
                    display: block;
                    position: relative;
                    height: 14.375px;
                    margin: 18.75px 0 0 88.125px;
                    color: #4a4a4a;
                    font-family: Inter, var(--default-font-family);
                    font-size: 10px;
                    font-weight: 700;
                    line-height: 12.102px;
                    text-align: left;
                    white-space: nowrap;
                    z-index: 54;
                }

                .background-1c {
                    position: relative;
                    width: 85.625px;
                    height: 3.125px;
                    margin: 52.5px 0 0 136.875px;
                    background: url(${assetBase}template11/O8fvXbjBsf.png) no-repeat center;
                    background-size: cover;
                    z-index: 3;
                }

                .image-1d {
                    position: absolute;
                    width: 359.375px;
                    height: 251.875px;
                    right: 0;
                    bottom: 548.125px;
                    background: #fff;
                    background-size: cover;
                    z-index: 1;
                }

                .image-1e {
                    position: absolute;
                    width: 359.375px;
                    height: 555px;
                    right: 0;
                    bottom: 0;
                    background: #fff;
                    z-index: 2;
                }
            `}</style>

            <div className="main-container">
                <div className="root">
                    <StatusBar defaultTheme="light" />
                    <div className="groups-5">
                        <div className="groups-6">
                            <div className="groups-7">
                                <div className="image-8"></div>
                            </div>
                            <div className="groups-9">
                                <div className="image-a"></div>
                                <span className="withdrawn">Withdrawn {amountDisplay}</span>
                                <span className="withdrawn-amount">{usdDisplay}</span>
                            </div>
                            <div className="groups-b">
                                <div className="image-c"></div>
                                <span className="completed">Completed</span>
                                <span className="status">Status</span>
                            </div>
                            <div className="background"></div>
                        </div>

                        {/* ========== FLEX DETAIL SECTION ========== */}
                        <div className="detail-container">
                            {/* Address */}
                            <div className="detail-row address-row">
                                <span className="address-label">Address</span>
                                <div className="address-value-group">
                                    <span className="address-value-text">{senderAddress}</span>
                                    <div className="icon-address-copy" />
                                </div>
                            </div>

                            {/* Price */}
                            <div className="detail-row price-row">
                                <div className="price-left-group">
                                    <span className="price-label">Price</span>
                                    <div className="icon-price-info" />
                                </div>
                                <span className="price-value">$0.99/USDT</span>
                            </div>

                            {/* Network */}
                            <div className="detail-row network-row">
                                <span className="network-label">Network</span>
                                <div className="network-right-group">
                                    <div className="icon-network" />
                                    <span className="network-value">Ethereum(ERC20)</span>
                                </div>
                            </div>

                            {/* Network fee */}
                            <div className="detail-row fee-row">
                                <span className="fee-label">Network fee</span>
                                <span className="fee-value">{feeDisplay} USDT</span>
                            </div>

                            {/* Transaction ID */}
                            <div className="detail-row txid-row">
                                <span className="txid-label">Transaction ID</span>
                                <div className="txid-right-group">
                                    <span className="txid-value-text">{txidFormatted}</span>
                                    <div className="icon-txid-copy" />
                                </div>
                            </div>

                            {/* Submitted time */}
                            <div className="detail-row time-row">
                                <span className="time-label">Submitted time</span>
                                <span className="time-value">{Dates.formatTemplate11(formData.date)}</span>
                            </div>

                            {/* Reference no. */}
                            <div className="detail-row ref-row">
                                <span className="ref-label">Reference no.</span>
                                <div className="ref-right-group">
                                    <span className="ref-value-text">{referenceNo}</span>
                                    <div className="icon-ref-copy" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="button">
                        <div className="background-1b">
                            <span className="view-blockchain-explorer">View on blockchain explorer</span>
                        </div>
                    </div>
                    <span className="transaction-arrived">Why hasn't my transaction arrived?</span>
                    <div className="background-1c"></div>
                </div>
                <div className="image-1d"></div>
                <div className="image-1e"></div>
            </div>
        </>
    );
};

export default Template11;