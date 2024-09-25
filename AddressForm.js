import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddressForm = () => {
  const initialValues = { addresses: [{ title: '', street: '', country: '', pincode: '' }] };
  const validationSchema = Yup.object().shape({
    addresses: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Title is required').max(100).matches(/^[^\d]+$/, 'No numbers allowed').matches(/^[^ ]+( [^ ]+)?$/, 'Only one space allowed'),
        street: Yup.string().required('Street is required').max(100).matches(/^[^\d]+$/, 'No numbers allowed').matches(/^[^ ]+( [^ ]+)?$/, 'Only one space allowed'),
        country: Yup.string().required('Country is required').max(100).matches(/^[^\d]+$/, 'No numbers allowed').matches(/^[^ ]+( [^ ]+)?$/, 'Only one space allowed'),
        pincode: Yup.string().required('Pincode is required').length(6).matches(/^[1-9][0-9]{5}$/, 'Must be 6 digits and not start with 0'),
      })
    )
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => { console.log('Form data', values); resetForm(); }}>
      {({ values, setFieldValue }) => (
        <Form style={{ padding: 20, backgroundColor: '#fff', borderRadius: 5, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {values.addresses.map((address, index) => (
            <div key={index}>
              <h3>Address {index + 1}</h3>
              {['title', 'street', 'country', 'pincode'].map(field => (
                <div key={field}>
                  <label htmlFor={`addresses.${index}.${field}`}>{field}</label>
                  <Field name={`addresses.${index}.${field}`} type="text" style={{ width: 'calc(100% - 22px)', padding: 10, margin: '10px 0', borderRadius: 4, border: '1px solid #ccc' }} />
                  <ErrorMessage name={`addresses.${index}.${fvalidatield}`} fieldcomponent="div" style={{ color: 'red' }} />
                </div>
              ))}
              <button type="button" onClick={() => {
                if (index === 0 && Object.values(address).every(field => !field.trim())) alert('Cannot remove the first address when all fields are empty.');
                else setFieldValue('addresses', values.addresses.filter((_, i) => i !== index));
              }} style={{ backgroundColor: '#dc3545', color: '#fff', padding: 10, borderRadius: 4 }}>Remove Address</button>
            </div>
          ))}
          <button type="button" onClick={() => {
            const currentAddress = values.addresses[values.addresses.length - 1];
            if (Object.values(currentAddress).every(field => field.trim()) && /^[1-9][0-9]{5}$/.test(currentAddress.pincode)) setFieldValue('addresses', [...values.addresses, { title: '', street: '', country: '', pincode: '' }]);
            else alert('Please fill all fields correctly.');
          }} style={{ backgroundColor: '#28a745', color: '#fff', padding: 10, borderRadius: 4 }}>Add Address</button>
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: 10, borderRadius: 4 }}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddressForm;
