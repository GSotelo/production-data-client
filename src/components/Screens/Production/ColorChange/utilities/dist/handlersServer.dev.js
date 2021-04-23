"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connectAPI = _interopRequireDefault(require("../../../../../api/connectAPI"));

var _processDataDeck = _interopRequireDefault(require("../../../../../utils/processDataDeck"));

var _axios = require("../../../../../api/axios");

var _props = require("./props");

var _evergreenUi = require("evergreen-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns String containing the API endpoint
 */
var getEndpoint = function getEndpoint(currentValueDropdown, id, timeRange) {
  var endpoint;

  switch (id) {
    case "CCAC":
      endpoint = "/aborted/".concat(timeRange);
      break;

    case "CCD":
      endpoint = "/duration/multi-".concat(timeRange);
      break;

    case "CCQL":
      endpoint = "/quickest-longest/multi-".concat(timeRange);
      break;

    default:
      break;
  }

  return endpoint;
};
/**
 * This function works in conjuction with HTTP POST requests
 * @param {*} id Helps to determine the filename for executing API requests
 * @returns String containing the filename
 */


var getFilename = function getFilename(currentValueDropdown, id) {
  var filename;

  switch (id) {
    case "CCAC":
      filename = "color_change_aborted.csv";
      break;

    case "CCD":
      filename = "color_change_duration.csv";
      break;

    case "CCQL":
      filename = ["color_change_longest.csv", "color_change_quickest.csv"];
      break;

    default:
      break;
  }

  return filename;
};
/**
 * 
 * @param {*} id Helps to determine either the endpoint or filename for API requests
 * @param {*} timeRange String or array of two "moment" objects
 * @returns Data to feed line chart according to "nivo" library
 */


var connectServer = function connectServer(currentValueDropdown, id, timeRange) {
  var timeRangeIsArray, timeRangeIsString, isPreviousTimeRequired, endpoint, filteredData, filename, _filteredData;

  return regeneratorRuntime.async(function connectServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          /**
           * Check is request comes from a control button or date picker
           */
          timeRangeIsArray = timeRange instanceof Array;
          timeRangeIsString = typeof timeRange === "string"; // Check if I should target more than one file as resource

          isPreviousTimeRequired = id === "CCQL";
          /**
           * If control button, then trigger HTTP GET requests
           */

          if (!timeRangeIsString) {
            _context.next = 24;
            break;
          }

          endpoint = getEndpoint(currentValueDropdown, id, timeRange);
          filteredData = false;
          _context.prev = 6;
          _context.t0 = !isPreviousTimeRequired;

          if (!_context.t0) {
            _context.next = 12;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(_connectAPI["default"].get(_axios.axiosColorChange, endpoint));

        case 11:
          filteredData = _context.sent;

        case 12:
          _context.t1 = isPreviousTimeRequired;

          if (!_context.t1) {
            _context.next = 17;
            break;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap(_connectAPI["default"].getMultipleResources(_axios.axiosColorChange, endpoint));

        case 16:
          filteredData = _context.sent;

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t2 = _context["catch"](6);

          _evergreenUi.toaster.danger.apply(_evergreenUi.toaster, _toConsumableArray(_props.propsToasterDanger));

          console.error("[connectServer]: Request to server API failed (GET)");

        case 23:
          return _context.abrupt("return", filteredData);

        case 24:
          if (!timeRangeIsArray) {
            _context.next = 38;
            break;
          }

          filename = getFilename(currentValueDropdown, id);
          _filteredData = false;
          _context.prev = 27;
          _context.next = 30;
          return regeneratorRuntime.awrap(_connectAPI["default"].post(_axios.axiosColorChange, "/", {
            filename: filename,
            timeRange: timeRange
          }));

        case 30:
          _filteredData = _context.sent;
          _context.next = 37;
          break;

        case 33:
          _context.prev = 33;
          _context.t3 = _context["catch"](27);

          _evergreenUi.toaster.danger.apply(_evergreenUi.toaster, _toConsumableArray(_props.propsToasterDanger));

          console.error("[connectServer]: Request to server API failed (POST)");

        case 37:
          return _context.abrupt("return", _filteredData);

        case 38:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 19], [27, 33]]);
};
/**
 * Data from server is either for "trend" or "deck" elements
 * If data is for a "deck" element, then further processing is needed
 * If data is for a "trend" element, then it goes straight forward
 */


var processDataFromServer = function processDataFromServer(currentValueDropdown, id, timeRange) {
  var data, dataFromServer;
  return regeneratorRuntime.async(function processDataFromServer$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(connectServer(currentValueDropdown, id, timeRange));

        case 2:
          dataFromServer = _context2.sent;
          _context2.t0 = id;
          _context2.next = _context2.t0 === "CCD" ? 6 : _context2.t0 === "CCQL" ? 8 : 10;
          break;

        case 6:
          data = dataFromServer;
          return _context2.abrupt("break", 11);

        case 8:
          data = dataFromServer;
          return _context2.abrupt("break", 11);

        case 10:
          return _context2.abrupt("break", 11);

        case 11:
          return _context2.abrupt("return", data);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var _default = processDataFromServer;
exports["default"] = _default;