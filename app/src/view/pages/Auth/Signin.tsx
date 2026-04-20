import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import actions from "../../../modules/auth/authActions";
import selectors from "../../../modules/auth/authSelectors";
import yupFormSchemas from "../../../modules/shared/yup/yupFormSchemas";
import InputFormItem from "../../shared/form/InputFormItem";
import { i18n, getLanguageCode, getLanguages } from "../../../i18n";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  email: yupFormSchemas
    .string(i18n("user.fields.username"), { required: true })
    .email(i18n("validation.email")),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
    min: 6,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [isChecked, setIsChecked] = useState(true);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState("");

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const updateLanguageLabel = () => {
    const currentLanguage = getLanguageCode();
    const labelLanguage = getLanguages();

    if (!Array.isArray(labelLanguage)) {
      setCurrentLanguageLabel("");
      return;
    }

    const languageMap = Object.fromEntries(
      labelLanguage.map((lang) => [lang.id, lang.label])
    );

    setCurrentLanguageLabel(languageMap[currentLanguage] || "");
  };

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
    updateLanguageLabel();

    const intervalId = setInterval(updateLanguageLabel, 500);
    const handleFocus = () => updateLanguageLabel();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isLanguageModalOpen) {
      setTimeout(updateLanguageLabel, 100);
    }
  }, [isLanguageModalOpen]);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const goBack = () => {
    history.goBack();
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    form.setValue("rememberMe", !isChecked);
  };

  const openLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };

  return (
    <div className="signin-container">
      <div className="signin-wrapper">
 

        {/* Card */}
        <div className="signin-card">
          <h1 className="signin-title">{i18n("auth.signin.title")}</h1>
          <p className="signin-subtitle">{i18n("auth.signin.subtitle")}</p>

          <FormProvider {...form}>
            {externalErrorMessage && (
              <div className="error-alert">
                {externalErrorMessage}
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="input-field">
                <label className="input-label">{i18n('auth.fields.mailbox')}</label>
                <InputFormItem
                  type="email"
                  name="email"
                  placeholder={i18n("auth.fields.emailPlaceholder")}
                  className="input-control"
                />
              </div>

              <div className="input-field">
                <label className="input-label">{i18n('auth.fields.password')}</label>
                <InputFormItem
                  type="password"
                  name="password"
                  placeholder={i18n("auth.fields.passwordPlaceholder")}
                  className="input-control"
                  autoComplete="current-password"
                />
              </div>

              <div className="form-footer">
                <div className="remember-me" onClick={toggleCheckbox}>
                  <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`}></div>
                  <span className="remember-text">{i18n("auth.common.rememberPassword")}</span>
                </div>
       
              </div>

              <button
                className="submit-btn"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    {i18n("auth.signin.signingIn")}
                  </>
                ) : (
                  i18n("auth.signin.button")
                )}
              </button>

              <div className="signup-prompt">
                <span>{i18n("auth.signin.noAccount")} </span>
                <Link to="/auth/signup" className="signup-link">
                  {i18n("auth.signin.signupNow")}
                </Link>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <style>{`
        /* Clean Signin Styles */
        .signin-container {
          min-height: 100vh;
          background-color: #e8f1f8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .signin-wrapper {
          width: 100%;
          max-width: 420px;
        }

        .signin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 4px;
        }

        .back-btn {
          background: none;
          border: none;
          color: #2c3e50;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: #1a252f;
        }

        .back-arrow {
          font-size: 20px;
          line-height: 1;
        }

        .lang-btn {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 30px;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .lang-btn:hover {
          background: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .signin-card {
          background: white;
          border-radius: 24px;
          padding: 36px 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s ease;
        }

        .signin-title {
          font-size: 28px;
          font-weight: 600;
          color: #1a252f;
          margin: 0 0 8px 0;
          letter-spacing: -0.3px;
        }

        .signin-subtitle {
          font-size: 15px;
          color: #5e6f7e;
          margin: 0 0 32px 0;
          line-height: 1.4;
        }

        .error-alert {
          background: #fee9e7;
          color: #c23d3d;
          padding: 14px 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 14px;
          border-left: 4px solid #c23d3d;
        }

        .input-field {
          margin-bottom: 24px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 8px;
        }

        .input-control {
          width: 100%;
          padding: 14px 16px;
          background: #f8fafc;
          border: 1.5px solid #dfe6ed;
          border-radius: 14px;
          font-size: 15px;
          color: #1a252f;
          transition: all 0.2s ease;
          outline: none;
          box-sizing: border-box;
        }

        .input-control:focus {
          background: white;
          border-color: #4a90e2;
          box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.08);
        }

        .input-control::placeholder {
          color: #9aabbb;
          font-weight: 400;
        }

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 16px 0 28px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .custom-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid #cfdde8;
          background: white;
          transition: all 0.15s;
          position: relative;
        }

        .custom-checkbox.checked {
          background: #4a90e2;
          border-color: #4a90e2;
        }

        .custom-checkbox.checked::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .remember-text {
          font-size: 14px;
          color: #3d566e;
          font-weight: 500;
          user-select: none;
        }

        .forgot-link {
          font-size: 14px;
          color: #4a90e2;
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .submit-btn {
          width: 100%;
          background: #1a252f;
          color: white;
          border: none;
          border-radius: 14px;
          padding: 15px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(26, 37, 47, 0.1);
        }

        .submit-btn:hover:not(:disabled) {
          background: #2c3e50;
          transform: translateY(-1px);
          box-shadow: 0 8px 16px rgba(26, 37, 47, 0.15);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 4px 8px rgba(26, 37, 47, 0.1);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .signup-prompt {
          text-align: center;
          margin-top: 24px;
          font-size: 15px;
          color: #5e6f7e;
        }

        .signup-link {
          color: #4a90e2;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
        }

        .signup-link:hover {
          text-decoration: underline;
        }

        /* Language Modal (bottom sheet) */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }

        .modal-container-bottom {
          background: white;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 420px;
          max-height: 70vh;
          overflow: hidden;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header-bottom {
          padding: 16px 20px;
          border-bottom: 1px solid #edf2f7;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background: #d0dde8;
          border-radius: 2px;
          margin: 8px auto 0;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a252f;
        }

        .modal-close-btn-bottom {
          background: none;
          border: none;
          color: #5e6f7e;
          font-size: 20px;
          cursor: pointer;
          padding: 4px 8px;
        }

        .modal-content-bottom {
          padding: 16px;
          overflow-y: auto;
          max-height: calc(70vh - 70px);
        }

        /* Responsive */
        @media (max-width: 480px) {
          .signin-container {
            padding: 16px;
            align-items: flex-start;
          }

          .signin-card {
            padding: 28px 20px;
            border-radius: 20px;
          }

          .signin-title {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default Signin;