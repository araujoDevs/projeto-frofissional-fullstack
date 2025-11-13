import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  HeartIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// 🧩 Etapa 1: Estrutura principal do sistema
// Criamos o componente principal que conterá três seções: Dashboard, Doações e Voluntários.
export default function SistemaDoacoes() {
  const [doacoes, setDoacoes] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  // Formulários com validação
  const { register: registerDoacao, handleSubmit: handleSubmitDoacao, reset: resetDoacao, formState: { errors: errorsDoacao } } = useForm();
  const { register: registerVoluntario, handleSubmit: handleSubmitVoluntario, reset: resetVoluntario, formState: { errors: errorsVoluntario } } = useForm();

  // Carregar dados da API
  useEffect(() => {
    loadDoacoes();
    loadVoluntarios();
  }, []);

  const loadDoacoes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/doacoes`);
      setDoacoes(response.data);
    } catch (error) {
      setError('Erro ao carregar doações');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadVoluntarios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/voluntarios`);
      setVoluntarios(response.data);
    } catch (error) {
      setError('Erro ao carregar voluntários');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Funções de manipulação dos cadastros
  const adicionarDoacao = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/doacoes`, data);
      resetDoacao();
      loadDoacoes();
    } catch (error) {
      setError('Erro ao adicionar doação');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const adicionarVoluntario = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/voluntarios`, data);
      resetVoluntario();
      loadVoluntarios();
    } catch (error) {
      setError('Erro ao adicionar voluntário');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const editarItem = (item, tipo) => {
    setEditingItem({ ...item, tipo });
    if (tipo === 'doacao') {
      resetDoacao(item);
    } else {
      resetVoluntario(item);
    }
  };

  const salvarEdicao = async (data) => {
    try {
      setLoading(true);
      if (editingItem.tipo === 'doacao') {
        await axios.put(`${API_BASE_URL}/doacoes/${editingItem._id}`, data);
        loadDoacoes();
        resetDoacao();
      } else {
        await axios.put(`${API_BASE_URL}/voluntarios/${editingItem._id}`, data);
        loadVoluntarios();
        resetVoluntario();
      }
      setEditingItem(null);
    } catch (error) {
      setError('Erro ao salvar edição');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletarItem = async (id, tipo) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        setLoading(true);
        if (tipo === 'doacao') {
          await axios.delete(`${API_BASE_URL}/doacoes/${id}`);
          loadDoacoes();
        } else {
          await axios.delete(`${API_BASE_URL}/voluntarios/${id}`);
          loadVoluntarios();
        }
      } catch (error) {
        setError('Erro ao deletar item');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filtrar itens por busca
  const filteredDoacoes = doacoes.filter(item =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVoluntarios = voluntarios.filter(item =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.funcao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-6">
      {/* 🏠 Cabeçalho do sistema */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Sistema de Doações
        </h1>
        <p className="text-lg text-gray-600">
          Lar de Idosos Francisco de Assis
        </p>
      </motion.div>

      {/* Mensagens de erro */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right ml-4 font-bold"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* 🧭 Abas principais */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap border-b border-gray-200 mb-6 bg-white rounded-t-lg shadow-sm">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "dashboard"
                ? "border-b-2 border-purple-500 text-purple-600 bg-purple-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <HeartIcon className="w-5 h-5 inline mr-2" />
            Dashboard
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "doacoes"
                ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("doacoes")}
          >
            <PlusIcon className="w-5 h-5 inline mr-2" />
            Gerenciar Doações
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "voluntarios"
                ? "border-b-2 border-green-500 text-green-600 bg-green-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("voluntarios")}
          >
            <UserGroupIcon className="w-5 h-5 inline mr-2" />
            Gerenciar Voluntários
          </button>
        </div>

        {/* 📊 Dashboard */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <HeartIcon className="w-8 h-8 text-red-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{doacoes.length}</p>
                  <p className="text-gray-600">Total de Doações</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <UserGroupIcon className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{voluntarios.length}</p>
                  <p className="text-gray-600">Total de Voluntários</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <PlusIcon className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{doacoes.length + voluntarios.length}</p>
                  <p className="text-gray-600">Total de Registros</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 📦 Aba de Doações */}
        {activeTab === "doacoes" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-lg rounded-b-lg rounded-t-none"
          >
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-blue-600 flex items-center">
                <PlusIcon className="w-6 h-6 mr-2" />
                Gerenciar Doações
              </h2>

              {/* Barra de busca */}
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar doações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Formulário de doações */}
              <form onSubmit={handleSubmitDoacao(editingItem ? salvarEdicao : adicionarDoacao)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...registerDoacao("nome", { required: "Nome é obrigatório" })}
                      type="text"
                      placeholder="Nome do Doador"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorsDoacao.nome && <p className="text-red-500 text-sm mt-1">{errorsDoacao.nome.message}</p>}
                  </div>
                  <div>
                    <input
                      {...registerDoacao("tipo", { required: "Tipo de doação é obrigatório" })}
                      type="text"
                      placeholder="Tipo de Doação (ex: alimentos, roupas, dinheiro)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorsDoacao.tipo && <p className="text-red-500 text-sm mt-1">{errorsDoacao.tipo.message}</p>}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <PlusIcon className="w-5 h-5 mr-2" />
                      {editingItem && editingItem.tipo === 'doacao' ? 'Salvar Edição' : 'Adicionar Doação'}
                    </>
                  )}
                </button>
                {editingItem && editingItem.tipo === 'doacao' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      resetDoacao();
                    }}
                    className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                )}
              </form>

              {/* Lista dinâmica de doações */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-800">Lista de Doações ({filteredDoacoes.length})</h3>
                {filteredDoacoes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <HeartIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    Nenhuma doação encontrada.
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    {filteredDoacoes.map((d) => (
                      <motion.div
                        key={d._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{d.nome}</p>
                          <p className="text-sm text-gray-600">{d.tipo}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editarItem(d, 'doacao')}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletarItem(d._id, 'doacao')}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* 👥 Aba de Voluntários */}
        {activeTab === "voluntarios" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-lg rounded-b-lg rounded-t-none"
          >
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-green-600 flex items-center">
                <UserGroupIcon className="w-6 h-6 mr-2" />
                Gerenciar Voluntários
              </h2>

              {/* Barra de busca */}
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar voluntários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Formulário de voluntários */}
              <form onSubmit={handleSubmitVoluntario(editingItem ? salvarEdicao : adicionarVoluntario)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...registerVoluntario("nome", { required: "Nome é obrigatório" })}
                      type="text"
                      placeholder="Nome do Voluntário"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errorsVoluntario.nome && <p className="text-red-500 text-sm mt-1">{errorsVoluntario.nome.message}</p>}
                  </div>
                  <div>
                    <input
                      {...registerVoluntario("funcao", { required: "Função é obrigatória" })}
                      type="text"
                      placeholder="Função (ex: enfermagem, recreação, cozinha)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errorsVoluntario.funcao && <p className="text-red-500 text-sm mt-1">{errorsVoluntario.funcao.message}</p>}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <PlusIcon className="w-5 h-5 mr-2" />
                      {editingItem && editingItem.tipo === 'voluntario' ? 'Salvar Edição' : 'Adicionar Voluntário'}
                    </>
                  )}
                </button>
                {editingItem && editingItem.tipo === 'voluntario' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      resetVoluntario();
                    }}
                    className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                )}
              </form>

              {/* Lista dinâmica de voluntários */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-800">Lista de Voluntários ({filteredVoluntarios.length})</h3>
                {filteredVoluntarios.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <UserGroupIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    Nenhum voluntário encontrado.
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    {filteredVoluntarios.map((v) => (
                      <motion.div
                        key={v._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{v.nome}</p>
                          <p className="text-sm text-gray-600">{v.funcao}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editarItem(v, 'voluntario')}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deletarItem(v._id, 'voluntario')}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 📝 Rodapé descritivo */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-500 mt-12 pb-6"
      >
        <p>
          Projeto extensionista desenvolvido no curso de Análise e Desenvolvimento de Sistemas.
        </p>
        <p className="mt-2">
          Aplicação fullstack criada com React, Node.js, Express, MongoDB e Tailwind CSS
        </p>
        <p className="mt-1">
          para apoiar a ONG Lar de Idosos Francisco de Assis.
        </p>
      </motion.footer>
    </div>
  );
}
