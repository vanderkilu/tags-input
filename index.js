(function(){
    //state
    const originalInput = document.querySelector('.input-tag')
    const parent = originalInput.parentNode
    const container = newELement('div', {class: 'tag-container'})
    const newInput = newELement('input')
    let lastTag

    //default settings
    const options = {
        borderColor: '#bdbdbd',
        tagBgColor: '#eeeeee',
        tagColor: 'black'
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
        setStyles(newInput, {
            border: 'none',
            width: '100%',
            outline: 'none'
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
            tag.textContent = input.value
          
            //keep track of last tag, will help in calculating 
            //remaining space that input can occupy
            lastTag = tag

            container.insertBefore(tag, input)

            const width = calculateInputWidth(lastTag)
            setStyles(input, {
                width: width + 'px'
            })
            setStyles(tag, {
                'background-color': options.tagBgColor,
            })
            input.value = ''
            
        }
    }

    init()
    copyAttrToNew()
   


})()