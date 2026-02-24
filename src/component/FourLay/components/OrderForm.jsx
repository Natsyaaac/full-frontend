import React, { useState } from "react";
import '../App.css';

const OrderForm = ({ onSubmit, onClose }) => {
  const [Orderdata, setOrderData] = useState({
    title: '',
    note: '',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateOrder();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return
    }

    try {
      await onSubmit(Orderdata);
    } catch (error) {
      setErrors({ submit: error.message })
    }
  }

  const validateOrder = () => {
    const newErrors = {};

    if (!Orderdata.title.trim()) {
      newErrors.title = 'Nama makanan harus diisi'
    } else if (Orderdata.title.length < 3) {
      newErrors.title = 'Nama makanan minimal 3 karakter'
    }

    const validPriorities = ['pending', 'diproses', 'selesai']
    if (!validPriorities.includes(Orderdata, priority)) {
      newErrors.priority = 'Priority tidak valid'
    }
    return newErrors
  }


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Buat Order Baru</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Order Menu</label>
            <input
              type="text"
              id="title"
              name="title"
              value={Orderdata.title}
              onChange={handleChange}
              placeholder="Ingin mememesan sesuatu?"
              className={errors.title ? 'error' : ''}
            />
            {errors.title &&
              <span className="error-message">{errors.title}</span>
            }
          </div>
          <div className="form-group">
            <label htmlFor="note">Note untuk chef</label>
            <textarea
              name="note"
              id="note"
              value={Orderdata.note}
              onChange={handleChange}
              placeholder="Tambahkan sesuatu untuk chef"
              rows='4'
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Prioritas</label>
            <select
              name="priority"
              id="priority"
              value={Orderdata.priority}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="Progres">Diproses</option>
              <option value="Done">Selesai</option>
            </select>
            {errors.description &&
              <span className='error-message'>{errors.priority}</span>
            }
          </div>

          {errors.submit && (
            <div className="submit-error">
              {errors.submit}
            </div>
          )}

          <div className="forms-actions">
            <button className="cancel-btn"
              type="button"
              onClick={onClose}
            >
              Batal
            </button>

            <button className="submit-btn"
              type="submit"
            >
              Buat Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderForm