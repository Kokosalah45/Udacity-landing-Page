let navButtonsLive = document.getElementsByClassName('navbar__button');
let sectionsLive = document.getElementsByClassName('main__section');
let main = document.querySelector('.main');
let navbar = document.querySelector('.navbar');
let windowHeight = window.innerHeight/3;
let addButton = document.querySelector('.add');
let popup = document.querySelector('.popup');
let overlay = document.querySelector('.overlay');
let body = document.getElementsByTagName('body')[0];
let sectionsText = document.getElementsByClassName('main__section__text');
let titleField = document.querySelector('.popup__title-input');
let textareaField = document.querySelector('.popup__text-area');

let addActiveState = (currentIndex) =>{
    
    let navButtonsStatic = Array.from(navButtonsLive);
    navButtonsStatic.forEach(e=>{
        e.classList.remove('active');
    })
     navButtonsStatic[currentIndex].classList.add('active');
    
    

};
let removePopUp = () =>{
    titleField.value = "";
    textareaField.value = "";
    popup.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('overflow-hidden');
    Array.from(sectionsText).forEach(e=>{
        e.classList.remove('overflow-hidden');
    })

}
let addNavButton = titleFieldVal =>{
    let el = document.createElement('a');
    el.classList.add("navbar__button");
    el.setAttribute("href" , `#section${sectionsLive.length}`);
    el.textContent = titleFieldVal;
   
    navbar.appendChild(el);

   
}
let addSection  = (titleFieldVal,textAreaFieldVal) =>{
    let el = document.createElement('div');
    el.id = `section${sectionsLive.length}`;
    el.classList.add('main__section');
    el.innerHTML =  `
  
        <h3 class = "main__section__title">${titleFieldVal}</h3>
         <p class="main__section__text">
         ${textAreaFieldVal}
         </p> 
        
    `;

    main.appendChild(el);
   

}




window.addEventListener('scroll' , el => {
let sectionsStatic = Array.from(sectionsLive);
sectionsStatic.forEach(e=>
    {
        
        let currentTop = e.getBoundingClientRect().top;
       
        if(currentTop <= windowHeight && currentTop>= 0  ){
            addActiveState(sectionsStatic.indexOf(e));
        }
    })

    });

    navbar.addEventListener('click' , e=>{
        e.stopPropagation();
        if (e.target.classList.contains("navbar__button")){
            addActiveState(navButtonsLive.indexOf(e.target));   
        }
       
    },true);

    addButton.addEventListener('click' , e => {
        titleField.placeholder = `
  default : Section ${sectionsLive.length} / only 10ch 
        `;
        popup.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('overflow-hidden');
        Array.from(sectionsText).forEach(e=>{
            e.classList.add('overflow-hidden');
        })


    })
    popup.addEventListener('click' ,e=>{
        let titleFieldVal ;
         if(e.target.classList.contains('close-button')){
        removePopUp();
        }else if(e.target.classList.contains('submit')){
            if(textareaField.value === ""){
                textareaField.placeholder = "This Field is Required !";

            }else{
                let flag = false;
               
                if(titleField.value === ""){
                    titleFieldVal = `Section ${sectionsLive.length}`;
                    flag =true;
                    
                 }else{
                    if(titleField.value.length <= 10){
                        flag = true;
                        titleFieldVal = titleField.value;
                    }
               
                }
               if(flag){
    		    addNavButton(titleFieldVal);
                    addSection(titleFieldVal,textareaField.value);
                    removePopUp();
                    
               }else{
			    titleField.value = "";
                   
               }
               

            }
            
        }
       
    });
   