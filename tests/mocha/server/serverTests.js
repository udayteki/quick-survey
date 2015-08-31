MochaWeb.testOnly(function(){

  describe("Server initialization", function(){
    it("should insert a survey into the database after server start", function(){
      chai.assert(Surveys.find().count() > 0);
    });

    it("should not have any users", function(){
      chai.assert(Meteor.users.find().count() === 0);
    });
  });
});
