/**
 * 自由猫 (FreeCat Cloud) 官方交互脚本
 * Domain: freecatcloud.homes
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
      const isExpanded = mainNav.classList.contains('show');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('show')) {
          mainNav.classList.remove('show');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        if (!isActive) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });

  // Pricing Cycle Switcher
  const switcherBtns = document.querySelectorAll('.switcher-btn');
  const pricingData = {
    monthly: {
      fufeng: { price: '20.00', period: '/月付', note: '基础体验，按月结算' },
      yulang: { price: '50.00', period: '/月付', note: '日常出海，流畅畅享' },
      poxiao: { price: '100.00', period: '/月付', note: '高性价比，旗舰首选' },
      lingxiao: { price: '180.00', period: '/月付', note: '海量带宽，极速专线' }
    },
    quarterly: {
      fufeng: { price: '57.00', period: '/季付', note: '折合 ¥19.00/月 (9.5折)' },
      yulang: { price: '142.50', period: '/季付', note: '折合 ¥47.50/月 (9.5折)' },
      poxiao: { price: '285.00', period: '/季付', note: '折合 ¥95.00/月 (9.5折)' },
      lingxiao: { price: '513.00', period: '/季付', note: '折合 ¥171.00/月 (9.5折)' }
    },
    semiannual: {
      fufeng: { price: '108.00', period: '/半年付', note: '折合 ¥18.00/月 (9折)' },
      yulang: { price: '270.00', period: '/半年付', note: '折合 ¥45.00/月 (9折)' },
      poxiao: { price: '540.00', period: '/半年付', note: '折合 ¥90.00/月 (9折)' },
      lingxiao: { price: '972.00', period: '/半年付', note: '折合 ¥162.00/月 (9折)' }
    },
    annual: {
      fufeng: { price: '204.00', period: '/年付', note: '折合 ¥17.00/月 (8.5折)' },
      yulang: { price: '510.00', period: '/年付', note: '折合 ¥42.50/月 (8.5折)' },
      poxiao: { price: '1020.00', period: '/年付', note: '折合 ¥85.00/月 (8.5折)' },
      lingxiao: { price: '1836.00', period: '/年付', note: '折合 ¥153.00/月 (8.5折)' }
    },
    biennial: {
      fufeng: { price: '384.00', period: '/两年付', note: '折合 ¥16.00/月 (8折特惠)' },
      yulang: { price: '960.00', period: '/两年付', note: '折合 ¥40.00/月 (8折特惠)' },
      poxiao: { price: '1920.00', period: '/两年付', note: '折合 ¥80.00/月 (8折特惠)' },
      lingxiao: { price: '3456.00', period: '/两年付', note: '折合 ¥144.00/月 (8折特惠)' }
    },
    triennial: {
      fufeng: { price: '540.00', period: '/三年付', note: '折合 ¥15.00/月 (7.5折底价)' },
      yulang: { price: '1350.00', period: '/三年付', note: '折合 ¥37.50/月 (7.5折底价)' },
      poxiao: { price: '2700.00', period: '/三年付', note: '折合 ¥75.00/月 (7.5折底价)' },
      lingxiao: { price: '4860.00', period: '/三年付', note: '折合 ¥135.00/月 (7.5折底价)' }
    }
  };

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switcherBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cycle = btn.getAttribute('data-cycle');
      const data = pricingData[cycle];
      if (data) {
        for (const [key, val] of Object.entries(data)) {
          const card = document.querySelector(`.pricing-card[data-plan="${key}"]`);
          if (card) {
            const priceEl = card.querySelector('.price-amount');
            const periodEl = card.querySelector('.price-period');
            const noteEl = card.querySelector('.plan-tagline');
            if (priceEl) priceEl.textContent = val.price;
            if (periodEl) periodEl.textContent = val.period;
            if (noteEl) noteEl.textContent = val.note;
          }
        }
      }
    });
  });

  // Table of Contents Active Link Highlight for Articles
  const articleHeadings = document.querySelectorAll('.article-body h2, .article-body h3');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (articleHeadings.length > 0 && tocLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let currentId = '';
      articleHeadings.forEach(heading => {
        const top = heading.getBoundingClientRect().top;
        if (top <= 120) {
          currentId = heading.getAttribute('id');
        }
      });

      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (currentId && link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    });
  }
});
