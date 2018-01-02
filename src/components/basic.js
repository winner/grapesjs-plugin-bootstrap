export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textType = domc.getType('text');
  const textModel = textType.model;
  const textView = textType.view;
  const imgType = domc.getType('image');
  const imgModel = imgType.model;
  const imgView = imgType.view;

  domc.addType("header", {
    model: textModel.extend(
      {
        defaults: Object.assign({}, textModel.prototype.defaults, {
          "custom-name": "Header",
          tagName: "h1",
          traits: [
            {
              type: "select",
              options: [
                { value: "h1", name: "One (largest)" },
                { value: "h2", name: "Two" },
                { value: "h3", name: "Three" },
                { value: "h4", name: "Four" },
                { value: "h5", name: "Five" },
                { value: "h6", name: "Six (smallest)" }
              ],
              label: "Size",
              name: "tagName",
              changeProp: 1
            }
          ]
        })
      },
      {
        isComponent(el) {
          if (
            el &&
            el.tagName &&
            ["H1", "H2", "H3", "H4", "H5", "H6"].includes(el.tagName)
          ) {
            return { type: "header" };
          }
        }
      }
    ),
    view: textView
  })

  domc.addType('image', {
    model: imgModel.extend({
      defaults: Object.assign({}, imgModel.prototype.defaults, {
        'custom-name': 'Image',
        droppable: true,
        traits: imgModel.prototype.defaults.traits.concat([
          {
            type: 'select-class',
            label: 'Responsive',
            options: [
              { value: '', name: 'no' },
              { value: 'img-responsive', name: 'yes' }
            ]
          }
        ])
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && el.tagName == 'IMG') {
          return { type: 'image' }
        }
      }
    }),
    view: imgView
  })

  domc.addType('list', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'List',
        droppable: true,
        traits: [
          {
            type: 'select',
            label: 'Type',
            name: 'tagName',
            options: [
              { value: 'ul', name: 'unordered' },
              { value: 'ol', name: 'ordered' }
            ],
            changeProp: 1
          },
          {
            type: 'select-class',
            label: 'Style',
            options: [
              { value: '', name: 'none' },
              { value: 'list-unstyled', name: 'unstyled' },
              { value: 'list-inline', name: 'inline' },
            ]
          }
        ]
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && (el.tagName == 'UL' || el.tagName == 'OL')) {
          return { type: 'list' }
        }
      }
    }),
    view: defaultView
  })

  domc.addType('list-item', {
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        'custom-name': 'Item',
        tagName: 'li',
        draggable: 'ul, ol',
        droppable: true,
        editable: true
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && el.tagName == 'LI') {
          return { type: 'list-item' }
        }
      }
    }),
    view: textView
  })

  domc.addType('paragraph', {
    model: textModel.extend({
      defaults: Object.assign({}, textModel.prototype.defaults, {
        'custom-name': 'Paragraph',
        tagName: 'p',
        droppable: true,
        editable: true,
        traits: [
          {
            type: 'select-class',
            label: 'Alignment',
            options: [
              { value: 'text-left', name: 'left' },
              { value: 'text-center', name: 'center' },
              { value: 'text-right', name: 'right' },
              { value: 'text-justify', name: 'justify' },
              { value: 'text-nowrap', name: 'no wrap' }
            ]
          },
          {
            type: 'select-class',
            label: 'Transformation',
            options: [
              { value: '', name: 'none' },
              { value: 'text-lowercase', name: 'lowercase' },
              { value: 'text-uppercase', name: 'uppercase' },
              { value: 'text-capitalize', name: 'capitalize' }
            ]
          }
        ]
      })
    }, {
      isComponent(el) {
        if (el && el.tagName && el.tagName == 'P') {
          return { type: 'paragraph' }
        }
      }
    }),
    view: textView
  })
}