(function(){
    //state
    const originalInput = document.querySelector('.input-tag')
    const parent = originalInput.parentNode
    const container = newELement('div', {class: 'tag-container'})
    const newInput = newELement('input')
    //keep track of tags
    const tags = []

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
        newInput.addEventListener('keydown', checkKey)
        newInput.addEventListener('focus', ()=> {
            container.classList.add('focus')
        })
        newInput.addEventListener('blur', ()=> {
            container.classList.remove('focus')
        })

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
    //check key pressed
    function checkKey(e) {
        const key = e.keyCode || e.which
        if (key === 13 || key === 9 || key === 188) { 
            addTag(e)
        }
        if (key === 8 || key === 46) {
            if (tags.length) {
                const lastTag = tags.pop()
                removeTag(lastTag)
            }
        }

    }
    //create tag
    function addTag(e) {
        const input = e.target
        if (input.value === '') return

        const tag = newELement('span', {class: 'tag'})
        tag.textContent = input.value.trim()
        
        container.insertBefore(tag, input)

        const width = calculateInputWidth(tag)
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

        tags.push(tag)

        listenOn(tag)
        focusAgain(e)
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
        const t = tags.find(t => t.textContent === tagText)
        if (t) return true
        return false
    }
    //focus again for tab and comma keys
    function focusAgain(e) {
        e.preventDefault();
        newInput.focus()
    }

    init()
    copyAttrToNew()
   


})()