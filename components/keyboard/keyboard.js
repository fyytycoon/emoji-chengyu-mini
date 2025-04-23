// components/keyboard/keyboard.js
Component({
  properties: {
    keys: {
      type: Array,
      value: []
    }
  },
  
  data: {
    
  },
  
  methods: {
    onKeyPress(e) {
      const key = e.currentTarget.dataset.key;
      this.triggerEvent('keypress', { key });
    }
  }
}); 