import React, { useState, memo } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  FileText, 
  Users, 
  ChevronRight, 
  Activity, 
  Shield, 
  HeartPulse,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants & Data ---
const SERVICES = [
  {
    title: 'General Consultations',
    description: 'Book a face-to-face or telephone consultation with our GP team.',
    icon: <Users />,
  },
  {
    title: 'Repeat Prescriptions',
    description: 'Order your regular medications online through our secure portal.',
    icon: <FileText />,
  },
  {
    title: 'Vaccinations',
    description: 'Flu jabs, travel vaccinations, and childhood immunisations.',
    icon: <Activity />,
  },
  {
    title: 'Mental Health',
    description: 'Confidential support and resources for your mental wellbeing.',
    icon: <Shield />,
  },
];

const TEAM = [
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Senior Partner',
    specialty: 'Family Medicine & Women\'s Health',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Dr. Michael Chen',
    role: 'GP Partner',
    specialty: 'Pediatrics & Minor Surgery',
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Salaried GP',
    specialty: 'Mental Health & Elderly Care',
    image: 'https://images.pexels.com/photos/4173250/pexels-photo-4173250.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const NEWS = [
  {
    date: 'June 10, 2026',
    title: 'Summer Health: Staying Safe in the Heat',
    excerpt: 'As temperatures rise, we share tips on how to stay hydrated and recognize heatstroke symptoms.',
    category: 'Health Advice',
    color: 'from-orange-500/10 to-orange-500/5 text-orange-600'
  },
  {
    date: 'June 05, 2026',
    title: 'New Online Consultation System Launch',
    excerpt: 'We are excited to introduce our new digital portal for non-urgent medical enquiries.',
    category: 'Surgery Update',
    color: 'from-primary-500/10 to-primary-500/5 text-primary-600'
  },
  {
    date: 'May 28, 2026',
    title: 'Patient Participation Group (PPG) Meeting',
    excerpt: 'Join us for our next quarterly meeting to discuss how we can improve our surgery services.',
    category: 'Community',
    color: 'from-accent-500/10 to-accent-500/5 text-accent-600'
  }
];

// --- Sub-components ---

const TopBar = memo(() => (
  <div className="relative z-10 bg-primary-950 text-white py-2 hidden md:block">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
      <div className="flex items-center space-x-6">
        <span className="flex items-center"><Phone className="w-4 h-4 mr-2" /> 01234 567 890</span>
        <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> 123 Healthcare Way, London, UK</span>
      </div>
      <div className="flex items-center">
        <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Open Today: 08:00 - 18:30</span>
      </div>
    </div>
  </div>
));

const Navigation = memo(({ onMenuToggle, isMenuOpen }: { onMenuToggle: () => void, isMenuOpen: boolean }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-24">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center group cursor-pointer">
            <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <HeartPulse className="h-8 w-8 text-white" />
            </div>
            <span className="ml-3 text-2xl font-black text-primary-950 tracking-tighter uppercase">The Avenue</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          {['Home', 'About Us', 'Services', 'News', 'Appointments', 'Team'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '')}`} 
              className="px-4 py-2 text-slate-600 hover:text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-200"
            >
              {item}
            </a>
          ))}
          <a href="#contact" className="ml-4 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-200 transition-all duration-300 active:scale-95">
            Contact Us
          </a>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={onMenuToggle} className="text-slate-600 p-2" aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </div>

    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
        >
          <div className="flex flex-col space-y-4 p-6">
            {['Home', 'About Us', 'Services', 'News', 'Appointments', 'Team', 'Contact Us'].map((item) => (
              <a 
                key={item} 
                href={item === 'Home' ? '#' : `#${item.toLowerCase().replace(' ', '')}`} 
                className={`font-semibold ${item === 'Contact Us' ? 'text-primary-600' : 'text-slate-600'}`}
                onClick={onMenuToggle}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
));

const Hero = memo(() => (
  <section className="relative py-20 lg:py-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-primary-100 shadow-inner-light">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span>Currently accepting new patients</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-primary-950 leading-[0.9] tracking-tighter mb-8">
              WE CARE FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">YOUR FUTURE</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl">
              Experience a new standard of community healthcare. Dedicated professionals, modern facilities, and a patient-first approach.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group relative flex items-center justify-center bg-primary-950 text-white px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-200">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center">
                  <Calendar className="mr-2 w-5 h-5" /> Book Appointment
                </span>
              </button>
              <button className="flex items-center justify-center bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm">
                Order Prescription
              </button>
            </div>
          </motion.div>
        </div>
        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-premium group">
              <img 
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1000" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Doctor with patient"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 to-transparent"></div>
            </div>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-glass border border-white/50 z-20 hidden md:block"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-2xl">
                  <Activity className="text-green-600 w-8 h-8" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Trust Score</div>
                  <div className="text-3xl font-black text-primary-950">98%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
));

const QuickInfo = memo(() => (
  <section className="py-12 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Clock className="w-8 h-8" />, title: 'Opening Times', lines: ['Mon - Fri: 08:00 - 18:30', 'Sat: 09:00 - 12:00', 'Sun: Closed'], color: 'bg-primary-50 text-primary-600' },
          { icon: <Phone className="w-8 h-8" />, title: 'Contact Us', lines: ['Enquiries: 01234 567 890', 'Out of Hours: Call 111', 'Emergencies: Call 999'], color: 'bg-accent-50 text-accent-600' },
          { icon: <MapPin className="w-8 h-8" />, title: 'Location', lines: ['123 Healthcare Way', 'London, UK, SE1 7AB', 'Get Directions'], color: 'bg-green-50 text-green-600' },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white/60 backdrop-blur-lg p-8 rounded-[2rem] border border-white shadow-glass flex items-start group"
          >
            <div className={`${item.color} p-4 rounded-2xl mr-6 transition-transform group-hover:scale-110`}>
              {item.icon}
            </div>
            <div>
              <h3 className="text-xl font-black mb-3 text-primary-950">{item.title}</h3>
              {item.lines.map((line, i) => (
                <p key={i} className={`text-slate-600 text-sm ${line === 'Get Directions' ? 'text-primary-600 font-bold hover:underline cursor-pointer mt-2 block' : ''}`}>{line}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const NewsSection = memo(() => (
  <section id="news" className="py-24 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black text-primary-950 mb-6 tracking-tight">LATEST UPDATES</h2>
          <p className="text-xl text-slate-600">Stay informed about our latest services, health alerts, and surgery updates.</p>
        </div>
        <button className="hidden md:flex items-center text-primary-600 font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
          View All News <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {NEWS.map((news, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] overflow-hidden shadow-glass group cursor-pointer"
          >
            <div className="p-10">
              <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 bg-gradient-to-br ${news.color}`}>
                {news.category}
              </div>
              <h3 className="text-2xl font-black mb-6 text-primary-950 leading-tight group-hover:text-primary-600 transition-colors">
                {news.title}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">
                {news.excerpt}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400">{news.date}</span>
                <span className="flex items-center text-primary-600 text-xs font-black uppercase tracking-wider">
                  Read <ChevronRight className="ml-1 w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const ServicesSection = memo(() => (
  <section id="services" className="py-32 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-5xl font-black text-primary-950 mb-6">COMPREHENSIVE CARE</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We offer a wide range of medical services to ensure you receive the best possible care.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] shadow-glass border border-white/60 group transition-all"
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg shadow-primary-200 group-hover:rotate-6 transition-transform">
              <div className="text-white">
                {React.cloneElement(service.icon as React.ReactElement, { className: "w-10 h-10" })}
              </div>
            </div>
            <h3 className="text-2xl font-black mb-4 text-primary-950">{service.title}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {service.description}
            </p>
            <a href="#" className="inline-flex items-center text-primary-600 font-black uppercase tracking-widest text-xs hover:translate-x-2 transition-transform">
              Explore <ChevronRight className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const VisionSection = memo(() => (
  <section id="about" className="py-32 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-primary-950 mb-8 tracking-tight">OUR VISION & QUALITY</h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Our vision is to work in partnership with healthcare providers across the region, serving our local patients with the high-level care they deserve. 
            </p>
            <div className="space-y-10">
              {[
                { title: 'Exceptional Healthcare', desc: 'Delivering quality medical services with a focus on patient outcomes and community wellbeing.' },
                { title: 'Collaborative Partnership', desc: 'Finding new ways of working together to share resources and improve access for all.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start group">
                  <div className="bg-primary-600 p-3 rounded-2xl mr-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary-200">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-primary-950 mb-2">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="lg:w-1/2">
          <div className="grid grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-premium hover:rotate-2 transition-transform duration-500">
                <img loading="lazy" src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Healthcare Team" className="w-full h-full object-cover" />
              </div>
              <div className="bg-primary-600 rounded-[2.5rem] p-10 text-white shadow-premium">
                <Users className="w-12 h-12 mb-6 opacity-80" />
                <div className="text-4xl font-black mb-2">15,000+</div>
                <div className="text-sm font-bold opacity-80 uppercase tracking-widest">Patients</div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 mt-12"
            >
              <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-10 shadow-glass text-center">
                <Shield className="w-12 h-12 mb-6 text-primary-600 mx-auto" />
                <div className="text-xl font-black text-primary-950 mb-2">6 CORE VALUES</div>
                <div className="text-sm text-slate-500">Focusing on our community</div>
              </div>
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-premium hover:-rotate-2 transition-transform duration-500">
                <img loading="lazy" src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Doctor with patient" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

const StatsBar = memo(() => (
  <section className="bg-primary-950 py-16 text-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {[
          { label: 'Main Practice', value: '1' },
          { label: 'Network Partners', value: '3' },
          { label: 'Patients Served', value: '15k' },
          { label: 'Medical Experts', value: '25+' },
        ].map((stat, idx) => (
          <div key={idx}>
            <div className="text-5xl font-extrabold text-primary-400 mb-2">{stat.value}</div>
            <div className="text-sm uppercase tracking-widest font-bold opacity-70">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full -mr-32 -mt-32"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full -ml-32 -mb-32"></div>
  </section>
));

const TeamSection = memo(() => (
  <section id="team" className="py-32 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black text-primary-950 mb-6 tracking-tight">MEET OUR EXPERTS</h2>
          <p className="text-xl text-slate-600">Our team consists of highly qualified doctors, nurses, and support staff dedicated to your health.</p>
        </div>
        <button className="hidden md:flex items-center text-primary-600 font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
          View All Staff <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {TEAM.map((member, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] mb-8 overflow-hidden relative shadow-premium group-hover:shadow-2xl transition-all duration-500">
              <img 
                loading="lazy"
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">{member.role}</p>
                <h3 className="text-3xl font-black text-white">{member.name}</h3>
              </div>
            </div>
            <div className="px-4">
              <h3 className="text-2xl font-black mb-1 text-primary-950 group-hover:text-primary-600 transition-colors">{member.name}</h3>
              <p className="text-primary-600 font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-slate-600 leading-relaxed">{member.specialty}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const FeedbackSection = memo(() => (
  <section className="py-32 relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-white/40 backdrop-blur-xl p-16 rounded-[4rem] shadow-glass border border-white/60 relative group"
        >
          <div className="bg-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-primary-200">
            <HeartPulse className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-4xl font-black text-primary-950 mb-8 tracking-tight uppercase leading-none">Friends & <br />Family Test</h3>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            We value your feedback! Let us know about your recent experience at the surgery to help us improve our care.
          </p>
          <button className="bg-primary-950 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary-800 transition-all shadow-xl">
            Take the Survey
          </button>
        </motion.div>
        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-primary-950 p-16 rounded-[4rem] text-white relative group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="bg-primary-600/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-10 border border-primary-600/30">
            <Users className="w-10 h-10 text-primary-400" />
          </div>
          <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Patient Participation <br />Group</h3>
          <p className="text-xl text-primary-100 mb-12 leading-relaxed">
            Join our PPG to have a say in how your surgery is run. We meet quarterly to discuss service improvements and community health.
          </p>
          <button className="bg-white text-primary-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary-50 transition-all">
            Join the Group
          </button>
        </motion.div>
      </div>
    </div>
  </section>
));

const CTASection = memo(() => (
  <section className="py-32 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-[4rem] p-16 lg:p-32 text-white text-center relative overflow-hidden shadow-premium"
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-6xl lg:text-8xl font-black mb-10 tracking-tighter leading-[0.9] uppercase">Ready to join <br />our community?</h2>
          <p className="text-2xl text-white/80 mb-16 leading-relaxed max-w-2xl mx-auto">
            We are currently accepting new patients. Joining is simple, secure, and can be done entirely online.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <button className="bg-white text-primary-600 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary-50 transition-all shadow-2xl hover:scale-105 active:scale-95">
              Register Online
            </button>
            <button className="bg-transparent border-2 border-white/30 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
              Check Catchment
            </button>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-[40rem] h-[40rem] bg-primary-900/20 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  </section>
));

const Footer = memo(() => (
  <footer id="contact" className="bg-slate-900 text-slate-400 py-20 px-4 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center mb-8 text-white">
            <HeartPulse className="h-8 w-8 text-primary-500" />
            <span className="ml-3 text-2xl font-bold tracking-tight uppercase">The Avenue</span>
          </div>
          <p className="leading-relaxed mb-8">
            Dedicated to providing high quality, person-centered healthcare to our local community in London.
          </p>
          <div className="flex space-x-4">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer">
              <Activity size={20} />
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer">
              <Users size={20} />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-4">
            {['About Our Surgery', 'Latest News', 'Patient Portal', 'Test Results', 'GDPR & Privacy'].map((link) => (
              <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Services</h4>
          <ul className="space-y-4">
            {['Clinics & Services', 'Travel Health', 'Minor Surgery', 'Blood Tests', 'Pharmacy'].map((link) => (
              <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Find Us</h4>
          <div className="space-y-4">
            <p className="flex items-start"><MapPin className="mr-3 w-5 h-5 text-primary-500 flex-shrink-0" /> 123 Healthcare Way, London, SE1 7AB</p>
            <p className="flex items-center"><Phone className="mr-3 w-5 h-5 text-primary-500 flex-shrink-0" /> 01234 567 890</p>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-slate-800 text-sm text-center">
        <p>&copy; 2026 The Avenue GP Surgery. All rights reserved. Built for demonstration purposes.</p>
      </div>
    </div>
  </footer>
));

const BackgroundBlobs = memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/30 rounded-full blur-[120px] animate-blob will-change-transform"></div>
    <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-accent-100/20 rounded-full blur-[120px] animate-blob animation-delay-2000 will-change-transform"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-primary-200/20 rounded-full blur-[120px] animate-blob animation-delay-4000 will-change-transform"></div>
  </div>
));

// --- Main App Component ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary-100 selection:text-primary-900">
      <BackgroundBlobs />
      <TopBar />
      <Navigation 
        isMenuOpen={isMenuOpen} 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
      />
      <main>
        <Hero />
        <QuickInfo />
        <NewsSection />
        <ServicesSection />
        <VisionSection />
        <StatsBar />
        <TeamSection />
        <FeedbackSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
