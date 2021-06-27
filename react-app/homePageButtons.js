window.addEventListener('DOMContentLoaded',(event)=>{


    const timer = setTimeout(()=> {
        let leftButtons = document.getElementsByClassName("left-button");
        let leftButtonsArr = Array.from(leftButtons)
        let cardScroll = document.querySelector(".card-scroll");


        function scrollAnimation(isLeft){
            let x = 1;
            if(isLeft){
                x = -1
            }
            let count = 0;
            let movementSpeed;
            const scroll = setInterval(()=>{
                if (count<40){
                    movementSpeed = 4;
                }
                else if( count <60){
                    movementSpeed =6;
                }
                else if( count < 150){
                    movementSpeed = 3;
                }
                else{

                    movementSpeed = 1;
                }
                cardScroll.scrollLeft +=  x * movementSpeed;
                count +=1;
                if (count === 200){
                    let shakeCount = 0
                    const shake = setInterval(() => {
                        cardScroll.scrollLeft += ( x *-1);
                        shakeCount +=1;
                        const shakeDist = 5;
                        if (shakeCount === shakeDist){
                            let shakeBackCount = 0
                            const shakeBack = setInterval(() => {
                                cardScroll.scrollLeft +=  x ;
                                shakeBackCount+=1;
                                if(shakeBackCount ==  shakeDist){
                                    clearInterval(shakeBack)
                                }
                            }, 4);
                            clearInterval(shake)
                        }
                    }, 4);
                    clearInterval(scroll)
                }
            }, 4);



        }
        leftButtonsArr.forEach(el=>{
            el.addEventListener("click",(e)=>{
                // cardScroll.scrollLeft -=70;

                scrollAnimation(true);
            })
        })

        let rightButtons = document.querySelectorAll(".right-button");
        let rightButtonsArr = Array.from(rightButtons)
        rightButtonsArr.forEach(el=>{
            el.addEventListener("click",(e)=>{
                scrollAnimation(false);
            })
        })


    }, 500)
})
