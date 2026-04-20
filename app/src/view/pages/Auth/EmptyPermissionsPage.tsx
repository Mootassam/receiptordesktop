import React from "react";
import { useDispatch } from "react-redux";
import { i18n } from "../../../i18n";
import actions from "../../../modules/auth/authActions";
import { Link } from "react-router-dom";

function EmptyPermissionsPage() {
  const dispatch = useDispatch();

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  return (
    <div className="activation-page">
      <div className="activation-container">
        <div className="activation-card">
          <h1 className="activation-title">Almost There!</h1>
          <p className="activation-description">
            Your account has been successfully registered and is ready for activation.
          </p>

          <p className="activation-instruction">
            To complete your registration and access your account, please contact our 
            customer support team. They will guide you through the final activation steps.
          </p>

          <div className="action-buttons">
            <Link to="/LiveChat" className="primary-button">
              Contact Support to Activate
            </Link>
            <button className="secondary-button" onClick={doSignout}>
              {i18n("auth.signout")}
            </button>
          </div>

          <div className="support-footer">
            <p className="support-heading">Need help?</p>
            <p className="support-email">
              Email us at{" "}
              <a href="mailto:OneClick.helpdesk01@gmail.com">
                OneClick.helpdesk01@gmail.com
              </a>
            </p>
            <p className="support-hours">
              Our team is available 24/7 to assist with activation.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .activation-page {
          min-height: 100vh;
          background-color: #e8f1f8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .activation-container {
          width: 100%;
          max-width: 520px;
        }

        .activation-card {
          background: white;
          border-radius: 28px;
          padding: 44px 40px;
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

        .activation-title {
          font-size: 34px;
          font-weight: 700;
          color: #1a252f;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        .activation-description {
          font-size: 18px;
          color: #3d566e;
          margin: 0 0 32px 0;
          line-height: 1.5;
          font-weight: 500;
        }

        .activation-instruction {
          font-size: 16px;
          color: #5e6f7e;
          line-height: 1.6;
          margin: 0 0 36px 0;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
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

        .support-footer {
          border-top: 1px solid #e2e8f0;
          padding-top: 28px;
          margin-top: 8px;
        }

        .support-heading {
          font-size: 15px;
          font-weight: 600;
          color: #1a252f;
          margin: 0 0 10px 0;
        }

        .support-email {
          font-size: 14px;
          color: #5e6f7e;
          margin: 0 0 10px 0;
        }

        .support-email a {
          color: #4a90e2;
          text-decoration: none;
          font-weight: 500;
        }

        .support-email a:hover {
          text-decoration: underline;
        }

        .support-hours {
          font-size: 13px;
          color: #8a9aaa;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .activation-page {
            padding: 16px;
            align-items: flex-start;
          }

          .activation-card {
            padding: 36px 24px;
            border-radius: 24px;
          }

          .activation-title {
            font-size: 30px;
          }

          .activation-description {
            font-size: 16px;
          }

          .activation-instruction {
            font-size: 15px;
          }

          .primary-button,
          .secondary-button {
            padding: 14px 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default EmptyPermissionsPage;