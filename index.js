(function(){
    //state
    const originalInput = document.querySelector('.input-tag')
    const parent = originalInput.parentNode
    const container = newELement('div')
    const newInput = newELement('input')
    let lastTag

    //default settings
    const options = {
        borderColor: 'black',
        tagBgColor: 'grey',
        tagColor: 'black'
    }

    function newELement(name) {
        return document.createElement(name)
    }

    //set styles on an element
    function setStyles(element, cssObj) {
        for (prop in cssObj) {
            element.style[prop] = cssObj[prop]
        }
    }

    //calculate the space left for the input 

    function calculateInputWidth(lastTag) {
        const w = container.offsetWidth
        let t = w - (lastTag.offsetWidth + lastTag.offsetLeft)-5
        t = Math.max(t, w / 3)
        return t
    }

    //hook things up
    function init() {
        newInput.addEventListener('keypress', addTag)
        setStyles(container, {
            position: 'relative',
            width: '200px',
            border: `1px solid ${options.borderColor}`,
        })
        setStyles(newInput, {
            border: 'none',
            width: '100%'
        })
        setStyles(originalInput, {
            display: 'none'
        })

        //attach custom elements to DOM
        parent.insertBefore(container, originalInput)
        container.appendChild(newInput)

    }

    function addTag(e) {
        const input = e.target
        if (input.value === '') return

        const tag = newELement('span')
        tag.textContent = input.value
        tag.className = 'tag'
        //keep track of last tag, will help in calculating 
        //remaining space that input can occupy
        lastTag = tag

        container.insertBefore(tag, input)

        const width = calculateInputWidth(lastTag)
        setStyles(tag, {
            padding: '5px',
            display: 'inline-block',
            width: width + 'px'
        })
    }

    init()
   


})()