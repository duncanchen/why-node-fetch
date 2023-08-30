import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { DirectBlob } from "../direct-blob";

export default async function userController(fastify: FastifyInstance) {
  // GET /api/v1/user
  fastify.get("/", async function (
    _request: FastifyRequest,
    reply: FastifyReply
  ) {

    const dal = DirectBlob("marketstatic")

    reply.send({
      objects: await dal.objects("secure-in"),
      balance: "$3,277.32",
      picture: "http://placehold.it/32x32",
      age: 30,
      name: "Leonor Cross",
      gender: "male",
      company: "GRONK",
      email: "leonorcross@gronk.com",
      dt: new Date(),
    });
  });
}
