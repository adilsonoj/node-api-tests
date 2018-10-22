module.exports = {
  async projects(req, res){
        return res.send({ ok: true, user: req.userId})
    }
}