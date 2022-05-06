// expanding image
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// เลือก DOM ที่มี class panel
const panels = document.querySelectorAll(".panel");
// console.log(panels); -> NodeList(5)

// Loop NodeList
panels.forEach((panel) => {
  // console.log(panel); ->  แต่ละ Element

  // Add event click
  panel.addEventListener("click", () => {
    // เมื่อคลิกจะลบ class click-active ทั้งหมดก่อน
    removeActiveClasses();

    // เมื่อคลิกที่รูปจะเพิ่ม class clike-active
    panel.classList.add("click-active");
  });
});

// Helper function ลบ click-active
function removeActiveClasses() {
  // Loop NodeList
  panels.forEach((panel) => {
    //  ลบ click-active แต่ละ Element
    panel.classList.remove("click-active");
  });
}

//testimonial
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// จับ DOM
const testimonialContainer = document.querySelector(".testimonial-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");

// Dummy Data
const testimonials = [
  {
    name: "Miyah Myles",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6",
    text: "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
  },
  {
    name: "June Cha",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!",
  },
  {
    name: "Iida Niskanen",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
  },
  {
    name: "Renee Sims",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
  },
  {
    name: "Jonathan Nunfiez",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    text: "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
  },
  {
    name: "Sasha Ho",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb",
    text: "This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!",
  },
  {
    name: "Veeti Seppanen",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text: "This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.",
  },
];

// เริ่ม index ที่ 1
let idx = 1;

function updateTestimonial() {
  // object destructuring
  const { name, photo, text } = testimonials[idx];
  // Add text and photo to DOM
  testimonial.innerHTML = text;
  userImage.src = photo;
  username.innerHTML = name;
  // increase index
  idx++;
  // .length - 1 คือการจับ index สุดท้ายของ array
  if (idx > testimonials.length - 1) {
    // ถ้า idx มากกว่า index สุดท้าย(6) ตั้ง idx = 0
    idx = 0;
  }
}

// สั่งให้รัน function ทุกๆ 5 วืนาที
setInterval(updateTestimonial, 5000);
