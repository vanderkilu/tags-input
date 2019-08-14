(function(){
    //state
    const originalInput = document.querySelector('.input-tag')
    const parent = originalInput.parentNode
    const container = newELement('div', {class: 'tag-container'})
    const newInput = newELement('input')
    //keep track of last tag used to calculate remaining width
    let lastTag
    const tagsText = []

    //default settings
    const options = {
        borderColor: '#bdbdbd',
        tagBgColor: '#eeeeee',
        tagColor: 'black',
        allowDuplicate: false
    }

    function newELement(name, attrs) {
        const el = document.createElement(name)
        if (attrs) {
            for (attr in attrs) {
                el.setAttribute(attr, attrs[attr])
            }
        }
        return el
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
        let t = w - (lastTag.offsetWidth + lastTag.offsetLeft) - 5
        t = Math.max(t, w / 3)
        return t
    }

    //hook things up
    function init() {
        newInput.addEventListener('keypress', addTag)

        setStyles(container, {
            border: `1px solid ${options.borderColor}`,
        })
        setStyles(originalInput, {
            display: 'none'
        })

        //attach custom elements to DOM
        parent.insertBefore(container, originalInput)
        container.appendChild(newInput)

    }

    //copy neccessary attributes on old input to new input
    function copyAttrToNew() {
        const attributesToConsider = 'placeholder, autofocus, minLength, maxLength, required'.split(',')
        const originalInputAttrs = originalInput.attributes
        attributesToConsider.forEach((attr)=> {
            if (originalInputAttrs[attr]) {
                newInput[attr] = originalInput[attr]
            }
        })
    }

    function addTag(e) {
        const input = e.target
        if (input.value === '') return

        if (e.keyCode === 13) {

            const tag = newELement('span', {class: 'tag'})
            tag.textContent = input.value.trim()
          
            //keep track of last tag, will help in calculating 
            //remaining space that input can occupy
            lastTag = tag

            container.insertBefore(tag, input)

            const width = calculateInputWidth(lastTag)
            setStyles(input, {
                width: width + 'px',
                'margin-left': '2px'
            })
            setStyles(tag, {
                'position': 'relative'
            })
            input.value = ''

            //check late for duplicate
            if (!options.allowDuplicate && isDuplicate(tag.textContent)) {
                setStyles(tag, {
                    'background-color': '#ffcdd2'
                })
                setTimeout(()=> {
                    removeTag(tag)
                }, 500)
            }

            tagsText.push(tag.textContent)
            listenOn(tag)
        }
    }
    //add listener to tag
    function listenOn(tag) {
        tag.addEventListener('click', removeTag)
    }
    //remove tag 
    function removeTag(e) {
        //checks to see if it is an event or element itself
        const tag = e.target ? e.target : e
        const parent = tag.parentNode
        parent.removeChild(tag)
    }
    //check for duplicate
    function isDuplicate(tagText) {
       return tagsText.includes(tagText)
    }
    

    init()
    copyAttrToNew()
   


})()