exports.validacoes = {
  validaIdade(dataInformada) {
    const dezoitoAnos = 567648000000;
    const dataAtual = new Date();
    const idade = dataAtual - new Date(dataInformada);
    return idade >= dezoitoAnos;
  },
};
