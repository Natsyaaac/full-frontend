import React, { useState } from 'react';
import '../App.css'

const TaskFrom = ({ onSubmit, onClose }) => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'

    // useState menyimpan state berbentuk object 
    // form data adalah state saat ini
    // setForm data adalah fungsi updater
  });

  const [errors, setErrors] = useState({}); // satet awal untuk error 

  const handleChange = (e) => {
    const { name, value } = e.target;
    // destructing mengambil name dan value adri event.target
    // name harus sama dengan key di formData

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    //functional update digunakan untuk menghindari stale state
    // spread operator menyalin seluruh properti sebelumnya
    // computed property name mengubah field sesuai input 


    if (errors[name]) {
      setErrors(prev => ({ // =>  closure 
        ...prev,
        [name]: ''
      }));
      // mngecek apakah field tersebut memiliki error
      // jika ada, error direset menajdi string kosong 
      // spread digunakan untuk menjaga error fieldlain tetap ada

    }
  };

  const handleSubmit = async (e) => {
    // async membuat fungsi mengembalikan promise
    e.preventDefault();
    // pencegahan relload  form
    const newErrors = validateForm();
    // dan memanggil function validateForm dan menyimpan hasilnya

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    //Object.keys() mengambil semua key dalam object
    // jika panjang > 0 berarti ada error
    // fungsi dihentikan return 

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ submit: error.message })
    }
    // await menunggu Promise dari onSubmit
    // jika Promise reject -> masuk ke catch
    // eror disimpan dalam state
  }


  const validateForm = () => {
    // fungsi validasi untuk from 
    const newErrors = {};
    // obejct ksoong untuk menampung error 

    if (!formData.title.trim()) {
      newErrors.title = 'Title harus diisi';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title minimal 3 karakter'
    }
    // trim() menghapus spasi awal dan akhir
    // ! mengecek nilai kosong
    // validais panjang karakter (> 3)

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi harus diisi';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Deskripsi minimal 10 karakter '
    }
    // trim() menghapus spasi awal dan akhir
    // ! mengecek nilai kosong
    // validais panjang karakter (> 3)
    

    const validPriorities = ['low', 'medium', 'high'];
    // array konstatnta untuk whitelist value

    if (!validPriorities.includes(formData.priority)) {
      newErrors.priority = 'Priority tidak valid'
    }
    // includes() mengecek apakah ada nilai dalam array
    // jika tidak ditemukan -> error ditambahkan 


    return newErrors;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Buat Task Baru</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Judul Task</label>
            <input
              type="text"
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Contoh: Desain UI Dashboard'
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className='error-message'>
              {errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='Jelaskan detail task...'
              rows='4'
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className='error-message'>{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Prioritas</label>
            <select
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {errors.submit && (
            <div className="submit-error">{errors.submit}</div>
          )}

          <div className="form-actions">
            <button className="cancel-btn"
              type='button' onClick={onClose}
            >
              Batal
            </button>

            <button className="submit-btn" type='submit'>
              Buat Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskFrom