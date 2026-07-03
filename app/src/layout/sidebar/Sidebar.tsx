import React, { useState, useEffect, useCallback } from "react";
import "./sidebar.css";
import optionBank from "../../data/OptionBank";
import { FormData } from "../../shared/FormDataContext";
import { PhoneStatus } from "../../shared/PhoneStatusContext";
import StatusBar from "../../shared/StatusBar";
import { NOTIFICATION_OPTIONS, MAX_NOTIFICATIONS } from "../../shared/notificationIcons";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../modules/auth/authActions";
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
  FaComment,
  FaWifi,
  FaBolt,
  FaSignal,
  FaSignOutAlt
} from "react-icons/fa";

// Import coin images (you'll need to add these images to your project)
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
  phoneStatus,
  setPhoneStatus,
}) {
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
    },
    template22: {
      sender: 'Address',
      receiver: 'Txid',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    template23: {
      sender: 'Address',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    template24: {
      sender: 'Address',
      txid: 'Txid',
      amount: 'Amount',
      date: 'Date',
      time: 'Time'
    },
    template25: {
      sender: 'Address',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },
    template26: {
      sender: 'Address',
      amount: 'Amount',
      date: 'Date',
      time: 'Time',
      fee: 'Network fee'
    },

  };

  // Get current template field labels
  const getCurrentFieldLabels = () => {
    return templateFieldLabels[value] || templateFieldLabels.template1;
  };

  const dispatch = useDispatch();

  const fieldLabels = getCurrentFieldLabels();
  const [selectedCoin, setSelectedCoin] = useState("USDT");
  const [showEditModal, setShowEditModal] = useState(false);
  const [language, setLanguage] = useState("english");
  const [randomData, setRandomData] = useState(false);
  const [isScreenshotAnimating, setIsScreenshotAnimating] = useState(false);

  // Phone status bar editor (draft is committed to the shared state on Save)
  const [showPhoneBarModal, setShowPhoneBarModal] = useState(false);
  const [phoneDraft, setPhoneDraft] = useState<PhoneStatus>(phoneStatus);

  const openPhoneBarModal = () => {
    setPhoneDraft(phoneStatus);
    setShowPhoneBarModal(true);
  };

  const savePhoneBar = () => {
    setPhoneStatus(phoneDraft);
    setShowPhoneBarModal(false);
  };

  const setPhoneNow = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    setPhoneDraft(prev => ({ ...prev, time: timeString }));
  };

  // Toggle a notification icon, capped at MAX_NOTIFICATIONS
  const toggleNotification = (id: string) => {
    setPhoneDraft(prev => {
      const selected = prev.notifications.includes(id);
      if (selected) {
        return { ...prev, notifications: prev.notifications.filter(n => n !== id) };
      }
      if (prev.notifications.length >= MAX_NOTIFICATIONS) return prev;
      return { ...prev, notifications: [...prev.notifications, id] };
    });
  };

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
    setShowEditModal(false);
  };

  const logout = () => {
    dispatch(authActions.doSignout());
  };

  const handleRandomToggle = () => {
    if (!randomData) {
      setFormData(generateRandomData());
    }
    setRandomData(!randomData);
  };

  const handleScreenshot = () => {
    setIsScreenshotAnimating(true);
    screenshot();
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
                {coin.icon ? (
                  <img
                    src={coin.icon}
                    alt={coin.name}
                    className="coin__icon"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
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
                .filter((item) => item.type === transactionType && item.coin === selectedCoin)
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
            </div>
          </div>

          {/* Brush Size */}
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

          {/* Phone Status Bar Button */}
          <button onClick={openPhoneBarModal} className="phonebar__button">
            <FaMobileAlt size={14} />
            <span>Edit Phone Bar</span>
          </button>
        </div>

        {/* Screenshot Button with pulse animation */}
        <button
          className={`app__screenshot ${isScreenshotAnimating ? 'screenshot--clicked' : ''}`}
          onClick={handleScreenshot}
        >
          <FaCamera size={18} color="white" />
          <span className="screenshot__text">Take Screenshot</span>
        </button>

        {/* Logout Button */}
        <button className="logout__button" onClick={logout}>
          <FaSignOutAlt size={16} />
          <span>Logout</span>
        </button>
      </div>

      {/* Edit Details Modal - unchanged */}
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

              {/* TXID Input */}
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

      {/* Phone Status Bar Modal */}
      {showPhoneBarModal && (
        <div className="modal__overlay" onClick={() => setShowPhoneBarModal(false)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__title">
                <FaMobileAlt style={{ marginRight: '8px' }} />
                Edit Phone Bar
              </h2>
              <button className="modal__close" onClick={() => setShowPhoneBarModal(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Always-visible live preview (pinned under the header) */}
            <div className="phonebar__previewbar">
              <div className={`phonebar__preview phonebar__preview--${phoneDraft.theme === 'dark' ? 'dark' : 'light'}`}>
                <StatusBar
                  color={phoneDraft.theme === 'dark' ? '#ffffff' : '#262626'}
                  status={phoneDraft}
                />
              </div>
            </div>

            <div className="modal__form">
              <div className="section__label">Style</div>

              {/* Phone Bar Style — choose one of 4 models (live previews) */}
              <div className="input__group">
                <label>Phone Bar Style</label>
                <div className="model__cards">
                  {([
                    { id: 'classic', label: 'Classic' },
                    { id: 'ios', label: 'iOS %' },
                    { id: 'bars', label: 'Bars %' },
                    { id: 'cellular', label: '4G' },
                  ] as const).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`model__card ${phoneDraft.model === opt.id ? 'active' : ''}`}
                      onClick={() => setPhoneDraft(prev => ({ ...prev, model: opt.id }))}
                    >
                      <span className="model__card-preview">
                        <StatusBar height={30} color="#ffffff" status={{ ...phoneDraft, model: opt.id, theme: 'dark' }} />
                      </span>
                      <span className="model__card-label">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon color — two options: black (light bg) or white (dark bg) */}
              <div className="input__group">
                <label>Icon Color</label>
                <div className="segmented">
                  {([
                    { id: 'light', label: 'Light BG · Black' },
                    { id: 'dark', label: 'Dark BG · White' },
                  ] as const).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`segmented__btn ${phoneDraft.theme === opt.id ? 'active' : ''}`}
                      onClick={() => setPhoneDraft(prev => ({ ...prev, theme: opt.id }))}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="section__label">Left Side</div>

              {/* Time */}
              <div className="input__group">
                <label>Phone Time</label>
                <div className="input__with__buttons">
                  <input
                    type="text"
                    value={phoneDraft.time}
                    onChange={(e) => setPhoneDraft(prev => ({ ...prev, time: e.target.value }))}
                    placeholder="9:41"
                  />
                  <button className="input__button" onClick={setPhoneNow} title="Set current time">
                    <FaClock size={14} />
                  </button>
                </div>
              </div>

              {/* Notifications (left side, next to the time) */}
              <div className="input__group">
                <label>
                  <FaBell size={11} style={{ marginRight: '6px' }} />
                  Notifications
                  <span className="notif__hint">
                    {phoneDraft.notifications.length}/{MAX_NOTIFICATIONS}
                  </span>
                </label>
                <div className="notif__grid">
                  {NOTIFICATION_OPTIONS.map((opt) => {
                    const active = phoneDraft.notifications.includes(opt.id);
                    const full = phoneDraft.notifications.length >= MAX_NOTIFICATIONS;
                    const Icon = opt.Icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`notif__chip ${active ? 'active' : ''}`}
                        disabled={!active && full}
                        onClick={() => toggleNotification(opt.id)}
                        title={opt.label}
                      >
                        <Icon size={16} color={active ? '#1e293b' : '#94a3b8'} />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="section__label">Right Side</div>

              {/* Signal strength */}
              <div className="input__group">
                <label><FaSignal size={11} style={{ marginRight: '6px' }} />Signal Bars</label>
                <div className="segmented">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`segmented__btn ${phoneDraft.signal === n ? 'active' : ''}`}
                      onClick={() => setPhoneDraft(prev => ({ ...prev, signal: n }))}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Network label (cellular model only) */}
              {phoneDraft.model === 'cellular' && (
                <div className="input__group">
                  <label><FaSignal size={11} style={{ marginRight: '6px' }} />Network</label>
                  <div className="segmented">
                    {['3G', '4G', '5G', 'LTE'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`segmented__btn ${phoneDraft.network === n ? 'active' : ''}`}
                        onClick={() => setPhoneDraft(prev => ({ ...prev, network: n }))}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Battery level */}
              <div className="input__group">
                <label><FaBatteryFull size={12} style={{ marginRight: '6px' }} />Battery Level — {phoneDraft.battery}%</label>
                <div className="input__with__buttons">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={phoneDraft.battery}
                    onChange={(e) => setPhoneDraft(prev => ({ ...prev, battery: parseInt(e.target.value) || 0 }))}
                    className="phonebar__range"
                  />
                  <button
                    className="input__button"
                    onClick={() => setPhoneDraft(prev => ({ ...prev, battery: 100 }))}
                    title="Full battery"
                  >
                    <FaBatteryFull size={14} />
                  </button>
                </div>
              </div>

              {/* Toggles — Wi-Fi · Low Power · Charging on one line */}
              <div className="toggle__group">
                {phoneDraft.model !== 'cellular' && (
                  <div className="toggle__chip">
                    <span className="toggle__chip-label"><FaWifi size={13} />Wi-Fi</span>
                    <label className="toggle__switch">
                      <input
                        type="checkbox"
                        checked={phoneDraft.wifi}
                        onChange={(e) => setPhoneDraft(prev => ({ ...prev, wifi: e.target.checked }))}
                      />
                      <span className="toggle__slider"></span>
                    </label>
                  </div>
                )}
                <div className="toggle__chip">
                  <span className="toggle__chip-label"><FaBolt size={13} />Low Power</span>
                  <label className="toggle__switch">
                    <input
                      type="checkbox"
                      checked={phoneDraft.lowPower}
                      onChange={(e) => setPhoneDraft(prev => ({ ...prev, lowPower: e.target.checked }))}
                    />
                    <span className="toggle__slider"></span>
                  </label>
                </div>
                <div className="toggle__chip">
                  <span className="toggle__chip-label"><FaBolt size={13} />Charging</span>
                  <label className="toggle__switch">
                    <input
                      type="checkbox"
                      checked={phoneDraft.charging}
                      onChange={(e) => setPhoneDraft(prev => ({ ...prev, charging: e.target.checked }))}
                    />
                    <span className="toggle__slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="modal__actions">
              <button className="modal__btn modal__btn--cancel" onClick={() => setShowPhoneBarModal(false)}>
                Cancel
              </button>
              <button className="modal__btn modal__btn--save" onClick={savePhoneBar}>
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