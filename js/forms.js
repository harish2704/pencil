
var forms = {};

forms.classForm = {};
forms.classForm.schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 2, title: "Class name" },
    description: { type: "string" },
    module: { type: "string" },
    extends: { type: "string" },
    implements: { type: "string" },
    konstructor:{
      type: 'object',
      title: 'Constructor',
      properties:{
        description: { type: 'string' },
        params:{
          type: 'array',
          items:{
            type: 'object',
            properties:{
              type: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
            }
          }
        }
      }
    },
    methods:{
      type: 'array',
      items:{
        type: 'object',
        properties:{
          name: { type: 'string' },
          description: { type: 'string' },
          returnType: {
            type: 'string',
          },
          returnDescription: { type: 'string' },
          params:{
            type: 'array',
            items:{
              type: 'object',
              properties:{
                type: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
              }
            }
          }
        }
      }
    }
  }
};

forms.classForm.form = [
  {
    type: 'section',
    htmlClass: 'row',
    items: [
      {
        key: 'id',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4',
      },
      {
        key: 'description',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-8',
      },
    ]
  },
  {
    type: 'section',
    htmlClass: 'row',
    items: [
      {
        key: 'module',
        type: 'uiselect',
        ref:{
          type: 'module',
          val: '{{ id }}',
          label: '<b>{{ id }}</b>'
        },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4',
      },
      {
        key: 'extends',
        type: 'uiselect',
        ref:{
          type: 'class',
          val: '{{ id }}',
          label: '<b>{{ id }}</b>'
        },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4',
      },
      {
        key: 'implements',
        type: 'uiselect',
        ref:{
          type: 'interface',
          val: '{{ id }}',
          label: '<b>{{ id }}</b>'
        },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4',
      },
    ]
  },
  {
    key: 'konstructor',
    fieldHtmlClass:'row',
    htmlClass: 'col-xs-12',
    items: [
      {
        key: 'konstructor.description',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-8',
      },
      {
        key: 'konstructor.params',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-12',
        add: "Add Param",
        style: {
          add: "btn-success"
        },
        type: 'array',
        tabType: "top",
        items:[
          {
            key: 'konstructor.params[].name',
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-3'
          },
          {
            key: 'konstructor.params[].type',
            type: 'typeahead',
            ref:{ type: 'datatype' },
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-2'
          },
          {
            key: 'konstructor.params[].description',
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-6',
            type: 'textarea',
          },
        ]
      }
    ]
  },
  // 'methods',
  {
    key: 'methods',
    add: "Add Method",
    style: {
      add: "btn-primary"
    },
    type: 'array',
    fieldHtmlClass:'row',
    htmlClass: 'col-xs-12',
    tabType: "top",
    items:[
      {
        key: 'methods[].name',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-3',
      },
      {
        key: 'methods[].description',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4',
      },
      {
        key: 'methods[].returnType',
        type: 'typeahead',
        ref:{ type: 'datatype' },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-2'
      },
      {
        key: 'methods[].returnDescription',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-3'
      },
      {
        key: 'methods[].params',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-12',
        add: "Add Param",
        style: {
          add: "btn-success"
        },
        type: 'array',
        tabType: "top",
        items:[
          {
            key: 'methods[].params[].name',
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-3'
          },
          {
            key: 'methods[].params[].type',
            type: 'typeahead',
            ref:{ type: 'datatype' },
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-2'
          },
          {
            key: 'methods[].params[].description',
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-6',
            type: 'textarea',
          },
        ]
      }]
  },
  {
    type: "submit",
    title: "Save"
  }
];


forms.moduleForm = {};
forms.moduleForm.schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 2, title: "Module name" },
    description: { type: "string" },
  }
};
forms.moduleForm.form = [
  {
    type: 'section',
    htmlClass: 'row',
    items: [
      {
        key: 'id',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-3',
      },
      {
        key: 'description',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-6',
      },
    ]
  },
  {
    type: "submit",
    title: "Save"
  }
];

forms.interfaceForm = {};
forms.interfaceForm.schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 2, title: "Class name" },
    description: { type: "string" },
    module: { type: "string" },
    methods:{
      type: 'array',
      items:{
        type: 'object',
        properties:{
          name: { type: 'string' },
          description: { type: 'string' },
          returnType: {
            type: 'string',
          },
          returnDescription: { type: 'string' },
          params:{
            type: 'array',
            items:{
              type: 'object',
              properties:{
                type: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
              }
            }
          }
        }
      }
    }
  }
};

forms.interfaceForm.form = [
  {
    type: 'section',
    htmlClass: 'row',
    items: [
      {
        key: 'id',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-3',
      },
      {
        key: 'module',
        type: 'uiselect',
        ref:{
          type: 'module',
          val: '{{ id }}',
          label: '<b>{{ id }}</b>'
        },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-3',
      },
      {
        key: 'description',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-6',
      },
    ]
  },
  // 'methods',
  {
    key: 'methods',
    add: "Add Method",
    style: {
      add: "btn-primary"
    },
    type: 'array',
    fieldHtmlClass:'row',
    htmlClass: 'col-xs-12',
    tabType: "top",
    items:[
      {
        key: 'methods[].name',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-3',
      },
      {
        key: 'methods[].description',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4',
      },
      {
        key: 'methods[].returnType',
        type: 'typeahead',
        ref:{ type: 'datatype' },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-2'
      },
      {
        key: 'methods[].returnDescription',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-3'
      },
      {
        key: 'methods[].params',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-12',
        add: "Add Param",
        style: {
          add: "btn-success"
        },
        type: 'array',
        tabType: "top",
        items:[
          {
            key: 'methods[].params[].name',
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-3'
          },
          {
            key: 'methods[].params[].type',
            type: 'typeahead',
            ref:{ type: 'datatype' },
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-2'
          },
          {
            key: 'methods[].params[].description',
            fieldHtmlClass:'row',
            htmlClass: 'col-xs-6',
            type: 'textarea',
          },
        ]
      }]
  },
  {
    type: "submit",
    title: "Save"
  }
];


forms.functionForm = {};
forms.functionForm.schema = {
  type: 'object',
  properties:{
    id: { type: 'string' },
    description: { type: 'string' },
    module:{ type: 'string' },
    returnType: { type: 'string' },
    returnDescription: { type: 'string' },
    params:{
      type: 'array',
      items:{
        type: 'object',
        properties:{
          type: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
        }
      }
    }
  }
};

forms.functionForm.form = [
  {
    type: 'section',
    htmlClass: 'row',
    items:[
      {
        key: 'id',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4',
      },
      {
        key: 'description',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-8',
      },
    ]
  },
  {
    type: 'section',
    htmlClass: 'row',
    items:[
      {
        key: 'module',
        type: 'uiselect',
        ref:{
          type: 'module',
          val: '{{ id }}',
          label: '<b>{{ id }}</b>'
        },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4',
      },
      {
        key: 'returnType',
        type: 'typeahead',
        ref:{ type: 'datatype' },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4'
      },
      {
        key: 'returnDescription',
        type: 'textarea',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-4'
      },
    ]
  },
  {
    key: 'params',
    fieldHtmlClass:'row',
    htmlClass: 'col-xs-12',
    add: "Add Param",
    style: {
      add: "btn-success"
    },
    type: 'array',
    tabType: "top",
    items:[
      {
        key: 'params[].name',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-3'
      },
      {
        key: 'params[].type',
        type: 'typeahead',
        ref:{ type: 'datatype' },
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-2'
      },
      {
        key: 'params[].description',
        fieldHtmlClass:'row',
        htmlClass: 'col-xs-6',
        type: 'textarea',
      },
    ]
  },
  {
    type: "submit",
    title: "Save"
  }
];

module.exports = forms;
