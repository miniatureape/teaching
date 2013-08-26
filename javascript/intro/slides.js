(function() {

    // Globals
    var index = 0;
    var sections = null;
    var editMode = false;

    var qsa = function(selector) {
        return document.querySelectorAll(selector);
    }

    var hide = function(section) {
        section.className = '';
    }

    var show = function() {
        each(sections, hide);
        sections[index].className = 'display';
    }

    var each = function(list, fn) {
        for (var i = 0; i < list.length; i++) {
            fn(list[i]);
        }
    };

    var next = function() {
       if (index < sections.length - 1) {
           index++;
           show();
       }
    }

    var prev = function() {
        if (index > 0) { 
            index--;
            show();
        }
    };

    var toggleEditmode = function() {
        // Its nice to be able to edit your examples text in place
        editMode = !editMode;
        if (editMode) {
            window.document.body.setAttribute('contenteditable', true);
            window.document.body.className = 'editable';
        } else {
            window.document.body.removeAttribute('contenteditable');
            window.document.body.className = '';
        }
    }

    var handleKey = function(e) {
        if (e.keyCode === 69 && e.ctrlKey === true && e.shiftKey === true) {
            toggleEditmode();
        }

        if (editMode) return false;

        if (e.keyCode === 37){
            prev();
        } else if (e.keyCode === 39){
            next();
        }
    };

    var init = function() {
        sections = qsa('section');
        sections = [].slice.call(sections);

        sections.sort(function(a, b) {
            var aOrder = a.getAttribute('data-order');
            var bOrder = b.getAttribute('data-order');
            if (aOrder !== null && bOrder !== null) {
                aOrder = parseInt(aOrder, 10);
                bOrder = parseInt(bOrder, 10);
                return aOrder > bOrder;
            }
            return -1;
        });

        show(sections, index);

        window.document.addEventListener('keyup', handleKey);
    };

    init();

})()
