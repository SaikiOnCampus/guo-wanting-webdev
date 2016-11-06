(function () {
    angular
        .module('jgaDirectives', [])
        .directive("jgasortable", jgaSortable);

    function jgaSortable() {

        var start = -1;
        var end = -1;

        function linker(scope, element, attributes) {
            element.sortable({
                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    scope.jgaSortableController.sort(start, end);
                }
            });
        }

        return {
            scope:{
                pageid: '@'
            },
            link: linker,
            controller: jgaSortableController,
            bindToController: true,
            controllerAs: 'jgaSortableController'
        }
        
        function jgaSortableController(WidgetService) {
            var vm = this;
            vm.sort = sort;
            function sort(start, end) {
                WidgetService.sortWidgets(vm.pageid, start, end);
            }
        }


    }

})();