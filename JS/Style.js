const buttons = document.querySelectorAll(".GameDifficulty button")

let LastButton = buttons[0]

buttons.forEach(
    (item) =>{
        item.addEventListener("click",(event) => {
            LastButton.classList.remove('ButtonClick')
            event.target.classList.add('ButtonClick')
            LastButton = event.target
        })
    }
)