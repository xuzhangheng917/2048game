const buttons = document.querySelectorAll(".GameDifficulty button")
buttons.forEach(
    (item) =>{
        item.addEventListener("blur", () => {
            console.log("失去了焦点")
            item.classList.add("blur")
            setTimeout(() => {
                item.classList.remove("blur")
            },500)
        })
    }
)