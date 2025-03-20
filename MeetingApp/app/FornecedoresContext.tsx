import { createContext, useContext, useState, ReactNode } from "react";

export type Fornecedor = {
  id: string;
  nome: string;
  endereco: string;
  contato: string;
  categoria: string;
  imagem?: string;
};

type FornecedoresContextType = {
  fornecedores: Fornecedor[];
  adicionarFornecedor: (fornecedor: Fornecedor) => void;
  editarFornecedor: (fornecedor: Fornecedor) => void;
};

const FornecedoresContext = createContext<FornecedoresContextType | undefined>(undefined);

export function FornecedoresProvider({ children }: { children: ReactNode }) {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const adicionarFornecedor = (fornecedor: Fornecedor) => {
    setFornecedores((prev) => [...prev, fornecedor]);
  };

  const editarFornecedor = (fornecedorAtualizado: Fornecedor) => {
    setFornecedores((prev) =>
      prev.map((f) => (f.id === fornecedorAtualizado.id ? fornecedorAtualizado : f))
    );
  };

  return (
    <FornecedoresContext.Provider value={{ fornecedores, adicionarFornecedor, editarFornecedor }}>
      {children}
    </FornecedoresContext.Provider>
  );
}

export function useFornecedores() {
  const context = useContext(FornecedoresContext);
  if (!context) {
    throw new Error("useFornecedores deve ser usado dentro de FornecedoresProvider");
  }
  return context;
}

export default FornecedoresProvider;
