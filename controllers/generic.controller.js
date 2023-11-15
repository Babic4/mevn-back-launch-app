const boom = require("boom");

const genericCrud = (model) => ({
  async get({ params: { id } }, response) {
    try {
      const item = await model.findById(id);
      return response.status(200).send(item);
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
  async getAll(request, response) {
    try {
      console.log(request.get("host")); // ????
      const items = await model.find();
      return response.status(200).send(items);
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
  async create({ body }, response) {
    try {
      const item = new model(body);
      const newItem = await item.save();
      return response.status(200).send(newItem);
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
  async update({ params: { id }, body }, response) {
    try {
      const item = await model.findByIdAndUpdate(id, body, { new: true });
      return response.status(200).send(item);
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
  async delete({ params: { id } }, response) {
    try {
      await model.findByIdAndDelete(id);
      return response.status(200).send({ status: "OK", message: "Delete" });
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
});

module.exports = genericCrud;
