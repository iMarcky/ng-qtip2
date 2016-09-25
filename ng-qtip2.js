// Generated by CoffeeScript 1.11.0
(function() {
  var NgQtip2;

  NgQtip2 = function($timeout, $compile, $http, $templateCache) {
    return {
      restrict: 'A',
      scope: {
        qtipVisible: '=?',
        qtipDisable: '=?',
        qtipFixed: '=?',
        qtipDelay: '=?',
        qtipAdjustX: '@',
        qtipAdjustY: '@',
        qtipModalStyle: '=?',
        qtipTipStyle: '=?',
        qtipShowEffect: '=?',
        qtipHideEffect: '=?',
        qtipPersistent: '=?',
        qtip: '@',
        qtipTitle: '@',
        qtipTarget: '@',
        qtipContent: '@',
        qtipSelector: '@',
        qtipTemplate: '@',
        qtipEvent: '@',
        qtipEventOut: '@',
        qtipHide: '=?',
        qtipShow: '=?',
        qtipClass: '@',
        qtipMy: '@',
        qtipAt: '@',
        qtipDefaults: '=?',
        qtipOptions: '=?',
        object: '=qtipTemplateObject'
      },
      link: function(scope, el, attrs) {
        var content, generateQtip, ref, str2bool;
        str2bool = function(str) {
          var ref;
          return (ref = String(str).toLowerCase()) !== 'false' && ref !== '0' && ref !== 'null' && ref !== '';
        };
        scope.getQtipId = function() {
          return el.data('hasqtip');
        };
        scope.getQtipElement = function(id) {
          if (id == null) {
            id = scope.getQtipId();
          }
          return $("#qtip-" + id);
        };
        scope.closeQtip = function(e, id, arg) {
          var qtEl, ref, ref1, rendered;
          if (id == null) {
            id = scope.getQtipId();
          }
          rendered = (ref = (arg != null ? arg : {}).rendered) != null ? ref : true;
          if (e != null) {
            if (typeof e.preventDefault === "function") {
              e.preventDefault();
            }
          }
          qtEl = $("#qtip-" + id);
          qtEl.qtip('hide');
          qtEl.qtip().rendered = (ref1 = scope.qtipPersistent) != null ? ref1 : rendered;
        };
        generateQtip = function(content) {
          var base, options, ref;
          base = {
            position: {
              my: 'bottom center',
              at: 'top center',
              adjust: {
                x: 0,
                y: 0
              }
            },
            show: {
              effect: true,
              event: 'mouseover'
            },
            hide: {
              effect: true,
              fixed: true,
              delay: 100,
              event: 'mouseout'
            },
            style: {
              classes: 'qtip',
              modal: {},
              tip: {}
            }
          };
          options = angular.merge({}, base, scope.qtipDefaults || {});
          if (scope.qtipMy != null) {
            options.position.my = scope.qtipMy;
          }
          if (scope.qtipAt != null) {
            options.position.at = scope.qtipAt;
          }
          if (scope.qtipTarget != null) {
            options.position.target = $(scope.qtipTarget);
          }
          if (scope.qtipAdjustX != null) {
            options.position.adjust.x = parseInt(scope.qtipAdjustX);
          }
          if (scope.qtipAdjustY != null) {
            options.position.adjust.y = parseInt(scope.qtipAdjustY);
          }
          if (scope.qtipShowEffect != null) {
            options.show.effect = scope.qtipShowEffect;
          }
          if (scope.qtipEvent != null) {
            options.show.event = scope.qtipEvent;
          }
          if (scope.qtipShow != null) {
            options.show = scope.qtipShow;
          }
          if (scope.qtipHideEffect != null) {
            options.hide.effect = scope.qtipHideEffect;
          }
          if (scope.qtipFixed != null) {
            options.hide.fixed = str2bool(scope.qtipFixed);
          }
          if (scope.qtipEventOut != null) {
            options.hide.event = scope.qtipEventOut;
          }
          if (scope.qtipHide != null) {
            options.hide = scope.qtipHide;
          }
          if (scope.qtipClass != null) {
            options.style.classes = scope.qtipClass;
          }
          if (scope.qtipModalStyle != null) {
            options.style.modal = scope.qtipModalStyle;
          }
          if (scope.qtipTipStyle != null) {
            options.style.tip = scope.qtipTipStyle;
          }
          if (scope.qtipOptions != null) {
            options = angular.extend({}, options, scope.qtipOptions);
          }
          options.content = content != null ? content : {
            text: (ref = scope.qtipContent) != null ? ref : scope.qtip
          };
          ($(el)).qtip(options);
          if (attrs.qtipVisible != null) {
            scope.$watch('qtipVisible', function(newVal) {
              return ($(el)).qtip('toggle', newVal);
            });
          }
          if (attrs.qtipDisable != null) {
            scope.$watch('qtipDisable', function(newVal) {
              return ($(el)).qtip('disable', newVal);
            });
          }
          if (scope.qtipTitle != null) {
            scope.$watch('qtipTitle', function(newVal) {
              return ($(el)).qtip('option', 'content.title', newVal);
            });
          }
          return scope.$watch('qtip', function(newVal, oldVal) {
            if (newVal !== oldVal) {
              return ($(el)).qtip('option', 'content.text', newVal);
            }
          });
        };
        if (attrs.qtipSelector) {
          $timeout(function() {
            return generateQtip(($(scope.qtipSelector)).html());
          });
        } else if (scope.qtipTemplate != null) {
          $http.get(scope.qtipTemplate, {
            cache: $templateCache
          }).then(function(html) {
            return generateQtip({
              text: function() {
                return $timeout(function() {
                  return scope.$apply(function() {
                    var text;
                    text = $compile(html.data)(scope);
                    return text;
                  });
                });
              }
            });
          });
        } else if (scope.qtipTitle != null) {
          generateQtip({
            title: scope.qtipTitle,
            text: scope.qtip
          });
        } else {
          content = (ref = scope.qtip) != null ? ref : scope.qtipContent;
          generateQtip({
            text: function() {
              return $timeout(function() {
                return scope.$apply(function() {
                  return $compile("<div>" + content + "</div>")(scope);
                });
              });
            }
          });
        }
      }
    };
  };

  NgQtip2.$inject = ['$timeout', '$compile', '$http', '$templateCache'];

  angular.module('ngQtip2', []).directive('qtip', NgQtip2);

}).call(this);
