import React, { useState } from "react";

// 🧩 Etapa 1: Estrutura principal do sistema
// Criamos o componente principal que conterá duas abas: Doações e Voluntários.
export default function SistemaDoacoes() {
  const [doacoes, setDoacoes] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [activeTab, setActiveTab] = useState("doacoes");

  // Estados locais para armazenar dados temporários dos formulários
  const [nomeDoador, setNomeDoador] = useState("");
  const [tipoDoacao, setTipoDoacao] = useState("");

  const [nomeVoluntario, setNomeVoluntario] = useState("");
  const [funcaoVoluntario, setFuncaoVoluntario] = useState("");

  // 🧠 Funções de manipulação dos cadastros
  const adicionarDoacao = () => {
    if (nomeDoador && tipoDoacao) {
      setDoacoes([...doacoes, { nome: nomeDoador, tipo: tipoDoacao }]);
      setNomeDoador("");
      setTipoDoacao("");
    }
  };

  const adicionarVoluntario = () => {
    if (nomeVoluntario && funcaoVoluntario) {
      setVoluntarios([
        ...voluntarios,
        { nome: nomeVoluntario, funcao: funcaoVoluntario },
      ]);
      setNomeVoluntario("");
      setFuncaoVoluntario("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 🏠 Cabeçalho do sistema */}
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Sistema de Doações – Lar de Idosos Francisco de Assis
      </h1>

      {/* 🧭 Abas principais */}
      <div className="max-w-3xl mx-auto">
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`flex-1 py-2 px-4 text-center font-medium ${
              activeTab === "doacoes"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("doacoes")}
          >
            Gerenciar Doações
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center font-medium ${
              activeTab === "voluntarios"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("voluntarios")}
          >
            Gerenciar Voluntários
          </button>
        </div>

        {/* 📦 Aba de Doações */}
        {activeTab === "doacoes" && (
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-semibold text-blue-600">
                Cadastro de Doações
              </h2>

              {/* Formulário de doações */}
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Nome do Doador"
                  value={nomeDoador}
                  onChange={(e) => setNomeDoador(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Tipo de Doação (ex: alimentos, roupas, dinheiro)"
                  value={tipoDoacao}
                  onChange={(e) => setTipoDoacao(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={adicionarDoacao}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Adicionar
                </button>
              </div>

              {/* Lista dinâmica de doações */}
              <div className="mt-4">
                <h3 className="font-medium mb-2">Lista de Doações</h3>
                {doacoes.length === 0 ? (
                  <p className="text-gray-500">
                    Nenhuma doação cadastrada ainda.
                  </p>
                ) : (
                  <ul className="list-disc ml-5 space-y-1">
                    {doacoes.map((d, i) => (
                      <li key={i}>
                        {d.nome} – {d.tipo}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 👥 Aba de Voluntários */}
        {activeTab === "voluntarios" && (
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-4 space-y-4">
              <h2 className="text-xl font-semibold text-green-600">
                Cadastro de Voluntários
              </h2>

              {/* Formulário de voluntários */}
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Nome do Voluntário"
                  value={nomeVoluntario}
                  onChange={(e) => setNomeVoluntario(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Função (ex: enfermagem, recreação, cozinha)"
                  value={funcaoVoluntario}
                  onChange={(e) => setFuncaoVoluntario(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={adicionarVoluntario}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Adicionar
                </button>
              </div>

              {/* Lista dinâmica de voluntários */}
              <div className="mt-4">
                <h3 className="font-medium mb-2">Lista de Voluntários</h3>
                {voluntarios.length === 0 ? (
                  <p className="text-gray-500">
                    Nenhum voluntário cadastrado ainda.
                  </p>
                ) : (
                  <ul className="list-disc ml-5 space-y-1">
                    {voluntarios.map((v, i) => (
                      <li key={i}>
                        {v.nome} – {v.funcao}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 📝 Rodapé descritivo */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Projeto extensionista desenvolvido no curso de Análise e Desenvolvimento
        de Sistemas. <br />
        Aplicação criada com React e Tailwind CSS para apoiar a ONG Francisco de
        Assis.
      </p>
    </div>
  );
}
