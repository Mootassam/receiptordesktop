import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/form/userFormActions';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import userEnumerators from 'src/modules/user/userEnumerators';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  roles: yupFormSchemas.enumerator(i18n('user.fields.roles'), {
    options: userEnumerators.roles,
  }),
  status: yupFormSchemas.enumerator(
    i18n('user.fields.status'),
    {
      options: userEnumerators.status,
    },
  ),
});

function UserEditForm(props) {
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.user || {};

    return {
      email: record.email || '',
      roles: record.roles ? record.roles[0] : null,
      status: record.status,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      id: props.user.id,
      ...values,
    };
    dispatch(actions.doUpdate(data));
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="section-card">
            <h5 className="section-title">
              User Access
            </h5>
            <Row className="g-3">
              <Col xs={12} md={6} lg={4}>
                <InputFormItem
                  name="email"
                  label={i18n('user.fields.email')}
                  required={true}
                />
              </Col>

              <Col xs={12} md={6} lg={4}>
                <SelectFormItem
                  name="roles"
                  label={i18n('user.fields.roles')}
                  required={true}
                  options={userEnumerators.roles.map((value) => ({
                    value,
                    label: i18n(`${value}`),
                  }))}
                />
              </Col>

              <Col xs={12} md={6} lg={4}>
                <SelectFormItem
                  name="status"
                  label={i18n('user.fields.status')}
                  options={userEnumerators.status.map((value) => ({
                    value,
                    label: i18n(`user.status.${value}`),
                  }))}
                />
              </Col>
            </Row>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <div className="button-group">
              <button
                className="btn btn-primary"
                disabled={props.saveLoading}
                type="button"
                onClick={form.handleSubmit(onSubmit)}
              >
                <ButtonIcon
                  loading={props.saveLoading}
                  iconClass="far fa-save"
                />
                &nbsp;
                {i18n('common.save')}
              </button>

              <button
                className="btn btn-light"
                disabled={props.saveLoading}
                onClick={onReset}
                type="button"
              >
                <i className="fas fa-undo"></i>
                &nbsp;
                {i18n('common.reset')}
              </button>

              {props.onCancel && (
                <button
                  className="btn btn-light"
                  disabled={props.saveLoading}
                  onClick={() => props.onCancel()}
                  type="button"
                >
                  <i className="fas fa-times"></i>
                  &nbsp;
                  {i18n('common.cancel')}
                </button>
              )}
            </div>
          </div>
        </form>

        <style>
          {`/* Add these styles to your CSS file */

.section-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.section-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
  font-size: 1.1rem;
}

.readonly-field {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 0.375rem 0.75rem;
  min-height: 38px;
}

.form-group {
  margin-bottom: 0;
}

.form-actions {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  margin-top: 1rem;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.button-group .btn {
  min-width: 120px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section-card {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .button-group .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 576px) {
  .section-card {
    padding: 0.75rem;
  }
  
  .section-title {
    font-size: 1rem;
  }
}

/* Ensure form items have consistent spacing */
.form-group .form-control,
.form-group .form-select {
  margin-bottom: 0;
}

/* Improve switch item appearance */
.switch-form-item {
  padding: 0.5rem 0;
}`}
        </style>
      </FormProvider>
    </FormWrapper>
  );
}

export default UserEditForm;