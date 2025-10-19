# NAJOT CLINIC - CRM System

To'liq tibbiy CRM tizimi - bemorlar, shifokorlar, hamshiralar va duxtirlar uchun.

## 🚀 Features

### Public Website
- Bemorlar uchun navbat olish tizimi
- Login/Register funksiyalari
- Responsive design

### Admin Panel
- Dashboard va statistika
- Bemorlar boshqaruvi
- Shifokorlar boshqaruvi
- Hamshiralar boshqaruvi
- Xonalar boshqaruvi
- Tahlillar boshqaruvi
- Hisobotlar
- Sozlamalar

### Role-based Access
- **Admin**: To'liq boshqaruv
- **Shifokor**: Bemorlar, tashxislar, muolajalar
- **Hamshira**: Muolajalar, vitals, tahlillar
- **Duxtir**: Qabul, xonalar, to'lovlar

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Remix Icons
- **Routing**: React Router DOM
- **State Management**: React Context
- **Backend**: Supabase (ready for integration)
- **Database**: PostgreSQL (via Supabase)

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd najot-clinic
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## 🔑 Demo Credentials

### Admin
- Email: `admin@najotclinic.uz`
- Password: `admin123`

### Doctor
- Email: `shifokor@najotclinic.uz`
- Password: `shifokor123`

### Nurse
- Email: `hamshira@najotclinic.uz`
- Password: `hamshira123`

### Receptionist
- Email: `duxtir@najotclinic.uz`
- Password: `duxtir123`

## 🌐 Deployment

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Connect your GitHub repository to Vercel
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## 📁 Project Structure

```
src/
├── admin/                 # Admin panel components
│   ├── components/        # Reusable components
│   ├── contexts/          # Auth context
│   ├── pages/            # Admin pages
│   └── mocks/            # Mock data
├── components/           # Public website components
├── lib/                  # API and utilities
├── pages/               # Public pages
└── contexts/            # Auth context for public
```

## 🔧 Environment Variables

For production deployment, set these environment variables:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📊 Database Schema

The project includes a complete database schema in `supabase/migrations/` with:
- Staff management
- Patient records
- Appointments
- Vitals tracking
- Lab tests
- Treatment plans
- Payments
- Notifications
- File storage

## 🚀 Getting Started

1. **Public Website**: Visit `/` to see the main website
2. **Login**: Use demo credentials to access different roles
3. **Admin Panel**: Full CRM functionality at `/admin`
4. **Role Panels**: 
   - Doctor panel: `/shifokor`
   - Nurse panel: `/hamshira`
   - Receptionist panel: `/duxtir`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔐 Security

- Role-based access control
- Protected routes
- Input validation
- Secure authentication flow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
