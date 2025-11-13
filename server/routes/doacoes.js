const express = require('express');
const router = express.Router();
const Doacao = require('../models/Doacao');

// GET /api/doacoes - Listar todas as doações
router.get('/', async (req, res) => {
  try {
    const doacoes = await Doacao.find().sort({ createdAt: -1 });
    res.json(doacoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/doacoes - Criar nova doação
router.post('/', async (req, res) => {
  const doacao = new Doacao({
    nome: req.body.nome,
    tipo: req.body.tipo
  });

  try {
    const novaDoacao = await doacao.save();
    res.status(201).json(novaDoacao);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/doacoes/:id - Atualizar doação
router.put('/:id', async (req, res) => {
  try {
    const doacao = await Doacao.findByIdAndUpdate(
      req.params.id,
      {
        nome: req.body.nome,
        tipo: req.body.tipo
      },
      { new: true }
    );
    if (!doacao) return res.status(404).json({ message: 'Doação não encontrada' });
    res.json(doacao);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/doacoes/:id - Deletar doação
router.delete('/:id', async (req, res) => {
  try {
    const doacao = await Doacao.findByIdAndDelete(req.params.id);
    if (!doacao) return res.status(404).json({ message: 'Doação não encontrada' });
    res.json({ message: 'Doação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
