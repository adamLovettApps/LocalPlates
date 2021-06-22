window.addEventListener('DOMContentLoaded',(event)=>{


    const timer = setTimeout(()=> {
        let leftButtons = document.getElementsByClassName("left-button");
        let leftButtonsArr = Array.from(leftButtons)
        console.log(leftButtons.length)
        let cardScroll = document.querySelector(".card-scroll");


        function scrollLeftAnimation(){
            let count = 30;
            const speedyScroll = setInterval(()=>{
                cardScroll.scrollLeft -=1
                count -=1;
                if (count == 0){
                    clearInterval(speedyScroll)
                }
            }, 10)
        }
        console.log("hiiiiiiiiiiiiiiiiii")
        leftButtonsArr.forEach(el=>{
            el.addEventListener("click",(e)=>{
                console.log("scroll left")
                // cardScroll.scrollLeft -=70;
                scrollLeftAnimation();
            })
        })

        let rightButtons = document.querySelectorAll(".right-button");
        let rightButtonsArr = Array.from(rightButtons)
        rightButtonsArr.forEach(el=>{
            el.addEventListener("click",(e)=>{
                console.log("scroll left")
                cardScroll.scrollLeft +=70;
            })
        })


    }, 200)
})
