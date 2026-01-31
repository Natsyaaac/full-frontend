import './Grid.css';
import React, { useState } from 'react';
import {
  FiHome, FiUser, FiBook, FiCalendar,
  FiAward, FiDollarSign, FiSettings,
  FiMail, FiPhone, FiMapPin, FiDownload,
  FiChevronRight, FiChevronDown, FiLogOut
} from 'react-icons/fi';
import {
  MdSchool, MdLibraryBooks, MdAssignment,
  MdBarChart, MdNotifications, MdHelp
} from 'react-icons/md'


function UmLayoutCard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedSection, setExpandedSections] = useState({
    akademik: true,
    perkuliahan: true,
    prestasi: true,
    keuangan: true,
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuSections = [
    {
      title: "MAIN MENU",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
        { id: 'profile', label: 'Profile Mahasiswa', icon: <FiUser /> }
      ]
    },
    {
      title: "AKADEMIK",
      items: [
        { id: 'krs', label: 'Kartu Rencana Studi', icon: <MdAssignment /> },
        { id: 'khs', label: 'Kartu Hasil Studi', icon: <MdBarChart /> },
        { id: 'transkrip', label: 'Transkrip Nilai', icon: <FiBook /> },
        { id: 'jadwal', label: 'Jadwal Kuliah', icon: <FiCalendar /> }
      ]
    },
    {
      title: "PERKULIAHAN",
      items: [
        { id: 'absensi', label: 'Absensi Kelas', icon: <MdLibraryBooks /> },
        { id: 'tugas', label: 'Tugas & Quiz', icon: <FiBook /> },
        { id: 'materi', label: 'Materi Perkuliahan', icon: <MdSchool /> }
      ]
    },
    {
      title: "PRESTASI",
      items: [
        { id: 'beasiswa', label: 'Beasiswa', icon: <FiAward /> },
        { id: 'organisasi', label: 'Organisasi', icon: <FiUser /> },
        { id: 'sertifikat', label: 'Sertifikat', icon: <FiAward /> }
      ]
    },
    {
      title: "KEUANGAN MAHASISWA",
      items: [
        { id: 'tagihan', label: 'Tagihan Biaya', icon: <FiDollarSign /> },
        { id: 'pembayaran', label: 'Riwayat Pembayaran', icon: <FiDollarSign /> },
        { id: 'beasiswa-keuangan', label: 'Beasiswa Keuangan', icon: <FiAward /> }
      ]
    },
    {
      title: "LAINNYA",
      items: [
        { id: 'notifikasi', label: 'Notifikasi', icon: <MdNotifications />, badge: 3 },
        { id: 'pengaturan', label: 'Pengaturan', icon: <FiSettings /> },
        { id: 'bantuan', label: 'Bantuan', icon: <MdHelp /> }
      ]
    }
  ];

  const studentInfo = [
    {
      icon: <FiMail />,
      label: "EMAIL",
      value: "john.doe@ummetro.ac.id",
      color: "#7c3aed"
    },
    {
      icon: <FiPhone />,
      label: "PHONE",
      value: "+62 812-3456-7890",
      color: "#3b82f6"
    },
    {
      icon: <FiMapPin />,
      label: "ADDRESS",
      value: "Jl. Ki Hajar Dewantara 15A, Metro, Lampung",
      color: "#10b981"
    },
    {
      icon: <MdSchool />,
      label: "FAKULTAS",
      value: "Teknik Informatika",
      color: "#f59e0b"
    },
    {
      icon: <FiBook />,
      label: "PROGRAM STUDI",
      value: "S1 Teknik Informatika",
      color: "#ef4444"
    },
    {
      icon: <FiCalendar />,
      label: "ANGKATAN",
      value: "2023",
      color: "#8b5cf6"
    }
  ];

  return (
    <div>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <div className="breadcrumb">
              <a href="#">Home</a>
              <FiChevronRight size={14} />
              <span>Dashboard Mahasiswa</span>
            </div>
          </div>

          <div className="user-profile">
            <div className="avatar-small">
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                LV
              </div>
            </div>

            <div className="user-info">
              <div className="user-name">Luvluv</div>
              <div className="user-role">Mahasiswa</div>
            </div>
            <FiChevronDown className='dropdown-icon' />
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="university-logo">
            <div className="logo-placeholder">UM</div>
            <div className="system-name">
              <h3>SIAKAD</h3>
              <p>UM METRO</p>
            </div>
          </div>

          <nav className="nav-menu">
            {menuSections.map((section, sectionIndex) => (
              <div className="nav-section" key={sectionIndex}>
                <div className="nav-title">{section.title}</div>
                <ul className="nav-items">
                  {section.items.map((item) => (
                    <li className="nav-item" key={item.id}>
                      <a href="#"
                        className={`nav-link ${activeMenu === item.id ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveMenu(item.id)
                        }}
                      >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            style={{
                              marginLeft: 'auto',
                              background: '#ef4444',
                              color: 'white',
                              fontSize: '0.75rem',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontWeight: '600'
                            }}>
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="nav-section">
              <a href="#"
                className="nav-link"
                style={{ color: '#ef4444', marginTop: '1rem' }}
                onClick={(e) => e.preventDefault()}
              >
                <span className="nav-icon"><FiLogOut /></span>
                <span>Logout</span>
              </a>
            </div>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="main-content">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar">
              LV
            </div>

            <div className="profile-info">
              <h2>Luvluv</h2>
              <p className='profile-npm'>NPM: 23430082</p>

              <button className="download-btn">
                <FiDownload />
                Download E-KTM
              </button>
            </div>

            {/* Info Grid */}
            <div className="info-card">
              <h3>
                <FiUser />
                Informasi Mahasiswa
              </h3>

              <div className="info-grid">
                {studentInfo.map((info, index) => (
                  <div className="info-item" key={index}>
                    <div className="info-icon" style={{ background: `${info.color} 15` }}>
                      <span style={{ color: info.color }}>
                        {info.icon}
                      </span>
                    </div>

                    <div className="info-content">
                      <h4>{info.label}</h4>
                      <p>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="dashboard-footer">
        <p>© 2026 SIAKAD UM METRO. All rights reserved.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
          Sistem Informasi Akademik Universitas Muhammadiyah Metro
        </p>
      </footer>
    </div>
  );
}

export default UmLayoutCard