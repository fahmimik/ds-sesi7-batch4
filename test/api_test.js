const chai = require("chai");
const supertest = require("supertest");
const baseURL = "https://reqres.in/api";

const chaiJsonSchema = require('chai-json-schema');
const readJsonSchema = require("../helper/helper");
chai.use(chaiJsonSchema);
const expect = chai.expect;

describe("reqres.in API Test", () => {
  var createdId;
  it("TC1 - GET", async () => {
    const schema = readJsonSchema('get_single_user.json');
    const response = await supertest(baseURL).get("/users/2");
    // console.log(response.body)
    // expect(response.status).to.equal(200);
    // expect(response.body.data.id).to.equal(2);
    // expect(response.body.data.email).to.equal("janet.weaver@reqres.in");
    // expect(response.body.data.first_name).to.equal("Janet");
    // expect(response.body.data.last_name).to.equal("Weaver");
    // expect(response.body.support.url).to.equal("https://reqres.in/#support-heading");
    // expect(response.body.support.text).to.equal("To keep ReqRes free, contributions towards server costs are appreciated!");

    expect(response.body).to.be.jsonSchema(schema);
  });

  it("TC2 - POST", async () => {
    const body = {
      name: "morpheus",
      job: "leader",
    }
    const schema = readJsonSchema('post_user.json');
    const response = await supertest(baseURL).post("/users").send(body);
    // console.log(response.body);
    createdId = response.body.id;

    expect(response.body).to.be.jsonSchema(schema);
  });

  it("TC3 - PUT", async () => {
    const body = {
      name: "morpheus",
      job: "general manager",
    }
    console.log(createdId)
    const schema = readJsonSchema('post_user.json');
    const response = await supertest(baseURL).post("/users").send(body);
    // console.log(response.body);
    createdId = response.body.id;

    expect(response.body).to.be.jsonSchema(schema);
  });


  it("TC4 - DELETE", async () => {
    console.log(createdId)
    const response = await supertest(baseURL).delete(`/users/${createdId}`);
    // console.log(response.body);
    expect(response.status).to.equal(204);
  });
});
