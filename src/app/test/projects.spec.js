'use strict';

describe("Client", function() {
  var client, Restangular, projectsProvider;

  beforeEach(angular.mock.module('restangular'));
  beforeEach(function() {
    projectsProvider = Pact.mockService({
      consumer: 'Hello Consumer',
      provider: 'Hello Provider',
      port: 1234,
      done: function (error) {
        expect(error).toBe(null);
      }
    });
  });
  beforeEach(inject(function(_Restangular_) {
    Restangular = _Restangular_;
    Restangular.setBaseUrl("http://localhost:1234")
  }));

  it("return projects", function(done) {
    projectsProvider
      .given("at least on project exists")
      .uponReceiving("a request for listing all projects")
      .withRequest("get", "/projects", {
        "Accept": "application/json"
      }).willRespondWith(200, {
        "Content-Type": "application/json"
      }, [ { "name": "P1" }, { "name": "P2" } ]);

    projectsProvider.run(done, function(runComplete) {
      Restangular.all('projects').getList().then(function(projects) {
        console.log('XXX');
        expect(projects).toEqual(null);
        runComplete();
      });
    });
  });
});
