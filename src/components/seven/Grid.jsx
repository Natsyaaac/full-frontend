import React, { useState } from 'react';
import './Grid.css';

function FormApp() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    usia: '',
    pekerjaan: '',
    alamat: '',
    subscribe: false
  })

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    console.log('Data yang dikirim', formData)
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    console.log(value);
  };

  const handleReset = () => {
    setFormData({
      nama: '',
      email: '',
      usia: '',
      pekerjaan: '',
      alamat: '',
      subscribe: false
    });
    setSubmittedData(null);
    console.log('Data telah dihapus', formData)
  }
  return (
    <div className="app-container">
      <h1>Form dengan useState & CSS Layout</h1>

      <div className="form-display-container">
        {/* FORM SECTION - MENGGUNAKAN FLEXBOX */}
        <form onSubmit={handleSubmit} className="form-section">
          <h2>Form Registrasi</h2>

          <div className="form-flex-container">
            <div className="form-group">
              <label htmlFor="nama">Nama Lengkap</label>
              <input type="text"
                id='nama'
                name='nama'
                value={formData.nama}
                onChange={handleChange}
                placeholder='Masukan nama'
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email"
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='email@contoh.com'
                required
              />
            </div>
          </div>

          <div className="form-grid-container">
            <div className="form-group">
              <label htmlFor="usia">Usia:</label>
              <input type="number"
                id='usia'
                name='usia'
                value={formData.usia}
                onChange={handleChange}
                placeholder='Umur Anda'
                min='0'
              />
            </div>

            <div className="form-group">
              <label htmlFor="pekerjaan">Pekerjaan:</label>
              <select name="pekerjaan"
                id="pekerjaan"
                value={formData.pekerjaan}
                onChange={handleChange}
              >
                <option value="">Pilih pekerjaan</option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="karyawan">Karyawan</option>
                <option value="wiraswasta">Wiraswasta</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="alamat">Alamat:</label>
            <textarea name="alamat"
              id="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder='Masukan alamat lengkap'
              rows="3"
            />
          </div>

          <div className="checkbox-group">
            <input type="checkbox"
              id='subscribe'
              name='subscribe'
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label htmlFor="subscribe">Berlanggana newsletter</label>
          </div>
          {/* BUTTONS - FLEX CONTAINER */}
          <div className="button-container">
            <button className="submit-btn" type='submit'>
              Kirim Data
            </button>

            <button type='button' onClick={handleReset} className='reset-btn'>
              Reset Form
            </button>
          </div>
        </form>

        <div className="display-section">
          <h2>Data yang Diinput</h2>

          {submittedData ? (
            <div className="data-grid">
              <div className="data-card">
                <h3>Nama</h3>
                <p>{submittedData.nama || '-'}</p>
              </div>
              <div className="data-card">
                <h3>Email</h3>
                <p>{submittedData.email || '-'}</p>
              </div>
              <div className="data-card">
                <h3>Usia</h3>
                <p>{submittedData.usia || '-'} tahun</p>
              </div>
              <div className="data-card">
                <h3>Pekerjaan</h3>
                <p>{submittedData.pekerjaan || '-'}</p>
              </div>
              <div className="data-card full-width">
                <h3>Alamat</h3>
                <p>{submittedData.alamat || '-'}</p>
              </div>
              <div className="data-card full-width">
                <h3>Berlangganan</h3>
                <p className={submittedData.subscribe ? 'subscribed' : 'not-subscribed'}>
                  {submittedData.subscribe ? '✅ Ya' : '❌ Tidak'}
                </p>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>📋 Form masih kosong</p>
              <p>Isi form dan klik "Kirim Data"</p>
            </div>
          )}

          <div className="live-priview">
            <h3>Live Priview State:</h3>
            <div className="state-indicator">
              <span>Nama :</span>
              <strong>{formData.nama || 'Belum disi'}</strong>
            </div>
            <div className="state-indicator">
              <span>Email: </span>
              <strong>{formData.email || 'Belum diisi'}</strong>
            </div>

            <div className="state-indicator">
              <span>Subscribe  :</span>
              <strong className={formData.subscribe ? 'active' : ''}>
                {formData.subscribe ? 'Aktif' : 'Tidak Aktif'}
              </strong>
            </div>
          </div>
        </div>
      </div>


      {/* CSS LAYOUT DEMONSTRATION */}
      <div className="layout-demo">
        <h2>CSS Layout yang digunakan:</h2>
        <div className="demo-container">
          <div className="flex-demo">
            <h3>Flexbox (Form atas)</h3>
            <div className="flex-example">
              <div>Nama Input</div>
              <div>Email Input</div>
            </div>
            <p>Untuk layout horizontal yang responsif</p>
          </div>

          <div className="grid-demo">
            <h3>CSS Grid (Form Tengah)</h3>
            <div className="grid-example">
              <div>Usia Input</div>
              <div>Pekerjaan Select</div>
            </div>
            <p>Untuk layout 2-kolom yang rapi</p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default FormApp;