import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {addExp,  addInc} from '../actions/index';
import './styles/Form.scss';
import {connect} from 'react-redux'

const FormPanel = (props) => {
  return (
    <Formik
      initialValues={{ name: '', type: "inc", cash: 0, currency: "PLN" }}
      validate={values => {
        let errors = {};
        if (!values.name) {
          errors.name = 'Description is required!';
        } else if (
          values.name.length <= 4 || values.name.length > 12
        ) {
          errors.name = 'Description: min length 5 letters, max 12.';
        }
        if (values.cash <= 0 || !values.cash) {
          errors.cash = 'Cash amount must be higher than zero'
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // tu dodajemy do bazy danych
        const transaction = {
            text: values.name,
            currency: values.currency,
            value: values.cash,
            date: new Date().getDate()
        }
        if (values.type === "inc") {
          props.addInc(transaction)
        } else { props.addExp(transaction) }

        setSubmitting(false);
      }}
    >

      {({ isSubmitting, isValid }) => (
        <>
          <Form className="addPanel">
            <div className="wrapper">
              <div className="addType">
                <Field component="select" name="type">
                  <option value="inc">  + </option>
                  <option value="exp">  - </option>
                </Field>
                <Field className="inputDesc" type="text" name="name" />
                <Field className="inputMoney" type="number" name="cash" />
                <Field component="select" name="currency">
                  <option value="PLN">PLN</option>
                  <option value="GBP">GBP</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </Field>
                <button type="submit" disabled={isSubmitting} className={!isValid ? "btnAdd " : "btnAdd active"}><i className="far fa-check-circle"></i></button>
              </div>
            </div>
          </Form>
          <ol>
            <ErrorMessage name="name" component="li" className="erroMsg" />
            <ErrorMessage name="cash" component="li" className="erroMsg" />
          </ol>
          {props.children}
        </>
      )}
    </Formik>
  )
};

export default connect(()=>({}), { addInc, addExp} )(FormPanel);
