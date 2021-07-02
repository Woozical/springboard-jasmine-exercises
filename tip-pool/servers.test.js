describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should properly increment serverId with each new server', function(){
    submitServerInfo();
    expect(serverId).toEqual(1);
    serverNameInput.value = 'Dennis';
    submitServerInfo();
    expect(serverId).toEqual(2);
    console.log(allServers);
    expect(allServers.server1.serverName).toEqual('Alice');
    expect(allServers.server2.serverName).toEqual('Dennis');
  });

  it('should have a table row for every object in allServers', function(){
    submitServerInfo();
    expect(serverTbody.children.length).toEqual(1);
    serverNameInput.value = 'TestOne';
    submitServerInfo();
    expect(serverTbody.children.length).toEqual(2);
    serverNameInput.value = 'TestTwo';
    submitServerInfo();
    expect(serverTbody.children.length).toEqual(3);

    expect(serverTbody.children.length).toEqual(Object.keys(allServers).length);
  })

  it("should have each table row's id attribute map to a key in allServers", function(){
    submitServerInfo();
    serverNameInput.value = 'TestOne';
    submitServerInfo();
    let serverKeys = Object.keys(allServers);
    expect(serverTbody.firstElementChild.getAttribute('id')).toEqual(serverKeys[0]);
    expect(serverTbody.lastElementChild.getAttribute('id')).toEqual(serverKeys[serverKeys.length - 1]);
  })

  afterEach(function() {
    // teardown logic
    allServers = [];
    serverId = 0;
    updateServerTable();
  });
});
