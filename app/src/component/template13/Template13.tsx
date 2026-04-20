import React from 'react'
import { FormData } from '../../shared/FormDataContext';
import Dates from '../../shared/dates';

interface Template13Props {
    formData: FormData;
}

const Template13: React.FC<Template13Props> = ({ formData }) => {
  const assetBase = window.location.protocol === "file:" ? "./" : "/";




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

        .wrapper {
            position: absolute;
            height: 800px;
            top: 0;
            right: 0;
            left: 0;
            background: rgba(0, 0, 0, 0);
        }

        .box {
            position: relative;
            width: 369.375px;
            height: 756.875px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 6;
            overflow: visible auto;
        }

        .box-2 {
            position: relative;
            width: 369.375px;
            height: 29.375px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 44;
        }

        .text {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 14px;
            right: 309.375px;
            bottom: 5.375px;
            color: #696b6c;
            font-family: Inter, var(--default-font-family);
            font-size: 11.25px;
            font-weight: 700;
            line-height: 13.615px;
            text-align: left;
            white-space: nowrap;
            z-index: 55;
        }

        .img {
            position: absolute;
            width: 13.125px;
            height: 12.5px;
            right: 115.625px;
            bottom: 6.25px;
            background: url(${assetBase}template13/7kcjh6cG81.png) no-repeat center;
            background-size: cover;
            z-index: 50;
        }

        .pic {
            position: absolute;
            width: 11.875px;
            height: 11.875px;
            right: 295.625px;
            bottom: 6.875px;
            background: url(${assetBase}template13/ozYcmhiMML.png) no-repeat center;
            background-size: cover;
            z-index: 54;
        }

        .pic-2 {
            position: absolute;
            width: 24.375px;
            height: 10.625px;
            right: 25px;
            bottom: 7.5px;
            background: url(${assetBase}template13/qzLGwJnqKc.png) no-repeat center;
            background-size: cover;
            z-index: 46;
        }

        .pic-3 {
            position: absolute;
            width: 16.25px;
            height: 11.875px;
            right: 53.75px;
            bottom: 6.25px;
            background: url(${assetBase}template13/JsSm6XpCub.png) no-repeat center;
            background-size: cover;
            z-index: 47;
        }

        .pic-4 {
            position: absolute;
            width: 16.875px;
            height: 11.25px;
            right: 73.75px;
            bottom: 6.875px;
            background: url(${assetBase}template13/yZbrXFeLyk.png) no-repeat center;
            background-size: cover;
            z-index: 48;
        }

        .img-2 {
            position: absolute;
            width: 16.25px;
            height: 10.625px;
            right: 94.375px;
            bottom: 6.875px;
            background: url(${assetBase}template13/ybZF5RbVzK.png) no-repeat center;
            background-size: cover;
            z-index: 49;
        }

        .pic-5 {
            position: absolute;
            width: 11.875px;
            height: 10.625px;
            right: 261.25px;
            bottom: 6.875px;
            background: url(${assetBase}template13/smL6JYsG7U.png) no-repeat center;
            background-size: cover;
            z-index: 52;
        }

        .image {
            position: absolute;
            width: 6.875px;
            height: 10.625px;
            right: 16.25px;
            bottom: 6.875px;
            background: url(${assetBase}template13/xFbrJaepWB.png) no-repeat center;
            background-size: cover;
            z-index: 45;
        }

        .image-1 {
            position: absolute;
            width: 11.875px;
            height: 10px;
            right: 278.125px;
            bottom: 6.875px;
            background: url(${assetBase}template13/K0rvRGfqFS.png) no-repeat center;
            background-size: cover;
            z-index: 53;
        }

        .image-2 {
            position: absolute;
            width: 6.875px;
            height: 2.5px;
            right: 244.375px;
            bottom: 11.25px;
            background: url(${assetBase}template13/tUGQSQuvvK.png) no-repeat center;
            background-size: cover;
            z-index: 51;
        }

        .groups {
            position: relative;
            width: 369.375px;
            height: 39.375px;
            margin: 0.63px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 40;
        }

        .image-3 {
            position: absolute;
            width: 16.875px;
            height: 20.625px;
            right: 12.5px;
            bottom: 8.125px;
            background: url(${assetBase}template13/nYyYPXEWLk.png) no-repeat center;
            background-size: cover;
            z-index: 41;
        }

        .image-4 {
            position: absolute;
            width: 9.375px;
            height: 16.875px;
            right: 345.625px;
            bottom: 10px;
            background: url(${assetBase}template13/t7We2mt97t.png) no-repeat center;
            background-size: cover;
            z-index: 43;
        }

        .details {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 15.625px;
            right: 159.375px;
            bottom: 10.625px;
            color: #57595b;
            font-family: Inter, var(--default-font-family);
            font-size: 15px;
            font-weight: 400;
            line-height: 15.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 42;
        }

        .groups-5 {
            position: relative;
            width: 369.375px;
            height: auto;
            min-height: 583.75px;
            margin: 3.125px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 8;
            overflow: visible auto;
        }

        .groups-6 {
            position: relative;
            width: 369.375px;
            height: 140px;
            margin: 0 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 36;
            overflow: visible auto;
        }

        .image-7 {
            position: relative;
            width: 44.375px;
            height: 44.375px;
            margin: 35.625px 0 0 162.5px;
            background: url(${assetBase}template13/uPPLa8bYYt.png) no-repeat center;
            background-size: cover;
            z-index: 39;
        }

        .successful {
            display: block;
            position: relative;
            height: 15.625px;
            margin: 8.75px 0 0 147.5px;
            color: #9bd0b6;
            font-family: Inter, var(--default-font-family);
            font-size: 14.375px;
            font-weight: 400;
            line-height: 15.625px;
            text-align: left;
            white-space: nowrap;
            z-index: 38;
        }

        .jul-date {
            display: block;
            position: relative;
            height: 14.375px;
            margin: 6.875px 0 0 122.5px;
            color: #bcc0c3;
            font-family: Inter, var(--default-font-family);
            font-size: 11.25px;
            font-weight: 400;
            line-height: 13.615px;
            text-align: left;
            white-space: nowrap;
            z-index: 37;
        }

        .groups-8 {
            position: relative;
            width: 341.25px;
            height: 176.25px;
            margin: 16.875px 0 0 13.75px;
            background: rgba(0, 0, 0, 0);
            z-index: 24;
            overflow: visible auto;
        }

        .background {
            position: relative;
            width: 341.25px;
            height: 175px;
            margin: 1.25px 0 0 0;
            background: #fefefe;
            z-index: 25;
            overflow: visible auto;
            border-radius: 13.75px;
        }

        .flex-row-f {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 88.75px;
            height: 13.75px;
            margin: 21.875px 0 0 21.25px;
            z-index: 35;
        }

        .details-9 {
            flex-shrink: 0;
            position: relative;
            height: 13.75px;
            color: #b5b6b9;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 35;
        }

        .send {
            flex-shrink: 0;
            position: relative;
            height: 13.125px;
            color: #666666;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 34;
        }

        .flex-row-a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            width: 241.875px;
            height: 20px;
            margin: 13.125px 0 0 79.375px;
            z-index: 33;
        }

        .usdt {
            flex-shrink: 0;
            position: relative;
            height: 13.75px;
            color: #5e5e5e;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 33;
        }

        .image-a {
            flex-shrink: 0;
            position: relative;
            width: 25px;
            height: 20px;
            background: url(${assetBase}template13/yuLSD5NB7m.png) no-repeat center;
            background-size: cover;
            z-index: 28;
        }

        .qian {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 13.75px;
            height: 15px;
            right: 5.625px;
            bottom: 3.125px;
            color: #abe3e3;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 600;
            line-height: 15px;
            text-align: center;
            white-space: nowrap;
            z-index: 32;
        }

        .background-b {
            position: relative;
            width: 245.625px;
            height: 6.25px;
            margin: 4.375px 0 0 77.5px;
            background: url(${assetBase}template13/yyPhTZMzTR.png) no-repeat center;
            background-size: cover;
            z-index: 27;
        }

        .tron {
            display: block;
            position: relative;
            height: 13.125px;
            margin: 11.875px 0 0 79.375px;
            color: #b1b2b5;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.125px;
            text-align: left;
            white-space: nowrap;
            z-index: 31;
        }

        .background-c {
            position: relative;
            width: 246.25px;
            height: 5.625px;
            margin: 14.375px 0 0 76.875px;
            background: url(${assetBase}template13/dEvBTV6ZJp.png) no-repeat center;
            background-size: cover;
            z-index: 26;
        }

        .flex-row-d {
            display: flex;
            align-items: center;
            position: relative;
            height: 15px;
            margin: 14.375px 0 0 20.625px;
            z-index: 30;
            gap: 14px;
        }

        .gas-fee {
            flex-shrink: 0;
            position: relative;
            height: 14.375px;
            color: #b6b6ba;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 14.375px;
            text-align: left;
            white-space: nowrap;
            z-index: 30;
        }

        .trx {
            flex-shrink: 0;
            position: relative;
            height: 15px;
            color: #535353;
            font-family: Inter, var(--default-font-family);
            font-size: 13.125px;
            font-weight: 400;
            line-height: 15px;
            text-align: left;
            white-space: nowrap;
            z-index: 29;
        }

        .groups-d {
            position: relative;
            width: 347.5px;
            height: auto;
            min-height: 135px;
            margin: 10px 0 0 10.625px;
            background: rgba(0, 0, 0, 0);
            z-index: 15;
        }

        .groups-e {
        di splay: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            width: 341.25px;
            right: 3.125px;
            bottom: 64.375px;
            background: rgba(0, 0, 0, 0);
            z-index: 21;
        }

        /* Sender field - allows wrapping */
        .tmsmmtkye-ahss {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            position: absolute;
            width: 237.5px;
            min-height: 33px;
            height: auto;
            right: 21.875px;
            bottom: 13.25px;
            color: #454545;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 16.064px;
            text-align: left;
            white-space: normal;
            word-break: break-word;
            overflow: visible;
            z-index: 22;
        }

        .from {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.75px;
            right: 290px;
            bottom: 30.625px;
            color: #b3b3b6;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 23;
        }

        .background-f {
            position: absolute;
            width: 340.625px;
            min-height: 129.375px;
            height: auto;
            right: 3.125px;
            bottom: 1.25px;
            background: #fefefe;
            z-index: 16;
            border-radius: 6.25px;
        }

        .background-10 {
            position: relative;
            width: 238.125px;
            height: 3.75px;
            margin: 65px 0 0 86.25px;
            background: url(${assetBase}template13/Htsdcx2fSc.png) no-repeat center;
            background-size: cover;
            z-index: 20;
        }

        .groups-11 {
            position: relative;
            width: 341.25px;
            min-height: 63.125px;
            height: auto;
            margin: -1.875px 0 0 -0.63px;
            background: rgba(0, 0, 0, 0);
            z-index: 17;
        }

        /* Receiver field - allows wrapping */
        .tmo-ndcon-hwznhbmb {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            position: absolute;
            width: 243.75px;
            min-height: 32px;
            height: auto;
            right: 15.625px;
            bottom: 14.875px;
            color: #3e3e3e;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 15.938px;
            text-align: left;
            white-space: normal;
            word-break: break-word;
            overflow: visible;
            z-index: 18;
        }

        .to {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.75px;
            right: 305px;
            bottom: 31.25px;
            color: #b6b6ba;
            font-family: Inter, var(--default-font-family);
            font-size: 12.5px;
            font-weight: 400;
            line-height: 13.75px;
            text-align: left;
            white-space: nowrap;
            z-index: 19;
        }

        .groups-12 {
            position: relative;
            width: 341.875px;
            min-height: 93.75px;
            height: auto;
            margin: 11.875px 0 0 13.125px;
            background: rgba(0, 0, 0, 0);
            z-index: 9;
            overflow: visible auto;
        }

        .background-13 {
            position: relative;
            width: 341.25px;
            min-height: 91.875px;
            height: auto;
            margin: 1.25px 0 0 0;
            background: #fefefe;
            z-index: 10;
            border-radius: 13.125px;
        }

        /* TxID container - allows wrapping */
        .flex-column-aa {
            position: absolute;
            width: 237.5px;
            min-height: 51.875px;
            height: auto;
            right: 23.125px;
            bottom: 20px;
            font-size: 0px;
            z-index: 13;
        }

        .text-10 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: relative;
            width: 237.5px;
            min-height: 32.5px;
            height: auto;
            margin: 0 0 0 0;
            color: #585858;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 15.098px;
            text-align: left;
            white-space: normal;
            word-break: break-word;
            overflow: visible;
            z-index: 13;
        }

        .see-details {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 13.125px;
            right: 183.75px;
            bottom: -2.5px;
            color: #b7b8bb;
            font-family: Inter, var(--default-font-family);
            font-size: 10px;
            font-weight: 400;
            line-height: 12.102px;
            text-align: left;
            white-space: nowrap;
            z-index: 12;
        }

        .image-14 {
            position: absolute;
            width: 6.25px;
            height: 9.375px;
            right: 1.875px;
            bottom: 0;
            background: url(${assetBase}template13/oWEBAZBJVH.png) no-repeat center;
            background-size: cover;
            z-index: 11;
        }

        .txid {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            height: 14px;
            right: 293.75px;
            bottom: 56.625px;
            color: #b8b9bc;
            font-family: Inter, var(--default-font-family);
            font-size: 11.875px;
            font-weight: 400;
            line-height: 14px;
            text-align: left;
            white-space: nowrap;
            z-index: 14;
        }

        .groups-15 {
            position: relative;
            width: 369.375px;
            height: 45px;
            margin: -1.875px 0 0 0;
            background: rgba(0, 0, 0, 0);
            z-index: 2;
        }

        .background-16 {
            position: absolute;
            width: 10px;
            height: 9.375px;
            right: 179.375px;
            bottom: 17.5px;
            background: url(${assetBase}template13/qA55rMytmc.png) no-repeat center;
            background-size: cover;
            z-index: 4;
        }

        .image-17 {
            position: absolute;
            width: 5.625px;
            height: 9.375px;
            right: 96.25px;
            bottom: 17.5px;
            background: url(${assetBase}template13/ucJ80tkWJ5.png) no-repeat center;
            background-size: cover;
            z-index: 3;
        }

        .image-18 {
            position: absolute;
            width: 10px;
            height: 8.125px;
            right: 264.375px;
            bottom: 18.125px;
            background: url(${assetBase}template13/ybzY3LjuYx.png) no-repeat center;
            background-size: cover;
            z-index: 5;
        }

        .background-19 {
            position: absolute;
            width: 369.375px;
            height: 756.875px;
            right: 0;
            bottom: 43.125px;
            background: #eff1f2;
            background-size: cover;
            z-index: 1;
        }

        .background-1a {
            position: absolute;
            width: 369.375px;
            height: 44.375px;
            right: 0;
            bottom: 0;
            background: url(${assetBase}template13/pNvV6cRc1L.png) no-repeat center;
            background-size: cover;
            z-index: 1;
        }
    `}</style>

            <div className="main-container">
                <div className="wrapper">
                    <div className="box">
                        <div className="box-2">
                            <span className="text">{formData.time || "7:42"}{formData.time?.includes('AM') || formData.time?.includes('PM') ? '' : 'AM'}</span>
                            <div className="img"></div>
                            <div className="pic"></div>
                            <div className="pic-2"></div>
                            <div className="pic-3"></div>
                            <div className="pic-4"></div>
                            <div className="img-2"></div>
                            <div className="pic-5"></div>
                            <div className="image"></div>
                            <div className="image-1"></div>
                            <div className="image-2"></div>
                        </div>
                        <div className="groups">
                            <div className="image-3"></div>
                            <div className="image-4"></div>
                            <span className="details">Details</span>
                        </div>
                        <div className="groups-5">
                            <div className="groups-6">
                                <div className="image-7"></div>
                                <span className="successful">Successful</span>
                                <span className="jul-date">{Dates.formatTemplate13(formData.date)} </span>
                            </div>
                            <div className="groups-8">
                                <div className="background">
                                    <div className="flex-row-f">
                                        <span className="details-9">Details</span>
                                        <span className="send">Send</span>
                                    </div>
                                    <div className="flex-row-a">
                                        <span className="usdt">{formData.amount ? `-${formData.amount} USDT` : "-150 USDT"}</span>
                                        <div className="image-a"><span className="qian">åƒ</span></div>
                                    </div>
                                    <div className="background-b"></div>
                                    <span className="tron">Tron</span>
                                    <div className="background-c"></div>
                                    <div className="flex-row-d">
                                        <span className="gas-fee">Gas Fee</span>
                                        <span className="trx">-{formData.fee || "13.7409"}TRX</span>
                                    </div>
                                </div>
                            </div>
                            <div className="groups-d">
                                <div className="groups-e">
                                    <span className="tmsmmtkye-ahss">{formData.sender || "TMSm8mtkY5eA3HssTSKzNNq7bTc9CpA61S"}</span>
                                    <span className="from">From</span>
                                </div>
                                <div className="background-f">
                                    <div className="background-10"></div>
                                    <div className="groups-11">
                                        <span className="tmo-ndcon-hwznhbmb">{formData.receiver || "TMoNDConHwznhbmBUWf43vxqbkRorjrLd8"}</span>
                                        <span className="to">To</span>
                                    </div>
                                </div>
                            </div>
                            <div className="groups-12">
                                <div className="background-13">
                                    <div className="flex-column-aa">
                                        <span className="text-10">{formData.txid || "4bf991290fdd5d4286ace1820665f91864cd61d5033b48f180676ece8ad38cd8"}</span>
                                        <span className="see-details">See details</span>
                                        <div className="image-14"></div>
                                    </div>
                                    <span className="txid">TxID</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="groups-15">
                        <div className="background-16"></div>
                        <div className="image-17"></div>
                        <div className="image-18"></div>
                    </div>
                </div>
                <div className="background-19"></div>
                <div className="background-1a"></div>
            </div>
        </>
    )
}

export default Template13