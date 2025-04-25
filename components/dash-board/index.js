"use strict";

var _core = require("@vue-mini/core");
var _storage = require("../../storage");
var _index = require("../../logic/index");
(0, _core.defineComponent)(() => {
  const showChart = (0, _core.computed)(() => _storage.passedTries.value.length >= 3);
  const triesMap = (0, _core.computed)(() => {
    const map = new Map();
    for (const i of _storage.passedTries.value) {
      var _map$get;
      let count = i.tries.length;
      if (count > 10) count = 10;
      map.set(count, ((_map$get = map.get(count)) != null ? _map$get : 0) + 1);
    }
    return map;
  });
  const chartData = (0, _core.computed)(() => {
    const triesMax = Math.max(...triesMap.value.keys());
    const tiresMaxCount = Math.max(...triesMap.value.values());
    return Array.from({
      length: triesMax
    }).map((_, index) => {
      const value = triesMap.value.get(index + 1);
      return {
        count: index === 9 ? '10+' : index + 1,
        value,
        width: value ? `${Math.round(value / tiresMaxCount * 100)}%` : '1%'
      };
    });
  });
  const winRate = (0, _core.computed)(() => `${Math.round(_storage.passedCount.value / _storage.gamesCount.value * 100)}%`);
  const allWords = (0, _core.computed)(() => [...new Set(Object.values(_storage.records.value).flatMap(i => i.tries).filter(Boolean))]);
  const allCount = (0, _core.computed)(() => allWords.value.length);
  const validRate = (0, _core.computed)(() => `${Math.round(allWords.value.filter(i => (0, _index.checkValidIdiom)(i, true)).length / allCount.value * 100)}%`);
  const averageCount = (0, _core.computed)(() => (_storage.historyTriesCount.value / _storage.gamesCount.value).toFixed(1));
  return {
    showChart,
    chartData,
    gamesCount: _storage.gamesCount,
    passedCount: _storage.passedCount,
    noHintPassedCount: _storage.noHintPassedCount,
    winRate,
    allCount,
    validRate,
    averageCount,
    averageDurations: _storage.averageDurations
  };
});