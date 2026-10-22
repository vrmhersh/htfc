// ===== EDIT ME: general website details =====
const S = "https://historyforthecurious.com/storage/";
export const site = {
  name: "History for the Curious",
  logo: "https://historyforthecurious.com/images/logo.png",
  tagline: "Turning Curiosity into Knowledge",
  email: "historyforthecurious@gmail.com",
  adminEmail: "giana.elav@gmail.com",
  phone: "+44 7973 178 236",
  whatsapp: "https://chat.whatsapp.com/FEgoaCOQoyU2VX49SwA8Aw",
  linkedin: "https://www.linkedin.com/in/rabbi-aubrey-hersh",
  // Leave empty to open the visitor's email app. Paste a free Web3Forms key (web3forms.com) to receive form messages directly.
  web3formsKey: "",
  // Home page slideshow: add or remove lines
  slides: [
    { img: S + "homepage/header-slider/header_slider_IfXpXGsXHR.webp", text: "Step In To The Past" },
    { img: S + "homepage/header-slider/header_slider_ChJDSWsQDy.webp", text: "Walk Through Time" },
    { img: S + "homepage/header-slider/header_slider_9IwR6zQYBn.webp", text: "Bring History To Life" },
  ],
  images: {
    tours: S + "header-images/tours_header_image_PjzUFb6NlK.webp",
    writings: S + "header-images/writing_header_image_uOkSS1TooF.webp",
    upcoming: S + "homepage/upcoming-events/upcoming_image_FoQTCQoASc.webp",
    pastStrip: ["XCiI0KYtpp", "K3PR0PRR8K", "fBPqfhmJ3e", "5sq2XPCSPC"].map((k) => S + `homepage/tour-slider/tour_slider_${k}.webp`),
  },
  stats: [["30", "years educating, lecturing and writing"], ["250+", "heritage tours led across Europe"], ["18,000", "weekly podcast listeners"]],
  pastCountries: "Austria, Czechia, France, Germany, Greece, Hungary, Italy, Lithuania, Holland, Poland, Portugal, Russia, Slovakia, Spain and Ukraine",
  toursIntro: [
    "Iconic destinations and exclusive landmarks. Our VIP visits combine luxury and scenic beauty with treasures from our Jewish past.",
    "Since 2021, most of our trips have been accompanied and greatly enhanced by the international lecturer and author Rabbi Dr Akiva Tatz.",
  ],
  about: [
    "Rabbi Aubrey Hersh has devoted the last 30 years to educating, lecturing, touring, and writing. Home is London, England, where Rabbi Hersh is a Senior Lecturer at the JLE. This is combined with a strong international following, through his travel, shiurim and media.",
    "As well as lecturing internationally, he is an annual Scholar-in-Residence for Pesach hotels across Europe, and on board Kosherica’s summer river cruises. Since 2005, he has led more than 250 heritage tours across Europe.",
    "Four years ago, his podcast History for the Curious was launched, exploring the last 2,500 years and events. It has attracted over 18,000 weekly listeners and ranks among the fastest-growing podcasts on Jewish history.",
    "A product of two renowned yeshivas, he also developed strong connections with Rav Moshe Shapira zt’l and Rabbi Zev Leff shlit’a. His topics span halacha, history, and Jewish thought, and are rooted in a passion for engaging, accessible learning.",
    "Beginning in 2003 Rabbi Hersh specialised in Holocaust education, working with Sir Martin Gilbert, the Imperial War Museum and Father Patrick Desbois. He was also the editor of the very popular 60 Days-for-60 Years & 70-days-for 70 years series on the Holocaust which ran to 100,000 copies.",
    "His talks are designed to educate, inspire curiosity and foster a nuanced understanding of Yiddishkeit and Jewish heritage.",
  ],
  // Photos on the About page: add lines like { img: "/img/un.jpg", caption: "Israeli Ambassador at the UN" }
  aboutPhotos: [],
};
