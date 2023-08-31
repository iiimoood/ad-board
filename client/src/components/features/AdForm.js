import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';

function MyComponent() {
  const [value, setValue] = useState('');

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

const Date = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

const AdForm = ({ action, actionText, ...props }) => {
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const [title, setTitle] = useState(props.title || '');
  const [dateOfPublication, setDateOfPublication] = useState(
    props.dateOfPublication || ''
  );
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [seller, setSeller] = useState(props.seller || '');
  const [content, setContent] = useState(props.content || '');
  const [contentError, setContentError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleSubmit = () => {
    setContentError(!content);
    setDateError(!dateOfPublication);
    if (content && dateOfPublication) {
      action({ title, dateOfPublication, location, seller, content });
    }
  };
  return (
    <form onSubmit={validate(handleSubmit)}>
      <div className="form-group mb-2">
        <label>Title</label>
        <input
          {...register('title', { required: true })}
          type="text"
          className="form-control w-25"
          id="title"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">
            Title can't be empty
          </small>
        )}
      </div>
      <div className="form-group mb-2">
        <label>Date of publication</label>
        <DatePicker
          selected={dateOfPublication}
          onChange={(date) => setDateOfPublication(date)}
        />
        {dateError && (
          <small className="d-block form-text text-danger mt-2">
            Date can't be empty
          </small>
        )}
      </div>
      <div className="form-group mb-2">
        <label>Price</label>
        <input
          {...register('price', { required: true, min: 1 })}
          type="number"
          className="form-control w-25"
          id="price"
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        {errors.price && (
          <small className="d-block form-text text-danger mt-2">
            Price can't be empty
          </small>
        )}
      </div>
      <div className="form-group mb-2">
        <label>Location</label>
        <input
          {...register('location', { required: true })}
          type="text"
          className="form-control w-25"
          id="location"
          placeholder="Enter location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        {errors.location && (
          <small className="d-block form-text text-danger mt-2">
            Location can't be empty
          </small>
        )}
      </div>
      <div className="form-group mb-2">
        <label>Seller</label>
        <input
          {...register('seller', { required: true })}
          type="text"
          className="form-control w-25"
          id="seller"
          placeholder="Enter seller"
          onChange={(e) => setSeller(e.target.value)}
          value={seller}
        />
        {errors.seller && (
          <small className="d-block form-text text-danger mt-2">
            Seller can't be empty
          </small>
        )}
      </div>
      <div className="form-group mb-2">
        <label>Content</label>
        <ReactQuill
          theme="snow"
          placeholder="Enter content"
          value={content}
          onChange={setContent}
        />
        {contentError && (
          <small className="d-block form-text text-danger mt-2">
            Content can't be empty
          </small>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        {actionText}
      </button>
    </form>
  );
};

AdForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
};

export default AdForm;
