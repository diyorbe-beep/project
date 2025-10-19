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
  },
  {
    id: 3,
    fio: "Zarina Usmonova",
    telefon: "+998903333333",
    smena_boshlanish: "08:00",
    smena_tugash: "20:00",
    aktiv: true
  }
];

export const nurseAssignmentsData = [
  {
    id: 1,
    nurse_id: 1,
    patient_id: 1,
    room_id: 2,
    assigned_at: "2024-01-15T08:00:00",
    status: "faol"
  },
  {
    id: 2,
    nurse_id: 1,
    patient_id: 2,
    room_id: 3,
    assigned_at: "2024-01-15T09:00:00",
    status: "faol"
  },
  {
    id: 3,
    nurse_id: 2,
    patient_id: 3,
    room_id: 1,
    assigned_at: "2024-01-15T20:00:00",
    status: "faol"
  }
];

export const vitalsData = [
  {
    id: 1,
    patient_id: 1,
    sana: "2024-01-15",
    vaqt: "08:30",
    BP_sistol: 120,
    BP_diastol: 80,
    puls: 72,
    temp: 36.6,
    SpO2: 98,
    nafas: 18,
    izoh: "Normal ko'rsatkichlar"
  },
  {
    id: 2,
    patient_id: 2,
    sana: "2024-01-15",
    vaqt: "09:15",
    BP_sistol: 140,
    BP_diastol: 90,
    puls: 85,
    temp: 37.2,
    SpO2: 96,
    nafas: 20,
    izoh: "Bosim biroz yuqori"
  }
];

export const labOrdersData = [
  {
    id: 1,
    patient_id: 1,
    test_nomi: "Qon tahlili",
    holat: "buyurtma",
    sana: "2024-01-15"
  },
  {
    id: 2,
    patient_id: 2,
    test_nomi: "Siydik tahlili",
    holat: "qabul_qilindi",
    sana: "2024-01-15"
  },
  {
    id: 3,
    patient_id: 1,
    test_nomi: "EKG",
    holat: "tayyor",
    sana: "2024-01-14"
  }
];

export const labSamplesData = [
  {
    id: 1,
    order_id: 2,
    olindi_vaqti: "2024-01-15T09:30:00",
    topshirildi_vaqti: "2024-01-15T10:00:00",
    izoh: "Namuna laboratoriyaga topshirildi"
  }
];

export const treatmentItemsNurseData = [
  {
    id: 1,
    plan_id: 1,
    patient_id: 1,
    dori_nomi: "Metformin",
    doza: "500 mg",
    qabul_vaqti: "ertalab",
    davomiylik_kun: 30,
    status: "rejalashtirilgan",
    izoh: "Ovqatdan keyin"
  },
  {
    id: 2,
    plan_id: 1,
    patient_id: 1,
    dori_nomi: "Insulin",
    doza: "10 birlik",
    qabul_vaqti: "kech",
    davomiylik_kun: 30,
    status: "berildi",
    izoh: "Ovqatdan oldin"
  },
  {
    id: 3,
    plan_id: 2,
    patient_id: 2,
    dori_nomi: "Paracetamol",
    doza: "500 mg",
    qabul_vaqti: "tush",
    davomiylik_kun: 7,
    status: "kechikti",
    izoh: "Isitma uchun"
  }
];

export const notificationsData = [
  {
    id: 1,
    type: "muolaja",
    message: "Yusuf Ahmedov uchun Metformin berish vaqti keldi",
    priority: "yuqori",
    sana: "2024-01-15T08:00:00",
    oqildi: false
  },
  {
    id: 2,
    type: "vital",
    message: "Mohira Eshmurodova - bosim me'yordan yuqori",
    priority: "yuqori",
    sana: "2024-01-15T09:15:00",
    oqildi: false
  },
  {
    id: 3,
    type: "tahlil",
    message: "Sardor Karimov uchun qon namunasi olish kerak",
    priority: "o'rta",
    sana: "2024-01-15T10:00:00",
    oqildi: true
  }
];