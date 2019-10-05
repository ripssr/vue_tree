'use strict';

let data = {
  name: 'ToDo stuff',
  children: [
    { name: 'Some Tang' },
    { name: 'Another thing' },
    {
      name: 'Composite stuff',
      children: [
        {
          name: 'List one of composite stuff',
          children: [
            { name: 'Little thing'},
            { name: 'Bigger thing' }
          ]
        },
        { name: 'Some important thing' },
        { name: 'And another important tang' },
        {
          name: 'Maybe stuff',
          children: [
            { name: 'Good to be cool' },
            { name: 'And awesome' }
          ]
        }
      ]
    }
  ]
};


Vue.component('item-component', {
  props: {
    model: Object
  },

  data() {
    return {
      open: false
    }
  },

  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    }
  },

  methods: {
    toggle() {
      if (this.isFolder) this.open = !this.open;
    },

    changeType() {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild();
        this.open = true
      }
    },
    addChild: function() {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  },

  template: `
    <li>
      <div
        :class="{ bold: isFolder }"
        @click="toggle"
        @dblclick="changeType">
        {{ model.name}}
        <span v-if="isFolder">
          [{{ open ? '-' : '+' }}]
        </span>
      </div>
      <ul v-show="open" v-if="isFolder">
        <item-component
          class="item"
          v-for="(model, index) in model.children"
          :key="index"
          :model="model" />
        <li class="add" @click="addChild">+</li>
      </ul>
    </li>`
});


const demo = new Vue({
  el: '#app',
  data: {
    treeData: data
  },
  template: `
    <ul>
      <item-component class="item" :model="treeData" />
    </ul>
  `
})