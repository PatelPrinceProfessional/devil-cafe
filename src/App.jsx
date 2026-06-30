import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const allGalleryImages = [
  "Screenshot 2026-06-30 163541.png",
  "Screenshot 2026-06-30 163553.png",
  "Screenshot 2026-06-30 163559.png",
  "Screenshot 2026-06-30 163628.png",
  "Screenshot 2026-06-30 163724.png",
  "Screenshot 2026-06-30 163737.png",
  "Screenshot 2026-06-30 163758.png",
  "Screenshot 2026-06-30 163819.png",
  "Screenshot 2026-06-30 163829.png",
  "Screenshot 2026-06-30 163856.png",
  "Screenshot 2026-06-30 163905.png",
  "Screenshot 2026-06-30 163911.png",
  "Screenshot 2026-06-30 163921.png",
  "Screenshot 2026-06-30 164002.png",
  "Screenshot 2026-06-30 164009.png",
  "Screenshot 2026-06-30 164016.png",
  "Screenshot 2026-06-30 164113.png",
  "Screenshot 2026-06-30 164221.png"
];

function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isGalleryView, setIsGalleryView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (isGalleryView) {
      window.scrollTo(0, 0);
    }
  }, [isGalleryView]);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isGalleryView) {
    return (
      <motion.div 
        className="full-gallery-page"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{ minHeight: '100vh', padding: '60px 24px', background: 'var(--cream)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.button 
            className="btn btn-ghost"
            style={{ marginBottom: '50px', border: '1.5px solid var(--terracotta)', color: 'var(--terracotta)' }}
            onClick={() => {
              setIsGalleryView(false);
              setTimeout(() => {
                const el = document.getElementById('gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            whileHover={{ scale: 1.05, backgroundColor: 'var(--terracotta)', color: 'var(--cream)' }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Home
          </motion.button>
          
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--walnut)', marginBottom: '10px' }}>
            Inside the Den
          </h1>
          <p style={{ color: 'var(--walnut-soft)', fontSize: '1.1rem', marginBottom: '60px' }}>
            A complete look at our cozy corners, handcrafted meals, and warm nights.
          </p>

          <div className="gallery-grid" style={{ gridAutoRows: '280px' }}>
            {allGalleryImages.map((img, i) => (
              <motion.div 
                key={img} 
                className={`g-item ${i % 4 === 0 || i % 7 === 0 ? 'g-item-extra' : ''}`} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img src={`/assets/${img}`} alt={`Gallery item ${i+1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Grain overlay */}
      <div className="grain"></div>

      {/* NAV */}
      <header className={`nav ${navScrolled ? 'scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <motion.a 
            href="#top" 
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/assets/logo.jpg" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            <span className="nav-logo-text">Devil's&nbsp;Den</span>
          </motion.a>
          <nav className="nav-links">
            {['Story', 'Menu', 'Gallery', 'Reviews', 'Visit'].map((link) => (
              <motion.a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                whileHover={{ y: -2, color: 'var(--primary)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {link}
              </motion.a>
            ))}
          </nav>
          <motion.a 
            href="#visit" 
            className="nav-cta"
            whileHover={{ scale: 1.05, backgroundColor: 'var(--primary)' }}
            whileTap={{ scale: 0.95 }}
          >
            Find Us
          </motion.a>
          <button 
            className={`nav-burger ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu} 
            aria-label="Open menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobileMenu">
        {['Story', 'Menu', 'Gallery', 'Reviews', 'Visit'].map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={toggleMenu}>
            {link}
          </a>
        ))}
      </div>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-bg"></div>
        <div className="hero-steam">
          <span></span><span></span><span></span>
        </div>
        <motion.div 
          className="hero-inner"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={fadeInLeft}>
            <span className="hero-title-line">Welcome to your</span>
            <span className="hero-title-line hero-title-script">corner of warmth.</span>
          </motion.h1>
          <motion.div className="hero-actions" variants={fadeInLeft}>
            <motion.a href="#menu" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              View the Menu
            </motion.a>
            <motion.a href="#visit" className="btn btn-ghost" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Get Directions
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.a 
          href="#story" 
          className="hero-scroll" 
          aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span>Scroll</span>
          <div className="hero-scroll-line"></div>
        </motion.a>
      </section>

      {/* MARQUEE STRIP */}
      <div className="marquee">
        <motion.div 
          className="marquee-track"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <span>Devil's Cheese Burger</span><span className="dot">●</span>
          <span>Slow-Brewed Coffee</span><span className="dot">●</span>
          <span>Live Music Nights</span><span className="dot">●</span>
          <span>Green Apple Mojito</span><span className="dot">●</span>
          <span>Eco-Friendly Cafe</span><span className="dot">●</span>
          <span>Open Till 2AM</span><span className="dot">●</span>
          <span>Devil's Cheese Burger</span><span className="dot">●</span>
          <span>Slow-Brewed Coffee</span><span className="dot">●</span>
          <span>Live Music Nights</span><span className="dot">●</span>
          <span>Green Apple Mojito</span><span className="dot">●</span>
          <span>Eco-Friendly Cafe</span><span className="dot">●</span>
          <span>Open Till 2AM</span><span className="dot">●</span>
        </motion.div>
      </div>

      {/* STORY */}
      <section className="story" id="story">
        <div className="story-inner">
          <motion.div 
            className="story-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.p className="eyebrow" variants={fadeInUp}>The Story</motion.p>
            <motion.h2 className="story-title" variants={fadeInUp}>A little bit of mischief, <br />a lot of warmth.</motion.h2>
            <motion.p className="story-para" variants={fadeInUp}>
              Devil's Den didn't set out to be the loudest cafe in Motera — just the one
              you'd actually want to come back to. Behind the playful name is a genuinely
              calm room: low light, good seating, and people who remember how you take
              your coffee.
            </motion.p>
            <motion.p className="story-para" variants={fadeInUp}>
              We grind, brew and grill with the same care every time — because the
              regulars who walk in after a cricket match at the stadium deserve the same
              burger as the couple in for a quiet Sunday evening. Eco-conscious where it
              counts, generous where it matters.
            </motion.p>
            <motion.div className="story-tags" variants={fadeInUp}>
              {['Cozy Seating', 'Eco-Friendly', 'Live Music', 'Hygiene First'].map((tag) => (
                <motion.span key={tag} className="tag" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="story-visual"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <motion.div className="story-frame story-frame-1" whileHover={{ scale: 1.05, rotate: -2 }} transition={{ type: 'spring' }}>
              <img src="/assets/Screenshot 2026-06-30 163541.png" alt="Devil's Den Cafe interior" />
            </motion.div>
            <motion.div className="story-frame story-frame-2" whileHover={{ scale: 1.05, rotate: 2 }} transition={{ type: 'spring' }}>
              <img src="/assets/Screenshot 2026-06-30 163553.png" alt="Devil's Den Cafe food" />
            </motion.div>
            <div className="story-badge">
              <svg viewBox="0 0 100 100" className="story-badge-ring">
                <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none"/>
                <text fontSize="9.3" letterSpacing="2.5">
                  <textPath href="#circlePath">EST. IN MOTERA • DEVIL'S DEN CAFE • </textPath>
                </text>
              </svg>
              <span className="story-badge-center">★</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu" id="menu">
        <div className="menu-inner">
          <motion.p className="eyebrow eyebrow-light" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>From the Kitchen</motion.p>
          <motion.h2 className="menu-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }}>The Order Slip</motion.h2>
          <motion.p className="menu-sub" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>A few of the things people keep coming back for.</motion.p>

          <motion.div 
            className="menu-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {/* Tickets */}
            {[
              { num: '01', cat: 'Signature Burgers', items: [
                { name: "Devil's Cheese Burger", price: "₹189" },
                { name: "Smoky BBQ Burger", price: "₹169" },
                { name: "Peri Peri Crunch Burger", price: "₹179" },
                { name: "Classic Veg Supreme", price: "₹149" }
              ], note: '"Juicy, flavorful, and well-made." — Google Review' },
              { num: '02', cat: 'Coffee & Brews', items: [
                { name: "Devil's Signature Brew", price: "₹129" },
                { name: "Hazelnut Cold Coffee", price: "₹149" },
                { name: "Classic Cappuccino", price: "₹119" },
                { name: "Caramel Mocha", price: "₹139" }
              ], note: '"Rich and perfectly balanced." — Google Review' },
              { num: '03', cat: 'Pasta & Mains', items: [
                { name: "Peri Peri Paneer Pasta", price: "₹199" },
                { name: "Alfredo White Sauce Pasta", price: "₹219" },
                { name: "Paneer Chilli Dry", price: "₹179" },
                { name: "Loaded Peri Peri Fries", price: "₹129" }
              ], note: '"Cooked to perfection." — Google Review' },
              { num: '04', cat: 'Mocktails & Coolers', items: [
                { name: "Green Apple Mojito", price: "₹149" },
                { name: "Blue Lagoon Cooler", price: "₹159" },
                { name: "Virgin Pina Colada", price: "₹159" },
                { name: "Watermelon Crush", price: "₹139" }
              ], note: '"A must try." — Google Review' }
            ].map((ticket, i) => (
              <motion.div key={i} className="ticket" variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: 'spring' }}>
                <div className="ticket-head">
                  <span className="ticket-num">{ticket.num}</span>
                  <span className="ticket-cat">{ticket.cat}</span>
                </div>
                <ul className="ticket-list">
                  {ticket.items.map((item, j) => (
                    <li key={j}><span className="item-name">{item.name}</span><span className="item-dots"></span><span className="item-price">{item.price}</span></li>
                  ))}
                </ul>
                <p className="ticket-note">{ticket.note}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="menu-footnote">Prices indicative · Full menu available in-cafe · Price for two ≈ ₹350</p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <motion.div 
          className="gallery-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring' }}
        >
          <p className="eyebrow">Inside the Den</p>
          <h2 className="gallery-title">A room worth lingering in</h2>
        </motion.div>
        
        <div className="gallery-grid">
          {allGalleryImages.slice(0, 5).map((img, i) => (
            <motion.div 
              key={img} 
              className={`g-item g-item-${i+1}`} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 }}
            >
              <img src={`/assets/${img}`} alt={`Gallery item ${i+1}`} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          style={{ textAlign: 'center', marginTop: '40px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn btn-ghost"
            onClick={() => setIsGalleryView(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Images
          </motion.button>
        </motion.div>
      </section>

      {/* REVIEWS */}
      <section className="reviews" id="reviews">
        <div className="reviews-inner">
          <motion.p className="eyebrow eyebrow-light" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>Word on the Street</motion.p>
          <motion.h2 className="reviews-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }}>251 reviews. One pattern.</motion.h2>

          <motion.div 
            className="reviews-rating"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
          >
            <span className="reviews-rating-num">4.8</span>
            <div className="reviews-stars">★★★★★</div>
            <span className="reviews-rating-sub">based on 251 Google reviews</span>
          </motion.div>

          <div className="reviews-track-wrap">
            <motion.div 
              className="reviews-track"
              animate={{ x: [0, -1500] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[
                { text: `"Really amazing experience. The staff, the ambiance, the food — everything was top-notch."`, author: "Google Reviewer" },
                { text: `"The bun was soft, the patty was juicy, and the cheese blended perfectly with the sauces."`, author: "Google Reviewer" },
                { text: `"Excellent vibes, perfect for a snack, main meal or just a simple coffee."`, author: "Google Reviewer" },
                { text: `"A calm, eco-friendly cafe that's ideal for unhurried time with family or friends."`, author: "Google Reviewer" },
                { text: `"Cozy vibe, comfortable seating, and the interior gives off a warm and welcoming feeling."`, author: "Google Reviewer" },
              ].map((r, i) => (
                <motion.div key={i} className="review-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring' }}>
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">{r.text}</p>
                  <p className="review-author">— {r.author}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section className="visit" id="visit">
        <div className="visit-inner">
          <motion.div 
            className="visit-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p className="eyebrow" variants={fadeInUp}>Come Find Us</motion.p>
            <motion.h2 className="visit-title" variants={fadeInUp}>Motera's warmest table is waiting.</motion.h2>

            {[
              { icon: '📍', label: 'Address', val: 'Shop 8A, 12A, 14A, Sangath Central,\nBehind 4D Mall, Motera, Ahmedabad — 380005' },
              { icon: '🕐', label: 'Hours', val: 'Mon–Sat: 9:00 AM – 2:00 AM\nSunday: 3:00 PM – 2:00 AM' },
              { icon: '📞', label: 'Call / WhatsApp', val: '+91 72288 61002' }
            ].map((info, i) => (
              <motion.div key={i} className="visit-detail" variants={fadeInUp}>
                <span className="visit-icon">{info.icon}</span>
                <div>
                  <p className="visit-label">{info.label}</p>
                  <p className="visit-value" style={{ whiteSpace: 'pre-wrap' }}>{info.val}</p>
                </div>
              </motion.div>
            ))}

            <motion.div className="visit-actions" variants={fadeInUp}>
              <motion.a href="https://maps.app.goo.gl/dQcj35XN64Nj7ciz5" target="_blank" rel="noopener" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Get Directions</motion.a>
              <motion.a href="tel:+917228861002" className="btn btn-ghost" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Call Now</motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="visit-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            <div className="visit-map-frame">
              <iframe
                src="https://www.google.com/maps?q=23.1023063,72.5962444&z=16&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Devil's Den Cafe location map">
              </iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <motion.div className="footer-brand" whileHover={{ scale: 1.05 }}>
            <img src="/assets/logo.jpg" alt="Logo" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }} />
            <span className="nav-logo-text">Devil's&nbsp;Den</span>
          </motion.div>
          <p className="footer-tag">Best Burgers & Coffee in Motera, Ahmedabad</p>
          <div className="footer-links">
            {['Story', 'Menu', 'Gallery', 'Reviews', 'Visit'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
            ))}
          </div>
          <p className="footer-copy">© 2026 Devil's Den Cafe, Motera. Crafted with care. · Demo concept site</p>
        </div>
      </footer>
    </>
  );
}

export default App;
