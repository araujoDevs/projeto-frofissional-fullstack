const express = require('express');
const router = express.Router();
const Voluntario = require('../models/Voluntario');

// GET /api/voluntarios - Listar todos os voluntários
router.get('/', async (req, res) => {
  try {
    const voluntarios = await Voluntario.find().sort({ createdAt: -1 });
    res.json(voluntarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/voluntarios - Criar novo voluntário
router.post('/', async (req, res) => {
  const voluntario = new Voluntario({
    nome: req.body.nome,
    funcao: req.body.funcao
  });

  try {
    const novoVoluntario = await voluntario.save();
    res.status(201).json(novoVoluntario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/voluntarios/:id - Atualizar voluntário
router.put('/:id', async (req, res) => {
  try {
    const voluntario = await Voluntario.findByIdAndUpdate(
      req.params.id,
      {
        nome: req.body.nome,
        funcao: req.body.funcao
      },
      { new: true }
    );
    if (!voluntario) return res.status(404).json({ message: 'Voluntário não encontrado' });
    res.json(voluntario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/voluntarios/:id - Deletar voluntário
router.delete('/:id', async (req, res) => {
  try {
    const voluntario = await Voluntario.findByIdAndDelete(req.params.id);
    if (!voluntario) return res.status(404).json({ message: 'Voluntário não encontrado' });
    res.json({ message: 'Voluntário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
