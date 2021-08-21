(function(t) {
    t.add('plugin', 'linkclass', {

        translations: {
            en: {
                linkStyle: 'Link Style',
            },
        },

        init: function(app) {
            this.app = app;
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.selection = app.selection;
            this.opts = app.opts;
            this.selectedClass = '';
        },


        /**
         * listen for when the link module changes or inserts new links
         */
        onlink: {

            // on 'changed' passes a regular browser DOM object
            changed: function(e) {
                if( this.opts.linkClasses ) {
                    e[0].className = this.selectedClass
                }
            },

            // but on 'inserted' passes a Redactor DOM object
            // https://imperavi.com/redactor/docs/api-services/dom/#s-dom
            inserted: function(e) {
                if( this.opts.linkClasses ) {
                    var element = e.first()
                    this.selectedClass.split(" ").forEach( function(className) {
                        element.addClass(className);
                    });
                }
            }
        },

        
        /**
         * listen for when the link modal opens
         */
        onmodal: {
            link: {
                open: function (modal, form) {
                    if( this.opts.linkClasses ) {
                        this.$modal = modal;
                        this.$form = form;
                        this._setup();
                        this._startingClass()
                    }
                }
            }
        },


        /**
         * setup the class name <select> in the link module modal
         */
        _setup: function () {            
            if (0 === (e = this.$modal.find("#redactor-link-styles")).length) {
                
                var fi  = t.dom('<div class="form-item" />');
                var lb  = t.dom('<label for="redactor-links-styles">' + this.lang.get('linkStyle') + '</label>');
                
                var se  = t.dom('<select id="redactor-links-styles" name="class"></select></div>');
                var opt = t.dom("<option value=''></option>");
                se.append(opt);

                this.opts.linkClasses.forEach(function(element) {
                    opt = t.dom(`<option value='${element.class}'>${element.label}</option>`);
                    se.append(opt);
                });
               
                se.on("change", this._select.bind(this));
                
                fi.append(lb).append(se);

                // try to place the field before the new tab target checkbox
                var $target = this.$form.find('div.form-item-target')
                if( $target ) {
                    $target.before(fi)
                } else {
                    this.$modal.getBody().children().first().append(fi);
                }
            }
        },


        /**
         * set the class that the <select> should load with when the modal opens
         */
        _startingClass: function() {
            this.selectedClass = '';
            
            var currentLink = this._getCurrent();
            if( currentLink && currentLink.className ) {
                this.$form.find('select[name=class]').val(currentLink.className);
                this.selectedClass = currentLink.className
            }
        },

        
        /**
         * save the value anytime the class name <select> changes
         */
        _select: function(i) {
            var data = this.$form.getData();
            this.selectedClass = data.class ?? '';
        },


        /**
         * find the first currently selected link in the editor (if one exists).
         * useful for setting thje class name <select> when editing existing links.
         */
        _getCurrent: function () {
            return this.selection.getInlinesAllSelected({ tags: ["a"] })[0];
        },

    });
})(Redactor);