export const patientsData = [
  {
    id: 1,
    ism: "Yusuf",
    familiya: "Ahmedov",
    tugulgan_sana: "1985-03-15",
    jins: "Erkak",
    telefon: "+998901234567",
    manzil: "Toshkent sh., Yunusobod tumani",
    allergiyalar: "Penitsillin",
    surunkali_kasalliklar: "Qandli diabet",
    yosh: 38
  },
  {
    id: 2,
    ism: "Mohira",
    familiya: "Eshmurodova",
    tugulgan_sana: "1990-07-22",
    jins: "Ayol",
    telefon: "+998907654321",
    manzil: "Toshkent sh., Mirzo Ulugbek tumani",
    allergiyalar: "Yo'q",
    surunkali_kasalliklar: "Gipertoniya",
    yosh: 33
  },
  {
    id: 3,
    ism: "Sardor",
    familiya: "Karimov",
    tugulgan_sana: "1978-12-10",
    jins: "Erkak",
    telefon: "+998909876543",
    manzil: "Toshkent sh., Shayxontohur tumani",
    allergiyalar: "Aspirin",
    surunkali_kasalliklar: "Yo'q",
    yosh: 45
  },
  {
    id: 4,
    ism: "Nilufar",
    familiya: "Toshmatova",
    tugulgan_sana: "1995-05-18",
    jins: "Ayol",
    telefon: "+998903456789",
    manzil: "Toshkent sh., Chilonzor tumani",
    allergiyalar: "Yo'q",
    surunkali_kasalliklar: "Astma",
    yosh: 28
  }
];

export const diagnosesData = [
  {
    id: 1,
    patient_id: 1,
    doctor_id: 1,
    tashxis_nomi: "Qandli diabet",
    icd_kodi: "E11",
    tavsif: "2-tip qandli diabet, kompensatsiyalangan",
    sana: "2024-01-15"
  },
  {
    id: 2,
    patient_id: 2,
    doctor_id: 1,
    tashxis_nomi: "Arterial gipertoniya",
    icd_kodi: "I10",
    tavsif: "Birlamchi arterial gipertoniya",
    sana: "2024-01-16"
  }
];

export const treatmentPlansData = [
  {
    id: 1,
    diagnosis_id: 1,
    patient_id: 1,
    doctor_id: 1,
    boshlanish_sana: "2024-01-15",
    tugash_sana: "2024-02-15",
    izoh: "Qandli diabetni nazorat qilish uchun kompleks davolash"
  }
];

export const treatmentItemsData = [
  {
    id: 1,
    plan_id: 1,
    dori_nomi: "Metformin",
    doza: "500 mg",
    qabul_vaqti: "ertalab",
    davomiylik_kun: 30,
    izoh: "Ovqatdan keyin",
    status: "rejalashtirilgan"
  },
  {
    id: 2,
    plan_id: 1,
    dori_nomi: "Insulin",
    doza: "10 birlik",
    qabul_vaqti: "kech",
    davomiylik_kun: 30,
    izoh: "Ovqatdan oldin",
    status: "berildi"
  }
];

export const roomsData = [
  {
    id: 1,
    nom: "101",
    turi: "Palata",
    status: "bosh",
    narx_kun_uzs: 150000
  },
  {
    id: 2,
    nom: "102",
    turi: "VIP",
    status: "band",
    narx_kun_uzs: 300000
  },
  {
    id: 3,
    nom: "103",
    turi: "Palata",
    status: "bosh",
    narx_kun_uzs: 150000
  }
];

export const nursesData = [
  {
    id: 1,
    fio: "Gulnora Abdullayeva",
    telefon: "+998901111111",
    smena_boshlanish: "08:00",
    smena_tugash: "20:00",
    aktiv: true
  },
  {
    id: 2,
    fio: "Dilfuza Karimova",
    telefon: "+998902222222",
    smena_boshlanish: "20:00",
    smena_tugash: "08:00",
    aktiv: true
  }
];

export const labResultsData = [
  {
    id: 1,
    patient_id: 1,
    doctor_id: 1,
    test_nomi: "Qon tahlili",
    natija_qiymati: "4.5",
    birlik: "mmol/L",
    status: "Normal",
    fayl_url: "tahlil.pdf",
    sana: "2024-01-15",
    izoh: "Qandli diabet nazorati"
  }
];