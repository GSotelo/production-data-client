"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * 
 * @param {*} arr Axios response
 * @returns Array holding data formatted based on "nivo" requirements
 */
var filterDataFromAPI = function filterDataFromAPI(arr) {
  var results = [];
  arr.map(function (_ref) {
    var timestamp = _ref.timestamp,
        value = _ref.value;
    return results.push({
      x: timestamp,
      y: value
    });
  });
  return results;
};

var get = function get(axios, endpoint) {
  var response;
  return regeneratorRuntime.async(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.get(endpoint));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", filterDataFromAPI(response.data));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var filterMultipleDataFromAPI = function filterMultipleDataFromAPI(res) {
  var _res = _slicedToArray(res, 2),
      file1 = _res[0],
      file2 = _res[1];

  return [filterDataFromAPI(file1), filterDataFromAPI(file2)];
};

var getMultipleResources = function getMultipleResources(axios, endpoint) {
  var response;
  return regeneratorRuntime.async(function getMultipleResources$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios.get(endpoint));

        case 2:
          response = _context2.sent;
          return _context2.abrupt("return", filterMultipleDataFromAPI(response.data));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var postAPI = function postAPI(serverAPI, endpoint, _ref2) {
  var timeRange, filename, body, response;
  return regeneratorRuntime.async(function postAPI$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          timeRange = _ref2.timeRange, filename = _ref2.filename;
          body = {
            endDate: new Date(timeRange[1]._d).toISOString(),
            startDate: new Date(timeRange[0]._d).toISOString(),
            filename: filename
          };
          _context3.next = 4;
          return regeneratorRuntime.awrap(serverAPI.post(endpoint, body));

        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", filterDataFromAPI(response.data));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var connectAPI = {
  get: get,
  getMultipleResources: getMultipleResources,
  post: postAPI
};
var _default = connectAPI;
exports["default"] = _default;