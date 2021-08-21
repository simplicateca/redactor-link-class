# redactor-link-styles

This redactor plugin modifies the link modal to include a configurable drop down of class names that you can use to style links differently.

![redactor link plugin screenshot](https://simplicate.nyc3.digitaloceanspaces.com/simplicate/assets/site/images/redactor-link-styles.png)

This is an early draft of the plugin and any bug reports would be appreciated.

## Installation

If you're using Craft CMS, copy the file `src/linkclass.js` from this repository into your `cms/config/redactor/plugins` directory.


## Configuration

You can configure the available link styles within your redactor JSON config file:

*Sample Redactor-Config.json*

```
  ...
  "plugins": ["linkclass"],
  "linkClasses" : [
    { "label": "Button (regular)", "class": "button" },
    { "label": "Button (large)",   "class": "button button--large" },
    { "label": "Button (small)",   "class": "button button--small" }
  ]
  ...
```

## Styling links inside Redactor

If you want your links class names to appear differently within the redactor editor, you'll need to inject some css into your admin panel.

*Sample control-panel.css*

```
    .input .redactor-styles a.button {
        display : inline-block;
        padding: 0.25em 0.5em;
        border: 2px solid #3397ff;
    }

    .input .redactor-styles a.button:hover {
        background: #3397ff;
        text-decoration: none;
        color: #fff;
    }
```

If you're using Craft CMS you could either use a plugin to inject this code into your admin panel, or you can create a module and load your own CSS file.

Here are some resources that might be of assistance:

 - https://plugins.craftcms.com/cp-css
 - https://craftquest.io/livestreams/building-a-craft-module
 - https://craftcms.com/docs/3.x/extend/module-guide.html
 - https://pluginfactory.io/

If you're using Redactor in some other tool, you'll have to do your own digging to figure out how to add CSS in your editor.