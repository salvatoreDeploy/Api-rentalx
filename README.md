# Cadastro de Carro:

**Requisitos Funcionais**
[X] Deve ser possivel cadastrar um novo carro;

**Requisitos não Funcionais**

**Regras de Negócio**
[X] Não deve ser possivel cadastrar um carro com a placa ja existente
[X] O carro deve ser cadastardo, por padrão, estar com disponibilidade \* [X] O usuario responsavel pelo cadastro tem que ter permissão de Administrador

# Listagem de Carro:

**Requisitos Funcionais**
[X] Deve ser possivel listar todos os carros disponiveis
[X] Deve ser possivel listar todos os carros disponiveis pela categoria
[X] Deve ser possivel listar todos os carros disponiveis pela marca
[X] Deve ser possivel listar todos os carros disponiveis pelo nome

**Requisitos não Funcionais**

**Regras de Negócio**
[X] O usuario não precisa estar logado no sistema.

# Cadastro de Especificação no Carro:

**Requisitos Funcionais**
[X] Deve ser possivel cadastrar uma especificação para um carro

**Requisitos não Funcionais**

**Regras de Negócio**
[X] Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
[X] Não deve ser possivel cadastrar uma especificação ja existente para um mesmo carro
[X] O usuario responsavel pelo cadastro tem que ter permissão de Administrador

# Cadastro de imagens do Carro:

**Requisitos Funcionais**
[X] Deve ser possivel cadastrar a imagem do carro

**Requisitos não Funcionais**
[X] Utilizar o multer para upload dos arquivos

**Regras de Negócio**
[X] O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
[X] O usuario responsavel pelo cadastro tem que ter permissão de Administrador

# Aluguel de Carro:

**Requisitos Funcionais**
[x] Deve ser possivel realizar um aluguel

**Requisitos não Funcionais**

**Regras de Negócio**
[x] O aluguel deve ter duração minima de 24 horas
[x] Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario;
[x] Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro
[] Ao realizar um aluguel, o status do carro devera ser alterado para indisponivel

# Devolução de um Carro:

**Requisitos Funcionais**
[] Deve ser possivel realizar a devolução de um carro

**Regras de Negócio**
[] Se o carro for devolvido com menos de 24 horas, devera ser cobrado diaria completa.
[] Ao realizar a devolução, o carro devera ser liberado para outro aluguel
[] Ao realizar a devolução, o usuario dever ser liberado para outro aluguel
[] Ao realizar a devolução, devera ser calculado o total do aluguel
[] Caso o horario de devolução seja superior ao horario previsto de entrega, devera ser cobrado
multa proporcional aos dias de atrasos
[] Caso haja multa, devera ser somado ao total do aluguel
