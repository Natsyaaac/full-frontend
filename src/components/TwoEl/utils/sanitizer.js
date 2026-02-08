/**
 * Utility untuk sanitasi input dan mencegah XSS
 */

// Escape karakter HTML khusus

export const escapeHTML = (str) => {  // export untuk penggunaan di file Dashboard.js dengan parameter str
  if (typeof str !== 'string') return str;
  // jika typeof str bukan bernilai string kembalikan nilai str 

  const escapeMap = {  // mendefinisikan escapeMap sebagai tempay menyimpan object 
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return str.replace(/[&<>"'`=\/]/g, char => escapeMap[char] || char);

  // kembalikan str replace (bawaan javascript untuk mengganti bagian text) text ini dengan array di escapeMap[bagian char yang terdeteksi] atau char 
}

// export sanitizeForHTML untuk penggunaan di file lain lainya dengan parameter str
export const sanitizeForHTML = (str) => {
  if (typeof str !== 'string') return '';  // jika typeof str bukan bernilai string kembalikan nilai str 

  let sanitized = escapeHTML(str) // mendefinisikan sanitized untuk menyimpan escapeHTML parameter (str)

  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');  // mereplace semua text dari hasil mapping snitized dan menggantinya

  sanitized = sanitized.replace(/\s(on\w+)=["'][^"']*["']/gi, ''); // mereplace event handlers dari hasil mapping dan menggantinya  

  sanitized = sanitized.replace(/javascript:/gi, ''); // merepelace semua javascript protocol dari hasil mapping dan menggantinya

  sanitized = sanitized.replace(/data:/gi, ''); // mereplace data yang biasa berisi script inject dari hasil mapping dan menggantinya 

  return sanitized; // mengembalikan nilai sanitized setelah itu 
}

// export validateFormInput untuk module lain yang mengimport dengan parameter input 
export const validateFormInput = (input) => {
  if (typeof input !== 'string') return false;  // jika typeof input bukan string kemablikan false (atau ditolak) 

  if (input.length > 500) return false // jika panjang input melibihi 500 kemablikan false(tolak)

  const dangerousPatterns = [  // mendefinisikan dangerousPatterns untuk menyimpan pengecekan karakter berbahaya
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:/i,
    /eval\(/i,
    /alert\(/i,
    /document\./i,
    /window\./i,
    /fromCharCode/i
  ];

  for (const pattern of dangerousPatterns) {  // menggunakan perulangan for untuk pengecekap iterasi satu persatu  
    if (pattern.test(input)) { // jika patern ada kecocokan dengan input (menggunakan test() drai js)
      return false
      // kembalikan nilai false (tolak)
    }
  }

  return true; // kembalikan true (diterima jika tidak ada atau untuk inputan selanjutnya )
}

// export sanitizeAttribute untuk penggunaan import di module lainya dengan parameter str 
export const sanitizeAttribute = (str) => {
  return escapeHTML(str).replace(/["']/g, ''); // kembalikan escapeHTML parameter str dan replace tdan kutip satu atau dua dengann menggantinya dengan string kosong
}

// export detectXSS untuk penggunaan import di module lainya dengan parameter input  
export const detectXSS = (input) => {

  // mendefinisikan xssPatterns untuk menyimpan pengecekan keyword berbahaya dan mendefinisikann ke kelo,pol tertentu (high, low, medium) dan type tertentu
  const xssPatterns = [
    { pattern: /<script/i, severity: 'high', type: 'Script Tag' },
    { pattern: /javascript:/i, severity: 'high', type: 'JavaScript Protocol' },
    { pattern: /on\w+\s*=\s*["']/i, severity: 'high', type: 'Event Handler' },
    { pattern: /data:/i, severity: 'medium', type: 'Data Protocol' },
    { pattern: /eval\(/i, severity: 'high', type: 'Eval Function' },
    { pattern: /document\.(cookie|write|domain)/i, severity: 'high', type: 'DOM Access' },
    { pattern: /window\.(location|alert)/i, severity: 'medium', type: 'Window Object' },
    { pattern: /<iframe/i, severity: 'medium', type: 'IFrame' },
    { pattern: /<object/i, severity: 'medium', type: 'Object Tag' },
    { pattern: /<embed/i, severity: 'medium', type: 'Embed Tag' }
  ];

  const detections = []; // mendefinisikan detections untuk menyimpan object haasil deteksi keyword

  xssPatterns.forEach(({ pattern, severity, type }) => {  //array xssPatterns diekesekusi menggunakann (forEach) sekali untuk setiap element array 
    if (pattern.test(input)) { // jika patern ada kecocokan dengan input 
      detections.push({ // push ke array detections dengan object itu 
        type, // set type 
        severity, // set severity
        position: input.search(pattern) // isi patern 
      });
    }
  });

  return detections; // kemabli ke array detections untuk pengecekan selanjutnya 
};



// export cleanForDatabase untuk  penggunaan import di module lainya dengan parameter input  
export const cleanForDatabase = (input) => {
  if (typeof input !== 'string') return input;
  // jika typeof input bukan string kemablikan input semula 

  const sqlEscape = str => str // mendefinisikan sqlEscape disi str teruus digunakan arrow fungsi 
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .replace(/\0/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x1a/g, '\\Z');

    // replace semua karakter tertentu sebelum dikirik ke sql 

  return escapeHTML(sqlEscape(input));
  // kembali ke escapeHtML dengan paramter sqlEscape, input untuk inputan selanjutnya yang dikirim ke database 
}