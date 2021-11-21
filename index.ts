import express from "express";

const app = express();
const todoRouter = express.Router();

type Todo = {
  id: number;
  description: string;
  done?: true;
};
const db: Todo[] = [];

todoRouter.route("/").get((req, res) => res.send(db));
todoRouter
  .route("/:id")
  .get((req, res) => new Error("Not yet implemented"))
  .post((req, res) => new Error("Not yet implemented"))
  .put((req, res) => new Error("Not yet implemented"))
  .patch((req, res) => new Error("Not yet implemented"))
  .delete((req, res) => new Error("Not yet implemented"));

app.use("/todos", todoRouter);

app.get("*", (_, res) => res.status(404).send())

app.listen(3000);
