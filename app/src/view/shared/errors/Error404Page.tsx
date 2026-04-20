import React from "react";
import { Link } from "react-router-dom";

function Error404Page() {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-card">
          {/* Crypto Animation */}
          <div className="crypto-animation">
            <div className="crypto-coin btc">₿</div>
            <div className="crypto-coin eth">Ξ</div>
            <div className="crypto-coin usdt">₮</div>
          </div>

          {/* Error Code */}
          <div className="error-code">404</div>

          {/* Error Title */}
          <h1 className="error-title">Page Not Found</h1>

          {/* Error Message */}
          <p className="error-message">
            The page you're looking for doesn't exist or has been moved.
            Please check the URL or return to the dashboard.
          </p>

          {/* Action Buttons */}
          <div className="error-actions">
            <Link to="/" className="primary-button">
              Go to Dashboard
            </Link>
            <button className="secondary-button" onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .error-page {
          min-height: 100vh;
          background-color: #e8f1f8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .error-container {
          width: 100%;
          max-width: 520px;
        }

        .error-card {
          background: white;
          border-radius: 28px;
          padding: 48px 40px;
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03);
          text-align: center;
          animation: fadeInUp 0.5s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Crypto Animation */
        .crypto-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .crypto-coin {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          animation: float 3s ease-in-out infinite;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .crypto-coin.btc {
          background: linear-gradient(135deg, #f7931a, #f7a83a);
          color: white;
          animation-delay: 0s;
        }

        .crypto-coin.eth {
          background: linear-gradient(135deg, #627eea, #7f9cf5);
          color: white;
          animation-delay: 0.5s;
        }

        .crypto-coin.usdt {
          background: linear-gradient(135deg, #26a17b, #2ebd91);
          color: white;
          animation-delay: 1s;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Error Code */
        .error-code {
          font-size: 80px;
          font-weight: 800;
          color: #1a252f;
          line-height: 1;
          margin-bottom: 16px;
          letter-spacing: -2px;
        }

        /* Error Title */
        .error-title {
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 16px 0;
        }

        /* Error Message */
        .error-message {
          font-size: 16px;
          color: #5e6f7e;
          line-height: 1.6;
          margin: 0 0 36px 0;
          padding: 0 8px;
        }

        /* Action Buttons */
        .error-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .primary-button {
          background: #1a252f;
          color: white;
          border: none;
          border-radius: 14px;
          padding: 16px 20px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
          display: block;
          text-align: center;
          box-shadow: 0 6px 14px rgba(26, 37, 47, 0.15);
        }

        .primary-button:hover {
          background: #2c3e50;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(26, 37, 47, 0.2);
        }

        .secondary-button {
          background: transparent;
          color: #5e6f7e;
          border: 1.5px solid #d0dde8;
          border-radius: 14px;
          padding: 14px 20px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .secondary-button:hover {
          background: #f1f5f9;
          border-color: #a0bbd0;
          color: #2c3e50;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .error-page {
            padding: 16px;
            align-items: flex-start;
          }

          .error-card {
            padding: 36px 24px;
            border-radius: 24px;
          }

          .error-code {
            font-size: 64px;
          }

          .error-title {
            font-size: 24px;
          }

          .error-message {
            font-size: 15px;
          }

          .crypto-coin {
            width: 42px;
            height: 42px;
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default Error404Page;