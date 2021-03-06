// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Directive for the test interaction panel in the state editor.
 */

require('domain/utilities/UrlInterpolationService.ts');
require('pages/exploration-editor-page/services/exploration-states.service.ts');
require(
  'pages/exploration-player-page/services/current-interaction.service.ts');

require('pages/exploration-editor-page/exploration-editor-page.constants.ts');

var oppia = require('AppInit.ts').module;

oppia.directive('testInteractionPanel', [
  'UrlInterpolationService', function(UrlInterpolationService) {
    return {
      restrict: 'E',
      scope: {
        getStateName: '&stateName',
        getInputTemplate: '&inputTemplate',
      },
      templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
        '/pages/exploration-editor-page/editor-tab/test-interaction-panel/' +
        'test-interaction-panel.directive.html'),
      controller: [
        '$scope', 'ExplorationStatesService',
        'INTERACTION_SPECS', 'INTERACTION_DISPLAY_MODE_INLINE',
        'CurrentInteractionService',
        function($scope, ExplorationStatesService,
            INTERACTION_SPECS, INTERACTION_DISPLAY_MODE_INLINE,
            CurrentInteractionService) {
          var _stateName = $scope.getStateName();
          var _state = ExplorationStatesService.getState(_stateName);
          $scope.interactionIsInline = (
            INTERACTION_SPECS[_state.interaction.id].display_mode ===
            INTERACTION_DISPLAY_MODE_INLINE);

          $scope.onSubmitAnswerFromButton = function() {
            CurrentInteractionService.submitAnswer();
          };

          $scope.isSubmitButtonDisabled = (
            CurrentInteractionService.isSubmitButtonDisabled);
        }
      ]
    };
  }
]);
