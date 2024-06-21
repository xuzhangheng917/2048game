const buttons =
    document.querySelectorAll(".GameDifficulty button")

const oldButton = document.querySelector('.GameDifficulty .OldMode button')

let LastButton = buttons[0]

buttons.forEach(
    (item) =>{
        item.addEventListener('click',(event) => {
            if (item.innerText === '老年模式') return
            LastButton.classList.remove('ButtonClick')
            event.target.classList.add('ButtonClick')
            LastButton = event.target
        })
    }
)

oldButton.addEventListener('click',(ev) => ev.target.classList.toggle('ButtonClick'))