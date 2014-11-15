angular.module('droppelion').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/droppelion.html',
    "<div class=\"droppelion\" ng-class=\"{ 'drop-active': focused, 'selected': selected }\">\n" +
    "  <div class=\"search-field\">\n" +
    "    <input type=\"text\" autocomplete=\"off\" id=\"{{controlId}}\" class=\"form-control\" ng-model=\"itemName\" placeholder=\"{{prompt}}\" ng-focus=\"focused = true\" ng-change=\"changedSearch()\" ng-disabled=\"selected\"/>\n" +
    "    <a href=\"#\" class=\"loading\" ng-show=\"loading\"></a>\n" +
    "    <a href=\"#\" class=\"clear-selection\" ng-show=\"selected\" ng-click=\"clearSelection()\">\n" +
    "      ✖\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"droppelion-drop\" ng-show=\"dropDownVisible\">\n" +
    "    <div class=\"droppelion-list\">\n" +
    "      <ul class=\"droppelion-results\">\n" +
    "        <li class=\"item\" ng-repeat=\"item in filteredItems track by $index\" ng-click=\"handleSelection(item)\" ng-class=\"{'highlighted':isCurrent($index)}\" ng-mouseenter=\"setCurrent($index)\" >\n" +
    "          <div class=\"title\">{{item[title]}}</div>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <div class=\"item new-item\" ng-class=\"{'highlighted':isCurrent(-1)}\" ng-mouseenter=\"setCurrent(-1)\" ng-click=\"newItemClicked(itemName)\">\n" +
    "        <i class=\"fa fa-plus\"></i> Add new item: <b>{{itemName}}</b>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );

}]);
