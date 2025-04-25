"use strict";

var _core = require("@vue-mini/core");
var _state = require("../../state");
var _index = require("../../logic/index");
(0, _core.defineComponent)({
  properties: {
    word: String,
    revealed: Boolean,
    answer: String,
    animate: {
      type: Boolean,
      value: true
    },
    active: Boolean
  },
  setup(props) {
    const flip = (0, _core.ref)(false);
    const result = (0, _core.computed)(() => {
      if (props.revealed) {
        return (0, _state.testAnswer)((0, _state.parseWord)(props.word), props.answer ? (0, _state.parseWord)(props.answer) : _state.parsedAnswer.value);
      }
      return [];
    });
    const parsed = (0, _core.computed)(() => (0, _state.parseWord)(props.word.padEnd(_index.WORD_LENGTH, ' '), props.answer || _state.answer.value.word));
    // console.log(parsed.value);

    (0, _core.onReady)(() => {
      if (props.revealed) {
        setTimeout(() => {
          flip.value = true;
        }, 150);
      }
    });
    return {
      flip,
      result,
      parsed
    };
  }
});