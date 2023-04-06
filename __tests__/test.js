// import supertest module
const request = require("supertest");

// import app from server
const app = require("../server");

// login
test("user login", async () => {
  // act
  let response = await request(app).post("/employee-login").send({
    email:"gdotest.dummy@westagilelabs.com",
    password: "gdotest",
  });

  // assertions
  expect(response.body).toHaveProperty("payload");
});

// testing admin

// testing get all the projects
test("Get all projects by admin", async () => {
  // arrange
  // act
  let response = await request(app)
    .get("/admin/projects")
    .set(
      "Authorization",
      "bearer" +
        " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMywidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODUzMDcxMSwiZXhwIjoxNjc5Mzk0NzExfQ.sPAojMx1m1J8PhPIbf-1MktYQCfUzP_o1PSYOzA9XIE"
    );

  // assertions
  expect(response.body.payload.length).toBeGreaterThan(0);
});

// creating project test
test("/admin/add-project", async () => {
  // arrange
  // act
  let response = await request(app)
    .post("/admin/add-project")
    .send({
    project_name:"test project",
    client:"wal",
    client_account_manager:2,
    status:"in progress",
    project_start_date:"2022-12-12",
    project_fitness_indicator:"green",
    domain:"webdev",
    type_of_project:"development",
    gdo_head:7,
    project_manager:6
    })
    .set(
      "Authorization",
      "bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMywidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODUzMDcxMSwiZXhwIjoxNjc5Mzk0NzExfQ.sPAojMx1m1J8PhPIbf-1MktYQCfUzP_o1PSYOzA9XIE"
    );

  // assertion
  expect(response.status).toBe(201);
});
