
# smartgen-horizon
SmartGen Labs: The secure testing repository for the ultimate 100% Client-Side digital utility platform.
# 🌅 SmartGen Horizon: The Staging & Development Hub
BETA LIVE [SmartGenHorizontal](https://bayzed123.github.io/smartgen-horizon/)
[![Auto Changelog Status](https://github.com/bayzed123/smartgen-horizon/actions/workflows/auto-changelog.yml/badge.svg)](https://github.com/bayzed123/smartgen-horizon/actions/workflows/auto-changelog.yml) [![Pages Build Deployment](https://github.com/bayzed123/smartgen-horizon/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/bayzed123/smartgen-horizon/actions/workflows/pages/pages-build-deployment)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/bayzed123/smartgen-horizon)

> ⚠️ **NOTICE:** This is the experimental staging repository for SmartGen. Tools and features here are currently in development or undergoing beta testing. For the stable, live version, please visit [**smartgentools.com**](https://smartgentools.com).

**SmartGen Horizon** is the official testing ground for the premier, open-source web utility ecosystem, **SmartGen**. This isolated sandbox is where we build, test, and refine our upcoming high-performance web utilities before they are deployed to production. Like our main platform, all tools developed here strictly follow a **100% Client-Side** architecture, ensuring absolute privacy, zero server-side data storage, and lightning-fast execution.

---

## 🌐 Quick Access & Legal
| Resource | Link |
| :--- | :--- |
| **Live Platform** | [![Website](https://img.shields.io/badge/Website-smartgentools.com-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://smartgentools.com) |
| **Official Wiki** | [![Wiki](https://img.shields.io/badge/Documentation-Wiki-success?style=for-the-badge&logo=wikipedia&logoColor=white)](WIKI.md) |
| **Trust Center** | [![Trust Center](https://img.shields.io/badge/Legal-Trust_Center-informational?style=for-the-badge&logo=shield-halved&logoColor=white)](WIKI_Trust_Center.md) |
| **Founder** | [![Founder](https://img.shields.io/badge/Founder-Sayad_Bayezid-orange?style=for-the-badge&logo=person&logoColor=white)](https://www.sayadbayezid.com) |

---

## ⚙️ Horizon Development Workflow & Guidelines
*Follow these rules to maintain the integrity of the staging environment before pushing to the live project.*

### 1. The Horizon Staging Process
- **Build Here First:** All new tools, features, and major UI updates must be committed to this `smartgen-horizon` repository first.
- **Testing Phase:** Ensure the tool runs flawlessly in the local or staging URL. Check for mobile responsiveness and console errors.
- **Push to Live:** Once testing is 100% successful, the finalized code will be transferred to the main live repository. 

### 2. Tool Creation Standard
- **Directory Structure:** Each tool must reside in its own folder (e.g., `/new-tool/index.html`).
- **Client-Side Only:** No server-side processing. Use JavaScript for all logic.
- **SEO Skyscraper:** Every `index.html` must include 1200+ words of SEO content, FAQ schema, and optimized meta tags.

### 3. Global Logic Updates
- **`assets/js/app.js`**: Update this for navbar/footer changes or theme logic.
- **`assets/js/search-data.js`**: **Crucial!** Every new tool must be added to the `TOOLS_INDEX` array.
- **`assets/js/related-tools.js`**: Manages the dynamic recommendation engine.

---

## 🚀 Setup & Local Development

1.  **Clone the Horizon Repo:** `git clone https://github.com/bayzed123/smartgen-horizon.git`
2.  **Install Dependencies:** `pnpm install` (Required for blog build and linting).
3.  **Local Preview:** Open any `index.html` or use `npx serve` for the full environment.
4.  **Build Blog:** `pnpm build` (Runs `scripts/build-blog.js`).

---

## 🤝 Contribution & Support

We welcome contributors! See the [**Contribution Guide**](WIKI_About_Team_Contribution.md) for detailed workflows.

### Support the Project
*   **PayPal:** [![Support](https://img.shields.io/badge/PayPal-Donate-blue?style=flat&logo=paypal)](https://www.paypal.me/connectwithbayezid)
*   **Agency:** [![Agency](https://img.shields.io/badge/Agency-Connect_With_Bayezid-blue)](https://connectbayezid-8dcdz46v.manus.space/)

---

## 📄 License
Licensed under the MIT License. **Copyright (c) 2026 Sayad Md Bayezid Hosan**.