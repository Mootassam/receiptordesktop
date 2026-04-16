import React, { useState, useEffect, useCallback } from "react";
import "./sidebar.css";
import optionBank from "../../data/OptionBank";
import { FormData } from "../../shared/FormDataContext";
import {
  FaEraser,
  FaUndo,
  FaCamera,
  FaTimes,
  FaEdit,
  FaClock,
  FaCalendar,
  FaPaste,
  FaRandom,
  FaMobileAlt,
  FaBatteryFull,
  FaBell,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
  FaComment
} from "react-icons/fa";

// Import coin images (you'll need to add these images to your project)
// If you don't have the images, you can use these placeholders or replace with actual images
import usdtIcon from "../../assets/usdt.svg";
import btcIcon from "../../assets/btc.png";
import ethIcon from "../../assets/eth.svg";

// Fallback icons if images are not available
const CoinIcon = ({ type }) => {
  const coinStyles = {
    usdt: { background: '#26a17b', color: 'white' },
    btc: { background: '#f7931a', color: 'white' },
    eth: { background: '#627eea', color: 'white' }
  };

  return (
    <div
      className="coin__icon-placeholder"
      style={coinStyles[type]}
    >
      {type.toUpperCase()}
    </div>
  );
};

function Sidebar({
  screenshot,
  value,
  setvalue,
  setSize,
  size,
  undo,
  erase,
  color,
  changeColor,
  brushSize,
  changeBrushSize,
  clear,
  transactionType,
  setTransactionType,
  formData,
  setFormData,
}) {
  console.log("🚀 ~ Sidebar ~ value:", value)
  // Template field label mappings
  const templateFieldLabels = {
    template1: {
      sender: 'Address',
      receiver: 'Txid',
      amount: 'Amount',
      date: 'Date',
      time: 'Time'
    },
    template2: {
      sender: 'From',
      receiver: 'To',
      txid: 'TxID',
      amount: 'Amount',
      date: 'Date/Time',
      time: 'Time'
    },
    template3: {
      sender: 'Txid',
      receiver: 'Address',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    template4: {
      sender: 'Nickname',
      receiver: 'Receiver ID',
      amount: 'Amount',
      time: 'Time'
    },
    template5: {
      sender: 'Deposit from',
      receiver: 'Receiver',
      amount: 'Amount',
      date: 'Date/Time',
      time: 'Time'
    },
    template6: {
      receiver: 'Withdraw to',
      amount: 'Amount',
      date: 'Date/Time',
      time: 'Time',
      fee: 'Fee'
    },
    template7: {
      sender: 'Address',
      receiver: 'Txid',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    template8: {
      sender: 'From',
      receiver: 'To',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    template9: {
      sender: 'Address',
      receiver: 'Txid',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    template10: {
      sender: 'From',
      receiver: 'To',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Fees'
    },
    template11: {
      sender: 'Address',
      receiver: 'Txid',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee',
      referenceNo: 'Reference no.'
    },
    template12: {
      sender: 'From',
      receiver: 'To',
      amount: 'Amount',
      date: 'Date',
      time: 'Time'
    },
    template13: {
      sender: 'From',
      receiver: 'To',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Gas Fee',
      txid: 'TxID'
    },
    template14: {
      sender: 'From',
      receiver: 'To',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    Template15: {
      sender: 'Address',
      receiver: 'Txid',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    template16: {
      sender: 'Address',
      receiver: 'Txid',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },

    template19: {
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },


    template20: {
      sender: 'Address',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
    },

    template21: {
      sender: 'Address',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    }
  };

  // Get current template field labels
  const getCurrentFieldLabels = () => {
    return templateFieldLabels[value] || templateFieldLabels.template1;
  };

  const fieldLabels = getCurrentFieldLabels();
  console.log("🚀 ~ Sidebar ~ fieldLabels:", fieldLabels)
  const [selectedCoin, setSelectedCoin] = useState("USDT");
  const [showEditModal, setShowEditModal] = useState(false);
  const [language, setLanguage] = useState("english");
  const [randomData, setRandomData] = useState(false);
  const [isScreenshotAnimating, setIsScreenshotAnimating] = useState(false);
  const [showPhoneHeaderModal, setShowPhoneHeaderModal] = useState(false);

  const [phoneHeaderData, setPhoneHeaderData] = useState({
    time: "09:41",
    battery: 85,
    batteryCharging: false,
    missedCalls: 0,
    telegram: 0,
    whatsapp: 0,
    notifications: 3
  });

  // formData is now received from props (global state from App.tsx)

  // Coin options
  const coinOptions = [
    { id: "USDT", name: "USDT", icon: usdtIcon, color: "#26a17b" },
    { id: "BTC", name: "BTC", icon: btcIcon, color: "#f7931a" },
    { id: "ETH", name: "ETH", icon: ethIcon, color: "#627eea" }
  ];

  // Generate random data
  const generateRandomData = useCallback(() => {
    const wallets = [
      "0x8a7f6e5d4c3b2a1987654321abcdef1234567890",
      "0x1234567890abcdef1234567890abcdef12345678",
      "0xabcdef1234567890abcdef1234567890abcdef12",
      "0xdef123456789abcdef0123456789abcdef012345",
      "0x56789abcdef0123456789abcdef0123456789abcd",
      "0x3456789abcdef0123456789abcdef0123456789ab"
    ];
    const amounts = ["50.00", "100.00", "200.00", "500.00", "750.00", "1000.00"];
    const txids = [
      "0x8a7f6e5d4c3b2a1987654321abcdef1234567890",
      "0x1234567890abcdef1234567890abcdef12345678",
      "0xabcdef1234567890abcdef1234567890abcdef12"
    ];

    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const today = new Date().toISOString().split('T')[0];

    return {
      time: timeString,
      date: today,
      sender: wallets[Math.floor(Math.random() * wallets.length)],
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      receiver: wallets[Math.floor(Math.random() * wallets.length)],
      txid: txids[Math.floor(Math.random() * txids.length)],
      fee: "0.15",
      referenceNo: "372620932"
    };
  }, []);

  // Auto-generate data when random toggle is on
  useEffect(() => {
    let interval;
    if (randomData) {
      interval = setInterval(() => {
        setFormData(generateRandomData());
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [randomData, generateRandomData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Set current time
  const setCurrentTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    setFormData(prev => ({ ...prev, time: timeString }));
  };

  // Set current date
  const setCurrentDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
  };

  // Generate random TXID
  const generateRandomTxid = () => {
    const chars = '0123456789abcdef';
    let txid = '0x';
    for (let i = 0; i < 40; i++) {
      txid += chars[Math.floor(Math.random() * chars.length)];
    }
    setFormData(prev => ({ ...prev, txid }));
  };

  // Paste from clipboard
  const pasteFromClipboard = async (fieldName) => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        setFormData(prev => ({ ...prev, [fieldName]: text }));
      } else {
        // Fallback for older browsers
        const text = prompt("Paste your text here:");
        if (text !== null) {
          setFormData(prev => ({ ...prev, [fieldName]: text }));
        }
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      const text = prompt("Paste your text here:");
      if (text !== null) {
        setFormData(prev => ({ ...prev, [fieldName]: text }));
      }
    }
  };

  const handleSave = () => {
    console.log("Saved data:", formData);
    console.log("Random data enabled:", randomData);
    console.log("Selected coin:", selectedCoin);
    setShowEditModal(false);
  };

  const handleRandomToggle = () => {
    if (!randomData) {
      setFormData(generateRandomData());
    }
    setRandomData(!randomData);
  };

  const handleScreenshot = () => {
    setIsScreenshotAnimating(true);

    // Trigger screenshot function
    screenshot();

    // Reset animation after 300ms
    setTimeout(() => {
      setIsScreenshotAnimating(false);
    }, 300);
  };

  return (
    <>
      <div className="app__sidebar">
        {/* Coin Selection */}
        <div className="coin__selection">
          <label htmlFor="coin">Select Coin</label>
          <div className="coin__options">
            {coinOptions.map((coin) => (
              <button
                key={coin.id}
                className={`coin__option ${selectedCoin === coin.id ? 'selected' : ''}`}
                onClick={() => setSelectedCoin(coin.id)}
                style={{
                  borderColor: selectedCoin === coin.id ? coin.color : undefined
                }}
              >
                {/* Try to use image, fallback to SVG if not available */}
                {coin.icon ? (
                  <img
                    src={coin.icon}
                    alt={coin.name}
                    className="coin__icon"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      // If image fails to load, show fallback
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const nextSibling = target.nextElementSibling as HTMLElement;
                      if (nextSibling) {
                        nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : (
                  <CoinIcon type={coin.id.toLowerCase()} />
                )}
                <span className="coin__name">{coin.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Type Selector */}
        <div className="transaction__type">
          <button
            className={`type__btn ${transactionType === 'deposit' ? 'active' : ''}`}
            onClick={() => setTransactionType('deposit')}
          >
            Deposit
          </button>
          <button
            className={`type__btn ${transactionType === 'withdraw' ? 'active' : ''}`}
            onClick={() => setTransactionType('withdraw')}
          >
            Withdraw
          </button>
        </div>

        <div className="sidebar__form">
          {/* Wallet Selection */}
          <div className="form__group">
            <label htmlFor="wallet">Select Wallet</label>
            <select
              id="wallet"
              name="bank"
              className="app__select"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            >
              {optionBank
                .filter((item) => item.type === transactionType)
                .map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>


          {/* Tools Section */}
          <div className="form__group">
            <label htmlFor="">Drawing Tools</label>

            <div className="sidebar__">
              <div className="app__tools">
                <input
                  type="color"
                  value={color}
                  onChange={changeColor}
                  className="btn--color"
                  title="Select color"
                />
                <button className="tool__btn undo" onClick={undo} title="Undo">
                  <FaUndo size={16} />
                </button>
                <button onClick={erase} className="tool__btn erase__button" title="Eraser">
                  <FaEraser size={16} />
                </button>
              </div>
              {/* <div className="phone__header-btn">
                <button
                  className="phone__header-edit-btn"
                  onClick={() => setShowPhoneHeaderModal(true)}
                  title="Edit Phone Header"
                >
                  <FaMobileAlt size={16} />
                </button>
              </div> */}
            </div>
          </div>

          {/* Brush Size - Removed preview */}
          <div className="form__group">
            <label htmlFor="brushSize">Brush Size</label>
            <div className="brush__size-container">
              <input
                type="range"
                id="brushSize"
                min="1"
                max="70"
                value={brushSize}
                onChange={changeBrushSize}
              />
              <div className="brush__size-label">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action__buttons">
            <button onClick={() => setShowEditModal(true)} className="edit__button">
              <FaEdit size={12} />
              &nbsp;Edit
            </button>
            <button onClick={clear} className="clear__button">
              Clear
            </button>
          </div>
        </div>



        {/* Screenshot Button */}
        <button
          className="app__screenshot"
          onClick={handleScreenshot}
          style={{
            transform: isScreenshotAnimating ? 'scale(0.98)' : 'scale(1)',
            opacity: isScreenshotAnimating ? 0.9 : 1
          }}
        >
          <FaCamera size={18} color="white" />
          <span className="screenshot__text">Take Screenshot</span>
        </button>
      </div>

      {/* Edit Details Modal */}
      {showEditModal && (
        <div className="modal__overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">Edit Transaction Details</h2>
              <button className="modal__close" onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal__form">
              {/* Time Input */}
              <div className="input__group">
                <div className="input__with__buttons">
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder={fieldLabels.time || "Time (HH:MM)"}
                  />
                  <button className="input__button" onClick={setCurrentTime} title="Set current time">
                    <FaClock size={14} />
                  </button>
                </div>
              </div>

              {/* Date Input */}

              <div className="input__group">
                <div className="input__with__buttons">
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder={fieldLabels.date}
                  />
                  <button className="input__button" onClick={setCurrentDate} title="Set today's date">
                    <FaCalendar size={14} />
                  </button>
                </div>
              </div>


              {/* Sender Input */}
              {fieldLabels.sender && (
                <div className="input__group">
                  <div className="input__with__buttons">
                    <input
                      type="text"
                      name="sender"
                      value={formData.sender}
                      onChange={handleInputChange}
                      placeholder={fieldLabels.sender}
                    />
                    <button
                      className="input__button"
                      onClick={() => pasteFromClipboard('sender')}
                      title="Paste from clipboard"
                    >
                      <FaPaste size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Amount Input */}
              {fieldLabels.amount && (
                <div className="input__group">
                  <div className="input__with__buttons">
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder={fieldLabels.amount}
                      step="0.01"
                    />
                    <button
                      className="input__button"
                      onClick={() => pasteFromClipboard('amount')}
                      title="Paste from clipboard"
                    >
                      <FaPaste size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Receiver Input */}
              {fieldLabels.receiver && (
                <div className="input__group">
                  <div className="input__with__buttons">
                    <input
                      type="text"
                      name="receiver"
                      value={formData.receiver}
                      onChange={handleInputChange}
                      placeholder={fieldLabels.receiver}
                    />
                    <button
                      className="input__button"
                      onClick={() => pasteFromClipboard('receiver')}
                      title="Paste from clipboard"
                    >
                      <FaPaste size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* TXID Input - New Field */}
              {fieldLabels.txid && (
                <div className="input__group">
                  <div className="input__with__buttons">
                    <input
                      type="text"
                      name="txid"
                      value={formData.txid}
                      onChange={handleInputChange}
                      placeholder={fieldLabels.txid}
                    />
                    <button
                      className="input__button"
                      onClick={() => pasteFromClipboard('txid')}
                      title="Paste from clipboard"
                    >
                      <FaPaste size={14} />
                    </button>
                    <button
                      className="input__button"
                      onClick={generateRandomTxid}
                      title="Generate random TXID"
                      style={{ minWidth: '42px' }}
                    >
                      <FaRandom size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Fee Input */}
              {fieldLabels.fee && (
                <div className="input__group">
                  <div className="input__with__buttons">
                    <input
                      type="text"
                      name="fee"
                      value={formData.fee || ''}
                      onChange={handleInputChange}
                      placeholder={fieldLabels.fee}
                    />
                    <button
                      className="input__button"
                      onClick={() => pasteFromClipboard('fee')}
                      title="Paste from clipboard"
                    >
                      <FaPaste size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Reference No. Input */}
              {fieldLabels.referenceNo && (
                <div className="input__group">
                  <div className="input__with__buttons">
                    <input
                      type="text"
                      name="referenceNo"
                      value={formData.referenceNo || ''}
                      onChange={handleInputChange}
                      placeholder={fieldLabels.referenceNo}
                    />
                    <button
                      className="input__button"
                      onClick={() => pasteFromClipboard('referenceNo')}
                      title="Paste from clipboard"
                    >
                      <FaPaste size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Random Data Option */}
              <div className="random__option">
                <div className="random__toggle">
                  <span className="random__label">Generate Random Data</span>
                  <label className="toggle__switch">
                    <input
                      type="checkbox"
                      checked={randomData}
                      onChange={handleRandomToggle}
                    />
                    <span className="toggle__slider"></span>
                  </label>
                  <FaRandom size={14} color={randomData ? "#3b82f6" : "#64748b"} />
                </div>
              </div>
            </div>

            <div className="modal__actions">
              <button className="modal__btn modal__btn--cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="modal__btn modal__btn--save" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phone Header Modal */}
      {showPhoneHeaderModal && (
        <div className="modal__overlay" onClick={() => setShowPhoneHeaderModal(false)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">
                <FaMobileAlt style={{ marginRight: '8px' }} />
                Edit Phone Header
              </h2>
              <button className="modal__close" onClick={() => setShowPhoneHeaderModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal__form">
              <div className="phone__header-preview">
                <div className="phone__header-status-bar">
                  <span className="phone__time">{phoneHeaderData.time}</span>
                  <div className="phone__status-right">
                    <div className="phone__signal">
                      <span className="signal__bar"></span>
                      <span className="signal__bar"></span>
                      <span className="signal__bar"></span>
                      <span className="signal__bar"></span>
                    </div>
                    <div className="phone__battery">
                      <FaBatteryFull size={14} />
                      <span>{phoneHeaderData.battery}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="input__group">
                <label>Time (HH:MM)</label>
                <div className="input__with__buttons">
                  <input
                    type="text"
                    value={phoneHeaderData.time}
                    onChange={(e) => setPhoneHeaderData(prev => ({ ...prev, time: e.target.value }))}
                    placeholder="09:41"
                  />
                  <button
                    className="input__button"
                    onClick={() => {
                      const now = new Date();
                      const timeString = now.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      });
                      setPhoneHeaderData(prev => ({ ...prev, time: timeString }));
                    }}
                    title="Set current time"
                  >
                    <FaClock size={14} />
                  </button>
                </div>
              </div>

              <div className="input__group">
                <label>Battery Level (%)</label>
                <div className="input__with__buttons">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={phoneHeaderData.battery}
                    onChange={(e) => setPhoneHeaderData(prev => ({ ...prev, battery: parseInt(e.target.value) || 0 }))}
                  />
                  <button
                    className="input__button"
                    onClick={() => setPhoneHeaderData(prev => ({ ...prev, battery: 100 }))}
                    title="Full battery"
                  >
                    <FaBatteryFull size={14} />
                  </button>
                </div>
              </div>

              <div className="notifications__section">
                <h4 className="notifications__title">
                  <FaBell style={{ marginRight: '6px' }} />
                  Notification Badges
                </h4>


              </div>
            </div>

            <div className="modal__actions">
              <button className="modal__btn modal__btn--cancel" onClick={() => setShowPhoneHeaderModal(false)}>
                Cancel
              </button>
              <button className="modal__btn modal__btn--save" onClick={() => setShowPhoneHeaderModal(false)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;