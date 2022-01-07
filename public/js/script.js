$(document).ready(function(){
  $(window).scroll(function(){
      // sticky navbar on scroll script
      if(this.scrollY > 20){
          $('.navbar').addClass("sticky");
      }else{
          $('.navbar').removeClass("sticky");
      }
      
      // scroll-up button show/hide script
      if(this.scrollY > 500){
          $('.scroll-up-btn').addClass("show");
      }else{
          $('.scroll-up-btn').removeClass("show");
      }
  });

  // slide-up script
  $('.scroll-up-btn').click(function(){
      $('html').animate({scrollTop: 0});
      // removing smooth scroll on slide-up button click
      $('html').css("scrollBehavior", "auto");
  });

  $('.navbar .menu li a').click(function(){
      // applying again smooth scroll on menu items click
      $('html').css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $('.menu-btn').click(function(){
      $('.navbar .menu').toggleClass("active");
      $('.menu-btn i').toggleClass("active");
  });
});


// SIGNUP POPUP
const viewBtn = document.querySelector(".view-modal"),
popup = document.querySelector(".popup"),
close = popup.querySelector(".close");
viewBtn.onclick = ()=>{
  popup.classList.toggle("show");
  popup.querySelector('.text').textContent = "Rent a Vehicle"
}
close.onclick = ()=>{
  viewBtn.click();
}


const Lease = document.querySelector(".view-modal_lease"),
popupLease = document.querySelector(".popup"),
closeLease = popup.querySelector(".close");
Lease.onclick = ()=>{
  popupLease.classList.toggle("show");
  popupLease.querySelector('.text').textContent = "Lease a Vehicle"
}
closeLease.onclick = ()=>{
  Lease.click();
}


//SIGNUP BACKEND LINKING
const RentForm = document.querySelector('.signupBtn');
    const emailRent = document.querySelector('.email')
    const passwordRent = document.querySelector('.password')
    const CpasswordRent = document.querySelector('.Cpassword')

    RentForm.addEventListener('click', async (e)=>{
        e.preventDefault();

        //reset errors
        // email.textContent =  ' ';
        // password.textContent = ' '
        // Cpassword.textContent = ' '

        const email = emailRent.value;
        const password = passwordRent.value;
        const Cpassword = CpasswordRent.value

        //get the values
        if(password == Cpassword){
         console.log(email, password)
          
         try{
            const res = await fetch('/signup',{
              method: 'POST',
              body: JSON.stringify({email, password}),
              headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json()

            // if(data.errors){
            //   emailError.textContent = data.errors.email;
            //   passwordError.textContent = data.errors.password
            // }
            if(data.user){
              // location.assign('/')
              console.log("Signup is working", data)
            }
          }catch (err){
          console.log(err)
          }
        }else{
          console.log("Signup not working")
        }
    })
