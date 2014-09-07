angular.module('droppelion').run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/droppelion.html",
    "<div class=\"droppelion\" ng-class=\"{ 'drop-active': focused, 'selected': selected }\">\n" +
    "  <div class=\"search-field\">\n" +
    "    <input type=\"text\" autocomplete=\"off\" id=\"{{controlId}}\" class=\"form-control\" ng-model=\"itemName\" placeholder=\"{{prompt}}\" ng-keyup=\"keyPressed($event)\" ng-focus=\"focused = true\" ng-blur=\"blur()\" ng-change=\"changedSearch()\" ng-disabled=\"selected\"/>\n" +
    "    <a href=\"#\" class=\"loading\" ng-show=\"loading\"></a>\n" +
    "    <a href=\"#\" class=\"clear-selection\" ng-show=\"selected\" ng-click=\"clearSelection()\">\n" +
    "      ✖\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"droppelion-drop\" ng-show=\"dropDownVisible\">\n" +
    "    <ul class=\"droppelion-results\">\n" +
    "      <li class=\"item\" ng-repeat=\"item in filteredItems track by $index\" ng-click=\"handleSelection(item)\" ng-class=\"{'highlighted':isCurrent($index)}\" ng-mouseenter=\"setCurrent($index)\" >\n" +
    "        <div class=\"title\">{{item[title]}}</div>\n" +
    "      </li>\n" +
    "\n" +
    "      <li class=\"item no-elements\" ng-show=\"filteredItems.length == 0\">\n" +
    "        Nothing found\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>");
}]);
