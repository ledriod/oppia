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
 * @fileoverview Unit tests for the Preferences page.
 */

require('pages/preferences-page/preferences-page.controller.ts');

describe('Preferences Controller', function() {
  describe('PreferencesCtrl', function() {
    var ctrl, $httpBackend, mockAlertsService, SUPPORTED_AUDIO_LANGUAGES;
    var $componentController;

    beforeEach(function() {
      angular.mock.module('oppia');
    });

    beforeEach(
      angular.mock.module('oppia', GLOBALS.TRANSLATOR_PROVIDER_FOR_TESTS));

    beforeEach(angular.mock.inject(function(
        _$componentController_, $http, _$httpBackend_, $rootScope) {
      $componentController = _$componentController_;
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/preferenceshandler/data').respond({
        can_receive_email_updates: false,
        can_receive_editor_role_email: true,
        can_receive_feedback_message_email: true
      });

      mockAlertsService = {};

      ctrl = $componentController('preferencesPage', null, {
        $http: $http,
        $rootScope: $rootScope,
        AlertsService: mockAlertsService
      });
    }));

    it('should show that editor role notifications checkbox is true by default',
      function() {
        $httpBackend.flush();
        expect(ctrl.canReceiveEditorRoleEmail).toBe(true);
      });

    it('should show that feedback message notifications checkbox is true' +
      'by default',
    function() {
      $httpBackend.flush();
      expect(ctrl.canReceiveFeedbackMessageEmail).toBe(true);
    });

    it('should map SUPPORTED_AUDIO_LANGUAGES correctly to ' +
       'AUDIO_LANGUAGE_CHOICES to support select2 plugin',
    function() {
      var numberOfAudioLanguageChoices = ctrl.AUDIO_LANGUAGE_CHOICES.length;
      expect(numberOfAudioLanguageChoices > 0).toBe(true);
      for (var index = 0; index < numberOfAudioLanguageChoices; index++) {
        expect(Object.keys(ctrl.AUDIO_LANGUAGE_CHOICES[index])).toEqual(
          ['id', 'text']);
      }
    });
  });
});
