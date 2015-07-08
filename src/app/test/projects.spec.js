'use strict';

describe("Client", function() {
  var projectsProvider, resource;

  resource = restful('localhost').protocol('http').port(1234);

  beforeEach(function() {
    projectsProvider = Pact.mockService({
      consumer: 'Projects Consumer',
      provider: 'Projects Provider',
      port: 1234,
      done: function (error) {
        expect(error).toBe(null);
      }
    });
  });

  it("return projects", function(done) {
    projectsProvider
      .given("at least one project exists")
      .uponReceiving("a request for listing all projects")
      .withRequest("get", "/api/projects", {
        "Accept": "application/json"
      }).willRespondWith(200, {
        "Content-Type": "application/json"
      }, [ { "name": "P1" }, { "name": "P2" } ]);

    projectsProvider.run(done, function(runComplete) {
      resource.all('api/projects').header('Accept', 'application/json').getAll().then(function(projects) {
        try {
          expect(projects().data.length).toEqual(2);
          expect(projects().data[0]['name']).toEqual('P1');
          expect(projects().data[1]['name']).toEqual('P2');
        } catch (e) {
          expect(e).toBe(null);
        } finally {
          runComplete();
        }
      });
    });
  });
});
